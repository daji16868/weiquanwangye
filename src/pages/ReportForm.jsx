import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { validateReportForm } from '../utils/validation';
import { submitReport } from '../api/reportApi';
import { reportTypes } from '../constants/reportTypes';

const ReportForm = () => {
  const { translations } = useLanguage();
  const { reportForm } = translations;
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    date: '',
    location: '',
    peopleInvolved: '',
    contactMethod: 'none',
    contactValue: '',
    files: []
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFormData({ ...formData, files: [...formData.files, ...selectedFiles] });
  };

  const removeFile = (index) => {
    const updatedFiles = [...formData.files];
    updatedFiles.splice(index, 1);
    setFormData({ ...formData, files: updatedFiles });
  };

  const handleNext = () => {
    const stepErrors = {};
    
    if (step === 1) {
      if (!formData.type) stepErrors.type = reportForm.validationRequired;
      if (!formData.description || formData.description.length < 10) 
        stepErrors.description = reportForm.validationDescription;
    }
    
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  const handlePrevious = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate the form
    const formErrors = validateReportForm(formData, reportForm);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await submitReport(formData);
      setSubmissionResult(result);
      window.scrollTo(0, 0);
    } catch (error) {
      setErrors({ form: error.message || reportForm.errorGeneric });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submissionResult) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="text-center mb-6">
          <div className="inline-block p-4 rounded-full bg-green-100 text-green-600">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mt-4">{reportForm.successTitle}</h2>
          <p className="text-gray-600 mt-2">{reportForm.successDescription}</p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <p className="text-sm text-blue-800 font-medium">{reportForm.trackingCodeLabel}</p>
          <div className="mt-1 p-3 bg-white border border-blue-200 rounded text-center">
            <span className="text-lg font-mono font-medium">{submissionResult.trackingId}</span>
          </div>
          <p className="text-sm text-blue-700 mt-2">{reportForm.trackingCodeInstructions}</p>
        </div>
        
        <div className="text-center">
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {reportForm.returnHome}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{reportForm.title}</h1>
        <p className="text-gray-600">{reportForm.subtitle}</p>
        
        {/* Progress indicator */}
        <div className="mt-6">
          <div className="flex items-center">
            {[1, 2, 3].map((stepNumber) => (
              <React.Fragment key={stepNumber}>
                <div 
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    stepNumber < step ? 
                      'bg-green-500 text-white' : 
                      step === stepNumber ?
                      'bg-blue-600 text-white' : 
                      'bg-gray-200 text-gray-600'
                  }`}
                >
                  {stepNumber < step ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    stepNumber
                  )}
                </div>
                {stepNumber < 3 && (
                  <div className={`flex-1 h-1 ${stepNumber < step ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-500">{reportForm.step1Title}</span>
            <span className="text-xs text-gray-500">{reportForm.step2Title}</span>
            <span className="text-xs text-gray-500">{reportForm.step3Title}</span>
          </div>
        </div>
      </div>

      {errors.form && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-md">
          <p className="text-red-700">{errors.form}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="type">
                {reportForm.typeLabel} <span className="text-red-500">*</span>
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg ${errors.type ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">{reportForm.typeSelect}</option>
                {reportTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
                {reportForm.descriptionLabel} <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="6"
                className={`w-full p-3 border rounded-lg ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                placeholder={reportForm.descriptionPlaceholder}
              ></textarea>
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              <p className="text-sm text-gray-500 mt-1">{reportForm.descriptionHelp}</p>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="date">
                {reportForm.dateLabel}
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="location">
                {reportForm.locationLabel}
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder={reportForm.locationPlaceholder}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="peopleInvolved">
                {reportForm.peopleLabel}
              </label>
              <textarea
                id="peopleInvolved"
                name="peopleInvolved"
                value={formData.peopleInvolved}
                onChange={handleInputChange}
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder={reportForm.peoplePlaceholder}
              ></textarea>
              <p className="text-sm text-gray-500 mt-1">{reportForm.peopleHelp}</p>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                {reportForm.filesLabel}
              </label>
              <div className="border-dashed border-2 border-gray-300 rounded-lg p-4 text-center">
                <input
                  type="file"
                  id="files"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="files" className="cursor-pointer block">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H4m32-12l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="mt-1 text-sm text-gray-600">
                    {reportForm.filesDragDrop}
                  </p>
                  <p className="mt-1 text-sm text-blue-600 font-medium">
                    {reportForm.filesBrowse}
                  </p>
                </label>
              </div>
              <p className="text-sm text-gray-500 mt-1">{reportForm.filesHelp}</p>

              {formData.files.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-700 mb-2">{reportForm.filesAttached}</h4>
                  <ul className="space-y-2">
                    {formData.files.map((file, index) => (
                      <li key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                        <span className="text-sm truncate">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                {reportForm.contactLabel}
              </label>
              <p className="text-sm text-gray-500 mb-4">{reportForm.contactDescription}</p>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="contactNone"
                    name="contactMethod"
                    value="none"
                    checked={formData.contactMethod === 'none'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 border-gray-300"
                  />
                  <label htmlFor="contactNone" className="ml-2 text-gray-700">
                    {reportForm.contactNone}
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="contactEmail"
                    name="contactMethod"
                    value="email"
                    checked={formData.contactMethod === 'email'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 border-gray-300"
                  />
                  <label htmlFor="contactEmail" className="ml-2 text-gray-700">
                    {reportForm.contactEmail}
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="contactPhone"
                    name="contactMethod"
                    value="phone"
                    checked={formData.contactMethod === 'phone'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 border-gray-300"
                  />
                  <label htmlFor="contactPhone" className="ml-2 text-gray-700">
                    {reportForm.contactPhone}
                  </label>
                </div>
              </div>
              
              {formData.contactMethod !== 'none' && (
                <div className="mt-4">
                  <input
                    type={formData.contactMethod === 'email' ? 'email' : 'tel'}
                    name="contactValue"
                    value={formData.contactValue}
                    onChange={handleInputChange}
                    placeholder={formData.contactMethod === 'email' ? reportForm.emailPlaceholder : reportForm.phonePlaceholder}
                    className={`w-full p-3 border rounded-lg ${errors.contactValue ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.contactValue && <p className="text-red-500 text-sm mt-1">{errors.contactValue}</p>}
                </div>
              )}
            </div>

            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-md mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">{reportForm.disclaimerTitle}</h3>
                  <p className="text-sm text-yellow-700 mt-1">{reportForm.disclaimerText}</p>
                </div>
              </div>
            </div>
          </>
        )}

        <div className="flex justify-between mt-8">
          {step > 1 ? (
            <button
              type="button"
              onClick={handlePrevious}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {reportForm.prevButton}
            </button>
          ) : (
            <div></div>
          )}
          
          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {reportForm.nextButton}
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {isSubmitting ? reportForm.submittingButton : reportForm.submitButton}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ReportForm;