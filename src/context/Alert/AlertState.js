import { useState } from "react";
import Alert from "../../Components/Alert";
import AlertContext from "./AlertContext";

const AlertState = (props) => {
    const [alert, setAlert] = useState({ msg: "", type: "" });

    const showAlert = (message, type) => {
        setAlert({
            msg: message,
            type: type
        });

        setTimeout(() => {
            setAlert({ msg: "", type: "" });
        }, 1500);
    }
    return (
        <AlertContext.Provider value={{showAlert}}>
            {alert && <Alert alert={alert} />}
            {props.children}
        </AlertContext.Provider>
    )
}

export default AlertState;