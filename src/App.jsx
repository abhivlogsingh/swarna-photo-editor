import React, { useState, useEffect } from 'react';
import FilerobotImageEditor, { TABS, TOOLS } from 'react-filerobot-image-editor';

function App() {
  const [imageList, setImageList] = useState([]);
  const [imageToEdit, setImageToEdit] = useState(null);
  const [blankImage, setBlankImage] = useState('');

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const blank = canvas.toDataURL('image/png');
    setBlankImage(blank);
    setImageToEdit(blank);
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
    <div className="flex h-screen font-sans bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-white shadow-lg p-6 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6 text-[#6879eb]">Swarna Editor</h2>

        <label className="bg-[#6879eb] hover:[#6879eb] text-white px-4 py-2 rounded cursor-pointer mb-6 shadow-md transition">
          Upload Image
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </label>

        <div className="grid grid-cols-2 gap-3 w-full">
          {imageList.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`uploaded-${idx}`}
              onClick={() => setImageToEdit(img)}
              className={`w-full h-24 object-cover rounded-md cursor-pointer transition-all duration-200 ${
                imageToEdit === img ? 'border-2 border-yellow-500' : 'border border-gray-300'
              }`}
            />
          ))}
        </div>
      </aside>

      {/* Editor */}
      <main className="flex-1 overflow-hidden bg-gray-200 p-4">
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
      </main>
    </div>
  );
}

export default App;
