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
import { dataProductUserTypes } from "../Types";
import { InputText2, InputText3 } from "../components/InputText";

const token: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJlbWFpbCI6ImJhaHRpYXJAZ21haWwuY29tIiwiZXhwIjoxNjQyOTIzMjQxLCJpZCI6NH0.WkVbA9nm5CQSFSSnJZ8U6hmFGpg0liDLhP2cHu_QlV8";
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

function Barangku() {
  const dataProductDefault: dataProductUserTypes[] = [];

  const [categoryProduct, setCategoryProduct] = useState<string>("");
  const [nameProduct, setNameProduct] = useState<string>("");
  const [priceProduct, setPriceProduct] = useState<number>(0);
  const [stockProduct, setStockProduct] = useState<number>(1);
  const [descriptionProduct, setDescriptionProduct] = useState<string>("");
  const [imageProduct, setImageProduct] = useState<string>("");

  const [dataProductUser, setDataProductUser] = useState(dataProductDefault);
  const [currentId, setCurrentId] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetchDataProductUser();
  }, []);

  const fetchDataProductUser = async () => {
    await axios
      .get("products", {
        params: {
          uid: 4,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        setDataProductUser(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsReady(true);
      });
  };

  const handleChangeCategory = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setCategoryProduct(value);
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNameProduct(value);
  };

  const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const toNumber = parseInt(value);
    setPriceProduct(toNumber);
  };

  const handleChangeStock = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const toNumber = parseInt(value);
    setStockProduct(toNumber);
  };

  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setDescriptionProduct(value);
  };

  const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setImageProduct(value);
  };

  const handleOpenModal = () => {
    setOpen(true);
    setCategoryProduct("");
    setNameProduct("");
    setPriceProduct(0);
    setStockProduct(1);
    setDescriptionProduct("");
    setImageProduct("");
  };

  const handleAddProduct = () => {
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
          config
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setOpen(false);
          setCurrentId(0);
          fetchDataProductUser();
        });
    } else {
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
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setOpen(false);
          setCurrentId(0);
          fetchDataProductUser();
        });
    }
  };

  const handleEditProduct = (id: number) => {
    setCurrentId(id);
    axios
      .get(`products/${id}`, {
        params: {
          uid: 4,
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
        console.log(err);
      })
      .finally(() => {
        setOpen(true);
      });
  };

  const handleDeleteProduct = (id: number) => {
    console.log(id);
    axios
      .delete(`/products/${id}`, config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        fetchDataProductUser();
      });
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
        <Box>
          {dataProductUser.map((value) => (
            <Accordion key={value.id} sx={{borderRadius: "10px", margin: "10px 0px"}}>
              <AccordionSummary
                sx={{backgroundColor: "#2296CB", borderRadius: "10px 10px 0px 0px"}}
                expandIcon={<ExpandMoreIcon sx={{color: "white"}} />}
                aria-controls='panel1a-content'
                id='panel1a-header'>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    sx={{
                      fontFamily: "Nunito",
                      fontSize: "18px",
                      fontWeight: "700",
                      color: "white"
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
              <AccordionDetails sx={{padding: "20px"}}>
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
                      Harga : {value.price}
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
              width: { xs: "350px", sm: "400px", md: "700px" },
              bgcolor: "background.paper",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.250);",
              display: "flex",
              flexDirection: "column",
              gap: 3,
              p: 4,
            }}>
            <Box sx={{ display: "flex", gap: 3 }}>
              <Box sx={{ width: "100%" }}>
                <InputText2
                  textLabel='Nama'
                  placeholder='Masukkan Nama Produk'
                  type='text'
                  onChange={handleChangeName}
                  value={nameProduct}
                />
              </Box>
              <Box sx={{ width: "100%" }}>
                <InputText3
                  label='Kategori'
                  data={["Processor", "Graphic Card"]}
                  value={categoryProduct}
                  onChange={handleChangeCategory}
                />
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 3 }}>
              <Box sx={{ width: "100%" }}>
                <InputText2
                  textLabel='Harga'
                  placeholder='Masukkan Harga Produk'
                  type='number'
                  onChange={handleChangePrice}
                  value={priceProduct}
                />
              </Box>
              <Box sx={{ width: "100%" }}>
                <InputText2
                  textLabel='Stock'
                  placeholder='Masukkan Stock Produk'
                  type='number'
                  onChange={handleChangeStock}
                  value={stockProduct}
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
                />
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 3 }}>
              <Box sx={{ width: "100%" }}>
                <InputText2
                  textLabel='Link Gambar'
                  placeholder='Masukkan Link Gambar Produk'
                  type='text'
                  onChange={handleChangeImage}
                  value={imageProduct}
                />
              </Box>
            </Box>
            <Box>
              <CustomButtonPrimary
                caption='Tambahkan'
                OnClick={handleAddProduct}
              />
            </Box>
          </Box>
        </Modal>
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
        Loading
      </Box>
    );
  }
}

export default Barangku;