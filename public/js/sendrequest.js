$(document).ready(function () {
    var socket = io();
    var room = $('#groupName').val();
    var sender = $('#sender').val();

    socket.on('connect', function () {
        var params = {
            sender
        }

        socket.emit('joinRequest', params, function () {
            console.log('Joined');
        });
        socket.on('newFriendRequest',(friend)=>{
            //whoever receive the request will see this output
            //it contain object of send name and receiver name
            console.log(friend);

        })

        // whenever user click submit button on add friend  link 
        $('#add_friend').on('submit', function (e) {
            e.preventDefault();

            var receiver = $('#receiverName').val();

            $.ajax({
                url: '/group/' + room,
                type: 'POST',
                data: {
                    receiver
                },
                success: function () {
                    //emit from client side to server side.
                    socket.emit('friendRequest', {
                        receiver,
                        sender
                    }, function () {
                        //who send the message will console log this message
                        console.log('Request Sent');
                    })
                }
            })
        });
    });
});