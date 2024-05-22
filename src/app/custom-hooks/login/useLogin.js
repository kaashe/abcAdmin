import { useAuthenticateUserMutation } from "../../../features/user/loginSlice";

export const useLogin = () => {
    const [authenticateUser,{isLoading,isSuccess,isError,error}] = useAuthenticateUserMutation();

    const login = async (data) => {
        try {
            const response = await authenticateUser(data);
            return response.data; // Return data upon successful authentication
        } catch (error) {
            throw error; // Throw error for handling in components
        }
    };

    return { login,isLoading,isSuccess,isError,error };
};
