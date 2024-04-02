
import axios from "axios";
import { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
const UploadMaterialPage = () => {
  const [dragging, setDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const location=useLocation();
  const courseId = location.state?.courseId;
  const staffId=location.state?.staffId;
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(droppedFiles);
  };

  const handleFileInputChange = (e) => {
    const fileList = Array.from(e.target.files);
    setFiles(fileList);
  };

  const fileInputRef = useRef(null);

  const handleSelectFiles = async () => {
    if (files.length === 0|| !courseId ||!staffId) {
      alert('Please select a file to upload.');
      return;
    }
    const formData = new FormData();
    files.forEach(file => formData.append('file', file));
    formData.append('courseId',courseId);
    formData.append('staffId',staffId);
    try {
      const response = await axios.post('http://localhost:3001/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log(response.data);
      alert('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file');
    }
  }

  return (
    <div
      className={`dropzone ${dragging ? "dragging" : ""}`}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="dropzone-content">
        <p>Drag files here or click to select</p>
        <input
          type="file"
          multiple
          style={{ display: "none" }}
          onChange={handleFileInputChange}
          ref={fileInputRef}
        />
        <button onClick={() => fileInputRef.current.click()} className="select-button">
          Browse
        </button>
        <button onClick={handleSelectFiles}>Upload</button>
        <ul>
          {files.map((file, index) => (
            <li key={index}>
              <span>{file.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default UploadMaterialPage;
