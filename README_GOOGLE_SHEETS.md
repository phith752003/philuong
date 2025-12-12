# 📱 WEBSITE ĐỘNG VỚI GOOGLE SHEETS

## 🎯 ĐÃ LÀM GÌ?

Website của bạn bây giờ có thể:
✅ **Lấy danh sách khách mời từ Google Sheets** (không phải hard-code trong code nữa)
✅ **Lưu xác nhận tham dự vào Google Sheets** (xem real-time ai đã xác nhận)
✅ **Cập nhật danh sách khách bất cứ lúc nào** (chỉ cần sửa Google Sheets)
✅ **MIỄN PHÍ 100%** (không cần database hay server)

## 📁 CÁC FILE MỚI

```
📄 QUICK_START.md              ← BẮT ĐẦU ĐỌC FILE NÀY
📄 SETUP_GOOGLE_SHEETS.md      ← Hướng dẫn chi tiết setup
📄 GOOGLE_SHEETS_TEMPLATE.md   ← Dữ liệu mẫu để copy vào Sheets
📄 DEPLOY_CHECKLIST.md         ← Checklist deploy an toàn
📄 google-apps-script.js       ← Code paste vào Google Apps Script
📄 assets/js/config.js         ← Config URL Google Apps Script
📄 assets/js/rsvp.js           ← Đã cập nhật để kết nối Sheets
📄 rsvp.html                   ← Đã thêm load config.js
```

## 🚀 SETUP NHANH (3 BƯỚC)

### BƯỚC 1: Tạo Google Sheets
- Tên: **"Phi-Luong-Wedding-RSVP"**
- 3 sheets: **Events**, **Guests**, **Confirmations**
- Copy dữ liệu mẫu từ `GOOGLE_SHEETS_TEMPLATE.md`

### BƯỚC 2: Setup Apps Script
- Extensions > Apps Script
- Copy code từ `google-apps-script.js`
- Deploy as Web app (Anyone can access)
- Copy Web app URL

### BƯỚC 3: Cấu hình Website
- Mở `assets/js/config.js`
- Paste Web app URL vào dòng:
  ```javascript
  const GOOGLE_SCRIPT_URL = 'PASTE_URL_HERE';
  ```

## 🎉 XONG!

Website sẽ TỰ ĐỘNG:
- Lấy danh sách khách từ Google Sheets
- Lưu xác nhận tham dự vào Google Sheets
- Fallback về JSON nếu không có config Sheets

## 📖 TÀI LIỆU CHI TIẾT

1. **QUICK_START.md** - Hướng dẫn setup từng bước (ƯU TIÊN ĐỌC)
2. **SETUP_GOOGLE_SHEETS.md** - Chi tiết kỹ thuật
3. **GOOGLE_SHEETS_TEMPLATE.md** - Dữ liệu mẫu
4. **DEPLOY_CHECKLIST.md** - Deploy an toàn

## 💡 LƯU Ý

- Website vẫn hoạt động BÌNH THƯỜNG nếu chưa setup Sheets (dùng `data/guests.json`)
- Sau khi setup Sheets, website tự động chuyển sang dùng Sheets
- Giới hạn miễn phí: 20,000 requests/ngày (đủ cho 500-1000 khách)

## 🆘 CẦN GIÚP?

Đọc file **QUICK_START.md** trước nhé! Trong đó có:
- Hướng dẫn từng bước có ảnh
- Troubleshooting
- FAQ

---

**Bắt đầu ngay:** Mở file `QUICK_START.md` → Làm theo 3 bước → 10 phút là xong! 🚀

