import './button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    name?: string;
};

export const Button = ({ name, className }: ButtonProps) => {
    return (
        <button className={`button ${className || ''} text text--spaced text--tight`}>
            {name}
        </button>
    )
}