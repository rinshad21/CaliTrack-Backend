require('dotenv').config();
const mongoose = require('mongoose')

//connecting to database
const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('mongodb connected successfully');
        
    }
    catch(error) {
        console.log('Database connection failed', error.message)
        process.exit(1)
    }
}
module.exports=connectToDB