// src/components/ClubPage.jsx
import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';

function ClubPage() {
  const {type} =useParams()
  const navigation = useNavigate();
console.log(type);
  const [Clubs,setClubs]=useState([]);
  useEffect( ()=>{
    const fetchclubs= async () =>{
    try{
    const res =  await  fetch(`http://localhost:3000/api/${type}`);
    const data = await res.json();
    console.log(data);
    setClubs(data);


  }
    catch(err){
      console.error(err);
      alert('Something went wrong. Please try again.');
    }
  }
   if (type) {
    fetchclubs();
  }
},[type]);

  return (
    <div className='bg-gradient-to-b from-[#01011b] via-[#0a0a2e] to-[#01011b]'>
     <button
      className="text-white sticky top-[125px] z-100 font-bold cursor-pointer flex items-center"
      onClick={() => navigation(-1)}
    >
      {/* Left Arrow Icon */}
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
    <div id="council" className="flex mt-0 xs:mt-30 flex-wrap place-content-center  gap-5 mx-2">
     
      {Clubs.map((club) => (
        <ClubCard key={club.name} {...club} />
      ))}
    </div>
    </div>
  );
}

function ClubCard({ name,logo,_id }) {
  return (

    <div className=" clubpage my-4 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 border-2 border-[#87CEEB]  pt-20 flex flex-col items-center pb-10 sm:w-[25vh] h-[35vh] w-[80%] sm:h-[40vw] md:w-[35vh] md:h-[40vw] lg:w-[50vh] lg:h-[30vw] ">
      <div className="img-cont lg:w-52 lg:h-52 md:w-40 md:h-40 sm:w-30 sm:h-40 flex items-center justify-center lg:mb-5 md:m-2 xs:w-40 xs:h-40 cursor-pointer hover:shadow-xl xxs:h-40">
        <img
          src={logo}
          alt={name}
          width={200}
          height={200}
          className="lg:w-full lg:h-full sm:w-4/5 sm:h-4/5 md:w-[90%] md:h-[90%] xxs:w-[70%] xxs:h-[70%] md:mt-5 sm:mt-3 xxs:mt-10 border-sky-600 "
        />
      </div>
      <div className="heading-cont flex items-center justify-center lg:w-60 lg:h-12 sm:w-40 sm:h-8 md:w-50 md:h-10 xxs:w-40 xxs:h-10">
        <h5 className="mb-1 text-center text-white lg:text-xl xxs:text-sm md:text-md lg:font-medium">{name}</h5>
      </div>
      <div className="w-52 h-12 mb-10 mt-1 flex items-center justify-center cursor-pointer xl:border-b-4 border-blue-500">
        <Link
          to={`/individualclubpage/${encodeURIComponent(name)}/${_id}`}
          
          className="px-4 py-2 max-sm:mb-8 xxs:text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg"
        >
          See more
        </Link>
      </div>
    </div>
  );
}

export default ClubPage;
