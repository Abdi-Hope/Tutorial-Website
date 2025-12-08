import React from 'react';
import PropTypes from 'prop-types';
import '../styles/DepartmentSelection.css';
import DepartmentCard from './DepartmentCard';

const DepartmentSelection = ({ onDepartmentSelect }) => {
  // Make sure each department has ALL required properties
  const departments = [
    { 
      id: 1, 
      name: 'Computer Science', 
      examCount: 15, 
      color: '#3b82f6', 
      price: '₹499',
      courses: ['DSA', 'OOP', 'DBMS', 'Networking', 'AI'] // ADD COURSES ARRAY
    },
    { 
      id: 2, 
      name: 'Electrical Engineering', 
      examCount: 12, 
      color: '#10b981', 
      price: '₹499',
      courses: ['Circuit Theory', 'Electronics', 'Power Systems'] // ADD COURSES ARRAY
    },
    { 
      id: 3, 
      name: 'Mechanical Engineering', 
      examCount: 10, 
      color: '#f59e0b', 
      price: '₹499',
      courses: ['Thermodynamics', 'Fluid Mechanics', 'Machine Design'] // ADD COURSES ARRAY
    },
    { 
      id: 4, 
      name: 'Civil Engineering', 
      examCount: 8, 
      color: '#ef4444', 
      price: '₹499',
      courses: ['Structural Analysis', 'Geotech', 'Transportation'] // ADD COURSES ARRAY
    },
  ];

  return (
    <div className="departments-section">
      <h3>📚 Available Departments</h3>
      <p>Select a department to unlock all its exams and question banks</p>
      
      <div className="departments-grid">
        {departments.map((dept) => (
          <DepartmentCard
            key={dept.id}
            department={dept}
            onSelect={() => onDepartmentSelect?.(dept)}
          />
        ))}
      </div>
    </div>
  );
};

DepartmentSelection.propTypes = {
  onDepartmentSelect: PropTypes.func
};

DepartmentSelection.defaultProps = {
  onDepartmentSelect: () => {}
};

export default DepartmentSelection;