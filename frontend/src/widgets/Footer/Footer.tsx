import { BorderStyle, Divider, Orientation } from '@/shared/ui/Divider/Divider';
import './footer.css'
import type { NavLink } from "@/shared/Types"
import neoflexLogoImg from '@/assets/images/neoflex-logo.png'

const navLinks: NavLink[] = [
    { id: 1, label: 'About bank', path: '/placeholder' },
    { id: 2, label: 'Ask a question', path: '/placeholder' },
    { id: 3, label: 'Quality of service', path: '/placeholder' },
    { id: 4, label: 'Requisites', path: '/placeholder' },
    { id: 5, label: 'Press center', path: '/placeholder' },
    { id: 6, label: 'Bank career', path: '/placeholder' },
    { id: 7, label: 'Investors', path: '/placeholder' },
    { id: 8, label: 'Analytics', path: '/placeholder' },
    { id: 9, label: 'Business and processes', path: '/placeholder' },
    { id: 10, label: 'Compliance and business ethics', path: '/placeholder' }
  ];

export const Footer = () => {


    return (
        <footer>
            <div className='footer__company-info'>
                <div className='footer__image-container'>
                    <img className='footer__image'
                        src={neoflexLogoImg} alt='neoflex-logo'/>
                </div>
                <div className='footer__company-contacts text--style2'>
                    <p className='footer__company-number text text--comfortable'>+7 (495) 984 25 13</p>
                    <p className='footer__company-email text text--spaced text--comfortable'>info@neoflex.ru</p>
                </div>
            </div>
            <nav className='footer__nav'>
                <ul className='footer__links'>
                    {navLinks.map(item => (
                        <li key={item.id}>
                            <a className='footer__link text text--comfortable text--spaced' href={item.path}>{item.label}</a>
                        </li>
                    ))}

                </ul>
            </nav>
            <Divider orientation={Orientation.Horizontal} borderStyle={BorderStyle.Solid} color='white' ></Divider>
            <p className='footer__policy text text--comfortable text--spaced'>We use cookies to personalize our services and improve the user experience of our website.
                Cookies are small files containing information about previous visits to a website. 
                If you do not want to use cookies, please change your browser settings</p>
        </footer>


    )
};