import React, {useState}from "react";


function OfferApp() {
    const offeset = [
        {
            name: "Basic",
            price: "Free",
            features: ["Basic video access", "Learning resources", "User support"]
        },
        {
            name: "Standard",
            price: "₦5,000",
            features: ["All basic features", "More learning resources", "Priority support"]
        },
        {
            name: "Premium",
            price: "₦10,000",
            features: ["All standard features", "Premium resources", "Special support"]
        }

    ];

    return(
        <section  id="offer" className="offer-section">
            <h1 className="text-center">Our Offers</h1>
            <div className="container">
              <p className="text-center"> Choose an option that suits your needs.</p>
               
               <div className="row g-4 mt-3">
                 {offeset.map((item, index) => (
                     <div className="col-md-4" key={index}>
                        <div className="offer-card p-4 text-center h-100">
                            <h3>{item.name} </h3>
                            <h2>{item.price} </h2>

                            {item.features.map((features, i) => (
                                <p key={i}> ✓{features} </p>
                            ))}
                            <a href="#book" className="btn btn-primary"> Choose offer </a>
                        </div>
                     </div>
                 ))}
                   
               </div>
            </div>
        </section>
    );
}

export default OfferApp