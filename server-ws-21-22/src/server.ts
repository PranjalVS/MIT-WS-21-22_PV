// import * as dotenv from "dotenv";
import { Server as httpServer, createServer } from "http";
import * as express from "express";
import { Server as ioServer, Socket } from 'socket.io';
import * as mongoose from "mongoose";

import { debug, MONGODB_URI } from "./util/mongodb";
import { UserRoutes } from "./routes/userRoutes";
import { routes } from "./routes/roomRoutes";
import { Eventroutes } from "./routes/eventRoutes";
import { IntRoutes } from "./routes/intRoutes";
// not needed any more
// see https://stackoverflow.com/questions/60799934/body-parser-doesnt-work-with-typescript-when-i-send-a-request-im-getting-an
// import * as bodyParser from "body-parser"; 
import * as compression from "compression";

import { ChatEvent } from './constants';
import { ChatMessage } from './message';

import * as cors from "cors";

// Express Server Typescript
class Server {
    public serv: httpServer;
    public app: express.Application;
    private io: ioServer;
    private ioccounter = 0; // counter for Socket IO connections

    constructor() {
        // dotenv.config();
        this.app = express(); // first create Express App
        this.serv = createServer(this.app); // to make the server instance available in functions
        this.config();
        this.initSocket(this.serv); // init SocketIO before routes!
        this.routes();
        this.mongo();
    }

    public config(): void {
        this.app.set("port", process.env.PORT || 3000);
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(compression());
        this.app.use(express.json()); // instead of bodyParser.json()
        this.app.use(express.urlencoded({ extended: true })); // instead of bodyParser.urlencoded({ extended: true })
        this.app.use(cors());
        this.app.options('*', cors());
        console.log("Server configured");

    }

    // socket.io server options described at
    // https://socket.io/docs/v3/server-api/#new-Server-httpServer-options
    public initSocket(s: any) { // s assigned this.server later
        debug("initSocket");
        // debug("initSocket para s - httpServer: ", s);
        this.io = new ioServer(s, {
            // options object 
            // path: '/international'
        });
        // debug("initSocket this.io: ", this.io);
        this.io.on(ChatEvent.CONNECT, (socket: Socket) => {
            console.log('Connected Websocekt IO client on port %s.', this.app.get("port"));
            this.ioccounter++;
            debug("Number of websocket connections: ", this.ioccounter);
            
            socket.on(ChatEvent.MESSAGE, (m: ChatMessage) => {
                debug('[server](message):', JSON.stringify(m));
                this.io.emit('message', m);
            });

            socket.on(ChatEvent.DISCONNECT, () => {
                this.ioccounter--;
                console.log('Client disconnected');
            });

            /*
            socket.on(ChatEvent.MESSAGE, (msg) => {
                console.log('Received message: ' + msg);
            });
            */
        });
    }

    private mongo() {
        const connection = mongoose.connection;
        connection.on("connected", () => {
            console.log("Mongo Connection Established");
        });
        connection.on("reconnected", () => {
            console.log("Mongo Connection Reestablished");
        });
        connection.on("disconnected", () => {
            console.log("Mongo Connection Disconnected");
            console.log("Trying to reconnect to Mongo ...");
            setTimeout(() => {
                mongoose.connect(MONGODB_URI, {
                    
                    autoReconnect: false, keepAlive: true,
                    useFindAndModify: true,
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    socketTimeoutMS: 3000, connectTimeoutMS: 3000
                });
            }, 3000);
        });
        connection.on("close", () => {
            console.log("Mongo Connection Closed");
        });
        connection.on("error", (error: Error) => {
            console.log("Mongo Connection ERROR: " + error);
        }); 

        const run = async () => {
            await mongoose.connect(MONGODB_URI, {
                autoReconnect: false, keepAlive: true,
                useFindAndModify: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            });
        };
        run().catch(error => console.error(error));
    }

    public routes(): void {
        debug("hook routes()");
        this.app.use(UserRoutes); // route /user
        this.app.use(routes); // route /rooms
        this.app.use(Eventroutes); // route /event
        //this.app.use("/", new IntRoutes().router); // route /international
    } // routes()

    /**
     * Start the HTTP Server
     * Important: In some examples the Express app object is used for listen, that was not working!
     *  @param: s, http server which listens
     *  @param: p: Portnumber of the server
    */
    public start(s: any, p: number): void {
        //this.initSocket(this.serv); // start (socket)ioServer
        // debug("Server start init Socket this serv: ", this.serv);
        s.listen(p, () => {
            console.log(
                "  API is running at http://localhost:%d",
                p
            );
        });
    }
} // Server

const server = new Server();
server.start(server.serv, 3000); // server.serv is httpServer, 3000 Portnumber
