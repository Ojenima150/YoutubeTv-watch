import React, {useState} from "react";


function Contact(){

    const [form, setForm] =useState({
        name: "",
        email: "",
        message: ""
    });

    const handleSubmit = (e) =>{
        e.preventDefault();
        
        alert("Your message has sent sucessfully!");

        return({
            name: "",
            email: "",
            message: ""
        }); 
    };


    return(
        <section id="contact" className="contact-section">
             <h1 className="text-center">Contact Us</h1>

            <div className="container">
              <p className="text-center"> Have questions? We would love to hear from your </p>


                <div className="row g-4 mt-3">

                    <div className="col-md-5">
                        <div className="contact-info p-4">
                            <h3>Get In Touch</h3>
                            <p>📧 support@example.com</p>
                            <p>📞 +234 8088973044</p>
                            <p>📍 United state of American</p>
                            <p>Our team is ready to help you with your questions  and enquiries </p>
                        </div>
                    </div>

                    <div className="col-md-7">
                        <form className="contact-form p-4" onSubmit={handleSubmit}>
                            <label >Name:</label>
                            <input type="text"  className="form-control mb-3" value={form.name} onChange={(e) =>
                                    setForm({...form, name: e.target.value})
                                } placeholder="enter your name" required
                            />

                            <label >Email:</label>
                            <input type="email"  className="form-control mb-3" value={form.email} 
                                onChange={(e) =>
                                    setForm({...form, email: e.target.value})
                                } 
                                placeholder="Enter your email" required
                             />

                            <label >Messages:</label>
                            <textarea className="form-control mb-3" rows="5" value={form.message} onChange={(e) =>
                                setForm({...form, message: e.target.value})
                              }
                              placeholder="Write your message.." required
                            />

                            <button type="submit" className="btn btn-primary"> Send Message</button>
                        </form>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Contact;