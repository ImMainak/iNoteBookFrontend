import React from 'react'

const Alert = (props) => {
    return (
        <div style={{ height: '60px' }}>
            {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                <strong><p className="text-center">{props.alert.msg}</p></strong>
            </div>}
        </div>
    )
}

export default Alert