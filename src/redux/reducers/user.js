import {userTypes} from '../types'

const initialState = {
    dataGrid : []
}

const userReducer = (state = {...initialState}, action) => {
    switch (action.type) {

        case userTypes.GET_DATA: {
            const {dataGrid} = action.payload
            return {
                ...state,
                dataGrid,
            }
        }

        case userTypes.SEND_DATA : {
            return {
                ...state
            }
        }

        case userTypes.DELETE_DATA : {
            return {
                ...state
            }
        }

        default :
            return {...state}
    }
}

export default userReducer;