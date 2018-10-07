$(document).ready(function(){
    var socket = io();

    var room = $('#groupName').val();
    var sender = $('#sender').val();

    socket.on('connect', function(){
        console.log('Yea! User Connected');
        var params = {
            room: room
        }
        socket.emit('join', params, function(){
            console.log('User has joined this channel');
        });
    });

    socket.on('newMessage', function(data){
        console.log(data);
        //console.log(data.room);
    });

    $('#message-form').on('submit', function(e){
        e.preventDefault();

        var msg = $('#msg').val();

        socket.emit('createMessage', {
            text: msg,
            room: room,
            sender: sender
        }, function(){
            $('#msg').val('');
        });
    });
});






