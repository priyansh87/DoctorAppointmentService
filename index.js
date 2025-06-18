import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './db.js';
import { configDotenv } from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import appointmentRouter from './routes/appointments.routes.js'

configDotenv() ;
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan())

app.use('/api/v1/appointments', appointmentRouter);

app.get('/' , (req ,res ) => {
    res.json({message : "this is the service provider server"})
})

// Start server
app.listen(PORT, async (req , res ) => {
    try {
        await connectDB() 
        console.log(`Server running on port ${PORT}`);
        console.log(`Endpoints:
        - POST   /appointments
        - GET    /appointments
        - GET    /appointments/:id
        - PUT    /appointments/:id
        - DELETE /appointments/:id
        - GET    /preferences/sort?order=asc|desc
        - GET    /preferences/filter?type=doctor|restaurant
        - GET    /preferences/availability?date=YYYY-MM-DD&type=doctor|restaurant&duration=30`);
    } catch (error) {
        console.log("error while listening on port") ; 
    }
});