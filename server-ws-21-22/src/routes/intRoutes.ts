import { Router } from "express";
import { IntController } from "../controllers/intController";
import { debug } from '../util/mongodb';

export class IntRoutes {

    router: Router;
    public intController: IntController = new IntController();

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        debug("international routes");
        // Tests
        // this.router.post("/register", this.userController.registerUser);
        //this.router.get("/international", () => { return false; });
        this.router.get("*", this.intController.getAll); // return status 200
    }
}