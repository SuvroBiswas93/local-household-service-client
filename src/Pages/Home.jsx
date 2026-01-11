import React from 'react';
import HeroSlider from '../Components/HeroSlider';
import Services from './Services';
import WhyChooseUs from '../Components/WhyChooseUs';
import Testimonials from '../Components/Testimonials';
import TopServices from './TopServices';
import FAQ from './FAQ';
import ServiceOverview from './ServiceOverview';
import HowItWorks from './HowItWorks';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';

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
            <AboutUs />
            <ContactUs />
            
        </div>
    );
};

export default Home;