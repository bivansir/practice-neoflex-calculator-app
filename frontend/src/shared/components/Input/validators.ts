export function validateAge (birthDate: string): string | true {
    const age = getAge(new Date(birthDate));

    if (age <= 18) return 'Age must be over 18';
    else if (age >= 70) return 'Age must be under 70';
    return true;
}

export const validateLength = (limit: number) => (value: string) => {
    if (value.length !== limit) return `Must be ${limit} characters`;
    return true;
}

function getAge(birthDate: Date): number {
    const now = new Date();

    let age = now.getFullYear() - birthDate.getFullYear();

    if (now.getMonth() < birthDate.getMonth() ||
        (now.getMonth() === birthDate.getMonth() &&
        now.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}