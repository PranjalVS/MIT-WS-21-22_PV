import * as express from "express";
import { NextFunction, Request, Response } from "express";
import * as UserController  from "../controllers/userController";
import { debug } from '../util/mongodb';
/*

export class UserRoutes {

    router: Router;
    public userController: UserController = new UserController();

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        debug("User routes");
        // For TESTs
        // this.router.post("/register", this.userController.registerUser);
        
        this.router.post("/register", this.userController.registerUser);
        this.router.post("/login", this.userController.authenticateUser);
        //  this.router.get("*", this.userController.getAll);
    }
}
*/
const router = express.Router();


router.get("/users/:username/:email/:usertype", UserController.getUser);
router.post("/users", UserController.registerUser);

export { router as UserRoutes}