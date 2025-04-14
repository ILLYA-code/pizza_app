import { useEffect, useState } from "react";
import NameForm from "../components/logging/NameForm";
import HaveAccSwitch from "../components/logging/HaveAccSwitch";
import EmailForm from "../components/logging/EmailForm";
import CodeForm from "../components/logging/CodeForm";
import verifyCodeByEmail from "../services/verifyCodeByEmail";

export type Step = "name" | "email" | "code" | "password" | "final";
export type VerifyingCodePossibleResults = "empty" | "invalidCode" | "serverError";

export default function Logging () {
    const [userData, setUserData] = useState({name: "", email: "", password: ""});
    const [haveAcc, setHaveAcc] = useState(false);
    const [currentStep, setCurrentStep] = useState<Step>("name");
    const [successStep, setSuccessStep] = useState(false);
    const [verifyingCodeResult, setVerifyingCodeResult] = useState<VerifyingCodePossibleResults>("empty");

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

    function writeEmail (email: string) {
        setUserData({...userData, email: email});
    }

    function verifyCode(code: string) {
        verifyCodeByEmail(userData.email, code).then((data) => {
            if (!data) {
                setVerifyingCodeResult("serverError");
            } else if (data.valid === false) {
                setVerifyingCodeResult("invalidCode");
            } else if (data.valid) {
                setVerifyingCodeResult("empty");
            } else {
                setVerifyingCodeResult("serverError");
            }
            console.log(data);
        })
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
                        <EmailForm writeEmail={writeEmail} next={handleNextStep} />
                    )}
                    { currentStep === "code" && (
                        <CodeForm verifyCode={verifyCode} email={userData.email} verifyingCodeResult={verifyingCodeResult} />
                    )}
                </form>
                <HaveAccSwitch haveAcc={haveAcc} toggleHaveAcc={() => setHaveAcc(!haveAcc)} />
            </div>
        </div>
    )
}