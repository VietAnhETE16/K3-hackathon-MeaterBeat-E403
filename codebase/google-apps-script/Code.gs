const SPREADSHEET_ID = '1VgvIZiC_LtbAV9oStjFXuQ0zOyiEw66Z5jNmZfg3MIU';
const SHEET_NAME = 'Feedback';

function doPost(e) {
  const data = e && e.parameter ? e.parameter : {};
  const optimizationRating = normalizeRating_(data.optimizationRating);
  const groupingRating = normalizeRating_(data.groupingRating);

  if (!optimizationRating || !groupingRating) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: 'Both ratings must be from 1 to 5.' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const sheet = getFeedbackSheet_();
  sheet.appendRow([
    new Date(),
    data.labTitle || '',
    optimizationRating,
    groupingRating,
    String(data.comment || '').slice(0, 1000)
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getFeedbackSheet_() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Thời gian', 'Codelab', 'Điểm tối ưu hóa thông tin', 'Điểm chia nhóm', 'Góp ý thêm']);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function normalizeRating_(value) {
  const rating = Number(value);
  return Number.isInteger(rating) && rating >= 1 && rating <= 5 ? rating : '';
}
