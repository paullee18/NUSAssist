import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemAvatar,
  ListItemIcon,
  Avatar,
  TextField,
  IconButton,
  Container,
  Paper,
  Stack
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentIcon from "@mui/icons-material/Assignment";
import { green } from '@mui/material/colors';
import ResponsiveAppBar from "../ResponsiveAppBar";
import Button from "@mui/material/Button";



function TodoList({ todo, index, completeTodo, deleteTodo }) {

  return (
    <List>
      <ListItem
        button
        onClick={() => completeTodo(index)}
        style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
      >
        <ListItemAvatar>
          <Avatar sx = {{ bgcolor : green[500] }}>
            <AssignmentIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={todo.text} />
        <ListItemSecondaryAction>
          <ListItemIcon>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => deleteTodo(index)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemIcon>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        id="standard-bare"
        margin="normal"
        value={value}
        placeholder="Add Todo..."
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

export default function TodoApp() {
  const [todos, setTodos] = useState([
    {
      text: "Practice JavaScript",
      isCompleted: false
    },
    {
      text: "Update Resume",
      isCompleted: false
    },
    {
      text: "Go Kyaking",
      isCompleted: false
    }
  ]);

  const addTodo = text => {
    const newTodos = [{ text }, ...todos];
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !todos[index].isCompleted;
    setTodos(newTodos);
  };

  const deleteTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div>    
    <Container maxWidth="sm">
      <TodoForm addTodo={addTodo} />
      <Paper>
        {todos.map((todo, index) => (
          <TodoList
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </Paper>
    </Container>

    </div>
  );
}
