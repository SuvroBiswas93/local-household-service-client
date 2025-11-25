import React, { use } from 'react';
import { useState } from 'react';
import { Eye, EyeOff, Leaf } from "lucide-react"
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from '../Provider/AuthProvider';
import logo from '../../public/HomeHero.webp'

const Login = () => {
    const [error, setError] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const { signIn, googleLogin } = use(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    // console.log(location);
    const handleLogin = (e) => {
        e.preventDefault();
        // console.log({ email, password });
        signIn(email, password)
            .then((result) => {
                const user = result.user;
                console.log(user);
                navigate(`${location.state ? location.state : "/"}`);
                toast.success('Login Successful!!')
            })
            .catch((error) => {
                const errorCode = error.code;
                // const errorMessage = error.message;
                // alert(errorCode, errorMessage);
                setError(errorCode);

            });


    }
    const handleGoogleLogin = async () => {
        setLoading(true)
        try {
            await googleLogin()
            toast.success("Login successful!")
            navigate("/")
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-green-100 to-emerald-100 px-6 rounded-md">
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

                {/* LEFT — Login Form */}
                <div className="order-2 md:order-1 bg-white rounded-2xl shadow-lg p-8 border border-green-100">
                    <form onSubmit={handleLogin} className="space-y-5">

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your Email.."
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Your Password"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {error && <p className="text-red-500">{error}</p>}

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-linear-to-r from-green-600 cursor-pointer to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition"
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
                        className="btn bg-white text-black border-[#e5e5e5] w-full"
                    >
                        <svg aria-label="Google logo" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>

                    <p className="text-center text-gray-600 mt-6">
                        Don't have an account?
                        <Link to="/auth/register" className="text-green-600 hover:text-green-700 font-semibold">
                            Register
                        </Link>
                    </p>
                </div>

                {/* RIGHT — Branding + Paragraph */}
                <div className="order-1 md:order-2 text-right">
                    <div className="flex justify-center items-center gap-2 mb-4">
                        <img src={logo} alt="" className="w-10 h-10" />
                        <h1 className="text-4xl font-bold text-green-700">
                            Home<span className="text-blue-400">Hero</span> Login
                        </h1>
                    </div>

                    <p className="text-lg text-gray-700 text-center mt-4  ">
                        Book trusted household services with ease. Fast, safe, and reliable help for your daily home needs.
                    </p>
                </div>

            </div>
        </div>


    );
};

export default Login;