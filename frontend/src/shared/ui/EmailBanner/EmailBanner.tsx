import './email-banner.css'


type EmailBannerProps = {
    title: string
    instruction: string
};

export const EmailBanner = ( {title, instruction } : EmailBannerProps) => {
    return (
        <div className='email-banner'>
            <h2>{title}</h2>
            <p>{instruction}</p>
        </div>
    )
}