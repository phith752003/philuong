/**
 * GOOGLE APPS SCRIPT - PHI & LƯƠNG WEDDING RSVP
 * 
 * File này sẽ paste vào Google Apps Script Editor
 * Extensions > Apps Script trong Google Sheets
 */

// Tên các sheet
const SHEET_NAMES = {
  GUESTS: 'Guests',
  CONFIRMATIONS: 'Confirmations',
  EVENTS: 'Events'
};

/**
 * Hàm xử lý GET request - Lấy dữ liệu VÀ Lưu dữ liệu
 */
function doGet(e) {
  const action = e.parameter.action;
  
  try {
    switch(action) {
      case 'getGuests':
        return getGuests();
      case 'getEvents':
        return getEvents();
      case 'getData':
        return getAllData();
      case 'saveConfirmation':
        // Lưu xác nhận tham dự qua GET request (để tránh CORS)
        return saveConfirmationViaGet(e.parameter);
      default:
        return createResponse(false, 'Invalid action');
    }
  } catch (error) {
    return createResponse(false, 'Error: ' + error.message);
  }
}

/**
 * Hàm xử lý POST request - Lưu dữ liệu xác nhận tham dự
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    if (data.action === 'saveConfirmation') {
      return saveConfirmation(data);
    }
    
    return createResponse(false, 'Invalid action');
  } catch (error) {
    return createResponse(false, 'Error: ' + error.message);
  }
}

/**
 * Lấy danh sách khách mời
 */
function getGuests() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAMES.GUESTS);
  
  if (!sheet) {
    return createResponse(false, 'Sheet "Guests" not found');
  }
  
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const guests = [];
  
  for (let i = 1; i < data.length; i++) {
    if (!data[i][0]) continue; // Skip empty rows
    
    const guest = {};
    headers.forEach((header, index) => {
      if (header === 'eventIds') {
        // Parse comma-separated event IDs
        guest[header] = data[i][index] ? data[i][index].split(',').map(s => s.trim()) : [];
      } else {
        guest[header] = data[i][index];
      }
    });
    guests.push(guest);
  }
  
  return createResponse(true, 'Success', { guests });
}

/**
 * Lấy danh sách sự kiện
 */
function getEvents() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAMES.EVENTS);
  
  if (!sheet) {
    return createResponse(false, 'Sheet "Events" not found');
  }
  
  const data = sheet.getDataRange().getValues();
  const displayData = sheet.getDataRange().getDisplayValues(); // Lấy giá trị hiển thị
  const headers = data[0];
  const events = [];
  
  for (let i = 1; i < data.length; i++) {
    if (!data[i][0]) continue;
    
    const event = {};
    headers.forEach((header, index) => {
      let value = data[i][index];
      
      // Với date, dùng display value để lấy đúng format hiển thị trong sheet
      if (header === 'date') {
        const displayValue = displayData[i][index];
        // Nếu display value là format dd/mm/yyyy thì dùng luôn
        if (displayValue && typeof displayValue === 'string' && displayValue.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/)) {
          value = displayValue;
        } else if (value instanceof Date) {
          // Format date thành dd/mm/yyyy - dùng timezone Asia/Ho_Chi_Minh
          const timezone = Session.getScriptTimeZone();
          value = Utilities.formatDate(value, timezone, 'dd/MM/yyyy');
        } else if (typeof value === 'string' && value.includes('T')) {
          // Nếu là ISO string, parse và format lại
          try {
            const date = new Date(value);
            const timezone = Session.getScriptTimeZone();
            value = Utilities.formatDate(date, timezone, 'dd/MM/yyyy');
          } catch (e) {
            // Giữ nguyên nếu parse lỗi
          }
        }
      }
      
      // Giữ nguyên time và các field khác
      event[header] = value;
    });
    events.push(event);
  }
  
  return createResponse(true, 'Success', { events });
}

/**
 * Lấy tất cả dữ liệu (guests + events)
 */
function getAllData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // Get guests
  const guestSheet = ss.getSheetByName(SHEET_NAMES.GUESTS);
  const guestData = guestSheet.getDataRange().getValues();
  const guestHeaders = guestData[0];
  const guests = [];
  
  for (let i = 1; i < guestData.length; i++) {
    if (!guestData[i][0]) continue;
    
    const guest = {};
    guestHeaders.forEach((header, index) => {
      if (header === 'eventIds') {
        guest[header] = guestData[i][index] ? guestData[i][index].split(',').map(s => s.trim()) : [];
      } else {
        guest[header] = guestData[i][index];
      }
    });
    guests.push(guest);
  }
  
  // Get events
  const eventSheet = ss.getSheetByName(SHEET_NAMES.EVENTS);
  const eventData = eventSheet.getDataRange().getValues();
  const eventDisplayData = eventSheet.getDataRange().getDisplayValues(); // Lấy giá trị hiển thị
  const eventHeaders = eventData[0];
  const events = [];
  
  for (let i = 1; i < eventData.length; i++) {
    if (!eventData[i][0]) continue;
    
    const event = {};
    eventHeaders.forEach((header, index) => {
      let value = eventData[i][index];
      
      // Với date, dùng display value để lấy đúng format hiển thị trong sheet
      if (header === 'date') {
        const displayValue = eventDisplayData[i][index];
        // Nếu display value là format dd/mm/yyyy thì dùng luôn
        if (displayValue && typeof displayValue === 'string' && displayValue.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/)) {
          value = displayValue;
        } else if (value instanceof Date) {
          // Format date thành dd/mm/yyyy - dùng timezone Asia/Ho_Chi_Minh
          const timezone = Session.getScriptTimeZone();
          value = Utilities.formatDate(value, timezone, 'dd/MM/yyyy');
        } else if (typeof value === 'string' && value.includes('T')) {
          // Nếu là ISO string, parse và format lại
          try {
            const date = new Date(value);
            const timezone = Session.getScriptTimeZone();
            value = Utilities.formatDate(date, timezone, 'dd/MM/yyyy');
          } catch (e) {
            // Giữ nguyên nếu parse lỗi
          }
        }
      }
      
      event[header] = value;
    });
    events.push(event);
  }
  
  return createResponse(true, 'Success', { guests, events });
}

/**
 * Lưu xác nhận tham dự (từ POST request)
 */
function saveConfirmation(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAMES.CONFIRMATIONS);
  
  if (!sheet) {
    return createResponse(false, 'Sheet "Confirmations" not found');
  }
  
  // Thêm dòng mới
  const timestamp = new Date();
  const row = [
    timestamp,
    data.guestId || '',
    data.guestName || '',
    data.attendance || '',
    data.plusOne || 0,
    data.message || '',
    data.selectedEvents ? data.selectedEvents.join(', ') : ''
  ];
  
  sheet.appendRow(row);
  
  return createResponse(true, 'Confirmation saved successfully');
}

/**
 * Lưu xác nhận tham dự qua GET request (để tránh CORS)
 */
function saveConfirmationViaGet(params) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAMES.CONFIRMATIONS);
  
  if (!sheet) {
    return createResponse(false, 'Sheet "Confirmations" not found');
  }
  
  // Parse selectedEvents từ string
  let selectedEvents = '';
  if (params.selectedEvents) {
    try {
      selectedEvents = decodeURIComponent(params.selectedEvents);
    } catch (e) {
      selectedEvents = params.selectedEvents;
    }
  }
  
  // Thêm dòng mới
  const timestamp = new Date();
  const row = [
    timestamp,
    params.guestId || '',
    params.guestName || '',
    params.attendance || '',
    parseInt(params.plusOne) || 0,
    params.message || '',
    selectedEvents
  ];
  
  sheet.appendRow(row);
  
  return createResponse(true, 'Confirmation saved successfully', {
    saved: true,
    timestamp: timestamp.toISOString()
  });
}

/**
 * Tạo response JSON
 */
function createResponse(success, message, data = null) {
  const response = {
    success: success,
    message: message
  };
  
  if (data) {
    response.data = data;
  }
  
  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Test function - Chạy để test
 */
function testGetData() {
  const result = getAllData();
  Logger.log(result.getContent());
}
