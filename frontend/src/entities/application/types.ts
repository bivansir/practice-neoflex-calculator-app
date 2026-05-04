export type FirstStepForm = {
    firstName: string;
    lastName: string;
    patronymic?: string
    term: number;
    amount: number;
    email: string;
    birthdate: Date;
    passportSeries: string;
    passportNumber: string;
}

export type SecondStepForm = {
    firstName: string;
    lastName: string;
    patronymic?: string
    term: number;
    amount: number;
    email: string;
    birthdate: Date;
    passportSeries: string;
    passportNumber: string;
}

export const STEP_ORDER= [
    'firstStep',
    'secondStep',
    'thirdStep',
    'fourthStep',
    'fifthStep',
    'done',
]

export type FlowStep = typeof STEP_ORDER[number];
