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
  
  