import {opportunityTypes} from '../types/opportunity';


const initialState = {
    detailData:[],
    detailModal:false,
}

const oppReducers =(state={...initialState}, actions)=> {
    switch(actions.type){
        case opportunityTypes.GET_DATA_DETAIL:{
            const {
                detailData,
            } = action.payload

            return {
                ...state,
                detailData,
            }
        }

        default :
        return {...state}
    }

}