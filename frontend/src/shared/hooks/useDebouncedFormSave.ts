import { useEffect } from 'react';
import type { UseFormWatch, FieldValues } from 'react-hook-form';

export function useDebouncedFormSave<T extends FieldValues>(
    watch: UseFormWatch<T>,
    onSave: (data: T) => void,
    delay = 500,
    ) {
    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        
        const subscription = watch((data) => {
        clearTimeout(timer);
        timer = setTimeout(() => onSave(data as T), delay);
        });
        
        return () => {
        clearTimeout(timer);
        subscription.unsubscribe();
        };
    }, [watch, onSave, delay]);
    }