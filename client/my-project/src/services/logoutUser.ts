export default async function logoutUser() {
    try {
        const response = await fetch("http://localhost:5000/api/auth/logout", {
            method: "POST",
            credentials: "include", // Для роботи з cookies
        });
  
        if (response.ok) {
            console.log("Logged out successfully");
        } else {
            const data = await response.json();
            console.error(data.error);
        }
    } catch (error) {
        console.error("Error:", error);
    }
};