import React,
{ useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import user from '../Images/user.png';

function Signup(props) {
  // This component allows users to sign up for an account
  // It includes a form where users can input their name, email, and password
  const navigate = useNavigate();
  const [userphoto, setuserphoto] = useState(user);
  const [errors, setErrors] = useState([]);
  const [logininfo, setlogininfo] = useState({
    name: "",
    email: "",
    password: "",
    userphoto: userphoto

  })
  // useState is used to manage the state of the login information
  // The initial state is an object with empty strings for name, email, and password
  const change = (e) => {
    const copylogininfo = { ...logininfo };
    const { name, value } = e.target;
    copylogininfo[name] = value;
    setlogininfo(copylogininfo);

  }
  const handlelogochange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setuserphoto(reader.result);
        setlogininfo(prev => ({
          ...prev,
          userphoto: reader.result
        }));
      }
      reader.readAsDataURL(file);
    }

  }
  const handlesignup = async (e) => {
    // This function handles the signup form submission
    // It prevents the default form submission behavior, sends the data to the server,
    e.preventDefault();

    //Fetch API is used to send a POST request to the server with the signup data 
    try {
      const res = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(logininfo)
      });
      const result = await res.json();
      console.log(result);
      //For fetching the data for profile name 

      if (res.ok) {
        alert(result.message || 'signup successful');
        localStorage.setItem('personinfo', JSON.stringify(result.user));
        props.setpersoninfo(result.user);
        props.setissignup(true);
        setlogininfo({
          name: "",
          email: "",
          password: "",
          user_photo: userphoto
        });

        // After a successful signup, the user is redirected to the home page
        // This will redirect the user to the home page where they can see the announcements
        navigate('/');

      }
      else {
        if (result.errors) {
          setErrors(result.errors);
        } else {
          setErrors([result.message || 'Signup failed']);
        }
      }
    }
    catch (error) {
      console.log(error);
      alert('signup failed');
    }
  }



  return (

    <div className="signup w-full h-full flex justify-center items-center bg-gradient-to-b from-[#01011b] to-[#0a0a2e]">
      <div className="signupcontainer flex flex-col w-[90%] md:w-[400px] m-6 p-6 bg-gradient-to-r from-cyan-700/30 to-blue-700/30 border border-cyan-300 rounded-xl shadow-md hover:shadow-[0_0_25px_#00ffff66] transition-shadow duration-300">
        <form onSubmit={handlesignup}>
          <div className="signupform flex flex-col items-center justify-center w-full h-full">
            <h2 className="text-2xl text-white font-extrabold py-6 tracking-wide animate-fade-in-up drop-shadow-[0_0_6px_cyan]">
              CREATE ACCOUNT
            </h2>

            {errors.length > 0 && (
              <div className="w-full flex justify-center mb-6">
                {errors.map((msg, idx) => (
                  <div key={idx} className="text-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-md shadow-lg animate-fade-in">
                    {msg}
                  </div>
                ))}
              </div>
            )}

            <input
              type="text"
              className="bg-white/90 text-black w-[90%] md:w-[75%] h-[50px] px-4 mb-5 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:shadow-[0_0_10px_cyan] transition duration-300 placeholder:text-cyan-700"
              name="name"
              placeholder="Username"
              value={logininfo.name}
              id="Inputusername"
              onChange={change}
              required
            />

            <input
              type="email"
              className="bg-white/90 text-black w-[90%] md:w-[75%] h-[50px] px-4 mb-5 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:shadow-[0_0_10px_cyan] transition duration-300 placeholder:text-cyan-700"
              name="email"
              placeholder="Email"
              value={logininfo.email}
              id="InputEmail1"
              onChange={change}
              required
            />

            <input
              type="password"
              className="bg-white/90 text-black w-[90%] md:w-[75%] h-[50px] px-4 mb-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:shadow-[0_0_10px_cyan] transition duration-300 placeholder:text-cyan-700"
              name="password"
              placeholder="Password"
              value={logininfo.password}
              id="InputPassword1"
              onChange={change}
              required
            />

            <div className="flex justify-around items-center gap-6 py-4">
              <h2 className="text-white font-bold">User Photo :</h2>
              <label className="w-20 h-20 rounded-xl overflow-hidden flex items-center justify-center cursor-pointer bg-white shadow-md hover:shadow-lg transition">
                <img src={userphoto} className="w-full h-full object-contain" alt="logo" />
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
              className="signupsubmitbutton w-[90%] md:w-[200px] py-3 text-white text-lg font-bold bg-gradient-to-r from-[#007bff] to-[#00c3ff] rounded-lg shadow-md hover:shadow-[0_0_20px_cyan] hover:scale-105 transition-all duration-300"
            >
              SIGNUP
            </button>
          </div>

          <p className="text-white font-bold mt-4">Already have an account?</p>
          <Link to="/login" className="text-cyan-300 font-bold hover:underline transition-colors duration-200">
            Login
          </Link>
        </form>
      </div>
    </div>

  )
}

export default Signup

