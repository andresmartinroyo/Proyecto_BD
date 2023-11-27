const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: String,
  body: String,
});

const bookSchema = new mongoose.Schema({
  id: "string",
  titulo: "string",
  autores: ["string"],
  generos: ["string"],
  fecha_publicacion: "string",
  resumen: "string",
  estado: "string",
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
