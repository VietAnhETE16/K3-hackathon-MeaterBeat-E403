# Báo cáo Reflection Cá nhân — Mai Việt Anh

- **Họ và Tên:** Mai Việt Anh
- **Mã Học Viên:** `2A202601083`
- **Vai trò chính:** Developer (Flow Build) 
- **Dự án:** Dual-Mode AI Tutor & Auto Role Assignment Panel on VLearn Codelabs

---

## 1. Đóng góp cụ thể của tôi trong dự án
Trong suốt 1.5 ngày của Mini Hackathon, tôi chịu trách nhiệm chính trong các phần việc:
- **Phát triển luồng logic (Flow Build):** Thiết lập cấu trúc luồng của ứng dụng trên `index.html` và `prototype.html`, liên kết logic chuyển bước bài học (Codelab Step Navigation) và quản lý cache hướng dẫn cá nhân hóa (`personalizedGuidesCache`).
- **Tích hợp Real API OpenAI:** Lập trình hàm `callRealLLM` sử dụng mô hình `gpt-4o-mini`, nạp API key tự động từ `.env` hoặc cho phép người dùng nhập/ghi đè từ giao diện Header của Web.
---

## 2. Bài học lớn nhất rút ra về sản phẩm AI
- **Sức mạnh của Cá nhân hóa và Ranh giới của RAG:** Lúc đầu nhóm chỉ nghĩ đến việc tạo chatbot trả lời chung chung. Nhưng qua số liệu khảo sát, chúng tôi nhận ra học sinh Non-IT bị ngộp bởi thuật ngữ chuyên môn. Bài học ở đây là sản phẩm AI tốt không chỉ là đưa ra câu trả lời đúng, mà phải đưa ra câu trả lời phù hợp với background của người nhận (Dual-Mode: IT/Non-IT).
- **Cost-of-Error và Cấp độ tự động hóa:** Thiết kế tính năng tự động chia role nhóm dạng "Conditional Automation" là quyết định rất sáng suốt. AI gợi ý chia việc dựa trên hồ sơ, nhưng người dùng (học viên) là người quyết định cuối cùng và có thể điều chỉnh qua Checklist tương tác. Điều này tránh được lỗi ảo giác của AI gây chia sai việc gây khó chịu cho nhóm.
- **Kỷ luật đánh giá (Golden Set):** Việc viết script đánh giá tự động [evaluate.js] giúp nhóm không bị "mù quáng" bởi một vài câu trả lời thử nghiệm mượt mà ban đầu. Thống kê rõ ràng giúp chúng tôi nhìn ra lỗi từ chối nhầm câu hỏi thông thường và sửa đổi prompt đạt độ chính xác từ 76.67% lên 100%.

---

## 3. Nhìn lại quá trình & Cải tiến nếu có thêm thời gian
- **Điều làm tốt:** Nhóm phối hợp rất nhịp nhàng theo đúng thế mạnh. Tôi và Trương Đình Khoa code flow chính rất nhanh; Lương Đăng Doanh xử lý spec tốt; Nguyễn Trọng Dũng tối ưu prompt xuất sắc; Trần Tuấn Trung thu thập số liệu khảo sát cực kỳ thuyết phục giúp định hình hướng đi đúng đắn.
- **Điều chưa tốt:** Thời gian đầu nhóm mất khá nhiều thời gian thảo luận hướng đi (giữa Hướng A và Hướng C), dẫn đến việc code prototype bị dồn vào cuối ngày 1.
- **Nếu có thêm 1 tuần:**
  - Tôi muốn tối ưu hóa thuật toán đối sánh kỹ năng của module phân chia role nhóm để AI phân tích sâu hơn dữ liệu lịch sử làm bài Lab trước đó của học sinh thay vì chỉ dựa vào profile tự khai.
  - Tích hợp thêm cơ chế lưu trữ kết quả phân vai trực tiếp vào Google Sheets thông qua Google Apps Script để nhóm dễ dàng quản lý tập trung bên ngoài Web.
