import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/LandingPage.css";
import landingImage from "../assets/landing.svg";

const features = [

    {
        title: "🧑‍🤝‍🧑 Collaborative Rooms",
        description: "Create or join rooms where multiple people can chat together contextually.",
    },
    {
        title: "⚡ Real-time Messaging",
        description: "Instant messaging with seamless AI-human interaction via WebSockets.",
    },
    {
        title: "🧠 AI Role Assistant",
        description: "Assign AI a role like teacher, moderator, or assistant per room for contextual help.",
    },
    {
        title: "🔒 End-to-End Encryption",
        description: "All messages are encrypted securely, ensuring your data stays private within every room.",
    },
];

const LandingPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split(".")[1]));
                setUser({ id: payload.id, name: payload.name || payload.email });
            } catch (err) {
                console.error("Invalid token");
                setUser(null);
            }
        }
    }, []);

    return (
        <div className="landing-container">
            <div className="hero-container">
                <div className="hero-left">
                    <h1 className="hero-title">roommate.ai</h1>
                    <p className="hero-subtitle">Smart. Contextual. Collaborative.</p>

                    <div className="hero-buttons">
                        {user ? (
                            <>
                                <button className="hero-btn primary" onClick={() => navigate("/chat")}>
                                    Join Room
                                </button>
                                <button className="hero-btn secondary" onClick={() => navigate("/create")}>
                                    Create Room
                                </button>
                            </>
                        ) : (
                            <>
                                <button className="hero-btn primary" onClick={() => navigate("/chat")}>
                                    Start Chat
                                </button>
                                <button className="hero-btn secondary" onClick={() => navigate("/login")}>
                                    Sign In
                                </button>
                            </>
                        )}
                    </div>
                </div>

                <div className="hero-right">
                    <div className="hero-image-wrapper">
                        <img src={landingImage} alt="Hero Vector" className="hero-image" />
                    </div>
                </div>
            </div>

            <div className="features-section">
                <h2 className="features-heading">Why roommate.ai?</h2>
                <div className="feature-cards">
                    {features.map((feat, idx) => (
                        <div key={idx} className="feature-card">
                            <h3>{feat.title}</h3>
                            <p>{feat.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
