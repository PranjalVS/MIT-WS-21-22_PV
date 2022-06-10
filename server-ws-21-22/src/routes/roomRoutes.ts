import  * as express  from "express";
import {Router } from "express";
import { ObjectId } from "mongodb";
import * as NewsController  from "../controllers/roomController";

/*
export class RoomRoutes {

    router: Router;
    

    constructor() {
        this.router = express.Router();
        this.routes();
    }

    routes() {
        console.log("News routes");
        // For TESTs
        // this.router.post("/register", this.userController.registerUser);
        this.router.get("/news", NewsController.getAllNews);
    }
}

*/
const router = express.Router();
router.get("/news/:nlang",[], NewsController.getAllNews);


router.get("/news/:id", NewsController.getNews);


router.delete("/news/:id", NewsController.deleteNews);


router.put("/news/:id", NewsController.updateNews);


router.post("/news", NewsController.addNews);

export { router as routes}