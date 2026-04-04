import { NavLink } from "react-router-dom";
type NavLink = {
    id: number
    label: string
    path: string
}

export const Navigation = () => {
    const navLinks: NavLink[] = [
    { id: 1, label: 'Credit card', path: '/loan' },
    { id: 2, label: 'Product', path: '/credit' },
    { id: 3, label: 'Account', path: '/account' },
    { id: 4, label: 'Resources', path: '/resources' }
  ];
  
    return (
        <nav className="nav">
            <ul className="nav__list">
            {navLinks.map(link => (
                <li key={link.id} className="nav__item">
                <NavLink
                    to={link.path}
                    className={({ isActive }) => 
                        `nav__link${isActive ? ' nav__link--active' : '' } text text--spaced text--comfortable`
                    }>
                    {link.label}
                </NavLink>
                </li>
            ))}
            </ul>
        </nav>
    )
}