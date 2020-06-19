const express = require("express");
const fs = require("fs")

const app = express();
const PORT = process.env.PORT || 3001;

// look in 'html' FIRST and serve any static file
app.use(express.static('public'))
app.use(express.static('db'))

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//initialize note list and note ID
let notes = JSON.parse( fs.readFileSync( './db/db.json', 'utf8') ) ? JSON.parse( fs.readFileSync( './db/db.json', 'utf8') ) : []
console.log( notes )


//GET endpoint
app.get("/api/notes", function( req, res){
    res.send( notes )
})

//POST endpoint
app.post("/api/notes/", function( req, res){
    const newNote = req.body
    newNote.id = Date.now();
    notes.push( newNote );
    fs.writeFileSync( './db/db.json', JSON.stringify(notes) )
    res.send( notes )
} )

//DELETE endpoint
app.delete("/api/notes/:id", function( req, res){
    const noteID = req.params.id
    notes = notes.filter( note => note.id != noteID )
    // console.log( notes )
    fs.writeFileSync( './db/db.json', JSON.stringify(notes) )
    res.send( notes )
})

app.put( '/api/notes', function( req, res ){
    const revidesNote = req.body
    if( !revidesNote.id ){
        res.send( { stauts: false, message: `Id not found` }  )
    }
    const noteIdx = notes.findIndex( revidesNote )

    notes[noteIdx] = revidesNote
    fs.writeFileSync( './db/db.json', JSON.stringify(notes) )
    res.send( { status: true, message: `Note revised` } )
})

//PORT Listener
app.listen( PORT, function(){
    console.log( `APP listening on port:`, PORT)
})