import { useEffect, useRef, useState } from "react";
import sendCodeByEmail from "../../services/sendCodeByEmail";
import { Step } from "../../pages/Logging";

export default function EmailForm ({ writeEmail, next }: { writeEmail: (email: string) => void; next: (next: Step) => void }) {

    // useEffect(() => {
    //     sendCodeByEmail("pitelillya288@gmail.com");
    // }, [])
    
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isPending, setIsPending] = useState(false);

    const inputEmailRef = useRef<HTMLInputElement | null>(null);
 
    function focusInput() {
        inputEmailRef.current?.focus();
    }
    
    useEffect(() => {
        focusInput();
    }, []);

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.trim());
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsPending(true);
        
        if (!validateEmail(email)) {
            setError("The email is incorrect");
            setIsPending(false);
            focusInput();
            return;
        }
    
        setError("");
        sendCodeByEmail(`${email}`).then((data) => {
            if (!data) {
                setError("Something went wrong, try again later");
                setIsPending(false);
            } else if (data.success === false) {
                setError("Failed to send code, try again later");
                setIsPending(false);
            } else {
                setError("");
                writeEmail(`${email}`);
                next("code");
                console.log("email is valid, sending to - ", email);
            }
        });
    };

    return (
        <>
            <h2 className="text-black text-center text-2xl mb-2.5 font-bold">We need your email</h2>
            <input
                required
                ref={inputEmailRef}
                id="email"
                type="text"
                placeholder="youremail@exapmle.com"
                onChange={(e) => setEmail(e.target.value)}
                className="text-black border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-amber-900 focus:border-amber-900"
                disabled={isPending}
            />
            {error && <span className="text-red-500 text-center">{error}</span>}
            <input 
                type="submit" 
                value="Next"
                className={`text-white p-2 w-full rounded-md cursor-pointer ${isPending ? "bg-amber-100 hover:bg-amber-100" : "bg-amber-900 hover:bg-amber-700"}`}
                onClick={ handleSubmit }
                disabled={isPending}
            />
        </>
    );
}