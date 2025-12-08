import React, { useState, useRef, useEffect } from 'react';
import '../styles/Module.css';
const ModuleButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDept, setActiveDept] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [downloading, setDownloading] = useState(null);
  const [showTopScroll, setShowTopScroll] = useState(false);
  const [showBottomScroll, setShowBottomScroll] = useState(false);
  const dropdownRef = useRef(null);
  const listContainerRef = useRef(null);

  // Expanded sample module data structure
  const MODULE_DATA = {
    'Freshman Courses': {
      'Programming Fundamentals': {
        'Chapter 1: Introduction to Programming': '/pdfs/cs/pf/ch1.pdf',
        'Chapter 2: Data Types and Variables': '/pdfs/cs/pf/ch2.pdf',
        'Chapter 3: Control Structures': '/pdfs/cs/pf/ch3.pdf',
        'Chapter 4: Functions and Modules': '/pdfs/cs/pf/ch4.pdf',
        'Chapter 5: Object-Oriented Programming': '/pdfs/cs/pf/ch5.pdf'
      },
      'Pre-Engineering': {
        'Chapter 1: Arrays and Lists': '/pdfs/cs/ds/ch1.pdf',
        'Chapter 2: Stacks and Queues': '/pdfs/cs/ds/ch2.pdf',
        'Chapter 3: Trees and Graphs': '/pdfs/cs/ds/ch3.pdf',
        'Chapter 4: Hash Tables': '/pdfs/cs/ds/ch4.pdf',
        'Chapter 5: Algorithm Analysis': '/pdfs/cs/ds/ch5.pdf'
      },
      'Algorithms': {
        'Chapter 1: Sorting Algorithms': '/pdfs/cs/algo/ch1.pdf',
        'Chapter 2: Searching Algorithms': '/pdfs/cs/algo/ch2.pdf',
        'Chapter 3: Dynamic Programming': '/pdfs/cs/algo/ch3.pdf',
        'Chapter 4: Greedy Algorithms': '/pdfs/cs/algo/ch4.pdf'
      },
      'Computer Architecture': {
        'Chapter 1: Digital Logic': '/pdfs/cs/arch/ch1.pdf',
        'Chapter 2: CPU Design': '/pdfs/cs/arch/ch2.pdf',
        'Chapter 3: Memory Hierarchy': '/pdfs/cs/arch/ch3.pdf'
      },
      'Database Systems': {
        'Chapter 1: SQL Basics': '/pdfs/cs/db/ch1.pdf',
        'Chapter 2: Normalization': '/pdfs/cs/db/ch2.pdf',
        'Chapter 3: Transactions': '/pdfs/cs/db/ch3.pdf'
      }
    },
    'Mathematics': {
      'Calculus I': {
        'Chapter 1: Limits and Continuity': '/pdfs/math/calc1/ch1.pdf',
        'Chapter 2: Derivatives': '/pdfs/math/calc1/ch2.pdf',
        'Chapter 3: Applications of Derivatives': '/pdfs/math/calc1/ch3.pdf',
        'Chapter 4: Integration': '/pdfs/math/calc1/ch4.pdf'
      },
      'Calculus II': {
        'Chapter 1: Integration Techniques': '/pdfs/math/calc2/ch1.pdf',
        'Chapter 2: Applications of Integration': '/pdfs/math/calc2/ch2.pdf',
        'Chapter 3: Sequences and Series': '/pdfs/math/calc2/ch3.pdf'
      },
      'Linear Algebra': {
        'Chapter 1: Matrices': '/pdfs/math/la/ch1.pdf',
        'Chapter 2: Vector Spaces': '/pdfs/math/la/ch2.pdf',
        'Chapter 3: Linear Transformations': '/pdfs/math/la/ch3.pdf',
        'Chapter 4: Eigenvalues': '/pdfs/math/la/ch4.pdf'
      },
      'Discrete Math': {
        'Chapter 1: Logic and Proofs': '/pdfs/math/dm/ch1.pdf',
        'Chapter 2: Sets and Functions': '/pdfs/math/dm/ch2.pdf',
        'Chapter 3: Combinatorics': '/pdfs/math/dm/ch3.pdf'
      },
      'Probability & Statistics': {
        'Chapter 1: Probability Theory': '/pdfs/math/prob/ch1.pdf',
        'Chapter 2: Random Variables': '/pdfs/math/prob/ch2.pdf',
        'Chapter 3: Statistical Inference': '/pdfs/math/prob/ch3.pdf'
      }
    },
    'Physics': {
      'Mechanics': {
        'Chapter 1: Kinematics': '/pdfs/physics/mech/ch1.pdf',
        'Chapter 2: Dynamics': '/pdfs/physics/mech/ch2.pdf',
        'Chapter 3: Work and Energy': '/pdfs/physics/mech/ch3.pdf',
        'Chapter 4: Rotational Motion': '/pdfs/physics/mech/ch4.pdf'
      },
      'Electromagnetism': {
        'Chapter 1: Electric Fields': '/pdfs/physics/em/ch1.pdf',
        'Chapter 2: Magnetic Fields': '/pdfs/physics/em/ch2.pdf',
        'Chapter 3: Electromagnetic Waves': '/pdfs/physics/em/ch3.pdf'
      },
      'Thermodynamics': {
        'Chapter 1: Laws of Thermodynamics': '/pdfs/physics/thermo/ch1.pdf',
        'Chapter 2: Heat Engines': '/pdfs/physics/thermo/ch2.pdf',
        'Chapter 3: Entropy': '/pdfs/physics/thermo/ch3.pdf'
      },
      'Modern Physics': {
        'Chapter 1: Relativity': '/pdfs/physics/modern/ch1.pdf',
        'Chapter 2: Quantum Mechanics': '/pdfs/physics/modern/ch2.pdf',
        'Chapter 3: Nuclear Physics': '/pdfs/physics/modern/ch3.pdf'
      },
      'Waves & Optics': {
        'Chapter 1: Wave Motion': '/pdfs/physics/waves/ch1.pdf',
        'Chapter 2: Sound Waves': '/pdfs/physics/waves/ch2.pdf',
        'Chapter 3: Geometric Optics': '/pdfs/physics/waves/ch3.pdf'
      }
    },
    'Natural Science': {
      'Mechanics': {
        'Chapter 1: Kinematics': '/pdfs/physics/mech/ch1.pdf',
        'Chapter 2: Dynamics': '/pdfs/physics/mech/ch2.pdf',
        'Chapter 3: Work and Energy': '/pdfs/physics/mech/ch3.pdf',
        'Chapter 4: Rotational Motion': '/pdfs/physics/mech/ch4.pdf'
      },
      'Electromagnetism': {
        'Chapter 1: Electric Fields': '/pdfs/physics/em/ch1.pdf',
        'Chapter 2: Magnetic Fields': '/pdfs/physics/em/ch2.pdf',
        'Chapter 3: Electromagnetic Waves': '/pdfs/physics/em/ch3.pdf'
      },
      'Thermodynamics': {
        'Chapter 1: Laws of Thermodynamics': '/pdfs/physics/thermo/ch1.pdf',
        'Chapter 2: Heat Engines': '/pdfs/physics/thermo/ch2.pdf',
        'Chapter 3: Entropy': '/pdfs/physics/thermo/ch3.pdf'
      },
      'Modern Physics': {
        'Chapter 1: Relativity': '/pdfs/physics/modern/ch1.pdf',
        'Chapter 2: Quantum Mechanics': '/pdfs/physics/modern/ch2.pdf',
        'Chapter 3: Nuclear Physics': '/pdfs/physics/modern/ch3.pdf'
      },
      'Waves & Optics': {
        'Chapter 1: Wave Motion': '/pdfs/physics/waves/ch1.pdf',
        'Chapter 2: Sound Waves': '/pdfs/physics/waves/ch2.pdf',
        'Chapter 3: Geometric Optics': '/pdfs/physics/waves/ch3.pdf'
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (listContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = listContainerRef.current;
        setShowTopScroll(scrollTop > 5);
        setShowBottomScroll(scrollTop < scrollHeight - clientHeight - 5);
      }
    };

    const listContainer = listContainerRef.current;
    if (listContainer) {
      listContainer.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
    }

    return () => {
      if (listContainer) {
        listContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isOpen, activeDept, activeSection]);

  const closeDropdown = () => {
    setIsOpen(false);
    setActiveDept(null);
    setActiveSection(null);
    setDownloading(null);
  };

  const handleModuleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleKeyAction = (e, actionType, payload = null) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      executeAction(actionType, payload);
    } else if (e.key === 'Escape') {
      handleEscapeKey();
    }
  };

  const executeAction = (actionType, payload) => {
    const actions = {
      toggle: () => setIsOpen(!isOpen),
      dept: () => {
        setActiveDept(payload);
        setActiveSection(null);
      },
      section: () => setActiveSection(payload),
      back: handleBackNavigation,
      pdf: () => handlePdfDownload(payload.url, payload.chapter)
    };

    const action = actions[actionType];
    if (action) action();
  };

  const handleBackNavigation = () => {
    if (activeSection) {
      setActiveSection(null);
    } else if (activeDept) {
      setActiveDept(null);
    }
  };

  const handleEscapeKey = () => {
    if (activeSection) {
      setActiveSection(null);
    } else if (activeDept) {
      setActiveDept(null);
    } else {
      setIsOpen(false);
    }
  };

  const handlePdfDownload = async (pdfUrl, chapterName) => {
    setDownloading(chapterName);
    
    try {
      const link = document.createElement('a');
      link.href = pdfUrl;
      const fileName = pdfUrl.split('/').pop() || `${chapterName.replaceAll(/[^a-zA-Z0-9]/g, '_')}.pdf`;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setTimeout(() => {
        setDownloading(null);
      }, 1000);
      
    } catch (error) {
      console.error('Download failed:', error);
      setDownloading(null);
    }
  };

  // Add the missing functions here
  const handleDeptSelect = (dept) => {
    setActiveDept(dept);
    setActiveSection(null);
  };

  const handleSectionSelect = (section) => {
    setActiveSection(section);
  };

  const calculateTotalSections = () => {
    const departments = Object.keys(MODULE_DATA);
    return departments.reduce((acc, dept) => acc + Object.keys(MODULE_DATA[dept]).length, 0);
  };

  const calculateTotalChapters = () => {
    const departments = Object.keys(MODULE_DATA);
    return departments.reduce((acc, dept) => 
      acc + Object.values(MODULE_DATA[dept]).reduce((secAcc, section) => 
        secAcc + Object.keys(section).length, 0), 0);
  };

  const getStatNumber = () => {
    const departments = Object.keys(MODULE_DATA);
    const sections = activeDept ? Object.keys(MODULE_DATA[activeDept]) : [];
    const chapters = activeDept && activeSection ? MODULE_DATA[activeDept][activeSection] : {};

    if (activeDept && activeSection) {
      return Object.keys(chapters).length;
    }
    if (activeDept) {
      return sections.length;
    }
    return departments.length;
  };

  const getStatLabel = () => {
    if (activeDept && activeSection) return 'Chapters';
    if (activeDept) return 'Sections';
    return 'Departments';
  };

  const renderBreadcrumb = () => (
    <div className="module-breadcrumb">
      <button
        className={`breadcrumb-item ${activeDept ? '' : 'active'}`}
        onClick={handleBackNavigation}
        onKeyDown={(e) => handleKeyAction(e, 'back')}
      >
        Departments
      </button>
      {activeDept && (
        <>
          <span className="breadcrumb-separator">›</span>
          <button
            className={`breadcrumb-item ${activeSection ? '' : 'active'}`}
            onClick={() => setActiveSection(null)}
            onKeyDown={(e) => handleKeyAction(e, 'back')}
          >
            {activeDept}
          </button>
        </>
      )}
      {activeSection && (
        <>
          <span className="breadcrumb-separator">›</span>
          <button className="breadcrumb-item active">
            {activeSection}
          </button>
        </>
      )}
    </div>
  );

  const renderDepartments = () => {
    const departments = Object.keys(MODULE_DATA);
    
    return (
      <div className="module-list">
        <h3 className="module-list-title">Departments ({departments.length})</h3>
        {departments.map(dept => (
          <button
            key={dept}
            className="module-item dept-item"
            onClick={() => handleDeptSelect(dept)}
            onKeyDown={(e) => handleKeyAction(e, 'dept', dept)}
          >
            <span className="item-icon">📚</span>
            <span className="item-text">{dept}</span>
            <span className="item-count">
              {Object.keys(MODULE_DATA[dept]).length}
            </span>
            <span className="item-arrow">›</span>
          </button>
        ))}
      </div>
    );
  };

  const renderSections = () => {
    const sections = activeDept ? Object.keys(MODULE_DATA[activeDept]) : [];
    
    return (
      <div className="module-list">
        <h3 className="module-list-title">{activeDept} ({sections.length})</h3>
        {sections.map(section => (
          <button
            key={section}
            className="module-item section-item"
            onClick={() => handleSectionSelect(section)}
            onKeyDown={(e) => handleKeyAction(e, 'section', section)}
          >
            <span className="item-icon">📖</span>
            <span className="item-text">{section}</span>
            <span className="item-count">
              {Object.keys(MODULE_DATA[activeDept][section]).length}
            </span>
            <span className="item-arrow">›</span>
          </button>
        ))}
      </div>
    );
  };

  const renderChapters = () => {
    const chapters = activeDept && activeSection ? MODULE_DATA[activeDept][activeSection] : {};
    const chapterEntries = Object.entries(chapters);
    
    return (
      <div className="module-list">
        <h3 className="module-list-title">{activeSection} ({chapterEntries.length})</h3>
        {chapterEntries.map(([chapter, pdfUrl]) => (
          <button
            key={chapter}
            className={`module-item chapter-item ${downloading === chapter ? 'downloading' : ''}`}
            onClick={() => handlePdfDownload(pdfUrl, chapter)}
            onKeyDown={(e) => handleKeyAction(e, 'pdf', { url: pdfUrl, chapter })}
            disabled={downloading === chapter}
          >
            <span className="item-icon">
              {downloading === chapter ? '⏳' : '📄'}
            </span>
            <span className="item-text">{chapter}</span>
            <span className={`pdf-badge ${downloading === chapter ? 'downloading' : ''}`}>
              {downloading === chapter ? '...' : 'PDF'}
            </span>
          </button>
        ))}
      </div>
    );
  };

  const renderStats = () => (
    <div className="module-stats">
      <div className="stat-item">
        <span className="stat-number">{getStatNumber()}</span>
        <span className="stat-label">{getStatLabel()}</span>
      </div>
      <div className="stat-item">
        <span className="stat-number">{calculateTotalSections()}</span>
        <span className="stat-label">Sections</span>
      </div>
      <div className="stat-item">
        <span className="stat-number">{calculateTotalChapters()}</span>
        <span className="stat-label">Chapters</span>
      </div>
    </div>
  );

  const renderEmptyState = (type) => {
    const emptyStates = {
      departments: {
        icon: '📚',
        title: 'No Departments',
        message: 'No departments available.',
        action: 'Reload'
      },
      sections: {
        icon: '📖',
        title: 'No Sections',
        message: `No sections in ${activeDept}.`,
        action: 'Back'
      },
      chapters: {
        icon: '📄',
        title: 'No Chapters',
        message: `No chapters in ${activeSection}.`,
        action: 'Back'
      }
    };

    const state = emptyStates[type] || emptyStates.departments;

    return (
      <div className="module-empty-state">
        <div className="empty-state-icon">{state.icon}</div>
        <h3 className="empty-state-title">{state.title}</h3>
        <p className="empty-state-message">{state.message}</p>
        <button 
          className="empty-state-action"
          onClick={handleBackNavigation}
        >
          {state.action}
        </button>
      </div>
    );
  };

  const renderContent = () => {
    const departments = Object.keys(MODULE_DATA);
    const sections = activeDept ? Object.keys(MODULE_DATA[activeDept]) : [];
    const chapters = activeDept && activeSection ? MODULE_DATA[activeDept][activeSection] : {};

    if (activeDept && activeSection) {
      const chapterEntries = Object.entries(chapters);
      return chapterEntries.length > 0 ? renderChapters() : renderEmptyState('chapters');
    }
    
    if (activeDept) {
      return sections.length > 0 ? renderSections() : renderEmptyState('sections');
    }
    
    return departments.length > 0 ? renderDepartments() : renderEmptyState('departments');
  };

  return (
    <div className="module-container" ref={dropdownRef}>
      <button
        className={`module-button ${isOpen ? 'active' : ''}`}
        onClick={handleModuleClick}
        onKeyDown={(e) => handleKeyAction(e, 'toggle')}
        aria-expanded={isOpen}
        aria-haspopup="true"
        tabIndex={0}
      >
        <span className="button-text">MODULES</span>
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`} aria-hidden="true">
          ▼
        </span>
        {isOpen && (
          <span className="active-indicator" aria-hidden="true">•</span>
        )}
      </button>

      {isOpen && (
        <div className="module-dropdown">
          {renderBreadcrumb()}
          
          <div className="module-content">
            <div 
              className="module-list-container"
              ref={listContainerRef}
            >
              <div 
                className={`scroll-indicator top ${showTopScroll ? 'visible' : ''}`}
              />
              
              {renderContent()}
              
              <div 
                className={`scroll-indicator bottom ${showBottomScroll ? 'visible' : ''}`}
              />
            </div>
          </div>
          
          {renderStats()}
        </div>
      )}
    </div>
  );
};

export default ModuleButton;