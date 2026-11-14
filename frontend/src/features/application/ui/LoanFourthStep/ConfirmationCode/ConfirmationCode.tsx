import {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  FocusEvent,
} from "react";
import "./confirmation-code.css";
 
const CODE_LENGTH = 4;
type Status = "idle" | "invalid" | "valid";

type ConfirmationCodeProps = {
    onVerify: () => void;
}
 
export const ConfirmationCode = ({ onVerify }: ConfirmationCodeProps) => {
    const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(""));
    const [status, setStatus] = useState<Status>("idle");
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
    
    useEffect(() => {
        inputsRef.current[0]?.focus();
    }, []);
    
    const setDigitAt = (index: number, value: string) => {
        setDigits((prev) => {
        const next = [...prev];
        next[index] = value;
        return next;
        });
    };
    
    const checkCode = (code: string) => {
        setStatus(code === '1234' ? "valid" : "invalid");
    };
    
    const handleChange = (index: number, rawValue: string) => {
        const value = rawValue.replace(/\D/g, "");
        
        if (!value) {
            setDigitAt(index, "");
            if (status === "invalid") setStatus("idle");
            return;
        }
    
        setDigits((prev) => {
            const next = [...prev];
            next[index] = value;
    
            if (index < CODE_LENGTH - 1) {
                inputsRef.current[index + 1]?.focus();
            }
    
            if (next.every((d) => d !== "")) {
                checkCode(next.join(""));
            }

            return next;
        });
        
        if (status === "invalid") setStatus("idle");
    };
    
    const handleKeyDown = (
        index: number,
        e: KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Backspace") {
            if (digits[index]) {
                setDigitAt(index, "");
                if (status === "invalid") setStatus("idle");
            } else if (index > 0) {
                inputsRef.current[index - 1]?.focus();
                setDigitAt(index - 1, "");
            }

            e.preventDefault();

            return;
        }

        if (e.key === "ArrowLeft" && index > 0) {
            inputsRef.current[index - 1]?.focus();
            e.preventDefault();
        }

        if (e.key === "ArrowRight" && index < CODE_LENGTH - 1) {
            inputsRef.current[index + 1]?.focus();
            e.preventDefault();
        }
    };
    
    const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
        e.target.select();
    };
    
    useEffect(() => {
        if (status === "invalid") {
            const t = setTimeout(() => {
                setDigits(Array(CODE_LENGTH).fill(""));
                inputsRef.current[0]?.focus();
            }, 200);

        return () => clearTimeout(t);
        }

        if (status === "valid") {
            inputsRef.current[CODE_LENGTH - 1]?.blur();

            const t = setTimeout(() => {
                setDigits(Array(CODE_LENGTH).fill(""));
                inputsRef.current[0]?.focus();
                onVerify();
            }, 800);

        return () => clearTimeout(t);

            
        }
    }, [status]);
    
    
    const getInputModifier = (filled: boolean): string => {
        if (status === "invalid") return "confirmation-code__input--invalid";
        if (status === "valid") return "confirmation-code__input--valid";
        if (filled) return "confirmation-code__input--filled";
        return "";
    };
 
  return (
            <div className="confirmation-code__container">
                <div
                className={`confirmation-code__inputs ${
                  status === 'invalid' ? "confirmation-code__inputs--shake" : ""
                }`}
                >
                {digits.map((digit, i) => (
                    <input
                    key={i}
                    ref={(el) => {
                        inputsRef.current[i] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={1}
                    value={digit}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleChange(i, e.target.value)
                    }
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    onFocus={handleFocus}
                    className={`confirmation-code__input ${getInputModifier(
                        digit !== ""
                    )}`}
                    />
                ))}
                </div>
        
                <div className="confirmation-code__message">
                {status === 'invalid' && (
                    <p className="confirmation-code__message-text confirmation-code__message-text--error">
                    Invalid confirmation code
                    </p>
                )}
                </div>
            </div>
  );
}