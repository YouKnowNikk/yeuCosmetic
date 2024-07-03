import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // login email and password
      // setTimeout(
        // ()=>{
          if (data.email === "testing@123.com" && data.password === "Password123!") {
            navigate("/");
          } else {
            toast.error("Invalid email or password");
          }
          // setLoading(false);
        // },2000
      // )

      // Uncomment the following lines and add your dispatch logic
      // const resp = await dispatch(userLogin(data));
      // if (resp.error && resp.payload.message === "Incorrect email or password") {
      //   toast.error("Invalid email or password", { autoClose: 2000 });
      // } else if (resp.error) {
      //   toast.error("Network error, please try again later", { autoClose: 2000 });
      // } else {
      //   navigate("/");
      // }
      

    } catch (error) {
      toast.error("Network error, please try again later");
      console.log(error, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#D8CCA6] to-[#B7A880] min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      {loading && ( // Loader overlay
        <div className="absolute inset-0 bg-gray-800 opacity-75 flex items-center justify-center z-50">
          <div className="loader ease-linear rounded-full border-8 text-4xl text-center font-bold border-t-8 border-gray-200 h-24 w-24">
            Loader
          </div>
        </div>
      )}
      <div className="w-[550px] border mx-auto bg-white shadoweffect rounded-lg">
        <div className="max-w-md mx-auto w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
              Log in to your account
            </h2>
          </div>
          <form
            className="mt-8 space-y-6"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-4">
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                  type="email"
                  autoComplete="email"
                  required
                  className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#B7A880] sm:text-sm sm:leading-6"
                  placeholder="Email address"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#B7A880] sm:text-sm sm:leading-6"
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex space-x-4">
                <Link
                  to="/forgetpassword"
                  className="font-medium text-balck-600 hover:text-[#beb18d]"
                >
                  Forgot your password?
                </Link>
                <span className="text-gray-500">|</span>
                <Link
                  to="/registration"
                  className="font-medium text-back-600 hover:text-[#beb18d]"
                >
                  New user? Register
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group bg-[#a89768] relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:bg-[#B7A880] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={loading} // Disable button while loading
              >
                Log in
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
