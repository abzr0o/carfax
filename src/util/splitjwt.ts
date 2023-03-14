import { verify } from "jsonwebtoken";

const decode = (token: string) => {
  const data = verify(token, "test") as {
    email: string;
    username: string;
    isAdmin: boolean;
    id: string;
  };
  return data;
};

export default decode;
