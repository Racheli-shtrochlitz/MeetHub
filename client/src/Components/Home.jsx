import React from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';

export default function Home() {
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
                        Connect, Learn, and Grow Together
                        <br />
                        <span className="text-lg" style={{ color: colors.mustard }}>
                            Professional Virtual Meetings & Interactive Learning Platform
                        </span>
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                        <Button 
                            label="Start Learning" 
                            size="large"
                            className="px-8 py-3 text-lg font-semibold"
                            style={{
                                backgroundColor: colors.mustard,
                                borderColor: colors.mustard,
                                color: colors.blue,
                                borderRadius: '8px',
                                transition: 'all 0.3s ease'
                            }}
                        />
                        <Button 
                            label="Schedule Meeting" 
                            size="large"
                            outlined
                            className="px-8 py-3 text-lg font-semibold"
                            style={{
                                borderColor: 'white',
                                color: 'white',
                                borderRadius: '8px',
                                transition: 'all 0.3s ease'
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 
                            className="text-4xl font-bold mb-4"
                            style={{ color: colors.blue }}
                        >
                            Why Choose EduConnect?
                        </h2>
                        <p 
                            className="text-lg"
                            style={{ color: colors.purple }}
                        >
                            Seamless virtual learning experience with professional tools
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card 
                            className="p-6 h-full"
                            style={{ 
                                backgroundColor: 'white',
                                border: `2px solid ${colors.gray}`,
                                borderRadius: '12px',
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                            }}
                        >
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
                                    HD Video Calls
                                </h3>
                                <p style={{ color: colors.purple }}>
                                    Crystal clear video quality with advanced noise cancellation for professional meetings
                                </p>
                            </div>
                        </Card>

                        <Card 
                            className="p-6 h-full"
                            style={{ 
                                backgroundColor: 'white',
                                border: `2px solid ${colors.gray}`,
                                borderRadius: '12px',
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                            }}
                        >
                            <div className="text-center">
                                <div 
                                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                                    style={{ backgroundColor: `${colors.purple}20` }}
                                >
                                    <i 
                                        className="pi pi-users text-2xl"
                                        style={{ color: colors.purple }}
                                    ></i>
                                </div>
                                <h3 
                                    className="text-xl font-semibold mb-3"
                                    style={{ color: colors.blue }}
                                >
                                    Interactive Learning
                                </h3>
                                <p style={{ color: colors.purple }}>
                                    Engage with interactive whiteboards, screen sharing, and collaborative tools
                                </p>
                            </div>
                        </Card>

                        <Card 
                            className="p-6 h-full"
                            style={{ 
                                backgroundColor: 'white',
                                border: `2px solid ${colors.gray}`,
                                borderRadius: '12px',
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                            }}
                        >
                            <div className="text-center">
                                <div 
                                    className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                                    style={{ backgroundColor: `${colors.blue}20` }}
                                >
                                    <i 
                                        className="pi pi-calendar text-2xl"
                                        style={{ color: colors.blue }}
                                    ></i>
                                </div>
                                <h3 
                                    className="text-xl font-semibold mb-3"
                                    style={{ color: colors.blue }}
                                >
                                    Smart Scheduling
                                </h3>
                                <p style={{ color: colors.purple }}>
                                    Easy-to-use scheduling system with automated reminders and calendar integration
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            <Divider style={{ borderColor: colors.purple, opacity: 0.3 }} />

            {/* CTA Section */}
            <div 
                className="py-16 px-4 text-center"
                style={{ 
                    background: `linear-gradient(45deg, ${colors.gray} 0%, white 100%)` 
                }}
            >
                <div className="max-w-4xl mx-auto">
                    <h2 
                        className="text-3xl font-bold mb-4"
                        style={{ color: colors.blue }}
                    >
                        Ready to Transform Your Learning Experience?
                    </h2>
                    <p 
                        className="text-lg mb-8"
                        style={{ color: colors.purple }}
                    >
                        Join thousands of educators and students already using EduConnect
                    </p>
                    <Button 
                        label="Get Started Today" 
                        size="large"
                        className="px-10 py-4 text-lg font-semibold"
                        style={{
                            backgroundColor: colors.purple,
                            borderColor: colors.purple,
                            color: 'white',
                            borderRadius: '8px',
                            boxShadow: `0 4px 15px ${colors.purple}40`
                        }}
                    />
                </div>
            </div>

            {/* Footer */}
            <div 
                className="py-8 px-4 text-center"
                style={{ backgroundColor: colors.blue }}
            >
                <p style={{ color: colors.gray }}>
                    © 2024 EduConnect. Empowering education through technology.
                </p>
            </div>
        </div>
    );
}