import LandingIntro from "./LandingIntro";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ModalLayout from "../../containers/ModalLayout";
import { useLogin } from "../../app/custom-hooks/login/useLogin";
import ErrorText from "../../components/Typography/ErrorText";
import InputText from "../../components/Input/InputText";

function Login() {
  const { isOpen } = useSelector((state) => state.modal);
  const { login, isLoading, isSuccess, error } = useLogin();

  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const submitForm = async (data) => {
    try {
      // await login(data);
      localStorage.setItem('access_token', "DUMMY_TOKEN");
      // localStorage.setItem('access_token', response?.token);
      window.location.href = "/app/dashboard";
    } catch (err) {
      console.error('Error in form submission:', err);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <>{isOpen && <ModalLayout />}</>
      <div className="card mx-auto w-full max-w-5xl  shadow-xl">
        <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">

          <div className="">
            <LandingIntro />
          </div>
          <div className="py-20 px-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">Sign In</h2>
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="mb-4">
                <div className={`form-control w-full`}>
                  <InputText
                    name="phone"
                    type="tel"
                    labelTitle="Phone"
                    containerStyle="mt-1"
                    control={control}
                    rules={{
                      required: "Phone is required",
                    }}
                  />
                </div>
                <div className={`form-control w-full`}>
                  <InputText
                    name="password"
                    type={"password"}
                    labelTitle="Password"
                    containerStyle="mt-4"
                    control={control}
                    rules={{
                      required: "Password is required",
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn mt-2 w-full btn-primary"
              >
                {isLoading === false ? "Login" : "Login..."}
              </button>
              <ErrorText styleClass="mt-16">{error?.data?.message}</ErrorText>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;
