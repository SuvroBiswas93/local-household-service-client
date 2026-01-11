import React from 'react';
import HeroSlider from '../Components/HeroSlider';
import Services from './Services';
import WhyChooseUs from '../Components/WhyChooseUs';
import Testimonials from '../Components/Testimonials';
import TopServices from './TopServices';
import FAQ from './FAQ';
import ServiceOverview from './ServiceOverview';
import HowItWorks from './HowItWorks';

const Home = () => {
    return (
        <div>
            <HeroSlider></HeroSlider>
            <TopServices></TopServices>
            <ServiceOverview />
            <HowItWorks />
            <WhyChooseUs></WhyChooseUs>
            <Testimonials></Testimonials>
            <FAQ />
            
        </div>
    );
};

export default Home;