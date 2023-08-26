import React, { Fragment, useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { UserLogin, UserRegister } from './layouts/auth';
import { Dashboard, CreateEditTodo } from './layouts/dashboard';
import { setIsLogin } from './store/Reducers/appSlice';
import { loader } from './asstes'

const App = () => {
  const dispatch = useDispatch();
  const { isLogin } = useSelector(state => state?.appSlice)

  useEffect(() => {
    const istoken = localStorage.getItem('token');
    if (istoken) {
      dispatch(setIsLogin(true))
    } else {
      dispatch(setIsLogin(false))
    }
  }, [isLogin]);

  if (isLogin === null) {
    return (
      <Fragment>
        <div style={{ height: '100vh', display: "flex", alignItems: 'center', justifyContent: 'center' }}>
          <div>
            <h1 className='h1 text-center text-success fw-bold' >Todo</h1>
            <img src={loader} alt='' />
          </div>
        </div>
      </Fragment>
    )
  }
  return (
    <Fragment>
      <Routes>
        <Route path='/signin' element={<UserLogin />} />
        <Route path='/signup' element={<UserRegister />} />

        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/todo/:params' element={<CreateEditTodo />} />

        <Route path='*' element={<Navigate to={isLogin ? '/dashboard' : '/signin'} />} />
        <Route path='/' element={<Navigate to={isLogin ? '/dashboard' : '/signin'} />} />
      </Routes>
    </Fragment>
  )
}

export default App