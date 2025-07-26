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
            className="event-detail rounded-2xl shadow-lg p-6 bg-gradient-to-br from-cyan-500/10 to-blue-700/10 border border-cyan-400 hover:border-cyan-300 hover:shadow-[0_0_30px_cyan] hover:scale-[1.1] "
          >
            {filteredEvents.length === 0 && props.searchQuery && (
              <p className="text-white text-center mt-4 animate-fade-in">
                No events found for "{props.searchQuery}"
              </p>
            )}

            <div className="box ">
              <div

                className={`card  ${flippedEventId === event.id ? 'boxrotate' : '' }`}
                onClick={() => toggleFlip(event.id)}
              >
                {/* FRONT SIDE */}
                <div id='front' className="event-description  space-y-3 ">

                  <div className="event-logo flex justify-center items-center mb-2">
                    <img
                      alt="Event Logo"
                      src={event.Eventlogo}
                      className="h-[90px] w-[90px] object-contain hover:scale-[5] hover:translate-y-25 "
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
                
                  <div id='back' className='  '>
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

                    }} className='flex flex-row m-1 w-[100%] justify-between items-center'>
                       <img src={commentlogo} className={`cursor-pointer w-8 h-8 invert `} />
                      <input type="text" id={event.id} onChange={change} value={Comment[event.id]||''} placeholder='Add a Comment' className='text-black bg-white  rounded-2xl w-auto ' onClick={() => toggleFlip(event.id)} />
                      <button type='submit' className='text-white font-bold cursor-pointer'>Submit</button>
                    </form>
                    <div className='overflow-y-scroll scrollbar-hidden '>
                    {event.comments.map((com,index)=>(
                      <div key={index}>
                        <p className='text-sm text-white'>{com.emailid}</p>
                        <p className='text-white font-bold'>{com.comment}</p>
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

    </>
  );
}
