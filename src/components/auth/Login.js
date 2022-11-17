import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components/macro';
import { User, Lock } from 'react-feather';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const isAuthenticated = localStorage.getItem('user_token');

  if (isAuthenticated) {
    return <Navigate to='/' />;
  }

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    const res = await fetch(
      'http://dev.rapptrlabs.com/Tests/scripts/user-login.php',
      {
        method: 'POST',
        body: data,
      }
    ).then((r) => r.json());

    if (res?.user_token) {
      localStorage.setItem('user_token', res?.user_token);
      navigate('./');
    } else {
      console.log('error', res?.message);
    }
  };

  return (
    <Container>
      <LoginLogo>Rapptr Labs</LoginLogo>
      <p>Sign Into Your Account</p>
      <LoginForm onSubmit={(e) => onSubmit(e)}>
        <LoginLabel htmlFor='email'>Email</LoginLabel>
        <LoginInputContainer>
          <LoginInput
            type='email'
            placeholder='user@rapptrlabs.com'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            required
            maxLength='50'
            id='email'
          />
          <UserIcon />
        </LoginInputContainer>
        <LoginLabel htmlFor='password'>Password</LoginLabel>
        <LoginInputContainer>
          <LoginInput
            type='password'
            placeholder='Must be at least 4 characters'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
            minLength='4'
            id='password'
          />
          <LockIcon />
        </LoginInputContainer>
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
  padding: 12px 12px 12px 40px;
  margin-top: 2px;
  margin-bottom: 12px;
  border: 1px solid gainsboro;
  border-radius: 5px;
  width: 100%;
`;

const LoginInputContainer = styled.div`
  position: relative;
`;

const UserIcon = styled(User)`
  position: absolute;
  top: 14px;
  left: 10px;
`;

const LockIcon = styled(Lock)`
  position: absolute;
  top: 14px;
  left: 10px;
`;

const LoginLabel = styled.label`
  margin: 0 20px;
  color: ${(props) => props.theme.primary.grey};
`;

const LoginButton = styled.input`
  background-color: ${(props) => props.theme.primary.blue};
  color: #fff;
  padding: 12px;
  margin-top: 8px;
  cursor: pointer;
  border: none;
`;

export default Login;
