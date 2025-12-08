export const features = [
  { id: 'midterm-exams', icon: '📝', title: 'Mid-Term Exams', description: 'Comprehensive exams to test your progress halfway through courses' },
  { id: 'final-exams', icon: '🎯', title: 'Final Exams', description: 'Complete course assessments with detailed feedback' },
  { id: 'practice-quizzes', icon: '🧠', title: 'Practice Quizzes', description: 'Reinforce learning with interactive quizzes' },
  { id: 'progress-tracking', icon: '📊', title: 'Progress Tracking', description: 'Monitor your learning journey with analytics' }
];

export const departments = [
  { 
    id: 'cs-dept', 
    name: 'Computer Science', 
    exams: 12, 
    color: '#3B82F6',
    courses: [
      { id: 'cs-course-1', name: 'Programming Fundamentals' },
      { id: 'cs-course-2', name: 'Data Structures' },
      { id: 'cs-course-3', name: 'Algorithms' },
      { id: 'cs-course-4', name: 'Web Development' }
    ]
  },
  { 
    id: 'math-dept', 
    name: 'Mathematics', 
    exams: 8, 
    color: '#EF4444',
    courses: [
      { id: 'math-course-1', name: 'Calculus I' },
      { id: 'math-course-2', name: 'Linear Algebra' },
      { id: 'math-course-3', name: 'Discrete Mathematics' }
    ]
  },
  { 
    id: 'phy-dept', 
    name: 'Physics', 
    exams: 5, 
    color: '#10B981',
    courses: [
      { id: 'phy-course-1', name: 'Classical Mechanics' },
      { id: 'phy-course-2', name: 'Electromagnetism' }
    ]
  }
];

export const banks = [
  {
    id: 'telebirr',
    name: 'Telebirr',
    icon: '📱',
    color: '#10B981',
    description: 'Ethio Telecom Mobile Money',
    phoneNumber: '*127#',
    accountInfo: 'Send to: 2519XXXXXXX',
    steps: ['Dial *127#', 'Choose "Send Money"', 'Enter phone: 2519XXXXXXX', 'Enter 100 ETB', 'Add note: "Exam Access"', 'Confirm payment']
  },
  // ... other banks
];