const express = require("express")
const dal = require("../Backend/dal/dal")
const cors = require("cors")
const dotenv = require("dotenv")
const socketLogic = require("../Backend/logic/socket-logic")
const bodyParser = require("body-parser")
const codeBlockController = require("../Backend/controllers/code-block-controller")
const path = require("path")


dotenv.config({path:__dirname+'/.env'})
const app = express()
dal.connect()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(codeBlockController)

if(process.env.NODE_ENV === "production"){
    app.use(express.static("frontend/build"));
    app.get("*", (req,res)=>{
        res.sendFile(path.resolve(__dirname,"../frontend","build","index.html"))
    })
}

const httpServer = app.listen(process.env.PORT || 5000, () => console.log("Listening to port 5000..."))
socketLogic.socketLogic(httpServer)
