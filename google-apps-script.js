// ─────────────────────────────────────────────────────────────────────────────
// In.Style Salon Krasy — Google Sheets webhook
//
// SETUP (один раз):
// 1. Відкрийте Google Sheets: https://sheets.google.com
// 2. Створіть нову таблицю, назвіть її «Записи In.Style»
// 3. В меню: Розширення → Apps Script
// 4. Вставте весь цей код
// 5. Натисніть «Зберегти» (Ctrl+S)
// 6. Натисніть «Розгорнути» → «Нове розгортання»
//    - Тип: Веб-застосунок
//    - Виконувати як: Я (ваш акаунт)
//    - Хто має доступ: Усі
// 7. Натисніть «Розгорнути» та скопіюйте URL
// 8. Додайте URL у .env.local:
//    GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/ВАШ_ID/exec
// ─────────────────────────────────────────────────────────────────────────────

var SHEET_NAME = 'Записи'; // Назва аркуша в таблиці

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);

    // Створити аркуш і заголовки якщо не існує
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(['Дата', 'Час', "Ім'я", 'Послуга', 'Телефон', 'Статус']);
      sheet.getRange(1, 1, 1, 6).setFontWeight('bold').setBackground('#C9A96E').setFontColor('#FFFFFF');
      sheet.setColumnWidths(1, 6, [120, 80, 150, 250, 150, 120]);
      sheet.setFrozenRows(1);
    }

    // Додати рядок із записом
    sheet.appendRow([
      data.date || '',
      data.time || '',
      data.name || '',
      data.service || '',
      data.phone || '',
      'Новий',
    ]);

    // Підсвітити останній рядок жовтим (новий запис)
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1, 1, 6).setBackground('#FFF9E6');

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Тест: запустіть цю функцію вручну щоб перевірити
function testBooking() {
  var fakeEvent = {
    postData: {
      contents: JSON.stringify({
        name: 'Тест Клієнт',
        service: 'Манікюр — класичний / гель-лак',
        phone: '+380501234567',
        date: '29.06.2026',
        time: '14:30',
      })
    }
  };
  var result = doPost(fakeEvent);
  Logger.log(result.getContent());
}
