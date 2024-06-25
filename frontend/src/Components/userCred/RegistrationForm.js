// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import "tailwindcss/tailwind.css";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Link } from 'react-router-dom';



// const RegistrationForm = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     // setError,
//     watch,
//     reset,
//   } = useForm();

//   const [loading, setLoading] = useState(false);
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();

//   const onSubmit = async (data) => {
//     setLoading(true);
//     // handle registration logic
//     console.log(data);
//     setLoading(false)
//   };

//   const validatePassword = (value) => {
//     return (
//       /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/.test(value) ||
//       "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character."
//     );
//   };

//   const validateConfirmPassword = (value) => {
//     return value === watch("password") || "Passwords do not match";
//   };

//   const Spinner = () => (
//     <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
//       <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
//     </div>
//   );

//   return (
//     <div className="bg-gradient-to-b from-[#D8CCA6] to-[#B7A880] min-h-screen flex items-center justify-center">
//       {loading && <Spinner />}
//       <div className={`flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white bg-opacity-90 rounded-lg shadow-md ${loading ? 'hidden' : ''}`}>
//         <div className="sm:mx-auto sm:w-full sm:max-w-lg">
//           <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
//             Register an account
//           </h2>
//         </div>

//         <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-lg">
//           <form
//             className="space-y-6"
//             onSubmit={handleSubmit(onSubmit)}
//             noValidate
//           >
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               <div>
//                 <label
//                   htmlFor="firstName"
//                   className="block text-sm font-medium leading-6 text-gray-900"
//                 >
//                   First Name <span className="text-red-500">*</span>
//                 </label>
//                 <div className="mt-2">
//                   <input
//                     id="firstName"
//                     name="firstName"
//                     type="text"
//                     {...register("firstName", {
//                       required: "First name is required",
//                     })}
//                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#B7A880] sm:text-sm sm:leading-6"
//                   />
//                   {errors.firstName && (
//                     <span className="text-red-600">{errors.firstName.message}</span>
//                   )}
//                 </div>
//               </div>

//               <div>
//                 <label
//                   htmlFor="lastName"
//                   className="block text-sm font-medium leading-6 text-gray-900"
//                 >
//                   Last Name <span className="text-red-500">*</span>
//                 </label>
//                 <div className="mt-2">
//                   <input
//                     id="lastName"
//                     name="lastName"
//                     type="text"
//                     {...register("lastName", { required: "Last name is required" })}
//                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#B7A880] sm:text-sm sm:leading-6"
//                   />
//                   {errors.lastName && (
//                     <span className="text-red-600">{errors.lastName.message}</span>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium leading-6 text-gray-900"
//                 >
//                   Email address <span className="text-red-500">*</span>
//                 </label>
//                 <div className="mt-2">
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     autoComplete="email"
//                     {...register("email", {
//                       required: "Email is required",
//                       pattern: {
//                         value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
//                         message: "Enter a valid email",
//                       },
//                     })}
//                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#B7A880] sm:text-sm sm:leading-6"
//                   />
//                   {errors.email && (
//                     <span className="text-red-600">{errors.email.message}</span>
//                   )}
//                 </div>
//               </div>

//               <div>
//                 <label
//                   htmlFor="mobile"
//                   className="block text-sm font-medium leading-6 text-gray-900"
//                 >
//                   Mobile Number <span className="text-red-500">*</span>
//                 </label>
//                 <div className="mt-2">
//                   <input
//                     id="mobile"
//                     name="mobile"
//                     type="tel"
//                     {...register("mobile", {
//                       required: "Mobile number is required",
//                       pattern: {
//                         value: /^[0-9]{10}$/,
//                         message: "Enter a valid mobile number with 10 digits",
//                       },
//                     })}
//                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#B7A880] sm:text-sm sm:leading-6"
//                   />
//                   {errors.mobile && (
//                     <span className="text-red-600">{errors.mobile.message}</span>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               <div>
//                 <label
//                   htmlFor="password"
//                   className="block text-sm font-medium leading-6 text-gray-900"
//                 >
//                   Password <span className="text-red-500">*</span>
//                 </label>
//                 <div className="mt-2">
//                   <input
//                     id="password"
//                     name="password"
//                     type="password"
//                     {...register("password", {
//                       required: "Password is required",
//                       validate: validatePassword,
//                     })}
//                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#B7A880] sm:text-sm sm:leading-6"
//                   />
//                   {errors.password && (
//                     <span className="text-red-600">{errors.password.message}</span>
//                   )}
//                 </div>
//               </div>

//               <div>
//                 <label
//                   htmlFor="confirmPassword"
//                   className="block text-sm font-medium leading-6 text-gray-900"
//                 > 
//                   Confirm Password <span className="text-red-500">*</span>
//                 </label>
//                 <div className="mt-2">
//                   <input
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     type="password"
//                     {...register("confirmPassword", {
//                       required: "Confirm password is required",
//                       validate: validateConfirmPassword,
//                     })}
//                     className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#B7A880] sm:text-sm sm:leading-6"
//                   />
//                   {errors.confirmPassword && (
//                     <span className="text-red-600">
//                       {errors.confirmPassword.message}
//                     </span>
//                   )}
//                   <ToastContainer />
//       <div className="mt-4 text-center ml-n-220">
//           Already a member? <Link to="/login" className="text-indigo-600 hover:text-indigo-500">Sign in</Link>
//         </div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex justify-between">
//               <div>
//                 <button
//                   type="button"
//                   onClick={() => reset()}
//                   className="w-full rounded-md bg-gray-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                 >
//                   Reset
//                 </button>
//               </div>

//               <div>
//                 <button
//                   type="submit"
//                   className="w-full rounded-md bg-[#B7A880] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#D8CCA6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                 >
//                   Register
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//         <ToastContainer />
//         <div className="mt-4 text-center text-gray-900">
//           {/* Already a member? <Link to="/login" className="text-[#B7A880] hover:text-[#D8CCA6]">Sign in</Link> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegistrationForm;
