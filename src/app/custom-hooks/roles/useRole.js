import {
  useAddRoleMutation,
  useDeleteRoleMutation,
  useGetRolesQuery,
  useUpdateRoleMutation,
} from "../../../features/roles/roles/rolesSlice";

export const useRole = () => {
  const { refetch: refetchRoles } = useGetRolesQuery();

  const [addRole, { isLoading, isSuccess, isError, error }] =
    useAddRoleMutation();
  const [
    updateRole,
    {
      isLoading: updateIsLoading,
      isSuccess: updateIsSuccess,
      isError: updateIsError,
      error: updateError,
    },
  ] = useUpdateRoleMutation();
  const [
    deleteRole,
    {
      isLoading: deleteIsLoading,
      isSuccess: deleteIsSuccess,
      isError: deleteIsError,
      error: deleteError,
    },
  ] = useDeleteRoleMutation();

  const role = async (data) => {
    try {
      const response = await addRole(data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  const updateSingleRole = async (id, data) => {
    try {
      const response = await updateRole({ id, data });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const deleteSingleRole = async (id) => {
    try {
      const response = await deleteRole(id);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    role,
    isLoading,
    isSuccess,
    isError,
    error,
    refetchRoles,
    updateSingleRole,
    updateIsLoading,
    updateIsSuccess,
    updateIsError,
    updateError,
    deleteSingleRole,
    deleteIsLoading,
    deleteIsSuccess,
    deleteIsError,
    deleteError,
  };
};
