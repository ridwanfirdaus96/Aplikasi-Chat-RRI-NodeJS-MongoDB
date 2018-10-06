$(document).ready(function(){
    var socket = io();

    socket.on('connect', function(){
        console.log('Yea! User Connected');
    });

    socket.on('newMessage', function(data){
        console.log(data);
    });

    $('#message-form').on('submit', function(e){
        e.preventDefault();

        var msg = $('#msg').val();

        socket.emit('createMessage', {
            text: msg
        });
    });
});