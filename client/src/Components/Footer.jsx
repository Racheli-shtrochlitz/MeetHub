import React from 'react';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';

export default function Footer() {
    return (
        <div
            className="footer p-4 text-white"
            style={{
                backgroundColor: '#0a1d3a',
                fontFamily: 'Arial, sans-serif',
            }}
        >
            <div className="grid">
                <div className="col-12 md:col-4 mb-3">
                    <h4 className="mb-2 text-white">About Us</h4>
                    <p className="text-sm line-height-3 text-gray-300">
                        Our platform connects students and teachers for high-quality, personalized learning experiences.
                    </p>
                </div>

                <div className="col-12 md:col-4 mb-3">
                    <h4 className="mb-2 text-white">Quick Links</h4>
                    <ul className="list-none p-0 text-sm">
                        <li className="mb-1">
                            <a
                                href="/about"
                                className="text-white hover:underline hover:text-blue-300"
                            >
                                About
                            </a>
                        </li>
                        <li className="mb-1">
                            <a
                                href="/contact"
                                className="text-white hover:underline hover:text-blue-300"
                            >
                                Contact
                            </a>
                        </li>
                        <li>
                            <a
                                href="/privacy"
                                className="text-white hover:underline hover:text-blue-300"
                            >
                                Privacy Policy
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="col-12 md:col-4 mb-3">
                    <h4 className="mb-2 text-white">Stay Connected</h4>
                    <div className="flex gap-2">
                        <Button icon="pi pi-facebook" className="p-button-rounded p-button-text text-white" />
                        <Button icon="pi pi-twitter" className="p-button-rounded p-button-text text-white" />
                        <Button icon="pi pi-github" className="p-button-rounded p-button-text text-white" />
                    </div>
                </div>
            </div>

            <Divider className="my-3" />

            <p className="text-center text-sm text-gray-400 mb-0">
                © {new Date().getFullYear()} EduConnect. All rights reserved.
            </p>
        </div>
    );
}
