import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useUser from '../Hooks/useUser';


export default function Home() {
    const navigate = useNavigate();
    const user=useUser();

    console.log("slice:",useSelector((state) => state.user));
    const colors = {
        gray: 'rgb(228, 228, 230)',
        mustard: 'rgb(240, 175, 58)',
        purple: 'rgb(130, 43, 105)',
        blue: 'rgb(0, 1, 40)'
    };

    const heroStyle = {
        background: `linear-gradient(135deg, ${colors.blue} 0%, ${colors.purple} 50%, ${colors.blue} 100%)`,
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
    };

    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 30% 70%, rgba(240, 175, 58, 0.1) 0%, transparent 50%)',
        pointerEvents: 'none'
    };

    // PrimeReact Button styles
    const primaryButtonStyle = {
        backgroundColor: colors.mustard,
        borderColor: colors.mustard,
        color: colors.blue,
        borderRadius: '8px',
        padding: '12px 32px',
        fontSize: '18px',
        fontWeight: '600'
    };

    const outlineButtonStyle = {
        backgroundColor: 'transparent',
        borderColor: 'white',
        color: 'white',
        borderRadius: '8px',
        padding: '12px 32px',
        fontSize: '18px',
        fontWeight: '600'
    };

    // PrimeReact Card style
    const cardStyle = {
        backgroundColor: 'white',
        border: `2px solid ${colors.gray}`,
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        padding: '24px',
        height: '100%'
    };

    return (
        <div className="antialiased" style={{ backgroundColor: colors.gray }}>
            {/* Hero Section */}
            <div style={heroStyle}>
                <div style={overlayStyle}></div>
                <div className="text-center z-10 px-4 max-w-4xl mx-auto">
                    <h1
                        className="text-6xl md:text-7xl font-bold mb-6"
                        style={{
                            color: 'white',
                            textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                            letterSpacing: '0.05em'
                        }}
                    >
                        EDUCONNECT
                    </h1>
                    <p
                        className="text-xl md:text-2xl mb-8 leading-relaxed"
                        style={{
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontWeight: '300'
                        }}
                    >
                        Professional Business Meetings Made Simple
                        <br />
                        <span className="text-lg" style={{ color: colors.mustard }}>
                            Secure, Reliable, and Feature-Rich Video Conferencing Platform
                        </span>
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">

                        <button
                            onClick={() => user.email?navigate('/profile/lessons'):navigate('/login')}
                            className="p-button p-button-lg"
                            style={primaryButtonStyle}
                        >
                            <span className="p-button-label">Start Meeting Now</span>
                        </button>

                        <button
                            onClick={() => user.email?navigate('/profile/lessons'):navigate('/login')}
                            className="p-button p-button-outlined p-button-lg"
                            style={outlineButtonStyle}
                        >
                            <span className="p-button-label">Schedule Meeting</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-16 px-4 pb-32">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2
                            className="text-4xl font-bold mb-4"
                            style={{ color: colors.blue }}
                        >
                            Why Choose EduConnect for Business?
                        </h2>
                        <p
                            className="text-lg"
                            style={{ color: colors.purple }}
                        >
                            Enterprise-grade video conferencing with professional features
                        </p>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="p-card" style={cardStyle}>
                            <div className="text-center">
                                <div
                                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                                    style={{ backgroundColor: `${colors.mustard}20` }}
                                >
                                    <i
                                        className="pi pi-video text-2xl"
                                        style={{ color: colors.mustard }}
                                    ></i>
                                </div>
                                <h3
                                    className="text-xl font-semibold mb-3"
                                    style={{ color: colors.blue }}
                                >
                                    Enterprise Video Quality
                                </h3>
                                <p style={{ color: colors.purple }}>
                                    Secure and professional lessons with waiting rooms, participant control.
                                </p>
                            </div>
                        </div>

                        <div className="p-card" style={cardStyle}>
                            <div className="text-center">
                                <div
                                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                                    style={{ backgroundColor: `${colors.purple}20` }}
                                >
                                    <i
                                        className="pi pi-shield text-2xl"
                                        style={{ color: colors.purple }}
                                    ></i>
                                </div>
                                <h3
                                    className="text-xl font-semibold mb-3"
                                    style={{ color: colors.blue }}
                                >
                                    Bank-Level Security
                                </h3>
                                <p style={{ color: colors.purple }}>
                                    High-definition video powered by adaptive streaming, noise reduction, and intelligent background blur.
                                </p>
                            </div>
                        </div>

                        <div className="p-card" style={cardStyle}>
                            <div className="text-center">
                                <div
                                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                                    style={{ backgroundColor: `${colors.blue}20` }}
                                >
                                    <i
                                        className="pi pi-users text-2xl"
                                        style={{ color: colors.blue }}
                                    ></i>
                                </div>
                                <h3
                                    className="text-xl font-semibold mb-3"
                                    style={{ color: colors.blue }}
                                >
                                    Team Collaboration
                                </h3>
                                <p style={{ color: colors.purple }}>
                                    Screen sharing, digital whiteboard, breakout rooms, and real-time document collaboration
                                </p>
                            </div>
                        </div>

                        <div className="p-card" style={cardStyle}>
                            <div className="text-center">
                                <div
                                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                                    style={{ backgroundColor: `${colors.mustard}20` }}
                                >
                                    <i
                                        className="pi pi-calendar text-2xl"
                                        style={{ color: colors.mustard }}
                                    ></i>
                                </div>
                                <h3
                                    className="text-xl font-semibold mb-3"
                                    style={{ color: colors.blue }}
                                >
                                    Smart Scheduling
                                </h3>
                                <p style={{ color: colors.purple }}>
                                    Calendar integration, automated invites, time zone detection, and meeting reminders
                                </p>
                            </div>
                        </div>

                        <div className="p-card" style={cardStyle}>
                            <div className="text-center">
                                <div
                                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                                    style={{ backgroundColor: `${colors.purple}20` }}
                                >
                                    <i
                                        className="pi pi-clock text-2xl"
                                        style={{ color: colors.purple }}
                                    ></i>
                                </div>
                                <h3
                                    className="text-xl font-semibold mb-3"
                                    style={{ color: colors.blue }}
                                >
                                    Recording & Analytics
                                </h3>
                                <p style={{ color: colors.purple }}>
                                    Cloud recording, meeting transcripts, attendance tracking, and engagement analytics
                                </p>
                            </div>
                        </div>

                        <div className="p-card" style={cardStyle}>
                            <div className="text-center">
                                <div
                                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                                    style={{ backgroundColor: `${colors.blue}20` }}
                                >
                                    <i
                                        className="pi pi-share-alt text-2xl"
                                        style={{ color: colors.blue }}
                                    ></i>
                                </div>
                                <h3
                                    className="text-xl font-semibold mb-3"
                                    style={{ color: colors.blue }}
                                >
                                    Integration Suite
                                </h3>
                                <p style={{ color: colors.purple }}>
                                    Seamless integration with CRM, project management tools, and enterprise software
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div
                className="py-8 px-4 text-center"
                style={{ backgroundColor: colors.blue, marginTop: '2rem' }}
            >
                <p style={{ color: colors.gray }}>
                    © 2024 EduConnect Business. Empowering professional communication worldwide.
                </p>
            </div>
        </div>
    );
}