import React from 'react';
import TodoItem from './TodoItem';

const TodoItems = ({ todos, updateTodo, deleteTodo }) => {
  return todos.map((todo, i) => {
    return (
      <TodoItem
        key={i}
        index={i}
        todoText={todo}
        updateTodo={updateTodo}
        deleteTodo={deleteTodo}
      />
    );
  });
};

export default TodoItems;
