import { Link } from "react-router-dom";

import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";

export const Notfound = () => {
    return (
        <>
        <Navbar />
        <main className="home-container">
            <Sidebar />
            <div className="home-box">
                <h1>Not Found</h1>
                <Link to="/">Back to home</Link>
            </div>
        </main>
        </>
    );
};