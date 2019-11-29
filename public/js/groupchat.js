$(document).ready(() => {
    var socket = io();
    var room = $("#groupName").val();
    var sender = $("#sender").val();
    //whenever a socket is connect, we display a message
    socket.on('connect', () => {
        console.log('Yeah, User Connected');
        var params = {
            room,
            sender
        }
        socket.emit('join', params, () => {
            console.log("User has joined this channel")

        });
    });
    //this event come from server side.
    socket.on('usersList',(user_list)=>{
        // display online user list in the chat room
        const ol = $('<ol></ol>');
        for(let  i = 0; i <user_list.length; i++){
            ol.append('<p><a id="val" data-toggle="modal" data-target="#myModal">'+user_list[i]+'</a></p>');
        }

        
        $(document).on('click', '#val', function(){
            $('#name').text('@'+$(this).text());
            $('#receiverName').val($(this).text());
            $('#nameLink').attr("href", "/profile/"+$(this).text());
        });
        // display number of connected user
        $('#numValue').text('('+user_list.length+')');
        // append html
        $('#users').html(ol);

    })
    socket.on('newMessage', (data) => {
        var message = `<li class="left">
        <span class="chat-img1 pull-left">
            <img src="https://placehold.it/300x300" class="img-circle" alt="">
        </span>
        <div class="chat-body1">
            <span class="chat-name">${data.sender}</span>
            <br>
            ${data.text}
        </div>
     </li>`
        $("#messages").append(message)
    })




    // we emit event from client, so we need to go to server to listen event
    $('#message-form').on('submit', (e) => {
        e.preventDefault();

        var msg = $('#msg').val();
        socket.emit('createMessage', {
            text: msg,
            room,
            sender
        }, function(){
            $('#msg').val('');
        });

    })

});