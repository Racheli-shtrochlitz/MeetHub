import React, {  useState } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Menu } from 'primereact/menu';
import { Sidebar } from 'primereact/sidebar';
import { Divider } from 'primereact/divider';
import { Panel } from 'primereact/panel';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { useNavigate } from 'react-router-dom';

const VirtualHostPlatform = () => {

    const navigate = useNavigate();

    const [sidebarVisible, setSidebarVisible] = useState(false);

    const menuItems = [
        { label: 'Features', icon: 'pi pi-fw pi-cog' },
        { label: 'Testimonials', icon: 'pi pi-fw pi-star' },
        { label: 'Pricing', icon: 'pi pi-fw pi-money-bill' },
        { label: 'Contact', icon: 'pi pi-fw pi-envelope' }
    ];

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#f8f9fa' }}>

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
            <div className="px-4 py-8">
                <div className="max-w-screen-xl mx-auto text-center">
                    <h1 className="text-6xl font-bold text-900 mb-4">
                        The Advanced Platform
                        <br />
                        <span className="text-primary">for Virtual Hosts</span>
                    </h1>
                    <p className="text-xl text-600 mb-6 max-w-4xl mx-auto line-height-3">
                        Manage all your virtual meetings in one place. Create, schedule, and communicate with your guests professionally and efficiently
                    </p>
                    <div className="flex flex-column sm:flex-row gap-3 justify-content-center mb-8">
                        <Button
                            label="Start Free Today"
                            icon="pi pi-arrow-right"
                            iconPos="right"
                            className="p-button-lg p-button-raised"
                            style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                            onClick={()=> localStorage.getItem('token') ? navigate('/profile') : navigate('/login')}
                        />
                        <Button
                            label="Watch Demo"
                            icon="pi pi-play"
                            className="p-button-lg p-button-outlined"
                        />
                    </div>

                    {/* Hero Dashboard Preview */}
                    <div className="mt-8">
                        <Panel className="max-w-4xl mx-auto">
                            <div className="grid">
                                <div className="col-12 md:col-4">
                                    <Card className="h-full">
                                        <div className="text-center">
                                            <i className="pi pi-video text-4xl text-primary mb-3"></i>
                                            <h3 className="text-lg font-semibold mb-2">New Zoom Meeting</h3>
                                            <p className="text-600 text-sm">Quick creation</p>
                                        </div>
                                    </Card>
                                </div>
                                <div className="col-12 md:col-4">
                                    <Card className="h-full">
                                        <div className="text-center">
                                            <i className="pi pi-users text-4xl text-green-500 mb-3"></i>
                                            <h3 className="text-lg font-semibold mb-2">User Management</h3>
                                            <p className="text-600 text-sm">Full control</p>
                                        </div>
                                    </Card>
                                </div>
                                <div className="col-12 md:col-4">
                                    <Card className="h-full">
                                        <div className="text-center">
                                            <i className="pi pi-comments text-4xl text-purple-500 mb-3"></i>
                                            <h3 className="text-lg font-semibold mb-2">Messages</h3>
                                            <p className="text-600 text-sm">Smooth communication</p>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </Panel>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div
                className="py-8 px-4 text-center"
                style={{ backgroundColor: 'rgb(0, 1, 40)', marginTop: '2rem' }}
            >
                <p style={{ color: 'rgb(228, 228, 230)' }}>
                    © 2024 EduConnect Business. Empowering professional communication worldwide.
                </p>
            </div>
        </div>
    );
};

export default VirtualHostPlatform;