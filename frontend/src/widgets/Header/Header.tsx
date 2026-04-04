import { Button } from "../../shared/Button/Button";
import { Navigation } from "./Navigation";
import './Header.css';

export const Header = () => {
    return (
        <header>
            <a className='header__logo text text--spaced text--comfortable'>NeoBank</a>
            <Navigation />
            <Button name="Online Bank" />
        </header>
    )
};
