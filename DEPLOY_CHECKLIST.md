# 📦 CHECKLIST DEPLOY AN TOÀN

## 🔒 BẢO MẬT - FILE KHÔNG NÊN DEPLOY

Các file này chứa thông tin nhạy cảm hoặc không cần thiết:

```
❌ .git/
❌ .vscode/
❌ node_modules/
❌ *.md (README, SETUP_GOOGLE_SHEETS, etc.)
❌ google-apps-script.js (file này chỉ copy vào Google Apps Script)
❌ common/biicommon.min.js (đã không dùng)
❌ File backup (.bak, ~)
❌ .env, .env.local
❌ *.log
❌ thumbs.db, .DS_Store
```

## ✅ FILE CẦN DEPLOY

```
✅ index.html
✅ rsvp.html
✅ thiepmoi-custom.html
✅ templates/ (toàn bộ folder)
✅ common/imgs/ (toàn bộ ảnh)
✅ common/calendar.js
✅ common/calendar.css
✅ common/toastr/
✅ common/emoji-picker/
✅ assets/ (toàn bộ folder)
✅ data/guests.json (backup, nếu Google Sheets lỗi)
```

## 🛠️ CÁCH DEPLOY AN TOÀN

### Phương án 1: Tạo folder `dist/` (Khuyến nghị)

1. Tạo folder mới: `dist/`
2. Copy chỉ các file cần thiết vào `dist/`
3. Deploy folder `dist/` thay vì toàn bộ project

### Phương án 2: Dùng `.gitignore` (nếu dùng Git)

Tạo file `.gitignore`:
```
*.md
google-apps-script.js
common/biicommon.min.js
.vscode/
.git/
node_modules/
*.log
.env
```

### Phương án 3: Deploy thủ công

Chỉ upload các folder/file trong mục "✅ FILE CẦN DEPLOY"

## 🌐 HOSTING MIỄN PHÍ KHUYẾN NGHỊ

1. **Vercel** - https://vercel.com
   - Dễ dùng nhất
   - Free SSL
   - Auto deploy từ Git

2. **Netlify** - https://netlify.com
   - Kéo thả folder là xong
   - Free SSL

3. **GitHub Pages** - https://pages.github.com
   - Hoàn toàn miễn phí
   - Cần public repo

4. **Firebase Hosting** - https://firebase.google.com
   - Tốc độ nhanh
   - Free 10GB bandwidth/tháng

## 📝 SAU KHI DEPLOY

1. ✅ Test tất cả chức năng trên production
2. ✅ Kiểm tra ảnh load nhanh không
3. ✅ Test RSVP form → xem Google Sheets có nhận dữ liệu
4. ✅ Test trên mobile
5. ✅ Chia sẻ link với vài người để test

## 🔐 BẢO MẬT NÂNG CAO (Tùy chọn)

Nếu muốn bảo mật hơn:

1. **Obfuscate JavaScript:**
   - Dùng tool: https://obfuscator.io
   - Upload file JS → Download bản obfuscated
   - Thay thế file gốc

2. **Minify CSS/JS:**
   - CSS: https://cssminifier.com
   - JS: https://jscompress.com

3. **Password protect:**
   - Thêm password cho website
   - Hoặc chỉ chia sẻ link với người có mã mời

## 💾 BACKUP

Trước khi deploy, backup:
1. Toàn bộ folder project
2. Google Sheets (File > Download > Excel)
3. Lưu ở nơi an toàn (Google Drive, OneDrive)

---

**⏰ THỜI GIAN ƯỚC TÍNH:**
- Setup Google Sheets: 10 phút
- Deploy lên hosting: 5 phút
- Test: 10 phút
- **TỔNG: ~25 phút**

Chúc bạn deploy thành công! 🎉

