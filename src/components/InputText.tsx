// import React from "react";
import * as React from 'react';
import { alpha, styled, Theme, useTheme } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
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
      borderRadius: "10px",
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
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    defValue?: string;
    value?: string | number;
    errorVal?: string
}

function InputText(props:inputDetail){
    // props.firstinputVal
    // props.lastinputVal
    return(
        <div>
             <FormControl variant="standard">
            <BootstrapInput sx={{ width:"100%" }}
            placeholder={props.placeholder}
            value={props.value}
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
            <p>{props.textLabel}  <span style={{ color: "red" }}>{props.errorVal}</span></p>            
            <FormControl variant="standard" sx={{ width:"100%" }}>
            <BootstrapInput 
            id="bootstrap-input" 
            placeholder = {props.placeholder}            
            type= {props.type}
            onChange={props.onChange}
            value={props.value}
            />
            </FormControl>             
        </div>
    )
}
type inputSelect = {
  label?: string,
  onChange?: (e: SelectChangeEvent) => void ,
  data?: string[],
  value?: string,
  placeholder?: string
  errorVal?: string

}

function InputText3({label, onChange, data,value,placeholder,errorVal}: inputSelect){

  return (
    <div>     
        <p>{label}  <span style={{ color: "red" }}>{errorVal}</span></p>  
      <FormControl sx={{width:"100%", height: "45px" }} variant="standard" >        
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={value}
          onChange={onChange}
          input={<BootstrapInput placeholder= {placeholder} />}
        >
          {data !== undefined ? data.map((datas, index)=>(
            <MenuItem key={index} value={datas}>{datas}</MenuItem>
          )) : <MenuItem value="kosong">Kosong</MenuItem>}
        </Select>
      </FormControl>
      
    </div>
  );
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  

};

const inputVals = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(inputVal: string, inputValue: readonly string[], theme: Theme) {
  return {
    fontWeight:
      inputValue.indexOf(inputVal) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export {InputText,InputText2, InputText3}

// how to call
{/* <InputText2 textLabel='Nama' placeholder='nama' width='300px'/> */}