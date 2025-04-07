import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

function Login() {
    const [password, setPasswordValue] = useState("");
    const [userId, setUserIdValue] = useState("");
    const navigate = useNavigate(); // ✅ Initialize navigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Submitting login data:", userId, password);

        try {
            const response = await axios.post("http://localhost:8080/api/users/loginUser", {
                userId: userId,
                password: password
            });

            console.log("Login response:", response.data);

            if (response.data) {
                // ✅ Store user session
                localStorage.setItem("user", JSON.stringify(response.data));

                alert("Login Successful! Redirecting...");

                // ✅ Redirect to product catalog
                navigate("/products");
            } else {
                alert("Invalid User ID or Password");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <>
            <h1>Login Page</h1>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <label>User ID:</label>
                    <input
                        type="email"
                        placeholder="Enter your user id"
                        value={userId}
                        onChange={(e) => setUserIdValue(e.target.value)}
                    />
                    <br /><br />

                    <label>Password:</label>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPasswordValue(e.target.value)}
                    />
                    <br /><br />

                    <a href="/register">Don't have an account?</a>
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    );
}

export default Login;
