import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SignIn } from '../../service/Services';
import { setIsLogin } from '../../store/Reducers/appSlice';

const Logut = () => {
    const dispatch = useDispatch();
    const Navigation = useNavigate();

    const onLogout = () => {
        localStorage.clear();
        dispatch(setIsLogin(false));
        Navigation('/')
    }

    return (
        <Fragment>
            <button onClick={() => onLogout()} type="button" className="btn btn-danger" style={{ marginLeft: 2 }}>Log Out</button>
        </Fragment>
    )
}

export default Logut