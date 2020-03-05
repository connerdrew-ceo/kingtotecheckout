export const FormReducer = (state, action) => {
    switch(action.type){
        case "SET_TOKEN":
            return {...state, securityToken: action.payload}

        case "LOGIN":
            return {...state, user: action.payload}
            
        default: 
            return state;
    }
}