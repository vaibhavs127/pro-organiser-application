import homeInitialState from './InitialState';
import {FETCH_BOARD_DATA,FETCH_BOARD_DATA_SUCCESS,FETCH_BOARD_DATA_ERROR} from '../Actions/ActionConstants';

const HomeReducer=(state=homeInitialState,action)=>{
    switch(action.type){
        case FETCH_BOARD_DATA:
            return{
                ...state,
                
            };
        case FETCH_BOARD_DATA_SUCCESS:
                return{
                    loading:false,
                    boardData:action.payload,
                    error:""
                }; 
        case FETCH_BOARD_DATA_ERROR:
                return{
                    loading:false,
                    boardData:[],
                    error:action.payload
                };
        default:   return state  
    }
}
export default HomeReducer;