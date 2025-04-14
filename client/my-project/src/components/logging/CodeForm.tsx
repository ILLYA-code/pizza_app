import { useEffect, useRef, useState } from "react";
import { VerifyingCodePossibleResults } from "../../pages/Logging";

export default function CodeForm({ verifyCode, email, verifyingCodeResult }: { verifyCode: (code: string) => void; email: string; verifyingCodeResult: VerifyingCodePossibleResults}) {

    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [isPending, setIsPending] = useState(false);
    
    const inputCodeRef = useRef<HTMLInputElement>(null);

    const handleVerify = () => {
        if (code.length !== 5) {
            setError("Code must be 5 digits");
            return;
        }

        console.log("Verifying code:", code);
        setError("");
        setIsPending(true);
        verifyCode(code.toString());
    };

    useEffect(() => {
        if (code.length === 5) {
            handleVerify();
        }
    }, [code]);

    useEffect(() => {
        if (verifyingCodeResult === "empty") {
            setError("");
        } else if (verifyingCodeResult === "invalidCode") {
            setError("Invalid code");
            setIsPending(false);
        } else {
            setError("Something went wrong. Try again later");
            setIsPending(false);
        }
    }, [verifyingCodeResult])

    function focusInput() {
        inputCodeRef.current?.focus();
    }
    
    useEffect(() => {
        focusInput();
    }, []);
    
    return (
        <>
            <h2 className="text-black text-center text-2xl mb-2.5 font-bold">Enter the 5-digit code</h2>
            <p className="text-gray-600 text-center text-sm mb-4">
                We’ve sent a verification code to <span className="font-medium">{email}</span>
            </p>

            <input
                required
                ref={inputCodeRef}
                id="verification-code"
                type="text"
                maxLength={5}
                placeholder="12345"
                value={code}
                onChange={(e) => {
                    const onlyDigits = e.target.value.replace(/\D/g, '');
                    setCode(onlyDigits);
                }}
                className="text-black border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-amber-900 focus:border-amber-900 text-center tracking-widest"
                disabled={isPending}
            />
            {error && <span className="text-red-500 text-center">{error}</span>}
        </>
    )
}