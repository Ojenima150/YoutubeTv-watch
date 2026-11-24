import { Routes, Route } from "react-router-dom";

import MainLayout from "./Layouts/MainLayout";
import Home from "./views/home";

// import Auth from "./Layouts/Authlayout";
import Auth from "./Layouts/Auth";
import ProtectedRoute from "./views/compnonet/ProtectedRoute";


//======= Import your other pages here
import LoginApp from "./views/compnonet/Login";
import ForgetApp from "./views/compnonet/ForgetPassword";
import DashApp from "./views/Dashboard/Dashboard";


function App() {

    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                {/* Add more routes for other pages here */}
            </Route>

            <Route element={<Auth />}>
                <Route path="/login" element={<LoginApp />} />
                <Route path="/ForgetPassword" element={<ForgetApp />}/>
            </Route>

             
            <Route element={<ProtectedRoute />} >
               <Route path="/DashApp" element={<DashApp />} />
            </Route>
        </Routes>
    );
}

export default App;