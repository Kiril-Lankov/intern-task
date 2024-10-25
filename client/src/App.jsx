import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NoteForm from './NoteForm';
import NoteList from './NoteList';

const API_URL = 'http://localhost:3000/notes';

function App() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get(API_URL);
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const addOrUpdateNote = async (note) => {
    try {
      if (currentNote) {
        await axios.put(`${API_URL}/${currentNote.id}`, note);
      } else {
        await axios.post(API_URL, note);
      }
      fetchNotes();
      setCurrentNote(null);
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const editNote = (note) => {
    setCurrentNote(note);
  };

  return (
    <div>
      <h1>Notes App</h1>
      <NoteForm onSubmit={addOrUpdateNote} currentNote={currentNote} />
      <NoteList notes={notes} onEdit={editNote} onDelete={deleteNote} />
    </div>
  );
}

export default App;
