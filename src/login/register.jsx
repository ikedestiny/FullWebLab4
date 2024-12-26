import { useState } from "react";
import UseRegister from "../zustandStates/RegStore"; // Correct hook import
import { send_register_request } from "../Apicalls"; // If you are still using this for API calls

export default function Register() {
    // Accessing state and actions from the Zustand store
    const { email, password, username, setEmail, setPassword, setUsername, register, clear } = UseRegister();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Call the register method from Zustand store
        await register();
        clear()
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-header text-center bg-secondary text-white">
                            <h3>Register</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={username} // Directly using username from the Zustand state
                                        onChange={(e) => setUsername(e.target.value)} // Update using the setUsername action
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={email} // Directly using email from Zustand state
                                        onChange={(e) => setEmail(e.target.value)} // Update using the setEmail action
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={password} // Directly using password from Zustand state
                                        onChange={(e) => setPassword(e.target.value)} // Update using the setPassword action
                                        required
                                    />
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-secondary">
                                        Register
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
