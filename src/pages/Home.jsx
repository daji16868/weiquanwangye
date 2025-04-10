// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const features = [
    {
      title: 'Secure Communication',
      description: 'End-to-end encryption ensures your information remains confidential.',
      icon: (
        <svg className="w-12 h-12 text-[#4A90E2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
    {
      title: 'Anonymous Reporting',
      description: 'Submit reports without revealing your identity.',
      icon: (
        <svg className="w-12 h-12 text-[#4A90E2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      title: 'Professional Support',
      description: 'Expert team handles each case with care and discretion.',
      icon: (
        <svg className="w-12 h-12 text-[#4A90E2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#003366] to-[#4A90E2] text-white py-20 px-4 sm:px-6 lg:px-8 rounded-lg mt-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">Secure Whistleblowing Platform</h1>
          <p className="text-xl mb-8">Report misconduct safely and confidentially. Your voice matters.</p>
          <Link
            to="/report"
            className="inline-block bg-[#FF6B00] text-white font-medium px-8 py-3 rounded-md hover:bg-[#FF8533] transition-colors duration-200"
          >
            Make a Report
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Choose Our Platform?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Process Section */}
      <div className="py-20 bg-gray-50 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">How It Works</h2>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col space-y-12">
            {[
              { number: '1', title: 'Submit Report', description: 'Fill out our secure online form with details of your concern.' },
              { number: '2', title: 'Receive Confirmation', description: 'Get a unique case number to track your report status.' },
              { number: '3', title: 'Investigation', description: 'Our team reviews and investigates your report thoroughly.' },
            ].map((step) => (
              <div key={step.number} className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#4A90E2] text-white flex items-center justify-center text-xl font-bold">
                  {step.number}
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                  <p className="mt-2 text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;