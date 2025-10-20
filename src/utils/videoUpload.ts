// Video upload utility functions

export interface VideoUploadResult {
  success: boolean;
  message: string;
  videoUrl?: string;
  thumbnailUrl?: string;
}

// Mock upload function - replace with actual upload logic
export const uploadVideo = async (
  file: File,
  language: string
): Promise<VideoUploadResult> => {
  try {
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // For now, we'll just create a local URL
    const videoUrl = URL.createObjectURL(file);
    const thumbnailUrl = generateThumbnail(file);
    
    // In a real implementation, you would:
    // 1. Upload to your server/cloud storage
    // 2. Process the video
    // 3. Generate thumbnails
    // 4. Return the actual URLs
    
    return {
      success: true,
      message: `Video uploaded successfully for ${language}`,
      videoUrl,
      thumbnailUrl
    };
  } catch (error) {
    return {
      success: false,
      message: `Failed to upload video: ${error}`
    };
  }
};

// Generate thumbnail from video file
const generateThumbnail = (file: File): string => {
  // This is a simplified version
  // In a real implementation, you would extract a frame from the video
  return URL.createObjectURL(file);
};

// Validate video file
export const validateVideoFile = (file: File): { valid: boolean; message: string } => {
  const maxSize = 100 * 1024 * 1024; // 100MB
  const allowedTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
  
  if (file.size > maxSize) {
    return {
      valid: false,
      message: 'File size must be under 100MB'
    };
  }
  
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      message: 'File must be MP4, WebM, or MOV format'
    };
  }
  
  return {
    valid: true,
    message: 'File is valid'
  };
};

// YouTube URL helpers
export const extractYouTubeVideoId = (url: string): string | null => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export const generateYouTubeEmbedUrl = (videoId: string): string => {
  return `https://www.youtube.com/embed/${videoId}`;
};

export const generateYouTubeThumbnail = (videoId: string): string => {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};
