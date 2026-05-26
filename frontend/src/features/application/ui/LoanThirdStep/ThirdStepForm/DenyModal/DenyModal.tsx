import { Button } from '@/shared/ui/Button/Button'
import './DenyModal.css'
    
type DenyModalProps = {
    deny: boolean,
    onDeny: () => void,
    onClose: () => void
}


export const DenyModal = ({ deny, onDeny, onClose }:DenyModalProps) => {
    return (
        <div className='deny-modal'>
            <div className='deny-modal__content surface--card'>
                <h4 className='deny-modal__title text--spaced text--comfortable'>Deny application</h4>
                {!deny ? (
                    <>
                        <p className='deny-modal__msg text--spaced text--comfortable'>You exactly sure, you want to cancel this application?</p>
                        <div className='deny-modal__buttons'>
                            <Button name='Deny' className='button--deny' type='button' onClick={onDeny} />
                            <Button name='Cancel' type='button' onClick={onClose} />
                        </div>
                    </>
                ) : (
                    <>
                        <p className='deny-modal__msg text--spaced text--comfortable'>Your application has been deny!</p>
                        <div className='deny-modal__buttons'>
                            <Button name='Go home' type='button' />
                        </div>
                    </>
                    
                )}
                <button className='deny-modal__close' type='button' onClick={onClose}>
                    <img src='/src/assets/icons/close.svg' aria-label='Close modal' />
                </button>
            </div>
        </div>
    )
}