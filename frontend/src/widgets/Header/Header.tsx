import { Button } from "../../shared/ui/Button/Button";
import { Navigation } from "./Navigation";
import './Header.css';
import { useEffect, useState } from "react";

export const Header = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 850);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 850);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

    return (
        <header>
            {!isMobile ? (
                <>
                    <a className='header__logo text text--spaced text--comfortable'>NeoBank</a>
                    <Navigation isMobile={isMobile} />
                    <Button name="Online Bank" />
                </>
            ) : (
                <>
                    <div className='header__mobile-container'>
                        <a className='header__logo text text--spaced text--comfortable'>NeoBank</a>
                        <Button name="Online Bank" />
                    </div>
                    <Navigation isMobile={isMobile} />
                </>
            )}
        </header>
    )
};
