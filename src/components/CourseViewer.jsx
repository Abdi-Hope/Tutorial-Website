// CourseViewer.jsx
import React from 'react';
import PropTypes from 'prop-types';
import CourseButtons from './CourseButtons';
import ChaptersSidebar from './ChaptersSidebar';
import ChapterContent from './ChapterContent';
import { coursesData } from '../data/coursesData.js';
import '../styles/CourseViewer.css';  
const CourseViewer = ({ 
  activeCourse, 
  setActiveCourse, 
  activeChapter, 
  setActiveChapter 
}) => {
  const currentCourse = coursesData[activeCourse];
  const currentChapter = currentCourse.chapters[activeChapter];

  return (
    <div className="course-viewer">
      <div className="course-header">
        <CourseButtons
          activeCourse={activeCourse}
          setActiveCourse={setActiveCourse}
          setActiveChapter={setActiveChapter}
        />
      </div>
      
      <div className="course-main">
        <div className="sidebar-container">
          <ChaptersSidebar
            currentCourse={currentCourse}
            activeChapter={activeChapter}
            setActiveChapter={setActiveChapter}
          />
        </div>
        
        <div className="content-container">
          <ChapterContent
            currentChapter={currentChapter}
            currentCourse={currentCourse}
            activeChapter={activeChapter}
          />
        </div>
      </div>
    </div>
  );
};

CourseViewer.propTypes = {
  activeCourse: PropTypes.string.isRequired,
  setActiveCourse: PropTypes.func.isRequired,
  activeChapter: PropTypes.number.isRequired,
  setActiveChapter: PropTypes.func.isRequired
};

export default CourseViewer;