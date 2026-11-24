import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";

function Services(){

    const service = [
        { 
            icon: "📺",
            title: "YouTube Video Learning",
            text: "Discover educational videos and learn new skills through engaging content."
        },
        {
            icon: "▶️",
            title: "Watch & Explore",
            text: "Enjoy a simple and convenient way to explore and watch your favourite content."
        },
        {
            icon: "📚",
            title: "Learning Resources",
            text: "Access useful learning resources designed to support your personal growth."
        }
    ]
    return(
        <section id="Services" className="services-section">
            <h1 className="text-center">Our Services</h1>
            
            <div className="container">
                 <p className="text-center"> Discover what you can do with our platform. </p>
        
                 <div className="row g-4 mt-3">

                    {service.map((item, index) => (
                      <div className="col-md-4" key={index}>
                         <div className="service-card p-4 h-100">
                           <h2>{item.icon}</h2>
                           <h4>{item.title} </h4>
                           <p>{item.text} </p>
                         </div>
                      </div>
                    ))}

                 </div>
            </div>
        </section>
    );
}

export default Services;