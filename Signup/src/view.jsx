// // // import axios from "axios";
// // // import { useEffect,useState } from "react";
// // // import { useLocation } from "react-router-dom";
// // // function View(){
// // //     const[material,setMaterial]=useState([]);
// // //     const[filecontent,setFileContent]=useState([]);
// // //     const location=useLocation();
// // //     const courseId=location.state.courseId;
// // //     const staffId=location.state.staffId;
// // //     useEffect(()=>{
// // //         const fetchcoursematerials=async()=>{
// // //             try{
// // //                 const response=await axios.get('http://localhost:3001/materials',{
// // //                     params:{
// // //                         courseId:courseId,
// // //                         staffId:staffId
// // //                     }
// // //                 });
// // //                 setMaterial(response.data);
// // //             }
// // //             catch(error){
// // //                 console.error('Error fetching materials',error);
// // //             }
// // //         };
// // //         useEffect(() => {
// // //             const fetchFileContent = async () => {
// // //                 try {
// // //                     const response = await axios.get('http://localhost:3001/material content',{
// // //                         params:{
// // //                             filePath:material.filePath;
// // //                         }
// // //                     });
// // //                     setFileContent(response.data);
// // //                 } catch (error) {
// // //                     console.error('Error fetching file content:', error);
// // //                 }
// // //             };
// // //             fetchFileContent();
// // //         fetchcoursematerials();
// // //     },[courseId,staffId]);
// // //     return(
// // //         <div>
// // //            <h1>View Materials</h1> 
// // //            <ul>
// // //             {material.map(material=>(
// // //                 <li key={material._id}>
// // //                     <a href={`http://localhost:3001/${material.filePath}`} target="_blank" rel="noopener noreferrer">
// // //                             {material.filePath}
// // //                         </a>

// // //                 </li>
// // //             ))}
// // //            </ul>
// // //         </div>
// // //     )
// // // }
// // // export default View;


// // import axios from "axios";
// // import { useEffect, useState } from "react";
// // import { useLocation } from "react-router-dom";

// // function View() {
// //     const [material, setMaterial] = useState([]);
// //     const [fileContent, setFileContent] = useState("");
// //     const location = useLocation();
// //     const courseId = location.state.courseId;
// //     const staffId = location.state.staffId;

// //     useEffect(() => {
// //         const fetchCourseMaterials = async () => {
// //             try {
// //                 const response = await axios.get('http://localhost:3001/materials', {
// //                     params: {
// //                         courseId: courseId,
// //                         staffId: staffId
// //                     }
// //                 });
// //                 setMaterial(response.data);
// //             } catch (error) {
// //                 console.error('Error fetching materials', error);
// //             }
// //         };

// //         fetchCourseMaterials();
// //     }, [courseId, staffId]);

// //     useEffect(() => {
// //         const fetchFileContent = async (filePath) => {
// //             try {
// //                 const response = await axios.get('http://localhost:3001/material-content', {
// //                     params: {
// //                         filePath: filePath
// //                     }
// //                 });
// //                 setFileContent(response.data);
// //             } catch (error) {
// //                 console.error('Error fetching file content:', error);
// //             }
// //         };

// //         material.forEach(material => {
// //             fetchFileContent(material.filePath);
// //         });
// //     }, [material]);

// //     return (
// //         <div>
// //             <h1>View Materials</h1>
// //             <ul>
// //                 {material.map(material => (
// //                     <li key={material._id}>
// //                         <a href={`http://localhost:3001/${material.filePath}`} target="_blank" rel="noopener noreferrer">
// //                             {material.filePath}
// //                         </a>
// //                         <p>{fileContent}</p>
// //                     </li>
// //                 ))}
// //             </ul>
// //         </div>
// //     );
// // }

// // export default View;
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

// function View() {
//     const [material, setMaterial] = useState([]);
//     // const [fileContents, setFileContents] = useState({});
//     const location = useLocation();
//     const courseId = location.state.courseId;
//     const staffId = location.state.staffId;

//     useEffect(() => {
//         const fetchCourseMaterials = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3001/materials', {
//                     params: {
//                         courseId: courseId,
//                         staffId: staffId
//                     }
//                 });
//                 setMaterial(response.data);
//             } catch (error) {
//                 console.error('Error fetching materials', error);
//             }
//         };

//         fetchCourseMaterials();
//     }, [courseId, staffId]);

//     // useEffect(() => {
//     //     const fetchFileContent = async (filePath) => {
//     //         try {
//     //             const response = await axios.get('http://localhost:3001/material-content', {
//     //                 params: {
//     //                     filePath: filePath
//     //                 }
//     //             });
//     //             // setFileContents(prevState => ({
//     //             //     ...prevState,
//     //             //     [filePath]: response.data
//     //             // }));
//     //         } catch (error) {
//     //             console.error('Error fetching file content:', error);
//     //         }
//     //     };

//     //     material.forEach(material => {
//     //         fetchFileContent(material.filePath);
//     //     });
//     // }, [material]);

//     return (
//         <div>
//             <h1  className="material-content">View Materials</h1>
//             <ul className="material-content-table">
//                 {material.map(material => (
//                     <li key={material._id}>
//                         <a href={`http://localhost:3001/material-content?filePath=${material.filePath}`} target="_blank" rel="noopener noreferrer">
//                             {material.filePath}
//                         </a>
//                         {/* {fileContents[material.filePath] && <p>{fileContents[material.filePath]}</p>} */}
//                     </li>
//                 ))}
//             </ul>
           
//         </div>
//     );
// }

// export default View;
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function View() {
    const [material, setMaterial] = useState([]);
    // const [fileContents, setFileContents] = useState({});
    const location = useLocation();
    const courseId = location.state.courseId;
    const staffId = location.state.staffId;

    useEffect(() => {
        const fetchCourseMaterials = async () => {
            try {
                const response = await axios.get('http://localhost:3001/materials', {
                    params: {
                        courseId: courseId,
                        staffId: staffId
                    }
                });
                setMaterial(response.data);
            } catch (error) {
                console.error('Error fetching materials', error);
            }
        };

        fetchCourseMaterials();
    }, [courseId, staffId]);

    // useEffect(() => {
    //     const fetchFileContent = async (filePath) => {
    //         try {
    //             const response = await axios.get('http://localhost:3001/material-content', {
    //                 params: {
    //                     filePath: filePath
    //                 }
    //             });
    //             // setFileContents(prevState => ({
    //             //     ...prevState,
    //             //     [filePath]: response.data
    //             // }));
    //         } catch (error) {
    //             console.error('Error fetching file content:', error);
    //         }
    //     };

    //     material.forEach(material => {
    //         fetchFileContent(material.filePath);
    //     });
    // }, [material]);

    return (
        <div className="vh-100">
            <h1 className="material-content-title" >View Materials</h1>
            <ul className="material-content-table">
                {material.map(material => (
                    <li key={material._id} className="material-content-item">
                        <a href={`http://localhost:3001/material-content?filePath=${material.filePath}`} target="_blank" rel="noopener noreferrer" className="material-content-link">
                            {material.filePath}
                        </a>
                        {/* {fileContents[material.filePath] && <p>{fileContents[material.filePath]}</p>} */}
                    </li>
                ))}
            </ul>
           
        </div>
    );
}

export default View;