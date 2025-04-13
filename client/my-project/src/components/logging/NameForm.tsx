import { useEffect, useRef, useState } from "react";
import { Step } from "../../pages/Logging";

export default function NameForm({ writeName, next }: { writeName: (name: string) => void; next: (next: Step) => void }) {
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const inputNameRef = useRef<HTMLInputElement | null>(null);

    function focusInput() {
        inputNameRef.current?.focus();
    }
    
    useEffect(() => {
        focusInput();
    }, []);

    const validateName = (name: string): boolean => {
        const nameRegex = /^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐ\s'-]{2,}$/u;
        return nameRegex.test(name.trim());
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateName(name)) {
            setError("The name must not contain numbers or special characters.");
            focusInput();
            return;
        }
    
        setError("");
        writeName(name);
        next("email");
        console.log("name is valid:", name);
    };
    
    return (
        <>
            <h2 className="text-black text-center text-2xl mb-2.5 font-bold">What is your name?</h2>
            <input
                required
                ref={inputNameRef}
                id="name"
                type="text"
                placeholder="name..."
                onChange={(e) => setName(e.target.value)}
                className="text-black border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-amber-900 focus:border-amber-900"
            />
            {error && <span className="text-red-500 text-center">{error}</span>}
            <input 
                type="submit" 
                value="Next"
                className="text-white p-2 w-full bg-amber-900 rounded-md cursor-pointer hover:bg-amber-700"
                onClick={ handleSubmit }
            />
        </>
    );
}