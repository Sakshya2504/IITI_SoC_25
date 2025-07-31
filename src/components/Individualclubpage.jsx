import React, { useEffect, useState } from 'react';
import iiti from '../Images/iiti.png';
import insta from '../Images/insta.png';
import linkedIn from '../Images/linkedIn.png';
import facebook from '../Images/facebook.png';
import { useNavigate, useParams } from 'react-router-dom';

function Individualclubpage() {
  const { clubname, _id } = useParams();
  const navigate = useNavigate();

  const [clubdetailes, setclubdetailes] = useState({
    _id: '',
    name: '',
    heading: '',
    info: '',
    logo: '',
    clubHead: [
      {
        name: '',
        role: '',
        image: '',
        linkedin: '',
        instagram: '',
      },
    ],
    social: [
      {
        platform: '',
        link: '',
      },
    ],
    events: [],
  });

  const [activeTab, setActiveTab] = useState('info');

  useEffect(() => {
    const fetchclubinfo = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/findclub`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ _id }),
        });

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        setclubdetailes({
          _id: data._id || '',
          name: data.name || '',
          heading: data.heading || '',
          info: data.info || '',
          logo: data.logo || '',
          clubHead: data.clubHead || [
            {
              name: '',
              role: '',
              image: '',
              linkedin: '',
              instagram: '',
            },
          ],
          social: data.social || [
            {
              platform: '',
              link: '',
            },
          ],
          events: data.events || [],
        });
      } catch (err) {
        console.error(err);
        alert('Something went wrong. Please try again.');
      }
    };

    if (_id) {
      fetchclubinfo();
    }
  }, [_id]);

  return (
    <>
      <div className="bg-gradient-to-b from-[#01011b] via-[#0a0a2e] to-[#01011b] text-white">
        <button
          className="text-white sticky top-[125px] z-100 font-bold cursor-pointer flex items-center"
          onClick={() => navigate(-1)}
        >
          <svg
            className="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <div className="h-80 flex items-center justify-center">
          <img
            src={clubdetailes.logo || '#'}
            alt="cynapticlogo"
            className="object-contain h-full"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center my-8 mx-4 md:mx-0">
          <button
            className="px-6 py-3 text-white font-bold rounded bg-gradient-to-r from-blue-500 to-cyan-500 hover:scale-105 transition transform duration-200"
            onClick={() => navigate(`/createevent/${clubname}/${_id}`)}
          >
            Create Event
          </button>
          <button
            className="px-6 py-3 text-white font-bold rounded bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-105 transition transform duration-200"
            onClick={() => navigate(`/announce/${clubname}`)}
          >
            Announce
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center  gap-4 my-6  ">
          {['info', 'events', 'head'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 my-2 rounded-full font-semibold capitalize transition-all duration-300 ease-in-out
                ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white scale-105 shadow-md'
                    : 'bg-[#1a1a2e] text-gray-300 hover:bg-[#2a2a3d]'
                }`}
            >
              {tab === 'info' ? 'Club Info' : tab === 'events' ? 'Club Events' : 'Club Head'}
            </button>
          ))}
        </div>

        {/* Club Info */}
        {activeTab === 'info' && (
          <div className="text-center">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00EAFF] via-[#4DD9FF] to-[#AAF0FF]">
              About Club
            </h1>
            <p className="font-semibold px-6 my-6">{clubdetailes.info}</p>
          </div>
        )}

        {/* Club Events */}
        {activeTab === 'events' && (
          <div className="py-10 min-h-10">
            <h1 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-[#00EAFF] via-[#4DD9FF] to-[#AAF0FF]">
              Club Events
            </h1>
            {clubdetailes.events.length===0?(
 <div className="col-span-full flex flex-col items-center  text-white text-center mt-12 space-y-4 w-full">
      <img
        src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
        alt="No events"
        className="w-32 h-32 "
      />
      <p className="text-xl font-semibold">No events found.</p>
    </div>
      ):
            (<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 px-4">
              {clubdetailes.events.map((event, index) => (
                <div
                  key={index}
                  className="rounded-2xl border-4 border-[#87CEEB] hover:border-[#33bbcf] bg-gradient-to-r from-cyan-500/10 to-blue-500/10 shadow-lg p-4 transform hover:-translate-y-2 transition duration-300"
                >
                  <div className="space-y-2">
                    <div className="flex justify-center">
                      <img
                        src={event.image || '#'}
                        alt="Event Logo"
                        className="w-full h-40 object-contain"
                      />
                    </div>
                    <p>🕒 <span className="font-medium">{event.time}</span></p>
                    <p className="font-semibold">🎭 Event: {event.name}</p>
                    <p className="font-semibold">Conducted by: {event.club}</p>
                    <div className="mt-4">
                      <h2 className="text-xl font-bold">{event.name}</h2>
                      <p>{event.info}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>)}
          </div>
        )}

        {/* Club Head */}
        {activeTab === 'head' && (
          <div className="py-3 px-4 md:px-0">
            <h1 className="text-xl md:text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#00EAFF] via-[#4DD9FF] to-[#AAF0FF] mb-4">
              Club Head
            </h1>
            <div className="mx-auto max-w-sm border-2 flex flex-col rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-4 shadow-md hover:border-[#33bbcf] hover:shadow-lg transition duration-300 ease-in-out">
              <img
                src={clubdetailes.clubHead[0].image || iiti}
                alt="Club Head Photo"
                className="w-full max-h-40 object-contain rounded mb-3"
              />
              <p className="text-center font-semibold text-base">{clubdetailes.clubHead[0].name}</p>
              <h2 className="text-sm font-semibold mt-3 text-[#4DD9FF] uppercase tracking-wider text-center">About</h2>
              <p className="text-sm text-center">{clubdetailes.clubHead[0].role}</p>
              <h2 className="text-sm font-semibold mt-3 text-[#4DD9FF] uppercase tracking-wider text-center">Contact</h2>
              <a
                href={clubdetailes.clubHead[0].linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center my-1 transition-transform hover:scale-110"
              >
                <img src={linkedIn} alt="LinkedIn" className="w-4 h-4" />
              </a>
              <p className="text-xs text-center mt-1">📧 cse240001068@iiti.ac.in</p>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="border-t border-[#3f3e45] py-8 text-sm text-center bg-[#01011b]">
          <div className="flex flex-col md:flex-row justify-center gap-4 items-center">
            <span className="font-bold">{`© 2025 ${clubdetailes.name} — @IITI`}</span>
            <div className="flex flex-row gap-4">
              <a href="https://www.instagram.com/cynapticsclubiiti" target="_blank" rel="noopener noreferrer">
                <img src={insta} alt="Instagram" className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/company/cynaptics-club-iiti-indore/mycompany/" target="_blank" rel="noopener noreferrer">
                <img src={linkedIn} alt="LinkedIn" className="w-5 h-5" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img src={facebook} alt="Facebook" className="w-5 h-5" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Individualclubpage;
