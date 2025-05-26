const xlsx = require("xlsx");
const path = require("path");

const exportExcel = (data, workSheetColumnNames, workSheetName, filePath) => {
  const workBook = xlsx.utils.book_new();
  const workSheetData = [workSheetColumnNames, ...data];
  const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
  xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
  xlsx.writeFile(workBook, path.resolve(filePath));
};
// var headerRange = exportExcel.getRange("A1:T1");
//  //headerRange.values = headers;
// headerRange.format.fill.color = "#4472C4";
// headerRange.format.font.color = "white";
const exportUsersToExcel = (
  users,
  workSheetColumnNames, 
  workSheetName,
  filePath,
  nombre
) => {
  if (nombre == "appel") {
    const data = users.map((user) => {
      return [
        user.agentName,
        user.assignTo,
        user.name,
        user.nature,
        user.phone,
        user.birthdayFr,
        user.activityField,
        user.location,
        user.dateFr,
        user.hour,
        user.reason,
        user.done,
        user.returnObservation,
      ];
    });
    exportExcel(data, workSheetColumnNames, workSheetName, filePath);
  }
  if (nombre == "offre") {
    const data = users.map((user) => {
      return [
        user.sinisterAskNumber,
        user.sinisterCompanyNumber,
        user.thirdName,
        user.company,
        user.product,
        user.category,
        user.offerReceptDateFr,
        user.amount,
        user.agreementTransmissionDateFr,
        user.aggreementReceptDateFr,
        user.checkReceiptDateFr,
        user.checkTransmissionDateFr,
        user.documentSendDateFr,
        user.observation,
      ];
    });
    exportExcel(data, workSheetColumnNames, workSheetName, filePath);
  }
  if (nombre == "coassurance") {
    const data = users.map((user) => {
      return [
        user.name,
        user.company,
        user.policeNumber,
        user.actionType,
        user.product,
        user.category,
        user.effectDateFr,
        user.dueDateFr,
        user.recordingDateFr,
        user.netPrime,
        user.commission,
        user.thirdPartyCompany,
        user.shareRate,
        user.coinsuranceNetPrime,
        user.coinsuranceCommission,
        user.leading,
        user.isPayed,
        user.observation,
      ];
    });
    exportExcel(data, workSheetColumnNames, workSheetName, filePath);
  }
  if (nombre == "échéance") {
    const data = users.map((user) => {
      return [
        user.status,
        user.agentName,
        user.customerNumber,
        user.name,
        user.phone,
        user.email,
        user.company,
        user.policeNumber,
        user.product,
        user.category,
        user.effectDate,
        user.dueDate,
        user.paymentDate,
        user.collectionDate,
        user.actionType,
        user.netPrime,
        user.totalPrime,
        user.commission,
        user.sendAt,
        user.customerFleetDispatchDate,
        user.customerFleetReturnDate,
        user.companyFleetDispatchDate,
        user.companyFleetReturnDate,
        user.customerWarrantyDispatchDate,
        user.customerWarrantyReturnDate,
        user.companyWarrantyDispatchDate,
        user.companyWarrantyReturnDate,
        user.companyProjectRequestDate,
        user.companyProjectReturnDate,
        user.dateOfRequestForAnUpdatedListOfPersonnel,
        user.dateOfReturntForAnUpdatedListOfPersonnel,
        user.contractEstablishmentDate,
        user.isPayed,
        user.observation,
      ];
    });
    exportExcel(data, workSheetColumnNames, workSheetName, filePath);
  }
  if (nombre == "regul") {
    const data = users.map((user) => {
      return [
        user.customerNumber,
        user.name,
        user.company,
        user.policeNumber,
        user.actionType,
        user.plugged,
        user.product,
        user.category,
        user.effectDateFr,
        user.dueDateFr,
        user.recordingDateFr,
        user.netPrime,
        user.TTCPrime,
        user.plate,
        user.reminderDateFr,
        user.companyReturnDateFr,
        user.customerRequestDateFr,
        user.observation,
      ];
    });
    exportExcel(data, workSheetColumnNames, workSheetName, filePath);
  }
  if (nombre == "Reass") {
    const data = users.map((user) => {
      return [
        user.name,
        user.company,
        user.policeNumber,
        user.product,
        user.category,
        user.effectDateFr,
        user.dueDateFr,
        user.recordingDateFr,
        user.netPrime,
        user.commission,
        user.insurer,
        user.preservePrime,
        user,
        user.cedePrime,
        user.isPayed,
        user.observation,
      ];
    });
    exportExcel(data, workSheetColumnNames, workSheetName, filePath);
  }
  if (nombre == "PB") {
    const data = users.map((user) => {
      return [
        user.customerNumber,
        user.name,
        user.company,
        user.policeNumber,
        user.actionType,
        user.plugged,
        user.product,
        user.category,
        user.effectDateFr,
        user.dueDateFr,
        user.recordingDateFr,
        user.netPrime,
        user.TTCPrime,
        user.reminderDateFr,
        user.companyReturnDateFr,
        user.customerRequestDateFr,
        user.observation,
      ];
    });
    exportExcel(data, workSheetColumnNames, workSheetName, filePath);
  }
  if (nombre == "expert") {
    const data = users.map((user) => {
      return [
        user.sinisterAskNumber,
        user.sinisterCompanyNumber,
        user.thirdName,
        user.company,
        user.dateRequestExpertiseFr,
        user.reportReceptionDateFr,
        user.expertName,
        user.observation,
      ];
    });
    exportExcel(data, workSheetColumnNames, workSheetName, filePath);
  }
  if (nombre == "bon") {
    const data = users.map((user) => {
      return [
        user.sinisterAskNumber,
        user.sinisterCompanyNumber,
        user.thirdName,
        user.company,
        user.requestDateFr,
        user.couponReceptionDateFr,
        user.amount,
        user.observation,
      ];
    });
    exportExcel(data, workSheetColumnNames, workSheetName, filePath);
  }
  if (nombre == "pv") {
    const data = users.map((user) => {
      return [
        user.sinisterAskNumber,
        user.thirdName,
        user.sinisterCompanyNumber,
        user.company,
        user.createdAtFr,
        user.requestDatePvFr,
        user.receptionDatePvFr,
        user.policeStation,
        user.locality,
        user.observation,
      ];
    });
    exportExcel(data, workSheetColumnNames, workSheetName, filePath);
  }
  if (nombre == "sinistres") {
    const data = users.map((user) => {
      return [
        user.sinisterAskNumber,
        user.sinisterCompanyNumber,
        user.contract.file.name,
        user.contract.product,
        user.dateOfOccurrenceFr,
        user.declarationDateFr,
        user.companyDispatchDateFr,
        user.contract.company.name,
        user.contract.policeNumber,
        user.circumstance,
      ];
    });
    exportExcel(data, workSheetColumnNames, workSheetName, filePath);
  }
  if (nombre == "client") {
    const data = users.map((user) => {
      return [
        user.name,
        user.nature,
        user.phone,
        user.birthdayFr,
        user.activityField,
        user.location,
        user.netPrime,
        user.totalPrime,
        user.agentName,
      ];
    });
    exportExcel(data, workSheetColumnNames, workSheetName, filePath);
  }
  if (nombre == "prospect") {
    const data = users.map((user) => {
      return [
        user.name,
        user.nature,
        user.phone,
        user.birthdayFr,
        user.activityField,
        user.location,
        user.createdAtFr,
        user.agentName,
      ];
    });
    exportExcel(data, workSheetColumnNames, workSheetName, filePath);
  }
  if (nombre == "rdv") {
    const data = users.map((user) => {
      return [
        user.agentName,
        user.assignTo,
        user.name,
        user.nature,
        user.phone,
        user.birthdayFr,
        user.activityField,
        user.location,
        user.dateFr,
        user.period.start,
        user.period.end,
        user.reason,
        user.done,
        user.returnObservation,
      ];
    });
    exportExcel(data, workSheetColumnNames, workSheetName, filePath);
  }
  if (nombre == "cotation") {
    const data = users.map((user) => {
      if (user.customerReturn == null) {
        user.customerReturn = {};
      }
      if (user.companyReturn == null) {
        user.companyReturn = {};
      }
      return [
        user.name,
        user.product,
        user.company,
        user.createdAtFr,
        user.returnDateFr,
        user.netPrime,
        user.accessory,
        user.tax,
        user.TTCPrime,
        user.companyReturn.createdAtFr,
        user.customerReturn.createdAtFr,
        user.agentName,
        user.status,
      ];
    });
    exportExcel(data, workSheetColumnNames, workSheetName, filePath);
  }
  if (nombre == "emission") {
    const data = users.map((user) => {
      return [
        user.customerNumber,
        user.name,
        user.company,
        user.policeNumber,
        user.actionType,
        user.product,
        user.category,
        user.effectDate,
        user.dueDate,
        user.paymentDate,
        user.netPrime,
        user.totalPrime,
        user.commission,
        user.accessory100,
        user.agentName,
        user.observation,
      ];
    });
    exportExcel(data, workSheetColumnNames, workSheetName, filePath);
  }
  if (nombre == "impayer") {
    const data = users.map((user) => {
      return [
        user.createdAt,
        user.agentName,
        user.name,
        user.product,
        user.category,
        user.actionType,
        user.company,
        user.policeNumber,
        user.receiptNumber,
        user.effectDate,
        user.dueDate,
        user.netPrime,
        user.totalPrime,
        user.accessory50,
        user.accessory100,
        user.cdeaoPrime,
      ];
    });
    exportExcel(data, workSheetColumnNames, workSheetName, filePath);
  }
  if (nombre == "encaissement") {
    const data = users.map((user) => {
      return [
        user.customerNumber,
        user.name,
        user.company,
        user.policeNumber,
        user.actionType,
        user.product,
        user.category,
        user.effectDate,
        user.dueDate,
        user.recordingDate,
        user.netPrime,
        user.commission,
        user.totalPrime,
        user.accessory100,
        user.accessory50,
        user.agentName,
        user.paymentDate,
        user.observation,
      ];
    });
    exportExcel(data, workSheetColumnNames, workSheetName, filePath);
  }
  if (nombre == "courrier") {
    const data = users.map((user) => {
      return [
        user.fileNumber,
        user.transmitter,
        user.agent,
        user.mailNumber,
        user.receptionDateFr,
        user.assignmentDateFr,
        user.treatmentDateFr,
        user.outgoingMailNumber,
        user.service,
        user.nature,
        user.CEOInstruction,
        user.observation,
      ];
    });
    exportExcel(data, workSheetColumnNames, workSheetName, filePath);
  }
  if (nombre == "paiement") {
    const data = users.map((user) => {
      return [
        user.name,
        user.name,
        user.policeNumber,
        user.receiptNumber,
        user.plugged,
        user.product,
        user.category,
        user.effectDate,
        user.dueDate,
        user.paymentDate,
        user.netPrime,
        user.commission,
        user.totalPrime,
        user.cdeaoPrime,
        user.collectionDate,
        user.companyNetPrime,
        user.companyCommission,
        user.variationNetPrime,
        user.variationCommission,
        user.netPrimeObservation,
        user.commissionObservation,
        user.transferObservation,
        user.paymentObservation,
      ];
    });
    exportExcel(data, workSheetColumnNames, workSheetName, filePath);
  }
  if (nombre == "inventaire") {
    const data = users.map((user) => {
      return [
        user.sinisterAskNumber,
        user.sinisterCompanyNumber,
        user.contractName,
        user.contractPoliceNumber,
        user.thirdName,
        user.contractProduct,
        user.dateOfOccurrenceFr,
        user.declarationDateFr,
        user.contractCompany,
        user.circumstance,
        user.stringDocumentsProvides,
        user.stringDocumentProvides,
        user.stringNotDocumentsProvides,
        user.requestDatePvFr,
        user.receptionDatePvFr,
        user.policeStation,
        user.couponRequestDateFr,
        user.expertiseReportReceptionDateFr,
        user.expertiseExpertName,
        user.thirdPartyMaterialDamage,
        user.thirdPartyBodilyInjury,
        user.PSAP,
        user.offerAmount,
        user.offerDocumentSendDateFr,
        user.offerReceptDateFr,
        user.offerAggreementReceptDateFr,
        user.offerAgreementTransmissionDateFr,
        user.offerStatus,
        user.offerObservation,
      ];
    });
    exportExcel(data, workSheetColumnNames, workSheetName, filePath);
  }
  if (nombre == "Scotation") {
    console.log(users);
    const data = users.map((user) => {
      return [
        user.company.name,
        user.netPrime,
        user.accessory,
        user.tax,
        user.TACAVA,
        user.TVA,
        user.TTCPrime,
        user.observation,
      ];
    });
    exportExcel(data, workSheetColumnNames, workSheetName, filePath);
  }
};
// var headerRange = exportUsersToExcel.getRange("A1:T1");
// headerRange.format.fill.color = "#4472C4";
// headerRange.format.font.color = "white";

module.exports = exportUsersToExcel;
