// CourseButtons.jsx - Enhanced version with horizontal scrolling
import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { coursesData } from '../data/coursesData.js';
import '../styles/CourseButtons.css';

const CourseButtons = ({ activeCourse, setActiveCourse, setActiveChapter }) => {
  const courses = Object.keys(coursesData);
  const containerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  
  // Handle course selection
  const handleCourseSelect = (course) => {
    setActiveCourse(course);
    setActiveChapter(0);
  };

  // Check if we need scroll arrows
  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      const hasOverflow = scrollWidth > clientWidth;
      
      setShowLeftArrow(hasOverflow && scrollLeft > 10);
      setShowRightArrow(hasOverflow && scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Scroll handler
  const scroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = 200;
      const newScrollLeft = containerRef.current.scrollLeft + 
        (direction === 'left' ? -scrollAmount : scrollAmount);
      
      containerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  // Check scroll on mount and resize
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      
      // Initial check
      checkScroll();
      
      return () => {
        container.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, []);

  return (
    <div className="course-buttons">
      {/* Left arrow */}
      {showLeftArrow && (
        <button
          className="scroll-arrow left"
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          ‹
        </button>
      )}

      {/* Course buttons container */}
      <div className="course-buttons-container" ref={containerRef}>
        {courses.map(course => (
          <button
            key={course}
            onClick={() => handleCourseSelect(course)}
            className={`course-btn ${activeCourse === course ? 'active' : ''}`}
          >
            {coursesData[course].title}
          </button>
        ))}
      </div>

      {/* Right arrow */}
      {showRightArrow && (
        <button
          className="scroll-arrow right"
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          ›
        </button>
      )}
    </div>
  );
};

CourseButtons.propTypes = {
  activeCourse: PropTypes.string.isRequired,
  setActiveCourse: PropTypes.func.isRequired,
  setActiveChapter: PropTypes.func.isRequired,
};

export default CourseButtons;