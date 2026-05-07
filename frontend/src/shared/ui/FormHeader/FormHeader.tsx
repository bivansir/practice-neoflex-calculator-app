import './form-header.css'

type FormHeaderProps = {
    title: string,
    step: number
}

export const FormHeader = ( {title, step }:FormHeaderProps) => {
    return (
        <div className='form-header'>
            <h2>{title}</h2>
            <p>Step {step} of 5</p>
        </div>
    )
}