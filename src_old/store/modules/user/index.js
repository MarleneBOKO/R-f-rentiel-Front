import axios from "axios";

import newInstanceAxios from "axios";

const state = {
    UserProfile: {},
    Files: [],
    IndemnityFiles: [],
    FilesManage: [],
    statFile: "",
    statFileRecap: "",
    indemnityData: [],
    Products: [],
    victimeListe: [],
    victimeDocumentListe: [],
    Documents: [],
    PVFiles: [],
    PVFilesDuplicata: [],
    Commissariat: [],
    Enquetteur: [],
    mailData: [],
    Victime: {},
    victimeList: [],
    victimeMailListe: [],
    inventoryListe: [],
    offer: [],
    offerDoc: [],
    expertListe: [],
    expertiseListe: [],
    cheque: [],
    bank: [],
    bon: [],
    repaire: [],
    recours: [],
    fmp: [],
    fmpFacture: [],
    userListe: [],
    agency: [],
    garagisteListe: [],
    batch: [],
    litigation: [],
    totalFmp: "",
    beneficiaryDataFileLink: "",
    pool: [],
    fmpUniqueValue: [],
    brokerListe: [],
    bodyStudyOfferDatas: [],
    damageListe: [],
    ayantDroit: [],
    beneficiaryListData: [],
    inventorySimulateData: [],
    totalPSAP: 0,
    totalRèglement: 0,
    otherPayement: [],
    amiableExpertise: [],
    plaint: [],
    statPsapData: [],
    statPsapFileLink:"",
    statPsapFileRecapLink:"",
    inventoryCaptured: [],
    inventoryCapturedStat: "",
    totalPSAPCapture: 0,
    totalRèglementCapture: 0,
};

const getters = {
    UserProfile: (state) => state.UserProfile,
    statFile: (state) => state.statFile,
    statFileRecap: (state) => state.statFileRecap,
    inventoryCapturedStat: (state) => state.inventoryCapturedStat,
    inventoryCaptured: (state) => state.inventoryCaptured,
    otherPayement: (state) => state.otherPayement,
    plaint: (state) => state.plaint,
    amiableExpertise: (state) => state.amiableExpertise,
    inventorySimulateData: (state) => state.inventorySimulateData,
    damageListe: (state) => state.damageListe,
    totalPSAP: (state) => state.totalPSAP,
    totalRèglement: (state) => state.totalRèglement,
    beneficiaryListData: (state) => state.beneficiaryListData,
    ayantDroit: (state) => state.ayantDroit,
    brokerListe: (state) => state.brokerListe,
    fmpUniqueValue: (state) => state.fmpUniqueValue,
    pool: (state) => state.pool,
    bodyStudyOfferDatas: (state) => state.bodyStudyOfferDatas,
    agency: (state) => state.agency,
    totalFmp: (state) => state.totalFmp,
    litigation: (state) => state.litigation,
    batch: (state) => state.batch,
    garagisteListe: (state) => state.garagisteListe,
    userListe: (state) => state.userListe,
    Files: (state) => state.Files,
    offer: (state) => state.offer,
    fmp: (state) => state.fmp,
    fmpFacture: (state) => state.fmpFacture,
    recours: (state) => state.recours,
    offerDoc: (state) => state.offerDoc,
    cheque: (state) => state.cheque,
    expertListe: (state) => state.expertListe,
    expertiseListe: (state) => state.expertiseListe,
    inventoryListe: (state) => state.inventoryListe,
    victimeList: (state) => state.victimeList,
    victimeMailListe: (state) => state.victimeMailListe,
    mailData: (state) => state.mailData,
    IndemnityFiles: (state) => state.IndemnityFiles,
    FilesManage: (state) => state.FilesManage,
    indemnityData: (state) => state.indemnityData,
    Products: (state) => state.Products,
    victimeListe: (state) => state.victimeListe,
    Documents: (state) => state.Documents,
    PVFiles: (state) => state.PVFiles,
    PVFilesDuplicata: (state) => state.PVFilesDuplicata,
    Victime: (state) => state.Victime,
    bank: (state) => state.bank,
    bon: (state) => state.bon,
    Commissariat: (state) => state.Commissariat,
    Enquetteur: (state) => state.Enquetteur,
    victimeDocumentListe: (state) => state.victimeDocumentListe,
    statPsapData: (state) => state.statPsapData,
    repaire: (state) => state.repaire,
    statPsapFileLink: (state) => state.statPsapFileLink,
    statPsapFileRecapLink: (state) => state.statPsapFileRecapLink,
    beneficiaryDataFileLink: (state) => state.beneficiaryDataFileLink,
    totalPSAPCapture: (state) => state.totalPSAPCapture,
    totalRèglementCapture: (state) => state.totalRèglementCapture,

};

const mutations = {
    SET_INDEMNITY_VALUE(state, data) {
        state.IndemnityFiles = data;
    },
    SET_PLAINT(state, data) {
        state.plaint = data;
    },
    SET_INVENTORY_CAPTURED(state, data) {
        state.inventoryCaptured = data;
    },
    SET_INVENTORY_CAPTURED_STAT(state, data) {
        state.inventoryCapturedStat = data;
    },
    SET_BENEFICIARY_FILE_LINK(state, data) {
        state.beneficiaryDataFileLink = data;
    },
    SET_INVENTORY_SIMULATE_DATA(state, data) {
        state.inventorySimulateData = data;
    },
    SET_STATISTIQUE_FILE(state, data) {
        state.statFile = data;
    },
    SET_STATISTIQUE_FILE_RECAP(state, data) {
        state.statFileRecap = data;
    },
    SET_DEGAT(state, data) {
        state.damageListe = data;
    },
    SET_TOTAL_PSAP(state, data) {
        state.totalPSAP = data;
    },
    SET_TOTAL_REGLEMENT(state, data) {
        state.totalRèglement = data;
    },
    SET_TOTAL_PSAP_CAPTURE(state, data) {
        state.totalPSAPCapture = data;
    },
    SET_TOTAL_REGLEMENT_CAPTURE(state, data) {
        state.totalRèglementCapture = data;
    },
    SET_BENEFICIARY(state, data) {
        state.beneficiaryListData = data;
    },
    SET_AYANT_DROIT(state, data) {
        state.ayantDroit = data;
    },
    SET_FMP_UNIQUE_VALUE(state, data) {
        state.fmpUniqueValue = data;
    },
    SET_USER_LISTE(state, data) {
        state.userListe = data;
    },
    SET_STUDY_OFFER_BODY(state, data) {
        state.bodyStudyOfferDatas = data;
    },
    SET_POOL(state, data) {
        state.pool = data;
    },
    SET_INVENTORY_VALUE(state, data) {
        state.inventoryListe = data;
    },
    SET_LITIGATION(state, data) {
        state.litigation = data;
    },
    SET_FMP_TOTAL(state, data) {
        state.totalFmp = data;
    },
    SET_GARAAGISTE(state, data) {
        state.garagisteListe = data;
    },
    SET_BATCH(state, data) {
        state.batch = data;
    },
    SET_AGENCY(state, data) {
        state.agency = data;
    },
    SET_FACTURE(state, data) {
        state.fmpFacture = data;
    },
    SET_BANK(state, data) {
        state.bank = data;
    },
    SET_BON(state, data) {
        state.bon = data;
    },
    SET_PSAP_STAT(state, data) {
        state.statPsapData = data;
    },
    SET_PSAP_STAT_FILE(state, data) {
        state.statPsapFileLink = data;
    },
    SET_PSAP_STAT_FILE_RECAP(state, data) {
        state.statPsapFileRecapLink = data;
    },
    SET_FMP(state, data) {
        state.fmp = data;
    },
    SET_BROKER(state, data) {
        state.brokerListe = data;
    },
    SET_RECOURS(state, data) {
        state.recours = data;
    },
    SET_EXPERT_LIST_VALUE(state, data) {
        state.expertListe = data;
    },
    SET_EXPERTISE_LIST_VALUE(state, data) {
        state.expertiseListe = data;
    },
    SET_OFFER_VALUE(state, data) {
        state.offer = data;
    },
    SET_OFFER_DOC_VALUE(state, data) {
        state.offerDoc = data;
    },
    SET_MAIL(state, data) {
        state.mailData = data;
    },
    SET_VICTIME_MAIL(state, data) {
        state.victimeMailListe = data;
    },
    SET_VICTIME_LIST(state, data) {
        state.victimeList = data;
    },
    SET_FILES(state, data) {
        state.Files = data;
    },
    SET_FILES_MANAGE(state, data) {
        state.FilesManage = data;
    },
    SET_STATFILE(state, data) {
        state.statFile = data;
    },
    SET_INDEMNITY_DATA(state, data) {
        state.indemnityData = data;
    },
    SET_PRODUCT_DATA(state, data) {
        state.Products = data;
    },
    SET_VICTIME_DATA(state, data) {
        state.victimeListe = data;
    },
    SET_DOCUMENT_VICTIME_DATA(state, data) {
        state.victimeDocumentListe = data;
    },
    SET_DOCUMENTS(state, data) {
        state.Documents = data;
    },
    SET_COMMISSARIAT(state, data) {
        state.Commissariat = data;
    },
    SET_ENQUETTEUR(state, data) {
        state.Enquetteur = data;
    },
    SET_PVFilesDuplicata(state, data) {
        state.PVFilesDuplicata = data;
    },
    SET_PVFiles(state, data) {
        state.PVFiles = data;
    },
    SET_VICTIM(state, data) {
        state.Victime = data;
    },
    SET_USER_PROFILE(state, data) {
        state.UserProfile = data;
    },
    SET_CHEQUE(state, data) {
        state.cheque = data;
    },
    SET_REPAIRE(state, data) {
        state.repaire = data;
    },
    SET_OTHER_PAYEMENT(state, data) {
        state.otherPayement = data;
    },
    SET_AMIABLE_EXPERTISE(state, data) {
        state.amiableExpertise = data;
    },
};

const actions = {
    getProducts({ commit }) {
        return new Promise((resolve, reject) => {
            axios
                .get("/product")
                .then((res) => {
                    // alert(JSON.stringify(res.data.data));
                    commit("SET_PRODUCT_DATA", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getBroker({ commit }) {
        return new Promise((resolve, reject) => {
            axios
                .get("/broker")
                .then((res) => {
                    // alert(JSON.stringify(res.data.data));
                    commit("SET_BROKER", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getBodyStudyOffer({ commit }, { id = "" }) {
        return new Promise((resolve, reject) => {
            axios
                .get("/bodystudy?studyOffer=" + id)
                .then((res) => {
                    // alert(JSON.stringify(res.data.data));
                    commit("SET_STUDY_OFFER_BODY", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getBeneficiary({ commit }, { smallStudy = "", studyType = "", studyOffer = "" }) {
        return new Promise((resolve, reject) => {
            // alert(id);
            axios
                .get("/beneficiary?smallStudy=" + smallStudy + "&studyType=" + studyType + "&studyOffer=" + studyOffer)
                .then((res) => {
                    // alert(JSON.stringify(res.data.data));
                    commit("SET_BENEFICIARY", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getIndividualBodyStudyOffer({ commit }, { id = "" }) {
        return new Promise((resolve, reject) => {
            // alert(id);
            axios
                .get("/individualbody?studyOffer=" + id)
                .then((res) => {
                    // alert(JSON.stringify(res.data.data));
                    commit("SET_STUDY_OFFER_BODY", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getmorePayementStudyOffer({ commit }, { id = "" }) {
        return new Promise((resolve, reject) => {
            // alert(id);
            axios
                .get("/otherpayment?withoutPeriod=true&studyOffer=" + id)
                .then((res) => {
                    // alert(JSON.stringify(res.data.data));
                    commit("SET_OTHER_PAYEMENT", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getindemnityStudyOffer({ commit }, { id = "" }) {
        return new Promise((resolve, reject) => {
            // alert(id);
            axios
                .get("/amicableexpertise?studyOffer=" + id)
                .then((res) => {
                    // alert(JSON.stringify(res.data.data));
                    commit("SET_AMIABLE_EXPERTISE", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getDeathStudyOffer({ commit }, { id = "" }) {
        return new Promise((resolve, reject) => {
            // alert(id);
            axios
                .get("/deathstudy?studyOffer=" + id)
                .then((res) => {
                    // alert(JSON.stringify(res.data.data));
                    commit("SET_STUDY_OFFER_BODY", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getayantDroitStudyOffer({ commit }, { id = "" }) {
        return new Promise((resolve, reject) => {
            // alert(id);
            axios
                .get("/haveRight?deathStudy=" + id)
                .then((res) => {
                    // alert(JSON.stringify(res.data.data));
                    commit("SET_AYANT_DROIT", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getmInventorySimulate({ commit }, { id = "" }) {
        return new Promise((resolve, reject) => {
            // alert(id)
            axios
                .get("/sinister/" + id + "/simulate-inventory")
                .then((res) => {
                    // alert(JSON.stringify(res.data.data));
                    commit("SET_INVENTORY_SIMULATE_DATA", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getmaterialStudyOffer({ commit }, { id = "" }) {
        return new Promise((resolve, reject) => {
            // alert(id);
            axios
                .get("/materialstudy?studyOffer=" + id)
                .then((res) => {
                    // alert(JSON.stringify(res.data.data));
                    commit("SET_STUDY_OFFER_BODY", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getmaterialDegatStudyOffer({ commit }, { id = "" }) {
        return new Promise((resolve, reject) => {
            // alert(id);
            axios
                .get("/materialdamage?materialStudy=" + id)
                .then((res) => {
                    // alert(JSON.stringify(res.data.data));
                    commit("SET_DEGAT", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getUsers({ commit }) {
        return new Promise((resolve, reject) => {
            axios
                .get("/user")
                .then((res) => {
                    // alert(JSON.stringify(res.data.data.docs));
                    commit("SET_USER_LISTE", res.data.data.docs);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getPool({ commit }) {
        return new Promise((resolve, reject) => {
            axios
                .get("/pool")
                .then((res) => {
                    // alert(JSON.stringify(res.data.data.docs));
                    commit("SET_POOL", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getAgency({ commit }) {
        return new Promise((resolve, reject) => {
            axios
                .get("/agency")
                .then((res) => {
                    // alert(JSON.stringify(res.data.data.docs));
                    commit("SET_AGENCY", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getCaptureInventaire({ commit }, { years = "", statusSearch = "" }) {
        return new Promise((resolve, reject) => {
            // inventoryCaptured
            // inventoryCapturedStat
            axios
                .get(`/sinister/inventory-captured?exerciceYear=${years}&status=${statusSearch}`)
                .then((res) => {
                    commit("SET_INVENTORY_CAPTURED_STAT", res.data.link);
                    // alert(JSON.stringify(res.data.data));
                    commit("SET_TOTAL_PSAP_CAPTURE", res.data.totalUpdatedPsap);
                    commit("SET_TOTAL_REGLEMENT_CAPTURE", res.data.totalCompensationToBeReceived);
                    commit("SET_INVENTORY_CAPTURED", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getFmpFacture({ commit }, { batch = "" }) {
        return new Promise((resolve, reject) => {
            axios
                .get(`/invoice?batch=${batch}`)
                .then((res) => {
                    commit("SET_STATISTIQUE_FILE", res.data.link);
                    // alert(JSON.stringify(res.data.totalCompensationToBeReceived));
                    commit("SET_FACTURE", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getFmp({ commit }, {
        StartDate = "",
        EndDate = "",
        customerName = "",
        victimName = "",
        sinisterNumber = "",
        managerExpertiseStartDate = "",
        managerExpertiseDateEndDate = "",
        statusSearch = "",
    }) {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `/fmp?startDate=${StartDate}&endDate=${EndDate}&managerExpertiseStartDate=${managerExpertiseStartDate}&managerExpertiseDateEndDate=${managerExpertiseDateEndDate}&customerName=${customerName}&victimName=${victimName}&sinisterNumber=${sinisterNumber}&status=${statusSearch}`
                )
                .then((res) => {
                    // alert(JSON.stringify(res.data.data));
                    commit("SET_FMP", res.data.data);
                    commit("SET_FMP_TOTAL", res.data.totalFmp);
                    commit("SET_STATISTIQUE_FILE", res.data.link);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getBank({ commit }) {
        return new Promise((resolve, reject) => {
            axios
                .get("/bank")
                .then((res) => {
                    // alert(JSON.stringify(res.data.data));
                    commit("SET_BANK", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getRecour({ commit }, {
        appealExerciseDateStart = "",
        appealExerciseDateEnd = "",
        fileName = "",
        sinisterNumber = "",
        status = "",
        periodStartDate = "",
        periodEndDate = "",
    }) {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `/appeal?periodStartDate=${periodStartDate}&periodEndDate=${periodEndDate}&appealExerciseDateStart=${appealExerciseDateStart}&appealExerciseDateEnd=${appealExerciseDateEnd}&fileName=${fileName}&sinisterNumber=${sinisterNumber}&status=${status}`
                )
                .then((res) => {
                    commit("SET_STATISTIQUE_FILE", res.data.link);
                    // alert(JSON.stringify(res.data.data));
                    commit("SET_RECOURS", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getPlaint({ commit }, {
        id = "",
        confimed = "",
    }) {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `/complaint?sinisterVictim=${id}&isCompleted=${confimed}`
                )
                .then((res) => {
                    // alert(JSON.stringify(res.data.data));
                    commit("SET_PLAINT", res.data.data);
                    commit("SET_STATISTIQUE_FILE", res.data.link);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getStatRecapRepaire({ commit },
        {
            mechanic = "",
        }
    ) {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `/repair/export-recapt?mechanic=${mechanic}`
                )
                .then((res) => {
                    // alert(JSON.stringify(res.data.data));
                    window.open(res.data.data, "_blank");
                    commit("SET_STATISTIQUE_FILE_RECAP", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getBon({ commit }, {
        requestDateStart = "",
        requestDateEnd = "",
        voucherIssueDateStart = "",
        voucherIssueDateEnd = "",
        invoiceReceiptDateStart = "",
        invoiceReceiptDateEnd = "",
        paymentDateStart = "",
        paymentDateEnd = "",
        applicant = "",
        sinisterNumber = ""
    }) {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `/voucher?requestDateStart=${requestDateStart}&requestDateEnd=${requestDateEnd}&invoiceReceiptDateEnd=${invoiceReceiptDateEnd}&paymentDateStart=${paymentDateStart}&paymentDateEnd=${paymentDateEnd}&voucherIssueDateStart=${voucherIssueDateStart}&voucherIssueDateEnd=${voucherIssueDateEnd}&invoiceReceiptDateStart=${invoiceReceiptDateStart}&applicant=${applicant}&sinisterNumber=${sinisterNumber}`
                )
                .then((res) => {
                    // alert(JSON.stringify(res.data.data));
                    commit("SET_BON", res.data.data);
                    commit("SET_STATISTIQUE_FILE", res.data.link);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getStatPsap({ commit }, {
        requestDateStart = "",
        requestDateEnd = "",
        voucherIssueDateStart = "",
        voucherIssueDateEnd = "",
        invoiceReceiptDateStart = "",
        invoiceReceiptDateEnd = "",
        paymentDateStart = "",
        paymentDateEnd = "",
        applicant = "",
        sinisterNumber = ""
    }) {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `/sinister/psap-statistical?requestDateStart=${requestDateStart}&requestDateEnd=${requestDateEnd}&invoiceReceiptDateEnd=${invoiceReceiptDateEnd}&paymentDateStart=${paymentDateStart}&paymentDateEnd=${paymentDateEnd}&voucherIssueDateStart=${voucherIssueDateStart}&voucherIssueDateEnd=${voucherIssueDateEnd}&invoiceReceiptDateStart=${invoiceReceiptDateStart}&applicant=${applicant}&sinisterNumber=${sinisterNumber}`
                )
                .then((res) => {
                    console.log(res)
                    // alert(JSON.stringify(res.data.data));
                    commit("SET_PSAP_STAT", res.data);
                    commit("SET_PSAP_STAT_FILE", res.data.link);
                    commit("SET_PSAP_STAT_FILE_RECAP", res.data.linkRecap);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getLitigation({ commit }, {
        requestDateStart = "",
        requestDateEnd = "",
        reportArrivalDateStart = "",
        reportArrivalDateEnd = "",
        sinisterNumber = "",
        nextHearingDateStart = "",
        nextHearingDateEnd = "",
        sinisterVictimName = "",
        lawyer = "",
    }) {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `/litigation?requestDateStart=${requestDateStart}&requestDateEnd=${requestDateEnd}&nextHearingDateStart=${nextHearingDateStart}&nextHearingDateEnd=${nextHearingDateEnd}&reportArrivalDateStart=${reportArrivalDateStart}&reportArrivalDateEnd=${reportArrivalDateEnd}&sinisterNumber=${sinisterNumber}&lawyer=${lawyer}&sinisterVictimName=${sinisterVictimName}`
                )
                .then((res) => {
                    commit("SET_STATISTIQUE_FILE", res.data.link);
                    // alert(JSON.stringify(res.data.data));
                    commit("SET_LITIGATION", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getCheque({ commit }, {
        beneficiaryCallDateStart = "",
        beneficiaryCallDateEnd = "",
        receptionServiceReceptionDateStart = "",
        receptionServiceReceptionDateEnd = "",
        sinisterNumber = "",
        withdrawalDateStart = "",
        withdrawalDateEnd = "",
        beneficiaryName = "",
        returnReceiptDateStart = "",
        returnReceiptDateEnd = "",
        receptionServiceSendDateStart = "",
        receptionServiceSendDateEnd = "",
        status = "",
    }) {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `/check?beneficiaryCallDateStart=${beneficiaryCallDateStart}&checkDateStart=${receptionServiceSendDateStart}&checkDateEnd=${receptionServiceSendDateEnd}&beneficiaryCallDateEnd=${beneficiaryCallDateEnd}&returnReceiptDateStart=${returnReceiptDateStart}&returnReceiptDateEnd=${returnReceiptDateEnd}&withdrawalDateStart=${withdrawalDateStart}&withdrawalDateEnd=${withdrawalDateEnd}&receptionServiceReceptionDateStart=${receptionServiceReceptionDateStart}&receptionServiceReceptionDateEnd=${receptionServiceReceptionDateEnd}&sinisterNumber=${sinisterNumber}&beneficiaryName=${beneficiaryName}&status=${status}`
                )
                .then((res) => {
                    // alert(JSON.stringify(res.data.data));
                    commit("SET_CHEQUE", res.data.data);
                    commit("SET_STATISTIQUE_FILE", res.data.link);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getBatch({ commit }, { fmp = "" }) {
        return new Promise((resolve, reject) => {
            axios
                .get(`/batch?fmp=${fmp}`)
                .then((res) => {
                    // alert(JSON.stringify(res.data.data));
                    commit("SET_BATCH", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getUniqueFmp({ commit }, { id = "" }) {
        return new Promise((resolve, reject) => {
            axios
                .get(`/fmp/${id}`)
                .then((res) => {
                    // alert(JSON.stringify(res.data.data));
                    commit("SET_FMP_UNIQUE_VALUE", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getGaragiste({ commit }) {
        return new Promise((resolve, reject) => {
            axios
                .get("/mechanic")
                .then((res) => {
                    // alert(JSON.stringify(res.data.data));
                    commit("SET_GARAAGISTE", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getExpert({ commit }) {
        return new Promise((resolve, reject) => {
            axios
                .get("/expert")
                .then((res) => {
                    // alert(JSON.stringify(res.data.data));
                    commit("SET_EXPERT_LIST_VALUE", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getRepair({ commit }, {
        transactionDateStart = "",
        transactionDateEnd = "",
        invoiceDepositDateStart = "",
        invoiceDepositDateEnd = "",
        sinisterNumber = "",
        invoicePaymentDateStart = "",
        invoicePaymentDateEnd = "",
        sinisterVictimName = "",
        mechanic = "",
    }) {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `/repair?transactionDateStart=${transactionDateStart}&transactionDateEnd=${transactionDateEnd}&invoicePaymentDateStart=${invoicePaymentDateStart}&invoicePaymentDateEnd=${invoicePaymentDateEnd}&invoiceDepositDateStart=${invoiceDepositDateStart}&invoiceDepositDateEnd=${invoiceDepositDateEnd}&sinisterNumber=${sinisterNumber}&mechanic=${mechanic}&sinisterVictimName=${sinisterVictimName}`
                )
                .then((res) => {
                    commit("SET_STATISTIQUE_FILE", res.data.link);
                    // alert(JSON.stringify(res.data.data));
                    commit("SET_REPAIRE", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getRepairPerso({ commit }, {
        mechaId = "",
        transactionDateStart = "",
        transactionDateEnd = "",
        invoiceDepositDateStart = "",
        invoiceDepositDateEnd = "",
        sinisterNumber = "",
        nvoicePaymentDateStart = "",
        invoicePaymentDateEnd = "",
        sinisterVictimName = "",
    }) {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `/repair?mechanic=${mechaId}&ransactionDateStart=${transactionDateStart}&transactionDateEnd=${transactionDateEnd}&nvoicePaymentDateStart=${nvoicePaymentDateStart}&invoicePaymentDateEnd=${invoicePaymentDateEnd}&invoiceDepositDateStart=${invoiceDepositDateStart}&invoiceDepositDateEnd=${invoiceDepositDateEnd}&sinisterNumber=${sinisterNumber}&sinisterVictimName=${sinisterVictimName}`
                )
                .then((res) => {
                    commit("SET_STATISTIQUE_FILE", res.data.link);
                    // alert(JSON.stringify(res.data.data));
                    commit("SET_REPAIRE", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getExpertise({ commit }, {
        requestDateStart = "",
        requestDateEnd = "",
        reportArrivalDateStart = "",
        reportArrivalDateEnd = "",
        expertiseType = "",
        sinisterNumber = "",
        fileName = "",
    }) {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `/expertise?requestDateStart=${requestDateStart}&requestDateEnd=${requestDateEnd}&sinisterNumber=${sinisterNumber}&fileName=${fileName}&reportArrivalDateStart=${reportArrivalDateStart}&reportArrivalDateEnd=${reportArrivalDateEnd}&expertiseType=${expertiseType}`
                )
                .then((res) => {
                    commit("SET_STATISTIQUE_FILE", res.data.link);
                    // alert(JSON.stringify(res.data.data));
                    commit("SET_EXPERTISE_LIST_VALUE", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getOffer({ commit }, {

        receptionServiceSendDateStart = "",
        receptionServiceSendDateEnd = "",
        sinisterNumber = "",
        beneficiaryName = "",
        withoutPeriod = "",
    }) {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `/studyoffer?withoutPeriod=${withoutPeriod}&startDate=${receptionServiceSendDateStart}&endDate=${receptionServiceSendDateEnd}&sinisterNumber=${sinisterNumber}&beneficiaryName=${beneficiaryName}`
                )
                .then((res) => {
                    commit("SET_STATISTIQUE_FILE", res.data.link);
                    // alert(JSON.stringify(res.data.data));
                    commit("SET_OFFER_VALUE", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getOfferDoc({ commit }, { printed = "", secondSignatureDateStart = "", secondSignatureDateEnd = "", agentName = "" }) {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `/beneficiary?secondSignatureDateExist=true&checkRequestIsPrinted=${printed}&secondSignatureDateStart=${secondSignatureDateStart}&secondSignatureDateEnd=${secondSignatureDateEnd}&agentName=${agentName}`
                )
                .then((res) => {
                    // alert(JSON.stringify(res.data.link));
                    commit("SET_OFFER_DOC_VALUE", res.data.data);
                    commit("SET_BENEFICIARY_FILE_LINK", res.data.link);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    printOfferDoc({ commit }, { ids = [] }) {
        return new Promise((resolve, reject) => {
            // alert(JSON.stringify(ids));

            axios
                .get(`/check/print-check-request-slip?ids=${JSON.stringify(ids)}`)
                .then((res) => {
                    // alert(JSON.stringify(res.data));
                    window.open(res.data.data, "_blank");
                    window.open(res.data.link, "_blank");
                    commit();
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getMail({ commit }, {
        receptionDateStart = "",
        receptionDateEnd = "",
        treatmentDateStart = "",
        treatmentDateEnd = "",
        mailNumber = "",
        id = "",
        outgoingMailNumberExist = "",
        sendDateStart = "",
        sendDateEnd = "",
        callDateStart = "",
        callDateEnd = "",
        withdrawalDateStart = "",
        withdrawalDateEnd = "",
        dischargeReturnDateStart = "",
        dischargeReturnDateEnd = "",
    }) {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `/mail?sinisterVictim=${id}&sendDateStart=${sendDateStart}&sendDateEnd=${sendDateEnd}&callDateStart=${callDateStart}&callDateEnd=${callDateEnd}&withdrawalDateStart=${withdrawalDateStart}&withdrawalDateEnd=${withdrawalDateEnd}&dischargeReturnDateStart=${dischargeReturnDateStart}&dischargeReturnDateEnd=${dischargeReturnDateEnd}&outgoingMailNumberExist=${outgoingMailNumberExist}&receptionDateStart=${receptionDateStart}&receptionDateEnd=${receptionDateEnd}&treatmentDateStart=${treatmentDateStart}&treatmentDateEnd=${treatmentDateEnd}&mailNumber=${mailNumber}`
                )
                .then((res) => {
                    commit("SET_STATISTIQUE_FILE", res.data.link);
                    // alert(JSON.stringify(res.data.data));
                    commit("SET_MAIL", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getVictimeListe({ commit }, {
        name = "",
        policeNumber = "",
        fullName = "",
        sinisterNumber = "" }) {
        return new Promise((resolve, reject) => {
            // alert("ok")
            axios
                .get(`/sinistervictim?name=${name}&policeNumber=${policeNumber}&fullName=${fullName}&sinisterNumber=${sinisterNumber}`)
                .then((res) => {
                    // alert(JSON.stringify(res.data.data));
                    commit("SET_VICTIME_LIST", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getVictimeMail({ commit }, {
        id = "",
        receptionDateStart = "",
        receptionDateEnd = "",
        treatmentDateStart = "",
        treatmentDateEnd = "",
        mailNumber = "",
    }) {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `/mail?sinisterVictim=${id}&receptionDateStart=${receptionDateStart}&receptionDateEnd=${receptionDateEnd}&treatmentDateStart=${treatmentDateStart}&treatmentDateEnd=${treatmentDateEnd}&mailNumber=${mailNumber}`
                )
                .then((res) => {
                    // alert(JSON.stringify(res.data.data));
                    commit("SET_VICTIME_MAIL", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getInventory({ commit }, {
        StartDate = "",
        EndDate = "",
        customerName = "",
        startUpdatedDate = "",
        endUpdatedDate = "",
        agentName = "",
        victimName = "",
        sinisterNumber = "",
        managerExpertiseStartDate = "",
        managerExpertiseDateEndDate = "",
        statusSearch = "",
        withoutPeriod = "",
    }) {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `/sinister/inventory?&sinisterDateStart=${StartDate}&startUpdatedDate=${startUpdatedDate}&endUpdatedDate=${endUpdatedDate}&agentName=${agentName}&withoutPeriod=${withoutPeriod}&sinisterDateEnd=${EndDate}&managerExpertiseStartDate=${managerExpertiseStartDate}&managerExpertiseDateEndDate=${managerExpertiseDateEndDate}&name=${customerName}&victimName=${victimName}&sinisterNumber=${sinisterNumber}&status=${statusSearch}`
                )
                .then((res) => {
                    commit("SET_STATISTIQUE_FILE", res.data.link);
                    commit("SET_TOTAL_PSAP", res.data.totalUpdatedPsap);
                    commit("SET_TOTAL_REGLEMENT", res.data.totalCompensationToBeReceived);
                    // alert(JSON.stringify(res.data));
                    commit("SET_INVENTORY_VALUE", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getRepartition({ commit }, { studyType = "", smallStudy = "", signataire = "" }) {
        // alert(id);
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `/beneficiary/generate-beneficiary-division-document?smallStudy=${smallStudy}&studyType=${studyType}&isDSin=${signataire}`
                )
                .then((res) => {
                    // alert(JSON.stringify(res.data.data));
                    window.open(res.data.data, "_blank");
                    commit("SET_FILES_MANAGE", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getMaterialDoc({ commit }, { id = "", signataire = "" }) {
        // alert(id);
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `/materialstudy/${id}/generate-material-count-document?isDSin=${signataire}`
                )
                .then((res) => {
                    // alert(JSON.stringify(res.data.data));
                    window.open(res.data.data, "_blank");
                    commit("SET_FILES_MANAGE", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getBodyDoc({ commit }, { id = "", signataire = "" }) {
        // alert(id);
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `/bodystudy/${id}/generate-body-study-voucher-document?isDSin=${signataire}`
                )
                .then((res) => {
                    // alert(JSON.stringify(res.data.data));
                    window.open(res.data.data, "_blank");
                    commit("SET_FILES_MANAGE", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getIndividualBodyDoc({ commit }, { id = "", signataire = "" }) {
        // alert(id);
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `/individualbody/${id}/generate-individual-body-voucher-document?isDSin=${signataire}`
                )
                .then((res) => {
                    // alert(JSON.stringify(res.data.data));
                    window.open(res.data.data, "_blank");
                    commit("SET_FILES_MANAGE", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getDeathDoc({ commit }, { id = "", signataire = "" }) {
        // alert(id);
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `/deathstudy/${id}/generate-indemnities-due-to-benificiary-document?isDSin=${signataire}`
                )
                .then((res) => {
                    // alert(JSON.stringify(res.data.data));
                    window.open(res.data.data[0], "_blank");
                    window.open(res.data.data[1], "_blank");
                    commit("SET_FILES_MANAGE", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },

    getDoc({ commit }, { id = "", duplicata = "", signataire = "", ids = [] }) {
        // alert(id);
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `/pv/policestation/${id}/print-slip-pv-request?duplicata=${duplicata}&ids=${JSON.stringify(ids)}&isDSin=${signataire}`
                )
                .then((res) => {
                    // alert(JSON.stringify(res.data.data));
                    window.open(res.data.data, "_blank");
                    commit("SET_FILES_MANAGE", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getDocAppeal({ commit }, { id = "", returnType = "" }) {
        // alert(id);
        return new Promise((resolve, reject) => {
            axios
                .get(`/appeal/company/${id}/print-mail-appeal-exercice?returnType=${returnType}`)
                .then((res) => {
                    // alert(JSON.stringify(res.data.data));
                    // alert(JSON.stringify)
                    window.open(res.data.data[0], "_blank");
                    window.open(res.data.data[1], "_blank");
                    commit("SET_FILES_MANAGE", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getDocFmp({ commit }, { id = "", ids = [] }) {
        // alert(id);
        return new Promise((resolve, reject) => {
            axios
                .get(`fmp/${id}/print-fmp-document?ids=${JSON.stringify(ids)}`)
                .then((res) => {
                    // alert(JSON.stringify(res.data.data));
                    window.open(res.data.data, "_blank");
                    commit("SET_FILES_MANAGE", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getDocAvis({ commit }, { id = "", signataire = "" }) {
        // alert(id);
        return new Promise((resolve, reject) => {
            axios
                .get(`appeal/${id}/print-sinister-notice?isDSin=${signataire}`)
                .then((res) => {
                    // alert(JSON.stringify(res.data.data));
                    window.open(res.data.data, "_blank");
                    commit("SET_FILES_MANAGE", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getDocRepaire({ commit }, { id = "" }) {
        // alert(id);
        return new Promise((resolve, reject) => {
            axios
                .get(`repair/${id}/print-deposit-receipt-sheet`)
                .then((res) => {
                    // alert(JSON.stringify(res.data.data));
                    window.open(res.data.data, "_blank");
                    commit("SET_FILES_MANAGE", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    },
    getDocuments({ commit }, { name = "" }) {
        axios
            .get(`document?name=${name}`)
            .then((res) => {
                // alert(JSON.stringify(res.data.data));
                commit("SET_DOCUMENTS", res.data.data);
            })
            .catch((err) => {
                commit("SET_DOCUMENTS", []);

                console.log(err);
            });
    },
    getUserProfile({ commit }) {
        axios
            .get("/user/profile")
            .then((res) => {
                // alert(JSON.stringify(res));
                commit("SET_USER_PROFILE", res.data.user);
            })
            .catch((err) => {
                console.log(err);
            });
    },
    getVictimesDoc({ commit }, { id = "" }) {
        return new Promise((resolve, reject) => {
            // alert(id);
            axios
                .get("/sinistervictim/" + id)
                .then((res) => {
                    // alert(JSON.stringify(res));
                    commit("SET_VICTIM", res.data.data);

                    resolve(res.data.data);
                })
                .catch((err) => {
                    commit("SET_VICTIM", {});
                    reject(err);
                    console.log(err);
                });
        });
    },
    getPvFilesDuplicata({ commit }, {
        StartDate = "",
        EndDate = "",
        claimDateStart = "",
        claimDateEnd = "",
        receivedDateStart = "",
        receivedDateEnd = "",
        paymentDateStart = "",
        paymentDateEnd = "",
        fileName = "",
        policeStation = "",
        sinisterNumber = "",
        statusSearch = "",
        slipPvRequestIsPrint = true,
        withoutPeriod= true
    }) {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `/pv?startDate=${StartDate}&withoutPeriod=${withoutPeriod}&slipPvRequestIsPrint=${slipPvRequestIsPrint}&endDate=${EndDate}&slipPvRequestIsPrintStartDate=${claimDateStart}&slipPvRequestIsPrintEndDate=${claimDateEnd}&receivedDateStart=${receivedDateStart}&receivedDateEnd=${receivedDateEnd}&paymentDateStart=${paymentDateStart}&paymentDateEnd=${paymentDateEnd}&fileName=${fileName}&policeStation=${policeStation}&sinisterNumber=${sinisterNumber}&status=${statusSearch}`
                )
                .then((res) => {
                    // commit("SET_STATISTIQUE_FILE", res.data.link);
                    // alert(JSON.stringify(res));
                    commit("SET_PVFilesDuplicata", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    commit("SET_PVFilesDuplicata", []);
                    reject(err);
                    console.log(err);
                });
        });
    },
    getPvFiles({ commit }, {
        StartDate = "",
        EndDate = "",
        claimDateStart = "",
        claimDateEnd = "",
        receivedDateStart = "",
        receivedDateEnd = "",
        paymentDateStart = "",
        paymentDateEnd = "",
        fileName = "",
        policeStation = "",
        sinisterNumber = "",
        statusSearch = "",
        withoutPeriod = true,
    }) {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `/pv?startDate=${StartDate}&endDate=${EndDate}&withoutPeriod=${withoutPeriod}&slipPvRequestIsPrintStartDate=${claimDateStart}&slipPvRequestIsPrintEndDate=${claimDateEnd}&receivedDateStart=${receivedDateStart}&receivedDateEnd=${receivedDateEnd}&paymentDateStart=${paymentDateStart}&paymentDateEnd=${paymentDateEnd}&fileName=${fileName}&policeStation=${policeStation}&sinisterNumber=${sinisterNumber}&status=${statusSearch}`
                )
                .then((res) => {
                    commit("SET_STATISTIQUE_FILE", res.data.link);
                    // alert(JSON.stringify(res));
                    commit("SET_PVFiles", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    commit("SET_PVFiles", []);
                    reject(err);
                    console.log(err);
                });
        });
    },
    getCommissariat({ commit }) {
        return new Promise((resolve, reject) => {
            axios
                .get(`/policestation`)
                .then((res) => {
                    // alert(JSON.stringify(res));
                    commit("SET_COMMISSARIAT", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    commit("SET_COMMISSARIAT", []);
                    reject(err);
                    console.log(err);
                });
        });
    },
    getEnquetteur({ commit }) {
        return new Promise((resolve, reject) => {
            axios
                .get(`/investigator`)
                .then((res) => {
                    // alert(JSON.stringify(res));
                    commit("SET_ENQUETTEUR", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    commit("SET_ENQUETTEUR", []);
                    reject(err);
                    console.log(err);
                });
        });
    },
    getVictimes({ commit }, {
        StartDate = "",
        EndDate = "",
        customerName = "",
        victimName = "",
        sinisterNumber = "",
        managerExpertiseStartDate = "",
        managerExpertiseDateEndDate = "",
        statusSearch = "",
        sinister = "",
    }) {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `/sinistervictim?sinister=${sinister}&startDate=${StartDate}&endDate=${EndDate}&managerExpertiseStartDate=${managerExpertiseStartDate}&managerExpertiseDateEndDate=${managerExpertiseDateEndDate}&customerName=${customerName}&fullName=${victimName}&sinisterNumber=${sinisterNumber}&status=${statusSearch}`
                )
                .then((res) => {
                    // alert(JSON.stringify(res));
                    commit("SET_VICTIME_DATA", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    commit("SET_VICTIME_DATA", {});
                    reject(err);
                    console.log(err);
                });
        });
    },
    getIndemnityFiles({ commit }, {
        StartDate = "",
        EndDate = "",
        customerName = "",
        victimName = "",
        sinisterNumber = "",
        managerExpertiseStartDate = "",
        managerExpertiseDateEndDate = "",
        statusSearch = "",
    }) {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `/indermnity?startDate=${StartDate}&endDate=${EndDate}&managerExpertiseStartDate=${managerExpertiseStartDate}&managerExpertiseDateEndDate=${managerExpertiseDateEndDate}&customerName=${customerName}&victimName=${victimName}&sinisterNumber=${sinisterNumber}&status=${statusSearch}`
                )
                .then((res) => {
                    // alert(JSON.stringify(res));
                    commit("SET_INDEMNITY_VALUE", res.data.data);
                    commit("SET_STATISTIQUE_FILE", res.data.link);

                    resolve(res.data.data);
                })
                .catch((err) => {
                    commit("SET_INDEMNITY_VALUE", {});
                    reject(err);
                    console.log(err);
                });
        });
    },
    getFiles({ commit }, {
        StartDate = "",
        EndDate = "",
        sinisterDateStart = "",
        sinisterDateDateEnd = "",
        customerName = "",
        victimName = "",
        sinisterNumber = "",
        managerExpertiseStartDate = "",
        managerExpertiseDateEndDate = "",
        statusSearch = "",
        withoutPeriod = "",
    }) {
        return new Promise((resolve, reject) => {
            axios
                .get(
                    `/sinister?declarationDateStartDate=${StartDate}&declarationDateEndDate=${EndDate}&withoutPeriod=${withoutPeriod}&sinisterDateStart=${sinisterDateStart}&sinisterDateEnd=${sinisterDateDateEnd}&managerExpertiseStartDate=${managerExpertiseStartDate}&managerExpertiseDateEndDate=${managerExpertiseDateEndDate}&name=${customerName}&victimName=${victimName}&sinisterNumber=${sinisterNumber}&status=${statusSearch}`
                )
                .then((res) => {
                    // alert(JSON.stringify(res));
                    commit("SET_FILES", res.data.data);
                    commit("SET_STATISTIQUE_FILE", res.data.link);

                    resolve(res.data.data);
                })
                .catch((err) => {
                    commit("SET_FILES", {});
                    reject(err);
                    console.log(err);
                });
        });
    },
    addFilendemnity({ commit }, form) {
        return new Promise((resolve, reject) => {
            //   alert(JSON.stringify(form));
            //lien import
            // newInstanceAxios.defaults.baseURL = `http://172.17.192.9:3000`;
            newInstanceAxios.defaults.baseURL = `http://127.0.0.1:3000`;

            newInstanceAxios
                .post(`/convertir`, form)
                .then((res) => {
                    // alert(JSON.stringify(res));
                    // window.open(res.data.data, "_blank");
                    commit("SET_INDEMNITY_DATA", res.data);
                    resolve(res.data);
                })
                .catch((err) => {
                    commit("SET_INDEMNITY_DATA", []);
                    reject(err);
                    //   alert(JSON.stringify(err));
                })
                .finally(() => {
                    newInstanceAxios.defaults.baseURL =
                        "http://172.17.192.9:3087/api/v1";
                });
        });
    },
    getDownloadManageRecap({ commit }, { id = "" }) {
        // alert(JSON.stringify(id));
        return new Promise((resolve, reject) => {
            axios
                .get(`/indermnity/${id}/print-manager-recap-expertise-momo`)
                .then((res) => {
                    window.open(res.data.data, "_blank");
                    commit("SET_FILES_MANAGE", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    commit("SET_FILES_MANAGE", {});
                    reject(err);
                    console.log(err);
                });
        });
    },
    getDownloadManageRecapMomo({ commit }, { id = "" }) {
        // alert(JSON.stringify(id));
        return new Promise((resolve, reject) => {
            axios
                .get(`/indermnity/${id}/print-manager-recap-expertise`)
                .then((res) => {
                    window.open(res.data.data, "_blank");
                    commit("SET_FILES_MANAGE", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    commit("SET_FILES_MANAGE", {});
                    reject(err);
                    console.log(err);
                });
        });
    },
    getDownloadMedicalExpertiseReport({ commit }, { id = "" }) {
        // alert(JSON.stringify(id));
        return new Promise((resolve, reject) => {
            axios
                .get(`/indermnity/${id}/print-medical-expertise-report`)
                .then((res) => {
                    window.open(res.data.data, "_blank");
                    commit("SET_FILES_MANAGE", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    commit("SET_FILES_MANAGE", {});
                    reject(err);
                    console.log(err);
                });
        });
    },

    getDownloadMedicalExpertiseRequest({ commit }, { id = "" }) {
        // alert(JSON.stringify(id));
        return new Promise((resolve, reject) => {
            axios
                .get(`/indermnity/${id}/print-medical-expertise-request`)
                .then((res) => {
                    window.open(res.data.data, "_blank");
                    commit("SET_FILES_MANAGE", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    commit("SET_FILES_MANAGE", {});
                    reject(err);
                    console.log(err);
                });
        });
    },
    getDownloadMedicalConsultationRequest({ commit }, { id = "" }) {
        return new Promise((resolve, reject) => {
            axios
                .get(`/indermnity/${id}/print-consultation-sheet`)
                .then((res) => {
                    // alert(JSON.stringify(res));
                    window.open(res.data.data, "_blank");
                    commit("SET_FILES_MANAGE", res.data.data);
                    resolve(res.data.data);
                })
                .catch((err) => {
                    commit("SET_FILES_MANAGE", {});
                    reject(err);
                    console.log(err);
                });
        });
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};