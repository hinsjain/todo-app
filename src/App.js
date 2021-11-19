import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import React, { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import db from './firebase';
import firebase from 'firebase/compat/app'
import Todo from './Todo';

function App() {

  const [todos, setTodos] = useState([])
  const [input, setInput] = useState("")

  useEffect( () => {
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot( snapshot => {
      setTodos(snapshot.docs.map(doc => doc.data().todo))
    })
  }, [] )
  
  const addTodo = (event) => {
    event.preventDefault(); //don't refresh the page after adding todo

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })

    setInput("") //set input to blank after adding todo
  }
  
  return (
    <div className="App">
      <form>
        <FormControl>
          <InputLabel htmlFor="my-input">Add your task</InputLabel>
          <Input value={input} onChange={ event => setInput(event.target.value) } />
        </FormControl>
        
        <Button color="primary" disabled={!input} variant="contained" type="submit" onClick={addTodo}>Add New</Button>
      </form>
      <ul>
        {todos.map(todo => (
          <Todo text={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
