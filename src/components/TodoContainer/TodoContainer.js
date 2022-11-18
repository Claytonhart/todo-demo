import React, { useState } from 'react';
import { Search } from 'react-feather';
import styled from 'styled-components/macro';
import TodoItems from '../TodoItems/TodoItems';

const TodoContainer = () => {
  const localTodos = JSON.parse(localStorage.getItem('todos'));

  const [todos, setTodos] = useState(localTodos || []);

  const createTodo = () => {
    const newTodos = ['A new thing todo', ...todos];
    localStorage.setItem('todos', JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const handleUpdateTodo = (text, index) => {
    let todosCopy = [...todos];
    todosCopy[index] = text;
    localStorage.setItem('todos', JSON.stringify(todosCopy));
    setTodos(todosCopy);
  };

  return (
    <Container>
      <SearchContainer>
        <SearchInput type='text' placeholder='search'></SearchInput>
        <SearchIcon />
        <CreateTodoButton onClick={createTodo}>New</CreateTodoButton>
      </SearchContainer>
      <TodoItems todos={todos} updateTodo={handleUpdateTodo} />
    </Container>
  );
};

const Container = styled.div`
  width: 380px;
  border: 1px solid black;
  border-radius: 5px;
  margin-top: 32px;
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  margin-bottom: 16px;
`;

const SearchInput = styled.input`
  padding: 10px 10px 10px 40px;
  border: 1px solid gainsboro;
  border-radius: 5px;
`;

const SearchIcon = styled(Search)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 24px;
`;

const CreateTodoButton = styled.button`
  padding: 2px 16px;
  color: #fff;
  background: ${(props) => props.theme.primary.blue};
  border: none;
  cursor: pointer;
`;

export default TodoContainer;
