import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, useNavigate, useLocation} from "react-router-dom";
import { useEffect, useState } from 'react';
import images from '../assets/images';

// IMPORT component here 
import BookOffer from "./compnonet/BookOffer";
import Services from "./compnonet/Services";
import News from './compnonet/News';
import Contact from "./compnonet/Contact";
import OfferApp from './compnonet/Offer';

function AllCollapseExample() {

  const [direction, setDriection] = useState("horizontal");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [flipDirection, setFlipDirection] =useState("horizontal")


  // Automatically change slider images
    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentSlide((prev) => 
          (prev + 1) % images.length
          );
        }, 400);
        return() => clearInterval(interval);
    }, []);

   const prevSlide =()=>{
     setCurrentSlide((prev) =>
       (prev - 1 + images.length) % images.length
    );
   };

   const nextSlide =()=>{
      setCurrentSlide((prev) =>
        (prev + 1) % images.length
      );
   };


  return (

     <main className='main.container'>

          {/* HOME SECTION */}
          <section id="about" className="home-section">
            <div className='section-content'>

              <h1 className='page-co3'>Welcome to <s>YouTube</s> Player</h1>
              
              <div className='main-grid'>

                <div className='grid-left'>
                    <h2>our best offer , we loop out watch hours in every minits  </h2>
                    <strong>Greatest Priority</strong>

                    <p>MedVita Youtube player delivers world-class monizt  with compassion and innovation. Serving over 500,000 youtube with a team of 200+ specialist.</p>
                  
                   <div className='row-main'>
                     <a href="#Services" className='our-co1' > our services </a>
                      <a href="#offer"className='our-c02' >Our Offers</a>
                   </div>
                </div>

                <div className='grid-right'>
                  <h2>Available Specialists Today</h2>
                     <div className='main-02'>
                         <div class="doctor-avatar">👨‍⚕️</div>
                            <div class="doctor-info">
                              <strong> ojenima Rapheal</strong>
                              <span>monitz · 20 yrs exp</span>
                            </div>
                     </div>
                     <div className='main-02'>
                         <div class="doctor-avatar">👨‍⚕️</div>
                            <div class="doctor-info">
                              <strong> Emeka john</strong>
                              <span>monitz · 15 yrs exp</span>
                            </div>
                     </div>
                     <div className='main-02'>
                        <div class="doctor-avatar">👨‍⚕️</div>
                            <div class="doctor-info">
                              <strong> Emeka fine ese</strong>
                              <span>monitz · 12 yrs exp</span>
                            </div>
                     </div>
                </div>
              </div>  
                
                 <div className='main-image 3D'>

                    <div className='slide-section'>
                        <h2>Youtube set <s>outside</s> player</h2>
                        <p>watch count here with the following show. </p>

                          <div className='animation-buttons'>
                            <button onClick={() => setDriection("horizontal")}>Left/Right</button>
                             <button onClick={() => setDriection("vertical")}>Up/Down</button>
                          </div>

                        <div className={`image-slider ${direction}`}> 

                          <div className='slider-track' style={{transform: direction === "horizontal"
                                ? `translateX(-${currentSlide * 70}%)`
                                : `translateY(-${currentSlide * 70}%)`,
                              }}>
                                {images.map((item, index) => (

                                  <div className='slide-item' key={index}>
                                    <img
                                      src={item.image}
                                      alt={item.title}
                                    />

                                    <div className='slide-content'>
                                      <h2>{item.title}</h2>
                                      <p>{item.text}</p>
                                    </div>
                                  </div>
                                ))}
                            </div>

                            <button className='slider-arrow prev' onClick={prevSlide}>&#10094;</button>
                            <button className='slider-arrow next' onClick={nextSlide}>&#10095;</button>
                        </div>

                        <div className='slider-dots'> 
                          {images.map((__, index) => (
                            <button key={index} className={currentSlide === index ? "active" : ""}
                             onClick={() => setCurrentSlide(index)}
                            />
                          ))}
                        </div>
                          
                    </div>

                    {/* 3D Animation */}
                  <section className="flip-section">
                          <p> set flip show Youtube show.</p>
                        <div className="animation-buttons">
                          <button onClick={() =>
                              setFlipDirection("horizontal") }>
                              Horizontal Flip
                          </button>

                          <button
                            onClick={() => setFlipDirection("vertical") }>
                            Vertical Flip
                          </button>
                        </div>

                        <div className={`flip-container ${flipDirection}`}>

                          <div className="flip-card">
                            <div className="flip-front">
                              <img src={images[2].image} alt="Front image" />
                            </div>

                            <div className="flip-back">
                              <img
                                src={images[4].image}  alt="Back image"  />
                            </div>
                          </div>
                        </div>

                  </section> 
                 </div>
            </div>
          </section>

          <div className='grid-under'>
                 <div className='inner'>
                   <span>🚨</span>
                    <strong> Emergency</strong>
                    <span>our ER Open 24/7 — Call immediately</span>
                    <a href="tel:+2347052218308" className='link'>+234 705 221 8308</a>
                    <span>or</span>
                    <label htmlFor="email"> oJENIMA40@GMAIL.COM</label>
                 </div>
            </div>


      {/* SERVICES SECTION */}
      
      <Services />
         {/* NEWS SECTION */}
      <News />
         {/* OFFER SECTION */}
      <OfferApp />
        {/* CONTACT SECTION */}
        {/* BOOK SECTION */}
      < BookOffer />
        

      < Contact />
     </main>

  );
}

export default AllCollapseExample;