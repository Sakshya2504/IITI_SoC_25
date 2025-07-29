import './App.css';
import Events from './components/Events';
import NavBar from './components/NavBar';
import Individualclubpage from './components/Individualclubpage';
import ClubPage from './components/ClubPage';
import Notification from './components/Notification';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import insta from './Images/Insta.png';
import linkedIn from './Images/linkedIn.png';
import twitter from './Images/twitter.png';
import facebook from './Images/facebook.png';
import Signup from './components/Signup';
import Login from './components/Login';
import Clubselection from './components/Clubselection'
import Createevent from './components/Createevent';
import Announce from './components/Announce';
import { useState } from 'react';
import Set from './components/Set';
import { useEffect } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [issignup, setissignup] = useState(false);
  const changestatus = () => setIsOpen(!isOpen);
  const closeset = () => setIsOpen(false);
  const [personinfo, setpersoninfo] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
    const storedInfo = localStorage.getItem('personinfo');
    if (storedInfo && storedInfo !== "undefined") {
      setpersoninfo(JSON.parse(storedInfo));
      setissignup(true);
    }
  }, []);


  return (
    <div className="min-h-screen flex flex-col ">


      <div className="bg-[rgba(1,1,27)]">
        <NavBar changestatus={changestatus} setissignup={setissignup} closeset={closeset} personinfo={personinfo} setpersoninfo={setpersoninfo} issignup={issignup} isOpen={isOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        {isOpen && <Set changestatus={changestatus} setissignup={setissignup} issignup={issignup} personinfo={personinfo} setpersoninfo={setpersoninfo} closeset={closeset} isOpen={isOpen} />}
        <Routes>
          <Route path="/" element={<Events issignup={issignup} personinfo={personinfo} searchQuery={searchQuery}
          />} />
          <Route path="/clubselection" element={<Clubselection />} />
          <Route path="/clubs/:type" element={<ClubPage />} />

        
           <Route path="/notification" element={<Notification />} />

          <Route path="/signup" element={<Signup setissignup={setissignup}  setpersoninfo={setpersoninfo} />} />
          <Route path="/login" element={<Login setissignup={setissignup}  setpersoninfo={setpersoninfo} />} />
          
          
          
          <Route path="/individualclubpage/:clubname/:_id" element={<Individualclubpage issignup={issignup} />} />
          <Route path="/createevent/:clubname/:_id" element={<Createevent/>} />

           <Route path="/announce/:clubname" element={<Announce/>} />
        </Routes>

      </div>

      <div className="footer-container border-t border-t-[#3f3e45] bg-[rgba(1,1,27)] text-white w-full">
  <footer className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-start md:items-center space-y-10 md:space-y-0">
    {/* Left Section: Logo + Address */}
    <div className="flex flex-col items-start space-y-4">
      <a href="https://www.iiti.ac.in">
        <img
          src="https://www.iiti.ac.in/public/themes/iitindore/demos/update-logo.png"
          alt="IIT Indore Logo"
          className="h-20 w-20 object-contain"
        />
      </a>
      <p className="text-base leading-relaxed font-semibold text-gray-300">
        Indian Institute of Technology Indore,<br />
        Khandwa Road, Simrol, Indore 453552
      </p>
      {/* Social Links */}
      <div className="flex gap-6 mt-2">
        <a href="https://www.instagram.com/iitindoreofficial" target="_blank" rel="noopener noreferrer">
          <img src={insta} alt="Instagram" className="h-7 w-7 hover:opacity-80 transition" />
        </a>
        <a href="https://www.linkedin.com/school/iit-indore" target="_blank" rel="noopener noreferrer">
          <img src={linkedIn} alt="LinkedIn" className="h-7 w-7 hover:opacity-80 transition" />
        </a>
        <a href="https://x.com/iitiofficial" target="_blank" rel="noopener noreferrer">
          <img src={twitter} alt="X (Twitter)" className="h-7 w-7 hover:opacity-80 transition" />
        </a>
        <a href="https://www.facebook.com/people/IIT-Indore" target="_blank" rel="noopener noreferrer">
          <img src={facebook} alt="Facebook" className="h-7 w-7 hover:opacity-80 transition" />
        </a>
      </div>
    </div>

    {/* Middle Section: Contact */}
    <div className="flex flex-col space-y-3">
      <h2 className="text-2xl font-bold text-[#00EAFF] hover:underline">Contact Us</h2>
      <p className="text-base font-semibold text-gray-300">✉️ cse240001068@iiti.ac.in</p>
    </div>

    {/* Right Section: Share */}
    <div className="flex flex-col space-y-3">
      <h2 className="text-2xl font-bold text-[#00EAFF] hover:underline">Share</h2>
      <p className="text-base font-semibold text-gray-300 break-words">
        https://campannounce.netlify.app
      </p>
    </div>
  </footer>
</div>

    </div>
  );
}

export default App;
