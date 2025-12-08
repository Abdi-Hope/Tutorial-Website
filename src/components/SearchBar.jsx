// Enhanced SearchBar component with proper keys
import React, { useState, useRef, useEffect } from 'react';
import '../styles/SearchBar.css';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Suggestions with unique IDs
  const suggestions = [
    { id: 'js-courses', text: 'JavaScript Courses' },
    { id: 'react-tutorials', text: 'React Tutorials' },
    { id: 'web-dev', text: 'Web Development' },
    { id: 'python-prog', text: 'Python Programming' }
  ];

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClear = () => {
    setSearchQuery('');
    setActiveSuggestion(-1);
    inputRef.current?.focus();
  };

  const handleVoiceSearch = () => {
    setIsListening(!isListening);
    // Add voice search implementation here
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setActiveSuggestion(-1);
  };

  const handleSuggestionClick = (suggestionText) => {
    setSearchQuery(suggestionText);
    setActiveSuggestion(-1);
    inputRef.current?.focus();
  };

  // Keyboard navigation for suggestions
  const handleKeyDown = (e) => {
    if (!searchQuery) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveSuggestion(prev => 
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveSuggestion(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        if (activeSuggestion >= 0 && filteredSuggestions[activeSuggestion]) {
          e.preventDefault();
          setSearchQuery(filteredSuggestions[activeSuggestion].text);
          setActiveSuggestion(-1);
        }
        break;
      case 'Escape':
        setActiveSuggestion(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setActiveSuggestion(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`searchBar ${searchQuery ? 'has-query' : ''}`}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search courses, tutorials..."
        value={searchQuery}
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
        aria-label="Search courses and tutorials"
        aria-expanded={searchQuery && filteredSuggestions.length > 0}
        aria-haspopup="listbox"
        aria-controls="search-suggestions"
        role="combobox"
      />
      
      {/* Clear button - Native button element */}
      {searchQuery && (
        <button 
          className="clear-btn"
          onClick={handleClear}
          aria-label="Clear search"
          type="button"
        >
          ✕
        </button>
      )}
      
      {/* Voice search button - Native button element */}
      <button 
        className={`voice-btn ${isListening ? 'listening' : ''}`}
        onClick={handleVoiceSearch}
        aria-label={isListening ? 'Stop voice search' : 'Start voice search'}
        type="button"
      >
        🎤
      </button>
      
      {/* Results count */}
      {searchQuery && (
        <span className="results-count" aria-live="polite">
          {filteredSuggestions.length} results
        </span>
      )}
      
      {/* Search suggestions - Proper listbox implementation */}
      {searchQuery && filteredSuggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="suggestions"
          id="search-suggestions"
          role="listbox"
          aria-label="Search suggestions"
        >
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={suggestion.id}
              className={`suggestion-item ${index === activeSuggestion ? 'active' : ''}`}
              onClick={() => handleSuggestionClick(suggestion.text)}
              onMouseEnter={() => setActiveSuggestion(index)}
              role="option"
              aria-selected={index === activeSuggestion}
              type="button"
            >
              {suggestion.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;