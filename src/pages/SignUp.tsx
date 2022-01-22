import React from 'react';
import { InputText2 } from '../components/InputText';
import { Button } from '@mui/material';
import axios from 'axios';
import { Box } from '@mui/system';
import { useState, useEffect } from 'react';
import logo from "../images/Logo-sirclo-white.png";
import { CustomButtonPrimary } from '../components/CustomButton';



const SignUp: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  useEffect(()=>{      
  },[])

  const fetchData = async () =>{
    await axios.post("http://52.77.229.210:3000/users", {
        name:name,
        email: email,
        password: password
    }).then((res)=>{
       console.log(res)
    })
 }


  const handleName = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const value = e.target.value
    setName(value)
 } 
 const handleEmail = (e: React.ChangeEvent<HTMLInputElement>)=>{
  const value = e.target.value
  setEmail(value)
}
const handlePassword = (e: React.ChangeEvent<HTMLInputElement>)=>{
  const value = e.target.value
  setPassword(value)
}


  return (
    <Box sx={{
      display: "flex",
       width:"100%",
       alignItems: "center",
       fontFamily: "Nunito",
       backgroundColor:"white",
       height:"600px",
       justifyContent: "center",
       flexDirection: {xs:"column", sm:"column", md:"row"},
       gap:{xs:"20px",sm:"40px", md:"0px"},
  }}>
    <Box sx={{
      display: "flex",
       width:{xs:"286px",sm:"100%", md:"50%"},
       height:{xs:"101px",sm:"350px", md:"1000px"},
       alignItems: "center",
       fontFamily: "Nunito",
       background: 'linear-gradient(180deg, #2296CB 0%, #1767A0 100%)',
       margin:{xs:"10%", sm:"0px"},         
       justifyContent:"center",
  }}>
      <Box sx={{ 
        width:{xs:"200px",sm:"350px"},          
        justifyContent:"center",
        alignItems:"center"   
       }}>
      <img style={{ width:"100%" }} src={logo} alt='logo-sirclo' />      

      </Box>
      </Box>
      <Box sx={{
        display: "flex",
         width:"50%",
         alignItems: "center",
         fontFamily: "Nunito",
         height:"600px",
         justifyContent:"center",
         
    }}>
        <Box sx={{ 
          display: "flex",
          flexDirection:"column",
          gap:"20px",
         
         }}>
          <h1 style={{ color:"#309DCE", fontSize:"48px", }}>Sign Up</h1>
          <Box sx={{ 
            width:{xs:"327px", sm:"440px"},
            display: "flex",
            flexDirection:"column",
            gap:"20px",
           }}>
              <InputText2 textLabel='Nama' type='text' onChange={(e)=>handleName(e)}/>
              <InputText2 textLabel='Email' type='email' onChange={(e)=>handleEmail(e)}/>
              <InputText2 textLabel='Password' type='password' onChange={(e)=>handleEmail(e)}/>
              <CustomButtonPrimary caption='Sign Up' OnClick={fetchData} />
          </Box>         

        </Box>

      </Box>
      
    </Box>
   
  );
}

export default SignUp;


