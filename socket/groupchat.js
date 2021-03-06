module.exports = function(io, Users){

    const users = new Users();
    //var users = [];
    io.on('connection', (socket) => {
        console.log('User Connected');

        socket.on('join', (params, callback)=> {
            socket.join(params.room);
            // users.push(params.name);
            // users.push(params.room);
            // users.push(socket.id);
            users.AddUserData(socket.id, params.name, params.room);
            io.to(params.room).emit('userList', users.GetUserList(params.room));
            //console.log(users);
            callback();
        });

        socket.on('createMessage', (message, callback) => {
            console.log(message);
            io.to(message.room).emit('newMessage', {
                text: message.text,
                room: message.room,
                from: message.sender
            });

            callback();
        });

        socket.on('disconnect', () => {
            var user = users.RemoveUser(socket.id);

            if(user){
                io.to(user.room).emit('userlist', users.GetUserList(user.room));
            }
        })
    });

    
}