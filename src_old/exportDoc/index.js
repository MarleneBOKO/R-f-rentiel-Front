// var headerRange = exportUsersToExcel.getRange("A1:T1");
 //headerRange.values = headers;
// headerRange.format.fill.color = "#4472C4";
// headerRange.format.font.color = "white";
function importDataExcel(workSheetColumnName, workSheetName, nombre, users) {
  const exportUsersToExcel = require("./exportService.js");
  users;

  const filePath = workSheetName + ".xlsx";

  // var val = users[1];
  // for(var j in val){
  //     var sub_key ='users.'+ j;
  //     payloadData[j]=sub_key;
  // }

  // console.log(payloadData)
  exportUsersToExcel(
    users,
    workSheetColumnName,
    workSheetName,
    filePath,
    nombre
  );
}
export { importDataExcel };
