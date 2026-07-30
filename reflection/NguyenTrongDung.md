# Báo cáo Reflection Cá nhân — Nguyễn Trọng Dũng

- **Họ và Tên:** Nguyễn Trọng Dũng
- **Mã Học Viên:** `2A202601965`
- **Vai trò chính:** Product Analyst (Spec & Val)
- **Dự án:** Dual-Mode AI Tutor & Auto Role Assignment Panel on VLearn Codelabs

---

## 1. Đóng góp cụ thể của tôi trong dự án
Trong suốt 1.5 ngày của Mini Hackathon, tôi chịu trách nhiệm chính trong các phần việc:
- **Thiết kế Kịch bản kiểm thử người dùng (Validation Protocol - CP5):** Xây dựng kịch bản kiểm thử trực tiếp (user task scenario), đặt ra bộ câu hỏi phỏng vấn sâu (3 câu hỏi trải nghiệm) để khai thác khó khăn thực tế của học viên khi tương tác với widget.
- **Thực thi và Ghi nhận nhật ký Validation (CP5):** Trực tiếp tổ chức phiên chạy thử nghiệm 10 phút/người với 5 người dùng ngoài nhóm (bao gồm cả 2 willing users là chị Minh Anh và anh Hoàng Hiệp), ghi nhận chi tiết hành vi thao tác, lỗi giao diện, và phát ngôn nguyên văn của họ vào [validation/user_validation_log.md](file:///Users/tdu/K3-hackathon-MeaterBeat-E403/validation/user_validation_log.md).
- **Quản lý Spec & Cải tiến sản phẩm (Spec & Val):** Phân loại mức độ nghiêm trọng của feedback (Low/Medium/High), tổng hợp các chủ đề lỗi lặp lại nhiều nhất để ánh xạ sang mục **§9 Changelog** trong [spec.md](file:///Users/tdu/K3-hackathon-MeaterBeat-E403/spec.md) (tối ưu UI hiển thị phần nhập prompt nhỏ, cải thiện độ trễ của AI) và xây dựng danh mục tính năng chờ (backlog) cho Slide 6 thuyết trình của nhóm.

---

## 2. Bài học lớn nhất rút ra về sản phẩm AI
- **Sức mạnh của việc Đo lường bằng số liệu định lượng (Quality Bar):** Trước đây khi làm AI, tôi thường chỉ hỏi thử vài câu xem chatbot trả lời "mượt" không (vibe check). Qua dự án, tôi thấy rõ việc AI bị trượt ở các câu hỏi mơ hồ hoặc giải đáp sai thông tin ngoài phạm vi. Việc chốt rõ Quality Bar bằng con số cụ thể trong Spec giúp đo lường mức độ tin cậy của sản phẩm AI một cách khách quan trước khi đem đi validate với người dùng.
- **Thiết kế rào chắn an toàn (Guardrails) từ khâu viết Spec:** Chi phí lỗi (Cost-of-Error) của việc AI bịa đặt thông tin deadline hoặc giải hộ bài thi online là cực kỳ lớn. Do đó, việc chủ động định nghĩa 4 lớp chỗ khó và kịch bản lỗi ngay trong tài liệu Spec giúp định hướng thiết kế rào chắn an toàn (Guardrails) hiệu quả, thay vì để AI tự do suy luận.
- **AI cần được thiết kế để học viên "tự làm", không làm hộ:** Ranh giới cốt lõi của AI Tutor trên VLearn là gợi ý tư duy, sơ đồ giải thuật chứ không viết hộ code. Việc đề xuất mức độ tự động hóa phù hợp (Conditional Automation) giúp học sinh thực sự làm chủ kiến thức và tự tin hơn trong các bài thực hành nhóm.

---

## 3. Nhìn lại quá trình & Cải tiến nếu có thêm thời gian
- **Điều làm tốt:** Bản thân tôi đã hoàn thành tốt vai trò là cầu nối giữa kỹ thuật và người dùng thật. Việc tổ chức các phiên phỏng vấn 10 phút, im lặng quan sát user thao tác giúp nhóm phát hiện ra nhiều điểm bất hợp lý trong thiết kế UI của phần chat và chia role để tối ưu kịp thời trước giờ demo.
- **Điều chưa tốt:** Việc chuẩn bị các câu hỏi phỏng vấn trong phiên validation ban đầu còn hơi chung chung, dẫn đến một số phản hồi của học viên bị ngắn hoặc chưa đi sâu vào cảm nhận chức năng tự động chia role.
- **Nếu có thêm 1 tuần:**
  - Tôi muốn thực hiện kiểm thử diện rộng (A/B testing) giữa 2 phiên bản: một bản AI Tutor chỉ trả lời bằng chữ thông thường và một bản AI Tutor tích hợp Dual-mode/Checklist tương tác để đo đạc chính xác sự cải thiện về thời gian hoàn thành bài Lab của học viên Non-IT.
  - Xây dựng một dashboard nhỏ ghi nhận tự động các trường hợp AI trả lời "Low-confidence" hoặc bị người dùng bấm nút chỉnh sửa thủ công để làm dữ liệu cải tiến trải nghiệm người dùng (UX) cho các phiên bản sau.

