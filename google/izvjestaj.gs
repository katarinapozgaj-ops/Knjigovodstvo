// Google Apps Script za табелу „Knjigovodstvo – izvještaj“.
// Залијепити у табелу: Проширења → Apps Script, па Имплементирај → Нова имплементација → Веб-апликација
// (Изврши као: Ја, Приступ: Свако). Добијени линк (…/exec) убацити у апликацију.
var ZAGLAVLJE = ['Datum i vrijeme', 'Vrsta', 'Razred', 'Zadatak', 'Režim', 'Rezultat %', 'Napomena', 'Minuta danas'];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var sh = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sh.getLastRow() === 0) {
      sh.appendRow(ZAGLAVLJE);
      sh.setFrozenRows(1);
    }
    var d = JSON.parse(e.postData.contents);
    var redovi = (d.rows || []).map(function (r) {
      return [new Date(r.ts), r.vrsta || '', r.razred || '', r.zadatak || '', r.rezim || '',
        r.pct === '' || r.pct === undefined ? '' : r.pct, r.napomena || '', r.min === undefined ? '' : r.min];
    });
    if (redovi.length) {
      sh.getRange(sh.getLastRow() + 1, 1, redovi.length, ZAGLAVLJE.length).setValues(redovi);
    }
    return ContentService.createTextOutput('ok');
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService.createTextOutput('Knjigovodstvo izvještaj radi.');
}
