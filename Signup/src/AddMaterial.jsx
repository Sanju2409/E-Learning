
// import  { useState } from 'react';

// import './AddMaterial.css';

// const UploadMaterialPage = () => {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileSelect = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   const handleFileUpload = () => {
//     if (selectedFile) {
//       // Perform file upload logic here (e.g., using fetch or axios)
//       console.log('File uploaded:', selectedFile);
//     } else {
//       alert('Please select a file to upload.');
//     }
//   };
//   const handleFileDrop = (event) => {
//     event.preventDefault();
//     const file = event.dataTransfer.files[0];
//     setSelectedFile(file);
//   };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//   };
//   return (
//     <div className="upload-container">
//       <h1 className="course-title">Introduction to Computer Science</h1>
//       <div className="upload-content">
//         <h2 className="upload-title">Upload Reading Material</h2>
//         <div
//           className="file-upload-container"
//           onDrop={handleFileDrop}
//           onDragOver={handleDragOver}
//         >
//           <input
//             type="file"
//             id="fileInput"
//             accept=".pdf,.doc,.docx,.txt"
//             onChange={handleFileSelect}
//             className="file-input"
//           />
//           <label htmlFor="fileInput" className="file-input-label">
//             Choose File
//           </label>
//           <p className="drag-drop-text">or drag and drop file here</p>
//           <button onClick={handleFileUpload} className="upload-button">
//             Upload
//           </button>
//           {selectedFile && (
//             <p className="file-name">{selectedFile.name}</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );


// //   return (
// //     <div className="upload-material-container">
// //       {/* <h1 className="course-name">{courseName}</h1> */}
// //       <div className="file-upload-container">
// //         <h2 className="file-upload-title">Upload Reading Material</h2>
// //         <input
// //           type="file"
// //           id="fileInput"
// //           accept=".pdf,.doc,.docx,.txt"
// //           onChange={handleFileSelect}
// //           className="file-input"
// //         />
// //         <label htmlFor="fileInput" className="file-input-label">
// //           Choose File
// //         </label>
// //         <button onClick={handleFileUpload} className="upload-button">
// //           Upload
// //         </button>
// //       </div>
// //     </div>
// //   );
// };

// export default UploadMaterialPage;




// import  { useState, useRef } from 'react';

// const UploadMaterialPage = () => {
//   const [dragging, setDragging] = useState(false);
// //   const [files, setFiles] = useState([]);
// //   const fileInputRef = useRef(null);

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     setDragging(true);
//   };

//   const handleDragEnter = (e) => {
//     e.preventDefault();
//     setDragging(true);
//   };

//   const handleDragLeave = (e) => {
//     e.preventDefault();
//     setDragging(false);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setDragging(false);
//     const droppedFiles = [...e.dataTransfer.files];
//     setFiles(droppedFiles);
//   };

//   // Initialize files with an empty array instead of undefined
//   const [files, setFiles] = useState([]);

//   // Declare fileList with let
// //   let fileList;

//   const handleFileInputChange = (e) => {
//     // Remove spread operator andset state to the new array directly
//     setFiles(e.target.files);
//   };

//   // Create a reference to the file input
//   const fileInputRef = useRef(null);

//   // Replace this with fileInputRef.current.click()
//   const handleSelectFiles = () => {
//     fileInputRef.current.click();
//   };

//   return (
//     <div
//       className={`dropzone ${dragging ? 'dragging' : ''}`}
//       onDragOver={handleDragOver}
//       onDragEnter={handleDragEnter}
//       onDragLeave={handleDragLeave}
//       onDrop={handleDrop}
//     >
//       <p>Drag files here or click to select</p>
//       <input
//         type="file"
//         multiple
//         style={{ display: 'none' }}
//         onChange={handleFileInputChange}
//         ref={fileInputRef}
//       />
//       <button onClick={handleSelectFiles}>Select Files</button>
//       <ul>
//         {files.map((file, index) => (
//           <li key={index}>{file.name}</li>
//         ))}
//       </ul>

//       {/* // Add CSS for the dragging class
//       .dragging {
        
//         border: 2px dashed #007bff;
//       } */}
//     </div>
//   );
// };

// export default UploadMaterialPage;


import  { useState, useRef } from "react";
const UploadMaterialPage = () => {
  const [dragging, setDragging] = useState(false);

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
    const droppedFiles = [...e.dataTransfer.files];
    setFiles(droppedFiles);
  };

  const [files, setFiles] = useState([]);

  const handleFileInputChange = (e) => {
    setFiles(e.target.files);
  };

  const fileInputRef = useRef(null);

  const handleSelectFiles = () => {
    fileInputRef.current.click();
  };

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
        <button onClick={handleSelectFiles} className="select-button">
         Browse
        </button>
        <ul>
          {files.map((file, index) => (
            <li key={index}>
             
              <span>{file.name}</span>
            </li>))}
        </ul>
      </div>
      </div>
     
    
  );
};

export default UploadMaterialPage;