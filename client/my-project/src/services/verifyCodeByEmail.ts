export default async function verifyCodeByEmail(email: string, code: string) {
    try {
        const res = await fetch("http://localhost:5000/api/auth/verify-code", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, code}),
        });

        const data = await res.json();

        if(res.ok) {
            console.log('response code is ok - ', data);
            return data;
        } else {
            console.log("failed to fetch verifying code - ", data);
            return data;
        }
    } catch (err) {
        console.error("error while catching verifying code - ", err);
        return
    }
}