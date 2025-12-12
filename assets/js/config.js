/**
 * CẤU HÌNH KẾT NỐI GOOGLE SHEETS
 */

// QUAN TRỌNG: Thay URL này bằng Web app URL từ Google Apps Script
// Sau khi deploy Apps Script, copy URL dạng: https://script.google.com/macros/s/.../exec
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwHci3dMwP9Z3qnBbZjdXoB19Hq-aNAuGPyZYjZkZvQUwT_8Nk-8Y54SR-9SXBc_nuy/exec';

// Cấu hình
const CONFIG = {
  // URL Google Apps Script
  apiUrl: GOOGLE_SCRIPT_URL,
  
  // Timeout cho requests (milliseconds)
  timeout: 10000,
  
  // Retry khi lỗi
  maxRetries: 2,
  
  // Cache dữ liệu trong bao lâu (milliseconds) - 5 phút
  cacheTime: 5 * 60 * 1000
};

// Export để dùng trong các file khác
window.WEDDING_CONFIG = CONFIG;

