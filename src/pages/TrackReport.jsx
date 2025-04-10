import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getReportStatus } from '../api/reportApi';

const TrackReport = () => {
  const { translations } = useLanguage();
  const { trackReport } = translations;
  
  const [trackingId, setTrackingId] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [reportStatus, setReportStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'trackingId') {
      setTrackingId(value);
    } else if (name === 'accessToken') {
      setAccessToken(value);
    }
    
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate input
    if (!trackingId.trim()) {
      setError(trackReport.errorNoTrackingId);
      return;
    }
    
    if (!accessToken.trim()) {
      setError(trackReport.errorNoToken);
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const status = await getReportStatus(trackingId, accessToken);
      setReportStatus(status);
    } catch (err) {
      setError(err.message || trackReport.errorGeneric);
      setReportStatus(null);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const statusColors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'in_progress': 'bg-blue-100 text-blue-800',
      'resolved': 'bg-green-100 text-green-800',
      'closed': 'bg-gray-100 text-gray-800',
      'rejected': 'bg-red-100 text-red-800',
      'need_info': 'bg-purple-100 text-purple-800'
    };
    
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">{trackReport.title}</h1>
        <p className="text-gray-600 mb-6">{trackReport.description}</p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="trackingId">
              {trackReport.trackingIdLabel} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="trackingId"
              name="trackingId"
              value={trackingId}
              onChange={handleInputChange}
              className={`w-full p-3 border rounded-lg ${error ? 'border-red-500' : 'border-gray-300'}`}
              placeholder={trackReport.trackingIdPlaceholder}
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="accessToken">
              {trackReport.accessTokenLabel} <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="accessToken"
              name="accessToken"
              value={accessToken}
              onChange={handleInputChange}
              className={`w-full p-3 border rounded-lg ${error ? 'border-red-500' : 'border-gray-300'}`}
              placeholder={trackReport.accessTokenPlaceholder}
            />
            <p className="text-sm text-gray-500 mt-1">{trackReport.accessTokenHelp}</p>
          </div>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-md">
              <p className="text-red-700">{error}</p>
            </div>
          )}
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {trackReport.loadingButton}
                </>
              ) : (
                trackReport.checkButton
              )}
            </button>
          </div>
        </form>
      </div>
      
      {reportStatus && (
        <div className="mt-8 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{trackReport.statusTitle}</h2>
          
          <div className="border border-gray-200 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{trackReport.reportIdLabel}:</span>
              <span className="font-medium">{reportStatus.reportId}</span>
            </div>
            
            <div className="flex justify-between items-center mt-3">
              <span className="text-gray-600">{trackReport.submittedLabel}:</span>
              <span className="font-medium">{new Date(reportStatus.createdAt).toLocaleDateString()}</span>
            </div>
            
            <div className="flex justify-between items-center mt-3">
              <span className="text-gray-600">{trackReport.statusLabel}:</span>
              <span className={`font-medium px-3 py-1 rounded-full ${getStatusColor(reportStatus.status)}`}>
                {trackReport.statuses[reportStatus.status] || reportStatus.status}
              </span>
            </div>
            
            <div className="flex justify-between items-center mt-3">
              <span className="text-gray-600">{trackReport.lastUpdatedLabel}:</span>
              <span className="font-medium">{new Date(reportStatus.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
          
          {reportStatus.messages && reportStatus.messages.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">{trackReport.messagesTitle}</h3>
              <div className="space-y-4">
                {reportStatus.messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg ${message.fromAdmin ? 'bg-blue-50 ml-4' : 'bg-gray-50 mr-4'}`}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-sm">
                        {message.fromAdmin ? trackReport.adminName : trackReport.youName}
                      </span>
                      <span className="text-xs text-gray-500">{new Date(message.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="text-gray-700">{message.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {reportStatus.needsResponse && (
            <div className="mt-6">
              <h3 className="font-semibold text-gray-800 mb-3">{trackReport.replyTitle}</h3>
              <textarea 
                className="w-full p-3 border border-gray-300 rounded-lg" 
                rows="4"
                placeholder={trackReport.replyPlaceholder}
              ></textarea>
              <div className="mt-3 flex justify-end">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  {trackReport.sendButton}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TrackReport;