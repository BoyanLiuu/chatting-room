module.exports = function(io){
    io.on('connection', (socket) => {
        socket.on('joinRequest', (myRequest, callback) => {
            //if user1 send request, user2 can also see the message 
           socket.join(myRequest.sender);
           
           callback();
        }); 
        
        socket.on('friendRequest', (friend, callback) => {
            console.log("hello")
            io.to(friend.receiver).emit('newFriendRequest', {
               from: friend.sender,
               to: friend.receiver
            }); 
            
            callback();
        });
    });
}