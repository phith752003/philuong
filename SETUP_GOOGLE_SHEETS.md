# HƯỚNG DẪN KẾT NỐI GOOGLE SHEETS

## BƯỚC 1: TẠO GOOGLE SHEETS

1. Mở https://sheets.google.com
2. Tạo spreadsheet mới tên: **"Phi-Luong-Wedding-RSVP"**
3. Tạo 2 sheet:

### Sheet 1: "Guests" (Danh sách khách mời)
Cột:
- `id` (text) - VD: guest-001, guest-002
- `name` (text) - Tên khách
- `phone` (text) - Số điện thoại
- `email` (text) - Email
- `code` (text) - Mã khách mời
- `eventIds` (text) - VD: event-le-an-hoi,event-tiec-nha-gai
- `note` (text) - Ghi chú cho khách

### Sheet 2: "Confirmations" (Xác nhận tham dự)
Cột:
- `timestamp` (datetime)
- `guestId` (text)
- `guestName` (text)
- `attendance` (text) - yes/no/maybe
- `plusOne` (number)
- `message` (text)
- `selectedEvents` (text)

### Sheet 3: "Events" (Danh sách sự kiện)
Cột:
- `id` (text) - VD: event-le-an-hoi
- `name` (text) - VD: LỄ ĂN HỎI
- `date` (text) - VD: 20/12/2025
- `time` (text) - VD: 8 giờ sáng - 11 giờ trưa
- `location` (text)

## BƯỚC 2: THÊM APPS SCRIPT

1. Trong Google Sheets, vào **Extensions > Apps Script**
2. Xóa code mẫu
3. Copy toàn bộ nội dung file `google-apps-script.js` (tôi sẽ tạo)
4. Paste vào Apps Script editor
5. Click **Save** (Ctrl+S)
6. Click **Deploy > New deployment**
7. Chọn type: **Web app**
8. Settings:
   - Execute as: **Me**
   - Who has access: **Anyone** (quan trọng!)
9. Click **Deploy**
10. Copy **Web app URL** (dạng: https://script.google.com/macros/s/...../exec)

## BƯỚC 3: CẤU HÌNH WEBSITE

1. Mở file `assets/js/config.js`
2. Paste Web app URL vào `GOOGLE_SCRIPT_URL`
3. Lưu file

## BƯỚC 4: TEST

1. Thêm vài khách mời vào sheet "Guests"
2. Thêm vài sự kiện vào sheet "Events"
3. Mở website, thử tìm kiếm khách
4. Thử xác nhận tham dự
5. Kiểm tra sheet "Confirmations" xem có dữ liệu mới không

## LƯU Ý BẢO MẬT

- ✅ Không để lộ URL Apps Script ra ngoài (nếu có thể)
- ✅ Có thể thêm password/token trong Apps Script
- ✅ Google Apps Script có giới hạn: 20,000 requests/day (miễn phí)
- ✅ Dữ liệu lưu trong Google Sheet của bạn, chỉ bạn kiểm soát

## HỖ TRỢ

Nếu gặp lỗi CORS hoặc permission, xem lại:
1. Deploy settings: "Who has access" = **Anyone**
2. Đã Save và Deploy lại sau khi sửa code

