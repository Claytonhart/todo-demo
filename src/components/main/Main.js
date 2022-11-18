import React from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import LogoutButton from '../auth/LogoutButton';
import TodoContainer from '../TodoContainer/TodoContainer';

const Main = () => {
  const isAuthenticated = localStorage.getItem('user_token');

  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }

  return (
    <>
      <Container>
        <TodoLogo>My To-Do List</TodoLogo>
        <TodoContainer />
      </Container>
      <LogoutButton />
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  position: absolute;
  top: 15%;
`;

const TodoLogo = styled.h3`
  font-size: 64px;
  text-decoration: underline;
  text-decoration-color: ${(props) => props.theme.primary.red};
`;

export default Main;
