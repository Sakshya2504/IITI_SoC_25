import mongoose from "mongoose";
import dotenv from "dotenv";
import { Clubs_ } from "./Club.js"; // Ensure correct path
import process from "process";
dotenv.config();

const seedClubs = async () => {
  try {
    const MONGO_URL = "mongodb+srv://IITI_SoC:1234abcd@campus-announcement.hrc6rs9.mongodb.net/" ;
    await mongoose.connect(MONGO_URL);
    console.log("✅ Connected to MongoDB");

    await Clubs_.deleteMany({});

    const ClubPOJO = [
      {
        name: "Astronomy Club",
        heading: "Stargazing & Astronomy",
        info: "Astronomy Club promotes interest in celestial phenomena and organizes stargazing events.",
        logo: "/Club-logo/AstronomyClub.png",
        type: "Technical",

        clubHead: [
          {
            name: "Parul Pahurkar",
            role: "Head",
            image: "/Club-logo/AstronomyClub.png",
            linkedin:
              "https://www.linkedin.com/company/the-astronomy-club-iit-indore/",
            instagram: "https://www.instagram.com/astronomyclub_iiti/",
          },
        ],
        social: [
          {
            platform: "Instagram",
            link: "https://www.instagram.com/astronomyclub_iiti/",
          },
        ],
        events: [],
      },
      {
        name: "The Aeromodelling Club",
        heading: "Aviation & Design",
        info: "The Aeromodelling Club builds and flies model aircrafts, promoting aerospace knowledge.",
        logo: "/Club-logo/AeromodellingClub.png",
        type: "Technical",

        clubHead: [
          {
            name: "Sibasish Barik",
            role: "Head",
            image: "/Club-logo/AeromodellingClub.png",
            linkedin:
              "https://www.linkedin.com/company/aeromodelling-club-iit-indore/",
            instagram: "https://www.instagram.com/aeroclub_iiti/",
          },
        ],
        social: [
          {
            platform: "Instagram",
            link: "https://www.instagram.com/aeroclub_iiti/",
          },
        ],
        events: [],
      },
      {
        name: "CAE",
        heading: "Computer-Aided Engineering",
        info: "CAE Club focuses on simulation, design and engineering through software tools.",
        logo: "/Club-logo/CAE.275cafb6.png",
        type: "Technical",
        //// _id: "club-003",
        clubHead: [
          {
            name: "Adinath Apte",
            role: "President",
            image: "/Club-logo/CAE.275cafb6.png",
            linkedin: "https://www.linkedin.com/company/cae-club-iit-indore/",
            instagram: "https://www.instagram.com/caeclub_iiti/",
          },
        ],
        social: [
          {
            platform: "Instagram",
            link: "https://www.instagram.com/caeclub_iiti/",
          },
        ],
        events: [],
      },
      {
        name: "Concreate",
        heading: "Civil & Structural Design",
        info: "Concreate is a civil engineering-based club involved in construction, architecture and practical design.",
        logo: "/Club-logo/Concreate.png",
        type: "Technical",
        //// _id: "club-004",
        clubHead: [
          {
            name: "Rajnish Bairwa",
            role: "Head",
            image: "/Club-logo/Concreate.png",
            linkedin:
              "https://www.linkedin.com/company/concreate-club-iit-indore/",
            instagram: "https://www.instagram.com/concreate_iiti/",
          },
        ],
        social: [
          {
            platform: "Instagram",
            link: "https://www.instagram.com/concreate_iiti/",
          },
        ],
        events: [],
      },
      {
        name: "Cynaptics",
        heading: "Cultural Expression & Dance",
        info: "Cynaptics is the cultural dance club. It performs classical and contemporary forms at events and fests.",
        logo: "/Club-logo/Cynaptics.png",
        type: "Technical",
        //// _id: "club-005",
        clubHead: [
          {
            name: "Harshvardhan Choudhary",
            role: "President",
            image: "/Club-logo/Cynaptics.png",
            linkedin:
              "https://www.linkedin.com/company/cynaptics-club-iit-indore/",
            instagram: "https://www.instagram.com/cynapticsclubiiti/",
          },
        ],
        social: [
          {
            platform: "Instagram",
            link: "https://www.instagram.com/cynapticsclubiiti/",
          },
        ],
        events: [],
      },
      {
        name: "Electronics Club",
        heading: "Electronics and Embedded Systems",
        info: "The Electronics Club focuses on hands-on learning of circuits, IoT, and embedded systems.",
        logo: "/Club-logo/electronics club .66884efa.png",
        type: "Technical",
        //// _id: "club-006",
        clubHead: [
          {
            name: "Advay Kunte",
            role: "President",
            image: "/Club-logo/electronics club .66884efa.png",
            linkedin:
              "https://www.linkedin.com/company/elecclub-iit-indore/mycompany/",
            instagram: "https://www.instagram.com/electronics_club_iiti/",
          },
        ],
        social: [
          {
            platform: "Instagram",
            link: "https://www.instagram.com/electronics_club_iiti/",
          },
        ],
        events: [],
      },
      {
        name: "GDSC",
        heading: "Google Developer Student Club",
        info: "GDSC at IIT Indore helps students explore technology, contribute to open source, and build innovative solutions.",
        logo: "/Club-logo/GDSC-IITI-Logo.e90dc451.png",
        type: "Technical",
        //// _id: "club-007",
        clubHead: [
          {
            name: "Vedant Dinkar",
            role: "Lead",
            image: "/Club-logo/GDSC-IITI-Logo.e90dc451.jpg",
            linkedin:
              "https://gdsc.community.dev/indian-institute-of-technology-indore-india/",
            instagram: "https://www.instagram.com/gdsc.iiti/",
          },
        ],
        social: [
          {
            platform: "Instagram",
            link: "https://www.instagram.com/gdsc.iiti/",
          },
        ],
        events: [],
      },
      {
        name: "IVDC",
        heading: "Intelligent Vehicle Design Club",
        info: "IVDC focuses on smart vehicle technology, automation, and robotics integration.",
        logo: "/Club-logo/IVDC.png",
        type: "Technical",
        //// _id: "club-008",
        clubHead: [],
        social: [
          {
            platform: "Instagram",
            link: "https://www.instagram.com/ivdc_iiti/",
          },
        ],
        events: [],
      },
      {
        name: "Robotics Club",
        heading: "Mechanical and Robotics Engineering",
        info: "The Robotics Club builds and programs robots for national and international competitions.",
        logo: "/Club-logo/Robotics.png",
        type: "Technical",
        //// _id: "club-009",
        clubHead: [],
        social: [
          {
            platform: "Instagram",
            link: "https://www.instagram.com/roboticsclub_iitindore/",
          },
        ],
        events: [],
      },
      {
        name: "The Programming Club",
        heading: "Competitive Programming & Software Dev",
        info: "The Programming Club helps students with problem solving, DSA, and CP contests.",
        logo: "/Club-logo/Pclub.png",
        type: "Technical",

        clubHead: [],
        social: [
          {
            platform: "Website",
            link: "http://progclub.iiti.ac.in/",
          },
        ],
        events: [],
      },

      {
        name: "Aaina Club",
        heading: "Dramatics and Theatre",
        info: "Aaina Club is IIT Indore’s dramatics club known for plays, street performances and theatrical arts.",
        logo: "/Club-logo/AAINA.png",
        type: "Cultural",
       // _id: "club-011",
        clubHead: [],
        social: [
          {
            platform: "Instagram",
            link: "https://www.instagram.com/dramaticsclubiiti/",
          },
        ],
        events: [
          {
            title: "Nukkad Natak",
            description:
              "Street play performance on social issues during campus fest.",
            date: "2024-11-15",
          },
          {
            title: "Annual Theatre Production",
            description:
              "A stage drama performed by club members with live audience.",
            date: "2025-02-20",
          },
        ],
      },
      {
        name: "Avana Club",
        heading: "Social Welfare & Volunteering",
        info: "Avana Club drives social change through volunteering, awareness campaigns and community service.",
        logo: "/Club-logo/AVANA.png",
        type: "Cultural",
       // _id: "club-012",
        clubHead: [],
        social: [
          {
            platform: "Instagram",
            link: "https://www.instagram.com/avana_iiti/",
          },
        ],
        events: [
          {
            title: "Blood Donation Drive",
            description:
              "Collaborated with Red Cross to organize campus-wide donation camp.",
            date: "2024-10-01",
          },
          {
            title: "Mental Health Awareness Week",
            description:
              "Workshops, posters, and outreach campaigns on emotional well-being.",
            date: "2025-03-10",
          },
        ],
      },
      {
        name: "Cinephiles",
        heading: "Film Appreciation & Media",
        info: "Cinephiles is a film club for cinema enthusiasts, screenings, discussions and filmmaking activities.",
        logo: "/Club-logo/CINEPHILES.png",
        type: "Cultural",
       // _id: "club-013",
        clubHead: [],
        social: [
          {
            platform: "Instagram",
            link: "https://www.instagram.com/cinephiles_iiti/",
          },
        ],
        events: [
          {
            title: "Film Screening Night",
            description:
              "Classic cinema screening with an interactive discussion panel.",
            date: "2024-09-28",
          },
          {
            title: "Short Film Contest",
            description:
              "Students submitted and showcased original films on a given theme.",
            date: "2025-01-22",
          },
        ],
      },
      {
        name: "D' Alpha Crewz",
        heading: "Hip-Hop & Street Dance",
        info: "D' Alpha Crewz is a hip-hop and street-style dance crew showcasing vibrant, urban dance performances.",
        logo: "/Club-logo/ALPHA.png",
        type: "Cultural",
       // _id: "club-014",
        clubHead: [],
        social: [
          {
            platform: "Instagram",
            link: "https://www.instagram.com/d_alphazcrew/",
          },
        ],
        events: [
          {
            title: "Street Battle",
            description:
              "Hip-hop dance face-off between crews from different colleges.",
            date: "2024-11-12",
          },
          {
            title: "Dance Jam Night",
            description:
              "Freestyle open-floor performance session with live DJ.",
            date: "2025-02-02",
          },
        ],
      },
      {
        name: "The Debating Society",
        heading: "Debate & Public Speaking",
        info: "The Debating Society promotes logical reasoning and public discourse through MUNs and debates.",
        logo: "/Club-logo/DEBSOC.png",
        type: "Cultural",
       // _id: "club-015",
        clubHead: [],
        social: [
          {
            platform: "Instagram",
            link: "https://www.instagram.com/debsociiti/",
          },
        ],
        events: [
          {
            title: "IITI MUN",
            description:
              "Model United Nations with 5+ committees and international agenda.",
            date: "2024-12-08",
          },
          {
            title: "Debate Marathon",
            description:
              "24-hour debate session on political and ethical themes.",
            date: "2025-03-04",
          },
        ],
      },
      {
        name: "EBSB Club",
        heading: "Cultural Exchange",
        info: "Ek Bharat Shreshtha Bharat (EBSB) Club fosters unity through inter-state cultural exchange.",
        logo: "/Club-logo/EBSB.png",
        type: "Cultural",
       // _id: "club-016",
        clubHead: [],
        social: [
          {
            platform: "Instagram",
            link: "https://www.instagram.com/ebsbclub_iiti/",
          },
        ],
        events: [
          {
            title: "Language Learning Workshop",
            description:
              "Students learn basic phrases in paired state's language.",
            date: "2024-10-20",
          },
          {
            title: "Cultural Day",
            description:
              "Food, music, dance and dress from partner states of India.",
            date: "2025-01-13",
          },
        ],
      },
      {
        name: "Gaming Club",
        heading: "Esports & Game Culture",
        info: "Gaming Club hosts LAN events and competitive tournaments to promote gaming and esports.",
        logo: "/Club-logo/Gaming.png",
        type: "Cultural",
       // _id: "club-017",
        clubHead: [],
        social: [
          {
            platform: "Instagram",
            link: "https://www.instagram.com/gamingclubiiti/",
          },
        ],
        events: [
          {
            title: "LAN Gaming Tournament",
            description:
              "Counter-Strike and Valorant tournaments held offline in teams.",
            date: "2024-11-25",
          },
          {
            title: "Gaming Week",
            description:
              "A week-long series of casual and competitive gaming sessions.",
            date: "2025-02-10",
          },
        ],
      },
      {
        name: "Literary Club",
        heading: "Creative Writing & Literature",
        info: "The Literary Club encourages expression through poetry, writing, storytelling, and open mics.",
        logo: "/Club-logo/LIT.png",
        type: "Cultural",
       // _id: "club-018",
        clubHead: [],
        social: [
          {
            platform: "Instagram",
            link: "https://www.instagram.com/thelitclub.iiti/",
          },
        ],
        events: [
          {
            title: "Open Mic Poetry Night",
            description:
              "Students share their original poems and spoken word pieces.",
            date: "2024-09-21",
          },
          {
            title: "Story Writing Contest",
            description:
              "Submit short stories based on a given theme. Winners published in club magazine.",
            date: "2025-01-30",
          },
        ],
      },
      {
        name: "Mystic Hues",
        heading: "Fine Arts & Design",
        info: "Mystic Hues is a visual arts club focusing on sketching, painting, and creative installations.",
        logo: "/Club-logo/MYSTIC.png",
        type: "Cultural",
       // _id: "club-019",
        clubHead: [],
        social: [
          {
            platform: "Instagram",
            link: "https://www.instagram.com/mystichues/",
          },
        ],
        events: [
          {
            title: "Art Marathon",
            description:
              "12-hour sketching and painting challenge with live display.",
            date: "2024-12-01",
          },
          {
            title: "Wall Mural Project",
            description:
              "Students painted a wall mural reflecting campus culture.",
            date: "2025-02-18",
          },
        ],
      },
      {
        name: "Music Club",
        heading: "Musical Talent & Performance",
        info: "The Music Club of IIT Indore brings together vocalists and instrumentalists to create soulful tunes.",
        logo: "/Club-logo/MUSIC.png",
        type: "Cultural",
       // _id: "club-020",
        clubHead: [],
        social: [
          {
            platform: "Instagram",
            link: "https://www.instagram.com/themusicclub.iiti/",
          },
        ],
        events: [
          {
            title: "Acoustic Night",
            description:
              "Live unplugged music performance in the amphitheater.",
            date: "2024-10-22",
          },
          {
            title: "Battle of Bands",
            description: "Band performances judged live by faculty and guests.",
            date: "2025-03-05",
          },
        ],
      },
      {
        name: "Prakriti",
        heading: "Environment & Sustainability",
        info: "Prakriti Club works on environment-friendly initiatives like clean-up drives and green awareness.",
        logo: "/Club-logo/PRAKRITI.png",
        type: "Cultural",
       // _id: "club-021",
        clubHead: [],
        social: [
          {
            platform: "Instagram",
            link: "https://www.instagram.com/prakriti.iiti/",
          },
        ],
        events: [
          {
            title: "Campus Cleanup Drive",
            description:
              "Volunteers cleaned specific campus zones and promoted zero-waste practices.",
            date: "2024-09-16",
          },
          {
            title: "Sustainability Poster Contest",
            description:
              "Students designed posters on environmental issues and presented them in an exhibition.",
            date: "2025-01-25",
          },
        ],
      },
      {
        name: "The Quiz Club",
        heading: "Knowledge & Quizzing",
        info: "The Quiz Club of IIT Indore nurtures curiosity with quizzes across genres and competitive events.",
        logo: "/Club-logo/QUIZ.png",
        type: "Cultural",
       // _id: "club-022",
        clubHead: [],
        social: [
          {
            platform: "Instagram",
            link: "https://www.instagram.com/thequizclub_iiti/",
          },
        ],
        events: [
          {
            title: "Tech & Trivia Quiz",
            description:
              "An inter-hostel quiz event covering tech, science, pop culture.",
            date: "2024-11-10",
          },
          {
            title: "Fluxus General Quiz",
            description: "Flagship open quiz held during Fluxus with prizes.",
            date: "2025-02-28",
          },
        ],
      },
      {
        name: "Srijan",
        heading: "Innovation & Creation",
        info: "Srijan is a creative ideation club that hosts workshops, hackathons and invention challenges.",
        logo: "/Club-logo/SRIJAN.png",
        type: "Cultural",
       // _id: "club-023",
        clubHead: [],
        social: [
          {
            platform: "Instagram",
            link: "https://www.instagram.com/srijan_iit_indore/",
          },
        ],
        events: [
          {
            title: "Hack the Night",
            description: "A 24-hour innovation hackathon on campus.",
            date: "2025-01-12",
          },
          {
            title: "Creative Ideation Workshop",
            description:
              "Brainstorming session for developing startup ideas or social impact solutions.",
            date: "2024-12-15",
          },
        ],
      },
      {
        name: "VLR Club",
        heading: "Virtual Labs & Research",
        info: "VLR Club bridges research and simulation through virtual labs and practical learning modules.",
        logo: "/Club-logo/VLR.png",
        type: "Cultural",
       // _id: "club-024",
        clubHead: [],
        social: [
          {
            platform: "Instagram",
            link: "https://www.instagram.com/vlr_iiti/",
          },
        ],
      },
      {
        events: [
          {
            title: "Simathon",
            description:
              "A virtual lab simulation challenge focused on problem-solving.",
            date: "2025-02-08",
          },
          {
            title: "Research Showcase",
            description:
              "Poster presentations and demos of ongoing virtual lab projects.",
            date: "2024-11-30",
          },
        ],
      },
      {
        name: "Athletics Club",
        heading: "Run, Jump, Throw – Push Your Limits!",
        info: "Focuses on track & field events like sprints, long-distance runs, jumps, and throws. Encourages endurance and peak performance.",
        logo: "/_next/static/media/ath.386b5660.png",
        type: "Sports",
        clubHead: [
          {
            name: "Sanjay S",
            contact: "email@example.com",
          },
        ],
        social: [],
       // events: ["Inter-IIT Athletics Meet", "Athletico", "Time Trials"],
      },
      {
        name: "Aquatics Club",
        heading: "Dive In – Make Waves at IITI!",
        info: "Home for swimming lovers. Offers training for various strokes and prepares for Inter-IIT competitions.",
        logo: "/_next/static/media/aquatics.ed7d0f06.jpg",
        type: "Sports",
        clubHead: [
          {
            name: "Ommkar Sahoo",
            contact: "email@example.com",
          },
        ],
        social: [],
       // events: ["Inter-IIT Aquatics Meet", "Swimathon", "Pool Challenge"],
      },
      {
        name: "Badminton Club",
        heading: "Fast Rallies & Feather Smashes!",
        info: "Trains for singles and doubles games. Welcomes beginners and pros to improve agility and skills.",
        logo: "/_next/static/media/Badminton_club_logo.4228f2e8.png",
        type: "Sports",
        clubHead: [
          {
            name: "Siddhant Gupta",
            contact: "email@example.com",
          },
        ],
        social: [
          {
            platform: "Instagram",
            link: "https://www.instagram.com/badmintonclub_iiti/",
          },
        ],
       // events: ["Smash & Dash", "Shuttle Wars", "Inter-hostel Tournament"],
      },
      {
        name: "Basketball Club",
        heading: "Dribble. Dunk. Dominate.",
        info: "Builds skills in shooting, passing, and teamwork. Prepares students for Inter-IIT and local tournaments.",
        logo: "/_next/static/media/bb.cf35d768.png",
        type: "Sports",
        clubHead: [
          {
            name: "Rahul",
            contact: "email@example.com",
          },
        ],
        social: [
          {
            platform: "Instagram",
            link: "https://www.instagram.com/club_basketball_iiti/",
          },
        ],
       // events: ["Hoop Fest", "3v3 Street League", "Inter-hostel League"],
      },
      {
        name: "Chess Club",
        heading: "Outsmart. Outplay. Outlast.",
        info: "Sharpens minds through regular matches and tactics sessions. Hosts online and offline chess battles.",
        logo: "/_next/static/media/chess.581fc5c4.jpg",
        type: "Sports",
        clubHead: [
          {
            name: "Sarang Jagdish",
            contact: "email@example.com",
          },
        ],
        social: [
          {
            platform: "Instagram",
            link: "https://www.instagram.com/theberserkers_iiti/",
          },
        ],
       // events: ["Checkmate", "Bullet Blitz", "Inter-College Chess Showdown"],
      },
      {
        name: "Cricket Club",
        heading: "Pitch Perfect Passion!",
        info: "Builds teamwork, technique, and sportsmanship. Represents IITI in cricket tournaments and hosts CPL.",
        logo: "/_next/static/media/cc.afd84e15.jpg",
        type: "Sports",
        clubHead: [
          {
            name: "Monik Dodiya",
            contact: "email@example.com",
          },
        ],
        social: [
          {
            platform: "Instagram",
            link: "https://www.instagram.com/cricket_iiti/",
          },
        ],
        // events: [
        //   "Campus Premier League",
        //   "Box Cricket Night",
        //   "Inter-IIT Cricket",
        // ],
      },
      {
        name: "Football Club",
        heading: "Play the Beautiful Game!",
        info: "One of the most energetic clubs on campus. Conducts regular practices and fun leagues.",
        logo: "/_next/static/media/football.7788b263.jpg",
        type: "Sports",
        clubHead: [
          {
            name: "Muhamed Nihal",
            contact: "email@example.com",
          },
        ],
        social: [
          {
            platform: "Instagram",
            link: "https://www.instagram.com/football_club_iiti/",
          },
        ],
        // events: [
        //   "Midnight Football League",
        //   "Futsal Fiesta",
        //   "Inter-IIT Football",
        // ],
      },
      {
        name: "Tennis Club",
        heading: "Game. Set. Match.",
        info: "Promotes tennis on campus with singles and doubles training sessions. Welcomes both newcomers and pros.",
        logo: "/_next/static/media/tc.0ff8bf54.jpg",
        type: "Sports",
        clubHead: [
          {
            name: "Akarsh",
            contact: "email@example.com",
          },
        ],
        social: [
          {
            platform: "Instagram",
            link: "https://www.instagram.com/tennis_iiti/",
          },
        ],
       // events: ["Tennis Open", "Doubles Rally", "Smash Court Series"],
      },
      {
        name: "Table Tennis Club",
        heading: "Spin It Like A Pro!",
        info: "Builds precision, reaction time, and confidence in ping pong matches. Frequent tournaments and team events.",
        logo: "/_next/static/media/tt.895dfa13.png",
        type: "Sports",
        clubHead: [
          {
            name: "Club Head Name",
            contact: "email@example.com",
          },
        ],
        social: [
          {
            platform: "Instagram",
            link: "https://www.instagram.com/table_tennis_iiti/",
          },
        ],
       // events: ["Spin Masters", "TT League", "Rally Clash"],
      },
      {
        name: "Volleyball Club",
        heading: "Serve. Set. Spike!",
        info: "Enthusiastic community for volleyball players. Hosts matches under floodlights and major competitions.",
        logo: "/_next/static/media/vb.9fd99c1b.png",
        type: "Sports",
        clubHead: [
          {
            name: "Club Head Name",
            contact: "email@example.com",
          },
        ],
        social: [
          {
            platform: "Instagram",
            link: "https://www.instagram.com/volleyball.iiti/",
          },
        ],
        // events: [
        //   "Smash Arena",
        //   "Beach Volleyball Night",
        //   "Inter-hostel Showdown",
        // ],
      },
    ];

    await Clubs_.insertMany(ClubPOJO);
    console.log("✅ Clubs seeded successfully.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding:", err.message);
    process.exit(1);
  }
};

seedClubs();
