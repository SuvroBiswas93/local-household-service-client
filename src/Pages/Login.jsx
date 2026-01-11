import React, { useState, useContext } from 'react';
import { Eye, EyeOff } from "lucide-react";
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../Provider/AuthProvider';
import logo from '../../public/HomeHero.webp';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, googleLogin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: 'onChange' }); // instant validation

  const handleLogin = async (data) => {
    setLoading(true);
    try {
      const result = await signIn(data.email, data.password);
      const user = result.user;
      navigate(`${location.state ? location.state : "/"}`);
      toast.success('Login Successful!!');
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
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-blue-200 to-teal-200 rounded-md">
      <div className=" w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* LEFT — Login Form */}
        <div className="order-2 md:order-1 bg-white rounded-2xl shadow-lg p-8 border border-green-100">
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                placeholder="Your Email.."
                className={`w-full px-4 py-3 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address"
                  }
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
                  placeholder="Your Password"
                  className={`w-full px-4 py-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                      message: "Password must have 1 uppercase, 1 lowercase, min 6 chars"
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

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold cursor-pointer hover:bg-teal-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
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
            Don't have an account?{" "}
            <Link to="/auth/register" className="text-teal-500 hover:text-teal-600 font-semibold">
              Register
            </Link>
          </p>
        </div>

        {/* RIGHT — Branding + Paragraph */}
        <div className="order-1 md:order-2 text-right">
          <div className="flex justify-center items-center gap-2 mb-4">
            <img src={logo} alt="" className="w-10 h-10" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-500 to-blue-700 bg-clip-text text-transparent">
              HomeHero Login
            </h1>
          </div>
          <p className="text-lg text-gray-700 text-center mt-4">
            Book trusted household services with ease. Fast, safe, and reliable help for your daily home needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
