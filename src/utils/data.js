export const defaultMethods = {
  arrayFieldsToInteger(
    item,
    fields = [
      "commission",
      "totalPrime",
      "TTCPrime",
      "netPrime",
      "cdeaoPrime",
      "tax",
      "cdeaoPrime",
      "accessory",
      "accessory100",
      "accessory50",
      "companyNetPrime",
      "companyCommission",
    ]
  ) {
    fields = [
      ...fields,
      ...[
        "commission",
        "totalPrime",
        "TTCPrime",
        "netPrime",
        "tax",
        "cdeaoPrime",
        "accessory",
        "accessory100",
        "accessory50",
        "companyNetPrime",
        "companyCommission",
      ],
    ];
    //alert(JSON.stringify(fields));

    if (item && Array.isArray(fields)) {
      for (let field of fields) {
        if (typeof item[field] === "string") {
          if (item[field]) {
            item[field] = item[field].replaceAll(",", ".");
            item[field] = item[field].replaceAll(/\s/g, "");
            item[field] = parseFloat(item[field]);
          }
        }
      }
    }

    return item;
  },

  getDateFormat(date) {
    if (!date || date == null) return null;
    // const isIso = JSON.stringify(date).includes("T");
    // alert(date.getMonth());
    date = new Date(date);
    const doubleNumber = (nmb) => {
      return parseInt(nmb) > 9 ? nmb : `0${nmb}`;
    };
    return `${date.getFullYear()}-${doubleNumber(
      date.getMonth() + 1
    )}-${doubleNumber(date.getDate())}`;
  },
  getIdList(array) {
    let result = [];
    array.map((item) => {
      result.push(item._id);
    });
    return result;
  },

  getBrokerInfo(array, item) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      if (element.code) {
       
        if (element.code == item) {
          // alert(JSON.stringify(element));
          result.push(element);
        }
      }
    }
    // alert(JSON.stringify(result));
    return result;
  },
  getNameList(array) {
    let result = [];
    // alert(JSON.stringify(array));
    // console.log(array, "Test");
    array.map((item) => {
      /**
       */
      if (item.name) {
        result.push(item.name);
      } else if (item.firstName) {
        result.push(`${item.firstName} ${item.lastName}`);
      } else if (item.fullName) {
        result.push(item.fullName);
      } else if (item.batchNumber) {
        result.push(item.batchNumber);
      }
    });
    //  console.log(result, "test2");
    return result;
  },
  getCompanyAgent(array, items) {
    const result = [];
    for (let a = 0; a < items.length; a++) {
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (element.name == items[a]) {
          element.agents.map((item) => {
            /**
             */

            if (item.firstName || item.lastName) {
              result.push(
                `${item.firstName ? item.firstName : ""} ${item.lastName ? item.lastName : ""
                } (${item.currentPosition}_${element.name}) / ${item.email} `
              );
            }
          });
        }
      }
    }

    return result;
  },
  getCompanyAgentMail(items) {
    const result = [];
    let word = "";
    let start = 0;
    var resultFinal = [];

    for (let a = 0; a < items.length; a++) {
      // alert(items[a]);
      for (let d = 0; d < items[a].length; d++) {
        if (items[a][d] === "/") {
          start = 1;
        }
        if (start == 1) {
          if (items[a][d] === undefined) {
            // alert(word);
            break;
          }
          if (items[a][d] != "/") {
            if (items[a][d] != " ") {
              word += items[a][d];
            }
          }
        }
      }
      start = 0;
      result.push(`"${word}"`);
      word = "";
    }
    resultFinal.push(`[${Array.from(result)}]`);
    return resultFinal;
  },
  getCompanyNameList(array) {
    let result = [];
    array.map((item) => {
      /**
       */
      if (item.company && item.company.name) {
        result.push(item.company.name);
      }
    });
    return result;
  },
  getDocItemsId(array) {
    let result = [];

    array.map((item) => {
      /**
       */
      if (item._id) {
        result.push(item._id);
      }
    });
    return result;
  },
getItemId(array, item) {
  console.log('[getItemId] item reçu :', item);

  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (element.name) {
      if (element.name == item) {
        console.log('[getItemId] Match avec name:', element);
        return element._id;
      }
    } else if (element.firstName) {
      if (`${element.firstName} ${element.lastName}` == item) {
        console.log('[getItemId] Match avec firstName + lastName:', element);
        return element._id;
      }
    } else if (element.fullName) {
      if (element.fullName == item) {
        console.log('[getItemId] Match avec fullName:', element);
        if (element._id) return element._id;
        if (element.id) return element.id;
      }
    }
  }

  console.warn('[getItemId] Aucun match trouvé pour :', item);
  return undefined;
},

  getItemsId(array, items) {
    // alert(JSON.stringify(items));
    const result = [];
    for (let a = 0; a < items.length; a++) {
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (element.name == items[a]) {
          result.push(element._id);
          break;
        } else if (element.firstName) {
          if (`${element.firstName} ${element.lastName}` == items[a]) {
            result.push(element._id);
            break;
          }
        } else if (element.batchNumber) {
          if (element.batchNumber == items[a]) {
            result.push(element._id);
            break;
          }
        }
      }
    }

    return result;
  },
  getItemsContact(array, item) {
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      if (element.name) {
        if (element.name == item) return element.contact;
      }
    }
    return undefined;
  },
  getItemsEmail(array, items) {
    const result = [];
    if (!items || !Array.isArray(items) || items == []) return [];

    for (let a = 0; a < items.length; a++) {
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (element.name == items[a]) {
          result.push(element.email);
          //alert("1");
          break;
        } else if (element.firstName) {
          //alert('ok')
          if (`${element.firstName} ${element.lastName}` == items[a]) {
            result.push(element.email);
            // alert("2");
            break;
          } else if (`${element.lastName} ${element.firstName}` == items[a]) {
            result.push(element.email);
            // alert("3");
            break;
          }
        } else if (`${element.fullName}` == items[a]) {
          result.push(element.email);
          // alert("3");
          break;
        }
      }
    }
    return result;
  },
  getItemsName(array, items) {
    const result = [];
    for (let a = 0; a < items.length; a++) {
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (element._id == items[a]) {
          result.push(element.name);
          break;
        }
      }
    }
    return result;
  },
  getItemName(array, item) {
    // alert(item);
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      if (element._id) {
        if (element._id == item) {
          if (element.name) {
            return element.name;
          } else if (element.firstName || element.lastName)
            return `${element.firstName} ${element.lastName}`;
        }
      }
    }
    return item;
  },

  getStringFromArray(array) {
    if (Array.isArray(array)) {
      return array.join(",");
    }
  },
  limitTextCharacters(text, limit = 200) {
    if (text.length > limit) return text.slice(0, limit - 3) + "...";
    return text;
  },

  /**
   * @dispatch
   * @error
   */
  dispatchError($store, message = "Something went wrong") {
    $store.dispatch("setSnackMessage", {
      message,
      snackbar: {
        bg: "red",
        color: "white",
        status: true,
      },
    });
  },

  /**
   * @dispatch success
   */
  dispatchSuccess($store, message = "Operation réalisé avec success") {
    $store.dispatch("setSnackMessage", {
      message: message,
      snackbar: {
        color: "red",
        status: true,
      },
    });
  },

  /**
   *
   */
};

export const messages = {
  accountDisabled: `Account disabled "`,
  accessDenied: `Access denied`,
  requireLogin: `Required login`,
  invalidLogin: `Invalid login information`,
  canNotFind: (what) => `Can not find ${what}`,
  alreadyExist: (what) => `${what} exist deja`,
  alreadyClose: (what) => `${what} is already close`,
  inProgress: (what) => `Vous avez ${what} en cours`,
  balance: (balance) => `Votre solde est de ${balance} `,
  isNAN: (what) => `${what} n'est pas un nombre`,
  isNotValid: (what) => `${what} n'est pas valid`,
  isNotVerify: (what) => `${what} n'est pas verifié`,
  isRequired: (what) => `${what} est obligatoire`,
  failedToLoad: (what) => `Probléme lors du chargement ${what}`,
  failedTOcreate: (what) => `Probléme lors de la création ${what} `,
  createdSuccessfully: (what) => `${what} a été créé avec success`,
  canceledSuccessfully: (what) => `${what} a été annulé avec success`,
  sendedSuccessfully: (what) => `${what} sended successfully`,
  updatedSuccessfully: (what) => `${what} updated successfully`,
  deletedSuccessfully: (what) => `${what} deleted successfully`,
  removedSuccessfully: (what) => `${what} removed successfully`,
  notBelongsToYou: (what) => `${what} n'est pas le tient`,
  defaultError: `Something went wrong`,
  defaultSuccess: `Opération réalisée avec succès`,
};

/**
 * @Rules
 */
export const rules = {
  required: (v) =>
    !!v ||
    `
Ce champ est obligatoire`,
  email: (v) => /.+@.+\..+/.test(v) || "L'email doit être valide",
};
























