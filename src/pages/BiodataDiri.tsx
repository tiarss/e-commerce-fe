import { Box, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  CustomButtonPrimary,
  CustomButtonSecondary,
} from "../components/CustomButton";
import { alertType, dataUserIDTypes } from "../Types";
import { SelectChangeEvent } from "@mui/material/Select";
import { InputText2, InputText3 } from "../components/InputText";
import { useLocalStorage } from "../utils/useLocalStorage";
import { authTypes } from "../Types";
import { useNavigate } from "react-router-dom";
import "@fontsource/nunito/700.css";
import Avatar from "@mui/material/Avatar";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

function BiodataDiri() {
  const navigate = useNavigate();
  const dataUserDefault: dataUserIDTypes[] = [];
  const [auth, setAuth] = useLocalStorage<authTypes[] | undefined>("auth", []);

  const [dataUserID, setDataUserID] = useState(dataUserDefault);
  const [nameUser, setNameUser] = useState<string>("");
  const [genderUser, setGenderUser] = useState<string>("");
  const [emailUser, setEmailUser] = useState<string>("");
  const [cityUser, setCityUser] = useState<string>("");
  const [provinceUser, setProvinceUser] = useState<string>("");
  const [streetUser, setStreetUser] = useState<string>("");
  const [zipcodeUser, setZipcodeUser] = useState<string>("");
  const [imageUser, setImageUser] = useState<string>("");

  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [cityError, setCityError] = useState<string>("");
  const [provinceError, setProvinceError] = useState<string>("");
  const [kodeposError, setKodeposError] = useState<string>("");
  const [alamatError, setAlamatError] = useState<string>("");
  const [linkError, setLinkError] = useState<string>("");

  const [disabledVal, setDisabled] = useState<boolean>(false);

  const [isReady, setIsReady] = useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openAlert, setOpenAlert] = React.useState(false);
  const [alert, setAlert] = useState<alertType>({
    message: "",
    status: "info",
  });

  const handleCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNameUser(value);
    var len = event.target.value.length;
    if (len > 20) {
      setNameError(" is too long");
    } else if (len >= 0) {
      setNameError("");
    } else {
      setNameError("");
    }
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmailUser(value);
    let regexpEmail = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$");
    if (!regexpEmail.test(event.target.value)) {
      setEmailError(" is invalid");
    } else {
      setEmailError("");
    }
  };

  const handleChangeCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCityUser(value);
    var len = event.target.value.length;
    if (len > 20) {
      setCityError("is too long");
    } else {
      setCityError("");
    }
  };

  const handleChangeProvince = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setProvinceUser(value);
    var len = event.target.value.length;
    if (len > 20) {
      setProvinceError(" is too long");
    } else {
      setProvinceError("");
    }
  };

  const handleChangeZipcode = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setZipcodeUser(value);
    var len = event.target.value.length;
    if (len > 20) {
      setKodeposError(" is too long");
    } else {
      setKodeposError("");
    }
  };

  const handleChangeStreet = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setStreetUser(value);
    var len = event.target.value.length;
    if (len > 20) {
      setAlamatError(" is too long");
    } else {
      setAlamatError("");
    }
  };

  const handleChangeGender = (event: SelectChangeEvent) => {
    setGenderUser(event.target.value as string);
  };

  const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setImageUser(value);
    var len = event.target.value.length;
    if (len > 100) {
      setLinkError(" is too long");
    } else {
      setLinkError("");
    }
  };

  useEffect(() => {
    fetchDataUserId();
  }, []);

  const fetchDataUserId = async () => {
    let token: string | undefined;
    let id: number | undefined;
    if (auth === undefined) {
      token = "";
      id = 0;
    } else {
      token = auth[0].token;
      id = auth[0].id;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios
      .get(`/users/${id}`, config)
      .then((res) => {
        const { data } = res.data;
        setDataUserID([data]);
        setNameUser(data.name);
        setEmailUser(data.email);
        setGenderUser(data.gender);
        setCityUser(data.address.city);
        setProvinceUser(data.address.province);
        setZipcodeUser(data.address.zipcode);
        setStreetUser(data.address.street);
        setImageUser(data.image);
      })
      .catch((err) => {
        const { data } = err.response;
        if (data.message === "invalid or expired jwt") {
          setAlert({
            message: "Login Expired",
            status: "error",
          });
          setAuth([
            {
              id: 0,
              token: "",
              isAuth: false,
            },
          ]);
          setOpenAlert(true);
          navigate("/login");
          
        }
      })
      .finally(() => {
        setIsReady(true);
      });
  };

  const handleEditUser = () => {
    let token: string | undefined;
    let id: number | undefined;
    if (auth === undefined) {
      token = "";
      id = 0;
    } else {
      token = auth[0].token;
      id = auth[0].id;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (nameUser === "") {
      setNameError(" is required");
    } else if (emailUser === "") {
      setEmailError(" is required");
    } else if (emailError === "") {
      setDisabled(true);
      axios
        .put(
          `users/${id}`,
          {
            name: nameUser,
            email: emailUser,
            gender: genderUser,
            address: {
              city: cityUser,
              province: provinceUser,
              zipcode: zipcodeUser,
              street: streetUser,
            },
            image: imageUser,
          },
          config
        )
        .then((res) => {
          const { data } = res;
          if (data.message === "successful") {
            setAlert({
              message: "Data Telah di Update",
              status: "success",
            });
            setOpenAlert(true);
          }
        })
        .catch((err) => {
          const { data } = err.response;
          if (data.message === "invalid or expired jwt") {
            setAlert({
              message: "Login Expired",
              status: "error",
            });
            setAuth([
              {
                id: 0,
                token: "",
                isAuth: false,
              },
            ]);
            setOpenAlert(true);
            navigate("/login");
            
          }
        })
        .finally(() => {
          window.location.reload();
          fetchDataUserId();
          setOpen(false);
        });
    }
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
           <Avatar src={dataUserID[0].image}  sx={{ width: "100px", height: "100px" }} />
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
            <Typography
              sx={{ width: "100px", fontFamily: "Nunito", fontWeight: "700" }}>
              Nama
            </Typography>
            <Typography sx={{ fontFamily: "Nunito", fontWeight: "700" }}>
              {dataUserID[0].name}
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography
              sx={{ width: "100px", fontFamily: "Nunito", fontWeight: "700" }}>
              Email
            </Typography>
            <Typography sx={{ fontFamily: "Nunito", fontWeight: "700" }}>
              {dataUserID[0].email}
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography
              sx={{ width: "100px", fontFamily: "Nunito", fontWeight: "700" }}>
              Alamat
            </Typography>
            <Typography sx={{ fontFamily: "Nunito", fontWeight: "700" }}>
              {dataUserID[0].address.street +
                " " +
                dataUserID[0].address.city +
                " " +
                dataUserID[0].address.province +
                " " +
                dataUserID[0].address.zipcode}
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography
              sx={{ width: "100px", fontFamily: "Nunito", fontWeight: "700" }}>
              Gender
            </Typography>
            <Typography sx={{ fontFamily: "Nunito", fontWeight: "700" }}>
              {dataUserID[0].gender}
            </Typography>
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
            <Typography
              sx={{
                fontFamily: "Nunito",
                fontWeight: "700",
                fontSize: "28px",
              }}>
              Edit Biodata
            </Typography>
            <Box sx={{ display: "flex", gap: 3, width: "100%" }}>
              <Box sx={{ width: "100%" }}>
                <InputText2
                  textLabel='Nama'
                  errorVal={nameError}
                  placeholder='Masukkan Nama'
                  type='text'
                  onChange={handleChangeName}
                  value={nameUser}
                />
              </Box>

              <Box sx={{ width: "100%" }}>
                <InputText3
                  label='Gender'
                  data={["Laki-Laki", "Perempuan"]}
                  value={genderUser}
                  onChange={handleChangeGender}
                />
              </Box>
            </Box>
            <Box>
              <InputText2
                textLabel='Email'
                errorVal={emailError}
                placeholder='Masukkan Email'
                type='text'
                onChange={handleChangeEmail}
                value={emailUser}
              />
            </Box>
            <Box sx={{ display: "flex", gap: 3, width: "100%" }}>
              <Box sx={{ width: "100%" }}>
                <InputText2
                  textLabel='Provinsi'
                  errorVal={provinceError}
                  placeholder='Masukkan Provinsi'
                  type='text'
                  onChange={handleChangeProvince}
                  value={provinceUser}
                />
              </Box>
              <Box sx={{ width: "100%" }}>
                <InputText2
                  textLabel='Kota'
                  errorVal={cityError}
                  placeholder='Masukkan Kota'
                  type='text'
                  onChange={handleChangeCity}
                  value={cityUser}
                />
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 3, width: "100%" }}>
              <Box sx={{ width: "100%" }}>
                <InputText2
                  textLabel='Kode Pos'
                  errorVal={kodeposError}
                  placeholder='Masukkan Kode Pos'
                  type='text'
                  onChange={handleChangeZipcode}
                  value={zipcodeUser}
                />
              </Box>
              <Box sx={{ width: "100%" }}>
                <InputText2
                  textLabel='Alamat'
                  errorVal={alamatError}
                  placeholder='Masukkan Alamat'
                  type='text'
                  onChange={handleChangeStreet}
                  value={streetUser}
                />
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 3, width: "100%" }}>
              <InputText2
                textLabel='Link Gambar'
                errorVal={linkError}
                placeholder='Masukkan Link Gambar'
                type='text'
                onChange={handleChangeImage}
                value={imageUser}
              />
            </Box>
            <Box>
              <CustomButtonPrimary
                isDisabled={disabledVal}
                caption='Simpan'
                OnClick={handleEditUser}
              />
            </Box>
          </Box>
        </Modal>
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleCloseAlert}>
          <Alert
            onClose={handleCloseAlert}
            color={alert.status}
            sx={{ width: "100%" }}>
            {alert.message}
          </Alert>
        </Snackbar>
      </Box>
    );
  } else {
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
        
      </Box>
    );
  }
}

export default BiodataDiri;
