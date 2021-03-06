import React from "react";
import { FormReducer } from "./FormReducer";

const initialState = {
    securityToken: null,
    toteBoxesContent: null,
    dropOffObj: {
        dayID: 20200313,
        routeID: 47,
        startTime: 960
    },
    pickUpObj: {
        dayID: 20200319,
        routeID: 47,
        startTime: 480
    }
}

export const GlobalContext = React.createContext(initialState);


const FormProvider = (props) => {

    const [state, dispatch] = React.useReducer(FormReducer, initialState);
    const value = { state, dispatch };

    return <GlobalContext.Provider value={value}>
        {props.children}
    </GlobalContext.Provider>

}

export default FormProvider