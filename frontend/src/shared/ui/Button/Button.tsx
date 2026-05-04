import './button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    name?: string;
};

export const Button = ({ name, className, ...props}: ButtonProps) => {
    return (
        <button 
        className={`button ${className || ''} text text--spaced text--tight`}
        {...props}>
            {name}
        </button>
    )
}