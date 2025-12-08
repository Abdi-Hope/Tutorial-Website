import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import CourseViewer from "./components/CourseViewer";
import Sidebar from "./components/Sidebar";
import { coursesData } from "./data/coursesData";

function App() {
  const [activeCourse, setActiveCourse] = useState("c++");
  const [activeChapter, setActiveChapter] = useState(0);

  const currentCourse = coursesData[activeCourse];

  return (
    <div className="parent">
      <Header />
      
      {/* Main Content Area */}
      <div className="div2 main-content">
        <CourseViewer 
          activeCourse={activeCourse}
          setActiveCourse={setActiveCourse}
          activeChapter={activeChapter}
          setActiveChapter={setActiveChapter}
        />
      </div>

      <div className="sidebar">
        <Sidebar 
          activeChapter={activeChapter}
          currentCourse={currentCourse}
        />
      </div>
    </div>
  );
}

export default App;