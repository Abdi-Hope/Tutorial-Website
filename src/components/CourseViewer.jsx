// CourseViewer.jsx - Simplified
import React from 'react';
import PropTypes from 'prop-types';
import CourseButtons from './CourseButtons';
import ChapterLayout from './ChapterContent';
import Sidebar from './Sidebar';
import { coursesData } from '../data/coursesData.js';
import '../styles/CourseViewer.css';

const CourseViewer = ({ 
  activeCourse, 
  setActiveCourse, 
  activeChapter, 
  setActiveChapter 
}) => {
  const currentCourse = coursesData[activeCourse];
  
  const chapters = currentCourse.chapters.map((chapter, index) => ({
    id: index,
    title: chapter.title,
    content: chapter.content,
    isPremium: !chapter.isFree,
    icon: null
  }));

  const handleChapterSelect = (chapterId) => {
    setActiveChapter(chapterId);
  };

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
        <div className="main-content">
          <ChapterLayout
            chapters={chapters}
            activeChapterId={activeChapter}
            onChapterSelect={handleChapterSelect}
            currentCourse={currentCourse}
          >
            <div className="content-text">
              {currentCourse.chapters[activeChapter].content.split('\n').map((line, index) => (
                <p key={`${index}-${line.substring(0, 20)}`}>{line}</p>
              ))}
            </div>
          </ChapterLayout>
        </div>
        
        <div className="sidebar-area">
          <Sidebar 
            activeChapter={activeChapter}
            currentCourse={currentCourse}
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