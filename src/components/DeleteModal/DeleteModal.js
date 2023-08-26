import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setDeleteId, setAppLoader } from '../../store/Reducers/appSlice';
import { TodoDelete } from '../../service/Services';

const DeleteModal = () => {
    const dispatch = useDispatch();
    const { deleteId, deleteModal } = useSelector(state => state?.appSlice)

    const onDelete = async () => {
        dispatch(setAppLoader(true))
        await TodoDelete(deleteId)
            .then((responsse) => {
                toast('Todo Delete Successfull');
                dispatch(setDeleteId({ id: '', modal: false }))
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                dispatch(setAppLoader(true))
            })
    }

    return (
        <Fragment>
            <div style={{ visibility: deleteModal ? 'visible' : "hidden", position: 'absolute', backgroundColor: '#000000cf', top: 0, zIndex: 99999999, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ backgroundColor: '#FFFFFF', width: 300, borderRadius: 10 }}>
                    <h4 className='h4 text-center mt-3 mb-3 fw-bold  text-danger'>Delete</h4>
                    <h6 className='h6 text-center mt-1 mb-0 fw-bold'>are your sure ?</h6 >
                    <h6 className='h6 text-center mt-0 mb-3 fw-bold'>you want delete</h6 >

                    <div className="d-grid gap-2 mt-2 mb-3 m-4">
                        <button onClick={() => onDelete()} type="button" className="btn btn-success">Yes, Delete</button>
                        <button onClick={() => dispatch(setDeleteId({ id: '', modal: false }))} type="button" className="btn btn-danger">No, Cancle</button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default DeleteModal