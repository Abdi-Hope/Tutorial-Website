// VideoUtils.js - REFACTORED VERSION
const logParsingStart = (content, videos) => {
  console.log('🔍 === VIDEO PARSING DEBUG START ===');
  console.log('Content type:', typeof content);
  console.log('Content length:', content?.length);
  console.log('Number of videos:', videos?.length);
  console.log('Video IDs:', videos?.map(v => v.id));
};

const validateContent = (content) => {
  if (!content) {
    console.log('❌ No content provided');
    return [];
  }
  
  if (Array.isArray(content)) {
    console.log('📋 Content is already an array');
    return content;
  }
  
  return null;
};

const findVideoMarkers = (contentString) => {
  const videoMarkers = [];
  const videoRegex = /\[video:([^\]]+)\]/g;
  let match;
  
  console.log('🔎 Searching for video markers...');
  while ((match = videoRegex.exec(contentString)) !== null) {
    console.log('🎯 Found video marker:', {
      fullMatch: match[0],
      videoId: match[1],
      position: match.index
    });
    videoMarkers.push({
      index: match.index,
      videoId: match[1].trim(),
      length: match[0].length
    });
  }
  
  return videoMarkers;
};

const addTextPart = (parts, text, description = 'text part') => {
  if (text) {
    parts.push({ type: 'text', content: text });
    console.log(`📄 Added ${description}:`, text.substring(0, 50) + '...');
  }
};

const addVideoPart = (parts, videos, videoId) => {
  const video = videos.find(v => v.id === videoId);
  if (video) {
    parts.push({ type: 'video', content: video });
    console.log(`🎥 Added video: ${video.title} (ID: ${video.id})`);
  } else {
    console.log(`❌ VIDEO NOT FOUND: No video with ID "${videoId}"`);
    console.log('Available video IDs:', videos.map(v => v.id));
  }
};

const processVideoMarkers = (contentString, videoMarkers, videos, parts) => {
  let lastIndex = 0;
  
  for (const marker of videoMarkers) {
    // Add text before video marker
    if (marker.index > lastIndex) {
      const textBefore = contentString.slice(lastIndex, marker.index).trim();
      addTextPart(parts, textBefore, `text part ${parts.length + 1}`);
    }
    
    // Add video part
    addVideoPart(parts, videos, marker.videoId);
    
    lastIndex = marker.index + marker.length;
  }
  
  return lastIndex;
};

export const parseChapterContent = (content, videos = []) => {
  logParsingStart(content, videos);
  
  const validatedContent = validateContent(content);
  if (validatedContent) return validatedContent;

  const contentString = content.toString();
  console.log('📝 Content preview:', contentString.substring(0, 200) + '...');
  
  const videoMarkers = findVideoMarkers(contentString);
  console.log('📊 Total video markers found:', videoMarkers.length);
  
  if (videoMarkers.length === 0) {
    console.log('❌ No video markers found in content');
    return [{ type: 'text', content: contentString }];
  }
  
  const parts = [];
  const lastIndex = processVideoMarkers(contentString, videoMarkers, videos, parts);
  
  // Add remaining text after last video
  const remainingText = contentString.slice(lastIndex).trim();
  addTextPart(parts, remainingText, 'final text part');
  
  console.log('✅ Final parsed parts:', parts);
  console.log('🔍 === VIDEO PARSING DEBUG END ===');
  
  return parts;
};

export const getChapterVideos = (chapter) => {
  return chapter?.videos || [];
};

export const hasVideos = (chapter) => {
  return chapter?.videos && chapter.videos.length > 0;
};

export const splitLongTextIntoParagraphs = (text, maxLength = 500) => {
  if (!text || typeof text !== 'string') {
    return [];
  }
  
  const paragraphs = [];
  let currentParagraph = '';
  
  const sentences = text.split(/(?<=[.!?])\s+/);
  
  for (const sentence of sentences) {
    const wouldExceedLimit = currentParagraph.length + sentence.length > maxLength;
    
    if (wouldExceedLimit && currentParagraph.length > 0) {
      paragraphs.push(currentParagraph.trim());
      currentParagraph = sentence;
    } else {
      currentParagraph += (currentParagraph ? ' ' : '') + sentence;
    }
  }
  
  if (currentParagraph.trim()) {
    paragraphs.push(currentParagraph.trim());
  }
  
  return paragraphs;
};