import React, { useState } from 'react';
import styled from 'styled-components/macro';

const CreateTodo = ({ index, todoText, setIsEditing, updateTodo }) => {
  const [todo, setTodo] = useState(todoText);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    updateTodo(todo, index);
  };

  return (
    <CreateTodoContainer onSubmit={handleSubmit}>
      <TodoText
        value={todo}
        maxLength='25'
        minLength='1'
        autoFocus
        onChange={(e) => setTodo(e.target.value)}
      />
      <SaveTodoButton type='submit'>Save</SaveTodoButton>
    </CreateTodoContainer>
  );
};

const CreateTodoContainer = styled.form`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  border-top: 1px solid black;
`;

const TodoText = styled.input`
  border: 1px solid black;
  padding: 6px;

  &:focus {
    outline: none;
  }
`;

const SaveTodoButton = styled.button`
  background: black;
  color: #fff;
  border: none;
  cursor: pointer;
`;

export default CreateTodo;
