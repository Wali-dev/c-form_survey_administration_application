import React from 'react';
import { Link } from 'react-router-dom';
import {
    ClipboardList,
    Share2,
    BarChart2,
    Workflow,
    Zap,
    Users
} from 'lucide-react';


const LandingPage: React.FC = () => {

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <ClipboardList className="text-blue-600" size={30} />
                        <span className="text-2xl font-bold text-blue-800">C-form</span>
                    </div>
                    <div className="space-x-4">
                        <Link
                            to="/sign-in"
                            className="text-blue-600 hover:text-blue-800 font-semibold"
                        >
                            Login
                        </Link>
                        <Link
                            to="/sign-up"
                            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="container mx-auto px-4 pt-16 pb-24 text-center">
                <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                    Create, Share, and Analyze <br />
                    <span className="text-blue-600">Forms with Ease</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                    C-form empowers you to build beautiful, intelligent forms in minutes.
                    Collect responses, gain insights, and streamline your data collection process.
                </p>
                <div className="flex justify-center space-x-4">
                    <Link
                        to="/sign-up"
                        className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                    >
                        Start Creating Forms
                    </Link>
                    <Link
                        to="/demo"
                        className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-50 transition-colors"
                    >
                        Watch Demo
                    </Link>
                </div>
            </header>

            {/* Features Section */}
            <section className="container mx-auto px-4 py-16">
                <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
                    Why Choose C-form
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: <Share2 className="text-blue-600" size={48} />,
                            title: "Easy Sharing",
                            description: "Generate unique share links for your forms and collect responses from anywhere."
                        },
                        {
                            icon: <BarChart2 className="text-green-600" size={48} />,
                            title: "Instant Analytics",
                            description: "Get real-time insights and export response data with a single click."
                        },
                        {
                            icon: <Workflow className="text-purple-600" size={48} />,
                            title: "Flexible Design",
                            description: "Customize forms with various field types, validations, and styling options."
                        }
                    ].map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center"
                        >
                            <div className="flex justify-center mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-800">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Benefits Section */}
            <section className="bg-blue-600 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-12">
                        Unlock Your Productivity
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Zap className="mx-auto mb-4" size={48} />,
                                title: "Quick Setup",
                                description: "Create professional forms in minutes, no coding required."
                            },
                            {
                                icon: <Users className="mx-auto mb-4" size={48} />,
                                title: "Collaboration",
                                description: "Share and collaborate on forms with your team seamlessly."
                            },
                            {
                                icon: <ClipboardList className="mx-auto mb-4" size={48} />,
                                title: "Comprehensive Data",
                                description: "Collect rich, structured data with custom form fields."
                            }
                        ].map((benefit, index) => (
                            <div key={index} className="bg-white/10 p-6 rounded-xl">
                                {benefit.icon}
                                <h3 className="text-xl font-bold mb-3">
                                    {benefit.title}
                                </h3>
                                <p className="text-white/80">
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="container mx-auto px-4 py-24 text-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                    Ready to Streamline Your Forms?
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                    Join thousands of professionals who have transformed their data collection with C-form.
                </p>
                <Link
                    to="/signup"
                    className="bg-blue-600 text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                >
                    Create Your First Form Now
                </Link>
            </section>

            {/* Footer */}
            <footer className="bg-gray-100 py-12">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-gray-600">
                        © 2024 C-form. All rights reserved.
                    </p>
                    <div className="mt-4 space-x-4">
                        <Link to="/privacy" className="text-gray-500 hover:text-blue-600">
                            Privacy Policy
                        </Link>
                        <Link to="/terms" className="text-gray-500 hover:text-blue-600">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;