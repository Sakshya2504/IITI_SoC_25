import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import iiti from '../Images/iiti.png';
import { useParams } from 'react-router-dom';
function Announce() {
  // This component allows users to create an announcement for a club
  // It includes a form where users can input the club name, announcement heading, and announcement
  const { clubname } = useParams();
  const club_name = decodeURIComponent(clubname);
  const navigate = useNavigate();
   const [errors, setErrors] = useState([]);
  const [announcelogo, setannouncelogo] = useState(iiti);
  const [logininfo, setlogininfo] = useState({
    clubname: club_name,
    heading: "",
    info: "",
    announcelogo: { announcelogo }

  })
  const handlelogochange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setannouncelogo(reader.result);
        setlogininfo(prev => ({
          ...prev,
          announcelogo: reader.result
        }));
      }
      reader.readAsDataURL(file);
    }

  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    // This function updates the state of logininfo when the user types in the input fields
    // It uses the name attribute of the input field to determine which part of the state to
    //...prev spread operator to keep the previous state and only update the changed field
    //...value is the new value entered by the user
    setlogininfo(prev => ({ ...prev, [name]: value }));
  };


  const handleVerification = async (email) => {
    try {
      const res = await fetch('http://localhost:3000/api/verifyadmin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      return data.authorized;
    } catch (err) {
      console.error("Verification error:", err);
      alert("Something went wrong. Try again later.");
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = prompt("Enter your email to verify admin access:");
    if (!email) {
      alert("Email is required.");
      return;
    }

    const authorized = await handleVerification(email);
    if (!authorized) {
      alert("You're not authorized to make announcements.");
      navigate('/individualclubpage');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/announce', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logininfo)
      });

      const result = await res.json();

      if (res.ok) {
        alert(result.message || 'Announcement successful');
        setannouncelogo(iiti);
        setlogininfo({ clubname: club_name, heading: "", info: "", announcelogo: { announcelogo } });
        navigate('/notification');
      } else {
        if (result.errors) {
          setErrors(result.errors);
        } else {
          setErrors([result.message || 'Signup failed']);
        }
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Something went wrong: " + (err.message || err));
    }
  };


  return (
    <>
      <div className="announce w-full h-full flex justify-center items-center bg-gradient-to-b from-[#01011b] to-[#0a0a2e]">
        <div className="announce_con relative flex flex-col w-[90%] md:w-[400px] m-6 p-6 bg-gradient-to-r from-cyan-700/30 to-blue-700/30 border border-cyan-300 rounded-xl shadow-md hover:shadow-[0_0_25px_#00ffff66] transition-shadow duration-300">

          <button
            className="back absolute top-2 right-2 w-[30px] h-[30px] rounded-md hover:bg-red-500 flex items-center justify-center text-white font-bold transition duration-200"
            onClick={() => navigate(-1)}
          >
            ❌
          </button>

          <form
            action="/individualclubpage"
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center w-full h-full"
          >
            <h2 className="text-white font-bold text-2xl py-4">Announcement Details</h2>

            {errors.length > 0 && (
              <div className="w-full flex justify-center mb-4">
                <div className="text-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-md shadow-lg animate-fade-in">
                  {errors.map((msg, idx) => (
                    <p key={idx} className="my-1">{msg}</p>
                  ))}
                </div>
              </div>
            )}

            <input
              type="text"
              placeholder="Clubname"
              name="clubname"
              value={logininfo.clubname}
              className="bg-white/90 text-black font-bold w-[90%] md:w-[75%] h-[50px] px-4 mb-4 rounded-lg shadow-md"
            />

            <input
              type="text"
              placeholder="Announcement Heading"
              name="heading"
              value={logininfo.heading}
              onChange={handleChange}
              className="bg-white/90 text-black w-[90%] md:w-[75%] h-[50px] px-4 mb-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-400 transition duration-300"
            />

            <input
              type="text"
              placeholder="Announcement Info"
              name="info"
              value={logininfo.info}
              onChange={handleChange}
              className="bg-white/90 text-black w-[90%] md:w-[75%] h-[50px] px-4 mb-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-400 transition duration-300"
            />

            <div className="flex justify-around items-center gap-6 py-4">
              <h2 className="text-white font-bold">Announcement logo :</h2>
              <label className="w-20 h-20 border border-cyan-300 rounded-xl overflow-hidden flex items-center justify-center cursor-pointer bg-white shadow hover:shadow-lg transition">
                <img src={announcelogo} className="w-full h-full object-cover" alt="logo" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlelogochange}
                />
              </label>
            </div>

            <button
              type="submit"
              className="submitbutton w-[90%] md:w-[200px] py-3 text-white text-lg font-bold bg-gradient-to-r from-[#007bff] to-[#00c3ff] rounded-lg shadow-md hover:shadow-[0_0_20px_cyan] hover:scale-105 transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Announce