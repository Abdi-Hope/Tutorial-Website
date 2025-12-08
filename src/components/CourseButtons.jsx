import PropTypes from 'prop-types';
import {coursesData} from '../data/coursesData.js';
import '../styles/CourseButtons.css';
const CourseButtons = ({ activeCourse, setActiveCourse, setActiveChapter }) => {
  const courses = Object.keys(coursesData);
  
  return (
    <div className="course-buttons-container">
      {courses.map(course => (
        <button
          key={course}
          onClick={() => {
            setActiveCourse(course);
            setActiveChapter(0);
          }}
          className={`course-btn ${activeCourse === course ? 'active' : ''}`}
        >
          {coursesData[course].title}
        </button>
      ))}
    </div>
  );
};

CourseButtons.propTypes = {
  activeCourse: PropTypes.string.isRequired,
  setActiveCourse: PropTypes.func.isRequired,
  setActiveChapter: PropTypes.func.isRequired,
};

export default CourseButtons;