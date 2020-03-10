export const FormReducer = (state, action) => {
    switch(action.type){
        case "SET_TOKEN":
            return {...state, securityToken: action.payload}

        case "UPDATE_TOTE_BOXES":
            return {...state, toteBoxesContent: action.payload}

        case "SET_DROP_OFF":
            return {...state, dropOffObj: action.payload}

        case "SET_PICK_UP":
            return {...state, pickUpObj: action.payload}
            
        default: 
            return state;
    }
}