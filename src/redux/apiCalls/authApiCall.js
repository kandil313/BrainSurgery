import { authActions } from "../slices/authSlice";
import request from "../../utils/request";
import { toast } from  'react-toastify';


//Login User
export function loginSuccess(user){
    
    return async (dispatch) =>{
        try {
            const {res} = await request.post('/api/auth/login',user);
            dispatch(authActions.loginSuccess(res));
            localStorage.setItem("userInfo", JSON.stringify(res));
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error);
        }
    }
}