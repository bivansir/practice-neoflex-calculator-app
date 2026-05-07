import { useFormContext, type FieldValues, type Path } from "react-hook-form";
import { InputWrapper } from "./InputWrapper.tsx"

type SelectInputProps<T extends FieldValues> = {
    name: Path<T>
    label: string
    isRequired: boolean
    defaultValue?: number | string
    options: { value: number | string; label: string }[]
    isDisabled?: boolean
    placeholder?: string
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void
};

export const SelectInput = <T extends FieldValues>( 
    { name, label, isRequired, defaultValue, options, isDisabled, placeholder }
    : SelectInputProps<T>) => {
    const { register } = useFormContext();

    const registration = register(name, {
        required: isRequired ? 'Select one of the options' : false
    })

    return (
        <InputWrapper required={isRequired} label={label} name={name}>
            <select
                className="input__field"
                id={name}
                defaultValue={defaultValue ?? (placeholder ? "" : undefined)}
                disabled={isDisabled}
                {...registration}>

                {placeholder && (
                    <option value='' disabled hidden>
                        {placeholder}
                    </option>
                )}
                
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </InputWrapper>
    )
}