import React from 'react';
import TodoItem from './TodoItem';

const TodoItems = ({ todos, updateTodo }) => {
  return todos.map((todo, i) => {
    return (
      <TodoItem key={i} index={i} todoText={todo} updateTodo={updateTodo} />
    );
  });
};

export default TodoItems;
