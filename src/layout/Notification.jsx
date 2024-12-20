import React, { useState, useEffect } from "react";

export default function Notification({ message, type = "info", onClose }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            if (onClose) onClose();
        }, 2000);

        return () => clearTimeout(timer);
    }, [onClose]);

    if (!visible) return null;

    const backgroundColor = type === "success" ? "#4caf50" : type === "error" ? "#f44336" : "#2196f3";

    return (
        <div
            style={{
                position: "fixed",
                top: "50px",
                right: "20px",
                backgroundColor,
                color: "white",
                padding: "15px 30px",
                borderRadius: "5px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                zIndex: 1000,
            }}
        >
            {message}
        </div>
    );
}
