
import { NextFunction, Request, Response } from "express";
import { Events } from "../models/event";
import { debug, JWT_SECRET } from "../util/mongodb";
import { ObjectId } from "mongodb";


export let getAllEvents = async (req: Request, res: Response, next: NextFunction)=> {
  const eLang = req?.params?.nlang;
  try {
  debug("getAll Events");
  const allevents = await Events.find({elang : eLang})
  return res.status(200).send(allevents);
  } catch (error) {
    res.status(500).send(error.message);
  }
 
}

export let getEvents = async (req: Request, res: Response, next: NextFunction)=> {
  const id = req?.params?.id;
  try {
  debug("getOne Events");
  const query = { _id: new ObjectId(id) };
  const aEvent = await Events.findOne(query)
  return res.status(200).send(aEvent);
  } catch (error) {
    res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
  }
 
}

export let deleteEvent = async (req: Request, res: Response)=> {

  const id= req?.params?.id;
  try {
  debug("delete Events");
  console.log(id);
  const query = { _id: new ObjectId(id) };
  console.log(query);
  const delEvents = await Events.deleteOne(query)
  return res.status(200).send(delEvents);
  } catch (error) {
    res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
  }
 
}

export let updateEvents = async (req: Request, res: Response)=> {

  const id= req?.params?.id;
  try {
  debug("Update Events");
  const query = { _id: new ObjectId(id) };
  const updatedEvents = req.body ;
  const modfiedEvents = await Events.updateOne(query, { $set: updatedEvents })
  return res.status(200).send(modfiedEvents);
  } catch (error) {
    res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
  }
 
}

export let addEvents = async (req: Request, res: Response)=> {


  try {
  debug("Add Events");
 
  const insertedEvents = req.body as Event;
  console.log(req.body);
  console.log( insertedEvents);
  const addedEvents = await Events.insertMany(insertedEvents)
  addedEvents
            ? res.status(201).send(addedEvents)
            : res.status(500).send("Failed to create a new Events.");
  } catch (error) {
    res.status(400).send(error.message);
  }
 
}


