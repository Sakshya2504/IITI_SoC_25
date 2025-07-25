import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import { User } from './models/UserSchema.js'; 
import bcrypt from 'bcrypt';
import { Announce_ } from './models/Announce.js'; 
import {event_} from './models/Event.js'
import { Admin_ } from './models/Admins.js'; // Import the Admin model
import {Regis} from './models/Regis.js'
import {Clubs_} from './models/Club.js'


const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
const port = 3000;

app.use(cors());
app.use(express.json()); 

// Connect to MongoDB with the validation using Mongoose
await mongoose.connect("mongodb://localhost:27017/todo", {
    // useNewUrlParser: true, //useNewUrlParse is used for parsing the MongoDB connection string
    // useUnifiedTopology: true // useUnifiedTopology is used to opt in to the MongoDB driver's new connection management engine
});

// Signup route
app.post('/api/signup', async (req, res) => {
    const { name, email, password, userphoto } = req.body;
    if (password.length < 6 || password.length > 10) {
        return res.status(400).json({ errors: ['Password must be between 6 and 10 characters long'] });
    }
    


    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already registered with this email' });
        }

        const saltRounds = 10;
        //We use bcrypt to hash the password before storing it in the database 
        //To ensure that passwords are stored securely, we use bcrypt to hash the password before storing it in the database.
        const hashedPassword = await bcrypt.hash(password, saltRounds); 

        // Store hashed password
        const newUser = new User({ name, email, password: hashedPassword, userphoto }); 
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully!',user: {
        name: name,
        email: email,
        userphoto:userphoto
      } });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({ errors: messages });
        }
        res.status(500).json({ message: 'Something went wrong' });
      }
});

// Login route
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // If user exists, compare the provided password with the hashed password in the database
        // bcrypt.compare is used to compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        res.json({ message: 'Login successful!',user: {
        name: user.name,
        email: user.email,
        userphoto:user.userphoto
      } });
    } catch (err) {
      console.error(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

// Announcement routes
// This route is used to create a new announcement
app.post('/announce', async (req, res) => {
    console.log("Incoming body:", req.body);
    try {
        const { clubname, heading, info ,announcelogo} = req.body;

        // Create and save the new announcement
        const newAnnounce = new Announce_({
            clubname,
            heading,
            info,
            announcelogo
        });

        await newAnnounce.save();

        res.status(201).json({ message: 'Announcement created successfully!' });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({ errors: messages });
        }
        res.status(500).json({ message: 'Something went wrong while saving the announcement' });
    }
});

app.get('/notification', async (req, res) => {
    try {
        const Events = await Announce_.find();
        res.status(200).json(Events);
    } catch (err) {
        console.error('Error fetching Events:', err);
        res.status(500).json({ message: 'Failed to fetch Events' });
    }
});

// Event routes
// This route is used to create a new event
    app.post('/Createevent', async (req, res) => {
        console.log("Incoming body:", req.body);
        try {
            const { EventName, EventDateAndTime, ConductedBy, EventInfo ,Eventlogo,comments} = req.body;

            // Create and save the new event
            const newEvent = new event_({
                EventName,
                EventDateAndTime,
                ConductedBy,
                EventInfo,
                Eventlogo,
                comments
            });

            await newEvent.save();

            res.status(201).json({ message: 'Event Creation successful!' });
        } catch (err) {
            if (err.name === 'ValidationError') {
                const messages = Object.values(err.errors).map(e => e.message);
                return res.status(400).json({ errors: messages });
            }
            res.status(500).json({ message: 'Something went wrong while saving the event' });
        }
    });

// This route is used to fetch all events
// It retrieves all events from the database and returns them as a JSON response
app.get('/Events', async (req, res) => {
    try {
        const Events = await event_.find();
        res.status(200).json(Events);
    } catch (err) {
        console.error('Error fetching Events:', err);
        res.status(500).json({ message: 'Failed to fetch Events' });
    }
});

app.post('/api/verifyadmin', async (req, res) => {
    const { email } = req.body;

    try {
        const admin = await Admin_.findOne({ email });
        // Check if the email exists in the Admin collection
        // If the email exists, it means the user is an admin
        if (admin) {
            res.status(200).json({ authorized: true });
        } else {
            res.status(401).json({ authorized: false, message: 'Unauthorized email' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});




app.post('/events/:eventId/register', async (req, res) => {
    const { eventId } = req.params;
    const formData = req.body;

    try {
        const registration = new Regis({ eventId, ...formData });
        await registration.save();
        res.status(200).json({ message: 'Registered successfully' });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({ errors: messages });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/events/:eventId/registrations/count', async (req, res) => {
    const { eventId } = req.params;

    try {
        const count = await Regis.countDocuments({ eventId });
        res.json({ count });
    } catch (err) {
        console.error('Failed to fetch registration count:', err.message);
        res.status(500).json({ error: 'Could not retrieve registration count' });
    }
});
app.post('/api/findclub', async (req, res)=>{
    const {_id} = req.body;
     
      
    try{
        const club = await Clubs_.findOne({"_id":_id});
        
        if(club){
            res.status(201).json(club);
        }
   
    }
    catch(err){
console.log(err)
    res.status(500).json({ error: 'Could not retrieve clubdata' });
    }

});
app.get('/api/:type',async(req,res)=>{
    const {type} = req.params;
    console.log(type);
    try{
        const clubs = await Clubs_.find({type});
        res.status(201).json(clubs);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Could not retrieve clubdata'})
    }
});
app.post('/api/updateclubdetailes', async (req, res)=>{
    const {    EventName ,EventDateAndTime ,ConductedBy ,EventInfo , Eventlogo,comments,_id} = req.body;
      console.log(_id)
      
    try{
        const club = await Clubs_.findOne({"_id":_id});
        if(club){
            club.events.push({
        name: EventName,
        time: EventDateAndTime,
        club: ConductedBy,
        info: EventInfo,
        image: Eventlogo
});
if (!club) {
  return res.status(404).json({ error: 'Club not found with given _id' });
}


await club.save();
 return res.status(200).json({ message: 'Club event updated successfully' });

        }
   
    }
    catch(err){
console.log(err)
    res.status(500).json({ error: 'Could not retrieve clubdata' });
    }

});

app.post('/api/comment/:_id', async (req, res)=>{
    const {_id} = req.params; 
    const {emailid,comment}=req.body;  
    try{
        const event = await event_.findOne({_id});
        console.log(event);
        if(event){
            event.comments.push({emailid,comment})
            event.save();
        }
   
    }
    catch(err){
console.log(err)
    res.status(500).json({ error: 'Could not retrieve clubdata' });
    }

});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});