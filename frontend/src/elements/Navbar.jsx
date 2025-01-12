import { Link } from "react-router-dom";
import { NAME_OF_THE_APP } from "../utils/constants";
import Logo from "../images/Logo.jpeg";
import SearchComponent from "../elements/SearchComponent";
import "../css/navbar.css";
import "../css/fonts.css";

function Navbar() {
  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary'>
      <div className='container-fluid'>
        <a href='/'>
          <img className='logo-image' src={Logo} alt='Logo' />
        </a>

        <a className='navbar-brand' href='/'>
          {NAME_OF_THE_APP}
        </a>

        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link
                to='/'
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}>
                Discover
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                to='/favorites'
                className={`nav-link ${
                  location.pathname === "/favorites" ? "active" : ""
                }`}>
                Favorites
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                to='/watched'
                className={`nav-link ${
                  location.pathname === "/watched" ? "active" : ""
                }`}>
                Watched
              </Link>
            </li>

            <li className='nav-item'>
              <Link
                to='/watchlist'
                className={`nav-link ${
                  location.pathname === "/watchlist" ? "active" : ""
                }`}>
                Watchlist
              </Link>
            </li>
          </ul>
          <SearchComponent />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
