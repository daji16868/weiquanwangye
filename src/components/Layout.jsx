// src/components/Layout.jsx
import React from 'react';
import NavBar from './NavBar';

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </main>
      <footer className="bg-gray-50 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Contact</h3>
              <p className="mt-4 text-gray-600">support@whistleblowing.com</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a href="/privacy" className="text-gray-600 hover:text-blue-600">Privacy Policy</a>
                </li>
                <li>
                  <a href="/terms" className="text-gray-600 hover:text-blue-600">Terms of Service</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Security</h3>
              <p className="mt-4 text-gray-600">256-bit encryption</p>
              <p className="mt-2 text-gray-600">ISO 27001 certified</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-600">&copy; {new Date().getFullYear()} Whistleblowing Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;