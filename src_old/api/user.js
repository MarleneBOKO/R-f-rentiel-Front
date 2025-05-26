/**
 * Axios
 */
import axios from "axios";

/**
 * @call
 */
export const makeCapture = () => {
    // console.log(schema.email);

    return new Promise((resolve, reject) => {
        axios.post(`/sinister/capture-psap-statistical`).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const addCall = ({ id, schema }) => {
    // console.log(schema.email);

    return new Promise((resolve, reject) => {
        axios.post(`/file/${id}/call`, schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
// profile management
export const updateUsers = ({ schema }) => {
    // console.log(schema.email);

    return new Promise((resolve, reject) => {
        axios.put("/user/profile", schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const updateCall = ({ schema, id }) => {
    return new Promise((resolve, reject) => {
        axios.put(`/file/call/${id}`, schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const addstudyMatéérial = ({ schema }) => {
    // console.log(schema.email);
    return new Promise((resolve, reject) => {
        axios.post(`/materialstudy`, schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const addstudyIndividual = ({ schema }) => {
    // console.log(schema.email);
    return new Promise((resolve, reject) => {
        axios.post(`/individualbody`, schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
}
export const addstudyBody = ({ schema }) => {
    // console.log(schema.email);
    return new Promise((resolve, reject) => {
        axios.post(`/bodystudy`, schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const addstudyIndividualBody = ({ schema }) => {
    // console.log(schema.email);
    return new Promise((resolve, reject) => {
        axios.post(`/individualbody`, schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const addDeathStudy = ({ schema }) => {
    // console.log(schema.email);
    return new Promise((resolve, reject) => {
        axios.post(`/deathstudy`, schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const addBeneficiary = ({ schema }) => {
    // console.log(schema.email);
    return new Promise((resolve, reject) => {
        axios.post(`/beneficiary`, schema).then(
            (res) => {
                resolve(res.data);
                // if (schema.receptionServiceSendDate) {
                //   axios.post(`/check`, {
                //     studyOffer: id,
                //   });
                // }
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const removeBeneficiary = ({ schema, id }) => {
    // console.log(schema.email);
    return new Promise((resolve, reject) => {
        axios.post(`/beneficiary/${id}/cancel-check`, schema).then(
            (res) => {
                resolve(res.data);
                // if (schema.receptionServiceSendDate) {
                //   axios.post(`/check`, {
                //     studyOffer: id,
                //   });
                // }
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const updateBeneficiary = ({ schema, id, studyOffer, sinisterVictim }) => {
    // alert(JSON.stringify(schema))
    return new Promise((resolve, reject) => {
        axios.put(`/beneficiary/${id}`, schema).then(
            (res) => {
                resolve(res.data);
                if (schema.receptionServiceSendDate) {
                    axios.post(`/check`, {
                        studyOffer: studyOffer,
                        beneficiary: id,
                        sinisterVictim: sinisterVictim,
                        beneficiaryType: schema.beneficiaryType,
                        settlementAmount: schema.amount,
                        //checkNumber: schema.checkNumber,
                        //checkDate: schema.checkDate,
                        //bank: schema.bank,
                    });
                }
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const addDegat = ({ schema }) => {
    // console.log(schema.email);
    return new Promise((resolve, reject) => {
        axios.post(`/materialdamage`, schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const updateDegat = ({ schema, id }) => {
    return new Promise((resolve, reject) => {
        axios.put(`/materialdamage/${id}`, schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};


export const addMorePayement = ({ schema }) => {
    return new Promise((resolve, reject) => {
        axios.post(`/otherpayment`, schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const updateMorePayement = ({ schema, id }) => {
    return new Promise((resolve, reject) => {
        axios.put(`/otherpayment/${id}`, schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const addAyantDroit = ({ schema }) => {
    return new Promise((resolve, reject) => {
        axios.post(`/haveright`, schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const deleteAyantDroit = ({ id }) => {
    return new Promise((resolve, reject) => {
        axios.delete(`/haveright/${id}`).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const updateAyantDroit = ({ schema, id }) => {
    return new Promise((resolve, reject) => {
        axios.put(`/haveright/${id}`, schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const addBatch = ({ schema }) => {
    // console.log(schema.email);
    return new Promise((resolve, reject) => {
        axios.post(`/batch`, schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const updateLitigation = ({ schema, id }) => {
    return new Promise((resolve, reject) => {
        axios.put(`/litigation/${id}`, schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};

export const updateBatch = ({ schema, id }) => {
    return new Promise((resolve, reject) => {
        axios.put(`/batch/${id}`, schema).then(
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
 * @appointment
 */

export const addAppointment = ({ id, schema }) => {
    // console.log(schema.email);
    return new Promise((resolve, reject) => {
        axios.post(`/file/${id}/appointment`, schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};

export const updateAppointment = ({ schema, id }) => {
    return new Promise((resolve, reject) => {
        axios.put(`/file/appointment/${id}`, schema).then(
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
 * @quoting
 */

export const addQuoting = ({ schema }) => {
    // console.log(schema.email);

    return new Promise((resolve, reject) => {
        axios.post(`/quoting`, schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};

export const updateQuoting = ({ schema, id }) => {
    return new Promise((resolve, reject) => {
        axios.put(`/quoting/${id}`, schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};

export const manageWarrantyTable = ({ schema, id }) => {
    return new Promise((resolve, reject) => {
        axios.post(`/quoting/request/${id}/manage-quoting`, schema).then(
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
 * @contract
 */

export const addInvoice = ({ schema }) => {
    // console.log(schema.email);

    return new Promise((resolve, reject) => {
        axios.post(`/invoice`, schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const invoiceUpdate = ({ schema, id }) => {
    // console.log(schema.email);

    return new Promise((resolve, reject) => {
        axios.put(`/invoice/${id}`, schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const addContract = ({ schema }) => {
    // console.log(schema.email);

    return new Promise((resolve, reject) => {
        axios.post(`/contract`, schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const updateContract = ({ schema, id }) => {
    return new Promise((resolve, reject) => {
        axios.put(`/contract/${id}`, schema).then(
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
 * @contract
 */

export const addIncorporation = ({ schema, id }) => {
    // console.log(schema.email);

    return new Promise((resolve, reject) => {
        axios.post(`/file/${id}/incorporation`, schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};

export const withdrawProspect = ({ schema, id }) => {
    // console.log(schema.email);

    return new Promise((resolve, reject) => {
        axios.post(`/file/${id}/withdraw`, schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};

// regulation clause
export const addRegulationClause = ({ schema, id }) => {
    // console.log(schema.email);

    return new Promise((resolve, reject) => {
        axios.post(`/contract/${id}/regulation-clause`, schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const updateRegulationClause = ({ schema, id }) => {
    return new Promise((resolve, reject) => {
        axios.put(`/contract/regulation-clause/${id}`, schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};

// regulation clause
export const addPbClause = ({ schema, id }) => {
    // console.log(schema.email);

    return new Promise((resolve, reject) => {
        axios.post(`/contract/${id}/pb-clause`, schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const updatePbClause = ({ schema, id }) => {
    return new Promise((resolve, reject) => {
        axios.put(`/contract/pb-clause/${id}`, schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};

// coinsurance
export const addCoinsurance = ({ schema, id }) => {
    // console.log(schema.email);

    return new Promise((resolve, reject) => {
        axios.post(`/contract/${id}/coinsurance`, schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const updateCoinsurance = ({ schema, id }) => {
    return new Promise((resolve, reject) => {
        axios.put(`/contract/${id}/coinsurance`, schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};

// reinsurance
export const addReinsurance = ({ schema, id }) => {
    // console.log(schema.email);

    return new Promise((resolve, reject) => {
        axios.post(`/contract/${id}/reinsurance`, schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};

export const updateReinsurance = ({ schema, id }) => {
    return new Promise((resolve, reject) => {
        axios.put(`/contract/reinsurance/${id}`, schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};

export const getReinsurance = ({ id, contract, insurer }) => {
    return new Promise((resolve, reject) => {
        axios
            .get(
                `/contract/reinsurance/${id}?contract=${contract}&insurer=${insurer}`
            )
            .then(
                (res) => {
                    resolve(res.data);
                },
                (error) => {
                    reject(error);
                }
            );
    });
};

export const createQuotingRequest = ({ schema }) => {
    return new Promise((resolve, reject) => {
        axios.post(`/quoting/request`, schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const updateQuotingRequest = ({ schema, id }) => {
    return new Promise((resolve, reject) => {
        axios.put(`/quoting/request/${id}`, schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const addCompanyReturn = ({ schema }) => {
    return new Promise((resolve, reject) => {
        axios.post(`/quoting/company-return`, schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const updateCompanyReturn = ({ schema, id }) => {
    return new Promise((resolve, reject) => {
        axios.put(`/quoting/company-return/${id}`, schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const manageCustomerReturn = ({ schema }) => {
    return new Promise((resolve, reject) => {
        axios.post(`/quoting/customer-return`, schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};

export const manageNotice = ({ schema, id }) => {
    return new Promise((resolve, reject) => {
        axios.post(`/contract/${id}/manage-follow-up-of-renewals`, schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const cancelContract = ({ id }) => {
    return new Promise((resolve, reject) => {
        axios.post(`/contract/${id}/cancel`).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};

export const createDeclaration = ({ id, schema }) => {
    return new Promise((resolve, reject) => {
        axios.post(`/sinister/contract/${id}/declaration`, schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};

export const updateDeclaration = ({ id, schema }) => {
    return new Promise((resolve, reject) => {
        axios.put(`/sinister/declaration/${id}`, schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};

export const createVictim = ({ id, schema }) => {
    return new Promise((resolve, reject) => {
        axios.post(`/sinister/declaration/${id}/victim`, schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};

export const updateVictim = ({ id, schema }) => {
    return new Promise((resolve, reject) => {
        axios.put(`/sinister/victim/${id}`, schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};

export const deleteVictim = ({ id }) => {
    return new Promise((resolve, reject) => {
        axios.delete(`/sinister/victim/${id}`).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};

export const manageCoupon = ({ id, schema }) => {
    return new Promise((resolve, reject) => {
        axios.post(`/sinister/victim/${id}/coupon`, schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const manageExpertise = ({ id, schema }) => {
    return new Promise((resolve, reject) => {
        axios.post(`/sinister/victim/${id}/expertise`, schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const managePv = ({ id, schema }) => {
    return new Promise((resolve, reject) => {
        axios.post(`/sinister/victim/${id}/pv`, schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const manageOffer = ({ id, schema }) => {
    return new Promise((resolve, reject) => {
        axios.post(`/sinister/victim/${id}/offer`, schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};

export const addFileJson = (schema) => {
    return new Promise((resolve, reject) => {
        // alert(schema);
        schema.forEach((item) => {
            // alert(JSON.stringify(item));
            axios.post(`/sinister`, item).then(
                (res) => {
                    // alert(JSON.stringify(res));
                    // alert(JSON.stringify(res));
                    if (schema.operationType == "Demande PV") {
                        axios.post(`/pv`, { sinister: res.data.data._id });
                    }
                    resolve(res.data);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    });
};

export const updateGlobalMail = ({ id, schema }) => {
    return new Promise((resolve, reject) => {
        axios.put(`/global-mail/${id}`, schema).then(
            (res) => {
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
// profile management
export const addFilendemnity = ({ schema }) => {
    // console.log(schema.email);

    return new Promise((resolve, reject) => {
        axios
            .post("https://172.17.192.9:8080/convertir", schema)
            //.post("https://127.0.0.1:3000/convertir", schema)
            .then(
                (res) => {
                    resolve(res.data);
                },
                (error) => {
                    reject(error);
                }
            );
    });
};
//Mail code
export const addMailForm = ({ schema }) => {
    return new Promise((resolve, reject) => {
        axios.post(`/mail`, schema).then(
            (res) => {
                // alert(JSON.stringify(res));
                // alert(JSON.stringify(res));
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const updateMailForm = ({ schema, id }) => {
    return new Promise((resolve, reject) => {
        axios.put(`/mail/${id}`, schema).then(
            (res) => {
                // alert(JSON.stringify(res));
                // alert(JSON.stringify(res));
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const addPlaintForm = ({ schema }) => {
    return new Promise((resolve, reject) => {
        axios.post(`/complaint`, schema).then(
            (res) => {
                // alert(JSON.stringify(res));
                // alert(JSON.stringify(res));
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const updatePlaintForm = ({ schema, id }) => {
    return new Promise((resolve, reject) => {
        axios.put(`/complaint/${id}`, schema).then(
            (res) => {
                // alert(JSON.stringify(res));
                // alert(JSON.stringify(res));
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};

//referentiel code
export const addFileForm = ({ schema }) => {
    return new Promise((resolve, reject) => {
        // alert(JSON.stringify(schema));
        axios.post(`/sinister`, schema).then(
            (res) => {
                // alert(JSON.stringify(res));
                // alert(JSON.stringify(res));
                if (schema.operationType == "Demande PV") {
                    axios.post(`/pv`, { sinister: res.data.data._id });
                }
                resolve(res.data);
            },
            (error) => {
                // alert(JSON.stringify(error));
                reject(error);
            }
        );
    });
};
export const updateFileForm = ({ schema, id }) => {
    return new Promise((resolve, reject) => {
        axios.put(`/sinister/${id}`, schema).then(
            (res) => {
                // alert(JSON.stringify(res));
                // alert(JSON.stringify(schema.operationType));
                if (schema.operationType == "Demande PV") {
                    // alert("ok");
                    axios.post(`/pv`, { sinister: res.data.data._id });
                }
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};

//indemnité code
export const addFileFormIndemnity = ({ schema }) => {
    return new Promise((resolve, reject) => {
        axios.post(`/indermnity`, schema).then(
            (res) => {
                // alert(JSON.stringify(res));
                // alert(JSON.stringify(res));
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const updateFileFormIndemnity = ({ schema, id }) => {
    return new Promise((resolve, reject) => {
        axios.put(`/indermnity/${id}`, schema).then(
            (res) => {
                // alert(JSON.stringify(res));
                // alert(JSON.stringify(res));
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};

//victime
export const addVictimeFileForm = ({ schema }) => {
    return new Promise((resolve, reject) => {
        axios.post(`/sinistervictim`, schema).then(
            (res) => {
                // if (schema.operationType == "Demande PV") {
                //   axios.post(`/pv`, { sinisterVictim: res.data.data._id });
                // }
                // alert(JSON.stringify(res));
                switch (schema.operationType) {
                    case "Demande d'expertise amiable":
                        {
                            axios.post(`/indermnity`, { sinisterVictim: res.data.data._id });
                        }
                        break;
                    case "Bon de prise en charge":
                        {
                            axios.post(`/voucher`, { sinisterVictim: res.data.data._id });
                        }
                        break;
                    case "Demande d'expertise Matérielle":
                        {
                            axios.post(`/expertise`, {
                                sinisterVictim: res.data.data._id,
                                expertiseType: "Matérielle",
                            });
                        }
                        break;
                    case "Demande d'expertise décès":
                        {
                            axios.post(`/expertise`, {
                                sinisterVictim: res.data.data._id,
                                expertiseType: "décès",
                            });
                        }
                        break;
                    case "Demande d'expertise Corporelle":
                        {
                            axios.post(`/expertise`, {
                                sinisterVictim: res.data.data._id,
                                expertiseType: "Corporelle",
                            });
                        }
                        break;
                    case "Demande d'expertise financiere":
                        {
                            axios.post(`/expertise`, {
                                sinisterVictim: res.data.data._id,
                                expertiseType: "financiere",
                            });
                        }
                        break;
                    case "Etude / Offre":
                        {
                            axios.post(`/studyoffer`, {
                                sinisterVictim: res.data.data._id,
                            });
                        }
                        break;
                    case "Suivi de reparation":
                        {
                            axios.post(`/repair`, {
                                sinisterVictim: res.data.data._id,
                            });
                        }
                        break;
                    case "Recours":
                        {
                            axios.post(`/appeal`, {
                                sinisterVictim: res.data.data._id,
                            });
                        }
                        break;
                    case "Calcul FMP":
                        {
                            axios.post(`/fmp`, {
                                sinisterVictim: res.data.data._id,
                            });
                        }
                        break;
                    case "Contentieux":
                        {
                            axios.post(`/litigation`, {
                                sinisterVictim: res.data.data._id,
                            });
                        }
                        break;
                    case "Suivi FGA":
                        {
                            axios.post(`/pool`, {
                                sinisterVictim: res.data.data._id,
                                type: "Suivi FGA",
                            });
                        }
                        break;
                    case "Pool 2 Roues":
                        {
                            axios.post(`/pool`, {
                                sinisterVictim: res.data.data._id,
                                type: "Pool 2 Roues",
                            });
                        }
                        break;
                    case "Pool TPM / TPV":
                        {
                            axios.post(`/pool`, {
                                sinisterVictim: res.data.data._id,
                                type: "Pool TPM / TPV",
                            });
                        }
                        break;
                }
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const addFactureFileForm = ({ schema }) => {
    return new Promise((resolve, reject) => {
        axios.post(`/invoice`, schema).then(
            (res) => {
                // alert(JSON.stringify(res));
                // alert(JSON.stringify(res));
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const updateFacture = ({ schema, id }) => {
    return new Promise((resolve, reject) => {
        axios.put(`/invoice/${id}`, schema).then(
            (res) => {
                // alert(JSON.stringify(res));
                // alert(JSON.stringify(res));
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const updateFmp = ({ schema, id }) => {
    return new Promise((resolve, reject) => {
        axios.put(`/fmp/${id}`, schema).then(
            (res) => {
                // alert(JSON.stringify(res));
                // alert(JSON.stringify(res));
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const updateExpertise = ({ schema, id }) => {
    return new Promise((resolve, reject) => {
        axios.put(`/expertise/${id}`, schema).then(
            (res) => {
                // alert(JSON.stringify(res));
                // alert(JSON.stringify(res));
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const updateRecours = ({ schema, id }) => {
    return new Promise((resolve, reject) => {
        axios.put(`/appeal/${id}`, schema).then(
            (res) => {
                // alert(JSON.stringify(res));
                // alert(JSON.stringify(res));
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const updateRepaire = ({ schema, id }) => {
    return new Promise((resolve, reject) => {
        axios.put(`/repair/${id}`, schema).then(
            (res) => {
                // alert(JSON.stringify(res));
                // alert(JSON.stringify(res));
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const updateBonForm = ({ schema, id }) => {
    return new Promise((resolve, reject) => {
        axios.put(`/voucher/${id}`, schema).then(
            (res) => {
                // alert(JSON.stringify(res));
                // alert(JSON.stringify(res));
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const updateVictimeFileForm = ({ schema, id }) => {
    return new Promise((resolve, reject) => {
        axios.put(`/sinistervictim/${id}`, schema).then(
            (res) => {
                // alert(JSON.stringify(schema));
                // alert(JSON.stringify(res));
                // if (schema.operationType == "Demande PV") {
                //   axios.post(`/pv`, { sinisterVictim: id });
                // }
                // if (schema.operationType == "Demande d'expertise amiable") {
                //   axios.post(`/indermnity`, { sinisterVictim: id });
                // }
                switch (schema.operationType) {
                    case "Demande d'expertise amiable":
                        {
                            axios.post(`/indermnity`, { sinisterVictim: id });
                        }
                        break;
                    case "Bon de prise en charge":
                        {
                            axios.post(`/voucher`, { sinisterVictim: id });
                        }
                        break;
                    case "Demande d'expertise Matérielle":
                        {
                            axios.post(`/expertise`, {
                                sinisterVictim: id,
                                expertiseType: "Matérielle",
                            });
                        }
                        break;
                    case "Demande d'expertise décès":
                        {
                            axios.post(`/expertise`, {
                                sinisterVictim: id,
                                expertiseType: "décès",
                            });
                        }
                        break;
                    case "Demande d'expertise Corporelle":
                        {
                            axios.post(`/expertise`, {
                                sinisterVictim: id,
                                expertiseType: "Corporelle",
                            });
                        }
                        break;
                    case "Demande d'expertise financiere":
                        {
                            axios.post(`/expertise`, {
                                sinisterVictim: id,
                                expertiseType: "financiere",
                            });
                        }
                        break;
                    case "Etude / Offre":
                        {
                            axios.post(`/studyoffer`, {
                                sinisterVictim: id,
                            });
                        }
                        break;
                    case "Suivi de reparation":
                        {
                            axios.post(`/repair`, {
                                sinisterVictim: id,
                            });
                        }
                        break;
                    case "Recours":
                        {
                            axios.post(`/appeal`, {
                                sinisterVictim: id,
                            });
                        }
                        break;
                    case "Calcul FMP":
                        {
                            axios.post(`/fmp`, {
                                sinisterVictim: id,
                            });
                        }
                        break;
                    case "Contentieux":
                        {
                            axios.post(`/litigation`, {
                                sinisterVictim: id,
                            });
                        }
                        break;
                    case "Suivi FGA":
                        {
                            axios.post(`/pool`, {
                                sinisterVictim: id,
                                type: "Suivi FGA",
                            });
                        }
                        break;
                    case "Pool 2 Roues":
                        {
                            axios.post(`/pool`, {
                                sinisterVictim: id,
                                type: "Pool 2 Roues",
                            });
                        }
                        break;
                    case "Pool TPM / TPV":
                        {
                            axios.post(`/pool`, {
                                sinisterVictim: id,
                                type: "Pool TPM / TPV",
                            });
                        }
                        break;
                }
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const updateInventoryForm = ({ schema, id }) => {
    // alert(JSON.stringify(schema));
    return new Promise((resolve, reject) => {
        axios.put(`/sinister/${id}`, schema).then(
            (res) => {
                // alert(JSON.stringify(res));
                // alert(JSON.stringify(res));
                // if (schema.operationType == "Demande PV") {
                //   axios.post(`/pv`, { sinisterVictim: id });
                // }
                // if (schema.operationType == "Demande d'expertise amiable") {
                //   axios.post(`/indermnity`, { sinisterVictim: id });
                // }
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const updatePVForm = ({ schema, id }) => {
    // alert(JSON.stringify(schema));
    return new Promise((resolve, reject) => {
        axios.put(`/pv/${id}`, schema).then(
            (res) => {
                // alert(JSON.stringify(res));
                // alert(JSON.stringify(res));
                if (schema.operationType == "Demande PV") {
                    axios.post(`/pv`, { sinisterVictim: id });
                }
                if (schema.operationType == "Demande d'expertise amiable") {
                    axios.post(`/indermnity`, { sinisterVictim: id });
                }
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const updateEtudeOffre = ({ schema, id }) => {
    // alert(JSON.stringify(schema));
    return new Promise((resolve, reject) => {
        axios.put(`/studyoffer/${id}`, schema).then(
            (res) => {
                // alert(JSON.stringify(res));
                // alert(JSON.stringify(res));

                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
export const updateAskCheque = ({ schema, id }) => {
    // alert(JSON.stringify(schema));
    return new Promise((resolve, reject) => {
        axios.put(`/check/${id}`, schema).then(
            (res) => {
                // alert(JSON.stringify(res));
                // alert(JSON.stringify(res));
                resolve(res.data);
            },
            (error) => {
                reject(error);
            }
        );
    });
};
// Add document
export const manageDocumentProposed = ({ id, schema }) => {
    return new Promise((resolve, reject) => {
        axios.post(`/sinistervictim/${id}/manage-document-provided`, schema).then(
            (res) => {
                resolve(res.data);
                axios.get(`/sinistervictim/${id}/print-claim-document`, schema).then(
                    (res) => {
                        resolve(res.data);
                        window.open(res.data.data, "_blank");
                        // alert(JSON.stringify(res.data));
                    },
                    (error) => {
                        reject(error);
                    }
                );
            },
            (error) => {
                reject(error);
            }
        );
        //
    });
};
export const manageDocumentProposedTrue = ({ id, schema }) => {
    return new Promise((resolve, reject) => {
        axios.post(`/sinistervictim/${id}/manage-document-provided`, schema).then(
            (res) => {
                resolve(res.data);
                axios.get(`/sinistervictim/${id}/print-dunning-document`, schema).then(
                    (res) => {
                        resolve(res.data);
                        window.open(res.data.data, "_blank");
                        // alert(JSON.stringify(res.data));
                    },
                    (error) => {
                        reject(error);
                    }
                );
            },
            (error) => {
                reject(error);
            }
        );
        //
    });
};