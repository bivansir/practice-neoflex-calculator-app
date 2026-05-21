import './checkbox.css'


type CheckboxProps = {
    name: string
    label: string
    onCheck: () => void
}

export const Checkbox = ( { name, label, onCheck }: CheckboxProps) => {
    return (
        <div className='checkbox'>
            <input
            id={name}
            type='checkbox'
            onChange={() => onCheck()}/>
            <label htmlFor={name}>
                {label}
            </label>
        </div>
    )
}