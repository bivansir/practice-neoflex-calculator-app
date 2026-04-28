import { useFormContext, type FieldValues, type Path } from "react-hook-form";
import { InputWrapper } from "./InputWrapper.tsx"

type SelectInputProps<T extends FieldValues> = {
    name: Path<T>;
    label: string;
    defaultValue: number;
    options: { value: number; label: string }[];
}

export const SelectInput = <T extends FieldValues>({ name, label, defaultValue, options }: SelectInputProps<T>) => {
    const { register } = useFormContext();

    return (
        <InputWrapper required={true} label={label} name={name}>
            <select
                className="input__field"
                id={name}
                defaultValue={defaultValue}
                {...register(name)}>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </InputWrapper>
    )
}