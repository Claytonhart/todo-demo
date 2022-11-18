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
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });
  const [submitError, setSubmitError] = useState('');

  const disableForm =
    !formData.email ||
    !formData.password ||
    !!formErrors.email ||
    !!formErrors.password;
  const isAuthenticated = localStorage.getItem('user_token');

  if (isAuthenticated) {
    return <Navigate to='/' />;
  }

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });

    if (e.target.name === 'email') {
      validateEmail(e.target.value);
    }

    if (e.target.name === 'password') {
      validatePassword(e.target.value);
    }
  };

  const validateEmail = (email) => {
    let emailError = '';
    let isValidEmail = email.match(
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );

    if (!isValidEmail || email.length > 50) {
      emailError = 'Not a valid email';
    }

    setFormErrors((prevState) => {
      return { ...prevState, email: emailError };
    });
  };

  const validatePassword = (pw) => {
    let passwordError = '';
    if (pw.length < 4) {
      passwordError = 'Password is too short';
    } else if (pw.length > 16) {
      passwordError = 'Password is too long';
    }

    setFormErrors((prevState) => {
      return { ...prevState, password: passwordError };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (formErrors.email || formErrors.password) return;
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    const res = await fetch(
      'https://dev.rapptrlabs.com/Tests/scripts/user-login.php',
      {
        method: 'POST',
        body: data,
      }
    ).then((r) => r.json());

    if (res?.user_token) {
      localStorage.setItem('user_token', res?.user_token);
      navigate('./');
    } else {
      setSubmitError(res?.message);
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
            type='text'
            placeholder='user@rapptrlabs.com'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            onBlur={(e) => validateEmail(e.target.value)}
            required
            noValidate
            id='email'
            formError={formErrors.email}
          />
          <UserIcon />
        </LoginInputContainer>
        {formErrors.email && <FormError>{formErrors.email}</FormError>}
        <LoginLabel htmlFor='password'>Password</LoginLabel>
        <LoginInputContainer>
          <LoginInput
            type='password'
            placeholder='Must be at least 4 characters'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
            onBlur={(e) => validatePassword(e.target.value)}
            id='password'
            formError={formErrors.password}
          />
          <LockIcon />
        </LoginInputContainer>
        {formErrors.password && <FormError>{formErrors.password}</FormError>}
        <LoginButton type='submit' value='Login' disabled={disableForm} />
      </LoginForm>
      <SubmitErrorMessage>{submitError}</SubmitErrorMessage>
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
  outline: none;
  width: 100%;

  border-color: ${(props) =>
    !!props.formError ? props.theme.primary.red : 'gainsboro'};
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

  :disabled {
    background-color: ${(props) => props.theme.primary.lightblue};
    cursor: not-allowed;
  }
`;

const FormError = styled.div`
  color: ${(props) => props.theme.primary.red};
`;

const SubmitErrorMessage = styled.div`
  color: ${(props) => props.theme.primary.red};
  margin-top: 16px;
`;

export default Login;
