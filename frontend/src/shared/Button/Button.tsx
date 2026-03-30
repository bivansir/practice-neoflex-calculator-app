import './button.css';

type ButtonProps = {
    name?: string;
};

export const Button = ({ name }: ButtonProps) => {

    return (
        <button className="button">
            {name}
        </button>
    )
}