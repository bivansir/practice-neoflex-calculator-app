import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

type NavLink = {
    id: number
    label: string
    path: string
}

type NavigationProps = {
    isMobile: boolean
}

export const Navigation = ( { isMobile } : NavigationProps) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks: NavLink[] = [
    { id: 1, label: 'Credit card', path: '/loan' },
    { id: 2, label: 'Product', path: '/credit' },
    { id: 3, label: 'Account', path: '/account' },
    { id: 4, label: 'Resources', path: '/resources' }
  ];

    const renderNavLinks = () => (
    navLinks.map(link => (
      <li key={link.id} className="nav__item">
        <NavLink
          to={link.path}
          className={({ isActive }) => 
            `nav__link${isActive ? ' nav__link--active' : ''} text text--spaced text--comfortable`
          }>
          {link.label}
        </NavLink>
      </li>
    ))
  );

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        if (!isMobile && isMenuOpen) {
            setIsMenuOpen(false);
        }
    }, [isMobile, isMenuOpen]);
  
    return (
    <>
      {!isMobile ? (
        <nav className="nav">
          <ul className="nav__list">
            {renderNavLinks()}
          </ul>
        </nav>
      ) : (
        <>
          <button 
            className='nav__button'
            onClick={toggleMenu}
            aria-label="Меню">
            <img src='/src/assets/icons/menu.svg'/> 
          </button>

          {isMenuOpen && (
            <>
                <nav className="nav">
                  <ul className="nav__list--mobile">
                    {renderNavLinks()}
                  </ul>
                </nav>
            </>
          )}
        </>
      )}
    </>
  );
};