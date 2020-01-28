require('dotenv').config(); 
const express = require('express'); 
const session = require('express-session'); 
const { SERVER_PORT, SESSION_SECRET } = process.env; 
const ctrl = require('./messagesCtrl'); 
const app = express(); 



app.use(express.json()); 

app.use(session({
    resave: false, 
    saveUninitialized: true, 
    secret: SESSION_SECRET, 
    cookie: { maxAge: 1000*60*60*24 } //lasts an hour 
}))


app.use((req, res, next)=>{
    let badWords = ['knuck', 'jerk']; 
    if(req.body.message) {
        for (let i=0; i<badWords.length; i++) {
            let regex = new RexExp(badWords[i], 'g');
            req.body.message = req.body.message.replace(regex, '****'); 
        }
        next(); 
    } else {
        next(); 
    }
}); 

//ENDPOINTS 
app.get('/api/messages', ctrl.getAllMessages);
app.post('/api/message', ctrl.createMessage);
app.get('/api/messages/history', ctrl.history); 



const port = SERVER_PORT; 
app.listen(port, ()=>console.log(`Server running on port ${port}`))