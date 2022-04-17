import {
  AUTH_USERS_REQUEST,
  AUTH_USERS_SUCCESS,
  AUTH_USERS_FAIL,
  CLEAR_ERRORS
} from "../constant/userConstant.js"
import axios from "axios";
import { fetchalluser } from "../API/index.js";



// get All Users
export const getUsers = () => async (dispatch) => {
    try {
      dispatch({ type: AUTH_USERS_REQUEST });
      const { data } = await fetchalluser();
  
      dispatch({ type: AUTH_USERS_SUCCESS, payload: data.users });
    } catch (error) {
      dispatch({ type: AUTH_USERS_FAIL, payload: error.response.data.message });
    }
  };


//   export const deleteUser = (id) => async (dispatch) => {
//     try {
//       dispatch({ type: DELETE_USER_REQUEST });
  
//       const { data } = await axios.delete(`/api/v1/admin/user/${id}`);
  
//       dispatch({ type: DELETE_USER_SUCCESS, payload: data });
//     } catch (error) {
//       dispatch({
//         type: DELETE_USER_FAIL,
//         payload: error.response.data.message,
//       });
//     }
//   };
  
  // Clearing Errors
  export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };  