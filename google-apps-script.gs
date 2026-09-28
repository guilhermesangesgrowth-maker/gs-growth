/**
 * Growth Hub — recebe leads do formulário do site e grava numa aba "Leads"
 * da planilha onde este script está vinculado.
 *
 * Como usar: veja o passo a passo no README.md, seção "Integração com Google Sheets".
 */
function doPost(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Leads") || ss.insertSheet("Leads");

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Data/Hora",
      "Nome",
      "E-mail",
      "Telefone",
      "Cargo",
      "Segmento",
      "Nº de pessoas",
      "Aceitou comunicações",
      "Material",
      "ID do material",
      "Origem",
    ]);
  }

  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.nome || "",
    data.email || "",
    data.telefone || "",
    data.cargo || "",
    data.segmento || "",
    data.tamanho || "",
    data.optin ? "Sim" : "Não",
    data.material || "",
    data.materialId || "",
    data.origem || "",
  ]);

  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok" })
  ).setMimeType(ContentService.MimeType.JSON);
}
