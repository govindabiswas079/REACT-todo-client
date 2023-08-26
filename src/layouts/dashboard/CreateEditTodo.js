import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { TodoCreate, TodoUpdate, TodoGet } from '../../service/Services';
import { setAppLoader } from '../../store/Reducers/appSlice';
import Lodaer from '../../components/Lodaer/Lodaer';

const CreateEditTodo = () => {
  const { params } = useParams()
  const Navigate = useNavigate()
  const dispatch = useDispatch();
  const [isComplete, setSsComplete] = useState(false)
  const [value, setValue] = useState({
    title: "",
    description: "",
    isComplete: false,
    completedAt: null,
  });

  const updateData = {
    title: value?.title,
    description: value?.description,
    isComplete: value?.isComplete,
    completedAt:  value?.isComplete ? new Date() : null,
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    dispatch(setAppLoader(true))
    if (params === "add") {
      await TodoCreate(value)
        .then((response) => {
          toast('Todo Create Successfull');
          Navigate(-1)
        })
        .catch((error) => {
          toast('Todo Create Faield');
        })
        .finally(() => {
          dispatch(setAppLoader(false))
        })
    } else {
      await TodoUpdate(params, updateData)
        .then((response) => {
          toast('Todo Update Successfull');
          Navigate(-1)
        })
        .catch((error) => {
          toast('Todo Update Faield');
        })
        .finally(() => {
          dispatch(setAppLoader(false))
        })
    }
  };

  useEffect(() => {
    const FetchTodo = async () => {
      await TodoGet(params)
        .then((response) => {
          setSsComplete(response?.isComplete)
          setValue({
            ...value,
            title: response?.title,
            description: response?.description,
            isComplete: response?.isComplete,
          })
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {

        })
    }
    if (params !== "add") {
      FetchTodo()
    }
  }, [])
  return (
    <Fragment>
      <div className="d-flex align-items-center justify-content-center justify py-4 bg-body-tertiary" style={{ height: '100vh' }} >
        <main className="form-signin w-100 m-auto">
          <form onSubmit={(e) => onSubmit(e)}>
            <h1 className="h3 mb-3 fw-normal text-center">{params === "add" ? "Create" : "Update"} Todo</h1>

            <div className="form-floating my-2">
              <input value={value?.title} onChange={(e) => setValue({ ...value, title: e?.target?.value })} type="text" className="form-control" id="floatingTitle" placeholder="title" />
              <label htmlFor="floatingTitle">Title</label>
            </div>
            <div className="form-floating my-2">
              <input value={value?.description} onChange={(e) => setValue({ ...value, description: e?.target?.value })} type="text" className="form-control" id="floatingDescription" placeholder="description" />
              <label htmlFor="floatingDescription">Description</label>
            </div>

            {(params !== "add") &&
              <div className="form-floating my-2">
                <select disabled={isComplete} value={value?.isComplete} onChange={(e) => setValue({ ...value, isComplete: e?.target?.value })} className="form-control" id="floatingisComplete" placeholder="staus" >
                  <option value={false}>In Complete</option>
                  <option value={true}>Complete</option>
                </select>
                <label htmlFor="floatingisComplete">Staus</label>
              </div>
            }

            <button disabled={(!value?.title || !value?.description)} className="btn btn-primary w-100 py-2" type='submit'>{params === "add" ? "Create" : "Update"}</button>
          </form>
        </main>
      </div>
      <Lodaer />
    </Fragment>
  )
}

export default CreateEditTodo