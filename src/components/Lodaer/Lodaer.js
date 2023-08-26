import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'

const Lodaer = () => {
    const { appLoader } = useSelector(state => state?.appSlice)

    return (
        <Fragment>
            <div style={{ visibility: appLoader ? 'visible' : "hidden", position: 'absolute', backgroundColor: '#000000cf', top: 0, zIndex: 99999999, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </Fragment>
    )
}

export default Lodaer