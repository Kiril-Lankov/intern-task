const express = require('express');

const app = express();

const PORT = 3000;

app.use(express.json());

let notes = [];

// create a note

app.post('/notes', (req, res) => {
const {title, content} = req.body;
const newNote = {id:notes.length + 1, title, content};
notes.push(newNote);
res.status(201).json(newNote)

});

//retrieve all notes 

app.get('/notes', (req, res)=> {
    res.json(notes)
});

// update a note by ID

app.put('/notes/:id', (req, res)=>{
    const {id} = req.params;
    const{title, content}= req.body;
    const note = notes.find(n => n.id==id)

    if(note) {
        note.title = title;
        note.content=content;
        res.json(note);
    } else {
        res.status(404).json({message: 'Note not found'});
    }
});

//delete note by ID

app.delete('/notes/:id', (req, res)=>{
    const {id} = req.params;
    const noteIndex = notes.findIndex(n => n.id == id);

    if (noteIndex !== 1) {
notes.splice(noteIndex, 1);
res.status(204).send();

    }else {
        res.status(404).json({message: 'Note not found'})
    }
});

app.listen(PORT, () => {
    console.log('Server is running!')
})
