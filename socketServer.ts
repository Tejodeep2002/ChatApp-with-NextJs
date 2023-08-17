import http from 'http';
import { Server, Socket } from 'socket.io';

const server = http.createServer((_req, _res) => {
    // Handle regular HTTP requests
});

const io = new Server(server);

io.on('connection', (socket: Socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Socket.IO server running on port ${PORT}`);
});
