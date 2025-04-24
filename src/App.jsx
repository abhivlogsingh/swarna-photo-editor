import React, { useState, useEffect } from 'react';
import FilerobotImageEditor, { TABS, TOOLS } from 'react-filerobot-image-editor';

function App() {
  const [imageList, setImageList] = useState([]);
  const [imageToEdit, setImageToEdit] = useState(null);
  const [blankImage, setBlankImage] = useState('');

  // Generate a white blank canvas as base64
  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const blank = canvas.toDataURL('image/png');
    setBlankImage(blank);
    setImageToEdit(blank); // load initially
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageList((prev) => [...prev, imageUrl]);
      setImageToEdit(imageUrl);
    }
  };

  return (
    <div style={styles.page}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>Swarna Editor </h2>

        <label style={styles.uploadBtn}>
          Upload Image
          <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
        </label>

        <div style={styles.imageGrid}>
          {imageList.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`uploaded-${idx}`}
              onClick={() => setImageToEdit(img)}
              style={{
                ...styles.imageThumb,
                border: imageToEdit === img ? '2px solid #007bff' : '1px solid #ccc',
              }}
            />
          ))}
        </div>
      </div>

      {/* Editor */}

<div style={styles.editorContainer}>
  {imageToEdit && blankImage && (
    <FilerobotImageEditor
      source={imageToEdit}
      onSave={(editedImageObject) => {
        const link = document.createElement('a');
        link.href = editedImageObject.imageBase64;
        link.download = 'edited-image.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }}
      onClose={() => {}}
      annotationsCommon={{ fill: '#ff0000' }}
      Text={{ text: 'Type your notes here...' }}
      Rotate={{ angle: 90, componentType: 'slider' }}
      tabsIds={[
        TABS.ANNOTATE,
        TABS.TEXT,
        TABS.ADJUST,
        TABS.RESIZE,
        TABS.CROP,
        TABS.FILTERS,
        TABS.FINETUNE,
        TABS.WATERMARK,
      ]}
      defaultTabId={TABS.ANNOTATE}
      defaultToolId={TOOLS.TEXT}
    />
  )}
</div>

    </div>
  );
}

const styles = {
  page: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    fontFamily: 'Segoe UI, sans-serif',
  },
  sidebar: {
    width: '280px',
    background: '#fff',
    boxShadow: '2px 0 12px rgba(0, 0, 0, 0.1)',
    padding: '24px 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '24px',
  },
  uploadBtn: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    borderRadius: '6px',
    cursor: 'pointer',
    marginBottom: '20px',
    boxShadow: '0 4px 10px rgba(0, 123, 255, 0.2)',
  },
  imageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',
    width: '100%',
  },
  imageThumb: {
    width: '100%',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: '0.3s',
  },
  editorContainer: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#e5e5e5',
    padding: '10px',
  },
};

export default App;
