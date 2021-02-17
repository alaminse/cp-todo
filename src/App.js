
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import Todo from './assets/Todo/Todo';
import db from './firebase';
import firebase from "firebase";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState(['']);

  useEffect(() => {
    db.collection('todos').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})
    ));
    });
  }, []);

  const addTodo = (event) =>{
    event.preventDefault();
    // Add todo 
    db.collection('todos').add ({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setTodos([...todos, input]);
    setInput('');
  }
  return (
    <div className="App">
      <h1>Hello CoreLab IT</h1>
      <form>
        <FormControl>
          <InputLabel>✅ Write a Todo</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)}/>
        </FormControl>
        <Button type="submit" size="large" disabled={!input} onClick={addTodo} variant="contained" color="primary">
          Add Todo
        </Button>
      </form>
      <ul className="todo">
        {todos.map(singletodo => (
         <Todo key={singletodo.id} todo={singletodo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
