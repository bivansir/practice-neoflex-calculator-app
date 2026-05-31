import { Button } from "@/shared/ui/Button/Button"
import { useNavigate } from "react-router-dom";
import './final-message.css'
import { useApplicationStore } from "@/entities/application/store";
import { useEffect } from "react";
import offerImg from '@/assets/images/offer.png'

export const FinalMessage = () => {
    const navigate = useNavigate();

    const resetForm = useApplicationStore((s) => s.reset)
    
    useEffect(() => {
        const handler = () => {
            resetForm();
        };

        window.addEventListener('beforeunload', handler);
        return () => {
            window.removeEventListener('beforeunload', handler)
            resetForm();
        }
    }, []);
    
    return (
        <div className="final-message">
            <img className='final-message__img' src={offerImg}></img>
            <h2>Congratulations! You have completed your new credit card.</h2>
            <p>Your credit card will arrive soon. Thank you for choosing us!</p>
            <Button name='View other offers of our bank' onClick={() => navigate('/loan')} />
        </div>
    )
}