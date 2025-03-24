export default async function loginUser (email: string, password: string) {
    try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
            credentials: "include", // Для роботи з cookies
        });
    
        if (response.ok) {
            console.log("Logged in successfully");
        } else {
            const data = await response.json();
            console.error(data.error);
        }
    } catch (error) {
      console.error("Error:", error);
    }
};