// import { useEffect, useState, React } from "react";
// import "./Animation.css";
// import { useNavigate } from "react-router-dom";
// import commentlogo from "../Images/comment.png";
// // import { event_ } from "../../Backened/models/Event";
// export default function Events(props) {
//   // This component fetches and displays a list of events
//   // It uses the useState hook to manage the state of events
//   const navigate = useNavigate();
//   const [errors, setErrors] = useState([]);
//   const [selectedEventId, setSelectedEventId] = useState(null);
//   const [events, setEvents] = useState([]);
//   const [comments, setcomments] = useState([]);
//   const [registrationCounts, setRegistrationCounts] = useState({});
//   const [register, setregister] = useState(false);
//   const [filteredEvents, setFilteredEvents] = useState([]);
//   const [commenteventid, setcommenteventid] = useState(null);
//   const [registerinfo, setregisterinfo] = useState({
//     Name: "",
//     EmailAddress: "",
//     RollNumber: "",
//     Program: "",
//     Branch: "",
//     PhoneNumber: "",
//   });
//   const [Comment, setComment] = useState({});
//   const handlecomment = async (e) => {
//     e.preventDefault();
//     const _id = e.target.id;
//     console.log(_id);
//     const comment = Comment[_id];
//     const emailid = props.personinfo.email;
//     setComment((prev) => ({ ...prev, [_id]: "" }));
//     try {
//       await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/comment/${_id}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ emailid, comment }),
//       });
//     } catch (err) {
//       console.error(err);
//       // alert('Something went wrong......');
//     }
//   };
//   const change = (e) => {
//     const { id, value } = e.target;
//     setComment((prev) => ({ ...prev, [id]: value }));
//   };
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setregisterinfo((prev) => ({ ...prev, [name]: value }));
//   };
//   useEffect(() => {
//     if (!commenteventid) return;
//     const fetchcomments = async () => {
//       try {
//         const res = await fetch(
//           `${import.meta.env.VITE_BACKEND_URL}/Events/${commenteventid}`
//         );
//         if (res.ok) {
//           const data = await res.json();
//           setcomments(data.reverse());
//         }
//       } catch (err) {
//         console.error("Failed to load comments:", err);
//       }
//     };
//     fetchcomments();
//   }, [commenteventid]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const eventId = selectedEventId || e.target.id;

//     try {
//       const response = await fetch(
//         `${
//           import.meta.env.VITE_BACKEND_URL
//         }/events/${selectedEventId}/register`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(registerinfo),
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         setErrors([]);
//         setregister(false);
//         setSelectedEventId(null);
//         alert("Registration successful!");
//       } else {
//         const errorData = await response.json();
//         setErrors(
//           errorData.errors || ["Registration failed. Please try again."]
//         );
//       }
//     } catch (error) {
//       console.error("Error during registration:", error);
//       setErrors(["Registration failed. Please try again."]);
//     }
//   };

//   // useEffect is used to fetch the events from the server when the component mounts
//   // It sends a GET request to the server to retrieve the events data
//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const res = await fetch(
//           `${import.meta.env.VITE_BACKEND_URL}/Events`
//         );
//         const data = await res.json();

//         const updatedEvents = [data]
//           .map((eve) => ({
//             ...eve,
//             id: eve._id,
//           }))
//           .reverse();

//         setEvents(updatedEvents);

//         const counts = {};
//         for (const event of updatedEvents) {
//           // ✅ Validate event._id before making the fetch call
//           if (!event._id || event._id === "undefined" || event._id === "null") {
//             console.warn("Skipping invalid event ID:", event._id);
//             continue;
//           }

//           try {
//             const response = await fetch(
//               `${import.meta.env.VITE_BACKEND_URL}/events/${
//                 event._id
//               }/registrations/count`
//             );

//             if (!response.ok) {
//               console.warn(`Count fetch failed for event ${event._id}`);
//               continue;
//             }

//             const { count } = await response.json();
//             counts[event._id] = count;
//           } catch (error) {
//             console.error(
//               `Error fetching count for event ${event._id}:`,
//               error
//             );
//           }
//         }
//         setRegistrationCounts(counts);
//       } catch (err) {
//         console.error("Failed to load events or counts:", err);
//       }
//     };

//     fetchEvents();
//   }, [selectedEventId]);

//   useEffect(() => {
//     if (!props.searchQuery) {
//       setFilteredEvents([]);
//       return;
//     }

//     const filtered = events.filter(
//       (event) =>
//         event.EventName.toLowerCase().includes(
//           props.searchQuery.toLowerCase()
//         ) ||
//         event.ConductedBy.toLowerCase().includes(
//           props.searchQuery.toLowerCase()
//         )
//     );

//     setFilteredEvents(filtered);
//   }, [props.searchQuery, events]);

//   const [flippedEventId, setFlippedEventId] = useState(null);

//   const toggleFlip = (id) => {
//     setFlippedEventId((prev) => (prev === id ? null : id));
//   };
//   const showcomment = (id) => {
//     setcommenteventid((prev) => (prev === id ? null : id));
//   };

//   return (
//     <>
//       <div className="grid bg-gradient-to-b from-[#01011b] via-[#0a0a2e] to-[#01011b] gap-8 md:grid-cols-2 lg:grid-cols-3 mx-4 my-6 ">
//         {events.length === 0 ? (
//           <div className="col-span-full flex flex-col items-center  text-white text-center mt-12 space-y-4 w-full h-screen">
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
//               alt="No events"
//               className="w-32 h-32 "
//             />
//             <p className="text-xl font-semibold">No events found.</p>
//             {props.searchQuery && (
//               <p className="text-sm text-white">
//                 No results for "
//                 <span className="italic">{props.searchQuery}</span>"
//               </p>
//             )}
//           </div>
//         ) : (
//           (filteredEvents.length > 0 ? filteredEvents : events).map((event) => (
//             <div
//               key={event._id}
//               className="event-detail  rounded-2xl shadow-lg p-6 bg-gradient-to-br from-cyan-500/10 to-blue-700/10 border border-cyan-400 hover:border-cyan-300 hover:shadow-[0_0_30px_cyan] hover:scale-[1.1] "
//             >
//               {filteredEvents.length === 0 && props.searchQuery && (
//                 <p className="text-white text-center mt-4 animate-fade-in">
//                   No events found for "{props.searchQuery}"
//                 </p>
//               )}

//               <div className="box ">
//                 <div
//                   className={`card  ${
//                     flippedEventId === event._id ? "boxrotate" : ""
//                   }`}
//                   onClick={() => toggleFlip(event._id)}
//                 >
//                   {/* FRONT SIDE */}
//                   <div id="front" className="event-description  space-y-3 ">
//                     <div className="event-logo flex justify-center items-center mb-2">
//                       <img
//                         alt="Event Logo"
//                         src={event.Eventlogo}
//                         className="h-[90px] w-[90px] object-contain hover:scale-[5] hover:translate-y-25 "
//                       />
//                     </div>

//                     <p className="text-white text-sm md:text-base font-medium">
//                       🕒 Time: {event.EventDateAndTime}
//                     </p>

//                     <p className="text-white font-semibold">
//                       🎭 Event: {event.EventName}
//                     </p>
//                     <p className="text-white font-semibold">
//                       📋 Registered: {registrationCounts[event._id] ?? "..."}{" "}
//                       students
//                     </p>
//                     <p className="text-white font-semibold">
//                       🧑‍💼 Conducted by: {event.ConductedBy}
//                     </p>
//                   </div>

//                   {/* BACK SIDE */}

//                   <div id="back" className="  ">
//                     <h1 className="text-[#11E3FB] font-bold text-[32px] pt-[10px] pb-[10px]">
//                       {event.EventName}
//                     </h1>
//                     <p className="text-white font-bold"> {event.EventInfo}</p>
//                     <div className="flex flex-row gap-5 justify-center items-center mt-10">
//                       <button
//                         className=" bg-blue-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//                         id={`joinEvent${event._id}`}
//                         onClick={() => {
//                           if (props.issignup) {
//                             setSelectedEventId(event._id);
//                             setregister(true);
//                           } else {
//                             navigate("/signup");
//                             alert("Please verify your email to continue.");
//                           }
//                         }}
//                       >
//                         Join Event
//                       </button>
//                       <div className="flex gap-1">
//                         <img
//                           src={commentlogo}
//                           onClick={() => {
//                             showcomment(event._id);
//                             toggleFlip(event._id);
//                           }}
//                           className={`cursor-pointer w-8 h-8 invert `}
//                         />
//                         <p className="text-white font-bold">Comment</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//       {commenteventid && (
//         <div
//           className="fixed bottom-0 left-0 md:w-[30%] right-0 md:right-auto z-30  bg-[#2A2A2A]
//               rounded-t-2xl shadow-lg transition-transform duration-300 ease-in-out
//               h-[60%] md:h-[calc(100%-120px)] border border-[#2A2A2A] flex flex-col sliding-animation "
//         >
//           {/* Header and Close */}
//           <div className="flex-shrink-0">
//             <button
//               className="text-white  font-bold cursor-pointer flex items-center"
//               onClick={() => showcomment(null)}
//             >
//               {/* Left Arrow Icon */}
//               <svg
//                 className="w-6 h-6 mr-2"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M15 19l-7-7 7-7"
//                 />
//               </svg>
//               Back
//             </button>
//             <h2 className="text-xl text-white font-bold text-center my-3">
//               Comments
//             </h2>
//           </div>

//           {/* Scrollable Comment List */}
//           <div className="flex-1 overflow-y-auto px-10 py-3 border-b space-y-3">
//             {comments.map((com, index) => (
//               <div key={index}>
//                 <p className="text-sm text-[#A8A8A8]">{com.emailid}</p>
//                 <p className="text-white font-bold">{com.comment}</p>
//               </div>
//             ))}
//           </div>

//           {/* Fixed Bottom Form */}
//           <form
//             id={commenteventid}
//             onSubmit={(e) => {
//               e.preventDefault();
//               if (props.issignup) {
//                 setSelectedEventId(commenteventid);
//                 handlecomment(e);
//               } else {
//                 navigate("/signup");
//                 alert("Please verify your email to continue.");
//               }
//             }}
//             className="flex-shrink-0 flex items-center justify-between px-4 py-3 border-t"
//           >
//             <img
//               src={commentlogo}
//               onClick={() => showcomment(commenteventid)}
//               alt="Toggle comment section"
//               className="cursor-pointer w-8 h-8 invert"
//             />
//             <input
//               type="text"
//               id={commenteventid}
//               onChange={change}
//               value={Comment[commenteventid] || ""}
//               placeholder="Add a Comment"
//               className="text-black bg-white rounded-2xl px-4 py-1 w-full mx-2"
//             />
//             <button type="submit" className="text-white font-bold">
//               Submit
//             </button>
//           </form>
//         </div>
//       )}

//       {register && (
//         <div className="fixed top-0 z-1000 w-[100%] h-[100%] flex justify-center items-center ">
//           <div className=" fixed flex flex-col w-[90%] md:w-[400px] m-[30px]  bg-[linear-gradient(to_right,_rgba(6,182,212),_rgba(59,130,246))]  border-1 rounded-[10px] border-black  shadow-[0px_4px_15px_rgba(0, 0, 0, 0.1)]  hover:shadow-[0_0_25px_#00ffff66]">
//             <button
//               className="back absolute top-[2px] right-[2px] cursor-pointer w-[30px] h-[30px] rounded-[5px] hover:bg-red-500 "
//               onClick={() => setregister(false)}
//             >
//               {" "}
//               ❌{" "}
//             </button>

//             <form
//               action="/"
//               onSubmit={handleSubmit}
//               className="flex flex-col items-center justify-center w-full h-full px-6 py-10 bg-gradient-to-b from-cyan-950 to-[#01011b] rounded-xl shadow-[0_0_25px_rgba(0,255,255,0.1)]"
//             >
//               <h2 className="text-cyan-300 text-3xl font-bold mb-8 tracking-wide drop-shadow-md">
//                 Event Registration
//               </h2>

//               {errors.length > 0 && (
//                 <div className="w-full flex justify-center mb-6">
//                   <div className="text-center px-6 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg animate-fade-in">
//                     {errors.map((msg, idx) => (
//                       <p key={idx} className="my-1">
//                         {msg}
//                       </p>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               <input
//                 type="text"
//                 placeholder="Name"
//                 name="Name"
//                 value={registerinfo.Name}
//                 onChange={handleChange}
//                 className="bg-white/90 text-black w-full md:w-[75%] h-[50px] px-5 mb-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:shadow-[0_0_10px_rgba(0,255,255,0.4)] transition-all duration-300 placeholder:text-cyan-700 placeholder:font-medium"
//               />
//               <input
//                 type="text"
//                 placeholder="Email Address"
//                 name="EmailAddress"
//                 value={registerinfo.EmailAddress}
//                 onChange={handleChange}
//                 className="bg-white/90 text-black w-full md:w-[75%] h-[50px] px-5 mb-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:shadow-[0_0_10px_rgba(0,255,255,0.4)] transition-all duration-300 placeholder:text-cyan-700 placeholder:font-medium"
//               />
//               <input
//                 type="text"
//                 placeholder="Roll Number"
//                 name="RollNumber"
//                 value={registerinfo.RollNumber}
//                 onChange={handleChange}
//                 className="bg-white/90 text-black w-full md:w-[75%] h-[50px] px-5 mb-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:shadow-[0_0_10px_rgba(0,255,255,0.4)] transition-all duration-300 placeholder:text-cyan-700 placeholder:font-medium"
//               />
//               <input
//                 type="text"
//                 placeholder="Program"
//                 name="Program"
//                 value={registerinfo.Program}
//                 onChange={handleChange}
//                 className="bg-white/90 text-black w-full md:w-[75%] h-[50px] px-5 mb-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:shadow-[0_0_10px_rgba(0,255,255,0.4)] transition-all duration-300 placeholder:text-cyan-700 placeholder:font-medium"
//               />
//               <input
//                 type="text"
//                 placeholder="Branch"
//                 name="Branch"
//                 value={registerinfo.Branch}
//                 onChange={handleChange}
//                 className="bg-white/90 text-black w-full md:w-[75%] h-[50px] px-5 mb-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:shadow-[0_0_10px_rgba(0,255,255,0.4)] transition-all duration-300 placeholder:text-cyan-700 placeholder:font-medium"
//               />
//               <input
//                 type="text"
//                 placeholder="Phone Number"
//                 name="PhoneNumber"
//                 value={registerinfo.PhoneNumber}
//                 onChange={handleChange}
//                 className="bg-white/90 text-black w-full md:w-[75%] h-[50px] px-5 mb-8 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:shadow-[0_0_10px_rgba(0,255,255,0.4)] transition-all duration-300 placeholder:text-cyan-700 placeholder:font-medium"
//               />

//               <button
//                 type="submit"
//                 className="relative w-full md:w-[200px] py-3 text-white text-lg font-bold bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_cyan]"
//               >
//                 Register
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
import { useEffect, useState, React } from "react";
import "./Animation.css";
import { useNavigate } from "react-router-dom";
import commentlogo from "../Images/comment.png";
// import { event_ } from "../../Backened/models/Event";
export default function Events(props) {
  // This component fetches and displays a list of events
  // It uses the useState hook to manage the state of events
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [events, setEvents] = useState([]);
  const [comments,setcomments]=useState([]);
  const [registrationCounts, setRegistrationCounts] = useState({});
  const [register, setregister] = useState(false);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [commenteventid,setcommenteventid]=useState(null);
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
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/comment/${_id}`, {
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
    useEffect(() => {
    const fetchcomments = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Events/${commenteventid}`);
        const data = await res.json();
        if(res.ok){

        const updatedcomments = data.map(eve => ({
          ...eve
        })).reverse();

        setcomments(updatedcomments);}
      } catch (err) {
        console.error("Failed to load comments:", err);
      }
    };
(commenteventid?fetchcomments():'')
  }, [commenteventid]);

 const handleSubmit = async (e) => {
    e.preventDefault();
    const eventId = selectedEventId || e.target.id;

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/events/${selectedEventId}/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(registerinfo),
        }
      );


      if (response.ok) {
        const data = await response.json();
        setErrors([]);
        setregister(false);
        setSelectedEventId(null);
        alert("Registration successful!");
      } else {
        const errorData = await response.json();
        setErrors(errorData.errors || ["Registration failed. Please try again."]);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setErrors(["Registration failed. Please try again."]);
    }
  };

  // useEffect is used to fetch the events from the server when the component mounts
  // It sends a GET request to the server to retrieve the events data
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/Events`);
        const data = await res.json();

        const updatedEvents = data
          .map((eve) => ({
            ...eve,
            id: eve._id,
          }))
          .reverse();

        setEvents(updatedEvents);

        const counts = {};
        for (const event of updatedEvents) {
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/events/${event._id}/registrations/count`
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
   const showcomment = (id) => {
    setcommenteventid((prev) => (prev === id ? null : id));
  };



  return (
    <>

    <div className="grid bg-gradient-to-b from-[#01011b] via-[#0a0a2e] to-[#01011b] gap-8 md:grid-cols-2 lg:grid-cols-3 mx-4 my-6 ">
      {events.length===0?(
 <div className="col-span-full flex flex-col items-center  text-white text-center mt-12 space-y-4 w-full h-screen">
      <img
        src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
        alt="No events"
        className="w-32 h-32 "
      />
      <p className="text-xl font-semibold">No events found.</p>
      {props.searchQuery && (
        <p className="text-sm text-white">
          No results for "<span className="italic">{props.searchQuery}</span>"
        </p>
      )}
    </div>
      ):
        ((filteredEvents.length > 0 ? filteredEvents : events).map((event) => (
          <div
            key={event.id}
            className="event-detail  rounded-2xl shadow-lg p-6 bg-gradient-to-br from-cyan-500/10 to-blue-700/10 border border-cyan-400 hover:border-cyan-300 hover:shadow-[0_0_30px_cyan] hover:scale-[1.1] "
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
                    <div className='flex flex-row gap-5 justify-center items-center mt-10'>
                    <button
                      className=" bg-blue-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                      id={`joinEvent${event.id}`} onClick={() => {
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
                    <div className='flex gap-1'>
                  <img src={commentlogo} onClick={() => {showcomment(event.id);
                        toggleFlip(event.id)
                       }} className={`cursor-pointer w-8 h-8 invert `} />
                       <p className='text-white font-bold'>Comment</p>
                       </div>
                  </div>
                  </div>
              </div>
            </div>
          </div>


        )))}
    </div>
           {commenteventid  &&
            (<div
  className='fixed bottom-0 left-0 md:w-[30%] right-0 md:right-auto z-30  bg-[#2A2A2A]
              rounded-t-2xl shadow-lg transition-transform duration-300 ease-in-out
              h-[60%] md:h-[calc(100%-120px)] border border-[#2A2A2A] flex flex-col sliding-animation '
>
  {/* Header and Close */}
  <div className="flex-shrink-0">
    <button
      className="text-white  font-bold cursor-pointer flex items-center"
      onClick={() => showcomment(null)}
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
    <h2 className="text-xl text-white font-bold text-center my-3">Comments</h2>
  </div>

  {/* Scrollable Comment List */}
  <div className="flex-1 overflow-y-auto px-10 py-3 border-b space-y-3">
    {comments.map((com, index) => (
      <div key={index}>
        <p className="text-sm text-[#A8A8A8]">{com.emailid}</p>
        <p className="text-white font-bold">{com.comment}</p>
      </div>
    ))}
  </div>

  {/* Fixed Bottom Form */}
  <form
    id={commenteventid}
    onSubmit={(e) => {
      e.preventDefault();
      if (props.issignup) {
        setSelectedEventId(commenteventid);
        handlecomment(e);
      } else {
        navigate('/signup');
        alert('Please verify your email to continue.');
      }
    }}
    className="flex-shrink-0 flex items-center justify-between px-4 py-3 border-t"
  >
    <img
      src={commentlogo}
      onClick={() => showcomment(commenteventid)}
      alt="Toggle comment section"
      className="cursor-pointer w-8 h-8 invert"
    />
    <input
      type="text"
      id={commenteventid}
      onChange={change}
      value={Comment[commenteventid] || ''}
      placeholder="Add a Comment"
      className="text-black bg-white rounded-2xl px-4 py-1 w-full mx-2"
    />
    <button type="submit" className="text-white font-bold">
      Submit
    </button>
  </form>
</div>
)}

      {register &&

        <div className='fixed top-0 z-1000 w-[100%] h-[100%] flex justify-center items-center '>
          <div className=' fixed flex flex-col w-[90%] md:w-[400px] m-[30px]  bg-[linear-gradient(to_right,_rgba(6,182,212),_rgba(59,130,246))]  border-1 rounded-[10px] border-black  shadow-[0px_4px_15px_rgba(0, 0, 0, 0.1)]  hover:shadow-[0_0_25px_#00ffff66]'>
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