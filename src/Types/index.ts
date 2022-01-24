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
//             "id": 9,
//             "name": "Nvidia RTx 2080",
//             "seller": "Bahtiar Subrata",
//             "category": "Graphic Card",
//             "description": "Ini VGA terbaik",
//             "price": 1200000,
//             "stock": 1,
//             "image": "https://cf.shopee.co.id/file/73a01d9a8c77af1534c9b6817e90e944"
