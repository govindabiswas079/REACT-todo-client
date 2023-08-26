import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'
import { setViewId, setAppLoader } from '../../store/Reducers/appSlice';
import { TodoGet } from '../../service/Services';

const ViewModal = () => {
    const dispatch = useDispatch();
    const { viewId, viewModal, appLoader } = useSelector(state => state?.appSlice)
    const [value, setValue] = useState(null)

    useEffect(() => {
        const FetchTodo = async () => {
            dispatch(setAppLoader(true))
            await TodoGet(viewId)
                .then((response) => {
                    setValue(response)
                })
                .catch((error) => {
                    console.log(error)
                })
                .finally(() => {
                    dispatch(setAppLoader(false))
                })
        }
        if (viewId) {
            FetchTodo()
        }
    }, [viewId]);

    return (
        <Fragment>
            {appLoader ?
                <div style={{ visibility: viewModal ? 'visible' : "hidden", position: 'absolute', backgroundColor: '#000000cf', top: 0, zIndex: 99999999, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className='mt-4 mb-4 d-flex align-items-center justify-content-center justify' style={{ backgroundColor: '#FFFFFF', width: 300, height: 150, borderRadius: 10 }}>
                        <div className="spinner-border text-success" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
                :
                <div style={{ visibility: viewModal ? 'visible' : "hidden", position: 'absolute', backgroundColor: '#000000cf', top: 0, zIndex: 99999999, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ backgroundColor: '#FFFFFF', width: 300, borderRadius: 10 }}>
                        <h4 className='h4 text-center mt-3 mb-3 fw-bold  text-dark'>Todo</h4>
                        {(value) ?
                            <Fragment>
                                <h4 className='h4 text-start mt-1 mb-0 m-3 fw-bold'>{value?.title}</h4 >
                                <h6 className='h6 text-start mt-2 mb-1 m-3 fw-bold'>{value?.description}</h6 >
                                <h6 className={`h6 text-start mt-2 mb-2 m-3 fw-bold ${value?.isComplete ? 'text-success' : 'text-danger'}`}>{value?.isComplete ? 'Complete' : 'In Complete'}</h6 >
                                <h5 className='h5 text-start mt-0 mb-3 m-3 fw-normal  text-secondary'>{moment(value?.createdAt).fromNow()}</h5 >
                            </Fragment>
                            :
                            <div>
                                <h6 className='h6 fw-bold text-secondary text-center mt-4 mb-4'>Todo Not found</h6>
                            </div>
                        }
                        <div className="d-grid gap-2 mt-2 mb-3 m-4">
                            <button onClick={() => dispatch(setViewId({ id: '', modal: false }))} type="button" className="btn btn-danger">Close</button>
                        </div>
                    </div>
                </div>
            }
        </Fragment>
    )
}

export default ViewModal