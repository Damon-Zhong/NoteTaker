const express = require("express");

const app = express();
const PORT = 3000;

// look in 'html' FIRST and serve any static file
app.use(express.static('public'))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//initialize note list and note ID
let notes = []
let noteCount = 0;

//GET endpoint
app.get("/api/notes", function( req, res){
    res.send( notes )
})

//POST endpoint
app.post("/api/notes/", function( req, res){
    const newNote = req.body
    newNote.id = noteCount;
    notes.push( newNote );
    noteCount++;
    res.send( notes )
} )

//DELETE endpoint
app.delete("/api/notes/:id", function( req, res){
    const noteID = req.params.id
    notes = notes.filter( note => note.id != noteID )
    console.log( notes )

    res.send( notes )
})

//PORT Listener
app.listen( PORT, function(){
    console.log( `APP listening on port:`, PORT)
})