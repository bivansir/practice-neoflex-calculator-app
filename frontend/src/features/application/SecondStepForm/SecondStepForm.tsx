import { Button } from "@/shared/ui/Button/Button";
import { DateInput, NumericInput } from "@/shared/ui/Input/Input";
import { SelectInput } from "@/shared/ui/Input/SelectInput"
import { validateLength } from "@/shared/ui/Input/validators";
import { useCallback, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import './second-step-form.css'

const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' }
];

const maritalOptions = [
    { value: 'married', label: 'Married' },
    { value: 'single', label: 'Single' },
    { value: 'divorced', label: 'Divorced' },
    { value: 'widowed', label: 'Widowed' }
];

const dependentsOptions = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 4, label: '5' }
];

const employmentOptions = [
    { value: 'fullTime', label: 'Full-time employed' },
    { value: 'self', label: 'Self-employed' },
    { value: 'none', label: 'Non-employed' },
    { value: 'pensioner', label: 'Pensioner' },
    { value: 'student', label: 'Student' }
];

export const SecondStepForm = () => {
    const { watch } = useFormContext();
    const employmentStatus = watch('employmentStatus');

    const getPositionOptions = useCallback((status: string) => {
        switch (status) {
            case 'fullTime': return [
                { value: 'specialist', label: 'Specialist' },
                { value: 'manager', label: 'Manager' },
                { value: 'engineer', label: 'Engineer' },
                { value: 'worker', label: 'Worker' }
            ];
            case 'self': return [
                { value: 'freelancer', label: 'Freelancer' },
                { value: 'selfEmployed', label: 'Self-employed' },
                { value: 'businessOwner', label: 'Business owner' }
            ];
            case 'none': return [
                { value: 'none', label: 'Non-employed' },
            ];
            case 'pensioner': return [
                { value: 'pensioner', label: 'Pensioner' },
            ];
            case 'student': return [
                { value: 'student', label: 'Student' },
            ];
            default: return [];
        }
    }, []);

    const positionOptions = useMemo(() => getPositionOptions(employmentStatus), [employmentStatus]);

    return (
            <form className='second-step-form'>
                <div className='second-step-form__header'>
                    <h2>Continuation of application</h2>
                    <p>Step 2 of 5</p>
                </div>

                <div className='second-step-form__block'>
                    <SelectInput
                        name='gender'
                        label="What's your gender"
                        isRequired={true}
                        options={genderOptions}/>
                    <SelectInput
                        name='gender'
                        label="Your marital status"
                        isRequired={true}
                        options={maritalOptions}/>
                    <SelectInput
                        name='gender'
                        label="Your number of dependents"
                        isRequired={true}
                        options={dependentsOptions}/>
                    <DateInput
                        name='passportIssueDate'
                        label='Date of issue of the passport'
                        placeholder="Select Date and Time"
                        isRequired={true} />
                    <NumericInput
                        name='divisionCode'
                        label='Division code'
                        placeholder='000000'
                        isRequired={true}
                        validate={validateLength(6)} />
                </div>

                <h3>Employment</h3>

                <div>
                    <SelectInput
                        name='employmentStatus'
                        label="Your employment status"
                        isRequired={true}
                        options={employmentOptions}/>
                    <NumericInput
                        name='iNN'
                        label='Your employer INN'
                        placeholder='000000000000'
                        isRequired={true}
                        validate={validateLength(12)} />
                    <NumericInput
                        name='salary'
                        label='Your salary'
                        placeholder='For example 100 000'
                        isRequired={true}
                        min={0}
                        max={1000000}/>
                    <SelectInput
                        name='position'
                        label="Your position"
                        isRequired={true}
                        isDisabled={!employmentStatus}
                        placeholder={employmentStatus ? '': 'Select position first' }
                        options={positionOptions}/>
                    <NumericInput
                        name='workExperienceTotal'
                        label='Your work experience total (months)'
                        placeholder='For example 10'
                        isRequired={true}
                        min={0}
                        max={600}/>
                    <NumericInput
                        name='workExperienceCurrent'
                        label='Your work experience current (months)'
                        placeholder='For example 2'
                        isRequired={true}
                        min={0}
                        max={600}/>
                </div>

                <Button />
            </form>
    )
}