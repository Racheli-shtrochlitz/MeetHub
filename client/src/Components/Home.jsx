import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Menu } from 'primereact/menu';
import { Sidebar } from 'primereact/sidebar';
import { Divider } from 'primereact/divider';
import { Panel } from 'primereact/panel';
import { Badge } from 'primereact/badge';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const VirtualHostPlatform = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [animatedStats, setAnimatedStats] = useState([0, 0, 0]);
    const [currentFeature, setCurrentFeature] = useState(0);

    // Animated statistics
    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedStats([10000, 500, 98]);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    // Feature rotation
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFeature(prev => (prev + 1) % 3);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const menuItems = [
        { label: 'Features', icon: 'pi pi-fw pi-cog' },
        { label: 'Testimonials', icon: 'pi pi-fw pi-star' },
        { label: 'Pricing', icon: 'pi pi-fw pi-money-bill' },
        { label: 'Contact', icon: 'pi pi-fw pi-envelope' }
    ];

    const features = [
        {
            icon: 'pi pi-video',
            title: 'HD Video Meetings',
            description: 'Crystal clear 4K meetings',
            color: '#667eea',
            bgColor: 'rgba(102, 126, 234, 0.1)'
        },
        {
            icon: 'pi pi-users',
            title: 'Smart User Management',
            description: 'AI-powered organization',
            color: '#10b981',
            bgColor: 'rgba(16, 185, 129, 0.1)'
        },
        {
            icon: 'pi pi-comments',
            title: 'Real-time Chat',
            description: 'Instant communication',
            color: '#8b5cf6',
            bgColor: 'rgba(139, 92, 246, 0.1)'
        }
    ];

    return (
        <div className="min-h-screen" style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 30%, #f093fb 70%, #f5576c 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Animated background elements */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `
                    radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
                    radial-gradient(circle at 40% 80%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)
                `,
                animation: 'float 6s ease-in-out infinite'
            }} />

            {/* Mobile Sidebar */}
            <Sidebar visible={sidebarVisible} onHide={() => setSidebarVisible(false)}>
                <div className="p-3">
                    <Menu model={menuItems} className="w-full" />
                    <Divider />
                    <div className="flex flex-column gap-2">
                        <Button label="Sign In" className="p-button-text w-full" />
                        <Button label="Start Free" className="w-full" />
                    </div>
                </div>
            </Sidebar>

            {/* Hero Section */}
            <div className="px-4 py-8 relative z-1">
                <div className="max-w-screen-xl mx-auto text-center">
                    {/* Floating badge */}
                    <div className="mb-4">
                        <Badge 
                            value="🚀 New Features Available!" 
                            severity="success" 
                            style={{ 
                                fontSize: '14px', 
                                padding: '8px 16px',
                                background: 'rgba(255, 255, 255, 0.9)',
                                color: '#667eea',
                                borderRadius: '25px',
                                animation: 'bounce 2s infinite'
                            }}
                        />
                    </div>

                    <h1 className="text-6xl font-bold mb-4" style={{
                        background: 'linear-gradient(135deg, #fff 0%, #f8fafc 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                        animation: 'slideInUp 1s ease-out'
                    }}>
                        The Advanced Platform
                        <br />
                        <span style={{
                            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>for MEETHUB</span>
                    </h1>
                    
                    <p className="text-xl mb-6 max-w-4xl mx-auto line-height-3" style={{
                        color: 'rgba(255, 255, 255, 0.9)',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                        animation: 'slideInUp 1s ease-out 0.2s both'
                    }}>
                        Revolutionize your virtual meetings with AI-powered tools. Create, schedule, and communicate with your guests like never before ✨
                    </p>

                    {/* Animated Stats */}
                    <div className="flex justify-content-center gap-6 mb-6" style={{
                        animation: 'slideInUp 1s ease-out 0.4s both'
                    }}>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">{animatedStats[0].toLocaleString()}+</div>
                            <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Happy Users</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">{animatedStats[1]}+</div>
                            <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Companies</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-white">{animatedStats[2]}%</div>
                            <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Satisfaction</div>
                        </div>
                    </div>

                    <div className="flex flex-column sm:flex-row gap-3 justify-content-center mb-8" style={{
                        animation: 'slideInUp 1s ease-out 0.6s both'
                    }}>
                        <Button
                            label="Start Free Today 🎉"
                            icon="pi pi-arrow-right"
                            iconPos="right"
                            className="p-button-lg"
                            style={{ 
                                background: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
                                border: 'none',
                                boxShadow: '0 8px 32px rgba(245, 158, 11, 0.4)',
                                transform: 'translateY(0)',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 12px 40px rgba(245, 158, 11, 0.6)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 8px 32px rgba(245, 158, 11, 0.4)';
                            }}
                        />
                        <Button
                            label="Watch Demo 🎬"
                            icon="pi pi-play"
                            className="p-button-lg"
                            style={{
                                background: 'rgba(255, 255, 255, 0.1)',
                                backdropFilter: 'blur(10px)',
                                border: '2px solid rgba(255, 255, 255, 0.3)',
                                color: 'white',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                                e.target.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                                e.target.style.transform = 'translateY(0)';
                            }}
                        />
                    </div>

                    {/* Enhanced Dashboard Preview */}
                    <div className="mt-8" style={{
                        animation: 'slideInUp 1s ease-out 0.8s both'
                    }}>
                        <Panel 
                            className="max-w-4xl mx-auto"
                            style={{
                                background: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: '20px',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)'
                            }}
                        >
                            <div className="grid">
                                {features.map((feature, index) => (
                                    <div key={index} className="col-12 md:col-4">
                                        <Card 
                                            className="h-full"
                                            style={{
                                                background: currentFeature === index ? feature.bgColor : 'white',
                                                border: currentFeature === index ? `2px solid ${feature.color}` : '1px solid #e5e7eb',
                                                borderRadius: '15px',
                                                transition: 'all 0.5s ease',
                                                transform: currentFeature === index ? 'translateY(-5px)' : 'translateY(0)',
                                                boxShadow: currentFeature === index ? `0 10px 30px ${feature.color}30` : '0 2px 10px rgba(0,0,0,0.1)'
                                            }}
                                        >
                                            <div className="text-center">
                                                <i 
                                                    className={`${feature.icon} text-4xl mb-3`}
                                                    style={{ 
                                                        color: feature.color,
                                                        animation: currentFeature === index ? 'pulse 2s infinite' : 'none'
                                                    }}
                                                ></i>
                                                <h3 className="text-lg font-semibold mb-2" style={{
                                                    color: currentFeature === index ? feature.color : '#374151'
                                                }}>
                                                    {feature.title}
                                                </h3>
                                                <p className="text-600 text-sm">{feature.description}</p>
                                                {currentFeature === index && (
                                                    <Badge 
                                                        value="Active" 
                                                        severity="success" 
                                                        style={{ 
                                                            marginTop: '10px',
                                                            animation: 'fadeIn 0.5s ease-in'
                                                        }}
                                                    />
                                                )}
                                            </div>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </Panel>
                    </div>
                </div>
            </div>

            {/* Enhanced Footer */}
            <div
                className="py-8 px-4 text-center relative z-1"
                style={{ 
                    background: 'linear-gradient(135deg, rgba(0, 1, 40, 0.9) 0%, rgba(30, 41, 59, 0.9) 100%)',
                    backdropFilter: 'blur(10px)',
                    marginTop: '2rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                }}
            >
                <p style={{ 
                    color: 'rgb(228, 228, 230)',
                    fontSize: '16px',
                    marginBottom: '10px'
                }}>
                    © 2024 MEETHUB Business. Empowering professional communication worldwide. 🌍
                </p>
                <div className="flex justify-content-center gap-4 mt-3">
                    <i className="pi pi-twitter text-xl" style={{ color: '#1da1f2', cursor: 'pointer' }}></i>
                    <i className="pi pi-linkedin text-xl" style={{ color: '#0077b5', cursor: 'pointer' }}></i>
                    <i className="pi pi-facebook text-xl" style={{ color: '#1877f2', cursor: 'pointer' }}></i>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(5deg); }
                }
                
                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                    40% { transform: translateY(-10px); }
                    60% { transform: translateY(-5px); }
                }
                
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default VirtualHostPlatform;