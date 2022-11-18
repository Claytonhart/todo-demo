import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user_token');
    navigate('/login');
  };

  return (
    <LogoutContainer>
      <Button onClick={handleLogout}>Logout</Button>
    </LogoutContainer>
  );
};

const LogoutContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 75px;

  @media (max-width: 600px) {
    background: #fff;
    border-bottom: 1px solid black;
  }
`;

const Button = styled.button`
  border: 1px solid black;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 15px;
  background: #fff;
  padding: 6px 16px;
  cursor: pointer;
`;

export default LogoutButton;
