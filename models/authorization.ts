import { IMetaData } from "./general";

interface IAddressType {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}
export interface IUserType {
  id?: number;
  username: string;
  email: string;
  password: string;
  phone: string;

  firstName: string;
  lastName: string;
  maidenName: string;
  gender: "male" | "female" | "no mention";
  age: number;
  birthDate: Date;

  image: string;
  address: IAddressType;
  company: {
    department: string;
    name: string;
    title: string;
    address: IAddressType;
  };

  role: "admin" | "moderator" | "user";
}

export interface IUserFetch extends IMetaData {
  users: IUserType[];
}
export interface IAuthType extends IUserType {
  accessToken: string;
  refreshToken: string;
}

export type UserLoginType = {
  email: string;
  password: string;
};

export type UserRegisterType = {
  name: string;
  email: string;
  password: string;
};
