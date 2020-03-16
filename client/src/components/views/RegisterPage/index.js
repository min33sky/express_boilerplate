import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../../actions/user';

const RegisterPage = props => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const dispatch = useDispatch();

  const onEmailHandler = e => {
    setEmail(e.currentTarget.value);
  };
  const onNameHandler = e => {
    setName(e.currentTarget.value);
  };
  const onPasswordHandler = e => {
    setPassword(e.currentTarget.value);
  };
  const onPasswordConfirmHandler = e => {
    setPasswordConfirm(e.currentTarget.value);
  };

  const onSubmitHandler = async e => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert('패스워드가 다릅니다');
      return;
    }

    const res = await dispatch(register({ email, name, password }));
    if (res.payload.success) {
      props.history.push('/login');
    } else {
      alert('회원 가입 실패');
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
        <label>Name</label>
        <input type='text' value={name} onChange={onNameHandler} required />
        <label>Password</label>
        <input
          type='password'
          value={password}
          onChange={onPasswordHandler}
          required
        />
        <label>Password Confirm</label>
        <input
          type='password'
          value={passwordConfirm}
          onChange={onPasswordConfirmHandler}
          required
        />
        <br />
        <button type='submit'>Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
