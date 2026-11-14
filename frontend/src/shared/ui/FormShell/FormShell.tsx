import type { ReactNode } from "react";
import { Loader } from "../Loader/Loader";
import './form-shell.css'


interface FormShelllProps {
  isPending: boolean;
  error?: string | null;
  children: ReactNode;
}

export const FormShell = ({ isPending, error, children }: FormShelllProps) => {
  return (
    <section className="form-shell">
        <div className={isPending ? 'form-shell__content--blurred' : 'form-shell__content'}>
            {error && <h2 className="async-form-shell__error">{error}</h2>}
            {children}
        </div>
        {isPending && (
            <Loader />
        )}
    </section>
  );
}