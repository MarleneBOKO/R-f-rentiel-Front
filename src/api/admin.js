/**
 * Axios
 */
import axios from "axios";

/**
 * @agency
 */

export const addAgency = (schema) => {
  // console.log(schema.email);

  return new Promise((resolve, reject) => {
    axios.post("/agency", schema).then(
      (res) => {
        resolve(res.data);
      },
      (error) => {
        reject(error);
      }
    );
  });
};
export const addBroker = (schema) => {
  // alert("ok");
  // console.log(schema.email);
  // axios.defaults.baseURL = "https://backendreferentiel.herokuapp.com/api/v1/";
  axios.defaults.baseURL = "http://127.0.0.1:3087/api/v1";

  axios.defaults.headers.common["admin-token"] =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzUxZDgyMjBkODIxNDAwMTYwMjRhOGQiLCJpYXQiOjE2NjYzMDgxNjd9.43H5XTd4oFCZmdZwi-hODnqn11PUsdlJHRxMhvADSMI";
  return new Promise((resolve, reject) => {
    axios.post("/broker", schema).then(
      (res) => {
        resolve(res.data);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

export const updateAgency = ({ schema, id }) => {
  // console.log(schema.email);

  return new Promise((resolve, reject) => {
    axios.put("/agency/" + id, schema).then(
      (res) => {
        resolve(res.data);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

export const deleteAgency = ({ id }) => {
  // console.log(schema.email);

  return new Promise((resolve, reject) => {
    axios.delete("/agency/" + id).then(
      (res) => {
        resolve(res.data);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

/**
 * @users
 */

/**
 * @product
 */

export const addProduct = (schema) => {
  // console.log(schema.email);

  return new Promise((resolve, reject) => {
    axios.post("/product", schema).then(
      (res) => {
        resolve(res.data);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

export const updateProduct = ({ schema, id }) => {
  // console.log(schema.email);

  return new Promise((resolve, reject) => {
    axios.put("/product/" + id, schema).then(
      (res) => {
        resolve(res.data);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

export const deleteProduct = ({ id }) => {
  // console.log(schema.email);

  return new Promise((resolve, reject) => {
    axios.delete("/product/" + id).then(
      (res) => {
        resolve(res.data);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

/**
 * @company
 */

export const addCompany = (schema) => {
  // console.log(schema.email);

  return new Promise((resolve, reject) => {
    axios.post("/company", schema).then(
      (res) => {
        resolve(res.data);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

export const updateCompany = ({ schema, id }) => {
  // console.log(schema.email);

  return new Promise((resolve, reject) => {
    axios.put("/company/" + id, schema).then(
      (res) => {
        resolve(res.data);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

export const deleteCompany = ({ id }) => {
  // console.log(schema.email);

  return new Promise((resolve, reject) => {
    axios.delete("/company/" + id).then(
      (res) => {
        resolve(res.data);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

/**
 * @file
 */

export const addFile = (schema) => {
  // console.log(schema.email);

  return new Promise((resolve, reject) => {
    axios.post("/file", schema).then(
      (res) => {
        resolve(res.data);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

export const updateFile = ({ schema, id }) => {
  // console.log(schema.email);

  return new Promise((resolve, reject) => {
    axios.put("/file/" + id, schema).then(
      (res) => {
        resolve(res.data);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

export const deleteFile = ({ id }) => {
  // console.log(schema.email);

  return new Promise((resolve, reject) => {
    axios.delete("/file/" + id).then(
      (res) => {
        resolve(res.data);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

/**
 * @Users
 */

export const addUsers = (schema) => {
  // console.log(schema.email);

  return new Promise((resolve, reject) => {
    axios.post("/user/register", schema).then(
      (res) => {
        resolve(res.data);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

export const updateUsers = ({ schema, id }) => {
  // console.log(schema.email);

  return new Promise((resolve, reject) => {
    axios.put("/user/" + id, schema).then(
      (res) => {
        resolve(res.data);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

export const deleteUsers = ({ id }) => {
  // console.log(schema.email);

  return new Promise((resolve, reject) => {
    axios.delete("/user/" + id).then(
      (res) => {
        resolve(res.data);
      },
      (error) => {
        reject(error);
      }
    );
  });
};
