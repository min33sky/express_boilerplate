import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../../actions/user';

const LoginPage = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const onEmailHandler = e => {
    setEmail(e.currentTarget.value);
  };

  const onPasswordHandler = e => {
    setPassword(e.currentTarget.value);
  };

  const onSubmitHandler = async e => {
    e.preventDefault();
    // 액션 디스패치
    const res = await dispatch(login({ email, password }));
    if (res.payload.loginSuccess) {
      props.history.push('/'); // Route 컴포넌트가 넣어준 props
    } else {
      alert('error');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type='email' value={email} onChange={onEmailHandler} required />
        <label>Password</label>
        <input
          type='password'
          value={password}
          onChange={onPasswordHandler}
          required
        />
        <br />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
