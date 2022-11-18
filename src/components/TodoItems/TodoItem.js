import React, { useState } from 'react';
import { Edit2, Trash2 } from 'react-feather';
import styled from 'styled-components/macro';
import CreateTodo from './CreateTodo';

const TodoItem = ({ index, todoText, updateTodo, editing }) => {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing)
    return (
      <CreateTodo
        index={index}
        todoText={todoText}
        setIsEditing={setIsEditing}
        updateTodo={updateTodo}
      />
    );

  return (
    <Container>
      <Text>{todoText}</Text>
      <IconContainer>
        <Edit2 onClick={() => setIsEditing(true)} />
        <Trash2 />
      </IconContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  border-top: 1px solid black;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 56px;
`;

const Text = styled.div`
  padding: 6px;
  border: 1px solid transparent;
`;

export default TodoItem;
