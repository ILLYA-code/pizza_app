export default async function sendCodeByEmail(email: string) {
    try {
        const res = await fetch("http://localhost:5000/api/auth/send-code", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email}),
        });

        const data = res.json();

        if(res.ok) {
            console.log('response ok - ', data);
        } else {
            console.log("failed to fetch", data);
        }
    } catch (err) {
        console.error("error while catching", err);
    }
}