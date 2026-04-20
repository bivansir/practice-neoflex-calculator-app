import { useFormContext, type FieldValues, type Path } from "react-hook-form";
import { InputWrapper } from "@/shared/Input/InputWrapper";
import './amount-input.css'
import { useState } from "react";


type AmountInputProps<T extends FieldValues> = {
    name: Path<T>;
    label: string;
    min: number;
    max: number;
}

export const AmountInput = <T extends FieldValues>({ name, label, min, max }: AmountInputProps<T>) => {
    const { watch, setValue } = useFormContext();
    const value = watch(name);
    const [isFocused, setIsFocused] = useState(false);
    const [localValue, setLocalValue] = useState(String(value ?? ""));

    const handleFocus = () => {
        setIsFocused(true);
        setLocalValue(String(value ?? ""));
    };

    const formatAmount = (val: number | string): string => {
        const num = Number(val);
        if (isNaN(num) || val === "") return "";
        return num.toLocaleString("ru-RU") + " ₽";
    };

    const parseAmount = (val: string): string => {
        return val.replace(/[^\d]/g, "");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const raw = parseAmount(e.target.value);
        setLocalValue(raw);
        if (raw !== "" && !isNaN(Number(raw))) {
            (setValue as any)(name, Number(raw));
        }
    };

    const handleBlur = () => {
        setIsFocused(false);
        const num = Number(localValue);
        if (isNaN(num) || localValue === "") {
            (setValue as any)(name, min, { shouldValidate: true });
        } else {
            const clamped = Math.min(max, Math.max(min, num));
            (setValue as any)(name, clamped, { shouldValidate: true });
        }
    };

    return (
        <InputWrapper required={false} label={label} name={name}>
            <input className='amount-input text text--spaced'
                type="text"
                min={min}
                max={max}
                value={isFocused ? localValue : formatAmount(value)}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}>
            </input>
        </InputWrapper>
    );
};