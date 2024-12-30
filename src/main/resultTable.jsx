import { useEffect } from "react";
import useLogin from "../zustandStates/LoginStore";
import useResults from "../zustandStates/RequestStore";
import Notification from "../layout/Notification";
import { useState } from "react";

export default function ResultTable() {
    const token = useLogin((state) => state.token);
    const { get_all, clear, results } = useResults();
    const [notification, setNotification] = useState({ show: false, message: "", type: "" });

    const showNotification = (message, type) => {
        setNotification({ show: true, message, type });
        setTimeout(() => setNotification({ show: false, message: "", type: "" }), 2000);
    };


    useEffect(() => {
        if (token) {
            console.log("Fetching results with token:", token);
            get_all(token, showNotification); // Fetch data when the token is available
        } else {
            console.error("Token is missing; cannot fetch results.");
        }
    }, [token, get_all]);

    const handleClear = () => {
        if (token) {
            console.log("Clearing results with token:", token);
            clear(token);
        } else {
            console.error("Token is missing; cannot clear results.");
        }
    };

    return (
        <div>
            {notification.show && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification({ show: false, message: "", type: "" })}
                />
            )}
            <button onClick={handleClear} className="btn btn-danger mb-3">
                Clear Results
            </button>
            <table className="table table-striped table-hover mx-3">
                <thead>
                    <tr>
                        <th scope="col">X</th>
                        <th scope="col">Y</th>
                        <th scope="col">R</th>
                        <th scope="col">SENT</th>
                        <th scope="col">DELAY</th>
                        <th scope="col">RESULT</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(results) && results.length > 0 ? (
                        results.map((result) => (
                            <tr key={result.id || Math.random()}>
                                <td>{result.x}</td>
                                <td>{result.y}</td>
                                <td>{result.r}</td>
                                <td>{result.recieved}</td>
                                <td>{result.executionTime}</td>
                                <td>{result.inArea ? "true" : "false"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">
                                No results available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
