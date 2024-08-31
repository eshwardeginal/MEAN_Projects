const mongoose=require('mongoose');
const dotenv=require('dotenv');

dotenv.config();

const connectDB=async ()=>{
    try{
        debugger
        await mongoose.connect('mongodb://127.0.0.1:27017/yourDatabaseName', {
            useNewUrlParser: true,
            useUnifiedTopology: true
          });

        console.log('mongodb connected')

    }catch(error)
    {
        console.error(error);
        process.exit(1)
    }
};



module.exports =connectDB;