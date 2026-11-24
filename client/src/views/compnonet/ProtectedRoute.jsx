import { useState, useEffect } from "react";
import { Navigate , Outlet } from "react-router-dom";

function ProtectedRoute() {

      const [isAuthenticated, setIsAuthenticated ]=useState(null);

      useEffect(() =>{
         
        async function chekAuthentication() {

            try{
                const response = await fetch("/api/auth/check", {
                    credentials: "include"
                });

                if(!response.ok){
                    setIsAuthenticated(false);
                    return;
                }

                const data = await response.json(false);
              
                setIsAuthenticated(data.isAuthenticated);

            }catch(error){
                console.error("Authentication check failed:", error)
                setIsAuthenticated(false);
            }
        }

        chekAuthentication();

      }, []);

      if(isAuthenticated === null){
        return <p>checking Authentication ...</p>;
      }

      return isAuthenticated 
         ? <Outlet />
         : <Navigate to="/login" replace />;

  


}

export default ProtectedRoute;

//   const isAuthenticated = Boolean (
//         localStorage.getItem("token")
//     );
    
//     return isAuthenticated
//     ? <Outlet />
//     : <Navigate to="/login" replace />;


