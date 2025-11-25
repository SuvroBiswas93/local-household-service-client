import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";

const MyProfile = () => {
    const { user, updateUser, setUser } = useContext(AuthContext);

    const [name, setName] = useState(user?.displayName || "");
    const [photo, setPhoto] = useState(user?.photoURL || "");
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const [lastLogin, setLastLogin] = useState("");

    useEffect(() => {
        // Read stored login time
        const savedLoginTime = localStorage.getItem("lastLogin");
        if (savedLoginTime) {
            setLastLogin(savedLoginTime);
        }
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await updateUser({ displayName: name, photoURL: photo });
            setUser({ ...user, displayName: name, photoURL: photo });
            toast.success("Profile updated successfully!");
            setEditing(false);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md border  border-blue-50 text-center">
                <h2 className="text-2xl font-semibold text-green-700 mb-6">My Profile</h2>

                <img
                    src={user?.photoURL || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-green-200 mb-4"
                />

                {!editing ? (
                    <>
                        <p className="text-lg font-medium text-gray-700 mb-2">
                            Name: {user?.displayName || "No name set"}
                        </p>

                        <p className="text-gray-700 mb-2">
                            Email: {user?.email}
                        </p>

                        {/* ⭐ SHOW LAST LOGIN TIME */}
                        <p className="text-gray-600 mb-6">
                            Last Login: {lastLogin || "No login record"}
                        </p>

                        <button
                            onClick={() => setEditing(true)}
                            className="bg-linear-to-r from-green-600 cursor-pointer to-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition"
                        >
                            Update Profile
                        </button>
                    </>
                ) : (
                    <form onSubmit={handleUpdate} className="space-y-4">

                        {/* Name input */}
                        <div className="text-left">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Display Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-black"
                                required
                            />
                        </div>

                        {/* Photo input */}
                        <div className="text-left">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Photo URL
                            </label>
                            <input
                                type="text"
                                value={photo}
                                onChange={(e) => setPhoto(e.target.value)}
                                className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>

                        <div className="flex justify-center gap-4">
                            <button
                                type="button"
                                onClick={() => setEditing(false)}
                                className="px-5 py-2 cursor-pointer rounded-lg border bg-blue-400 text-white hover:bg-blue-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-linear-to-r cursor-pointer from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition disabled:opacity-50"
                            >
                                {loading ? "Updating..." : "Save"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default MyProfile;
