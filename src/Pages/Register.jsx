import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Provider/AuthProvider";
import logo from '../../public/HomeHero.webp'

const Register = () => {
  const { createUser, setUser, updateUser, googleLogin } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" }); // onChange triggers instant validation

  const handleRegister = async (data) => {
    setLoading(true);
    try {
      const result = await createUser(data.email, data.password);
      const user = result.user;
      await updateUser({ displayName: data.name, photoURL: data.photo });
      setUser({ ...user, displayName: data.name, photoURL: data.photo });
      toast.success('Registration Successful!! Welcome to HomeHero');
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await googleLogin();
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center rounded-xl justify-center bg-linear-to-r from-blue-200 to-teal-200 px-3 py-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-5">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src={logo} alt="" className="w-10 h-10" />
            <h1 className="text-3xl font-bold">
              <span className="bg-gradient-to-r from-blue-900 to-teal-500 bg-clip-text text-transparent">
                HomeHero Register
              </span>
            </h1>
          </div>
        </div>

        {/* Register Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-2 border border-teal-100">
          <form onSubmit={handleSubmit(handleRegister)} className="space-y-5 ">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className={`w-full px-4 py-3 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition ${errors.name ? 'border-red-500' : ''}`}
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 5,
                    message: "Name should be at least 5 characters long."
                  }
                })}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            {/* Photo URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Photo URL</label>
              <input
                type="text"
                placeholder="Enter your photo URL"
                className={`w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition ${errors.photo ? 'border-red-500' : ''}`}
                {...register("photo", { required: "Photo URL is required" })}
              />
              {errors.photo && <p className="text-red-500 text-xs mt-1">{errors.photo.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                placeholder="Your Email.."
                className={`w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition ${errors.email ? 'border-red-500' : ''}`}
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                })}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create Password"
                  className={`w-full px-4 py-3 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition ${errors.password ? 'border-red-500' : ''}`}
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                      message: "Password must contain uppercase, lowercase, min 6 chars"
                    }
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 hover:bg-teal-700 cursor-pointer text-white py-3 rounded-lg font-semibold hover:from-teal-700 hover:to-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-sm text-gray-500">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="btn bg-white text-black border-[#e5e5e5] w-full flex items-center justify-center gap-2"
          >
            <svg aria-label="Google logo" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
              </g>
            </svg>
            Login with Google
          </button>

          <p className="text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-teal-600 hover:text-teal-700 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
