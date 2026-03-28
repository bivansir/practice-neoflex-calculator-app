import { Button } from "../../shared/Button";
import { Logo } from "./Logo";
import { Navigation } from "./Navigation";
import './Header.css';

export const Header = () => {
    return (
        <header className="header">
            <Logo />
            <Navigation />
            <Button />
        </header>
    )
};
