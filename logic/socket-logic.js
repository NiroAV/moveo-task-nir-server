const { HttpServer } = require("http") ;
const { Server  } = require("socket.io");
const codeBlockModel = require("../models/code-block-model")
const codeBlockLogic = require("../logic/code-block-logic")

let mentorSocket;

function socketLogic(httpServer) {

    let connectionCount = 0;

    const socketIoServer = new Server(httpServer, { cors: { origin: "http://129.159.148.125:3000" } });

    
    socketIoServer.sockets.on("connection", async (socket) => {
        connectionCount = connectionCount + 1
        // If mentor socket is not defined, set the new connected socket as mentor.
        if(mentorSocket === undefined || connectionCount === 0) {
            console.log("this is mentor")
            mentorSocket = socket
        }
        
        console.log("Client has been connected");
    // Callback with true if the socket id is equal to the mentor socket id.
        socket.on("check-if-mentor", (callback)=>{
            callback(socket.id === mentorSocket.id)
    
        })
         // Listen to events from clients, and make changes in the database.
        socket.on("msg-from-client-update" , async (codeUpdated, _id) => {
            const codeBlock = new codeBlockModel(codeUpdated)
            codeBlock._id = _id
            await codeBlockLogic.updateCodeBlock(_id,codeBlock)
            mentorSocket.emit("msg-from-server-update", codeBlock.code)
          
        })


        socket.on("disconnect", () => {
            connectionCount = connectionCount - 1
            if (connectionCount === 0) {
                 mentorSocket = undefined
            }
            console.log("Client has been disconnect");
            
        });

    });
        return socketIoServer
}



module.exports = {
    socketLogic
}