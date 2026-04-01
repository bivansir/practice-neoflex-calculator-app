import './slider-element.css'
import { useFormContext, type FieldValues, type Path } from "react-hook-form";

type SliderElementProps<T extends FieldValues> = {
    name: Path<T>
    title: string;
    min: number;
    max: number;
}

export const SliderElement = <T extends FieldValues>({ name, title, min, max} : SliderElementProps<T>) => {
    const { register, watch } = useFormContext();
    const value = watch(name);
    const percent = ((value - min) / (max - min)) * 100;

    return (
        <div className='slider'>
            <p className='slider__title'>{title}</p>
            <p className='slider__value'>{value}</p>
            <div className='slider__content'>
                <input className='slider__input' type="range"
                    id={name}
                    min={min}
                    max={max} 
                    value={value}
                    {...register(name)}
                    style={{
                        background: `linear-gradient(to right, var(--slider) 0%, var(--slider) ${percent}%, #E2E8F0 ${percent}%, #E2E8F0 100%)`,
                        appearance: 'none',
                        width: '100%',
                    }}
                     />
                <div className='slider__labels'>
                    <p className='slider_min'>{min}</p>
                    <p className='slider_max'>{max}</p>
                </div>
            </div>
        </div>

    )
}