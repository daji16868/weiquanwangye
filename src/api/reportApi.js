// API client for interacting with the whistleblowing backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api/v1';

// Mock implementation for the frontend development
// In production, these functions would make actual API calls
export const submitReport = async (reportData) => {
  try {
    // In a real implementation, this would be an API call
    // return await axios.post(`${API_BASE_URL}/reports`, reportData);
    
    // Mock implementation for development
    console.log('Submitting report:', reportData);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate a random tracking ID and token
    const trackingId = 'WB-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const accessToken = Math.random().toString(36).substr(2, 16);
    
    // Return mock response
    return {
      success: true,
      trackingId,
      accessToken
    };
  } catch (error) {
    console.error('Error submitting report:', error);
    throw new Error('Failed to submit report. Please try again later.');
  }
};

export const getReportStatus = async (trackingId, accessToken) => {
  try {
    // In a real implementation, this would be an API call
    // return await axios.get(`${API_BASE_URL}/reports/${trackingId}`, {
    //   headers: { 'Anonymous-Access-Token': accessToken }
    // });
    
    // Mock implementation for development
    console.log('Fetching report status for:', trackingId, 'with token:', accessToken);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Validate the tracking ID format (just for mock validation)
    if (!trackingId.startsWith('WB-') || trackingId.length < 8) {
      throw new Error('Invalid tracking ID format');
    }
    
    // Mock statuses for demonstration
    const statuses = ['pending', 'in_progress', 'need_info', 'resolved', 'closed', 'rejected'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    // Generate random dates
    const createdDate = new Date();
    createdDate.setDate(createdDate.getDate() - Math.floor(Math.random() * 30)); // Random date in the last month
    
    const updatedDate = new Date(createdDate);
    updatedDate.setDate(updatedDate.getDate() + Math.floor(Math.random() * 7)); // Random date after creation
    
    // Generate mock messages
    const mockMessages = [];
    if (Math.random() > 0.3) { // 70% chance to have messages
      const numMessages = Math.floor(Math.random() * 3) + 1;
      
      for (let i = 0; i < numMessages; i++) {
        const messageDate = new Date(createdDate);
        messageDate.setDate(messageDate.getDate() + i + 1);
        
        mockMessages.push({
          content: i % 2 === 0 
            ? "Thank you for your report. We need additional information regarding the incident. Could you provide more specific details about when and where this occurred?"
            : "I've provided the requested details. The incident happened in the accounting department on the morning of May 15th. The individuals involved were primarily from the finance team.",
          createdAt: messageDate.toISOString(),
          fromAdmin: i % 2 === 0
        });
      }
    }
    
    // Return mock response
    return {
      reportId: trackingId,
      status: randomStatus,
      createdAt: createdDate.toISOString(),
      updatedAt: updatedDate.toISOString(),
      needsResponse: randomStatus === 'need_info',
      messages: mockMessages
    };
  } catch (error) {
    console.error('Error fetching report status:', error);
    throw new Error('Failed to retrieve report status. Please check your tracking ID and access token.');
  }
};