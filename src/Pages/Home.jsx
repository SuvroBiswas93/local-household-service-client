import React from 'react';
import HeroSlider from '../Components/HeroSlider';
import Services from './Services';
import WhyChooseUs from '../Components/WhyChooseUs';
import Testimonials from '../Components/Testimonials';
import TopServices from './TopServices';

const Home = () => {
    return (
        <div>
            <HeroSlider></HeroSlider>
            <TopServices></TopServices>
            <WhyChooseUs></WhyChooseUs>
            <Testimonials></Testimonials>
            
        </div>
    );
};

export default Home;