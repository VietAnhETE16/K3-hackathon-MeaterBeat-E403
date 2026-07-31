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
| Chị Minh Anh<br>(Lab Coach - Willing User) | Test thử demo | Quan sát thao tác của nhóm | "phần chatbot hỏi đáp thêm phần config kinh nghiệm của user như bên phần xếp role" | Medium |
| Anh Hoàng Hiệp<br>(Lab Coach - willing user) | Kiểm tra giao diện tổng thể và chức năng | Nhấm đúng vào Icon AI, sử dụng đúng tab AI tutor | "Anh thấy phần UI đẹp rồi nhưng AI còn chậm" | Medium |
| Bạn nam G25<br>(Học viên) | Kiểm tra mục giải đáp, chia nhóm của AI  | Đọc phần nội dung cho người non-IT và đặt câu hỏi dựa trên đó | "Mình thấy demo này ok rồi đấy" | Low |
| Bạn nữ G25<br>(Học viên) | Kiểm tra sự phù hợp của nội dung cho người non-IT | Nhấn nhiều lần và cần giải thích qua | "Ừm mình thấy nó hợp lý rồi đấy" | Low |
| Bạn nữ E402<br>(Học viên) | Kiểm tra tổng thể với vai trò là non-it | Đã chọn đúng chức năng sau khi được hướng dẫn | "mình thấy ok rồi đó" | Low |

---

## 2. Tổng hợp Kết luận (4 dòng bắt buộc)

1. **Chủ đề lặp lại nhiều nhất:**
  - Người dùng đánh giá cao giao diện UI đẹp mắt, trực quan và nội dung phân phối cho Non-IT/IT của chế độ dịch.
   - Các trở ngại và đề xuất nổi bật:
     - Đề xuất tích hợp phần cấu hình kinh nghiệm/trình độ học viên từ Profile vào thẳng Chatbot Q&A (tương tự bên phân vai nhóm) để AI tự động nhận diện và cá nhân hóa câu trả lời mà không bắt học viên chọn thủ công (feedback từ chị Minh Anh).
     - Tốc độ phản hồi của AI Tutor còn hơi chậm (feedback từ anh Hoàng Hiệp).
     - Học viên Non-IT mới sử dụng ban đầu còn lúng túng, cần giải thích hoặc hướng dẫn qua mới biết cách bấm các nút chuyển đổi (quan sát từ học viên nữ G25, E402).
2. **1-2 thay đổi sẽ thực hiện trước demo (ghi nhận vào §9 Changelog của [spec.md]):**
   - *Thay đổi 1:* Đồng bộ hóa thông tin kinh nghiệm học viên từ Profile Database vào thẳng System Prompt của Chatbot Q&A để chatbot tự động điều chỉnh ngôn ngữ/ẩn dụ phù hợp với người dùng hiện tại (giải quyết trực tiếp feedback của chị Minh Anh).
   - *Thay đổi 2:* Thêm tooltip hướng dẫn nhanh (Helper Tooltip) trực quan trên Widget chat để người dùng biết cách bấm nút dịch và nút chia nhóm.
3. **Những phản hồi giữ nguyên (không sửa) kèm lý do/căn cứ:**
   - *Giữ nguyên:* Độ trễ của AI Tutor chưa tối ưu sâu bằng code ở thời điểm này vì phụ thuộc vào API OpenAI. Thay vào đó, nhóm bổ sung giao diện Loading State sinh động (spinner) để cải thiện trải nghiệm thị giác của người dùng trong lúc chờ phản hồi.
4. **Các ý kiến đưa vào backlog (Slide 6 - Nếu có thêm 1 tuần):**
    - *Ý kiến:* Tích hợp cơ chế Streaming Response (stream kết quả phản hồi gõ chữ theo thời gian thực) để giải quyết triệt để vấn đề thời gian phản hồi của AI.

