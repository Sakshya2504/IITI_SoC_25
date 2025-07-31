import { React, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import iiti from '../Images/iiti.png';
import { useParams } from 'react-router-dom';
import {ClipLoader} from "react-spinners"
function Createevent() {

  const navigate = useNavigate();

  // This component allows users to create an event for a club
  // It includes a form where users can input the event name, date and time, conducted by, and event info
  // useState is used to manage the state of the event information
  const { clubname,_id } = useParams();
  const club_name = decodeURIComponent(clubname);
     const [loading,setloading]=useState(false);
  const [errors, setErrors] = useState([]);
  const [eventlogo, seteventlogo] = useState(iiti);
  const [logininfo, setlogininfo] = useState({
    EventName: "",
    EventDateAndTime: "",
    ConductedBy: club_name,
    EventInfo: "",
    Eventlogo: eventlogo ,
    comments:[]
  })


  const handlelogochange = (e) => {
    console.log(e.target.files[0])
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        seteventlogo(reader.result);
        setlogininfo(prev => ({
          ...prev,
          Eventlogo: reader.result
        }));
      }
      reader.readAsDataURL(file);
    }

  }
  // This function updates the state of logininfo when the user types in the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
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
  const updateclubdetailes = async ()=>{
    try{
    const res = await fetch('http://localhost:3000/api/updateclubdetailes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({...logininfo,_id})
      })
      const data = await res.json();
      if (!res.ok) {
      alert('Update failed: ' + (data.error || 'Unknown error'));
    } else {
      console.log('Club updated successfully:', data.message);
    }

  }
      catch(err){
        console.log(err);

      }

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
setloading(true);
    const email = prompt("Enter your email to verify admin access:");
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      alert("Invalid or missing email.");
      return;
    }

    const authorized = await handleVerification(email);
    if (!authorized) {
      alert("You're not authorized to create events.");
      navigate('/individualclubpage');
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/Createevent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logininfo)
      });

      const result = await res.json();

      if (res.ok) {
        alert(result.message || 'Event creation successful');
         await updateclubdetailes();
         navigate('/');
        seteventlogo(iiti);
        setlogininfo({
          EventName: "",
          EventDateAndTime: "",
          ConductedBy: {club_name},
          EventInfo: "",
          Eventlogo: eventlogo ,
          comments:[]
        });

      } else {
        if (result.errors) {
          setErrors(result.errors);
        } else {
          setErrors([result.message || 'Event Creation failed']);
        }
      }
    } catch (error) {
      console.error('Error submitting event:', error);
      alert('Event submission failed');
    }
    finally{
      setloading(false);
    }
  };

  return (
    <>
      <div className="createvent w-full h-full flex justify-center items-center bg-gradient-to-b from-[#01011b] to-[#0a0a2e]">
        <div className="createevent_con relative flex flex-col w-[90%] md:w-[400px] m-6 p-6 bg-gradient-to-r from-cyan-700/30 to-blue-700/30 border border-cyan-300 rounded-xl shadow-md hover:shadow-[0_0_25px_#00ffff66] transition-shadow duration-300">


          <button
            className="back absolute top-2 right-2 w-[30px] h-[30px] rounded-md hover:bg-red-500 flex items-center justify-center text-white font-bold"
            onClick={() => navigate(-1)}
          >
            ❌
          </button>

          <form
            action="/individualclubpage"
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center w-full h-full"
          >
            {loading&&<ClipLoader color="#36d7b7" loading={loading} size={50} />}
            <h2 className="text-white font-bold text-2xl py-4">Event Details</h2>




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
              placeholder="Event Name"
              className="bg-white/90 text-black w-[90%] md:w-[75%] h-[50px] px-4 mb-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-400 transition duration-300"
              name="EventName"
              value={logininfo.EventName}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Event Date And Time"
              className="bg-white/90 text-black w-[90%] md:w-[75%] h-[50px] px-4 mb-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-400 transition duration-300"
              name="EventDateAndTime"
              value={logininfo.EventDateAndTime}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Conducted By"
              name="ConductedBy"
              className="bg-white/90 text-black font-bold w-[90%] md:w-[75%] h-[50px] px-4 mb-4 rounded-lg shadow-md"
              value={logininfo.ConductedBy}
              readOnly
            />
            <textarea
              type="text"
              placeholder="Event Info"
              name="EventInfo"
              className="bg-white/90 text-black w-[90%] md:w-[75%] h-[100px] px-4 mb-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-400 transition duration-300"
              value={logininfo.EventInfo}
              onChange={handleChange}
            />

            <div className="flex justify-around items-center gap-6 py-4">
              <h2 className="text-white font-bold">Event logo :</h2>
              <label className="w-20 h-20 border border-cyan-300 rounded-xl overflow-hidden flex items-center justify-center cursor-pointer bg-white shadow hover:shadow-lg transition">
                <img src={eventlogo} className="w-full h-full object-cover" alt="logo" />
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


export default Createevent