
import { NextFunction, Request, Response } from "express";
import { Newss } from "../models/room";
import { debug, JWT_SECRET } from "../util/mongodb";
import { ObjectId } from "mongodb";


export let getAllNews = async (req: Request, res: Response, next: NextFunction)=> {
  const nLang = req?.params?.nlang;
  try {
  debug("getAll News");
  const allnews = await Newss.find({nlang : nLang})
  return res.status(200).send(allnews);
  } catch (error) {
    res.status(500).send(error.message);
  }
 
}

export let getNews = async (req: Request, res: Response, next: NextFunction)=> {
  const id = req?.params?.id;
  try {
  debug("getOne News");
  const query = { _id: new ObjectId(id) };
  const aNews = await Newss.findOne(query)
  return res.status(200).send(aNews);
  } catch (error) {
    res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
  }
 
}

export let deleteNews = async (req: Request, res: Response)=> {

  const id= req?.params?.id;
  try {
  debug("delete News");
  console.log(id);
  const query = { _id: new ObjectId(id) };
  const delNews = await Newss.deleteOne(query)
  return res.status(200).send(delNews);
  } catch (error) {
    res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
  }
 
}

export let updateNews = async (req: Request, res: Response)=> {

  const id= req?.params?.id;
  try {
  debug("Update News");
  const query = { _id: new ObjectId(id) };
  const updatedNews = req.body ;
  const modfiedNews = await Newss.updateOne(query, { $set: updatedNews })
  return res.status(200).send(modfiedNews);
  } catch (error) {
    res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
  }
 
}

export let addNews = async (req: Request, res: Response)=> {


  try {
  debug("Add News");
 
  const insertedNews = req.body ;
  const addedNews = await Newss.insertMany(insertedNews)
  addedNews
            ? res.status(201).send(`Successfully created a new news with Title ${insertedNews.title}`)
            : res.status(500).send("Failed to create a new news.");
  } catch (error) {
    res.status(400).send(error.message);
  }
 
}


