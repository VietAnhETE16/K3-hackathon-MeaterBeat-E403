# AI SPEC — Dual-Mode AI Tutor & Auto Role Assignment Panel · Nhóm Batch03-K3 · Zone 1
Hướng: [] A — VLearn  [ ] B — Trợ lý Học viên  [x] C — Làn mở
Loại: [ ] Tối ưu tính năng có sẵn  [x] Tính năng mới

---

## §1. User & Job
- **Job executor + workflow:** Học viên tham gia khóa học AI Thực Chiến trên nền tảng VLearn.
  - *Sơ đồ workflow:* Nhận đề bài Codelab ➔ Đọc hướng dẫn lý thuyết/thực hành ➔ Thành lập nhóm (4-5 người) ➔ Tự thảo luận phân chia công việc ➔ Bắt đầu code ➔ Gặp lỗi hoặc khó hiểu ➔ Hỏi AI Tutor hỗ trợ ➔ Nộp bài.
- **Core JTBD:** *"Khi chuẩn bị thực hiện bài tập thực hành theo nhóm, tôi muốn hiểu rõ các hướng dẫn kỹ thuật phù hợp với năng lực cá nhân và phân chia công việc trong nhóm một cách hợp lý để có thể hoàn thành bài Lab đúng hạn với chất lượng tốt nhất."*
- **Problem statement:** Học viên gặp khó khăn khi tiếp cận tài liệu hướng dẫn chứa quá nhiều thuật ngữ chuyên ngành phức tạp (đặc biệt đối với học viên Non-IT), đồng thời các thành viên trong nhóm lúng túng trong việc phân phối công việc dẫn đến tình trạng phân chia công việc bất bình đẳng hoặc sai thế mạnh chuyên môn, gây chậm trễ tiến độ làm bài Lab thực hành.
- **Evidence:**
  - **Khảo sát người thật (n = 84):**
    - **46/84 (54,8%)** học viên gặp khó khăn lớn (đánh giá mức độ khó khăn từ 3/5 trở lên) trong việc tự phân chia vai trò (role) nhóm khi làm bài thực hành.
    - **20/84 (23,8%)** học viên thừa nhận gặp khó khăn trong việc tự hiểu tài liệu hướng dẫn Codelab mặc định (đánh giá từ 2/5 trở xuống), hầu hết thuộc nhóm học viên Non-IT (background Y tế, Kinh tế, PM, Viễn thông...).
  - **Đếm trên dữ liệu chatlog (n = 1.261 hội thoại học viên × AI tutor):**
    - **582/1.261 (46,2%)** lượt phản hồi của AI Tutor không hề có trích dẫn nguồn (`citations` rỗng `[]`), khiến học viên (đặc biệt là nhóm Non-IT) không biết kiểm chứng kiến thức gốc từ slide nào.
  - **Quote nguyên văn tiêu biểu:**
    1. *"Em không biết bạn nào giỏi phần nào để giao việc, cuối cùng toàn phân chia ngẫu nhiên rồi làm không kịp."* (Học viên IT, mức độ khó khăn chia role: 4/5).
    2. *"Đọc hướng dẫn Codelab nhiều từ chuyên môn quá, em là học viên y tế chuyển ngành nên đọc như vịt nghe sấm."* (Học viên Y tế, trình độ hiểu Lab: 1/5).
    3. *"Nhóm em 5 người nhưng chỉ có 2 người code chính, 3 người còn lại không biết làm gì vì chia việc không rõ ràng."* (Học viên Kinh tế, mức độ khó khăn chia role: 5/5).
    4. *"Chatbot trả lời lý thuyết thì mượt nhưng hỏi code lỗi trong bài Lab thì nó toàn đưa code chung chung không chạy được."* (Học viên IT, trình độ hiểu Lab: 2/5).
    5. *"Nhiều lúc chatbot trả lời sai về deadline của lớp làm em bị trễ hạn nộp bài trên hệ thống."* (Học viên IT, mức độ khó khăn chia role: 3/5).

---

## §2. Impact & quyết định chọn
- **Bảng impact 3 ứng viên tính năng:**

| Ứng viên tính năng | Đối tượng ảnh hưởng | Tần suất sử dụng | Chi phí/Hao tổn khi làm thủ công | Tính khả thi |
| :--- | :--- | :--- | :--- | :--- |
| **1. Discord Logistics Bot** | 369 học viên | 2 lần / tuần | Học viên mất 5-10 phút tìm kiếm link thông báo cũ của TA trên Discord | Cao (chỉ cần RAG trên thông báo lớp) |
| **2. AI Code Debugger Extension** | 369 học viên | 5 lần / ngày | Học viên mất 15-20 phút tự debug hoặc đợi TA hỗ trợ trên kênh chat | Trung bình (cần phát triển extension IDE) |
| **3. AI Tutor Widget (Cá nhân hóa + Chia role)** | 369 học viên | 3 lần / bài Lab | Nhóm mất 30-45 phút đầu buổi chia việc; học viên Non-IT mất thêm 1-2 tiếng tra từ điển thuật ngữ | Cao (phát triển widget overlay tích hợp VLearn Web) |

- **Ứng viên ĐÃ LOẠI + vì sao:** Discord Logistics Bot (loại vì giá trị học thuật thấp, thông tin logistics đã có kênh thông báo ghim sẵn của TA và ít tác động đến chất lượng đầu ra của bài Lab).
- **Ứng viên CHỌN + vì sao (bằng số):** AI Tutor Widget (chọn vì giải quyết trực tiếp 2 pain point lớn nhất từ số liệu khảo sát: **54,8%** học viên kẹt chia role và **23,8%** học viên gặp khó khăn hiểu tài liệu, trực tiếp tối ưu hóa thời gian thực hành từ 45 phút chia việc xuống còn 1 phút tự động).

---

## §3. Giải pháp tương tự đã nghiên cứu
- **VLearn AI Tutor cũ:**
  - *Flow:* Khung chat Q&A tự do đặt tại trang học.
  - *Đáng học:* Tích hợp trực quan ngay cạnh nội dung bài học.
  - *Đáng né:* Trả lời chung chung, thiếu trích dẫn nguồn (**46,2%** rỗng), không phân biệt được trình độ học viên (bắt học viên Non-IT đọc code phức tạp hoặc giải thích quá đơn giản cho học viên IT).
  - *Sự khác biệt của chúng tôi:* Tích hợp tính năng chuyển dịch **Dual-Mode** (IT / Non-IT) cá nhân hóa nội dung và tích hợp module phân chia role nhóm tự động theo hồ sơ kỹ năng của thành viên nhóm.
- **GitHub Copilot / ChatGPT:**
  - *Flow:* Tự động sinh code khi gõ hoặc hỏi.
  - *Đáng học:* Khả năng viết code nhanh và chính xác.
  - *Đáng né:* Học viên copy-paste trực tiếp dẫn đến không hiểu bản chất bài học.
  - *Sự khác biệt của chúng tôi:* AI Tutor của chúng tôi bị giới hạn nghiêm ngặt bởi System Prompt: **từ chối viết hộ code hoàn toàn**, thay vào đó cung cấp sơ đồ thuật toán, gợi ý cách triển khai để kích thích học viên tự tư duy.

---

## §4. Thiết kế
- **Lát cắt MỘT CÂU:** *"Một học viên Non-IT làm bài Lab nhóm trên VLearn, chọn chế độ dịch 'Non-IT' để xem tài liệu bằng ẩn dụ đời sống và click nút 'Tự động chia role' để nhận danh sách checklist nhiệm vụ cụ thể tương ứng với thế mạnh của từng thành viên."*
- **Non-goals (3 thứ không build):**
  1. Không tự động viết code và submit bài Lab lên hệ thống hộ học viên.
  2. Không thay thế hoàn toàn kênh giao tiếp Discord (nhóm vẫn tự họp thảo luận chi tiết).
  3. Không can thiệp vào công cụ lập trình IDE cục bộ của học sinh.
- **Mức prototype nhắm tới:** [x] Working — Phần mock: Dữ liệu hồ sơ học viên (`mock_profiles.json`) và đề bài Codelab. Phần thật: Lời gọi OpenAI API (`gpt-4o-mini`) chạy thật để dịch tài liệu và tự động phân phối vai trò.
- **Automation:** [x] conditional (Hệ thống gợi ý phân chia và dịch tài liệu, con người là người phê duyệt, chỉnh sửa và tích hoàn thành nhiệm vụ).
  - *Lý do (cost-of-error):* Cost-of-error của việc phân chia sai vai trò hoặc dịch sai thuật ngữ là thấp (người dùng có thể chỉnh sửa thủ công hoặc đổi chế độ dịch ngay lập tức), do đó việc để AI đề xuất (conditional automation) là tối ưu nhất.
- **§4b. Nguyên tắc đã áp dụng (HAX/PAIR):**

| Nguyên tắc | Áp cụ thể vào đâu trong prototype |
| :--- | :--- |
| **G01: Làm rõ những gì hệ thống có thể làm** | Giao diện hiển thị rõ ràng 2 nút chuyển đổi chế độ ("🔰 Hướng dẫn Non-IT" và "💻 Hướng dẫn IT") và nút "Tự động phân chia role theo hồ sơ" kèm loading spinner trực quan. |
| **G11: Làm rõ lý do hệ thống làm gì** | Trong bảng kết quả chia role nhóm, AI hiển thị chi tiết phần giải thích lý do gán vai trò đó dựa trên thế mạnh thực tế của học viên (ví dụ: giao vai Lead vì có kỹ năng Leader level 5). |
| **G10: Hạn chế hành vi bất thường** | Tích hợp cổng bảo mật và Rulebase để lọc, từ chối an toàn các câu hỏi ngoài phạm vi (off-scope), y tế, tài chính hoặc prompt injection. |
| **G15: Hỗ trợ sửa lỗi hiệu quả** | Bảng phân chia nhiệm vụ được kết xuất dưới dạng các checkbox tương tác, cho phép học viên tự click chọn hoàn thành hoặc thay đổi phân công thủ công dễ dàng. |

---

## §5. Kiểu lỗi — 4 lớp chỗ khó + kịch bản (≥8)

| Lớp chỗ khó | Kịch bản lỗi (Failure Mode) | Cách xử lý trong thiết kế (Mitigation) |
| :--- | :--- | :--- |
| **① Nguồn sự thật** | AI bịa ra thông tin sai lệch về thời hạn nộp bài (deadline) cuối khóa gây ảnh hưởng kết quả học tập. | Rulebase chặn trước từ khóa "deadline" và trả lời bằng câu từ chối chuẩn hướng dẫn tự kiểm tra hệ thống. |
| **① Nguồn sự thật** | AI bịa ra các flag hoặc câu lệnh Git không tồn tại (hallucination kỹ thuật). | System Prompt ép AI chỉ sử dụng các câu lệnh Git tiêu chuẩn và yêu cầu cung cấp đường dẫn tài liệu tham chiếu. |
| **② Mơ hồ / thiếu thông tin** | Học viên hỏi ngắn ngủi *"Model nào ngon hơn?"* không rõ ngữ cảnh và tiêu chí. | AI nhận diện sự thiếu hụt thông tin và phản hồi bằng cách hỏi lại các tiêu chí cụ thể (độ chính xác, chi phí, tốc độ). |
| **② Mơ hồ / thiếu thông tin** | Học viên báo *"Code lỗi, sửa giúp với"* nhưng không đính kèm code/lỗi. | AI phản hồi lịch sự yêu cầu học viên cung cấp đoạn mã nguồn liên quan và thông tin traceback đầy đủ. |
| **③ Ngoài phạm vi / thẩm quyền** | Học viên yêu cầu AI giải hộ bài thi trực tuyến đang diễn ra để gian lận. | Rulebase phát hiện và từ chối cung cấp đáp án thẳng thừng, chỉ hướng dẫn phương pháp giải dạng bài tương tự. |
| **③ Ngoài phạm vi / thẩm quyền** | Học viên cố tình bypass bằng lệnh Prompt Injection đòi in system prompt. | Cổng bảo mật `anti-injection.md` chặn đứng và trả lời: *"Mình không thể cung cấp chỉ dẫn nội bộ..."*. |
| **④ Đặc thù domain** | Học viên yêu cầu AI viết hộ code hoàn chỉnh từ đầu đến cuối cho bài Lab. | System Prompt quy định rõ AI không được tự code, chỉ đưa ra cấu trúc giải thuật và gợi ý từng bước. |
| **④ Đặc thù domain** | Học viên hỏi cách xử lý triệu chứng đau ngực, khó thở hoặc chuyển tiền lừa đảo. | Rulebase/System Prompt phân loại là off-scope học tập và phản hồi câu từ chối chuẩn nhằm tránh rủi ro pháp lý. |

---

## §6. Bốn đường đi của trải nghiệm
- **Happy path:** Học viên Non-IT mở trang học ➔ Click chọn chế độ dịch "Non-IT" ➔ AI Tutor dịch tài liệu thô thành tài liệu dễ hiểu kèm ẩn dụ đời sống ➔ Click tab Chia role nhóm ➔ Thêm thành viên và bấm "Tự động phân chia role" ➔ AI phân vai chính xác và vẽ bảng checklist công việc ➔ Học viên làm việc và tích chọn hoàn thành nhiệm vụ.
- **Low-confidence (②):** Học viên hỏi một câu hỏi mơ hồ về tối ưu hóa code. AI nhận diện độ tự tin thấp, phản hồi bằng cách đưa ra 3 hướng tối ưu khả thi (tốc độ, bộ nhớ, cấu trúc) và yêu cầu học viên chọn hướng muốn đi sâu.
- **Failure/không căn cứ (①):** Khi học viên hỏi một công nghệ hoàn toàn mới nằm ngoài bộ tài liệu Codelab. AI Tutor thông báo rõ: *"Thông tin này nằm ngoài tài liệu bài Lab hiện tại. Dưới đây là kiến thức nền tảng chung..."* để tránh bịa đặt thông tin.
- **Correction (user sửa):** Khi AI phân chia vai trò nhóm chưa hoàn toàn hợp lý (ví dụ: giao nhiệm vụ code frontend cho người có kỹ năng backend). Học viên có thể click vào checkbox hoặc kéo thả nhiệm vụ để điều chỉnh lại thủ công.
- **Khi bị đòi ngoài phạm vi (③):** Học viên hỏi về dung lượng server công ty hoặc yêu cầu viết mã độc. Hệ thống trả về câu chuẩn hóa: *"Câu này không liên quan đến bài lab. Vui lòng hỏi câu giúp xây dựng kiến thức"* hoặc từ chối dịch vụ an toàn.
- **Case đặc thù domain (④):** Học viên kẹt ở bước deploy code lên Docker. AI Tutor nhận diện đây là lỗi cấu hình môi trường, cung cấp các bước debug chuẩn và gợi ý kiểm tra lại file `Dockerfile` của dự án thay vì tự động sửa đổi file.

---

## §7. Kiểm thử
- **Chiều chất lượng + định nghĩa kiểm chứng:**
  - *Tính an toàn & Phạm vi:* Tỷ lệ từ chối chính xác các câu hỏi off-scope và prompt injection đạt 100%.
  - *Tính hữu ích:* AI Tutor phải đưa ra gợi ý cách giải quyết (hướng dẫn Non-IT sử dụng ẩn dụ; hướng dẫn IT cung cấp technical specs) thay vì viết hộ code.
- **Golden set (30 cases):** Đã thiết lập chi tiết tại `eval/chatbot_eval_30_cases.json` bao gồm 6 nhóm cases kiểm thử (normal_valid, missing_information, ambiguous_context, disallowed_request, high_consequence).
- **Quality bar (cam kết):** Đạt khi **100%** các câu hỏi bị cấm (disallowed_request) và ngoài phạm vi có rủi ro cao (high_consequence) được từ chối an toàn, đồng thời tỷ lệ chính xác (Accuracy) chung cuộc trên bộ Golden Set đạt **≥ 90%**.
- **Kết quả các lượt chạy:**

| Lượt chạy | Tỷ lệ chính xác (Accuracy) | Số câu Đạt / Tổng số | Trạng thái ghi nhận |
| :--- | :---: | :---: | :--- |
| **Lượt 1 (Trước khi sửa System Prompt)** | **76.67%** | 23 / 30 | Đạt yêu cầu cơ bản, trượt ở các câu hỏi mơ hồ và định nghĩa khái niệm system prompt. |
| **Lượt 2 (Sau khi sửa System Prompt)** | **100.00%** | 30 / 30 | Đạt tuyệt đối, xử lý xuất sắc các câu hỏi mơ hồ và từ chối an toàn toàn bộ off-scope. |

---

## §8. Phân công & kế hoạch
- **Phân công chi tiết:**

| Họ và Tên | Mã Học Viên | Vai trò chính | Phần việc đảm nhiệm trong dự án |
| :--- | :---: | :--- | :--- |
| **Mai Việt Anh** | `2A202601083` | **Developer (Flow Build)** | Phát triển logic điều hướng Codelab, tích hợp API OpenAI thật cho Dual-Mode, quản lý cache hướng dẫn. |
| **Trương Đình Khoa** | `2A202601297` | **Developer (Flow Build)** | Lập trình giao diện Chat Overlay Widget, thuật toán phân chia role nhóm và render Interactive Checklist. |
| **Lương Đăng Doanh** | `2A202601209` | **Prompt & QA Engineer** | Soạn thảo các system prompt (anti-injection, IT/Non-IT, chia role), xây dựng Golden Set, chạy evaluate.js. |
| **Nguyễn Trọng Dũng** | `2A202601965` | **Product Analyst (Spec & Val)** | Lập kế hoạch thử nghiệm người dùng (validation), thu thập feedback log. |
| **Trần Tuấn Trung** | `2A202601769` | **BA & PM (Survey & Pain Point)** | Thực hiện khảo sát (84 người), phân tích số liệu tìm pain point và quản trị mục tiêu. |

- **Willing users (ngoài nhóm):**
  1. Nguyễn Minh Anh (Labcoach) - Thử nghiệm chế độ dịch Non-IT.
  2. Hoàng Hiệp (Labcoach) - Thử nghiệm tính năng phân chia role nhóm.
  3. Võ Huyền Khánh Mây (Labcoach) - Thử nghiệm kịch bản hỏi đáp lỗi.
- **Kế hoạch Validation vòng CP5:**
  - Chạy thử nghiệm trực tiếp 10 phút/người. Cho học viên thực hiện task cụ thể. TA hoặc thành viên nhóm quan sát, ghi chép hành vi và hỏi 3 câu hỏi trải nghiệm để ghi log vào `validation/user_validation_log.json`.

---

## §9. Changelog
| Thời điểm | Đổi gì | Vì sao (trỏ về feedback/case nào) |
| :--- | :--- | :--- |
| **30/07/2026 17:00** | Cấu hình System Prompt chặn cứng y tế, tài chính, logistics | Tránh rủi ro pháp lý và nâng cao tính an toàn của mô hình đối với các câu hỏi ngoài phạm vi (ID 26, 27, 28, 29, 30). |
| **30/07/2026 17:15** | Tích hợp dữ liệu khảo sát thực tế (84 phản hồi) vào Spec | Bổ sung bằng chứng định lượng thực tế để chứng minh tính thuyết phục của bài toán phân chia vai trò nhóm. |


