//Load env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

//Import dependencies
const express = require("express");
const connectToDb = require("./config/connectToDb");
const Note = require("./models/note");

//Create an express app
const app = express();

//Configurte express app
app.use(express.json());

//Connect to db
connectToDb();

app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

app.get("/notes", async (req, res) => {
  //Find Notes
  const notes = await Note.find();
  //Respond with the notes
  res.json({ notes: notes });
});

app.get("/notes/:id", async (req, res) => {
  //Find Notes
  const notes = await Note.findById(req.params.id);
  //Respond with the notes
  res.json({ notes: notes });
});

app.put("/notes/:id", async (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  await Note.findByIdAndUpdate(req.params.id, {
    title: title,
    body: body,
  });
  const note = await Note.findById(req.params.id);

  res.json({
    notes: note,
  });
});

app.post("/notes", async (req, res) => {
  //Get the sent in data off request body
  const title = req.body.title;
  const body = req.body.body;

  //Create note with it
  const note = await Note.create({
    title: title,
    body: body,
  });

  //Respond with the new note
  res.json({ note: note });
});

app.delete("/notes/:id", async (req, res) => {
  const noteId = req.params.id;
  await Note.deleteOne({
    id: noteId,
  });

  res.json({
    success: "Record Deleted",
  });
});

//Star server
app.listen(process.env.PORT);
