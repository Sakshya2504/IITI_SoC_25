/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate , useParams} from "react-router-dom";
import techClubs from "./data.json";
import "./Individualclubpage.css";

import exampleImage from "../Images/image.png";
import insta from "../Images/Insta.png";
import linkedIn from "../Images/linkedIn.png";
import facebook from "../Images/facebook.png";
import head from "../Images/user.png";

const defaultEvents = [
  {
    title: "Stargazing Night",
    date: "2023-10-15",
    description: "Join us for a night of stargazing and exploration of celestial wonders.",
    image: exampleImage,
  },
  {
    title: "Rocket Workshop",
    date: "2023-11-05",
    description: "Learn the basics of rocketry and build your own model rocket.",
    image: exampleImage,
  },
  {
    title: "AI in Astronomy",
    date: "2023-12-01",
    description: "Explore the role of AI in modern astronomy and space exploration.",
    image: exampleImage,
  },
];

function Individualclubpage(props) {
  const navigate = useNavigate();
  const [register, setRegister] = useState(false);

  const [registerInfo, setRegisterInfo] = useState({
    Name: "",
    EmailAddress: "",
    RollNumber: "",
    Program: "",
    Branch: "",
    PhoneNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: send registerInfo to backend if needed
  };
   const { name } = useParams();
  const decodedName = decodeURIComponent(name);

  const club = techClubs.find(club => club.name === decodedName);

  if (!club) {
    return <p className="text-white text-center">Club not found</p>;
  }
console.log("decoded name", decodedName);
console.log("matched club", club);

  return (
    <div className="individual-club-conainer">
      {techClubs.map((club, index) => (
        <div key={index} className="my-10">
          {/* Club Logo */}
          <div className="clubbody text-center h-60 w-full mx-auto mb-6">
            <img src={club.logo} alt={club.name} className="clubimage  mx-auto" />
          </div>

          {/* Buttons */}
            <div className="button_con">
          <button
            className="createeventbutton"
            onClick={() => navigate("/createevent")}
          >
            Create Event
          </button>

          <button
            className="announcebutton"
            onClick={() => {
              navigate("/announce");
            }}
          >
            Announce
          </button>
        </div>
          {/* About Club */}
          <div>
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#00EAFF] via-[#4DD9FF] to-[#AAF0FF] font-bold text-center text-3xl">
              {club.heading}
            </h1>
            <p className="club-info text-white font-bold px-5 my-6 text-center">
              {club.info}
            </p>
          </div>

          {/* Events */}
          <div className="p-4 bg-[#01011b]">
            <h2 className="text-2xl font-bold text-center text-white mb-4">Events</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {(club.events.length > 0 ? club.events : defaultEvents).map((event, idx) => (
                <div key={idx} className="event-detail rounded-2xl shadow-md p-4 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 space-y-3 border border-[#87CEEB] hover:border-[#33bbcf] hover:-translate-y-3">
                  <div className="card">
                    <div className="event-logo flex items-center justify-center">
                      <img src={event.image || exampleImage} alt={event.name || event.title} className="h-40 w-40 object-cover" />
                    </div>
                    <p className="text-white font-medium">🕒 Time: {event.time || event.date}</p>
                    <p className="text-white font-semibold">🎭 Event: {event.name || event.title}</p>
                    <p className="text-white font-medium">{event.info || event.description}</p>
                    <button
                      className="my-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                      onClick={() => {
                        if (props.issignup) setRegister(true);
                        else {
                          navigate("/signup");
                          alert("Please verify your email to continue.");
                        }
                      }}
                    >
                      Join Event
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Club Head */}
          {club.clubHead && club.clubHead.length > 0 && (
            <div className="clubhead text-white my-10 px-6">
              <h2 className="text-xl font-bold text-center mb-2">Club Head</h2>
              <div className="rounded-2xl p-4 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 border border-[#87CEEB] hover:border-[#33bbcf] hover:scale-[1.03] transition">
                <img
                  src={club.clubHead[0].image || head}
                  alt="Club Head"
                  className="h-24 w-24 object-cover rounded-full mx-auto"
                />
                <h3 className="text-center font-bold mt-2">{club.clubHead[0].name}</h3>
                <p className="text-center">{club.clubHead[0].role}</p>
                <div className="text-center mt-2">
                  <a href={club.clubHead[0].linkedin} target="_blank" rel="noopener noreferrer">
                    <img src={linkedIn} alt="LinkedIn" className="inline w-5 h-5 mx-1" />
                  </a>
                  <a href={club.clubHead[0].instagram} target="_blank" rel="noopener noreferrer">
                    <img src={insta} alt="Instagram" className="inline w-5 h-5 mx-1" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

      ))}

      {/* Register Popup */}
      {register && (
        <div className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-white text-black p-6 rounded-xl w-[90%] md:w-[400px] relative">
            <button onClick={() => setRegister(false)} className="absolute top-2 right-2 text-red-600 text-xl">✖</button>
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-bold text-center">Event Registration</h2>
              {Object.keys(registerInfo).map((key) => (
                <input
                  key={key}
                  type="text"
                  name={key}
                  value={registerInfo[key]}
                  onChange={handleChange}
                  placeholder={key}
                  className="block w-full border px-3 py-2 rounded-md"
                />
              ))}
              <button type="submit" className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-700">
                Register
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default Individualclubpage;
