import db from '../../FireStoreConfig';

import {FETCH_BOARD_DATA,FETCH_BOARD_DATA_SUCCESS,FETCH_BOARD_DATA_ERROR} from '../Actions/ActionConstants';

const fetch_board_data=()=>{
    return {
        type:FETCH_BOARD_DATA
    }
};
const fetch_board_data_success=(boardData)=>{
    return {
        type:FETCH_BOARD_DATA_SUCCESS,
        payload:boardData
    }
};
const fetch_board_data_error=(error)=>{
    return {
        type:FETCH_BOARD_DATA_ERROR,
        payload:error
    }
};

const getBoards=()=>{
    return async dispatch=>{
        dispatch(fetch_board_data);
        try
        {
            const snapshot= await db.collection('boardDetails').get();
            
            const boards=snapshot.docs.map((x)=>(
               { ...x.data(),
                    id:x.id
               }
            ))
            dispatch(fetch_board_data_success(boards));
        }
        catch(error)
        {
            dispatch(fetch_board_data_error(error));
        };
        
    }
}
export {fetch_board_data,fetch_board_data_success,fetch_board_data_error,getBoards};