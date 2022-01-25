import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  CustomButtonPrimary,
  CustomButtonSecondary,
} from "../components/CustomButton";
import Modal from "@mui/material/Modal";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "@fontsource/nunito/700.css";
import axios from "axios";
import { alertType, authTypes, dataProductUserTypes } from "../Types";
import { InputText2, InputText3 } from "../components/InputText";
import { useLocalStorage } from "../utils/useLocalStorage";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

function Barangku() {
  const navigate = useNavigate();
  const dataProductDefault: dataProductUserTypes[] = [];
  const [auth, setAuth] = useLocalStorage<authTypes[]>("auth", []);

  const [categoryProduct, setCategoryProduct] = useState<string>("");
  const [nameProduct, setNameProduct] = useState<string>("");
  const [priceProduct, setPriceProduct] = useState<number>(0);
  const [stockProduct, setStockProduct] = useState<number>(1);
  const [descriptionProduct, setDescriptionProduct] = useState<string>("");
  const [imageProduct, setImageProduct] = useState<string>("");

  const [dataProductUser, setDataProductUser] = useState(dataProductDefault);
  const [currentId, setCurrentId] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);

  const [nameError, setNameError] = useState<string>("");
  const [categoryError, setCategoryError] = useState<string>("");
  const [priceError, setPriceError] = useState<string>("");
  const [stockError, setStockError] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<string>("");
  const [linkError, setLinkError] = useState<string>("");
  const [disabled, setDisabled] = useState<boolean>(false);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const [openAlert, setOpenAlert] = React.useState(false);
  const [alert, setAlert] = useState<alertType>({
    message: "",
    status: "info",
  });
  // setOpenAlert(true);

  const handleCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  useEffect(() => {
    fetchDataProductUser();
  }, []);

  const fetchDataProductUser = async () => {
    let token: string | undefined;
    let idUser: number | undefined;
    if (auth === undefined) {
      token = "";
      idUser = 0;
    } else {
      token = auth[0].token;
      idUser = auth[0].id;
    }

    await axios
      .get("/products", {
        params: {
          uid: idUser,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        setDataProductUser(data.products);
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

  const handleChangeCategory = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setCategoryProduct(value);
    if(event.target.value!==""){
      setCategoryError("")
    }
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNameProduct(value);
    var len =event.target.value.length
    if(len>20){
     setNameError(" is too long")
    } 
    else{
    setNameError("")
    }
  };

  const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const toNumber = parseInt(value);
    setPriceProduct(toNumber);
    if(toNumber<1){
      setPriceError(" has min value 1")
    }else{
      setPriceError("")
    }
  };

  const handleChangeStock = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const toNumber = parseInt(value);
    setStockProduct(toNumber);
    if(toNumber<1){
      setPriceError(" has min value 1")
    }else{
      setPriceError("")
    }
  };

  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setDescriptionProduct(value);
    var len =event.target.value.length
    if(len>100){
     setDescriptionError(" is too long")
    } 
    else{
    setDescriptionError("")
    }
  };

  const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setImageProduct(value);
    var len =event.target.value.length
    if(len>100){
     setLinkError(" is too long")
    } 
    else{
    setLinkError("")
    }
  };

  const handleOpenModal = () => {
    setCurrentId(0);
    setOpen(true);
    setCategoryProduct("");
    setNameProduct("");
    setPriceProduct(0);
    setStockProduct(1);
    setDescriptionProduct("");
    setImageProduct("");
  };

  const handleAddProduct = () => {
    let token: string | undefined;
    if (auth === undefined) {
      token = "";
    } else {
      token = auth[0].token;
    }
    if(nameProduct===""){
      setNameError(" is required")
   } else if(categoryProduct===""){
      setCategoryError(" is required")
   }
      else if(priceProduct===null){
      setPriceError(" cannot be null")
    }
      else if(stockProduct<1){
      setCategoryError(" min 1")
    }
      else if(descriptionProduct===""){
      setDescriptionError(" is required")
    }
      else if(imageProduct===""){
      setLinkError(" is required")
    }
      else if(nameError==="" && categoryError==="" && 
      priceError==="" && stockError==="" && descriptionError==="" &&
      linkError===""){
       setDisabled(true)

    if (currentId === 0) {
      axios
        .post(
          "/products",
          {
            name: nameProduct,
            category: categoryProduct,
            description: descriptionProduct,
            price: priceProduct,
            stock: stockProduct,
            image: imageProduct,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          const { data } = res;
          if (data.message === "successful") {
            setAlert({
              message: "Barang Telah di Tambahkan",
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
          setOpen(false);
          setCurrentId(0);
          fetchDataProductUser();
        });
    } else {
      let token: string | undefined;
      if (auth === undefined) {
        token = "";
      } else {
        token = auth[0].token;
      }
      axios
        .put(
          `products/${currentId}`,
          {
            name: nameProduct,
            category: categoryProduct,
            description: descriptionProduct,
            price: priceProduct,
            stock: stockProduct,
            image: imageProduct,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          const { data } = res;
          if (data.message === "successful") {
            setAlert({
              message: "Barang Telah di Edit",
              status: "warning",
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
          setOpen(false);
          setCurrentId(0);
          fetchDataProductUser();
        });
    }
  }
  };

  const handleEditProduct = (id: number) => {
    let token: string | undefined;
    let idUser: number | undefined;
    if (auth === undefined) {
      token = "";
      idUser = 0;
    } else {
      token = auth[0].token;
      idUser = auth[0].id;
    }

    setCurrentId(id);
    axios
      .get(`products/${id}`, {
        params: {
          uid: idUser,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        setCategoryProduct(data.category);
        setNameProduct(data.name);
        setPriceProduct(data.price);
        setStockProduct(data.stock);
        setDescriptionProduct(data.description);
        setImageProduct(data.image);
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
        setOpen(true);
      });
  };

  const handleDeleteProduct = (id: number) => {
    let token: string | undefined;
    let idUser: number | undefined;
    if (auth === undefined) {
      token = "";
      idUser = 0;
    } else {
      token = auth[0].token;
      idUser = auth[0].id;
    }

    axios
      .delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const { data } = res;
        console.log(data)
        if (data.message === "successful") {
          setAlert({
            message: "Barang Telah di Hapus",
            status: "error",
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
        fetchDataProductUser();
        // window.location.reload();
      });
  };

  if (isReady) {
    return (
      <Box
        sx={{
          Height: "400px",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.250);",
          borderRadius: "10px",
          marginTop: "10px",
          marginBottom: "50px",
          padding: "20px",
        }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}>
          <Typography
            sx={{ fontFamily: "Nunito", fontSize: "18px", fontWeight: "700" }}>
            Barangku
          </Typography>
          <CustomButtonPrimary
            caption='Tambah Barang'
            OnClick={handleOpenModal}
          />
        </Box>
        <Box sx={{ overflowY: "scroll", height: "400px" }}>
          {dataProductUser.map((value) => (
            <Accordion
              key={value.id}
              sx={{
                ".MuiAccordion-root": { borderRadius: "20px" },
                margin: "10px 0px",
                overflow: "hidden",
              }}>
              <AccordionSummary
                sx={{
                  backgroundColor: "#2296CB",
                  borderRadius: "10px 10px 0px 0px",
                  overflow: "hidden",
                }}
                expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                aria-controls='panel1a-content'
                id='panel1a-header'>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    sx={{
                      fontFamily: "Nunito",
                      fontSize: "18px",
                      fontWeight: "700",
                      color: "white",
                    }}>
                    {value.name}
                  </Typography>
                  <Box
                    sx={{
                      marginLeft: "10px",
                      padding: "5px 10px",
                      backgroundColor: "#1767A0",
                      borderRadius: "20px",
                    }}>
                    <Typography
                      sx={{
                        fontFamily: "Nunito",
                        fontSize: "12px",
                        fontWeight: "700",
                        color: "white",
                      }}>
                      {value.category}
                    </Typography>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: "20px" }}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 4,
                    flexDirection: { xs: "column", sm: "row" },
                  }}>
                  <Box sx={{ width: { xs: "100%", sm: "20%" } }}>
                    <img style={{ width: "135px" }} src={value.image} alt='' />
                  </Box>
                  <Box sx={{ width: { xs: "100%", sm: "80%" } }}>
                    <Typography
                      sx={{
                        fontFamily: "Nunito",
                        fontSize: "14px",
                        fontWeight: "700",
                      }}>
                      Stok : {value.stock}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Nunito",
                        fontSize: "14px",
                        fontWeight: "700",
                      }}>
                      Harga : {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value.price!)}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Nunito",
                        fontSize: "14px",
                        fontWeight: "700",
                      }}>
                      Deskripsi :{" "}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "Nunito",
                        fontSize: "14px",
                        fontWeight: "700",
                      }}>
                      {value.description}
                    </Typography>
                    <Box
                      sx={{
                        marginTop: { xs: "20px", md: "0px" },
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 2,
                      }}>
                      <CustomButtonPrimary
                        caption='Edit Produk'
                        OnClick={() => handleEditProduct(value.id)}
                      />
                      <CustomButtonSecondary
                        caption='Hapus Produk'
                        OnClick={() => handleDeleteProduct(value.id)}
                      />
                    </Box>
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
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
              width: { xs: "320px", sm: "400px", md: "700px" },
              bgcolor: "background.paper",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.250);",
              display: "flex",
              flexDirection: "column",
              gap: { xs: 1, md: 3 },
              p: 4,
            }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: { xs: 1, md: 3 },
              }}>
              <Box sx={{ width: "100%" }}>
                <InputText2
                  textLabel='Nama'
                  placeholder='Masukkan Nama Produk'
                  type='text'
                  onChange={handleChangeName}
                  value={nameProduct}
                  errorVal={nameError}
                />
              </Box>
              <Box sx={{ width: "100%" }}>
                <InputText3
                  label='Kategori'
                  data={["Processor", "Graphic Card", "Internal Storage", "RAM"]}
                  value={categoryProduct}
                  onChange={handleChangeCategory}
                  errorVal={categoryError}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: { xs: 1, md: 3 },
              }}>
              <Box sx={{ width: "100%" }}>
                <InputText2
                  textLabel='Harga'
                  placeholder='Masukkan Harga Produk'
                  type='number'
                  onChange={handleChangePrice}
                  value={priceProduct}
                  errorVal={priceError}
                />
              </Box>
              <Box sx={{ width: "100%" }}>
                <InputText2
                  textLabel='Stock'
                  placeholder='Masukkan Stock Produk'
                  type='number'
                  onChange={handleChangeStock}
                  value={stockProduct}
                  errorVal={stockError}
                />
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 3 }}>
              <Box sx={{ width: "100%" }}>
                <InputText2
                  textLabel='Deskripsi'
                  placeholder='Masukkan Deskripsi Produk'
                  type='text'
                  onChange={handleChangeDescription}
                  value={descriptionProduct}
                  errorVal={descriptionError}
                />
              </Box>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Box sx={{ width: "100%" }}>
                <InputText2
                  textLabel='Link Gambar'
                  placeholder='Masukkan Link Gambar Produk'
                  type='text'
                  onChange={handleChangeImage}
                  value={imageProduct}
                  errorVal={linkError}
                />
              </Box>
            </Box>
            <Box>
              <CustomButtonPrimary
                caption='Tambahkan'
                OnClick={handleAddProduct}
                isDisabled={disabled}
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
        }}>
        
      </Box>
    );
  }
}

export default Barangku;
