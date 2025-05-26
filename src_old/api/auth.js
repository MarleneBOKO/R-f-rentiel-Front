/**
 * Axios
 */
import axios from "axios";

/**
 * @profile
 */

export const login = (schema) => {
  // console.log(schema.email);
  const data = {
    email: schema.email,
    password: schema.password,
  };
  if (schema) {
    data.email = schema.email;
    data.password = schema.password;
    return new Promise((resolve, reject) => {
      //   alert(JSON.stringify(schema));
      axios.post("/user/login", data).then(
        (res) => {
          const token = res.data.token;
        //   alert(JSON.stringify(token));
          localStorage.setItem("user-token", token);
          resolve(res.data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
};

export const logout = () => {
  localStorage.setItem("admin-token", "");
  localStorage.setItem("user-token", "");
  location.reload();
};
