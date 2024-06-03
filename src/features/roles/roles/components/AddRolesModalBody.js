import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../../../../components/Input/InputText";
import { useForm } from "react-hook-form";
import { useRole } from "../../../../app/custom-hooks/roles/useRole";
import { useGetSingleRoleQuery } from "../rolesSlice";
import { showNotification } from "../../../common/headerSlice";
function AddRolesModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const {extraObject } = useSelector(
    (state) => state.modal
  );
  const {
    role,
    refetchRoles,
    isLoading,
    isSuccess,
    isError,
    error,
    updateSingleRole,
    updateIsLoading,
    updateIsSuccess,
    updateIsError,
    updateError,
  } = useRole();

  const id = extraObject?.roleId;
  const {
    data,
    isLoading: isSingleRoleLoading,
    isError: singleRoleIsError,
    error: singleRoleError,
    refetch: singleRoleReftch,
  } = useGetSingleRoleQuery(id, {
    skip: !id,
  });
  const {
    control,
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (formData) => {
    if (id) {
      const payload = { name: formData?.name, status: formData?.status };
      console.log(payload, "payload updata");
      await updateSingleRole(id, payload);
    } else {
      await role(formData);
    }
  };

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data,reset]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(showNotification({ message: "New Role Added!", status: 1 }))
      refetchRoles();
      closeModal();
    } else if (isError) {
      console.log(error?.data?.message);
    } else if (updateIsSuccess) {
      dispatch(showNotification({ message: "Role Updated!", status: 1 }))
      singleRoleReftch();
      refetchRoles();
      closeModal();
    } else if (updateIsError) {
      console.log(updateError?.data?.message);
    }
  }, [isSuccess, isError, error, updateIsSuccess, updateIsError, updateError,closeModal,refetchRoles,singleRoleReftch,dispatch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isSingleRoleLoading ? (
        <>
          <div className="flex justify-center items-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        </>
      ) : (
        <>
          <InputText
            name="name"
            labelTitle="Role Name"
            containerStyle="mt-4"
            control={control}
            rules={{
              required: "Role name is required",
            }}
          />
          <InputText
            name="nameAr"
            labelTitle="Arabic Name"
            containerStyle="mt-4"
            control={control}
            rules={{
              required: "Arabic name is required",
            }}
          />
        </>
      )}
      {/* api errors */}
      {(isError || updateError || singleRoleIsError) && (
        <div className="flex justify-center mt-4">
          <span className="label-text-alt text-center text-error">
            {error?.data?.message ||
              updateError?.data?.message ||
              singleRoleError?.data?.message}
          </span>
        </div>
      )}

      <div className="modal-action">
        <button
          type="button"
          className="btn btn-sm btn-glass"
          onClick={() => closeModal()}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading || updateIsLoading}
          className="btn btn-sm btn-primary px-6"
        >
          {isLoading
            ? "Adding..."
            : updateIsLoading
            ? "Updating..."
            : extraObject?.roleId
            ? "Update"
            : "Add"}
        </button>
      </div>
    </form>
  );
}

export default AddRolesModalBody;
