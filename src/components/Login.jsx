import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import {ClipLoader} from "react-spinners"
function Login(props) {
  // This component allows users to log in to their account
  // It includes a form where users can input their email and password
  const navigate = useNavigate();
   const [loading,setloading]=useState(false);
  const [logininfo, setlogininfo] = useState({
    email: "",
    password: ""
  })
  // useState is used to manage the state of the login information
  // The initial state is an object with empty strings for email and password
  const change = (e) => {
    const copylogininfo = { ...logininfo };
    const { name, value } = e.target;
    copylogininfo[name] = value;
    setlogininfo(copylogininfo);
  }

  const handlelogin = async (e) => {
    // This function handles the login form submission
    // It prevents the default form submission behavior, sends the data to the server,
    e.preventDefault();
setloading(true);
    //Fetch API is used to send a POST request to the server with the login data
    // The server will then process this data and authenticate the user
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`,
        {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(logininfo)
        }
      );
      const result = await res.json();
      //For fetching the data for profile name

      if (res.ok) {
        alert(result.message || 'Login successful!');
        localStorage.setItem('personinfo', JSON.stringify(result.user));
        props.setpersoninfo(result.user);
        props.setissignup(true);
        setlogininfo({
          email: "",
          password: ""
        });
        // After a successful login, the user is redirected to the home page
        navigate('/');
      }
      else {


        alert(result.message || 'Invalid credentials');
      }

    }
    catch (error) {
      console.error(error);


      alert('Something went wrong');

    }finally{
      setloading(false);
    }
  }
  return (
    <>
      <div className="login w-full h-full flex justify-center items-center bg-gradient-to-b from-[#01011b] to-[#0a0a2e] animate-fade-in">
        <div className="logincontainer flex flex-col w-[90%] md:w-[400px] m-6 p-6 bg-gradient-to-r from-cyan-700/30 to-blue-700/30 border border-cyan-300 rounded-xl shadow-md hover:shadow-[0_0_25px_#00ffff66] transition-shadow duration-300">

          <form onSubmit={handlelogin}>
            <div className="loginform flex flex-col items-center justify-center w-full h-full">
              {loading&&<ClipLoader color="#36d7b7" loading={loading} size={50} />}
              <h2 className="text-2xl text-white font-extrabold py-6 tracking-wide animate-fade-in-up">
                SIGN IN
              </h2>

              <input
                type="email"
                placeholder="Email"
                value={logininfo.email}
                name="email"
                id="InputEmail1"
                onChange={change}
                className="bg-white/90 text-black w-[90%] md:w-[75%] h-[50px] px-4 mb-5 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:shadow-[0_0_10px_cyan] transition-all duration-300 placeholder:text-cyan-700"
              />

              <input
                type="password"
                placeholder="Password"
                value={logininfo.password}
                name="password"
                id="InputPassword1"
                onChange={change}
                className="bg-white/90 text-black w-[90%] md:w-[75%] h-[50px] px-4 mb-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:shadow-[0_0_10px_cyan] transition-all duration-300 placeholder:text-cyan-700"
              />

              <button
                type="submit"
                className="loginsubmitbutton w-[90%] md:w-[200px] py-3 text-white text-lg font-bold bg-gradient-to-r from-[#007bff] to-[#00c3ff] rounded-lg shadow-md hover:shadow-[0_0_20px_cyan] hover:scale-105 transition-all duration-300"
              >
                Login
              </button>
            </div>

            <p className="text-white font-bold mt-4">Don’t have an account?</p>
            <Link
              to="/signup"
              className="text-cyan-300 font-bold hover:underline transition-colors duration-200"
            >
              Signup
            </Link>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login