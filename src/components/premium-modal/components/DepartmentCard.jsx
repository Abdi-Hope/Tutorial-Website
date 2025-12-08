import React from 'react';
import PropTypes from 'prop-types';
import '../styles/DepartmentCard.css';

const DepartmentCard = ({ department, onSelect }) => {
  const handleClick = () => {
    console.log('📚 Department selected:', department?.name);
    if (onSelect) {
      onSelect(department);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  // Safety checks
  const departmentName = department?.name || 'Unknown Department';
  const examCount = department?.examCount || 0;
  const color = department?.color || '#3b82f6';
  const price = department?.price || '₹499';
  const courses = department?.courses || ['General Exams'];

  // Take first 3 courses
  const displayedCourses = courses.slice(0, 3);
  const hasMoreCourses = courses.length > 3;

  return (
    <div 
      className="department-card"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Select ${departmentName} department`}
      style={{ 
        borderLeftColor: color,
        cursor: 'pointer'
      }}
    >
      <div 
        className="department-color" 
        style={{ backgroundColor: color }}
        aria-hidden="true"
      ></div>
      
      <div className="department-info">
        <h4>{departmentName}</h4>
        <span className="exam-count">{examCount}+ Exams</span>
        
        <div className="department-courses">
          {displayedCourses.map((course) => (
            <span 
              key={`course-${course}-${departmentName}`} // Use unique combination
              className="course-tag"
            >
              {course}
            </span>
          ))}
          {hasMoreCourses && (
            <span className="course-more">
              +{courses.length - 3} more
            </span>
          )}
        </div>
      </div>
      
      <div className="department-action">
        <span className="select-icon" aria-hidden="true">→</span>
        <span className="price-tag">{price}</span>
      </div>
    </div>
  );
};

DepartmentCard.propTypes = {
  department: PropTypes.shape({
    name: PropTypes.string.isRequired,
    examCount: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    courses: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  onSelect: PropTypes.func
};

DepartmentCard.defaultProps = {
  onSelect: () => {}
};

export default DepartmentCard;