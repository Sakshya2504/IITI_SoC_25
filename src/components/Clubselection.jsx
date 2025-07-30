import React from 'react';
import { Link } from 'react-router-dom';

function Clubselection() {
  const clubs = [

    { name: 'Sports Clubs', path: '/clubs/Sports' },
    { name: 'Cultural Clubs', path: '/clubs/Cultural' },
    { name: 'Tech Clubs', path: '/clubs/Technical' }

  ];

  return (
    <section className="flex flex-col items-center justify-center w-full h-[calc(100vh-130px)] bg-gradient-to-b from-[#01011b] via-[#0a0a2e] to-[#01011b] text-white">

      <h1 className="text-5xl font-bold text-[#00EAFF] mb-14 drop-shadow-md">Choose Club</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 px-6  ">
        {clubs.map((club) => (
          <Link
            key={club.name}
            to={club.path}
            className="bg-[#1A2236] border-2 border-[#00EAFF] hover:bg-[#00EAFF] hover:text-[#0A0F1C] text-[#00EAFF] font-semibold text-xl sm:text-2xl py-6 px-10 rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:scale-105 text-center"
          >
            {club.name}
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Clubselection;