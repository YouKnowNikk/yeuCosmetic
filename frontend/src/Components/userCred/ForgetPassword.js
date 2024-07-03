import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const ForgetPassword = () => { 
  const { handleSubmit, formState: { errors }, setValue, trigger } = useForm();
  const [loading, setLoading] = useState(false);
  const [mobile, setMobile] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Simulate reset password logic
      setTimeout(() => {
        toast.success(`Password reset request sent to ${mobile}`);
        setLoading(false);
      }, 2000);
    } catch (error) {
      toast.error("Network error, please try again later");
      console.log(error, "error");
      setLoading(false);
    }
  };

  const handlePhoneChange = (value) => {
    setMobile(value);
    setValue("mobile", value);
    trigger("mobile");
  };

  return (
    <div className="bg-gradient-to-b from-[#D8CCA6] to-[#B7A880] min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      {loading && (
        <div className="absolute inset-0 bg-gray-900 opacity-90 flex items-center justify-center z-50">
         <div aria-label="Loading..." role="status" class="flex items-center space-x-2">
         <svg class="h-20 w-20 animate-spin stroke-gray-500" viewBox="0 0 256 256">
             <line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
             <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" stroke-linecap="round" stroke-linejoin="round"
                 stroke-width="24"></line>
             <line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
            </line>
             <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                 stroke-width="24"></line>
             <line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
             </line>
            <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                 stroke-width="24"></line>
             <line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
             <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
             </line>
           </svg>
         <span class="text-4xl font-medium text-gray-500">Loading...</span>
        </div>
        </div>
      )}
      <div className="w-[550px] border mx-auto bg-white shadoweffect rounded-lg">
        <div className="max-w-md mx-auto w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
              Reset Password
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
                <label htmlFor="mobile" className="sr-only">
                  Mobile Number
                </label>
                <PhoneInput
                  id="mobile"
                  value={mobile}
                  onChange={handlePhoneChange}
                  defaultCountry="" // Default country code can be set here
                  international // Enables international format
                  countryCallingCodeEditable={false} // Makes the country code part non-editable
                  type="tel"
                  autoComplete="tel"
                  className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#B7A880] sm:text-sm sm:leading-6"
                  placeholder="Mobile Number"
                />
                {errors.mobile && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.mobile.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="font-medium text-black-600 hover:text-[#beb18d]"
                >
                  Back to Login
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group bg-[#a89768] relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white hover:bg-[#B7A880] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={loading}
              >
                Reset Password
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
  