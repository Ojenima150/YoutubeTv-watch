import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";



function LoginApp() {
   const [isRegister, setIsRegister] = useState(false);
   const navigate = useNavigate();

    async function handleLogin(e){
        e.preventDefault();
          console.log("1. LOGIN BUTTON CLICKED");
    
        const formData = new FormData(e.currentTarget);

         const loginData = {
            email: formData.get("email"),
            password: formData.get("password")
         };

         try{

            console.log("2. SENDING TO SERVER:", loginData);
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify(loginData)
            });
           
            console.log("3. SERVER RESPONDED WITH STATUS:", response.status);
            const data = await response.json();

              if(!response.ok){
                alert(data.message || "Login faild");
                return;
              }
              
               localStorage.setItem("token", data.token || "logged-in");

              if(data.user){
                localStorage.setItem("user", JSON.stringify(data.user));
              }

              alert(data.message);
              navigate("/DashApp");
            //  navigate("/DashApp",{state:{user: data.user}});

         }catch(error){
            console.error("Login failed:", error);
            alert("unable to connect to server")
         }

    }


    async function handleRegister(e){
        e.preventDefault();

        console.log("REGISTER FUNCTION IS RUNNING");
        
        const formData = new FormData(e.currentTarget);

        const registerData ={
            fname:   formData.get("fname"),
            lname:   formData.get("lname"),
            dob:     formData.get("dob"),
            country: formData.get("country"),
            phone:   formData.get("phone"),
            email:   formData.get("email"),
            password: formData.get("password"),
            comfirmPassword: formData.get("comfirmPassword")
        };

         if(registerData.password !== registerData.comfirmPassword){
            alert("password do not match");
            return;
         }

        try{

            const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {"Content-type": "application/json"},

            body: JSON.stringify(registerData)
            });

            const data = await response.json();

            if(!response.ok){
                alert(data.message);
                return;
            }
            
            alert(data.message);
            setIsRegister(false);

        } catch (error){
            console.error("Registeration failed", error);
            alert("Unable to connect8 to server");

        }
    }
        

    return (
        <section className="selct-navLik">

           <div className={`login-container ${
                 isRegister ? "register-mode" : "login-mode"
            }`}>
        
             {isRegister ? (

                <div className="form-content register-form" >
                    <h1>Resgister</h1>

                    <form onSubmit={handleRegister}>

                     <div className="register-grid">

                        <div className="field">
                            <label htmlFor="fname" >first name</label>
                             <input type="text" id="fname" name="fname" placeholder="Enter your first name " required/>
                        </div>

                         <div className="field">
                            <label htmlFor="lname" >last name</label>
                             <input type="text" id="lname" name="lname" placeholder="Enter your last name " required/>
                        </div>

                            
                        <div className="field">
                            <label htmlFor="dob" >DOB</label>
                             <input type="date" id="dob" name="dob" placeholder="Enter your DoB" required/>
                        </div>

                         <div className="field">
                            <label htmlFor="country" >country</label>
                             <input type="text" id="country" name="country" placeholder="Enter your country " required/>
                        </div>


                        <div className="field">
                            <label htmlFor="Phone" >Phone</label>
                            <input type="tel" id="phone" name="phone" placeholder="Enter your Phone " required/>
                        </div>

                         <div className="field">
                            <label htmlFor="Phone" >Email</label>
                            <input type="email" id="email" name="email" placeholder="Enter your email" required/>
                        </div>

                        <div className="field">
                            <label htmlFor="password" >Phone</label>
                            <input type="password" id="password" name="password" placeholder="Enter your password " required/>
                        </div>

                         <div className="field">
                            <label htmlFor="password" > Comfirm Password</label>
                            <input type="password" id="comfirmPassword" name="comfirmPassword" placeholder="comfirm Password" required/>
                        </div>
                     </div>
                        <button className="btn btn-primary mt-3">Register</button>
                    </form>

                    <div className="form-line"></div>

                    <div className="form-footer">
                        <p><Link to="/" className="reg-home">← Return to Home</Link> </p>
                        <p className="lab-regs">Already have account? 
                            <span onClick={() => setIsRegister(false)} className="toggle-link tog-log">Login</span>
                        </p>
                    </div>


                </div>

             ) : (

                <div className="form-content">
                    {/* <h1>Login</h1> */}
                    <h1><Link to="/" >Home ← Login</Link> </h1>

                     <form onSubmit={handleLogin}>

                      <label htmlFor="email"> Enter Email </label>
                      <input type="email" name="email" className="form-control mb-3" placeholder="enter Email" required/>
                    
                     <label htmlFor="password"> Enter password</label>
                     <input type="password"  name="password" className="form-control mb-3" placeholder="password" required/>
                      
                       <button className="btn btn-success w-100">Login</button>
                     </form>


                        <div className="google-btn">
                            <button type="button" 
                               onClick={() => (window.location.href ="http://localhost:5000/api/google")}
                               className="btn btn-outline-danger w-100 mt-3"
                             >
                              Continue with Google
                            </button>
                        </div>
                     <div className="forgt-link">
                        <Link to="/ForgetPassword" className="forget-link">forget</Link>

                        <p className="mt-3"> Don't have an account? 
                            <span onClick={() => setIsRegister(true)}
                                className="toggle-link"> sign up</span>
                        </p>
                     </div>
                </div>
             )}

           </div>
        </section>
     )
}


 

export default LoginApp