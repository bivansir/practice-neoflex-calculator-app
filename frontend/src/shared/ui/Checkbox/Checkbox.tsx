import './checbox.css'


type CheckboxProps = {
    name: string
    label: string
}

export const Checkbox = ( { name, label }: CheckboxProps) => {
    return (
        <div className='checkbox'>
            <input
            id={name}
            type='checkbox'/>
            <label htmlFor={name}>
                {label}
            </label>
        </div>
    )
}