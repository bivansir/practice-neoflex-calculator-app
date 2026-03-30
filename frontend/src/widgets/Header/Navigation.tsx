import { NavLink } from "react-router-dom";


export const Navigation = () => {
    const navLinks = [
    { id: 'loan', label: 'Credit card', path: '/loan' },
    { id: 'credit', label: 'Product', path: '/credit' },
    { id: 'account', label: 'Account', path: '/account' },
    { id: 'resources', label: 'Resources', path: '/resources' }
  ];
    return (
        <nav className="nav">
            <ul className="nav__list">
            {navLinks.map(link => (
                <li key={link.id} className="nav__item">
                <NavLink
                    to={link.path}
                    className={({ isActive }) => 
                        `nav__link${isActive ? ' nav__link--active' : ''}`
                    }
                >
                    {link.label}
                </NavLink>
                </li>
            ))}
            </ul>
        </nav>
    )
}