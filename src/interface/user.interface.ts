export interface IUSERInterface {
  _id: string;
  username: string;
  email: string;
  image: string;
  number: string;
  password: string;
  status: any;
  role: string;
}

export const USER_FIELD: IUSERInterface = {
  _id: "px",
  username: "",
  email: "",
  image: "",
  number: "",
  password: "",
  status: "",
  role: "user",
};
