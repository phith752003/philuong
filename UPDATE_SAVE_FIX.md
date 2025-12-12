# ✅ FIX: LƯU XÁC NHẬN THAM DỰ VÀO GOOGLE SHEETS

## 🔧 ĐÃ SỬA GÌ?

Thay đổi cách lưu dữ liệu từ **POST request** → **GET request** để tránh lỗi CORS.

### Trước (không hoạt động):
```javascript
POST → Google Apps Script (bị chặn CORS)
```

### Sau (hoạt động):
```javascript
GET với query parameters → Google Apps Script ✅
```

---

## 📝 CẦN LÀM GÌ BÂY GIỜ?

### **BƯỚC 1: Update Code Google Apps Script**

1. Mở Google Sheets: **"Phi-Luong-Wedding-RSVP"**
2. **Extensions > Apps Script**
3. **THAY THẾ TOÀN BỘ CODE** bằng nội dung mới từ file:
   ```
   📄 google-apps-script.js
   ```
4. **Ctrl+S** để Save
5. **Deploy lại** (quan trọng!):
   - **Deploy > Manage deployments**
   - Click ✏️ (edit icon) ở deployment hiện tại
   - Click **Deploy**
   - Hoặc tạo **New deployment** với version mới

### **BƯỚC 2: Refresh Website**

1. Reload website: **Ctrl+F5** (hard refresh)
2. Clear cache nếu cần

### **BƯỚC 3: Test**

Có 2 cách test:

#### **Cách 1: Test với tool (khuyến nghị)**

1. Mở: `test-google-sheets.html` trong browser
2. Click **"💾 Test Save Data"**
3. Xem log → phải thấy **"✅ SAVE SUCCESS!"**
4. Kiểm tra Google Sheets → sheet **"Confirmations"** phải có dòng mới

#### **Cách 2: Test trên website**

1. Vào trang RSVP: `rsvp.html`
2. Tìm khách mời
3. Chọn khách
4. Điền form xác nhận tham dự
5. Submit
6. Phải thấy: **"✅ Đã lưu xác nhận tham dự!"**
7. Kiểm tra Google Sheets → sheet **"Confirmations"** phải có dòng mới

---

## 📊 KIỂM TRA GOOGLE SHEETS

Mở sheet **"Confirmations"**, phải thấy dòng mới với:
- `timestamp`: Thời gian xác nhận
- `guestId`: ID khách
- `guestName`: Tên khách
- `attendance`: yes/no/maybe
- `plusOne`: Số người đi cùng
- `message`: Lời nhắn
- `selectedEvents`: Các sự kiện tham dự

---

## 🔍 TROUBLESHOOTING

### **Vấn đề 1: Vẫn không lưu được**

**Kiểm tra:**
1. ✅ Đã update code Apps Script chưa?
2. ✅ Đã **Save** code Apps Script chưa?
3. ✅ Đã **Deploy lại** chưa?
4. ✅ Sheet "Confirmations" có đủ 7 cột header chưa?
5. ✅ Tên sheet đúng chính tả chưa: **"Confirmations"** (có dấu s)

### **Vấn đề 2: Lỗi "Sheet not found"**

**Fix:**
Sheet "Confirmations" phải có header (dòng đầu tiên):
```
timestamp | guestId | guestName | attendance | plusOne | message | selectedEvents
```

### **Vấn đề 3: Deploy không có hiệu lực**

**Fix:**
1. **Archive deployment cũ**
2. Tạo **New deployment** (version mới)
3. Có thể cần đổi URL → update lại `config.js`

---

## ✨ LỢI ÍCH CỦA CÁCH MỚI

✅ **Không bị CORS** - GET request dễ xử lý hơn POST
✅ **Có response** - Biết được lưu thành công hay thất bại
✅ **Dễ debug** - Xem được log response
✅ **Tương thích** - Hoạt động với "Bất cứ ai có Tài khoản Google"

---

## 📝 SUMMARY

### Files đã thay đổi:
1. ✅ `google-apps-script.js` - Thêm hàm `saveConfirmationViaGet()`
2. ✅ `assets/js/rsvp.js` - Đổi POST → GET
3. ✅ `test-google-sheets.html` - Update test function

### Action cần làm:
1. ⏳ **Update code Google Apps Script** (copy từ file mới)
2. ⏳ **Deploy lại**
3. ⏳ **Test**

---

**🚀 Sau khi hoàn thành 3 bước trên, website sẽ lưu được xác nhận tham dự vào Google Sheets!**

