import { Button } from '@/shared/ui/Button/Button'
import styles from './DenyModal.module.css'
import { useState } from 'react'


export const DenyModal = () => {
    const [deny, setDeny] = useState<boolean>(false)
    return (
        <div className=''>
            <h4>Deny application</h4>
            {deny ? (
                <>
                    <p>You exactly sure, you want to cancel this application?</p>
                    <div className=''>
                        <Button />
                        <Button />
                    </div>
                    <Button />
                </>
            ) : (
                <>
                    <p>Your application has been deny!</p>
                    <Button />
                </>
            )}
        </div>
    )
}