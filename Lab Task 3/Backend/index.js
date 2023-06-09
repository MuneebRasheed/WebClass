const express = require("express");
const mongoose = require("mongoose");
let cors = require("cors");

const server = express();
let Dress = require("./Model/dress");

server.use(express.json());

server.use(cors());

const PORT = 5000;

server.get("/dresses/", async (req, res) => {
  let dress = await Dress.find();
  res.send({
    data: dress,
  });
});
server.get("/dresses/:id", async (req, res, next) => {
  let dress = await Dress.find({_id:req.params.id});

  res.status(200).send({ data: dress[0] });
});

server.post("/dresses/", async (req, res, next) => {
  let dress = new Dress(req.body);
  await dress.save();
  res.status(201).send({
    message: "Record added succefully",
  });
});

server.delete("/dresses/:id", async(req, res, next) => {
    console.log("IDD",req.params.id)
    let dress = await Dress.findByIdAndDelete({_id:req.params.id});
    console.log("Students deleted",dress);
    res.status(200).send({
        message: "Record Deleted  succefully",
      });
  });

  server.put("/dresses/:id", async(req, res, next) => {
    console.log("body in update",req.body)
   
    let dres = await Dress.updateOne({_id:req.params.id},req.body);
 
 res.status(201).send({message:'Updated succesfully'})
  });

  server.use((req, res, next) => {
    res.status(400).send("notfound");
  });

server.listen(PORT, () => {
  console.log(`Server is running on  port ${PORT}`);
});

const MONGODBURL =
  "mongodb+srv://Muneebrasheed:muneeb123@cluster0.nrodrnr.mongodb.net/";
mongoose
  .connect(MONGODBURL, { useNewUrlParser: true })
  .then(() => console.log("Connected to Mongo ...."))
  .catch((error) => console.log(error.message));
