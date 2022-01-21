// import React from "react";
import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { OutlinedInputProps } from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import NativeSelect from '@mui/material/NativeSelect';



const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'red',
      },
      '&:hover fieldset': {
        borderColor: 'yellow',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
    },
  });
  
  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      borderRadius: 0,
      position: 'relative',
      backgroundColor: theme.palette.mode === 'light' ? '#ECE8E8' : '#fcfcfb',
      border: '1px solid #ced4da',
      fontSize: 16,
      width: '100%',
      padding: '10px 12px',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
      ]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
          'Nunito',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }));
 

  interface inputDetail {
    placeholder?: string;
    type?: string;
    label?: string;
    textLabel?: string;

}

function InputText(props:inputDetail){
    // props.firstName
    // props.lastName
    return(
        <div>
             <FormControl variant="standard">
            <BootstrapInput 
            placeholder={props.placeholder}
            id="bootstrap-input" 
            type={props.type}
            />
            </FormControl>      
 
        </div>
    )
}
function InputText2(props:inputDetail){
    return(
        <div>
            <p>{props.textLabel}</p>
            <FormControl variant="standard">
            <BootstrapInput 
            id="bootstrap-input" 
            placeholder = {props.placeholder}            
            type= {props.type}
            />
            </FormControl>             
        </div>
    )
}
function InputText3(props:inputDetail){
    const [age, setAge] = React.useState('');
  const handleChange = (event: { target: { value: string } }) => {
    setAge(event.target.value);
  };
  return (
    <div>     
      <FormControl sx={{ m: 1, width:"100%", height: "45px" }} variant="standard" >        
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={age}
          onChange={handleChange}
          input={<BootstrapInput placeholder= {props.placeholder}/>}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      
    </div>
  );
}

export {InputText,InputText2, InputText3}

// how to call
{/* <InputText2 textLabel='Nama' placeholder='nama' width='300px'/> */}