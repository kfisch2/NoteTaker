const fs = require('fs')
const express = require('express')
const path = require('path');
// const { resolveNaptr } = require('dns');

// database for notes
const notes = require('./db/db.json')

const app = express();

const port = process.env.PORT || 3001;

// include public dir that holds frontend files
app.use(express.static('public'));

// parse incoming string/data
app.use(express.urlencoded({ extended: true }));

// parse incoming JSON data
app.use(express.json())

// route to homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
})

// route to notes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'))
})

// get saved notes
app.get('/api/notes', (req, res) => {
  // convert notes from JSON to readable data
  res.json(notes)
})


// save new note function
const saveNote = (body, notesArray) => {
 
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify({notes : notesArray }, null, 2)
  )

  return note;
}

// save notes
app.post('/api/notes', (req, res) => {
  // incoming content
  req.body.id = notes.length.toString();
  const newNote = saveNote(req.body, notes)
  res.json(newNote)
  // render 
})

// // validate server connection for GET requests
// app.get('/', (req, res) => {
//   res.send()
// })

// // validate server connection for POST requests
// app.post('/', (req, res) => {
//   res.send("POST request accepted")
// })

app.listen(port, () => {
  console.log(`App is listening on port: ${port}`)
})
