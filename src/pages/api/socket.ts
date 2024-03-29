import { Server } from "socket.io";
import messageHandler from "../../utils/sockets/messageHandler";

export default function SocketHandler(req, res) {
    if (res.socket.server.io) {
        console.log("New connection!");
        res.end();
        return;
    }

    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    const onConnection = (socket) => {
        messageHandler(io, socket);
    };

    io.on("connection", onConnection);

    console.log("Setting up socket");
    res.end();
}
