import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components/macro';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Navigate to='/project' />;
  }

  return (
    <Container>
      <LoginLogo>Rapptr-do</LoginLogo>
      <p>Sign Into Your Account</p>
      <LoginForm onSubmit={(e) => onSubmit(e)}>
        <LoginLabel htmlFor='email'>Email</LoginLabel>
        <LoginInput
          type='email'
          placeholder='Email Address'
          name='email'
          value={email}
          onChange={(e) => onChange(e)}
          required
          id='email'
        />
        <LoginLabel htmlFor='password'>Password</LoginLabel>
        <LoginInput
          type='password'
          placeholder='Password'
          name='password'
          value={password}
          onChange={(e) => onChange(e)}
          minLength='6'
          id='password'
        />

        <LoginButton type='submit' value='Login' />
      </LoginForm>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  position: absolute;
  top: 25%;
`;

const LoginLogo = styled.h3`
  font-size: 64px;
  text-decoration: underline;
  text-decoration-color: ${(props) => props.theme.primary.red};
`;

const LoginForm = styled.form`
  width: 350px;
  display: flex;
  flex-direction: column;
  margin-top: 6px;
`;

const LoginInput = styled.input`
  padding: 12px;
  margin: 2px 8px 12px 8px;
  border: 1px solid gainsboro;
  border-radius: 5px;
`;

const LoginLabel = styled.label`
  margin: 0 20px;
  color: ${(props) => props.theme.primary.grey};
`;

const LoginButton = styled.input`
  background-color: ${(props) => props.theme.primary.blue};
  color: #fff;
  padding: 12px;
  margin: 8px;
  cursor: pointer;
  border: none;
`;

export default Login;
