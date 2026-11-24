import React, {useState} from "react";

function News(){
    
    const news =[

        {
            date: "November 2026",
            title: "Welcome to Our Platform",
            text: "Discover a better way to explore videos and improve your learning experience."
        },
        {
            date: "November 2026",
            title: "New Features Coming Soon",
            text: "We are working on new features to make your experience even better."
        },
        {
            date: "November 2026",
            title: "Learning Made Easier",
            text: "Explore new opportunities to learn, grow and develop your skills."
        }
    ]
    return(
        <section id="news" className="news-section py-5" >
            <h1 className="text-center">Latest News</h1>
            <div className="container">
                <p className="text-center">Stay updated with our latest announcements.</p>
                
                <div className="row g-4 mt-3">
                    {news.map((item, index) =>(
                        <div className="col-md-4" key={index}>
                             <div className="news-card p-4 h-100" >
                                <small>{item.date}</small>
                                <h4 className="mt-3">{item.title} </h4>
                                <p>{item.text}</p>

                                <button className="btn btn-primary">Read More </button>
                             </div>

                        </div>
                    ))}

                    

                </div>
            </div>

        </section>

    )
}

export default News;