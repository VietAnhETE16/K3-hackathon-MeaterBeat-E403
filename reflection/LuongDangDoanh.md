# Báo cáo Reflection Cá nhân — Lương Đăng Doanh

- **Họ và Tên:** Lương Đăng Doanh
- **Mã Học Viên:** `2A202601209`
- **Vai trò chính:** Prompt & QA Engineer
- **Dự án:** Dual-Mode AI Tutor & Auto Role Assignment Panel on VLearn Codelabs

---

## 1. Đóng góp cụ thể của tôi trong dự án

Trong suốt 1,5 ngày của Mini Hackathon, tôi phụ trách thiết kế hành vi AI và kiểm thử chất lượng đầu ra cho hai tính năng chính của prototype:

- **Soạn thảo system prompt và lớp an toàn:** Tôi xây dựng prompt `anti-injection.md` để xác định phạm vi hỗ trợ của AI Tutor, cách xử lý câu hỏi mơ hồ, câu hỏi ngoài phạm vi, yêu cầu nguy hiểm và các tình huống prompt injection. Prompt yêu cầu AI từ chối an toàn khi người dùng đòi tiết lộ chỉ dẫn nội bộ, gian lận kiểm tra, truy cập trái phép hoặc tạo nội dung gây hại; đồng thời hướng người dùng về lựa chọn an toàn và phù hợp với bài Lab.
- **Thiết kế prompt theo background IT/Non-IT:** Tôi soạn các system prompt cho hai cách giải thích nội dung Codelab. Bản Non-IT ưu tiên ngôn ngữ đơn giản, ví dụ gần gũi và giảm tải thuật ngữ; bản IT/Senior giữ chiều sâu kỹ thuật, giải thích cơ chế, điều kiện áp dụng, rủi ro và bước kiểm tra. Mục tiêu là cùng một nội dung Lab nhưng phù hợp hơn với nền tảng của từng người học.
- **Định nghĩa prompt cho chức năng chia role:** Tôi thiết kế yêu cầu để AI phân công dựa trên kỹ năng, mức độ thành thạo của thành viên và các nhiệm vụ trong Lab; đầu ra cần có vai trò, nhiệm vụ cụ thể và lý do phân công. Điều này giúp phần UI có dữ liệu nhất quán để render thành checklist và vẫn để người dùng là người quyết định cuối cùng.
- **Xây dựng Golden Set:** Tôi chuẩn bị bộ 30 tình huống kiểm thử cho AI Tutor, bao phủ các nhóm `normal_valid`, `missing_information`, `ambiguous_context`, `disallowed_request` và `high_consequence`. Mỗi case có input, expected output và tiêu chí đạt để kiểm tra không chỉ câu trả lời kiến thức mà cả khả năng làm rõ, từ chối an toàn và giữ đúng phạm vi.
- **Chạy và phân tích đánh giá tự động:** Tôi chạy `eval/evaluate.js` với model `gpt-4o-mini`. Script lần lượt gọi chatbot, áp dụng rulebase với các case cần chặn, dùng LLM grader để chấm từng case và lưu kết quả theo từng lượt chạy. Từ kết quả, tôi rà các failure để điều chỉnh prompt/rulebase; accuracy được cải thiện từ **23/30 (76,67%)** ở lượt trước lên **30/30 (100%)** ở lượt sau, đạt quality bar đã đặt là tối thiểu 90% accuracy và từ chối an toàn các case bị cấm/rủi ro cao.

---

## 2. Bài học lớn nhất rút ra về sản phẩm AI

- **Prompt là một phần của thiết kế sản phẩm, không chỉ là câu lệnh cho model:** Với cùng một model, cách mô tả đối tượng người dùng, phạm vi, định dạng đầu ra và điều không được làm quyết định trực tiếp trải nghiệm. Hai prompt IT/Non-IT cho thấy cá nhân hóa không chỉ là thay từ ngữ cho dễ hiểu, mà là điều chỉnh độ sâu, trình tự giải thích và ví dụ theo background của người học.
- **An toàn cần đi cùng tính hữu ích:** Một prompt an toàn chỉ biết từ chối sẽ làm gián đoạn việc học; ngược lại, trả lời quá rộng sẽ dễ vượt phạm vi hoặc để lộ hướng dẫn nội bộ. Bài học của tôi là mỗi câu từ chối nên ngắn gọn, trung lập và có hướng thay thế an toàn, ví dụ đề nghị giải thích kiến thức hoặc kiểm tra bảo mật trong phạm vi được ủy quyền.
- **Không thể đánh giá AI chỉ bằng vài lần thử thủ công:** Ban đầu, một số câu trả lời trông ổn trong demo nhưng bộ Golden Set chỉ ra những điểm chưa nhất quán ở câu hỏi ngoài phạm vi, mơ hồ và các yêu cầu bị cấm. Việc có expected output, phân nhóm case và lưu kết quả trước/sau đã biến nhận xét cảm tính thành quy trình sửa prompt có căn cứ.
- **Quality bar cần được chốt trước khi tối ưu:** Khi đã cam kết accuracy tối thiểu 90% và yêu cầu từ chối an toàn cho nhóm rủi ro, nhóm có một tiêu chuẩn rõ để quyết định thay đổi prompt. Điều này giúp kết quả 100% không chỉ là con số đẹp mà có thể truy vết về từng test case và artefact trong `eval/`.

---

## 3. Nhìn lại quá trình & Cải tiến nếu có thêm thời gian

- **Điều làm tốt:** Tôi đã kết nối được ba phần vốn dễ bị tách rời: prompt, kiểm thử và quyết định cải tiến. System prompt có quy tắc cụ thể, Golden Set kiểm tra được các quy tắc đó và `evaluate.js` lưu kết quả từng case để cả nhóm có thể xem lại. Điều này giúp phần AI của prototype có bằng chứng đo lường thay vì chỉ dựa vào cảm nhận khi demo.
- **Điều chưa tốt:** Golden Set hiện tập trung mạnh vào AI Tutor và phần an toàn; chất lượng của prompt IT/Non-IT và prompt chia role chưa có bộ tiêu chí chấm tự động riêng với nhiều profile, quy mô nhóm và tình huống phân công khác nhau. Ngoài ra, việc dùng LLM làm grader vẫn có thể có biến động giữa các lần chạy, nên kết quả cần được xem cùng lý do chấm từng case thay vì chỉ nhìn accuracy tổng.
- **Nếu có thêm 1 tuần:**
  - Mở rộng Golden Set theo từng tính năng: so sánh bản IT/Non-IT trên cùng nội dung, kiểm tra mức độ dễ hiểu và tính đầy đủ; tạo test cho chia role về độ phủ nhiệm vụ, cân bằng khối lượng, đúng kỹ năng và định dạng JSON.
  - Bổ sung chấm điểm kết hợp rule-based và đánh giá thủ công độc lập cho các case khó để giảm phụ thuộc vào một LLM grader.
  - Thiết lập regression test chạy lại sau mỗi thay đổi prompt, lưu phiên bản prompt và kết quả theo thời gian để tránh một sửa đổi cải thiện case này nhưng làm giảm chất lượng case khác.
  - Thu thập feedback người dùng thật cho hai chế độ hướng dẫn và tính năng chia role, sau đó chuyển các phản hồi tiêu biểu thành case mới trong Golden Set.
