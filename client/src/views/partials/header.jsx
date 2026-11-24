import { useState } from "react";
import {Link, useNavigate, useLocation} from "react-router-dom";


function Header(){
    const Navigate = useNavigate();
    const location = useLocation();

    const scrollToSection =(id) =>{
        if(location.pathname === '/'){
            const el = document.getElementById(id);
            if(el) el.scrollIntoView({behavior: "smooth"});
        }else{
            Navigate('/');
            setTimeout(() =>{
                const el = document.getElementById(id);
                if(el) el.scrollIntoView({behavior: "smooth"});
            }, 300);
        }
    };

     const [menuOpen, setMenuOpen]=useState(false);

     function closeMobile(){
        setMenuOpen(false);
     }

    return(
        <nav className="YUBT-Nav"> 
           <ul className="yubt-ul">
               <button onClick={() => scrollToSection('about')} className="YubH-Btn"> <s>Youtuble</s> Player</button>
              <div className="YubH-Nav-co2">
                  <div className="nav-link">
                    <button onClick={() => scrollToSection('about')}>Home</button>
                    <button onClick={() => scrollToSection('Services')}>Services</button>
                    <button onClick={() => scrollToSection('news')}>News</button>
                    <button onClick={() => scrollToSection('offer')}>Offer</button>
                    <button onClick={() => scrollToSection('contact')}>contact</button>
                    <Link to="/login" className="link-btn">login</Link>
                </div>

               <button onClick={() => scrollToSection('book')} className="Book">BOOK offer</button>
            </div>
          </ul>
                    {/* <button className="menu-toggle"  id="menuToggle" aria-label="Menu">&#x2630;</button> */}


          {/* ====== Mobile */}
          <div className="mobile-container">
            
             <div className={`mobile-mb3 ${menuOpen ? "open" : ""}`}>
                <button onClick={() => {scrollToSection('about'); closeMobile(); }} >Home</button>
                <button onClick={() => {scrollToSection('Services'); closeMobile(); }} >Services</button>
                <button onClick={() => {scrollToSection('news'); closeMobile(); }} >News</button>
                <button onClick={() => {scrollToSection('offer'); closeMobile(); }} >Offer</button>
                <button onClick={() => {scrollToSection('contact'); closeMobile(); }} >Contact</button>
                <button onClick={() => scrollToSection('book')} >BOOK offer</button>
                <Link to="/login" className="link-btn">login</Link>
             </div>

             <div className="mo-c01">
              {/* <button className="menu-toggle"  id="menuToggle" aria-label="Menu">&#x2630;</button> */}
              <button className="menu-toggle" onClick={() => setMenuOpen(prev => !prev)}> 
                     {menuOpen ? "✕" : "☰"}
              </button>
            </div>

          </div>

        </nav>
    );
}



export default Header;