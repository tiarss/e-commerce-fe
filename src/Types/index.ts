export type dataProductTypes = {
  id: number;
  category: string;
  image: string;
  name: string;
  description: string;
  price: number;
  seller: string;
  stock: number;
};

type addressType = {
  street: string;
  city: string;
  province: string;
  zipcode: string;
};

export type dataUserIDTypes = {
  address: addressType;
  dob: string;
  gender: string;
  email: string;
  image: string;
  name: string;
  password: string;
};

export type dataProductUserTypes = {
  id: number,
  category: string,
  name: string,
  seller: string,
  description: string,
  price: number,
  stock: number,
  image: string
};

export type authTypes = {
  id: number | undefined,
  token: string | undefined,
  isAuth: boolean | undefined
}

export type burgerProps = {
  isAuth?: boolean,
  name?: string
  onLogOut?: ()=>void
}

export type toSendCart = {
  id?: string
  qty?: number
  price?: number
}

export type alertType = {
  message: string;
  status: "error" | "info" | "success" | "warning" | undefined;
};

export type cartDetailsType = {
  productid: number,
  productimage: string,
  productname: string,
  qty: number
  stock: number
  subtotal: number
}

export type updateCartType ={
  boq: cartDetailUpdate[]
}

export type cartDetailUpdate ={
  productid: number,
  qty: number
}

export type productHistoryType = {
  checkedoutcartdetail: any[],
  status: string,
  totalprice: number
  id : number
}


