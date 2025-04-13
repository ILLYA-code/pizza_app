import { useEffect, useState } from "react";
import NameForm from "../components/logging/NameForm";
import HaveAccSwitch from "../components/logging/HaveAccSwitch";
import EmailForm from "../components/logging/EmailForm";

export type Step = "name" | "email" | "password" | "final";

export default function Logging () {
    const [userData, setUserData] = useState({name: "", email: "", password: ""});
    const [haveAcc, setHaveAcc] = useState(false);
    const [currentStep, setCurrentStep] = useState<Step>("name");
    const [successStep, setSuccessStep] = useState(false);

    // useEffect(() => {
    //     setTimeout(() => {
    //         setSuccessStep(!successStep);
    //     }, 1000);
    // }, [successStep]);

    function handleNextStep (next: Step) {
        setCurrentStep(next);
        setSuccessStep(true);
        setTimeout(() => {
            setSuccessStep(false);
        }, 400);
    }

    function writeName (name: string) {
        setUserData({...userData, name: name});
    }

    useEffect(() => {
        console.log(userData);
    }, [userData]);
    
    return (
        <div 
            className="w-screen h-screen bg-cover bg-center flex justify-center items-center" 
            style={{
                backgroundImage: "url('/images/pizza_neutral_bg_form.jpg')"
        }}>
            <div className={`${successStep ? 'bg-emerald-50' : 'bg-amber-50'} p-8 rounded-3xl  border-4 border-amber-800 shadow-2xl w-[35vw] max-w-[700px] flex flex-col gap-8 transition-colors duration-300`}>
                <form className="flex flex-col gap-4 max-w-[380px]">
                    { currentStep === "name" && (
                        <NameForm writeName={writeName} next={handleNextStep} />
                    ) }
                    { currentStep === "email" && (
                        <EmailForm />
                    )}
                </form>
                <HaveAccSwitch haveAcc={haveAcc} toggleHaveAcc={() => setHaveAcc(!haveAcc)} />
            </div>
        </div>
    )
}