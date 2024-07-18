import { ArrowLeftOutlined, ArrowRightOutlined } from '@mui/icons-material';
import { slides } from '../data'; 
import './slideshow.scss';
import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom';

const Slideshow = () => { 
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []); 

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const goToPrevSlide = () => {
        setCurrentSlide(prevSlide => (prevSlide - 1 + slides.length) % slides.length);
    };

    const goToNextSlide = () => {
        setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length);
    };

    return (
        <div className='slideshow'>
            {slides.map((slide, index) => (
                <div key={index} className={`slide ${index === currentSlide ? 'active' : ''}`} style={{ backgroundColor: slide.background }}>
                    <div className='slide-wrapper'>
                        <div className='slide-content'>
                        <h1>{slide.title}</h1>
                        <p>{slide.desc}</p>
                        <Link to={`/products/${slide.cat}`} className='link'>
                            <button className='orders'>Shop Now</button>
                        </Link>
                        </div>
                    <img src={slide.img} alt="" />
                    
                    </div>
                </div>
            ))}
            <div className="indicators">
                {slides.map((_, index) => (
                    <div key={index} className={`indicator ${index === currentSlide ? 'active' : ''}`} onClick={() => goToSlide(index)}>
                        
                    </div>
                ))}
            </div>
            <button className="prev" onClick={goToPrevSlide}><ArrowLeftOutlined/></button>
            <button className="next" onClick={goToNextSlide}><ArrowRightOutlined/></button>
        </div>
    );
};

export default Slideshow;
