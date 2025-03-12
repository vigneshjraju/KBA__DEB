import React , { useState } from 'react'
import { useNavigate  } from "react-router-dom";

const Addstudent = () => {

    const navigate = useNavigate();

    const [Studentname, setStudentname]=useState("");
    const [Enrollmentnumber,setEnrollmentnumber]=useState("");
    const [Course,setCourse]=useState("");
    const [DateofEnrollment,setDateofEnrollment]=useState("");

    const [error, setError]         = useState('');
    
    

    const handleSubmit=async (e)=>{
        e.preventDefault();
        setError(""); 

        try{

            const formData = {
                studentname: Studentname,
                enrollmentnumber: Enrollmentnumber,
                course: Course,
                dateofenrollement: DateofEnrollment 
            };
    
            console.log("Sending Data:", formData);
            
            const res=await fetch("/api/addstudent",{
                method:"POST",
                credentials:"include",
                headers: {
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            console.log("Response Data:", data.student); 


            if(!res.ok){
                throw new Error("Error adding student.");
                
            }
            alert("Student Added successfully!");

            navigate(`/getstudents/${data.student.COURSE}`);
            
        }
        catch(err){
            console.error("Error:", err);
            setError(err.message || 'failed: Please try again!')
            
        }
    }
    


  return (

    <div className='bg-blue-200 w-[900px] text-center ml-[450px] mt-12'>

        <p className='font-bold text-xl'>ADD STUDENT</p>

        {error && <p className='text-red-500 mb-4'>{error}</p>}

        <form onSubmit={handleSubmit} className='pl-20'>

            <div className='flex gap-12'>
                <div className='flex justify-between'>
                    <p className='font-bold w-40'>Name of the student:</p>
                    <input 
                    type="text"
                    className='flex-1 border-2 bg-white'
                    value={Studentname}
                    onChange={(e) => setStudentname(e.target.value)}
                    required
                    />
                </div>
            </div>
            
            <br />

            <div className='flex flex-col gap-12'>

                <div className='flex justify-between'>

                    <p className='font-bold w-40'>Enrollement Num:</p>

                    <input 
                    type="number"
                    className='flex-1 border-2 bg-white'
                    value={Enrollmentnumber}
                    onChange={(e) => setEnrollmentnumber(e.target.value)}
                    required
                    />

                </div>
            </div>

            <br />

            <div className='flex flex-col gap-12'>

                <div className='flex justify-between'>

                    <p className=' font-bold w-40'>Course Enrolled:</p>

                    <input 
                    type="text"
                    className='flex-1 border-2 bg-white'
                    value={Course}
                    onChange={(e) => setCourse(e.target.value)}
                />

                </div>

            </div>

            <br />

            <div className='flex flex-col gap-12'>

                <div className='flex justify-between'>

                    <p className='font-bold w-40'>Date of Enrollement:</p>

                    <input 
                    type="text"
                    className='flex-1 border-2 bg-white'
                    value={DateofEnrollment}
                    onChange={(e) => setDateofEnrollment(e.target.value)}
                />

                </div>

            </div>

            <br />
                
            
                    <button
                        type="submit"
                        className="bg-red-700 text-white w-56 font-bold text-xl rounded-xl border-2 border-black hover:bg-green-700"
                    >
                        Add
                    </button>



        </form>

    </div>

  )
}

export default Addstudent