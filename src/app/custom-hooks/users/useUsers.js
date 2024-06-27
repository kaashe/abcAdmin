import { useDeleteUserMutation, useGetUsersQuery, useUpdateUserMutation } from "../../../features/users/usersSlice";


export const useUsers = () => {
    const { refetch: refetchUsers } = useGetUsersQuery();

    const [
        updateUser,
        {
            isLoading: updateIsLoading,
            isSuccess: updateIsSuccess,
            isError: updateIsError,
            error: updateError,
        },
    ] = useUpdateUserMutation();
    const [
        deleteUser,
        {
            isLoading: deleteIsLoading,
            isSuccess: deleteIsSuccess,
            isError: deleteIsError,
            error: deleteError,
        },
    ] = useDeleteUserMutation();

    const updateSingleUser = async (id, data) => {
        try {
            const response = await updateUser({ id, data });
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const deleteSingleUser = async (id) => {
        try {
            const response = await deleteUser(id);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    return {
        updateSingleUser,
        updateIsLoading,
        updateIsSuccess,
        updateIsError,
        updateError,
        deleteSingleUser,
        deleteIsLoading,
        deleteIsSuccess,
        deleteIsError,
        deleteError,

    };
};
