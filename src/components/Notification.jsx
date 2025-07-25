
import { useEffect, useState } from 'react';



// const notifi =[{anouncment_photo:image,anouncement_heading:'This is the heading',anouncment_info:'This is the first announcement.'},
//   {anouncment_photo:image,anouncement_heading:'This is the heading',anouncment_info:'This is the first announcement.'},
//   {anouncment_photo:image,anouncement_heading:'This is the heading',anouncment_info:'This is the first announcement.'},
//   {anouncment_photo:image,anouncement_heading:'This is the heading',anouncment_info:'This is the first announcement.'},
//   {anouncment_photo:image,anouncement_heading:'This is the heading',anouncment_info:'This is the first announcement.'},
//   {anouncment_photo:image,anouncement_heading:'This is the heading',anouncment_info:'This is the first announcement.'}];
export default function Notification() {
  // This component fetches and displays notifications
  // It uses the useState hook to manage the state of notifications
  const [notifi, setNotifi] = useState([]);

  // useEffect is used to fetch the notifications from the server when the component mounts
  // It sends a GET request to the server to retrieve the notifications data
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch('http://localhost:3000/notification');
        const data = await res.json();

        // Augment each announcement with a static image
        const filled = data.map(ann => ({
          anouncment_photo: ann.announcelogo,
          anouncement_heading: ann.heading,
          anouncment_info: ann.info
        }));
        setNotifi(filled);
      } catch (err) {
        console.error("Failed to load notifications:", err);
      }
    };

    // fetchAnnouncements is called to fetch the notifications when the component mounts
    // This will trigger the useEffect hook and fetch the notifications from the server
    fetchAnnouncements();
  }, []);

  return( 
  <>
      <div className="con flex flex-col w-full min-h-screen bg-gradient-to-b from-[#01011b] via-[#0a0a2e] to-[#01011b] items-center py-8 px-4 space-y-6">
        {notifi.map((e, index) => (
          <div
            key={index}
            className="notifi w-full md:w-[80%] flex justify-between items-center gap-4 bg-gradient-to-br from-[#0a0a2e] to-[#01011b] rounded-2xl md:rounded-[40px] border border-cyan-400 shadow-md hover:shadow-[0_0_20px_cyan] hover:border-cyan-500 transition-transform duration-300 hover:scale-105 p-4 md:p-6"
          >
            <div className="notifi_info flex-1">
              <h2 className="text-white text-lg md:text-2xl font-semibold mb-2">{e.anouncement_heading}</h2>
              <p className="text-white text-sm md:text-base">{e.anouncment_info}</p>
            </div>
            <div className="image_con flex-shrink-0">
              <img
                src={e.anouncment_photo}
                alt="announcement"
                className="h-[45px] md:h-[60px] w-[55px] md:w-[70px] object-cover rounded-lg border border-cyan-300 shadow-sm hover:shadow-md transition duration-300"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
