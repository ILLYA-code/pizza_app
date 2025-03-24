export default async function refreshToken () {
    try {
        const response = await fetch("http://localhost:5000/api/auth/refresh", {
            method: "POST",
            credentials: "include", // Важливо для роботи з cookie
        });
  
        if (response.ok) {
            const data = await response.json();
            console.log("New access token:", data.accessToken);
        } else {
            console.error("Failed to refresh token");
        }
    } catch (error) {
      console.error("Error:", error);
    }
};