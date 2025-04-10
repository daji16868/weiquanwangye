// src/pages/Report.jsx
import React, { useState } from 'react';

function Report() {
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    date: '',
    location: '',
    evidence: null,
    contactMethod: 'anonymous',
    email: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  return (
    <div className="pt-24 pb-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Submit a Report</h1>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Your report will be handled confidentially. Do not include any sensitive personal data unless necessary.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-lg rounded-lg p-6">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4A90E2] focus:ring-[#4A90E2]"
              required
            >
              <option value="">Select a category</option>
              <option value="fraud">Fraud</option>
              <option value="harassment">Harassment</option>
              <option value="discrimination">Discrimination</option>
              <option value="safety">Safety Concerns</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              name="description"
              rows={6}
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4A90E2] focus:ring-[#4A90E2]"
              placeholder="Please provide detailed information about the incident..."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date of Incident</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4A90E2] focus:ring-[#4A90E2]"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4A90E2] focus:ring-[#4A90E2]"
                placeholder="Where did this occur?"
              />
            </div>
          </div>

          <div>
            <label htmlFor="evidence" className="block text-sm font-medium text-gray-700">Supporting Evidence (optional)</label>
            <input
              type="file"
              id="evidence"
              name="evidence"
              onChange={handleInputChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#4A90E2] file:text-white hover:file:bg-[#357ABD]"
            />
          </div>

          <div>
            <fieldset>
              <legend className="text-sm font-medium text-gray-700">Contact Method</legend>
              <div className="mt-4 space-y-4">
                <div className="flex items-center">
                  <input
                    id="anonymous"
                    name="contactMethod"
                    type="radio"
                    value="anonymous"
                    checked={formData.contactMethod === 'anonymous'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-[#4A90E2] focus:ring-[#4A90E2]"
                  />
                  <label htmlFor="anonymous" className="ml-3 block text-sm font-medium text-gray-700">
                    Stay Anonymous
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="email"
                    name="contactMethod"
                    type="radio"
                    value="email"
                    checked={formData.contactMethod === 'email'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-[#4A90E2] focus:ring-[#4A90E2]"
                  />
                  <label htmlFor="email" className="ml-3 block text-sm font-medium text-gray-700">
                    Provide Email
                  </label>
                </div>
              </div>
            </fieldset>
          </div>

          {formData.contactMethod === 'email' && (
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#4A90E2] focus:ring-[#4A90E2]"
                placeholder="your@email.com"
              />
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#003366] text-white px-6 py-3 rounded-md hover:bg-[#002244] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003366] transition-colors duration-200"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Report;