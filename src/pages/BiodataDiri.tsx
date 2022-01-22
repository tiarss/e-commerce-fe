import { Box, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  CustomButtonPrimary,
  CustomButtonSecondary,
} from "../components/CustomButton";
// import { InputText2, InputText3 } from "../components/InputText";
import { dataUserIDTypes } from "../Types";

import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const token: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJlbWFpbCI6ImJhaHRpYXJAZ21haWwuY29tIiwiZXhwIjoxNjQyODY5OTMwLCJpZCI6NH0.v9XWXOn773NRc2zk0MJc7V5qcYRW1qly6_t1zB8ZNKQ";
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

function BiodataDiri() {
  const dataUserDefault: dataUserIDTypes[] = [];
  const [dataUserID, setDataUserID] = useState(dataUserDefault);
  const [nameUser, setNameUser] = useState<string>("");
  const [genderUser, setGenderUser] = useState<string>("");
  const [emailUser, setEmailUser] = useState<string>("");
  const [cityUser, setCityUser] = useState<string>("")
  const [provinceUser, setProvinceUser] = useState<string>("")
  const [streetUser, setStreetUser] = useState<string>("")
  const [zipcodeUser, setZipcodeUser] = useState<string>("")

  const [isReady, setIsReady] = useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNameUser(value)
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmailUser(value)
  };

  const handleChangeCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCityUser(value)
  };

  const handleChangeProvince = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setProvinceUser(value)
  };

  const handleChangeZipcode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setZipcodeUser(value)
  };

  const handleChangeStreet = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setStreetUser(value)
  };

  const handleChangeGender = (event: SelectChangeEvent) => {
    setGenderUser(event.target.value as string);
  };

  useEffect(() => {
    fetchDataUserId();
  }, []);

  const fetchDataUserId = async () => {
    await axios
      .get("/users/4", config)
      .then((res) => {
        const { data } = res.data;
        setDataUserID([data]);
        setNameUser(data.name)
        setEmailUser(data.email)
        setGenderUser(data.gender)
        setCityUser(data.address.city)
        setProvinceUser(data.address.province)
        setZipcodeUser(data.address.zipcode)
        setStreetUser(data.address.street)
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsReady(true);
      });
  };

  const handleEditUser = () => {
    axios.put("users/4",{
      name: nameUser,
      email: emailUser,
      gender: genderUser,
      address: {
        city: cityUser,
        province: provinceUser,
        zipcode: zipcodeUser,
        street: streetUser
      }
    },config).then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    }).finally(()=>{
      fetchDataUserId()
      setOpen(false)
    })
  };

  if (isReady) {
    return (
      <Box
        sx={{
          minHeight: "400px",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.250);",
          borderRadius: "10px",
          marginTop: "10px",
          marginBottom: "50px",
          padding: "20px",
          display: "flex",
          position: "relative",
          flexDirection: { xs: "column", md: "row" },
        }}>
        <Box
          sx={{
            width: { xs: "100%", md: "30%" },
            marginBottom: { xs: "20px", md: "0px" },
            display: "flex",
            justifyContent: { xs: "center", md: "flex-start" },
          }}>
          <Box
            sx={{
              width: "100px",
              height: "100px",
              overflow: "hidden",
              borderRadius: "60px",
            }}>
            <img
              style={{ width: "100%" }}
              src='https://cdn3.vectorstock.com/i/1000x1000/01/77/businesswoman-character-avatar-icon-vector-12800177.jpg'
              alt='avatar-user'
            />
          </Box>
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "70%" },
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            justifyContent: { xs: "center", md: "flex-start" },
          }}>
          <Box sx={{ display: "flex" }}>
            <Typography sx={{ width: "100px" }}>Nama</Typography>
            <Typography>{dataUserID[0].name}</Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography sx={{ width: "100px" }}>Email</Typography>
            <Typography>{dataUserID[0].email}</Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography sx={{ width: "100px" }}>Alamat</Typography>
            <Typography>
              {
                (dataUserID[0].address.street +
                dataUserID[0].address.city +
                dataUserID[0].address.province +
                dataUserID[0].address.zipcode)
              }
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography sx={{ width: "100px" }}>Gender</Typography>
            <Typography>{dataUserID[0].gender}</Typography>
          </Box>
        </Box>
        <Box sx={{ position: "absolute", bottom: "20px" }}>
          <CustomButtonSecondary
            caption='Edit Profile'
            OnClick={handleOpenModal}
          />
        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'>
          <Box
            sx={{
              position: "absolute",
              borderRadius: "10px",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "350px", sm: "400px", md: "700px" },
              bgcolor: "background.paper",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.250);",
              display: "flex",
              flexDirection: "column",
              gap: 3,
              p: 4,
            }}>
            <Box sx={{ display: "flex", gap: 3 }}>
              <TextField
                sx={{ width: "50%" }}
                id='filled-basic'
                label='Nama'
                variant='filled'
                type='text'
                value={nameUser}
                onChange={handleChangeName}
              />
              <Box sx={{ minWidth: "50%" }}>
                <FormControl fullWidth>
                  <InputLabel id='demo-simple-select-label'>Gender</InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={genderUser}
                    label='Gender'
                    onChange={handleChangeGender}>
                    <MenuItem value='Laki-Laki'>Laki-Laki</MenuItem>
                    <MenuItem value='Perempuan'>Perempuan</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 3 }}>
              <TextField
                sx={{ width: "100%" }}
                id='filled-basic'
                label='Email'
                variant='filled'
                value={emailUser}
                type='text'
                onChange={handleChangeEmail}
              />
            </Box>
            <Box sx={{ display: "flex", gap: 3 }}>
              <TextField
                sx={{ width: "50%" }}
                id='filled-basic'
                label='Provinsi'
                value={provinceUser}
                onChange={handleChangeProvince}
                variant='filled'
                type='text'
              />
              <TextField
                sx={{ width: "50%" }}
                id='filled-basic'
                label='Kota'
                value={cityUser}
                variant='filled'
                onChange={handleChangeCity}
                type='text'
              />
            </Box>
            <Box sx={{ display: "flex", gap: 3 }}>
              <TextField
                sx={{ width: "50%" }}
                id='filled-basic'
                label='Kode Pos'
                value={zipcodeUser}
                onChange={handleChangeZipcode}
                variant='filled'
                type='text'
              />
              <TextField
                sx={{ width: "50%" }}
                id='filled-basic'
                label='Alamat'
                value={streetUser}
                onChange={handleChangeStreet}
                variant='filled'
                type='text'
              />
            </Box>
            <Box>
              <CustomButtonPrimary caption='Simpan' OnClick={handleEditUser} />
            </Box>
          </Box>
        </Modal>
      </Box>
    );
  } else {
    return <Box>Loading</Box>;
  }
}

export default BiodataDiri;
