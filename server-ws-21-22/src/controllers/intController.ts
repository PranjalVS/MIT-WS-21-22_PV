
import { NextFunction, Request, Response } from "express";
import { debug } from "../util/mongodb";


// Controller for /international route
export class IntController {
  // async because of DB query in body
  public async getAll(req: Request, res: Response, next: NextFunction) {
    debug("InController getAll function call");
    res.sendStatus(200);
    console.log("getAll international");
  }
}
