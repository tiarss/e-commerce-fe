import { Box } from "@mui/material";
import CardProduct from "../components/CardProduct";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SummaryDetail from "../components/SummaryDetail";
import React, { useEffect, useState } from "react";
import { CustomButtonPrimary } from "../components/CustomButton";
import { authTypes, cartDetailsType, cartDetailUpdate } from "../Types";
import { useLocalStorage } from "../utils/useLocalStorage";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ShoppingCard: React.FC = (props) => {
  const navigate = useNavigate()
  const cartDetailsDefault: cartDetailsType[] = [];
  const [auth, setAuth] = useLocalStorage<authTypes[] | undefined>("auth", []);
  const [cartDetails, setCartDetails] = useState(cartDetailsDefault);
  const [cartTotalPrice, setCartTotalPrice] = useState<number>(0)
  const [cartUpdate, setCartUpdate] = useState([])
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    fetchDataShoppingCart();
  }, []);


  const handleDeleteItem = (idProduct: number) =>{
    const filtering = cartDetails?.filter(value => value.productid !== idProduct)
    setCartDetails(filtering)
  }

  const handleAddQty = (idProduct: number)=>{
    const temp = cartDetails.map((value)=>{
      if(value.productid === idProduct){
        console.log(value.qty)
        return {...value, qty: value.qty+1}
      }else{
        return value
      }
    })

    setCartDetails(temp)
    
  }
  const handleMinQty = (idProduct: number)=>{
    const temp = cartDetails.map((value)=>{
      if(value.productid === idProduct){
        console.log(value.qty)
        return {...value, qty: value.qty-1}
      }else{
        return value
      }
    })

    setCartDetails(temp)
  }

  const fetchDataShoppingCart = async () => {
    let token: string | undefined;
    let idUser: number | undefined;
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

    await axios.get(`/carts/${idUser}`, config).then((res) => {
      const { data } = res.data;
      console.log(data)
      setCartDetails(data.shoppingcart.cartdetail);
      setCartTotalPrice(data.shoppingcart.totalprice)
    }).catch((err)=>{
      console.log(err)
    }).finally(()=>{
      setIsReady(true)
    });
  };

  const updateCart = async () =>{
    let updatedCart: cartDetailUpdate[] = []

    cartDetails?.map(value =>{
      updatedCart.push({productid: value.productid, qty: value.qty })
    })

    let token: string | undefined;
    let idUser: number | undefined;
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

    await axios.put(`/carts/${idUser}`,{
      boq: updatedCart
    },config).then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    }).finally(()=>{
      fetchDataShoppingCart()
    })
  }

  const toOrder = () =>{
    navigate("/finalorder")
  }

  if (isReady) {
    return (
      <Box>
        <Header isHidden={isHidden}/>
        <Box
          sx={{
            minHeight: "80vh",
            padding: { xs: "10px", sm: "20px", md: "50px" },
          }}>
          <Box>
            <h1 style={{ color: "#309DCE", fontSize: "130%" }}>
              Shopping Card Detail
            </h1>
            {cartDetails?.map((value)=> (
              <CardProduct
              key={value.productid}
                srcImage={value.productimage}
                productTitle={value.productname}
                productPrice={0}
                productStock={value.stock}
                productCount={value.qty}
                sumPrice={value.subtotal}
                addQty={()=>handleAddQty(value.productid)}
                minQty={()=>handleMinQty(value.productid)}
                handleDelete={()=>handleDeleteItem(value.productid)}
              />
            ))
            }
          </Box>
          <Box
            sx={{
              alignItems: "center",
              justifyContent: "flex-end",
              display: "flex",
            }}>
            <Box>
              <SummaryDetail qty={0} shipping='0' sumPrice={cartTotalPrice} />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              justifyContent: "flex-end",
              marginTop: "20px",
            }}>
            <CustomButtonPrimary caption='Update Keranjang' OnClick={updateCart} />
            <CustomButtonPrimary caption='Checkout' OnClick={toOrder} />
          </Box>
        </Box>

        <Footer />
      </Box>
    );
  } else {
    return <Box>Loading</Box>;
  }
};

export default ShoppingCard;
