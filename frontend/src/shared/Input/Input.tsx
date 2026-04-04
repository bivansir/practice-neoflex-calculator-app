import { InputWrapper } from "./InputWrapper.tsx"
import { useFormContext, type FieldValues, type Path } from "react-hook-form";

const InputType = {
    TEXT: 'text',
    DATE: 'date'
} as const;
type InputType = typeof InputType[keyof typeof InputType];

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
    type: InputType;
}

const BaseInput = <T extends FieldValues>( {name, label, placeholder, isRequired, min, max, validate, pattern, type }: BaseInputProps<T>) => {
    const { register } = useFormContext();
    
    return (
        <InputWrapper required={isRequired} label={label} name={name}>
        {type === InputType.TEXT ? (
            <input 
                className="input__field text"
                id={name}
                placeholder={placeholder}
                type={InputType.TEXT}
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
                className="input__field text"
                id={name}
                placeholder={placeholder}
                type={InputType.DATE}
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
        type={InputType.TEXT} />    
    )
}

export const NumericInput = <T extends FieldValues>(props: InputProps<T>) => {
    return (
        <BaseInput {...props}
        pattern={/^\d+$/}
        type={InputType.TEXT} />    
    )
}

export const EmailInput = <T extends FieldValues>(props: InputProps<T>) => {
    return (
        <BaseInput {...props}
        pattern={/^\S+@\S+$/i}
        type={InputType.TEXT} />    
    )
}

export const DateInput = <T extends FieldValues>(props: InputProps<T>) => {
    return (
        <BaseInput {...props}
        type={InputType.DATE} />    
    )
}