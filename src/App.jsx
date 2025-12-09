// App.jsx - Updated for overlapping sidebar
import { useState, useEffect } from 'react';

// Components
import Header from './components/Header.jsx';
import CourseButtons from './components/CourseButtons';
import ChapterLayout from './components/ChapterContent';
import Sidebar from './components/Sidebar';
import ChapterSidebar from './components/ChapterSidebar';
import FixedToggle from './components/FixedToggle';

// Data
import { coursesData } from './data/coursesData.js';

// Styles
import './App.css';

function App() {
  // State management
  const [activeCourse, setActiveCourse] = useState('c++');
  const [activeChapter, setActiveChapter] = useState(0);
  const [isChapterSidebarOpen, setIsChapterSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size for responsive behavior
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1200);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Current course data
  const currentCourse = coursesData[activeCourse];
  
  // Prepare chapters data
  const chapters = currentCourse.chapters.map((chapter, index) => ({
    id: index,
    title: chapter.title,
    content: chapter.content,
    isPremium: !chapter.isFree,
  }));

  // Event handlers
  const handleCourseSelect = (course) => {
    setActiveCourse(course);
    setActiveChapter(0);
  };

  const handleChapterSelect = (chapterId) => {
    setActiveChapter(chapterId);
  };

  const toggleChapterSidebar = () => {
    setIsChapterSidebarOpen(!isChapterSidebarOpen);
  };

  return (
    <div className="app">
      {/* Fixed Toggle Button */}
      <FixedToggle 
        isOpen={isChapterSidebarOpen}
        onClick={toggleChapterSidebar}
      />

      {/* Header Section */}
      <header className="app-header">
        <Header />
        <CourseButtons
          activeCourse={activeCourse}
          setActiveCourse={handleCourseSelect}
          setActiveChapter={setActiveChapter}
        />
      </header>

      {/* Main Content Area */}
      <main className="app-main">
        {/* Left: Chapter Sidebar - Overlay on mobile, fixed on desktop */}
        <div className={`chapter-sidebar-container ${isChapterSidebarOpen ? 'open' : 'closed'} ${isMobile ? 'mobile' : 'desktop'}`}>
          {isChapterSidebarOpen && (
            <ChapterSidebar
              chapters={chapters}
              activeChapterId={activeChapter}
              onChapterSelect={handleChapterSelect}
              currentCourse={currentCourse}
              onClose={() => isMobile && setIsChapterSidebarOpen(false)}
            />
          )}
        </div>

        {/* Middle: Chapter Content */}
        <section className={`main-content ${isChapterSidebarOpen && isMobile ? 'with-overlay' : ''}`}>
          <ChapterLayout
            chapters={chapters}
            activeChapterId={activeChapter}
            onChapterSelect={handleChapterSelect}
          />
        </section>

        {/* Right: AI Sidebar */}
        <aside className="app-sidebar">
          <Sidebar
            activeChapter={activeChapter}
            currentCourse={currentCourse}
          />
        </aside>
      </main>

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isChapterSidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setIsChapterSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export default App;