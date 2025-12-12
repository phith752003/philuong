# MẪU DỮ LIỆU CHO GOOGLE SHEETS

## SHEET 1: "Events"
Copy các dòng này vào Google Sheets:

```
id	name	date	time	location
event-le-an-hoi	LỄ ĂN HỎI	20/12/2025	8 giờ sáng - 11 giờ trưa	Thôn 3 Mai Xá, Xã Vĩnh Trụ, Tỉnh Ninh Bình
event-tiec-nha-gai	TIỆC ĐÃI KHÁCH NHÀ GÁI	20/12/2025	11 giờ trưa - 13 giờ chiều	Thôn 3 Mai Xá, Xã Vĩnh Trụ, Tỉnh Ninh Bình
event-le-thanh-hon	LỄ THÀNH HÔN	21/12/2025	Thời gian sẽ được thông báo sau	Số 01 ngõ 62 Đường Trần Thánh Tông, Thôn Vĩnh Thịnh, Xã Vĩnh Trụ, Tỉnh Ninh Bình
event-tiec-nha-trai	TIỆC CƯỚI NHÀ TRAI	21/12/2025	Thời gian sẽ được thông báo sau	Số 01 ngõ 62 Đường Trần Thánh Tông, Thôn Vĩnh Thịnh, Xã Vĩnh Trụ, Tỉnh Ninh Bình
```

## SHEET 2: "Guests"
Ví dụ dữ liệu khách mời:

```
id	name	phone	email	code	eventIds	note
guest-001	Nguyễn Văn A	0123456789	a@email.com	ABC123	event-le-an-hoi,event-tiec-nha-gai	Bạn thân chú rể
guest-002	Trần Thị B	0987654321	b@email.com	XYZ456	event-le-thanh-hon,event-tiec-nha-trai	Bạn thân cô dâu
guest-003	Lê Văn C	0111222333	c@email.com	DEF789	event-le-an-hoi,event-tiec-nha-gai,event-le-thanh-hon,event-tiec-nha-trai	Khách VIP - tham dự tất cả sự kiện
```

**Lưu ý:**
- Cột `eventIds`: Các event cách nhau bằng dấu phẩy, KHÔNG có khoảng trắng
- Cột `id`: Phải unique (duy nhất)
- Có thể để trống email, code, note nếu không có

## SHEET 3: "Confirmations"
Header (dòng đầu tiên):

```
timestamp	guestId	guestName	attendance	plusOne	message	selectedEvents
```

Sheet này để trống, dữ liệu sẽ tự động thêm vào khi khách xác nhận tham dự.

---

## CÁCH IMPORT NHANH:

1. Tạo file Excel/CSV với dữ liệu trên
2. Import vào Google Sheets
3. Hoặc copy/paste trực tiếp từ đây vào Google Sheets

## KẾT QUẢ:

Sau khi setup xong, website sẽ:
✅ Tự động lấy danh sách khách từ Google Sheets
✅ Lưu xác nhận tham dự vào Google Sheets
✅ Bạn có thể cập nhật danh sách khách real-time trên Sheets
✅ Xem được ai đã xác nhận, ai chưa

