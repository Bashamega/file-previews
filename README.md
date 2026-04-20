# React File Previews

A dynamic, extensible React component library for previewing files from URLs.

## Features
- **MIME-type Detection**: Uses `HEAD` requests to determine the file type.
- **Extensible Registry**: Easy to add support for new file types (Video, PDF, etc.).
- **TypeScript First**: Full type safety for props and registry handlers.

## Supported File Types
The following file types are supported out of the box:

- **Images**: All `image/*` types (e.g., PNG, JPEG, GIF, SVG, WebP, etc.)
- **Audio**: All `audio/*` types (e.g., MP3, WAV, OGG)
- **Video**: All `video/*` types (e.g., MP4, WebM)
- **PDF**: PDF documents (`application/pdf`)
- **Text/Code**: Plain text, JSON, JavaScript, and XML
- **Word Documents**: `.doc` and `.docx` files

## Installation
```bash
npm install react-file-previews
```

## Usage

### Basic Usage
```tsx
import { FilePreview } from 'react-file-previews';

function App() {
  return (
    <div>
      <FilePreview url="https://example.com/image.png" />
    </div>
  );
}
```

### Advanced Usage (Custom Loaders/Errors)
```tsx
<FilePreview 
  url="https://example.com/file.jpg"
  loadingComponent={<span>Fetching file info...</span>}
  errorComponent={(err) => <span>Failed: {err.message}</span>}
  fallback={<span>Cannot preview this file type</span>}
/>
```

## How it Works
1.  The `FilePreview` component uses the `useFileType` hook.
2.  `useFileType` performs a `HEAD` request to the URL.
3.  The `Content-Type` header is extracted.
4.  The `previewRegistry` is searched for a matching handler.
5.  If found, the specific handler (e.g., `ImagePreview`) is rendered.

## Extending the Library
To add support for a new file type (e.g., Video), you can add a new entry to the `previewRegistry`:

1.  Create your component:
```tsx
const VideoPreview = ({ url }) => <video src={url} controls />;
```

2.  Add it to the registry (in your local code if you want to extend it):
```tsx
import { previewRegistry } from 'react-file-previews';

previewRegistry.push({
  test: (mimeType) => mimeType.startsWith('video/'),
  component: VideoPreview,
});
```
