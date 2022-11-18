import React from 'react';
import TodoItem from './TodoItem';

const TodoItems = ({ todos, updateTodo, deleteTodo, searchValue }) => {
  return todos.map((todo, i) => {
    return todo.toLowerCase().includes(searchValue.toLowerCase()) ? (
      <TodoItem
        key={i}
        index={i}
        todoText={todo}
        updateTodo={updateTodo}
        deleteTodo={deleteTodo}
      />
    ) : null;
  });
};

export default TodoItems;
