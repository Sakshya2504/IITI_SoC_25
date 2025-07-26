import { useEffect, useState, React } from "react";
import "./Animation.css";
import { useNavigate } from "react-router-dom";
import commentlogo from "../Images/comment.png";
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
  });
  const [Comment, setComment] = useState({});
  const handlecomment = async (e) => {
    e.preventDefault();
    const _id = e.target.id;
    console.log(_id);
    const comment = Comment[_id];
    const emailid = props.personinfo.email;
    setComment((prev) => ({ ...prev, [_id]: "" }));
    try {
      await fetch(`http://localhost:3000/api/comment/${_id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailid, comment }),
      });
    } catch (err) {
      console.error(err);
      // alert('Something went wrong......');
    }
  };
  const change = (e) => {
    const { id, value } = e.target;
    setComment((prev) => ({ ...prev, [id]: value }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setregisterinfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `http://localhost:3000/events/${selectedEventId}/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(registerinfo),
        }
      );
      if (res.ok) {
        alert("Registered successfully!");
        setregister(false);
        setregisterinfo({
          Name: "",
          EmailAddress: "",
          RollNumber: "",
          Program: "",
          Branch: "",
          PhoneNumber: "",
        });
        navigate("/");
      } else {
        if (res.errors) {
          setErrors(res.errors);
        } else {
          setErrors([res.message || "Registration Failed"]);
        }
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  // useEffect is used to fetch the events from the server when the component mounts
  // It sends a GET request to the server to retrieve the events data
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:3000/Events");
        const data = await res.json();

        const updatedEvents = data.map((eve) => ({
          ...eve,
          id: eve._id,
        }));

        setEvents(updatedEvents);

        const counts = {};
        for (const event of updatedEvents) {
          const response = await fetch(
            `http://localhost:3000/events/${event._id}/registrations/count`
          );
          const { count } = await response.json();
          counts[event._id] = count;
        }

        setRegistrationCounts(counts);
      } catch (err) {
        console.error("Failed to load events or counts:", err);
      }
    };

    fetchEvents();
  }, [selectedEventId]);


  useEffect(() => {
    if (!props.searchQuery) {
      setFilteredEvents([]);
      return;
    }

    const filtered = events.filter(
      (event) =>
        event.EventName.toLowerCase().includes(
          props.searchQuery.toLowerCase()
        ) ||
        event.ConductedBy.toLowerCase().includes(
          props.searchQuery.toLowerCase()
        )
    );

    setFilteredEvents(filtered);
  }, [props.searchQuery, events]);

  const [flippedEventId, setFlippedEventId] = useState(null);

  const toggleFlip = (id) => {
    setFlippedEventId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mx-4  ">
        {(filteredEvents.length > 0 ? filteredEvents : events).map((event) => (
          <div
            key={event.id}
            className="event-detail rounded-2xl shadow-lg p-6 bg-gradient-to-br from-cyan-500/10 to-blue-700/10 border border-cyan-400 hover:border-cyan-300 hover:shadow-[0_0_30px_cyan] hover:scale-[1.05] "
          >
            {filteredEvents.length === 0 && props.searchQuery && (
              <p className="text-white text-center mt-4 animate-fade-in">
                No events found for "{props.searchQuery}"
              </p>
            )}

            <div className="box block perspective-[1200px]">
              <div
                className={`card relative grid transform transition-transform duration-500 transform-style-preserve-3d ${
                  flippedEventId === event.id ? "rotate-y-180" : ""
                }`}
                  onClick={() => toggleFlip(event.id)}
              >
                {/* FRONT SIDE */}
                <div
                  className="event-description col-start-1 row-start-1 space-y-3 relative backface-hidden"

                >
                  <div className="event-logo flex justify-center items-center mb-2">
                    <img
                      alt="Event Logo"
                      src={event.Eventlogo}
                      className="h-[90px] w-[90px] object-contain hover:scale-[2] "
                    />
                  </div>



                  <p className="text-white text-sm md:text-base font-medium">
                    🕒 Time: {event.EventDateAndTime}
                  </p>
                  <p className="text-white text-sm md:text-base font-medium">
                    📍 Info: {event.EventInfo}
                  </p>
                  <p className="text-white font-semibold">🎭 Event: {event.EventName}</p>
                  <p className="text-white font-semibold">
                    📋 Registered: {registrationCounts[event._id] ?? '...'} students
                  </p>
                  <p className="text-white font-semibold">
                    🧑‍💼 Conducted by: {event.ConductedBy}
                  </p>
                </div>

                {/* BACK SIDE */}

                  <div id='back' className=' absolute col-start-1 row-start-1 flex flex-col justify-center items-center top-0 left-0 w-[100%] h-[100%] backface-hidden  '>
                    <h1 className='text-[#11E3FB] font-bold text-[32px] pt-[10px] pb-[10px]'>{event.EventName}</h1>
                    <p className='text-white font-bold'> {event.EventInfo}</p>

                    <button
                      className="mt-10 bg-blue-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                      id={`joinEvent${event.id}`}
                      onClick={() => {
                        if (props.issignup) {
                          setSelectedEventId(event.id);
                          setregister(true);
                        } else {
                          navigate("/signup");
                          alert("Please verify your email to continue.");
                        }
                      }}
                    >
                      Join Event
                    </button>
                    <form
                      id={event.id}
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (props.issignup) {
                          setSelectedEventId(event.id);
                          handlecomment(e);
                        } else {
                          navigate("/signup");
                          alert("Please verify your email to continue.");
                        }
                      }}
                      className="flex flex-row m-10 w-[100%] justify-between items-center"
                    >
                      <img
                        src={commentlogo}
                        className={`cursor-pointer w-8 h-8 invert `}
                      />
                      <input
                        type="text"
                        id={event.id}
                        onChange={change}
                        value={Comment[event.id] || ""}
                        placeholder="Add a Comment"
                        className="text-black bg-white  rounded-2xl w-auto "
                      />
                      <button
                        type="submit"
                        className="text-white font-bold cursor-pointer"
                      >
                        Submit
                      </button>
                    </form>
                    <div className="overflow-y-scroll scrollbar-hidden ">
                      {event.comments.map((com, index) => (
                        <div key={index}>
                          <p className="text-sm">{com.emailid}</p>
                          <p>{com.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>


                  <p className="text-white text-sm md:text-base font-medium">
                    🕒 Time: {event.EventDateAndTime}
                  </p>
                  <p className="text-white text-sm md:text-base font-medium">
                    📍 Info: {event.EventInfo}
                  </p>
                  <p className="text-white font-semibold">
                    🎭 Event: {event.EventName}
                  </p>
                  <p className="text-white font-semibold">
                    📋 Registered: {registrationCounts[event._id] ?? "..."}{" "}
                    students
                  </p>
                  <p className="text-white font-semibold">
                    🧑‍💼 Conducted by: {event.ConductedBy}
                  </p>
                </div>

                {/* BACK SIDE */}
                <div className="absolute inset-0 flex flex-col justify-center items-center rotate-y-180 backface-hidden">
                  <h1 className="text-[#11E3FB] font-bold text-2xl py-2 text-center">
                    {event.EventName}
                  </h1>
                  <p className="text-white text-center font-medium px-4">
                    {event.EventInfo}
                  </p>
                  <button
                    className="mt-6 bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 py-2 rounded-lg font-bold shadow-md hover:shadow-lg hover:scale-105 "
                    id={`joinEvent${event.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (props.issignup) {
                        setSelectedEventId(event.id);
                        setregister(true);
                      } else {
                        navigate("/signup");
                        alert("Please verify your email to continue.");
                      }
                    }}
                  >
                    Join Event
                  </button>
                </div>

              </div>
            </div>

        ))}

 </div>
      {register && (
        <div className="fixed top-0 z-1000 w-[100%] h-[100%] flex justify-center items-center ">
          <div className=" fixed flex flex-col w-[90%] md:w-[400px] m-[30px] p-[20px] bg-[linear-gradient(to_right,_rgba(6,182,212),_rgba(59,130,246))]  border-2 rounded-[10px] border-black  shadow-[0px_4px_15px_rgba(0, 0, 0, 0.1)]  hover:shadow-[0_0_25px_#00ffff66]">
            <button
              className="back absolute top-[2px] right-[2px] cursor-pointer w-[30px] h-[30px] rounded-[5px] hover:bg-red-500 "
              onClick={() => setregister(false)}
            >
              {" "}
              ❌{" "}
            </button>

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
                      <p key={idx} className="my-1">
                        {msg}
                      </p>
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
      )}
    </>
  );
}
