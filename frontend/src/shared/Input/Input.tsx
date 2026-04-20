import { InputWrapper } from "./InputWrapper.tsx"
import { useFormContext, type FieldValues, type Path } from "react-hook-form";

enum InputType {
    TEXT,
    DATE
}

type InputProps<T extends FieldValues> = {
    name: Path<T>;
    label: string;
    placeholder: string;
    isRequired: boolean;
    min?: number;
    max?: number;
    validate?: (value: string) => string | true;
}

type BaseInputProps<T extends FieldValues> = InputProps<T> & {
    type: InputType;
    pattern?: RegExp;
}

const BaseInput = <T extends FieldValues>( {name, label, placeholder, isRequired, min, max, validate, type, pattern}: BaseInputProps<T>) => {
    const { register, formState: { errors, touchedFields } } = useFormContext();

    const hasError = !!errors[name];
    const isTouched = touchedFields[name];

    const registration = register(name, {
        required: isRequired ? `${label} is required` : false,
        pattern: pattern ? { value: pattern, message: "Invalid format" } : undefined,
        maxLength: max ? { value: max, message: `Maximum ${max} characters` } : undefined,
        minLength: min ? { value: min, message: `Minimum ${min} characters` } : undefined,
        validate: validate ? (value) => validate(value) : undefined,
    });
    
    return (
        <InputWrapper required={isRequired} label={label} name={name}>
            <div className='input__field-wrapper'>
                <input className={`input__field text${
                    isTouched && hasError ? ' input__field--error' :
                    isTouched && !hasError ? ' input__field--valid' : ''
                }`}
                    id={name}
                    placeholder={placeholder}
                    type={type === InputType.TEXT ? "text" : "date"}
                    {...registration}
                />
                <img className='input__field-icon'
                src={`/src/assets/icons/${hasError ? 'error.svg' : 'valid.svg'}`}></img>
            </div>
        </InputWrapper>
    );
}

export const TextInput = <T extends FieldValues>(props: InputProps<T>) => {
    return (
        <BaseInput {...props}
        pattern={/^[A-Za-zА-Яа-яЁё\s]+$/}
        type={InputType.TEXT} />    
    )
}

export const NumericInput = <T extends FieldValues>(props: InputProps<T>) => {

    return (
        <BaseInput {...props}
        pattern={/^\d+$/}
        type={InputType.TEXT}/>      
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