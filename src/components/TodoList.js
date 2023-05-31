import React, { useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';
import SearchFilter from "./SearchFilter";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [popupTodo, setPopupTodo] = useState(null);
  const [open, setOpen] = useState(false);
  const [filterValue, setFilterValue] = useState('');

  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const removeTodo = (id) => {
    const removeArr = todos.filter((todo) => todo.id !== id);
    setTodos(removeArr);
  };

  const filterTodos = (value) => {
    setFilterValue(value);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(filterValue.toLowerCase())
  );

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const openPopup = (todo) => {
    setPopupTodo(todo);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <h1>Todos: {todos.length}</h1>
      <TodoForm onSubmit={addTodo} />
      <SearchFilter onSearch={filterTodos} />
      <Todo
        todos={filteredTodos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        openPopup={openPopup}
      />
      {popupTodo && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className="dialog"
        >
          <DialogTitle id="alert-dialog-title">Popup</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {popupTodo.text}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default TodoList;
