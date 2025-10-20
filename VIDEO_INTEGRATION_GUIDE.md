# 📹 Video Integration Guide for EcoCompost

## 🚀 Quick Start - Adding Your Videos

### **Option 1: Local Video Files (Recommended for Testing)**

1. **Create a videos folder** in your `public` directory:
   ```
   public/
   ├── videos/
   │   ├── tutorial-en.mp4
   │   ├── tutorial-hi.mp4
   │   └── tutorial-mr.mp4
   └── images/
       ├── video-thumb-en.jpg
       ├── video-thumb-hi.jpg
       └── video-thumb-mr.jpg
   ```

2. **Update the VideoSection component** (`src/components/VideoSection.tsx`):
   ```typescript
   const videos = {
     en: {
       title: "How EcoCompost Works",
       description: "Learn how to use our waste management and composting platform in English",
       videoUrl: "/videos/tutorial-en.mp4", // Your English video
       thumbnail: "/images/video-thumb-en.jpg", // Your thumbnail
       duration: "3:45"
     },
     // ... other languages
   };
   ```

### **Option 2: YouTube Integration (Recommended for Production)**

1. **Upload your videos to YouTube** (private or unlisted)
2. **Get the video IDs** from YouTube URLs
3. **Update the VideoSection component**:

```typescript
const videos = {
  en: {
    title: "How EcoCompost Works",
    description: "Learn how to use our waste management and composting platform in English",
    videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID_HERE",
    thumbnail: "https://img.youtube.com/vi/YOUR_VIDEO_ID_HERE/maxresdefault.jpg",
    duration: "3:45"
  },
  hi: {
    title: "EcoCompost कैसे काम करता है",
    description: "हमारे कचरा प्रबंधन और खाद बनाने के प्लेटफॉर्म का उपयोग कैसे करें",
    videoUrl: "https://www.youtube.com/embed/YOUR_HINDI_VIDEO_ID",
    thumbnail: "https://img.youtube.com/vi/YOUR_HINDI_VIDEO_ID/maxresdefault.jpg",
    duration: "4:12"
  },
  mr: {
    title: "EcoCompost कसे काम करते",
    description: "आमच्या कचरा व्यवस्थापन आणि खत तयार करण्याच्या प्लॅटफॉर्मचा वापर कसा करावा",
    videoUrl: "https://www.youtube.com/embed/YOUR_MARATHI_VIDEO_ID",
    thumbnail: "https://img.youtube.com/vi/YOUR_MARATHI_VIDEO_ID/maxresdefault.jpg",
    duration: "3:58"
  }
};
```

### **Option 3: Vimeo Integration**

```typescript
const videos = {
  en: {
    title: "How EcoCompost Works",
    description: "Learn how to use our waste management and composting platform in English",
    videoUrl: "https://player.vimeo.com/video/YOUR_VIMEO_VIDEO_ID",
    thumbnail: "/images/video-thumb-en.jpg",
    duration: "3:45"
  },
  // ... other languages
};
```

---

## 📁 File Structure Setup

### **Step 1: Create Directories**
```bash
mkdir public/videos
mkdir public/images
```

### **Step 2: Add Your Video Files**
- Place your video files in `public/videos/`
- Place thumbnail images in `public/images/`

### **Step 3: Update Component**
- Edit `src/components/VideoSection.tsx`
- Replace the placeholder URLs with your actual file paths

---

## 🎬 Video Specifications

### **Recommended Video Settings:**
- **Format:** MP4 (H.264 codec)
- **Resolution:** 1080p (1920x1080) or higher
- **Frame Rate:** 30fps
- **Audio:** AAC codec, 128kbps
- **File Size:** Under 100MB for web upload
- **Duration:** 3-5 minutes

### **Thumbnail Specifications:**
- **Format:** JPG or PNG
- **Resolution:** 1280x720 (16:9 aspect ratio)
- **File Size:** Under 2MB

---

## 🔧 Troubleshooting

### **Video Not Playing?**
1. **Check file paths** - Make sure videos are in `public/videos/`
2. **Check file formats** - Use MP4 with H.264 codec
3. **Check browser support** - Test in different browsers
4. **Check file size** - Large files may not load properly

### **YouTube Videos Not Working?**
1. **Check video ID** - Extract from YouTube URL correctly
2. **Check video privacy** - Make sure it's not private
3. **Check embedding** - Enable embedding in YouTube settings

### **Performance Issues?**
1. **Optimize video files** - Use compression tools
2. **Use CDN** - For better loading speeds
3. **Add loading states** - Show progress while loading

---

## 🚀 Quick Implementation Steps

1. **Upload your videos** to YouTube (recommended) or place in `public/videos/`
2. **Edit the VideoSection component** with your video URLs
3. **Test the functionality** on your local server
4. **Deploy to production** when ready

---

## 📞 Need Help?

If you're still having issues:
1. **Check the browser console** for error messages
2. **Verify file paths** are correct
3. **Test with a sample video** first
4. **Use YouTube integration** for easier setup

The video system is ready - you just need to add your actual video URLs to make it work! 🎉
