import mongoose from "mongoose";


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_DB_URI) ;
        console.log("connected to mongoDB") ;
        // console.log(connectionInstance) ; 
    } catch (error) {
        console.log( " error while connecting to mongoDB ") ; 
        process.exitCode(1) ;
    }
}

export default connectDB ; 