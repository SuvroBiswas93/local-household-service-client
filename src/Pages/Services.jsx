import React from 'react';
import { useLoaderData } from 'react-router';
import ServiceCard from '../Components/ServiceCard';

const Services = () => {
    const serviceData = useLoaderData()
    console.log(serviceData)
    return (
        <div >
            <div className='mt-10 space-y-3'>
                <h2 className='font-bold text-4xl  text-center'>Our Services List</h2>
                <p className='text-center text-md'>Discover a wide range of reliable household services designed to make your
                    daily life easier.</p>
            </div>
            <div className='w-11/12 mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4  my-10'>
                {
                    serviceData.map(data => <ServiceCard key={data._id} data={data}></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;