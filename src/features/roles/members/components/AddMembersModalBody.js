import { useEffect } from "react";
import InputText from "../../../../components/Input/InputText";
import SelectBox from "../../../../components/Input/SelectBox";
import { useForm } from "react-hook-form";
import { useGetRolesQuery } from "../../roles/rolesSlice";
import { useMember } from "../../../../app/custom-hooks/members/useMember";
import HelperText from "../../../../components/Typography/HelperText";
import { showNotification } from "../../../common/headerSlice";
import { useDispatch } from "react-redux";
function AddMembersModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const { data } = useGetRolesQuery();
  const allRoles = data?.results;
  const { member, refetchMembers, isSuccess,isLoading, isError, error } =
    useMember();

  const {
    control,
    handleSubmit,
  } = useForm();

  const onSubmit = async (formData) => {
    // if (id) {
    //   const payload = { name: formData?.name, status: formData?.status };
    //   console.log(payload, "payload updata");
    //   await updateSingleRole(id, payload);
    // } else {
    await member(formData);
    // }
  };
  useEffect(() => {
    if (isSuccess) {
      dispatch(showNotification({ message: "New Memeber Added!", status: 1 }))
      refetchMembers();
      // closeModal();
    } else if (isError) {
      console.log(error?.data?.message);
    }
  }, [isSuccess, isError, error,refetchMembers,dispatch]);

  const roleOptions = allRoles
    ? allRoles.map((role) => ({
        name: role.name,
        value: role.id,
      }))
    : [];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="overflow-y-scroll max-h-[65vh] px-1">
      <InputText
        name="name"
        labelTitle="Name"
        containerStyle="mt-4"
        control={control}
        rules={{
          required: "Name is required",
        }}
      />
      <InputText
        name="nameAr"
        labelTitle="Arabic Name"
        containerStyle="mt-4"
        control={control}
        rules={{
          required: "Arabic Name is required",
        }}
      />
      <InputText
        name="email"
        labelTitle="Email"
        containerStyle="mt-4"
        control={control}
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email format",
          },
        }}
      />
      <SelectBox
        name="role"
        labelTitle="Select Role"
        containerStyle="w-full mt-4"
        placeholder="Select a role"
        labelStyle="my-label-style"
        options={roleOptions} // Ensure this is in the correct format
        control={control}
        rules={{ required: "Role is required" }}
      />

      {/* api errors */}
      {isError && (
        <div className="flex justify-center mt-4">
          <span className="label-text-alt text-center text-error">
            {error?.data?.message}
          </span>
        </div>
      )}
      {isSuccess && (
        <div className="flex justify-center mt-4">
          <HelperText>
            {"Verification link sent!"}
          </HelperText>
        </div>
      )}
      <div className="modal-action">
        <button
          type="button"
          className="btn btn-sm btn-ghost"
          onClick={() => closeModal()}
        >
          Cancel
        </button>
        <button type="submit" disabled={isLoading} className="btn btn-sm btn-primary px-6">
          {isLoading?"Adding..." :"Add"}
        </button>
      </div>
    </form>
  );
}

export default AddMembersModalBody;
