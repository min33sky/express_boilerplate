import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../actions/user';

/**
 * option
 * - null: 아무나 출입 가능
 * - true: 로그인한 유저만 출입 가능
 * - false: 로그인한 유저는 출입 불가능
 */
export default (SpecificComponent, option, adminRoute = null) => {
  const AuthenticationCheck = props => {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(auth()).then(res => {
        console.log(res);
        // 비로그인 상태
        if (!res.payload.isAuth) {
          if (option) {
            props.history.push('/');
          }
        } else {
          if (adminRoute && !res.payload.isAdmin) {
            props.history.push('/');
          } else {
            if (!option) {
              props.history.push('/');
            }
          }
        }
      });

      return () => {};
    }, []);

    return <SpecificComponent {...props} />;
  };

  return AuthenticationCheck;
};
