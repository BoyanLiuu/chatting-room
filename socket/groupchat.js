module.exports =  function(io,Users){
    const  users = new Users();

    io.on('connection',(socket)=>{
        // we are able to know when someone is connected to our server
        console.log('NEW connection.');
        socket.on('join',(params, callback)=>{
            //it allow socket to connect to a particular channel
            //so when user click particular room, they will automatically connect to that room. once a message is sent in that room, only user in that room can see the messages
            socket.join(params.room);
            users.AddUserData(socket.id,params.sender,params.room)
            //now all user connect to this room will listen to this event 
            io.to(params.room).emit('usersList',users.GetUsersList(params.room));
            callback();
        })

        // listen event emit from client side.
        socket.on('createMessage',(message,callback) => {
            //emit message to client side, so we can display message to others
            //use io.to("name"), it display message to all user connect to particular room name
            io.to(message.room).emit('newMessage',{
                text:message.text,
                room: message.room,
                sender:message.sender
            });
            // if i added this line, then in public/ groupchat.js, i can //call aadditional callback() method
            callback()   
        });

        socket.on('disconnect',()=>{
            //once user disconnect from page, their name will be removed from ///user list
            const user = users.RemoveUser(socket.id);
            if (user){
                // new array will be display to this room
                io.to(user.room).emit('usersList',users.GetUsersList(user.room));

            }
        })
      });
      
}