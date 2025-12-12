# 🔴 FIX LỖI CORS - GOOGLE APPS SCRIPT

## ❌ LỖI BẠN ĐANG GẶP:

```
Access to fetch at 'https://script.google.com/...' from origin 'http://127.0.0.1:5500' 
has been blocked by CORS policy
```

Đây là lỗi phổ biến khi setup Google Apps Script lần đầu!

---

## ✅ CÁCH FIX (5 PHÚT):

### **BƯỚC 1: Vào Google Apps Script**

1. Mở Google Sheets của bạn: **"Phi-Luong-Wedding-RSVP"**
2. Click **Extensions > Apps Script**

### **BƯỚC 2: Kiểm tra Code**

Đảm bảo code đã paste đúng từ file `google-apps-script.js`. Phải có:
- Hàm `doGet(e)` ✅
- Hàm `doPost(e)` ✅
- Hàm `getAllData()` ✅

### **BƯỚC 3: Deploy Lại (QUAN TRỌNG NHẤT!)**

**A. Xóa deployment cũ (nếu có):**
1. Click **Deploy > Manage deployments**
2. Nếu có deployment cũ → Click ⋮ (3 chấm) → **Archive**

**B. Tạo deployment mới:**
1. Click **Deploy > New deployment**
2. Click ⚙️ (gear icon) bên "Select type"
3. Chọn **Web app**
4. Điền thông tin:

```
Description: Phi Luong Wedding API v1
Execute as: Me (your-email@gmail.com)
Who has access: Anyone ⚠️⚠️⚠️ QUAN TRỌNG!
```

**⚠️ LƯU Ý:** Phải chọn **"Anyone"** - KHÔNG phải "Anyone with Google account"!

5. Click **Deploy**

**C. Authorize (lần đầu tiên):**
1. Hệ thống sẽ hỏi authorize
2. Click **Authorize access**
3. Chọn tài khoản Google của bạn
4. Click **Advanced** (nếu có cảnh báo)
5. Click **Go to [Your Project] (unsafe)** (đây là app của bạn, an toàn!)
6. Click **Allow**

**D. Copy URL mới:**
- Sau khi deploy, copy **Web app URL**
- URL dạng: `https://script.google.com/macros/s/AKfycb.../exec`

### **BƯỚC 4: Cập nhật Config Website**

Bạn **ĐÃ LÀM** bước này rồi (tôi thấy URL trong `config.js`).

Nhưng nếu URL mới khác URL cũ → cần update lại!

### **BƯỚC 5: Test**

1. Mở file: `test-google-sheets.html` trong browser
2. Click nút **"🔍 Test Connection"**
3. Xem log:
   - ✅ Nếu thành công → XONG!
   - ❌ Nếu vẫn lỗi → Xem bước dưới

---

## 🔍 TROUBLESHOOTING

### **Vấn đề 1: Vẫn lỗi CORS**

**Nguyên nhân:** Deploy settings không đúng

**Fix:**
1. Vào Apps Script → **Deploy > Manage deployments**
2. Kiểm tra deployment hiện tại:
   - **Who has access** = **"Anyone"** ✅
   - KHÔNG phải "Anyone with Google account" ❌
3. Nếu sai → Archive → New deployment lại

### **Vấn đề 2: "Permission denied" hoặc "Unauthorized"**

**Nguyên nhân:** Chưa authorize app

**Fix:**
1. Trong Apps Script, click **Run > testGetData**
2. Authorize app
3. Deploy lại

### **Vấn đề 3: "Sheet not found"**

**Nguyên nhân:** Tên sheet không đúng

**Fix:**
Kiểm tra trong Google Sheets phải có 3 sheets:
- `Guests` (chính xác, có dấu s)
- `Events` (chính xác, có dấu s)
- `Confirmations` (chính xác, có dấu s)

### **Vấn đề 4: URL không hoạt động**

**Nguyên nhân:** URL cũ hoặc không hợp lệ

**Fix:**
1. Deploy > **New deployment** (tạo mới, đừng dùng lại URL cũ)
2. Copy URL mới
3. Update `config.js`

---

## 📝 CHECKLIST

Trước khi test, đảm bảo:

- [ ] ✅ Google Sheets đã tạo với 3 sheets: Guests, Events, Confirmations
- [ ] ✅ Code Apps Script đã paste đúng từ `google-apps-script.js`
- [ ] ✅ Deploy as **Web app**
- [ ] ✅ **Execute as: Me**
- [ ] ✅ **Who has access: Anyone** (KHÔNG phải "Anyone with Google account")
- [ ] ✅ Đã authorize app
- [ ] ✅ Copy đúng Web app URL
- [ ] ✅ Paste URL vào `config.js`
- [ ] ✅ Save file `config.js`
- [ ] ✅ Refresh browser (Ctrl+F5)

---

## 🧪 TEST NHANH

Mở file **`test-google-sheets.html`** trong browser:

```
1. Mở: http://127.0.0.1:5500/test-google-sheets.html
2. Click "Test Connection"
3. Xem log
```

Nếu thấy:
```
✅ SUCCESS! Guests: X, Events: Y
```
→ **XONG!** Website đã kết nối thành công!

---

## 💡 TẠI SAO PHẢI CHỌN "ANYONE"?

Google Apps Script có 2 options:
1. **"Anyone with Google account"** → Chỉ người có Google account, phải login
2. **"Anyone"** → Ai cũng truy cập được (public API)

Chúng ta cần option 2 để website (không cần login) có thể gọi API!

**Bảo mật:** URL khó đoán, chỉ người có URL mới gọi được. Đủ an toàn cho wedding website.

---

## 🆘 VẪN KHÔNG ĐƯỢC?

Gửi cho tôi:
1. Screenshot Console (F12 → Console tab)
2. Screenshot Deploy settings trong Apps Script
3. URL Google Apps Script (có thể che bớt)

Tôi sẽ giúp debug! 😊

