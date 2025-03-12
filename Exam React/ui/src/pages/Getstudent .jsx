import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Getstudent  = () => {

    const { course } = useParams();
    console.log("Extracted course:", course);  

    const [students, setStudents] = useState([]);

    useEffect(() => {
    
            const fetchstudents = async () => {
                try {
                    const response = await fetch(`/api/getstudents/${course}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        }
                    });
    
                    if (response.ok) {
    
                        const data = await response.json();
                        setStudents(data.students);  
    
                    } else {
                        console.error("Failed to fetch students");
                    }
                } catch (error) {
                    console.error("Error fetching students:", error);
                }
            };
    
            fetchstudents();
        }, []);



  return (

        <div className="grid grid-cols-3 gap-y-4 bg-white py-12 px-[50px] rounded-3xl">

            {students.length > 0 ? (
		        
                students.map((student) => (
                
                    <div key={student._id} className="bg-zinc-300 w-[400px] px-4 py-4 border-2 border-black">
                     
                            <div>
                        
                                <p className="text-sm">{student.STUDENTNAME || "Location not provided"}</p>
                                
                            </div>

                            <br />

                            <div>
                        
                                <p className="text-sm">{student.ENROLLMENTNUMBER || "Location not provided"}</p>
                                
                            </div>

                            <br />

                            <div>

                                <p className="text-sm">{student.COURSE || "Location not provided"}</p>
                                
                            </div>

                            <br />

                            <div>

                                <p className="text-sm">{student.DATEOFENROLLMENT || "date not provided"}</p>
                                
                            </div>

                        
                    </div>
                    
                ))
                
            ) : (
                <p className="text-center w-full col-span-3 font-bold">No students available</p>
            )}
            
        </div>




        

  )
}

export default Getstudent 