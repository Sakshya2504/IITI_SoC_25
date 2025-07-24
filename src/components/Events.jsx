
import { useEffect, useState, React } from 'react';
import './Animation.css'
import { useNavigate } from 'react-router-dom';

export default function Events(props) {
  // This component fetches and displays a list of events
  // It uses the useState hook to manage the state of events
  const navigate = useNavigate();
   const [errors, setErrors] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [events, setEvents] = useState([]);
  const [registrationCounts, setRegistrationCounts] = useState({});
  const [register, setregister] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [registerinfo, setregisterinfo] = useState({
    Name: "",
    EmailAddress: "",
    RollNumber: "",
    Program: "",
    Branch: "",
    PhoneNumber: "",

  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setregisterinfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/events/${selectedEventId}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerinfo),
      });
      if (res.ok) {
        alert('Registered successfully!');
        setregister(false);
        setregisterinfo({
          Name: '',
          EmailAddress: '',
          RollNumber: '',
          Program: '',
          Branch: '',
          PhoneNumber: ''
        });
        navigate('/');
      }
      else {
        if (result.errors) {
          setErrors(result.errors);
        } else {
          setErrors([result.message || 'Registration Failed']);
        }
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    }
  };



  // useEffect is used to fetch the events from the server when the component mounts
  // It sends a GET request to the server to retrieve the events data
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('http://localhost:3000/Events');
        const data = await res.json();

        const updatedEvents = data.map(eve => ({
          ...eve,
          id: eve._id
        }));

        setEvents(updatedEvents);

        const counts = {};
        for (const event of updatedEvents) {
          const response = await fetch(`http://localhost:3000/events/${event._id}/registrations/count`);
          const { count } = await response.json();
          counts[event._id] = count;
        }

        setRegistrationCounts(counts);
      } catch (err) {
        console.error("Failed to load events or counts:", err);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (!props.searchQuery) {
      setFilteredEvents([]);
      return;
    }

    const filtered = events.filter(event =>
      event.EventName.toLowerCase().includes(props.searchQuery.toLowerCase()) ||
      event.ConductedBy.toLowerCase().includes(props.searchQuery.toLowerCase())
    );

    setFilteredEvents(filtered);
  }, [props.searchQuery, events]);


  return (
    <>

      <div className="p-4 bg-[#01011b] min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-white text-center">Events</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(filteredEvents.length > 0 ? filteredEvents : events).map((event) => (
            <div
              key={event.id}
              className="event-detail rounded-2xl shadow-md p-4  bg-gradient-to-r from-cyan-500/5 to-blue-500/5 space-y-3 border-2 border-[#87CEEB]
            hover:border-[#33bbcf] hover:scale-[1.03] "
            >

              {filteredEvents.length === 0 && props.searchQuery && (
                <p className="text-white text-center mt-4">
                  No events found for "{props.searchQuery}"
                </p>
              )}


              <div className='box block transform-3d perspective-[1000px] hover:rotate-y-180 transition delay-[0.3s]'>
                <div className='card grid relative transform-3d'>
                  <div id='front ' className="event-description  col-start-1 row-start-1 space-y-1 relative backface-hidden">
                    <div className="event-logo flex items-center justify-center">
                      <img
                        alt="Event Logo"
                        src={event.Eventlogo}
                        className="h-100 w-100"
                      />
                    </div>
                    <p className="text-white font-medium">🕒 Time: {event.EventDateAndTime}</p>
                    <p className="text-white font-medium">📍 Info: {event.EventInfo}</p>
                    <p className="text-white font-semibold">🎭 Event: {event.EventName}</p>
                    <p className="text-white font-semibold">
                      📋 Registered: {registrationCounts[event._id] ?? '...'} students
                    </p>
                    <p className="text-white font-semibold">
                      🧑‍💼 Conducted by: {event.ConductedBy}
                    </p>


                  </div>
                  <div id='back' className=' absolute col-start-1 row-start-1 flex flex-col justify-center items-center top-0 left-0 w-[100%] h-[100%] backface-hidden rotate-y-180 '>
                    <h1 className='text-[#11E3FB] font-bold text-[32px] pt-[10px] pb-[10px]'>{event.EventName}</h1>
                    <p className='text-white font-bold'> {event.EventInfo}</p>
                    <button
                      className="mt-10 bg-blue-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                      id={`joinEvent${event.id}`} onClick={() => {
                        if (props.issignup) {
                          setSelectedEventId(event.id);
                          setregister(true);
                        } else {
                          navigate('/signup');
                          alert('Please verify your email to continue.');
                        }
                      }}
                    >
                      Join Event
                    </button>
                  </div>
                </div>
              </div>
            </div>

          ))}
        </div>

      </div>
      {register &&

        <div className='fixed top-0 z-1000 w-[100%] h-[100%] flex justify-center items-center '>
          <div className=' fixed flex flex-col w-[90%] md:w-[400px] m-[30px] p-[20px] bg-[linear-gradient(to_right,_rgba(6,182,212),_rgba(59,130,246))]  border-2 rounded-[10px] border-black  shadow-[0px_4px_15px_rgba(0, 0, 0, 0.1)]  hover:shadow-[0_0_25px_#00ffff66]'>
            <button className='back absolute top-[2px] right-[2px] cursor-pointer w-[30px] h-[30px] rounded-[5px] hover:bg-red-500 ' onClick={() => setregister(false)}> ❌ </button>

            <form
              action="/"
              onSubmit={handleSubmit}
              className="flex flex-col items-center justify-center w-full h-full px-6 py-10 bg-gradient-to-b from-cyan-950 to-[#01011b] rounded-xl shadow-[0_0_25px_rgba(0,255,255,0.1)]"
            >
              <h2 className="text-cyan-300 text-3xl font-bold mb-8 tracking-wide drop-shadow-md">
                Event Registration
              </h2>

              {errors.length > 0 && (
                <div className="w-full flex justify-center mb-6">
                  <div className="text-center px-6 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg animate-fade-in">
                    {errors.map((msg, idx) => (
                      <p key={idx} className="my-1">{msg}</p>
                    ))}
                  </div>
                </div>
              )}

              <input
                type="text"
                placeholder="Name"
                name="Name"
                value={registerinfo.Name}
                onChange={handleChange}
                className="bg-white/90 text-black w-full md:w-[75%] h-[50px] px-5 mb-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:shadow-[0_0_10px_rgba(0,255,255,0.4)] transition-all duration-300 placeholder:text-cyan-700 placeholder:font-medium"
              />
              <input
                type="text"
                placeholder="Email Address"
                name="EmailAddress"
                value={registerinfo.EmailAddress}
                onChange={handleChange}
                className="bg-white/90 text-black w-full md:w-[75%] h-[50px] px-5 mb-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:shadow-[0_0_10px_rgba(0,255,255,0.4)] transition-all duration-300 placeholder:text-cyan-700 placeholder:font-medium"
              />
              <input
                type="text"
                placeholder="Roll Number"
                name="RollNumber"
                value={registerinfo.RollNumber}
                onChange={handleChange}
                className="bg-white/90 text-black w-full md:w-[75%] h-[50px] px-5 mb-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:shadow-[0_0_10px_rgba(0,255,255,0.4)] transition-all duration-300 placeholder:text-cyan-700 placeholder:font-medium"
              />
              <input
                type="text"
                placeholder="Program"
                name="Program"
                value={registerinfo.Program}
                onChange={handleChange}
                className="bg-white/90 text-black w-full md:w-[75%] h-[50px] px-5 mb-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:shadow-[0_0_10px_rgba(0,255,255,0.4)] transition-all duration-300 placeholder:text-cyan-700 placeholder:font-medium"
              />
              <input
                type="text"
                placeholder="Branch"
                name="Branch"
                value={registerinfo.Branch}
                onChange={handleChange}
                className="bg-white/90 text-black w-full md:w-[75%] h-[50px] px-5 mb-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:shadow-[0_0_10px_rgba(0,255,255,0.4)] transition-all duration-300 placeholder:text-cyan-700 placeholder:font-medium"
              />
              <input
                type="text"
                placeholder="Phone Number"
                name="PhoneNumber"
                value={registerinfo.PhoneNumber}
                onChange={handleChange}
                className="bg-white/90 text-black w-full md:w-[75%] h-[50px] px-5 mb-8 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:shadow-[0_0_10px_rgba(0,255,255,0.4)] transition-all duration-300 placeholder:text-cyan-700 placeholder:font-medium"
              />

              <button
                type="submit"
                className="relative w-full md:w-[200px] py-3 text-white text-lg font-bold bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_cyan]"
              >
                Register
              </button>
            </form>
          </div>
        </div>

      }
    </>);
}