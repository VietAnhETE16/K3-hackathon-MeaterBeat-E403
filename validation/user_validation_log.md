# USER VALIDATION LOG (FEEDBACK LOG)

Tài liệu ghi nhận kết quả thử nghiệm sản phẩm thực tế với người dùng ngoài nhóm (vòng validation tại mốc **CP5**). 

> [!IMPORTANT]
> **Yêu cầu nghiệm thu (Rubric R6):**
> - Thử nghiệm với ít nhất **5 người ngoài nhóm** (trong đó có ít nhất **2 willing users** đã khai báo ở CP1).
> - Ghi lại **quote nguyên văn** phản hồi của người dùng.
> - Có ít nhất **1 thay đổi** được thực hiện từ feedback và ghi nhận vào mục **§9 Changelog** trong [spec.md](file:///Users/tdu/K3-hackathon-MeaterBeat-E403/spec.md) (hoặc giải trình giữ nguyên có lý do).

---

## 1. Nhật ký Thử nghiệm (Feedback Log)

| Người thử (Tên/Vai — Willing user?) | Task giao cho user | Quan sát của nhóm (Họ bấm gì, kẹt ở đâu) | Quote nguyên văn (Ý kiến của user sau 3 câu hỏi) | Mức nghiêm trọng (Low/Medium/High) |
| :--- | :--- | :--- | :--- | :--- |
| Chị Minh Anh<br>(Lab Coach - Willing User) | Test thử demo | Quan sát thao tác của nhóm | "Mình thích ý tưởng của bạn đó sợ không hoàn thiện được trong deadline" | Medium |
| Anh Hoàng Hiệp<br>(Lab Coach - willing user) | Kiểm tra giao diện tổng thể và chức năng | Nhấm đúng vào Icon AI, sử dụng đúng tab AI tutor | "Anh thấy phần UI đẹp rồi nhưng AI còn chậm" | Medium |
| Bạn nam G25<br>(Học viên) | Kiểm tra mục giải đáp, chia nhóm của AI  | Đọc phần nội dung cho người non-IT và đặt câu hỏi dựa trên đó | "Mình thấy demo này ok rồi đấy" | Low |
| Bạn nữ G25<br>(Học viên) | Kiểm tra sự phù hợp của nội dung cho người non-IT | Nhấn nhiều lần và cần giải thích qua | "Ừm mình thấy nó hợp lý rồi đấy" | Low |
| Bạn nữ E402<br>(Học viên) | Kiểm tra tổng thể với vai trò là non-it | Đã chọn đúng chức năng sau khi được hướng dẫn | "mình thấy ok rồi đó" | Low |

---

## 2. Tổng hợp Kết luận (4 dòng bắt buộc)

1. **Chủ đề lặp lại nhiều nhất:**
   - Người dùng đánh giá cao giao diện UI trực quan, đẹp mắt và chế độ dịch "Non-IT" dễ hiểu. Tuy nhiên, trở ngại lớn nhất là tốc độ phản hồi của AI Tutor còn hơi chậm (feedback từ anh Hoàng Hiệp) và người dùng mới cần một chút chỉ dẫn ban đầu để biết cách thao tác chuyển đổi chế độ hoặc chia role (feedback từ các bạn học viên nữ G25, E402).
2. **1-2 thay đổi sẽ thực hiện trước demo (ghi nhận vào §9 Changelog của [spec.md](file:///Users/tdu/K3-hackathon-MeaterBeat-E403/spec.md)):**
   - *Thay đổi 1:* Thêm hướng dẫn nhanh (Helper Tooltip) mô tả cách bấm nút dịch và nút chia nhóm ngay trên Widget chat để người dùng mới không cần người khác giải thích qua.
   - *Thay đổi 2:* Tối ưu lại giao diện Loading State (thêm animation spinner/skeleton) trong thời gian đợi AI Tutor phản hồi để người dùng biết hệ thống đang xử lý, giảm cảm giác bị trễ.
3. **Những phản hồi giữ nguyên (không sửa) kèm lý do/căn cứ:**
   - *Giữ nguyên:* Không cắt ngắn nội dung giải nghĩa bằng ẩn dụ đời sống của chế độ Non-IT, vì đây là giá trị cốt lõi giúp đối tượng Non-IT hiểu bản chất bài học, dù kết quả AI trả về có thể dài hơn thông thường.
4. **Các ý kiến đưa vào backlog (Slide 6 - Nếu có thêm 1 tuần):**
   - *Ý kiến:* Tích hợp cơ chế Streaming Response (trả kết quả dạng gõ chữ thời gian thực) thay vì đợi nhận toàn bộ câu từ API để giải quyết triệt để phản hồi "AI còn chậm".

