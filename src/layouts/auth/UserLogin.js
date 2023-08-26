import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { SignIn } from '../../service/Services';
import { setIsLogin, setAppLoader } from '../../store/Reducers/appSlice';
import Lodaer from '../../components/Lodaer/Lodaer';
import { auth } from '../../asstes';

const UserLogin = () => {
  const dispatch = useDispatch();
  const Navigation = useNavigate();
  const [value, setValue] = useState({
    email: '',
    password: '',
  });

  const onUserLoin = async (e) => {
    e.preventDefault()
    dispatch(setAppLoader(true))
    await SignIn(value)
      .then((response) => {
        localStorage.setItem('token', response?.token)
        dispatch(setIsLogin(true));
        Navigation('/')
      })
      .catch((error) => {
        toast(error?.response?.data?.message || error?.response?.data?.error);
      })
      .finally(() => {
        dispatch(setAppLoader(false))
      })
  }

  return (
    <Fragment>
      <div className="d-flex align-items-center justify-content-center justify py-4 bg-body-tertiary" style={{ height: '100vh' }} >
        <main className="form-signin w-100 m-auto">
          <form onSubmit={(e) => onUserLoin(e)}>
            <div className='d-flex align-items-center justify-content-center justify py-2 '>
              <img src={auth} alt='' style={{ width: 70, height: 70, alignSelf: 'center' }} />
            </div>
            <h1 className="h3 mb-3 fw-semibold text-center">Please sign in</h1>

            <div className="form-floating my-2">
              <input value={value?.email} onChange={(e) => setValue({ ...value, email: e?.target?.value })} type="email" className="form-control" id="floatingInput" placeholder="name@example.com" data-listener-added_04368998="true" />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            {!value?.email ? null : (!RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(value?.email)) && <p className="p 0 fw-normal text-start" style={{ color: 'red' }}>* Enter Valid Email</p>}
            <div className="form-floating my-2">
              <input value={value?.password} onChange={(e) => setValue({ ...value, password: e?.target?.value })} type="password" className="form-control" id="floatingPassword" placeholder="Password" data-listener-added_04368998="true" />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            {!value?.password ? null : (!RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^*?&_])[A-Za-z\d!@#$%^*?&_]{8,}$/).test(value?.password)) && <p className="p 0 fw-normal text-start" style={{ color: 'red' }}>* Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character</p>}



            <button disabled={(!value?.email || !value?.password) || (!RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i).test(value?.email)) || (!RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^*?&_])[A-Za-z\d!@#$%^*?&_]{8,}$/).test(value?.password))} className="btn btn-primary w-100 py-2" type='submit'>Sign in</button>
            <div className="d-flex align-items-center justify-content-center justify pt-3 bg-body-tertiary" >
              <h6 className="h6 0 fw-semibold text-center">dont't have account ?</h6>
              <h6 onClick={() => Navigation('/signup')} className="h6 0 fw-bold text-center" style={{ color: 'blue', paddingLeft: 5, cursor: 'pointer' }}> Sign up</h6>
            </div>
          </form>
        </main>
      </div>

      <Lodaer />
    </Fragment>
  )
}

export default UserLogin