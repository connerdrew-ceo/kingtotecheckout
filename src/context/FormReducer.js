export const FormReducer = (state, action) => {
    switch(action.type){
        case "SET_TOKEN":
            return {...state, securityToken: action.payload}

        case "UPDATE_TOTE_BOXES":
            return {...state, toteBoxesContent: action.payload}
            
        default: 
            return state;
    }
}