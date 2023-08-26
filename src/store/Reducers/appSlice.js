import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLogin: null,
    deleteId: '',
    deleteModal: false,
    viewId: '',
    viewModal: false,
    appLoader: false
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setIsLogin: (state, actions) => {
            state.isLogin = actions.payload
        },
        setDeleteId: (state, actions) => {
            state.deleteId = actions.payload?.id
            state.deleteModal = actions.payload?.modal
        },
        setViewId: (state, actions) => {
            state.viewId = actions.payload?.id
            state.viewModal = actions.payload?.modal
        },
        setAppLoader: (state, actions) => {
            state.appLoader = actions.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setIsLogin, setDeleteId, setViewId, setAppLoader } = counterSlice.actions

export default counterSlice.reducer