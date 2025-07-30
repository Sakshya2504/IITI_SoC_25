import { useEffect, useState } from 'react';

export default function Notification() {
  const [notifi, setNotifi] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch('http://localhost:3000/notification');
        const data = await res.json();

        const filled = data.map(ann => ({
          anouncment_photo: ann.announcelogo,
          anouncement_heading: ann.heading,
          anouncment_info: ann.info
        })).reverse();
        setNotifi(filled);
      } catch (err) {
        console.error("Failed to load notifications:", err);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <>
      <div className="con flex flex-col w-full min-h-screen bg-gradient-to-b from-[#01011b] via-[#0a0a2e] to-[#01011b] items-center py-8 px-4 space-y-6">
        {notifi.length === 0 ? (
          <div className="flex flex-col items-center justify-center space-y-4 mt-12 text-white">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png" 
              alt="No notifications"
              className="w-24 h-24 md:w-32 md:h-32"
            />
            <p className="text-lg md:text-xl font-medium">No notifications found</p>
          </div>
        ) : (
          notifi.map((e, index) => (
            <div
              key={index}
              className="notifi w-full md:w-[80%] flex justify-between items-center gap-4 bg-gradient-to-br from-[#0a0a2e] to-[#01011b] rounded-2xl md:rounded-[40px] border border-cyan-400 shadow-md hover:shadow-[0_0_20px_cyan] hover:border-cyan-500 transition-transform duration-300 hover:scale-105 p-4 md:p-6"
            >
              <div className="notifi_info flex-1">
                <h2 className="text-white text-lg md:text-2xl font-semibold mb-2">{e.anouncement_heading}</h2>
                <p className="text-white text-sm md:text-base">{e.anouncment_info}</p>
              </div>
              <div className="image_con flex-shrink-0">
                <img
                  src={e.anouncment_photo}
                  alt="announcement"
                  className="h-[45px] md:h-[60px] w-[55px] md:w-[70px] object-cover rounded-lg border border-cyan-300 shadow-sm hover:shadow-md transition duration-300"
                />
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
