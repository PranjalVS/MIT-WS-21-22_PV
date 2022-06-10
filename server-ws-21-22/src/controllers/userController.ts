
import * as bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { IUser, User } from "../models/user";
import { debug, JWT_SECRET } from "../util/mongodb";

/*
export class UserController {

  public getAll(req: Request, res: Response, next: NextFunction) {
    console.log("getAllUsers");
    res.status(200).send({ "Hello": "Guten Tag" });
  }


  public async registerUser(req: Request, res: Response): Promise<void> {
    console.log("registerUser body:");
    console.log(req.body);

    const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

    await User.findOne({ username: req.body.usename, email: req.body.email, password: hashedPassword }, (err: any, results: any) => {
      console.log("findOne err object");
      console.log(err);
      console.log("findOne results object");
      console.log(results);
      if (!err) {
        User.create({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,

        });
      } else {
        console.log("User exists");
      }
    })
    // synch. call of jwt?
    console.log("Call jwt.sign():");
    console.log("JWT_SECRET: " + JWT_SECRET);
    const token = jwt.sign({ username: req.body.email, scope: req.body.scope }, JWT_SECRET);
    debug("token: ", token);
    res.status(200).send({ token: token });

  }



  public async authenticateUser(req: Request, res: Response, next: NextFunction) {
    debug("authenticateUserusername start");

    // check, whether User is in DB
    await User.findOne({ : req.body.email, email: req.body.email },
      (err: any, results: any) => {
        var requser = {
          username: req.body.email, // original: req.body.username
          email: req.body.email,
          password: results.password
        }
        debug("authenticateUser Mongo.findOne err: " + err);
        debug("authenticateUser Mongo.findOne results: " + results);
      })
  }
}

*/

export let getUser = async (req: Request, res: Response, next: NextFunction)=> {
  const uName = req?.params?.username;
  const uEmail = req?.params?.email;
  const uType = req?.params?.usertype;
  //const uPass = req?.params?.password;
  try {
  debug("getOne User");
  console.log(uName, uEmail, uType/*, uPass*/ );
  const aUser = await User.findOne({username: uName, usertype: uType, email: uEmail/*, password: uPass*/})
  return res.status(200).send(aUser);
  } catch (error) {
    res.status(404).send(`Unable to find matching document with Username: ${req.params.username}`);
  }
 
}

export let registerUser= async (req: Request, res: Response) => {
  console.log("registerUser body:");
  console.log(req.body);

  const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

  await User.findOne({ username: req.body.usename, email: req.body.email, password: hashedPassword },
   (err: any, results: any) => {
    console.log("findOne err object");
    console.log(err);
    console.log("findOne results object");
    console.log(results);
    if (!err) {
      User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        usertype: req.body.usertype
      });

    } else {
      console.log("User exists");
    }
  })
  
  console.log("Call jwt.sign():");
  console.log("JWT_SECRET: " + JWT_SECRET);
  const token = jwt.sign({ username: req.body.username, scope: req.body.scope }, JWT_SECRET);
  debug("token: ", token);
  res.status(200).send({ token: token });

}
