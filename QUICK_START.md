# 🚀 HƯỚNG DẪN NHANH - KẾT NỐI GOOGLE SHEETS

## ✅ CHUẨN BỊ (5 phút)

### Bước 1: Tạo Google Sheets
1. Vào https://sheets.google.com
2. Tạo spreadsheet mới: **"Phi-Luong-Wedding-RSVP"**
3. Tạo 3 sheet: **Events**, **Guests**, **Confirmations**
4. Copy dữ liệu mẫu từ file `GOOGLE_SHEETS_TEMPLATE.md`

### Bước 2: Thêm Apps Script
1. Trong Google Sheets: **Extensions > Apps Script**
2. Xóa code mẫu
3. Copy TOÀN BỘ nội dung file `google-apps-script.js`
4. Paste vào Apps Script editor
5. **Ctrl+S** để Save
6. **Deploy > New deployment**
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone** ⚠️ (QUAN TRỌNG!)
7. **Deploy** → Copy **Web app URL**

### Bước 3: Cấu hình Website
1. Mở file `assets/js/config.js`
2. Tìm dòng: `const GOOGLE_SCRIPT_URL = 'PASTE_YOUR...'`
3. Paste URL vừa copy vào (thay thế cả dòng)
4. Ví dụ:
```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxxx.../exec';
```
5. **Ctrl+S** để Save

## 🧪 TEST

1. Reload website (Ctrl+F5)
2. Mở Console (F12)
3. Vào trang RSVP
4. Nhập tên khách để tìm (theo dữ liệu trong Sheets)
5. Xác nhận tham dự
6. Kiểm tra sheet "Confirmations" xem có dữ liệu mới

## 🎯 LỢI ÍCH

✅ **MIỄN PHÍ** - Không tốn tiền hosting database
✅ **REAL-TIME** - Cập nhật danh sách khách bất cứ lúc nào
✅ **DỄ QUẢN LÝ** - Xem ai đã xác nhận ngay trong Google Sheets
✅ **BẢO MẬT** - Dữ liệu lưu trong Google Drive của bạn
✅ **KHÔNG CẦN SERVER** - Chỉ cần hosting tĩnh (Vercel, Netlify, GitHub Pages)

## ⚠️ LƯU Ý

- Google Apps Script miễn phí: **20,000 requests/ngày**
- Nếu > 20,000 requests, cần nâng cấp hoặc dùng giải pháp khác
- Đủ cho đám cưới 500-1000 khách mời

## 🆘 NẾU GẶP LỖI

**Lỗi CORS / Permission denied:**
- Kiểm tra Deploy settings: "Who has access" = **Anyone**
- Redeploy Apps Script
- Clear cache browser (Ctrl+Shift+R)

**Không tải được dữ liệu:**
- Kiểm tra URL trong `config.js` có đúng không
- Mở Console (F12) xem log lỗi
- Kiểm tra sheet name: "Events", "Guests", "Confirmations" (đúng chính tả)

**Dữ liệu không lưu:**
- Kiểm tra sheet "Confirmations" có đủ 7 cột header chưa
- Xem Console có báo lỗi gì không

## 📞 HỖ TRỢ

Nếu cần giúp đỡ, gửi cho tôi:
1. Screenshot lỗi trong Console (F12)
2. URL Google Apps Script (có thể che bớt)
3. Mô tả chi tiết lỗi

