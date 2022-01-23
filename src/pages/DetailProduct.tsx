import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import { BrowserRouter, Route } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Footer from '../components/Footer';
import axios from 'axios';
import {dataProductTypes} from "../Types/index";
import Modal from "@mui/material/Modal";
import { CustomButtonPrimary, CustomButtonSecondary } from '../components/CustomButton';

const token: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJlbWFpbCI6IiIsImV4cCI6MTY0Mjg5NTcwOCwiaWQiOjV9.gfj-cyM-O1LQXiX5IXJ6yA06XCF8D9hlgS1OtM73tOA";
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

function DetailProduct() {
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

  const bringData = async () =>{
    await axios.post("http://52.77.229.210:3000/users", {
      // update this function to add product in cart
  
    }).then((res)=>{
       console.log(res)
    })
 }

  useEffect(() => {
    fetchDataProductID();
  }, []);

  const fetchDataProductID = async () => {
    await axios
      .get("http://52.77.229.210:3000/products/1", config)
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
        <Header/>
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
             <CustomButtonPrimary caption='Tambah Ke Keranjang' OnClick={bringData} />
             
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
export default DetailProduct;


//apakah setelah klik tambah keranjang, muncul modal atau ada button khusus untuk menambah jumlah barang
