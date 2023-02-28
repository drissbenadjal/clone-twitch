import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="navbar-top">
            <ul>
                <li>
                    <Link to="/"><img src="" alt="logo" /></Link>
                </li>
                <li>
                    <Link to="/categories">Parcourir</Link>
                </li>
            </ul>
            <ul>
                <li>
                    <input type="search" name="Rechercher" id="search" />
                </li>
            </ul>
            <ul>
                <li>
                    <Link to="/auth/signup">S'inscrire</Link>
                </li>
                <li>
                    <Link to="/auth/login">Se connecter</Link>
                </li>
            </ul>
        </nav>
    );
};
