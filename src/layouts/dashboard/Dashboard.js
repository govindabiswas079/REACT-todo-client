import React, { Fragment, useEffect, useState } from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux';
import { TodosGet } from '../../service/Services';
import { useNavigate } from 'react-router-dom';
import DeleteModal from '../../components/DeleteModal/DeleteModal';
import { setDeleteId, setViewId, setAppLoader } from '../../store/Reducers/appSlice';
import ViewModal from '../../components/ViewModal/ViewModal';
import Logut from '../../components/Logut/Logut';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { deleteId, appLoader } = useSelector(state => state?.appSlice)
  const Navigation = useNavigate()
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(setAppLoader(true))
    const FetchTodo = async () => {
      await TodosGet()
        .then((response) => {
          setData(response?.data)
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          dispatch(setAppLoader(false))
        })
    }
    FetchTodo()
  }, [deleteId]);

  const onCompleting = async (e) => {
    console.log(e)
  }

  return (
    <Fragment>
      <div className="container">
        <div style={{ maxWidth: 1040, margin: '10px auto', }}>
          <div style={{ width: '100%', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', padding: 10, justifyContent: 'space-between', border: '1px solid grey', borderRadius: '10px', boxShadow: '1px 1px 10px 0 rgba(0, 0, 0, 0.2)' }}>
            <div>
              <h4>Todo</h4>
            </div>
            <div>
              <button onClick={() => Navigation('/todo/add')} type="button" className="btn btn-primary">Add Todo</button>
              <Logut />
            </div>
          </div>


          {appLoader ?
            <div style={{ width: '100%', marginTop: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
            :
            (data?.length !== 0) ?
              <div style={{ width: '100%', marginTop: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                <table className="table table-success table-striped">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Title</th>
                      <th scope="col">Description</th>
                      <th scope="col">Create At</th>
                      <th scope="col">Completed At</th>
                      <th scope="col">Status</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody >
                    {data?.map((value, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{value?.title}</td>
                        <td>{value?.description}</td>
                        <td>{moment(value?.createdAt).fromNow()}</td>
                        <td className={`h6 fw-normal ${value?.isComplete ? 'text-success' : 'text-danger'}`}>{value?.completedAt !== null ? moment(value?.completedAt).fromNow() : 'Awaiting'}</td>
                        <td className={`h6 fw-semibold ${value?.isComplete ? 'text-success' : 'text-danger'}`}>{value?.isComplete ? 'Completed' : 'In Completed'}</td>
                        <td>
                          <button onClick={() => dispatch(setViewId({ id: value?._id, modal: true }))} type="button" className="btn btn-primary">View</button>
                          <button onClick={() => Navigation(`/todo/${value?._id}`)} disabled={value?.isComplete} type="button" className="btn btn-success" style={{ marginLeft: 2, marginRight: 2 }}>Update</button>
                          <button onClick={() => dispatch(setDeleteId({ id: value?._id, modal: true }))} type="button" className="btn btn-danger">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              :
              <div style={{ width: '100%', marginTop: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                <h4 className='h4 fw-bold'>Todo Not found</h4>
              </div>
          }
        </div>
      </div>
      <DeleteModal />
      <ViewModal />
    </Fragment>
  )
}

export default Dashboard