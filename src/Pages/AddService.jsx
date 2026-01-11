import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../Provider/AuthProvider';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const AddService = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm();

    const onSubmit = async (data) => {
        const formData = {
            Service: data.serviceName,
            Category: data.category,
            Price: parseInt(data.price),
            Description: data.description,
            Image: data.image,
            Provider: data.provider,
            Email: data.email,
            providerEmail: user?.email,
            created_At: new Date(),
            created_By: user?.email || 'Anonymous',
        };

        try {
            const res = await fetch(
                'https://local-household-service-server.vercel.app/services',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                }
            );

            const result = await res.json();

            if (res.ok) {
                toast.success('Service Created Successfully!');
                reset();
                navigate('/services');
            } else {
                throw new Error(result.message || 'Failed to create service');
            }
        } catch (error) {
            toast.error(error.message || 'Something went wrong');
        }
    };

    return (
        <div className="w-11/12 mx-auto mt-6 py-4 px-4 rounded-lg">
            <div className="max-w-2xl mx-auto mt-6 mb-6 border shadow-2xl border-teal-50 rounded-lg p-8">

                <h2 className="text-3xl font-bold text-center mb-6">
                    Add New Service
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    {/* Service Name */}
                    <div>
                        <label className="label font-medium">Service Name</label>
                        <input
                            type="text"
                            {...register('serviceName', { required: 'Service name is required' })}
                            placeholder="Enter Service Name"
                            className="input w-full rounded-full p-3"
                        />
                        {errors.serviceName && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.serviceName.message}
                            </p>
                        )}
                    </div>

                    {/* Category */}
                    <div>
                        <label className="label font-medium">Category</label>
                        <select
                            {...register('category', { required: 'Category is required' })}
                            defaultValue=""
                            className="select w-full rounded-full"
                        >
                            <option value="" disabled>
                                Select Category
                            </option>
                            <option value="Home Cleaning">Home Cleaning</option>
                            <option value="Plumbing">Plumbing</option>
                            <option value="Electrical Repair">Electrical Repair</option>
                            <option value="Painting">Painting</option>
                            <option value="Appliance Repair">Appliance Repair</option>
                            <option value="Gardening">Gardening</option>
                            <option value="Carpentry">Carpentry</option>
                            <option value="Pest Control">Pest Control</option>
                            <option value="AC Service">AC Service</option>
                            <option value="TV & Computer Repair">
                                TV & Computer Repair
                            </option>
                        </select>
                        {errors.category && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.category.message}
                            </p>
                        )}
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block font-semibold mb-1">Price</label>
                        <input
                            type="number"
                            {...register('price', {
                                required: 'Price is required',
                                min: { value: 1, message: 'Price must be greater than 0' },
                            })}
                            className="w-full border rounded-md p-2"
                            placeholder="Enter price"
                        />
                        {errors.price && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.price.message}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block font-semibold mb-1">Description</label>
                        <textarea
                            {...register('description', { required: 'Description is required' })}
                            className="w-full border rounded-md p-2"
                            rows="3"
                            placeholder="Write service details"
                        ></textarea>
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block font-semibold mb-1">Image URL</label>
                        <input
                            type="text"
                            {...register('image', { required: 'Image URL is required' })}
                            className="w-full border rounded-md p-2"
                            placeholder="https://example.com/photo.jpg"
                        />
                        {errors.image && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.image.message}
                            </p>
                        )}
                    </div>

                    {/* Provider Name */}
                    <div>
                        <label className="block font-semibold mb-1">Provider Name</label>
                        <input
                            type="text"
                            {...register('provider', { required: 'Provider name is required' })}
                            className="w-full border rounded-md p-2"
                            placeholder="Enter your name"
                        />
                        {errors.provider && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.provider.message}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block font-semibold mb-1">Email</label>
                        <input
                            type="email"
                            defaultValue={user?.email}
                            {...register('email', { required: 'Email is required' })}
                            className="w-full border rounded-md p-2"
                            placeholder="Enter email"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        disabled={isSubmitting}
                        className="w-full bg-teal-600 text-white py-2 rounded-md font-semibold hover:bg-teal-700 disabled:opacity-70"
                    >
                        {isSubmitting ? 'Submitting...' : 'Add Service'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddService;
