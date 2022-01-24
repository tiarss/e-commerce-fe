import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import { BrowserRouter, Route } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Footer from '../components/Footer';
import axios from 'axios';
import {dataProductTypes} from "../Types/index";
import Modal from "@mui/material/Modal";
import { readParams } from '../utils/navigation'
import { CustomButtonPrimary, CustomButtonSecondary } from '../components/CustomButton';
import { useLocalStorage } from "../utils/useLocalStorage";
import { authTypes } from "../Types";
import { useNavigate } from "react-router-dom";



function DetailProduct(props:any) {
  const dataProductDefault: dataProductTypes[] = [];
  const [dataProductID, setDataProductID] = useState(dataProductDefault);
  const [categoryProduct, setProductCategory] = useState<string>("");
  const [nameProduct, setNameProduct] = useState<string>("");
  const [descriptionProduct, setDescriptionProduct] = useState<string>("");
  const [priceProduct, setPriceProduct] = useState<number>(0)
  const [sellerProduct, setSellerProduct] = useState<string>("")
  const [stockProduct, setStockProduct] = useState<string>("")
  const [imageProduct, setImageProduct] = useState<string>("")
  const [isReady, setIsReady] = useState<boolean>(false);
  const [auth] = useLocalStorage<authTypes[] | undefined>("auth", []);
  let navigate = useNavigate(); 
  
  const addToCart = async () =>{
let token: string | undefined;
    let idUser: number | undefined;
    let id = parseInt(`${props.params.id}`)

    if (auth === undefined) {
      token = "";
      idUser = 0;
    } else {
      token = auth[0].token;
      idUser = auth[0].id;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(
        `/carts/${idUser}`,
        {
          productid: id,
        },
        config
      )
      .then((res) => {
        console.log(res);
      });

    // const idCart = id
    // setAddCarts()
  };

  useEffect(() => {
    fetchDataProductID();
  }, []);

  const fetchDataProductID = async () => {
    await axios
      .get(`/products/${props.params.id}`)
      .then((res) => {
        const { data } = res.data;
        setDataProductID([data]);
        setProductCategory(data.category)
        setDescriptionProduct(data.description)
        setNameProduct(data.name)
        setPriceProduct(data.price)
        setSellerProduct(data.seller)
        setStockProduct(data.stock)
        setImageProduct(data.image)
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsReady(true);
      });
  };

  if(isReady){
  return (
      <Box>
        <Box sx={{ 
          display:"flex",
          justifyContent: {xs:"center", sm:"left"},
          flexDirection: {xs:"column", sm:"row", md:"row"},
         margin:{xs:"15px", sm:"20px" ,md:"40px"},
         minHeight:"80vh"
         }}>
           <Box sx={{ width:{xs:"80%", sm:"50%"}, alignItems:"center", }}>
             <img style={{ width:"50%" }} src={dataProductID[0].image}/>
             <p></p>
             <CustomButtonPrimary caption='Tambah Ke Keranjang' OnClick={addToCart} />
             
           </Box>
           <Box sx={{ minWidth:{xs:"80%", sm:"50%", md:"60%"} }}>
             <h1 style={{ color:"#2296CB" }}>{dataProductID[0].name}</h1>
             <p>{dataProductID[0].price}</p>
             <p style={{ wordWrap:"break-word" }}>{dataProductID[0].description}</p>             
           </Box>          
        </Box>        
        <Footer/>          
      </Box>    
  );
  } else {
    return <Box>Loading</Box>
  }
}
export default readParams(DetailProduct);


//apakah setelah klik tambah keranjang, muncul modal atau ada button khusus untuk menambah jumlah barang
