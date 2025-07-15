
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
    <div className="con flex flex-col bg-[rgba(1,1,27)] w-[100vw] justify-center items-center ">
     { notifi.map((e,index)=>(
      <div key={index} className="notifi flex flex-row justify-between h-auto items-center my-[7px] w-[90%] md:w-[80%] gap-auto bg-[linear-gradient(to bottom right,rgba(10, 10, 46, 0.9),
  rgba(1, 1, 27, 0.95))] border-1 border-[#80d6e3] rounded-2xl md:rounded-[40px] hover:scale-[1.05] hover:border-2 hover:border-[#33bbcf]  "> 
    
        <div className='notifi_info my-1 ml-5 md:ml-20'>
        <h2 className='text-1xl md:text-2xl font-[500] text-white '>{e.anouncement_heading}</h2>
        <p className='text-white text-sm'>{e.anouncment_info}</p>
        </div>
        <div className='image_con '>
         <img src={e.anouncment_photo} alt="image" className= ' h-[45px] md:h-[60px] w-[55px] md:w-[70px] object-fill border rounded-[10%] my-5 mr-5 md:mr-20 '  />
         </div>
      </div>

      ))}

    </div>
  </>
);
}
