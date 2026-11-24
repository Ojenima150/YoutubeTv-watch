import React, { useState } from "react";
import {imageis} from "../../assets/images";
import "./compnonet.css";

function BookOffer(){

    const offers = [
        {   
         id: "1",
         name: "Baisc package",
         price: "$100",
         features: ["Hotel Transport", "Flight"]
       },

       {
         id: "2",
         name: "premium package",
         price: "$250",
         features: ["Hotel Transport", "Flight"]

       },
        {
         id: "3",
         name: "Luxury package",
         price: "$500",
         features: ["Hotel Transport", "Flight", "Tour Guide" ]

       }
    ];

    const [selectedOffer, setSelectedOffer] = useState(null);

    const [formData, setFormData]=useState({
         name: "",
         email: "",
         phone: ""
    });

    const handleChange =(e) =>{
        const {name, value} = e.target;
        
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleBooking =(e)=>{
        e.preventDefault();

        if(!selectedOffer){
            alert("please select an offer first.");
            return;
        }

        alert(
            `Booking submitted!\n\mName: ${formData.name}\nPackage: ${selectedOffer.name}\nPrice: ${selectedOffer.price}`
        );

        setFormData({
            name: "",
            email: "",
            phone: ""
        });
        setSelectedOffer(null);
    };

    return(
        <section className="book-section" id="book">

             <h1 className="text-center">Book an offer </h1>

            <div className="book-grid">
                
                <div className="container">
                     
                    <form className="booking-form p-4" onSubmit={handleBooking}>

                    <div className="mb-3">
                        <label htmlFor=""> Your Name</label>
                        <input type="text" name="name" className="form-control"
                        value={formData.name} onChange={handleChange} required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor=""> Email Address </label>
                        <input type="email" name="email" className="form-control"
                            value={formData.email} onChange={handleChange} required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor=""> Phone Number </label>
                        <input type="tel" name="phone" className="form-control"
                            value={formData.phone} onChange={handleChange} required
                        />
                    </div>
                        
                    <div className="mb-3">
                        <label>Select Package</label>

                        <select
                            className="form-select"
                            value={selectedOffer?.id || ""}
                            onChange={(e) => {
                                const offer = offers.find(
                                (item) => item.id === e.target.value
                                );

                                setSelectedOffer(offer || null);
                            }}
                            required
                        >
                        <option value="">Choose a package</option>

                        {offers.map((offer) => (
                            <option key={offer.id} value={offer.id}>
                            {offer.name}
                            </option>
                        ))}
                        </select>
                    </div>

                    {selectedOffer && (
                        <div className="seleted-package p-3 mb-3">
                            <div className="price-mb4">
                                <h3>{selectedOffer.name}</h3>
                                <h4>{selectedOffer.price} </h4>
                            </div>
                            

                            <ul>
                                <p>package includes:</p>

                                {selectedOffer.features.map((features, index) =>(
                                    <li key={index}>{features} </li>
                                ))}
                            </ul>
                        </div>
                    )}


                    <button type="submit" className="btn btn-success"> Submit Booking </button>
                        
                    </form>
               </div>

               <div className="book-image">
                 <img src={imageis[0].image} 
                 alt={imageis[0].image.title} />
               </div>

            </div>
               
        </section>
    )

}



export default BookOffer;