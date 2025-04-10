import React, { createContext, useState, useContext, useEffect } from 'react';

// Define available languages and translations
const languages = [
  { code: 'en', name: 'English' },
  { code: 'de', name: 'Deutsch' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' }
];

// English translations (default)
const englishTranslations = {
  header: {
    title: 'Whistleblowing Platform',
    home: 'Home',
    report: 'Submit Report',
    track: 'Track Report',
    faq: 'FAQ'
  },
  footer: {
    aboutTitle: 'About This Platform',
    aboutText: 'This secure whistleblowing platform allows you to report concerns and misconduct anonymously. All reports are handled with the highest level of confidentiality.',
    linksTitle: 'Quick Links',
    home: 'Home',
    report: 'Submit Report',
    track: 'Track Report',
    faq: 'FAQ',
    legalTitle: 'Legal',
    privacy: 'Privacy Policy',
    terms: 'Terms of Use',
    cookie: 'Cookie Policy',
    copyright: 'Whistleblowing Platform. All rights reserved.'
  },
  home: {
    title: 'Secure & Anonymous Whistleblowing',
    subtitle: 'A safe space to report misconduct and raise concerns with complete confidentiality',
    reportButton: 'Submit a Report',
    trackButton: 'Track Your Report',
    howItWorksTitle: 'How It Works',
    step1Title: 'Submit Your Report',
    step1Text: 'Fill out the secure reporting form with as much detail as possible. Your identity remains protected.',
    step2Title: 'Receive Tracking Code',
    step2Text: 'After submission, you\'ll get a unique tracking ID and access token to check your report status.',
    step3Title: 'Follow Up',
    step3Text: 'Use your tracking ID to check for updates or provide additional information if requested.',
    guaranteesTitle: 'Our Guarantees',
    guarantee1: 'Complete anonymity - your identity is protected',
    guarantee2: 'End-to-end encryption for all submitted information',
    guarantee3: 'Compliance with whistleblower protection regulations',
    guarantee4: 'Professional and timely handling of your report'
  },
  reportForm: {
    title: 'Submit a Whistleblowing Report',
    subtitle: 'Use this form to safely report incidents or concerns. All information is encrypted and handled confidentially.',
    step1Title: 'Report Details',
    step2Title: 'Additional Info',
    step3Title: 'Finalize',
    typeLabel: 'Report Type',
    typeSelect: 'Select a report type',
    descriptionLabel: 'Description of the Incident',
    descriptionPlaceholder: 'Please describe what happened, who was involved, and any other relevant details',
    descriptionHelp: 'Provide as much detail as possible to help with investigation',
    dateLabel: 'When did this occur?',
    locationLabel: 'Where did this occur?',
    locationPlaceholder: 'Department, location, or online platform where the incident occurred',
    peopleLabel: 'People Involved',
    peoplePlaceholder: 'Names or roles of people involved in the incident',
    peopleHelp: 'Provide names or positions of those involved if known',
    filesLabel: 'Supporting Documents',
    filesDragDrop: 'Drag and drop files here, or',
    filesBrowse: 'Browse files',
    filesHelp: 'You may attach documents, images, or other evidence (max 10MB per file)',
    filesAttached: 'Attached Files',
    contactLabel: 'Contact Preferences',
    contactDescription: 'Providing contact details is optional. If you choose to share them, they will be encrypted and only used to request additional information if needed.',
    contactNone: 'I prefer to remain completely anonymous',
    contactEmail: 'I am willing to be contacted via secure email',
    contactPhone: 'I am willing to be contacted via phone',
    emailPlaceholder: 'Enter a secure email address',
    phonePlaceholder: 'Enter a phone number',
    disclaimerTitle: 'Important',
    disclaimerText: 'By submitting this report, you confirm that the information provided is accurate to the best of your knowledge.',
    prevButton: 'Previous',
    nextButton: 'Next',
    submitButton: 'Submit Report',
    submittingButton: 'Submitting...',
    successTitle: 'Report Submitted Successfully',
    successDescription: 'Thank you for your report. It has been securely submitted and will be investigated.',
    trackingCodeLabel: 'Your Tracking Code',
    trackingCodeInstructions: 'Please save this tracking code and the access token securely. You will need them to check the status of your report.',
    returnHome: 'Return to Home',
    validationRequired: 'This field is required',
    validationDescription: 'Please provide a more detailed description (at least 10 characters)',
    validationEmail: 'Please enter a valid email address',
    validationPhone: 'Please enter a valid phone number',
    errorGeneric: 'An error occurred while submitting your report. Please try again later.'
  },
  trackReport: {
    title: 'Track Your Report',
    description: 'Enter your tracking ID and access token to check the status of your whistleblowing report.',
    trackingIdLabel: 'Tracking ID',
    trackingIdPlaceholder: 'Enter your tracking ID (e.g., WB-123ABC)',
    accessTokenLabel: 'Access Token',
    accessTokenPlaceholder: 'Enter the access token provided when you submitted the report',
    accessTokenHelp: 'The access token was provided when you submitted your report.',
    checkButton: 'Check Status',
    loadingButton: 'Loading...',
    statusTitle: 'Report Status',
    reportIdLabel: 'Report ID',
    submittedLabel: 'Submitted on',
    statusLabel: 'Status',
    lastUpdatedLabel: 'Last updated',
    messagesTitle: 'Communication History',
    replyTitle: 'Reply to this Request',
    replyPlaceholder: 'Type your response here...',
    sendButton: 'Send Response',
    adminName: 'Case Manager',
    youName: 'You',
    errorNoTrackingId: 'Please enter your tracking ID',
    errorNoToken: 'Please enter your access token',
    errorInvalidCredentials: 'Invalid tracking ID or access token. Please check and try again.',
    errorGeneric: 'Unable to retrieve report status. Please try again later.',
    statuses: {
      pending: 'Pending Review',
      in_progress: 'Under Investigation',
      need_info: 'Awaiting Information',
      resolved: 'Resolved',
      closed: 'Closed',
      rejected: 'Not Proceeding'
    }
  },
  faq: {
    title: 'Frequently Asked Questions',
    contactTitle: 'Still Have Questions?',
    contactDescription: 'If you couldn\'t find the answer to your question, please contact us.',
    contactEmail: 'support@whistleblowing-platform.com',
    contactButton: 'Email Support',
    questions: [
      {
        question: 'What is whistleblowing?',
        answer: 'Whistleblowing is the act of reporting wrongdoing, illegal or unethical activities within an organization. This could include fraud, corruption, safety violations, harassment, discrimination, or other ethical concerns.\n\nWhistleblowers play an essential role in maintaining integrity and accountability within organizations.'
      },
      {
        question: 'Is my identity protected when I submit a report?',
        answer: 'Yes, the platform is designed to protect your identity. You can submit reports completely anonymously without providing any personal information.\n\nAll data is encrypted and the system is designed not to track IP addresses or other identifying information from whistleblowers. Even if you choose to provide contact information for follow-up, this information is encrypted and access is strictly limited.'
      },
      {
        question: 'What happens after I submit a report?',
        answer: 'After submission, your report is securely transmitted to authorized personnel responsible for whistleblowing investigations. You\'ll receive a unique tracking ID and access token.\n\nThe report will be reviewed and assessed according to established procedures. If needed, investigators may request additional information through the secure platform. You can check the status of your report using your tracking information.'
      },
      {
        question: 'What types of issues should I report?',
        answer: 'This platform is designed for reporting serious concerns related to unethical or illegal conduct, such as:\n\n• Accounting or financial irregularities\n• Bribery or corruption\n• Conflicts of interest\n• Data privacy violations\n• Discrimination or harassment\n• Environmental violations\n• Fraud\n• Health and safety issues\n• Insider trading\n• Retaliation\n• Theft\n\nThis platform is not intended for general grievances or minor HR issues that are better addressed through normal reporting channels.'
      },
      {
        question: 'How should I collect evidence before reporting?',
        answer: 'When collecting evidence, it\'s important to act legally and ethically. Only gather information that you have authorized access to as part of your normal duties.\n\nDo not attempt to access restricted systems or documents. Focus on documenting your observations, collecting available documents, emails, or communications that substantiate your concerns. Never record conversations without consent if this is illegal in your jurisdiction.\n\nYou can upload supporting documents when submitting your report through this platform.'
      },
      {
        question: 'Am I protected from retaliation?',
        answer: 'Many jurisdictions have legal protections for whistleblowers against retaliation. The organization is committed to protecting whistleblowers who report concerns in good faith from any form of retaliation.\n\nIf you experience what you believe is retaliation for reporting, you should report this through the whistleblowing platform immediately. Retaliation is taken very seriously and will be investigated.'
      }
    ]
  }
};

// Create language context
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [translations, setTranslations] = useState(englishTranslations);

  // Function to change language
  const setLanguage = (languageCode) => {
    // In a real application, we would load translations from a server or from imported files
    // For this implementation, we'll just use English translations
    setCurrentLanguage(languageCode);
    
    // Simulate loading translations
    console.log(`Language changed to ${languageCode}`);
    
    // In a real app, we would have different translation files
    // For now, we'll just use English for all languages
    setTranslations(englishTranslations);
  };

  // Set initial language based on browser preference
  useEffect(() => {
    const browserLanguage = navigator.language.split('-')[0];
    const supportedLanguage = languages.find(lang => lang.code === browserLanguage);
    
    if (supportedLanguage) {
      setLanguage(supportedLanguage.code);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ 
      currentLanguage, 
      setLanguage, 
      translations, 
      availableLanguages: languages 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

export default LanguageContext;