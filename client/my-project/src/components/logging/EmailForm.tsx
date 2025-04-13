import { useEffect, useRef, useState } from "react";
import sendCodeByEmail from "../../services/sendCodeByEmail";

export default function EmailForm () {

    useEffect(() => {
        sendCodeByEmail("pitelillya288@gmail.com");
    }, [])
    
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

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
        
        if (!validateEmail(email)) {
            setError("The email is incorrect");
            focusInput();
            return;
        }
    
        setError("");
        // writeName(name);
        console.log("email is valid:", email);
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
            />
            {error && <span className="text-red-500">{error}</span>}
            <input 
                type="submit" 
                value="Next"
                className="text-white p-2 w-full bg-amber-900 rounded-md cursor-pointer hover:bg-amber-700"
                onClick={ handleSubmit }
            />
        </>
    );
}