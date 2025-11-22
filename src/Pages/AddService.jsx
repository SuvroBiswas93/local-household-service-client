import React from 'react';

const AddService = () => {
    return (
        <div className='bg-blue-50 w-11/12 mx-auto mt-6 py-4 px-4 rounded-lg'>
            <div className="max-w-2xl mx-auto mt-6 mb-6 bg-white shadow-lg rounded-lg p-8 ">
                <h2 className="text-3xl font-bold text-center mb-6">Add New Service</h2>

                <form className="space-y-5">
                    {/* Service Name */}
                    <div>
                        <label className="label font-medium">Service Name</label>
                        <input
                            type="text"
                            name="serviceName"
                            required
                            placeholder="Enter Service Name"
                            className="input w-full rounded-full focus:border-0 focus:outline-gray-200 p-3"
                        />
                    </div>


                    {/* Category */}
                    <div>
                        <label className="label font-medium">Category</label>
                        <select
                            defaultValue={""}
                            name='category'
                            required
                            className="select w-full rounded-full focus:border-0 focus:outline-gray-200"
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
                            <option value="TV & Computer Repair">TV & Computer Repair</option>
                        </select>
                    </div>


                    {/* Price */}
                    <div>
                        <label className="block font-semibold mb-1">Price</label>
                        <input
                            type="number"
                            name='price'
                            className="w-full border rounded-md p-2 focus:ring focus:ring-green-300"
                            placeholder="Enter price"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block font-semibold mb-1">Description</label>
                        <textarea
                            className="w-full border rounded-md p-2 focus:ring focus:ring-green-300"
                            name='description'
                            rows="3"
                            placeholder="Write service details"
                        ></textarea>
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block font-semibold mb-1">Image URL</label>
                        <input
                            type="text"
                            name='image'
                            className="w-full border rounded-md p-2 focus:ring focus:ring-green-300"
                            placeholder="https://example.com/photo.jpg"
                        />
                    </div>

                    {/* Provider Name */}
                    <div>
                        <label className="block font-semibold mb-1">Provider Name</label>
                        <input
                            type="text"
                            name='provider'
                            className="w-full border rounded-md p-2 focus:ring focus:ring-green-300"
                            placeholder="Enter your name"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block font-semibold mb-1">Email</label>
                        <input
                            type="email"
                            name='email'
                            className="w-full border rounded-md p-2 focus:ring focus:ring-green-300"
                            placeholder="Enter email"
                        />
                    </div>

                    {/* Submit Button */}
                    <button className="w-full bg-green-600 text-white py-2 cursor-pointer rounded-md font-semibold hover:bg-green-700">
                        Add Service
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddService;
