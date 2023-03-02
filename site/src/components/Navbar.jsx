import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/icons/logo.svg";
import { ReactComponent as UserLogo } from "../assets/icons/user.svg";
import { ReactComponent as SearchLogo } from "../assets/icons/search.svg";

export const Navbar = () => {
    return (
        <nav className="navbar-top">
            <ul>
                <li>
                    <Link to="/"><Logo /></Link>
                </li>
                <li>
                    <Link to="/directory/following">Suivis</Link>
                </li>
                <li>
                    <Link to="/directory">Parcourir</Link>
                </li>
            </ul>
            <ul>
                <li>
                    <input type="search" name="Rechercher" id="search" placeholder="Rechercher" />
                    <label htmlFor="search"><SearchLogo /></label>
                </li>
            </ul>
            <ul>
                <li>
                    <button className="login">Se connecter</button>
                </li>
                <li>
                    <button className="signup">S'inscrire</button>
                </li>
                <li>
                    <button className="profil-not-log"><UserLogo /></button>
                </li>
            </ul>
        </nav>
    );
};
