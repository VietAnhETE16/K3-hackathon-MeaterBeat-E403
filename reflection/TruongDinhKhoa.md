# Báo cáo Reflection Cá nhân — Trương Đình Khoa

- **Họ và Tên:** Trương Đình Khoa
- **Mã Học Viên:** `2A202601297`
- **Vai trò chính:** Developer (Flow Build)
- **Dự án:** Dual-Mode AI Tutor & Auto Role Assignment Panel on VLearn Codelabs

---

## 1. Đóng góp cụ thể của tôi trong dự án
Trong suốt 1.5 ngày của Mini Hackathon, tôi chịu trách nhiệm chính trong các phần việc:
- **Lập trình giao diện Chat Overlay Widget:** Xây dựng panel AI Tutor bên phải màn hình học Codelab, gồm cơ chế thu gọn/mở rộng, bong bóng AI khi panel bị ẩn, hệ thống tab chuyển giữa "Giải thích / Tóm tắt" và "Chia Role Nhóm", cùng input chat để học viên hỏi nhanh ngay trong luồng học.
- **Xây dựng flow chọn thành viên nhóm:** Thiết kế khu vực tìm kiếm học viên theo tên hoặc mã học viên, render danh sách gợi ý từ mock database, xử lý thêm/xóa/xóa toàn bộ thành viên và hiển thị hồ sơ kỹ năng dưới dạng badge để người dùng nhìn nhanh năng lực từng người.
- **Lập trình thuật toán phân chia role nhóm bằng AI:** Kết nối dữ liệu bài Lab hiện tại (`currentLabData.steps`) với danh sách thành viên đã chọn (`selectedTeam`), dựng prompt yêu cầu AI phân vai theo kỹ năng/level và ép output về JSON để hệ thống có thể parse tự động.
- **Render Interactive Checklist:** Chuyển kết quả phân vai của AI thành các card công việc theo từng học viên, mỗi card có role, mã học viên và checklist nhiệm vụ có thể tick để nhóm theo dõi tiến độ sau khi nhận gợi ý.

---

## 2. Bài học lớn nhất rút ra về sản phẩm AI
- **AI cần nằm đúng trong workflow của người dùng:** Trước khi làm prototype, tôi nghĩ một chatbot trả lời tốt là đủ. Sau khi build overlay trực tiếp trên trang Codelab, tôi nhận ra giá trị nằm ở việc AI xuất hiện đúng lúc học viên đang đọc hướng dẫn, chọn bước học hoặc chuẩn bị chia việc, thay vì bắt người dùng rời khỏi ngữ cảnh hiện tại.
- **Output của AI phải được thiết kế để dùng tiếp được:** Với tính năng chia role, nếu AI chỉ trả lời bằng đoạn văn thì người dùng vẫn phải tự đọc và copy lại. Việc ép AI trả về JSON rồi render thành checklist giúp kết quả biến thành giao diện có thể thao tác ngay, giảm bước thủ công và làm rõ ai phụ trách việc gì.
- **Tự động hóa nên có điểm dừng:** Module phân vai chỉ đề xuất role và nhiệm vụ, còn học viên vẫn có quyền thêm/xóa thành viên, chạy lại phân vai hoặc tự tick checklist. Điều này phù hợp với rủi ro của bài toán: AI có thể gợi ý chưa tối ưu, nhưng người dùng vẫn giữ quyền quyết định cuối cùng.

---

## 3. Nhìn lại quá trình & Cải tiến nếu có thêm thời gian
- **Điều làm tốt:** Tôi hoàn thành được phần giao diện và flow chính của Chat Overlay Widget tương đối nhanh, giúp nhóm có một prototype bấm được, nhìn được và demo được đúng lát cắt trong spec. Phần chia role cũng liên kết được giữa dữ liệu hồ sơ học viên, nội dung bài Lab và kết quả checklist trên UI.
- **Điều chưa tốt:** Phần phân chia role hiện vẫn phụ thuộc nhiều vào prompt và mock profile, chưa có cơ chế kiểm tra chất lượng phân vai sau khi AI trả về. Nếu AI trả JSON sai format hoặc phân công chưa đều, hệ thống mới chỉ báo lỗi hoặc yêu cầu chạy lại, chưa có lớp fallback đủ tốt.
- **Nếu có thêm 1 tuần:**
  - Tôi muốn bổ sung thuật toán fallback rule-based để vẫn phân chia được vai trò cơ bản khi API lỗi hoặc JSON của AI không parse được.
  - Thêm khả năng chỉnh sửa trực tiếp role/nhiệm vụ trên từng checklist card, lưu trạng thái checklist theo nhóm và xuất kết quả phân công ra file hoặc link chia sẻ.
  - Cải thiện scoring kỹ năng bằng cách cân bằng giữa `desiredRoles`, level kỹ năng, availability và số lượng nhiệm vụ để tránh tình trạng một bạn bị giao quá nhiều việc.
