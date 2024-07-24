import { useApproveSingleWihdrawMutation } from "../../../features/withdraw/withDrawSlice";

export const useWithdraws = () => {
  const [
    approveSingleWihdraw,
    {
      isLoading: approveIsLoading,
      isSuccess: approveIsSuccess,
      isError: approveIsError,
      error: approveError,
    },
  ] = useApproveSingleWihdrawMutation();
  const approveWithdraw = async (id, data) => {
    try {
      const response = await approveSingleWihdraw({ id, data });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  return {
    approveWithdraw,
    approveIsLoading,
    approveIsSuccess,
    approveIsError,
    approveError,
  };
};
