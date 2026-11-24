import { Outlet } from "react-router-dom";

import Header from "../views/partials/header";
import Footer from "../views/partials/footer";

function MainAuth() {
    return (
        <>
            <Header />

            <main className="main-content">
                <Outlet />
            </main>

            <Footer />
        </>
    );
}

export default MainAuth;