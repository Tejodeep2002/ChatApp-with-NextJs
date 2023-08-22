import { NextApiResponse } from "next";
import { Server as NetServer, Socket } from "net";
import { Server as SocketIOServer } from "socket.io";

interface Socket{
    socket:Socket &{
        server:NetServer &{
            io:SocketIOServer;
        }
    }
}



interface NextApiResponceServerIO extends NextApiResponse, Socket{

}