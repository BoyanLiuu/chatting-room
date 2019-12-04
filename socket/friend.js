module.exports = function(io){
    io.on('connection', (socket) => {
        socket.on('joinRequest', (myRequest, callback) => {
            //if user1 send request, only user2 can also see the message 
           socket.join(myRequest.sender);
           
           callback();
        }); 
        //listen emit message from client side
        socket.on('friendRequest', (friend, callback) => {
            //send message from server to client side, so we can
            //add a real time notification to notice people you got
            //a new friend request
            io.to(friend.receiver).emit('newFriendRequest', {
               from: friend.sender,
               to: friend.receiver
            }); 
            
            callback();
        });
    });
}