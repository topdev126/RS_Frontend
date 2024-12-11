import { signoutFailed, signoutSuccess } from "../redux/user/userSlice";
import { toast } from "react-toastify";

export const HandleLogOut = async (dispatch) => {
  const apiUrl = process.env.REACT_APP_SERVER_URL;
  try {
    const res = await fetch(`${apiUrl}/api/auth/signout`);
    const data = await res.json();
    if (data.success === false) {
      dispatch(signoutFailed(data.message));
      toast.error(data.message);
    } else {
      dispatch(signoutSuccess());
      toast.success("Successfully Signed Out");
    }
  } catch (error) {
    dispatch(signoutFailed(error.message));
    toast.error(error.message);
  }
};