import  * as express  from "express";
import {Router } from "express";
import { ObjectId } from "mongodb";
import * as EventController  from "../controllers/EventController";


const router = express.Router();
router.get("/events/:nlang",[], EventController.getAllEvents);


router.get("/events/:id", EventController.getEvents);


router.delete("/events/:id", EventController.deleteEvent);


router.put("/events/:id", EventController.updateEvents);


router.post("/events", EventController.addEvents);

export { router as Eventroutes}