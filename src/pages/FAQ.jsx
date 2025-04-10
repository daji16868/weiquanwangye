// src/pages/FAQ.jsx
import React, { useState } from 'react';

function FAQ() {
  const faqs = [
    {
      category: 'General',
      questions: [
        {
          question: 'What is whistleblowing?',
          answer: 'Whistleblowing is the act of reporting wrongdoing, misconduct, or unethical behavior within an organization. It plays a crucial role in maintaining transparency and accountability.',
        },
        {
          question: 'Is my identity protected?',
          answer: 'Yes, your identity is protected through our secure anonymous reporting system. You can choose to remain completely anonymous or provide contact information for follow-up.',
        },
      ],
    },
    {
      category: 'Reporting Process',
      questions: [
        {
          question: 'How do I submit a report?',
          answer: 'You can submit a report through our online form. Simply click on the "Make a Report" button, fill in the required information, and submit. You\'ll receive a unique case number for tracking.',
        },
        {
          question: 'What information should I include?',
          answer: 'Include as much detail as possible: what happened, when and where it occurred, who was involved, and any supporting evidence. The more information you provide, the better we can investigate.',
        },
      ],
    },
    {
      category: 'Follow-up',
      questions: [
        {
          question: 'How can I track my report?',
          answer: 'You can track your report using the unique case number provided after submission. If you chose to provide contact information, we may reach out for additional details.',
        },
        {
          question: 'How long does the investigation take?',
          answer: 'Investigation timelines vary depending on the complexity of the case. We strive to handle all reports promptly while ensuring thorough investigation.',
        },
      ],
    },
  ];

  const [openCategory, setOpenCategory] = useState('General');
  const [openQuestions, setOpenQuestions] = useState({});

  const toggleQuestion = (categoryIndex, questionIndex) => {
    setOpenQuestions((prev) => ({
      ...prev,
      [`${categoryIndex}-${questionIndex}`]: !prev[`${categoryIndex}-${questionIndex}`],
    }));
  };

  return (
    <div className="pt-24 pb-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h1>

        <div className="space-y-6">
          {faqs.map((category, categoryIndex) => (
            <div key={category.category} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left bg-[#003366] text-white flex justify-between items-center"
                onClick={() => setOpenCategory(category.category)}
              >
                <span className="text-lg font-semibold">{category.category}</span>
                <svg
                  className={`w-6 h-6 transition-transform duration-200 ${
                    openCategory === category.category ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openCategory === category.category && (
                <div className="p-6 space-y-4">
                  {category.questions.map((item, questionIndex) => (
                    <div key={questionIndex} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                      <button
                        className="w-full text-left flex justify-between items-center"
                        onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                      >
                        <span className="text-lg font-medium text-gray-900">{item.question}</span>
                        <svg
                          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                            openQuestions[`${categoryIndex}-${questionIndex}`] ? 'transform rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {openQuestions[`${categoryIndex}-${questionIndex}`] && (
                        <p className="mt-4 text-gray-600">{item.answer}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FAQ;