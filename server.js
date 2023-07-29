//import express
const express=require('express');
// make an express app
const app=express();
//making server using http and express
const server=require('http').Server(app);

// it will use index.html
app.use(express.static('public'));

// Integrating server with socket io
const io=require('socket.io')(server);

io.on('connection',(socket)=>{
    console.log('connection established',socket.id);
    socket.on('message',(data)=>{ // if user sending any message
        io.emit('message',data); // emitting that data to all other sockets

    })
    // showing of that socket left the chat
    socket.on('disconnect',()=>{
        console.log(socket.id,'-> left the chat');
    })
})

const port=8800;
server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);

   
})
 