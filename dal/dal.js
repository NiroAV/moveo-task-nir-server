const mongoose = require("mongoose")

//connect to database
async function connect(){
    try{
        const db = await mongoose.connect(process.env.MONGO_URI)
        console.log("We're connected to MongoDB " + db.connections[0].name);
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {
    connect
}
  
