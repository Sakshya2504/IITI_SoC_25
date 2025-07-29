// src/components/install.jsx
import  { useEffect, useState } from "react";

const InstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt ✅");
        } else {
          console.log("User dismissed the install prompt ❌");
        }
        setDeferredPrompt(null);
        setShowInstall(false);
      });
    }
  };

  return (
    <>
      {showInstall && (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            className="bg-blue-600 text-white p-3 rounded-xl shadow-lg"
            onClick={handleInstallClick}
          >
            Install App
          </button>
        </div>
      )}
    </>
  );
};

export default InstallPWA;
