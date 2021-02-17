import { List, ListItem, ListItemText, Modal, makeStyles, Button, FormControl, InputLabel, Input } from '@material-ui/core';
import React, { useState } from 'react';
import './Todo.css';
import db from '../../firebase';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import firebase from "firebase";



function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    cancelIcon: {
        marginBottom: 30,
    }
  }));
 
function Todo(props) {

    // console.log(props.timestamp);
    const timestamp = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(props.timestamp);
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');

    const handleOpen = () => {
        setOpen(true);
    }
    const updateTodo = () => {
        db.collection('todos').doc(props.todo.id).set({
            todo: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }, { marge:true })
        setInput('');
        setOpen(false);
    }


    return (
        <>
        <Modal
        open={open}
        onClose = {e => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        >
            <div style={modalStyle} className={classes.paper}>
                <CancelIcon className={classes.cancelIcon} onClick = {e => setOpen(false)} />
                <form>
                    <FormControl>
                        <InputLabel>✅ Update Todo</InputLabel>
                        <Input placeholder={props.todo.todo} value={input} onChange = {e => setInput(e.target.value)}/>
                    </FormControl>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        className={classes.button}
                        onClick={updateTodo}
                        disabled={!input}
                        type="submit"
                        startIcon={<SaveIcon />}
                    >
                        Update Todo
                    </Button>
                </form>
            </div>
        </Modal>

        <List className="todo__list">
            <ListItem className="todo__item">
                <ListItemText primary={props.todo.todo} secondary={timestamp} className="todo__text"/>
                <button className="edit__btn" onClick = {e => setOpen(true)}>✏️ Edit</button>
                <button className="delete__btn" onClick={event => db.collection('todos').doc(props.todo.id).delete()}> 🗑️ </button>
            </ListItem>
        </List>
        </>
    )
}

export default Todo
