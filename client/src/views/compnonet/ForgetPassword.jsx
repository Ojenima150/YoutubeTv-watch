import React from "react";
import { Link } from "react-router-dom";

function ForgetApp(){

    return(

      <div class="Forget-container">
        <div className="card-container">
           <h2>Forgot Password?</h2>
            <p>Enter your registered email address below. We will send you a secure link to reset your password.</p>


            <form action="/Forget" method="POST">

                <div class="form-group">
                   <label for="email">Email Address</label>
                   <input type="email"  name="email" id="email"  placeholder="enter your register email" />
                </div>
            
                <button type="submit" class="btn-submit">Send Reset Link</button>
            </form>

             <div class="form-footer">
                  <p>
                    Remember your password?
                    <Link to={"/login"} > Back to Login</Link>
                  </p>
                  
             </div>
        </div>
      </div>

    )

}

export default ForgetApp;