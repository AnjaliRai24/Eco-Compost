import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileVideo, Check, X, AlertCircle, ExternalLink } from "lucide-react";
import { uploadVideo, validateVideoFile, extractYouTubeVideoId, generateYouTubeEmbedUrl, generateYouTubeThumbnail } from "@/utils/videoUpload";

export const VideoUpload = () => {
  const [videos, setVideos] = useState({
    en: null as File | null,
    hi: null as File | null,
    mr: null as File | null,
  });

  const [uploading, setUploading] = useState(false);
  const [uploadResults, setUploadResults] = useState<{[key: string]: string}>({});
  const [youtubeUrls, setYoutubeUrls] = useState<{[key: string]: string}>({});

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'mr', name: 'मराठी', flag: '🇮🇳' }
  ];

  const handleFileUpload = (language: string, file: File | null) => {
    if (file) {
      const validation = validateVideoFile(file);
      if (!validation.valid) {
        alert(validation.message);
        return;
      }
    }
    
    setVideos(prev => ({
      ...prev,
      [language]: file
    }));
  };

  const handleYouTubeUrl = (language: string, url: string) => {
    setYoutubeUrls(prev => ({
      ...prev,
      [language]: url
    }));
  };

  const handleUpload = async () => {
    setUploading(true);
    const results: {[key: string]: string} = {};
    
    for (const [language, file] of Object.entries(videos)) {
      if (file) {
        const result = await uploadVideo(file, language);
        results[language] = result.success ? result.videoUrl || '' : result.message;
      }
    }
    
    setUploadResults(results);
    setUploading(false);
    
    // Show success message with instructions
    alert('Videos processed! Check the results below and update your VideoSection component.');
  };

  const removeVideo = (language: string) => {
    setVideos(prev => ({
      ...prev,
      [language]: null
    }));
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileVideo className="h-6 w-6 text-primary" />
          Upload Tutorial Videos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {languages.map((language) => (
          <div key={language.code} className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{language.flag}</span>
              <Label className="text-lg font-semibold">{language.name} Video</Label>
            </div>
            
            <div className="space-y-3">
              {/* File Upload */}
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Input
                    type="file"
                    accept="video/*"
                    onChange={(e) => handleFileUpload(language.code, e.target.files?.[0] || null)}
                    className="cursor-pointer"
                  />
                </div>
              </div>
              
              {/* YouTube URL Alternative */}
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Input
                    type="url"
                    placeholder="Or paste YouTube URL here"
                    value={youtubeUrls[language.code] || ''}
                    onChange={(e) => handleYouTubeUrl(language.code, e.target.value)}
                  />
                </div>
              </div>
              
              {/* File Status */}
              {videos[language.code as keyof typeof videos] && (
                <div className="flex items-center gap-2 p-2 bg-green-50 rounded-md">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600">
                    {videos[language.code as keyof typeof videos]?.name}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => removeVideo(language.code)}
                    className="h-6 w-6 p-0 ml-auto"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              )}
              
              {/* YouTube URL Status */}
              {youtubeUrls[language.code] && (
                <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-md">
                  <ExternalLink className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-blue-600">
                    YouTube URL provided
                  </span>
                </div>
              )}
              
              {/* Upload Result */}
              {uploadResults[language.code] && (
                <div className="p-3 bg-gray-50 rounded-md">
                  <p className="text-sm font-medium mb-2">Generated URL:</p>
                  <code className="text-xs bg-white p-2 rounded border block break-all">
                    {uploadResults[language.code]}
                  </code>
                </div>
              )}
            </div>
          </div>
        ))}
        
        <div className="pt-4 border-t space-y-4">
          <Button 
            onClick={handleUpload}
            disabled={uploading || (Object.values(videos).every(v => v === null) && Object.values(youtubeUrls).every(v => !v))}
            className="w-full"
          >
            <Upload className="h-4 w-4 mr-2" />
            {uploading ? 'Processing...' : 'Process Videos'}
          </Button>
          
          {Object.keys(uploadResults).length > 0 && (
            <div className="p-4 bg-blue-50 rounded-md">
              <h4 className="font-semibold text-blue-900 mb-2">Next Steps:</h4>
              <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                <li>Copy the generated URLs above</li>
                <li>Open <code>src/components/VideoSection.tsx</code></li>
                <li>Replace the placeholder URLs in the <code>videos</code> object</li>
                <li>Save and refresh your website</li>
              </ol>
            </div>
          )}
        </div>
        
        <div className="text-sm text-muted-foreground">
          <p><strong>Recommended video specifications:</strong></p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Format: MP4, WebM, or MOV</li>
            <li>Resolution: 1080p (1920x1080) or higher</li>
            <li>Duration: 3-5 minutes</li>
            <li>File size: Under 100MB</li>
            <li>Audio: Clear narration in the respective language</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
