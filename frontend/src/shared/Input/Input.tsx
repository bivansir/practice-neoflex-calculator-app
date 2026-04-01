import { InputWrapper } from "./InputWrapper.tsx"
import { useFormContext, type FieldValues, type Path } from "react-hook-form";

const Type = {
    TEXT: 'text',
    DATE: 'date'
} as const;
type Type = typeof Type[keyof typeof Type];

type InputProps<T extends FieldValues> = {
    name: Path<T>;
    label: string;
    placeholder: string;
    isRequired: boolean;
    min?: number;
    max?: number;
    validate?: (value: string) => boolean;
}

type BaseInputProps<T extends FieldValues> = InputProps<T> & {
    pattern?: RegExp;
    type: Type;
}

const BaseInput = <T extends FieldValues>( {name, label, placeholder, isRequired, min, max, validate, pattern, type }: BaseInputProps<T>) => {
    const { register } = useFormContext();
    
    return (
        <InputWrapper required={isRequired} label={label} name={name}>
        {type === Type.TEXT ? (
            <input 
                className="input__field"
                id={name}
                placeholder={placeholder}
                type={Type.TEXT}
                {...register(name, { 
                    required: isRequired,
                    pattern: pattern,
                    maxLength: max || undefined,
                    minLength: min || undefined,
                    validate: validate ? (value) => validate(value) : undefined
                })}
            />
        ) : (
            <input 
                className="input__field"
                id={name}
                placeholder={placeholder}
                type={Type.DATE}
                {...register(name, { 
                    required: isRequired,
                    validate: validate ? (value) => validate(value) : undefined
                })}
            />
        )}
    </InputWrapper>
    )
}

export const TextInput = <T extends FieldValues>(props: InputProps<T>) => {
    return (
        <BaseInput {...props}
        pattern={/^[A-Za-z\s]+$/}
        type={Type.TEXT} />    
    )
}

export const NumericInput = <T extends FieldValues>(props: InputProps<T>) => {
    return (
        <BaseInput {...props}
        pattern={/^\d+$/}
        type={Type.TEXT} />    
    )
}

export const EmailInput = <T extends FieldValues>(props: InputProps<T>) => {
    return (
        <BaseInput {...props}
        pattern={/^\S+@\S+$/i}
        type={Type.TEXT} />    
    )
}

export const DateInput = <T extends FieldValues>(props: InputProps<T>) => {
    return (
        <BaseInput {...props}
        type={Type.DATE} />    
    )
}