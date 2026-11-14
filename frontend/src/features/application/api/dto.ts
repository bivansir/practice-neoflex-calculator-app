export interface LoanOfferDTO {
    statementID: string;
    requestedAmount: number;
    totalAmount: number;
    term: number;
    monthlyPayment: number;
    rate: number;
    isInsuranceEnabled: boolean;
    isSalaryClient: boolean;
}

export interface LoanStatementRequestDTO {
    amount: number;
    term: number;
    firstName: string;
    lastName: string;
    middleName?: string;
    email: string;
    birthdate: Date;
    passportSeries: string;
    passportNumber: string;
}

export interface DossierDTO {
    gender: string;
    maritalStatus: string;
    dependentsNumber: number;
    passportIssueDate: Date;
    divisionCode: number;
    employmentStatus: string;
    iNN: number;
    salary: number;
    position: string;
    workExperienceTotal: number;
    workExperienceCurrent: number
}