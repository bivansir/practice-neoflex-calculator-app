import { useFormContext, type FieldValues, type Path, get } from "react-hook-form";
import './input.css'

type InputWrapperProps<T extends FieldValues> = {
    label: string;
    required: boolean;
    error?: string;
    children: React.ReactNode;
    name: Path<T>;
    
}

export const InputWrapper = <T extends FieldValues>({ label, required, children, name }: InputWrapperProps<T>) => {
    const { formState: { errors } } = useFormContext();
    const error = get(errors, name)?.message as string;
    
    return (
        <div className={`input${required ? ' input--required' : ''}`}>
            <label className="input__label text" htmlFor={name}>
                {label}
            </label>
            {children}
            {error && <div className="input__error text">{error}</div>}
        </div>
    )
}
