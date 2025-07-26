import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

function Set(props) {
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: '🧑‍🤝‍🧑 Clubs', path: '/clubselection' },
    { name: '📅 Events', path: '/' },
    { name: '🔔 Notification', path: '/notification' },
    ...(!props.issignup ? [{ name: '✍️ Signup', path: '/signup' }] : [])
  ];

  return (
    <div className="dropdown md:hidden fixed top-[120px] left-0 w-[75%] max-w-[320px] h-screen bg-black  z-50 shadow-2xl rounded-tr-3xl rounded-br-3xl p-6 animate-slide-in space-y-6">
      
      <div className="space-y-4">
        {navigation.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={props.closeset}
            className={`block text-lg font-semibold transition-all duration-300 rounded-xl px-4 py-2 ${
              location.pathname === item.path
                ? 'bg-white text-indigo-700 shadow-md scale-105'
                : 'text-white hover:bg-white/10 hover:backdrop-blur-md hover:scale-105'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>

      {props.issignup && (
        <div className="mt-8 border-t border-[#87CEEB] pt-6">
          <div className='flex flex-row ' >
          <img src={props.personinfo.userphoto} alt="user" className='w-12 h-12 my-2 mx-2 mr-4' />
          <div>
              <h2 className="text-white font-semibold text-xl mb-3">{` ${props.personinfo?.name || ''}`}</h2>
              <h2 className="text-white font-semibold text-base mb-3" >{props.personinfo?.email || 'No email '}</h2>
          </div>
          </div>
          <div
            className="text-red-400 font-bold text-xl mx-3 hover:text-red-500 cursor-pointer hover:scale-105 transition-transform duration-300 animate-pulse"
            onClick={() => {
              if (window.confirm('Do you want to logout?')) {
                localStorage.removeItem('personinfo');
                props.setissignup(false);
                props.setpersoninfo(null);
                navigate('/signup');
              }
            }}
          >
            🔓 Logout
          </div>
        </div>
      )}
    </div>
  );
}

export default Set;
