import { useAuthenticateUserMutation, useSignUpUserMutation } from "../../../features/user/loginSlice";

export const useLogin = () => {
    const [authenticateUser, { isLoading, isSuccess, isError, error }] = useAuthenticateUserMutation();
    const [signUpUser, { isLoading: signUpisSuccess, isSuccess: signUpIsloading, isError: signUpisError, error: signUpError }] = useSignUpUserMutation();

    const login = async (data) => {
        try {
            const response = await authenticateUser(data);
            return response.data;
        } catch (error) {
            throw error;
        }
    };
    const signUphandler = async (data) => {
        try {
            const response = await signUpUser(data);
            return response.data;
        } catch (error) {
            throw error;
        }
    };
    return { login, isLoading, isSuccess, isError, error,signUphandler, signUpisSuccess, signUpIsloading, signUpisError, signUpError };
};
