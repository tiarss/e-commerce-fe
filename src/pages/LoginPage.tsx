import React, { useEffect, useState } from "react";
import axios from "axios"

function LoginPage() {
   const [email, setEmail] = useState<string>("")
   const [password, setPassword] = useState<string>("")

   useEffect(()=>{
      
   },[])


   const fetchData = async () =>{
      await axios.post("http://52.77.229.210:3000/login", {
         email: email,
         password: password
      }).then((res)=>{
         console.log(res)
      })
   } 

   const handleEmail = (e: React.ChangeEvent<HTMLInputElement>)=>{
      const value = e.target.value
      setEmail(value)
   }
   
   const handlePassword = (e: React.ChangeEvent<HTMLInputElement>)=>{
      const value = e.target.value
      setPassword(value)
   }


  return( 
   <div>
      <input type="email" onChange={(e)=>handleEmail(e)}/>
      <input type="password" onChange={(e)=>handlePassword(e)} />
      <button onClick={fetchData}>Login</button>
   </div>
  );
}

export default LoginPage;
