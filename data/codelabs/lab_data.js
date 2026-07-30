const CODELABS_DATA = {
  "day1-lab-llm-api-foundation": {
    "id": "day1-lab-llm-api-foundation",
    "title": "Lab 01 — Nền tảng LLM API",
    "duration": 240,
    "author": "GDGoC FPTU × VinUni Codelab",
    "updated": "2026-07-23",
    "category": "LLM Foundations",
    "description": "Học viên hoàn thiện toàn bộ TODO trong template.py: API cơ bản, system prompt và token, streaming/retry, rồi ghép thành trợ lý CLI.",
    "day": "1",
    "preparationTipIds": [
      "huong-dan-cai-vs-code-va-git",
      "huong-dan-cai-python-va-cau-hinh-python-trong-vs-code",
      "thiet-lap-venv-voi-pip-va-uv",
      "api-key-cho-nguoi-moi-gemini-openai-groq-cap-nhat-2",
      "huong-dan-tai-bai-lab"
    ],
    "keywords": "$undefined",
    "version": "$undefined",
    "updatedSignificant": "$undefined",
    "learningPath": "$undefined",
    "sequence": "$undefined",
    "level": "beginner",
    "prerequisites": [
      "Biết hàm Python, list và dict cơ bản"
    ],
    "requiredLessonIds": "$undefined",
    "outcomes": [
      "Gọi được GPT-4o và GPT-4o-mini theo contract của template",
      "Dùng system prompt, đếm token và ước tính chi phí input/output",
      "Viết chatbot streaming có history giới hạn và retry",
      "Ghép các phần thành trợ lý CLI có thống kê phiên",
      "Chạy test mock mà không cần API key"
    ],
    "supportedOs": [
      "Windows",
      "macOS",
      "Linux"
    ],
    "requiredTools": [
      "Python 3.10+ qua lệnh python hoặc python3",
      "pip hoặc uv",
      "OpenAI API key chỉ khi chạy live"
    ],
    "commonErrors": [
      "Chạy nhầm interpreter ngoài .venv",
      "Đổi function signature",
      "Copy bài làm sai vào solution/solution.py",
      "Đặt API key trong source"
    ],
    "requiresSubmission": true,
    "presentationUrl": "$undefined",
    "bookletUrl": "$undefined",
    "published": true,
    "format": "steps",
    "steps": [
      {
        "title": "1. Mở đúng repo và nhìn thấy đích đến",
        "content": "Bạn đang là học viên: mục tiêu đầu tiên không phải viết code ngay, mà là biết **file nào cần sửa** và **test sẽ đọc file nào**.\n\n1. Mở [repo Lab 01 — Day01-lab-assignment](https://github.com/VinUni-AI20k/Day01-lab-assignment/), bấm **Fork** để tạo bản repo của bạn, rồi clone về máy theo [Hướng dẫn tải bài lab](/tips/huong-dan-tai-bai-lab).\n2. Mở thư mục repo vừa clone (ví dụ `D:\\CODE\\AITHUCCHIEN\\LABS\\Day01-lab-assignment`) trong VS Code hoặc terminal.\n3. Mở song song ba file: `template.py`, một file checkpoint trong `tests/test_part1.py` đến `tests/test_part4.py`, và `exercises.md`.\n4. Ban đầu, bạn làm trong `template.py`. Khi chuẩn bị nộp, copy bài hoàn thiện sang `solution/solution.py`; test ưu tiên file này nếu nó tồn tại.\n\n```mermaid\nflowchart LR\n    A[Đọc template.py] --> B[Chạy test baseline]\n    B --> C[Task 1: call_openai]\n    C --> D[Task 2: call_openai_mini]\n    D --> E[Task 3: compare_models]\n    E --> F[Part 2: system prompt và token]\n    F --> G[Part 3: streaming và retry]\n    G --> H[Part 4: run_assistant]\n    H --> I[Bonus + exercises + solution]\n```\n\nTrong Lab này, một [contract](#glossary \"Lời hứa về tên hàm, tham số và kiểu dữ liệu trả về. Test dựa vào contract để kiểm tra bài của bạn.\") là phần không được tự ý đổi. Mọi `TODO` trong `template.py` đều cần implementation; đừng đổi tên hàm hoặc chữ ký hàm.\n\nKết quả mong đợi: bạn biết sẽ sửa `template.py` trước, rồi nộp `solution/solution.py` sau cùng."
      },
      {
        "title": "2. Tạo môi trường và chạy test baseline",
        "content": "Repo ghi Python `3.10+`; không cần ép một bản Python cụ thể. Hãy dùng lệnh nào máy bạn đã nhận: `python` hoặc `python3`. Các lệnh dưới đây dùng `python`; nếu máy bạn chỉ nhận `python3`, thay toàn bộ `python` bằng `python3`.\n\nTrước hết kiểm tra lệnh nào hoạt động:\n\n```powershell\npython --version\n# Nếu báo không nhận lệnh, thử: python3 --version\n```\n\n### Cách pip — phù hợp nhất khi bạn mới bắt đầu\n\n```powershell\npython -m venv .venv\n.venv\\Scripts\\Activate.ps1\npython -m pip install -r requirements.txt\npython -m pytest tests -v\n```\n\nTrên macOS/Linux, thay dòng activate bằng:\n\n```bash\nsource .venv/bin/activate\n```\n\n### Cách uv — nếu bạn đã cài uv\n\n```powershell\nuv venv\nuv pip install -r requirements.txt\nuv run pytest tests -v\n```\n\n`requirements.txt` cài `openai`, `tiktoken`, `pytest` và `python-dotenv`. Lần chạy đầu sẽ fail vì các hàm còn `NotImplementedError`; đó là baseline bình thường, không phải lỗi cài đặt. [Virtual environment](#glossary \"Môi trường Python tách riêng cho một project, để package của Lab không lẫn với project khác.\") giúp `pip` chỉ cài dependency vào `.venv`.\n\nKết quả mong đợi: test bắt đầu chạy và lỗi chỉ còn liên quan các `TODO`, không còn `ModuleNotFoundError`."
      },
      {
        "title": "3. Hoàn thành Task 1: gọi GPT-4o và đo latency",
        "content": "![Task 1 trong template.py: hàm call_openai nhận prompt và các tham số model, temperature, top_p, max_tokens](/images/codelabs/day1-lab-llm-api-foundation/task-1-call-openai.png)\n\nĐừng cố hiểu cả hàm một lúc. Hãy hình dung `call_openai` như một hộp có 4 việc: **nhận câu hỏi → gửi câu hỏi → lấy câu trả lời → trả cả câu trả lời lẫn thời gian chờ**.\n\nTrong `template.py`, giữ nguyên dòng `def call_openai(...):`. Bạn chỉ thay phần `TODO` và `raise NotImplementedError(...)` bằng code của mình.\n\n1. **Tạo người giao hàng.** Trong hàm, import `OpenAI` và tạo `client`. `os` đã được import sẵn ở đầu file; chưa cần tạo API key thật để chạy test.\n2. **Gửi một tin nhắn.** Gọi `client.chat.completions.create(...)`. Phần `messages` là một list; với Task 1, nó chỉ có một dict: user gửi `prompt`.\n3. **Bấm giờ.** Lưu thời điểm ngay trước request và ngay sau request bằng `time.perf_counter()`. Lấy thời điểm sau trừ thời điểm trước để có [latency](#glossary \"Thời gian từ lúc gửi request đến khi nhận response. Ở đây trả về theo đơn vị giây.\").\n4. **Mở hộp nhận hàng.** Text nằm ở `response.choices[0].message.content`. Cuối hàm, trả về đúng hai thứ: text và latency, theo thứ tự `(response_text, latency_seconds)`.\n\nNếu bạn chưa biết bắt đầu từ dòng nào, mở hint dưới đây. Đây là code hoàn chỉnh khớp signature trong `template.py` và các test hiện tại.\n\n```hint-python\ndef call_openai(\n    prompt: str,\n    model: str = OPENAI_MODEL,\n    temperature: float = 0.7,\n    top_p: float = 0.9,\n    max_tokens: int = 256,\n) -> tuple[str, float]:\n    from openai import OpenAI\n\n    client = OpenAI(api_key=os.getenv(\"OPENAI_API_KEY\"))\n    start_time = time.perf_counter()\n    response = client.chat.completions.create(\n        model=model,\n        messages=[{\"role\": \"user\", \"content\": prompt}],\n        temperature=temperature,\n        top_p=top_p,\n        max_tokens=max_tokens,\n    )\n    latency_seconds = time.perf_counter() - start_time\n    response_text = response.choices[0].message.content\n    return response_text, latency_seconds\n```\n\nCác khái niệm bạn đang thấy trong hint:\n\n| Khái niệm | Hiểu như học viên |\n| --- | --- |\n| [API](#glossary \"Giao diện để chương trình của bạn gửi yêu cầu đến dịch vụ khác và nhận dữ liệu trả về.\") | Cầu nối để Python gửi prompt đến OpenAI. |\n| [prompt](#glossary \"Nội dung bạn gửi cho model: câu hỏi, yêu cầu hoặc ngữ cảnh.\") | Input của người dùng cho model. |\n| [temperature](#glossary \"Tham số điều chỉnh độ ngẫu nhiên: thấp thường ổn định hơn, cao thường đa dạng hơn.\") | Điều chỉnh mức sáng tạo/ngẫu nhiên của output. |\n| [top_p](#glossary \"Nucleus sampling: model chọn token trong một tập xác suất tích lũy thay vì xét mọi token.\") | Một cách khác để giới hạn độ ngẫu nhiên. |\n| `max_tokens` | Giới hạn độ dài output được sinh ra. |\n\nSau khi dán hoặc tự viết xong hàm, chạy checkpoint:\n\n```powershell\npython -m pytest tests/test_part1.py -k CallOpenAI -v\n```\n\nKết quả mong đợi: nhóm `TestCallOpenAI` pass. Test dùng [mock](#glossary \"Đối tượng giả thay cho API thật trong test, giúp kiểm tra logic mà không gọi mạng hay tốn tiền.\"), vì vậy chưa cần key thật."
      },
      {
        "title": "4. Task 2 — Gọi GPT-4o-mini bằng cách tái sử dụng Task 1",
        "content": "![Task 2 trong template.py: hàm call_openai_mini có cùng các tham số sinh output như Task 1](/images/codelabs/day1-lab-llm-api-foundation/task-2-call-openai-mini.png)\n\nTask 2 cố ý ngắn hơn Task 1. Bạn không cần tạo `OpenAI` client lần nữa, không cần đo thời gian lần nữa và cũng không cần copy-paste request. Hãy xem `call_openai_mini` là một [wrapper](#glossary \"Hàm nhỏ gọi một hàm khác, thường để cố định hoặc đơn giản hoá một vài tham số.\") quanh `call_openai`.\n\n1. Giữ nguyên `prompt`, `temperature`, `top_p`, `max_tokens` mà người gọi đã truyền vào.\n2. Gọi lại `call_openai(...)`.\n3. Chỉ thay `model` thành hằng `OPENAI_MINI_MODEL`; hằng này đã có sẵn ở đầu `template.py` và mang giá trị `\"gpt-4o-mini\"`.\n4. Trả thẳng kết quả của `call_openai`. Kết quả đó vốn đã là [tuple](#glossary \"Một nhóm giá trị theo thứ tự cố định. Ở đây là text trước, số giây latency sau.\") `(response_text, latency_seconds)`.\n\n```hint-python\ndef call_openai_mini(\n    prompt: str,\n    temperature: float = 0.7,\n    top_p: float = 0.9,\n    max_tokens: int = 256,\n) -> tuple[str, float]:\n    return call_openai(\n        prompt=prompt,\n        model=OPENAI_MINI_MODEL,\n        temperature=temperature,\n        top_p=top_p,\n        max_tokens=max_tokens,\n    )\n```\n\nGhi nhớ: các tham số được [forward](#glossary \"Chuyển tiếp nguyên giá trị tham số từ hàm hiện tại sang hàm khác.\") để người dùng của `call_openai_mini` vẫn chỉnh được độ ngẫu nhiên và độ dài output, giống Task 1.\n\nKết quả mong đợi: `TestCallOpenAIMini` pass. Nếu bị lỗi vì tự gọi lại chính `call_openai_mini`, hãy kiểm tra tên hàm trong dòng `return`."
      },
      {
        "title": "5. Task 3 — So sánh hai model trên cùng một prompt",
        "content": "![Task 3 trong template.py: hàm compare_models cần gọi cả GPT-4o và GPT-4o-mini rồi trả về dict](/images/codelabs/day1-lab-llm-api-foundation/task-3-compare-models.png)\n\nMục tiêu không phải chọn model “tốt nhất” ngay. Bạn chỉ tạo một [dict](#glossary \"Cấu trúc dữ liệu gồm cặp key: value; dùng key để lấy đúng thông tin.\") để đặt hai câu trả lời, hai latency và một ước tính chi phí cạnh nhau.\n\nLàm lần lượt:\n\n1. Gọi `call_openai(prompt)` và tách kết quả thành `gpt4o_response`, `gpt4o_latency`.\n2. Gọi `call_openai_mini(prompt)` với **cùng** prompt, rồi tách thành `mini_response`, `mini_latency`.\n3. Tính `gpt4o_cost_estimate` đúng theo công thức trong docstring. Đây chỉ là ước tính thô cho output GPT-4o, không phải hoá đơn thật.\n4. Trả về dict có **đúng** năm key mà template liệt kê. Tên key phải khớp từng ký tự vì test đọc theo tên.\n\n```hint-python\ndef compare_models(prompt: str) -> dict:\n    gpt4o_response, gpt4o_latency = call_openai(prompt)\n    mini_response, mini_latency = call_openai_mini(prompt)\n    gpt4o_cost_estimate = (\n        (len(gpt4o_response.split()) / 0.75)\n        / 1000\n        * PRICING_PER_1K_TOKENS[\"gpt-4o\"][\"output\"]\n    )\n\n    return {\n        \"gpt4o_response\": gpt4o_response,\n        \"mini_response\": mini_response,\n        \"gpt4o_latency\": gpt4o_latency,\n        \"mini_latency\": mini_latency,\n        \"gpt4o_cost_estimate\": gpt4o_cost_estimate,\n    }\n```\n\n| Khái niệm | Hiểu như học viên |\n| --- | --- |\n| [token](#glossary \"Đơn vị nhỏ mà model dùng để xử lý văn bản. Một từ không luôn bằng một token, nên template dùng quy ước xấp xỉ.\") | Đơn vị model dùng để đọc và tạo text; ở đây số từ chỉ được dùng để ước lượng token. |\n| [cost estimate](#glossary \"Con số ước lượng chi phí, không phải số tiền chính xác mà nhà cung cấp sẽ tính.\") | Con số gần đúng giúp bạn hình dung output dài hơn sẽ tốn nhiều hơn. |\n| key | Nhãn trong dict, ví dụ `mini_latency`; dùng sai nhãn thì test không tìm thấy dữ liệu. |\n\nKết quả mong đợi: `TestCompareModels` pass, bao gồm cả kiểm tra dict có đủ key, latency dương và chi phí không âm."
      },
      {
        "title": "6. Part 2 — System prompt, token và chi phí",
        "content": "Part 2 hoàn thiện ba hàm tiếp theo trong `template.py`: `chat_with_system_prompt`, `count_tokens` và `estimate_cost`. Chạy checkpoint riêng sau khi xong phần này:\n\n```powershell\npython -m pytest tests/test_part2.py -v\n```\n\n### Task 2.1 — Gửi system prompt cùng user prompt\n\nTái dùng cấu trúc của `call_openai`, nhưng truyền đúng hai message theo thứ tự system rồi user. Giữ nguyên `model`, `temperature`, `max_tokens`, đồng thời trả về `(response_text, latency_seconds)`.\n\n```python\nmessages = [\n    {\"role\": \"system\", \"content\": system_prompt},\n    {\"role\": \"user\", \"content\": user_prompt},\n]\n```\n\n### Task 2.2 — Đếm token có fallback\n\nDùng `tiktoken.encoding_for_model(model)` và `len(enc.encode(text))`. Nếu encoding không tải được hoặc `model` lạ, hàm không được crash: return `max(1, len(text) // 4)`.\n\n### Task 2.3 — Tính đủ input, output và total\n\nGọi `count_tokens` cho cả `prompt` lẫn `response`, rồi lấy giá từ `PRICING_PER_1K_TOKENS[model]`. Dict trả về phải có đúng năm key: `input_tokens`, `output_tokens`, `input_cost`, `output_cost`, `total_cost`; `total_cost` bằng tổng hai chi phí thành phần.\n\nKết quả mong đợi: `tests/test_part2.py` pass, kể cả case model không tồn tại."
      },
      {
        "title": "7. Part 3 — Streaming, history và retry",
        "content": "### Task 3.1 — Tạo chatbot streaming có history\n\n![Task 3.1 trong template.py: streaming_chatbot đọc input, stream từng chunk và giữ lịch sử hội thoại](/images/codelabs/day1-lab-llm-api-foundation/task-4-streaming-chatbot.png)\n\nTask 3.1 là phần để bạn nhìn thấy output đi dần về terminal thay vì chờ xong cả câu. [Streaming](#glossary \"Server gửi từng phần output ngay khi có thay vì đợi toàn bộ câu trả lời hoàn tất.\") làm người dùng thấy chương trình đang phản hồi.\n\n1. Tạo `OpenAI` client và list `history`. Mỗi phần tử history là dict có `role` (`\"user\"` hoặc `\"assistant\"`) và `content`.\n2. Vào vòng lặp `while True`, dùng `input()` để nhận câu người dùng. Nếu nhập `quit` hoặc `exit`, dùng `break` ngay để không gọi API.\n3. Lưu câu user vào history, sau đó gọi `client.chat.completions.create(..., stream=True)`. Giá trị trả về là luồng các [chunk](#glossary \"Một mảnh nhỏ của response streaming; mỗi chunk có thể chứa một phần text hoặc không chứa text.\").\n4. Lặp qua từng chunk, lấy `chunk.choices[0].delta.content or \"\"`, vừa `print` ngay vừa ghép vào list `reply_parts`.\n5. Sau khi stream xong, ghép `reply_parts`, thêm response của assistant vào history, rồi cắt đúng theo template: `history = history[-6:]`. Mỗi lượt có hai message (`user` và `assistant`), nên sáu message là ba lượt gần nhất.\n\n```hint-python\ndef streaming_chatbot() -> None:\n    from openai import OpenAI\n\n    client = OpenAI(api_key=os.getenv(\"OPENAI_API_KEY\"))\n    history = []\n\n    while True:\n        user_input = input(\"You: \").strip()\n        if user_input.lower() in {\"quit\", \"exit\"}:\n            break\n\n        history.append({\"role\": \"user\", \"content\": user_input})\n        stream = client.chat.completions.create(\n            model=OPENAI_MODEL,\n            messages=history,\n            stream=True,\n        )\n\n        reply_parts = []\n        print(\"Assistant: \", end=\"\")\n        for chunk in stream:\n            delta = chunk.choices[0].delta.content or \"\"\n            print(delta, end=\"\", flush=True)\n            reply_parts.append(delta)\n        print()\n\n        history.append({\"role\": \"assistant\", \"content\": \"\".join(reply_parts)})\n        history = history[-6:]\n```\n\nĐừng cố chạy live ngay. Test chỉ kiểm tra hàm tồn tại và thoát sạch khi nhận `quit`; hãy làm checkpoint test trước. Khi muốn xem stream thật, đặt key trong terminal hiện tại — không đặt vào source:\n\n```powershell\n$env:OPENAI_API_KEY=\"<key-cua-ban>\"\npython -c \"from template import streaming_chatbot; streaming_chatbot()\"\n```\n\nKết quả mong đợi: `TestStreamingChatbot` pass và chatbot thoát ngay với `quit`.\n\n### Task 3.2 — Thử lại request khi lỗi tạm thời\n\n![Task 3.2 trong template.py: retry_with_backoff gọi lại hàm với thời gian chờ tăng dần](/images/codelabs/day1-lab-llm-api-foundation/bonus-retry-backoff.png)\n\nMột request có thể lỗi tạm thời do mạng hoặc dịch vụ đang bận. [Exponential backoff](#glossary \"Mỗi lần thử lại chờ lâu hơn theo cấp số nhân, ví dụ 0.1 giây rồi 0.2, 0.4. Cách này giảm gửi dồn dập khi dịch vụ đang lỗi.\") nghĩa là: lỗi thì chờ một chút, thử lại; nếu lại lỗi thì chờ lâu hơn.\n\n1. Dùng `for attempt in range(max_retries + 1)`: lần gọi đầu tiên cộng với số lần thử lại cho phép.\n2. Trong `try`, gọi `fn()` và `return` ngay khi thành công.\n3. Trong `except`, nếu đã hết retry thì `raise` để ném lại chính lỗi cuối.\n4. Nếu còn lượt, gọi `time.sleep(base_delay * 2**attempt)` trước khi lặp lại.\n\n```hint-python\ndef retry_with_backoff(\n    fn: Callable,\n    max_retries: int = 3,\n    base_delay: float = 0.1,\n) -> Any:\n    for attempt in range(max_retries + 1):\n        try:\n            return fn()\n        except Exception:\n            if attempt == max_retries:\n                raise\n            time.sleep(base_delay * 2**attempt)\n```\n\nKết quả mong đợi: hàm trả kết quả ngay nếu `fn()` thành công; nếu tất cả lượt đều lỗi, exception cuối được giữ nguyên. Chạy `python -m pytest tests/test_part3.py -v`."
      },
      {
        "title": "8. Part 4 — Ghép thành trợ lý CLI",
        "content": "`run_assistant` dùng lại các phần trước, không tạo một contract mới. Khởi tạo `OpenAI` client trong hàm; nếu `get_input` là `None`, dùng `input`.\n\n1. Kiểm tra `max_turns` trước khi gọi `get_input`, rồi thoát nếu người dùng nhập `quit` hoặc `exit` không phân biệt hoa thường.\n2. Với mỗi lượt, truyền message system chứa `persona`, history hiện có và message user mới; gọi API với `stream=True` thông qua `retry_with_backoff`.\n3. Ghép từng chunk, thêm hai message user/assistant vào history rồi cắt `history = history[-6:]`.\n4. Cộng `num_turns`, token từ `count_tokens` và chi phí từ `estimate_cost`; trả dict có `num_turns`, `total_tokens`, `total_cost`, `history`.\n\n```powershell\npython -m pytest tests/test_part4.py -v\n```\n\nKết quả mong đợi: nhóm Basic kiểm tra thoát sạch và return shape; nhóm Scenario kiểm tra system prompt, streaming, history, thống kê và `max_turns`."
      },
      {
        "title": "9. Bonus — So sánh nhiều prompt và in bảng",
        "content": "### Bonus A — So sánh một danh sách prompt\n\n![Bonus A trong template.py: batch_compare lặp qua prompts và thêm prompt gốc vào mỗi kết quả](/images/codelabs/day1-lab-llm-api-foundation/bonus-batch-compare.png)\n\nỞ đây bạn không viết lại logic so sánh. `batch_compare` chỉ biến “so sánh một prompt” thành “so sánh nhiều prompt”.\n\n1. Tạo list rỗng `results`.\n2. Với từng `prompt` trong `prompts`, gọi `compare_models(prompt)`.\n3. Tạo dict kết quả mới rồi thêm key `\"prompt\"` để sau này biết dòng kết quả thuộc câu hỏi nào.\n4. Thêm dict đó vào list và return list sau vòng lặp.\n\n```hint-python\ndef batch_compare(prompts: list[str]) -> list[dict]:\n    results = []\n    for prompt in prompts:\n        comparison = compare_models(prompt)\n        results.append({**comparison, \"prompt\": prompt})\n    return results\n```\n\n`{**comparison, \"prompt\": prompt}` là cách tạo dict mới, giữ toàn bộ key cũ rồi thêm key mới. Nó tránh sửa trực tiếp kết quả của `compare_models`.\n\nKết quả mong đợi: số phần tử trả về bằng số prompt đưa vào và mỗi phần tử có key `prompt`. Bonus không thuộc bốn checkpoint hay điểm tự động hiện tại.\n\n### Bonus B — Biến kết quả thành bảng text dễ đọc\n\n![Bonus B trong template.py: format_comparison_table tạo bảng text gồm prompt, response và latency của hai model](/images/codelabs/day1-lab-llm-api-foundation/bonus-format-comparison-table.png)\n\nHàm này chỉ nhận `results` đã có sẵn, không gọi API. Bạn tạo một string để in ra terminal và nhìn nhanh kết quả.\n\n1. Viết helper `shorten` để cắt text dài hơn 40 ký tự và thêm `...`.\n2. Tạo hàng header chứa `Prompt`, `GPT-4o Response`, `Mini Response`, `GPT-4o Latency`, `Mini Latency`.\n3. Với từng dict, tạo một hàng; latency nên format theo giây, ví dụ `0.50s`.\n4. Nối các hàng bằng `\"\n\"`. Bảng trong hint dùng dấu `|`; không cần thư viện ngoài.\n\n```hint-python\ndef format_comparison_table(results: list[dict]) -> str:\n    def shorten(text: str) -> str:\n        return text if len(text) <= 40 else f\"{text[:37]}...\"\n\n    rows = [\"Prompt | GPT-4o Response | Mini Response | GPT-4o Latency | Mini Latency\"]\n    for result in results:\n        rows.append(\n            \" | \".join(\n                [\n                    shorten(result[\"prompt\"]),\n                    shorten(result[\"gpt4o_response\"]),\n                    shorten(result[\"mini_response\"]),\n                    f\"{result['gpt4o_latency']:.2f}s\",\n                    f\"{result['mini_latency']:.2f}s\",\n                ]\n            )\n        )\n    return \"\n\".join(rows)\n```\n\n[Helper function](#glossary \"Hàm nhỏ đặt bên trong hoặc bên cạnh hàm chính để làm một việc lặp lại, ở đây là rút gọn text.\") `shorten` giúp bạn không phải copy cùng điều kiện cắt text ba lần. Test chỉ cần kiểm tra đây là string có các header; nhưng hãy giữ đầu ra dễ đọc để dùng được khi tự chạy Lab.\n\nKết quả mong đợi: một string có header và một hàng cho mỗi kết quả. Bonus không thuộc bốn checkpoint hay điểm tự động hiện tại."
      },
      {
        "title": "10. Kiểm tra, phản ánh và nộp bài",
        "content": "Chạy toàn bộ test khi bạn nghĩ đã xong:\n\n```powershell\npython -m pytest tests -v\n```\n\nSau đó tạo đúng bài nộp. Test sẽ tự ưu tiên `solution/solution.py` nếu file này tồn tại, nên chạy lại test sau khi copy.\n\n```powershell\nNew-Item -ItemType Directory -Force solution\nCopy-Item template.py solution/solution.py\nCopy-Item exercises.md solution/exercises.md\npython -m pytest tests -v\nCompress-Archive -Path solution -DestinationPath solution.zip -Force\n```\n\nTrong `exercises.md`, tự ghi nhận quan sát khi thử `temperature`, so sánh chi phí GPT-4o với GPT-4o-mini cho workload được cho, và giải thích khi nào streaming hữu ích. Đây là reflection của bạn, không copy output của AI.\n\nChecklist cuối:\n\n- [ ] Tất cả `pytest tests/ -v` pass.\n- [ ] `solution/solution.py` và `solution/exercises.md` đã có nội dung của bạn.\n- [ ] `solution.zip` sẵn sàng đổi tên theo mã sinh viên nếu LMS yêu cầu.\n- [ ] Không có API key trong source, Git, log hoặc ảnh chụp màn hình.\n\nNgay bên dưới checklist này, hãy chọn rating và dán link bài đã nộp (GitHub, Drive hoặc trang xác nhận của LMS). Nút **Xác nhận đã nộp bài** mới đánh dấu Lab hoàn thành. AICodelab lưu link và rating bài nộp; không nhận file trực tiếp và không tự gửi bài sang LMS.\n\nKết quả mong đợi: bạn có một bài nộp đúng flow của repo, chạy được bằng test hiện hành và giải thích được từng khái niệm đã dùng."
      }
    ]
  },
  "day3-lab-chatbot-vs-react-agent": {
    "id": "day3-lab-chatbot-vs-react-agent",
    "title": "Lab 03 — Chatbot vs ReAct Agent",
    "duration": 240,
    "author": "VinUni AI Codelab × GDGoC",
    "updated": "2026-07-27",
    "category": "AI Agent",
    "description": "Xây dựng Chatbot baseline, thiết kế Tool Specs, lắp ReAct Agent Loop với Guardrails và đánh giá so sánh trên bộ 5 Test Cases thực tế .",
    "day": "3",
    "preparationTipIds": [
      "huong-dan-cai-vs-code-va-git",
      "vibe-coding-basics-quickstart-guide",
      "huong-dan-tai-bai-lab"
    ],
    "keywords": "$undefined",
    "version": "$undefined",
    "updatedSignificant": "$undefined",
    "learningPath": "$undefined",
    "sequence": "$undefined",
    "level": "intermediate",
    "prerequisites": [
      "Biết Python function, class, list/dict và exception",
      "Biết JSON và cách đọc lỗi parse",
      "Dùng được terminal, virtual environment và biến môi trường",
      "Chạy được script Python cơ bản"
    ],
    "requiredLessonIds": "$undefined",
    "outcomes": [
      "Giải thích sự khác biệt giữa Chatbot và ReAct Agent qua vòng lặp Thought–Action–Observation",
      "Thiết kế tool contract và khai báo trong src/tools.py",
      "Lắp ReAct loop với parser, executor và phanh an toàn Guardrails (MAX_ITERATIONS)",
      "Phân tích failed trace, tìm root cause và hoàn thiện Agent V2 có fallback lịch sự",
      "So sánh Chatbot và Agent trên bộ Test Cases trong config/test_cases.json và hoàn thiện báo cáo docs/trace_eval.md"
    ],
    "supportedOs": [
      "Windows",
      "macOS",
      "Linux"
    ],
    "requiredTools": [
      "Python 3.10+",
      "pip",
      "VS Code hoặc Editor bất kỳ",
      "Git"
    ],
    "commonErrors": [
      "Nhúng sẵn kết quả tool vào system prompt của chatbot baseline",
      "Để model tự bịa Observation thay vì application chèn kết quả tool thực tế",
      "Không có max_iterations khiến agent lặp vô hạn",
      "Commit API key hoặc PII vào repo"
    ],
    "requiresSubmission": true,
    "presentationUrl": "$undefined",
    "bookletUrl": "$undefined",
    "published": true,
    "format": "steps",
    "steps": [
      {
        "title": "1. Setup và hiểu kiến trúc",
        "content": ":::goal{title=\"Repo chạy, kiến trúc rõ\"}\nBạn có repo `Day-3-Lab-Chatbot-vs-react-agent-E402` trên máy, môi trường sẵn sàng, hiểu vai trò từng thành phần và phân vai nhóm 5-6 người.\n:::\n\n### Fork, clone, cài môi trường\n\nMở repo `Day-3-Lab-Chatbot-vs-react-agent-E402`, bấm **Fork** rồi clone về máy theo hướng dẫn.\n\nCài môi trường:\n\n```bash\ncd Day-3-Lab-Chatbot-vs-react-agent-E402\npython -m venv .venv\nsource .venv/bin/activate        # Windows PowerShell: .venv\\Scripts\\Activate.ps1\npython -m pip install --upgrade pip\npython -m pip install -r requirements.txt\ncp .env.example .env\n```\n\nSmoke test:\n\n```bash\npython src/app.py\n```\n\n### Kiến trúc — biết trước khi code\n\nMở `README.md` và `docs/PHAN_CONG_CONG_VIEC.md`. Đọc sơ đồ bên dưới — nhóm bạn sẽ xây từng phần:\n\n```mermaid\nflowchart LR\n    U[\"User query (config/test_cases.json)\"] --> C[\"Chatbot hoặc ReAct Agent (src/app.py)\"]\n    C --> P[\"LLM Provider / System Prompt (src/prompts.py)\"]\n    C --> X[\"Parse Action (Thought -> Action)\"]\n    X --> R[\"Tool Registry (src/tools.py)\"]\n    R --> T[\"Tool function (get_weather, search_flights...)\"]\n    T --> O[\"Observation (Kết quả thật)\"]\n    O --> C\n    C --> L[\"Telemetry / Trace Log (docs/trace_eval.md)\"]\n    P --> L\n    T --> L\n```\n\n| Thành phần               | Vai trò                                                             | File phụ trách                     |\n| :------------------------- | :------------------------------------------------------------------- | :----------------------------------- |\n| **Test Cases**       | Bộ đề câu hỏi từ đơn giản đến multi-step và bẫy         | `config/test_cases.json` (Role 1)  |\n| **Tool Registry**    | Khai báo các món đồ nghề (Tools) cho AI gọi                   | `src/tools.py` (Role 2)            |\n| **System Prompt**    | Ép AI suy luận dạng Thought ➔ Action & Guardrails                | `src/prompts.py` (Role 3)          |\n| **Agent Integrator** | Điều phối vòng lặp ReAct (`Thought -> Action -> Observation`) | `src/app.py` (Role 4 - Integrator) |\n| **Observability**    | Ghi log trace để debug và làm báo cáo so sánh                 | `docs/trace_eval.md` (Role 5)      |\n\n:::checkpoint{title=\"Hoàn thành khi\"}\n[ ] Terminal hiển thị `(.venv)`, gõ `python src/app.py` chạy thành công không báo lỗi.\n[ ] Bạn giải thích được vai trò Provider, Agent, Tool, Observation và Telemetry.\n[ ] Cả nhóm đã thống nhất phân vai 5-6 thành viên theo file `docs/PHAN_CONG_CONG_VIEC.md`.\n:::\n\n:::caution{title=\"Troubleshooting — Vấn đề thường gặp\"}\n`python` không tìm thấy / sai phiên bản\n→ **Mindset**: Tách \"Python nào đang chạy?\" khỏi \"Code đúng chưa?\" — xác minh interpreter trước.\n→ Thử `python3 --version` (cần ≥ 3.10).\n\nLỗi Font / Encoding tiếng Việt trên Windows Terminal\n→ Code trong `src/app.py` đã tự động reconfigure `sys.stdout` sang `utf-8`.\n\nModuleNotFoundError khi chạy `python src/app.py`\n→ Kiểm tra đã activate `.venv` chưa và đứng ở thư mục gốc repo chưa.\n:::\n\n---"
      },
      {
        "title": "2. Chatbot baseline — thấy giới hạn, rồi xây đường cơ sở",
        "content": ":::goal{title=\"Hiểu giới hạn chatbot và có baseline công bằng\"}\nNhận ra chatbot thuần không có grounding dữ liệu thời gian thực, rồi xây baseline một LLM call không dùng tool để làm đường cơ sở so sánh với Agent.\n:::\n\n### Hook — Chatbot biết gì thật?\n\nTưởng tượng hỏi Chatbot tư vấn đặt vé & thời tiết:\n\n> *\"Thời tiết ở Hà Nội hôm nay thế nào và tôi nên chọn chuyến bay nào đi Hà Nội ngày mai?\"*\n\nTự trả lời: Giá vé đến từ đâu? Thời tiết có chuẩn hôm nay không? Một câu trả lời nghe hợp lý có đồng nghĩa là **grounded** (có bằng chứng thực tế) không?\n\n| Thành phần                      |   Chatbot có trả lời?   | Có evidence thật từ Tool? | Có thực hiện Action? |\n| :-------------------------------- | :-------------------------: | :--------------------------: | :---------------------: |\n| **Thời tiết thực tế**   |  ❌ (Chỉ bịa/chém gió)  |              ❌              |           ❌           |\n| **Giá vé máy bay thực** | ❌ (Chỉ đưa con số ảo) |              ❌              |           ❌           |\n| **Tư vấn chung**          |             ✅             |              ❌              |           ❌           |\n\n→ Chatbot có thể bịa một câu trả lời nghe rất mượt nhưng không có evidence từ database/tool. Đây là lý do ta cần ReAct Agent + Tools.\n\n### Xây baseline trong `src/prompts.py` & `src/app.py`\n\nBaseline protocol:\n\n```text\nsystem prompt + user message → một LLM call → final response (không gọi Tool)\n```\n\nBaseline **KHÔNG** được: gọi tool, nhúng sẵn kết quả tool vào prompt, hoặc khẳng định action đã hoàn tất.\n\n**Bạn làm**:\n\n1. **Role 3**: Mở `src/prompts.py` — soạn `CHATBOT_BASELINE_PROMPT`.\n2. **Role 4**: Mở `src/app.py` — chạy hàm `run_baseline_chatbot()` trên 5 câu test trong `config/test_cases.json`.\n3. **Role 5**: Lưu phản hồi vào `docs/trace_eval.md` và phân loại output: *correct*, *safe fallback* hay *hallucinated*.\n\n:::caution{title=\"Đừng vội kết luận Agent luôn thắng\"}\nCâu hỏi của bài Lab: Khi nào chi phí orchestration của Agent đáng giá? Với câu hỏi Q&A lý thuyết đơn giản, Chatbot thuần vẫn nhanh và rẻ hơn Agent!\n:::\n\n:::checkpoint{title=\"Hoàn thành khi\"}\n[ ] Chatbot dùng đúng 1 LLM call, số lần gọi tool = 0.\n[ ] Raw answer đã được Role 5 lưu vào `docs/trace_eval.md` và phân loại output từng case.\n:::\n\n:::caution{title=\"Troubleshooting — Vấn đề thường gặp\"}\n\"Chatbot trả lời có vẻ đúng — nó đã có tool rồi à?\"\n→ **Mindset**: Đừng tin output mượt mà — hãy kiểm tra code path. Nếu `tool_calls = 0`, đó chỉ là hallucination (ảo giác của LLM), không phải bằng chứng thực tế.\n:::\n\n---"
      },
      {
        "title": "3. Thiết kế và test tool",
        "content": ":::goal{title=\"Tool chạy đúng, test pass — trước khi gắn Agent\"}\nViết các tool deterministic trong src/tools.py, có contract rõ ràng và xử lý error an toàn.\n:::\n\n### Tại sao test tool riêng trước?\n\nNếu gắn tool chưa test vào Agent rồi Agent chạy sai ➔ Bạn không biết lỗi nằm ở Tool hay nằm ở Agent. Test riêng tool trước giúp loại bỏ hoàn toàn một nguồn lỗi!\n\n### Tool contract — 8 câu hỏi chuẩn\n\n| Field                     | Câu hỏi chuẩn hóa                                                               |\n| :------------------------ | :---------------------------------------------------------------------------------- |\n| **Name**            | Tên duy nhất, rõ nghĩa? (Ví dụ:`get_weather`, `search_flights`)           |\n| **Purpose**         | Khi nào nên dùng, khi nào không?                                               |\n| **Input schema**    | Field nào required, type gì? (`location: str`, `origin: str`)                 |\n| **Output schema**   | Trả về gì khi thành công? (Chuỗi JSON hoặc string rõ thông số)            |\n| **Error semantics** | Khi nhập sai địa điểm thì trả về gì? (Trả chuỗi báo lỗi, không crash) |\n| **Side effect**     | Read-only tra cứu hay thay đổi trạng thái?                                     |\n| **Example**         | Input / Output hợp lệ mẫu?                                                       |\n| **Safety**          | Có bắt lỗi crash exception không?                                               |\n\n### Bạn làm (Role 2 - Tool Engineer):\n\n1. Mở file `src/tools.py` — implement các hàm tool (Ví dụ: `get_weather`, `search_flights` hoặc các tool theo chủ đề tự chọn).\n2. Thêm **Docstring / Schema** đầy đủ cho từng hàm.\n3. Bắt lỗi an toàn: Nếu địa điểm không tồn tại ➔ Trả về `\"LỖI: Không tìm thấy thông tin...\"` thay vì quăng lỗi crash chương trình.\n\n```python\n# Mẫu tool chuẩn trong src/tools.py\ndef get_weather(location: str) -> str:\n    \"\"\"Tra cứu thời tiết hiện tại của một thành phố.\"\"\"\n    loc_lower = location.lower()\n    if \"hà nội\" in loc_lower:\n        return \"Thời tiết Hà Nội: 28°C, Nắng nhẹ, Độ ẩm 65%.\"\n    return f\"LỖI: Không tìm thấy dữ liệu thời tiết cho địa điểm '{location}'.\"\n```\n\n:::checkpoint{title=\"Hoàn thành khi\"}\n[ ] Các tool trong `src/tools.py` chạy thử độc lập pass 100%, không crash khi nhập sai tham số.\n[ ] Mỗi tool có docstring mô tả input/output/error contract rõ ràng.\n[ ] Đã đăng ký danh sách tool vào dictionary `AVAILABLE_TOOLS`.\n:::\n\n:::caution{title=\"Troubleshooting — Vấn đề thường gặp\"}\n\"Tool quăng ngoại lệ Exception làm dừng chương trình\"\n→ **Mindset**: Error nghiệp vụ là dữ liệu cho Agent suy luận. Trả về chuỗi thông báo lỗi dạng JSON/String để Agent đọc và chuyển hướng, không cho code Python bị crash.\n:::\n\n---"
      },
      {
        "title": "4. Lắp ReAct Agent V1",
        "content": ":::goal{title=\"Agent V1 chạy đúng tool path, dừng đúng lúc\"}\nHiểu vòng lặp ReAct, lắp system prompt ➔ parser ➔ executor ➔ loop. Agent gọi đúng tool, append Observation, và dừng đúng phanh Guardrails.\n:::\n\n### Chuỗi Trace mẫu ReAct (`Thought -> Action -> Observation`)\n\n```text\nQuestion: Thời tiết Hà Nội hôm nay thế nào và có chuyến bay nào đi Hà Nội ngày mai không?\n\nThought: Cần kiểm tra thời tiết Hà Nội trước.\nAction: get_weather[\"Hà Nội\"]\nObservation: Thời tiết Hà Nội: 28°C, Nắng nhẹ, Độ ẩm 65%.\n\nThought: Tiếp theo cần tra cứu chuyến bay đi Hà Nội ngày mai.\nAction: search_flights[\"TP.HCM\", \"Hà Nội\"]\nObservation: Chuyến bay VN123 (08:00) - Giá: 1,500,000 VNĐ.\n\nThought: Tôi đã có đủ thông tin về thời tiết và chuyến bay.\nFinal Answer: Thời tiết Hà Nội hôm nay 28°C nắng nhẹ. Chuyến bay VN123 khởi hành lúc 08:00 với giá 1,500,000 VNĐ.\n```\n\n### State Machine của ReAct Agent Loop\n\n```mermaid\nstateDiagram-v2\n    [*] --> CallLLM\n    CallLLM --> ExecuteTool: Action hợp lệ\n    ExecuteTool --> AppendObservation\n    AppendObservation --> CallLLM\n    CallLLM --> AppendError: Parse hoặc Tool Error\n    AppendError --> CallLLM: Còn budget (step < MAX_ITERATIONS)\n    CallLLM --> Final: Final Answer hợp lệ\n    CallLLM --> SafeFallback: Đạt MAX_ITERATIONS\n    Final --> [*]\n    SafeFallback --> [*]\n```\n\n### 4 Nguyên tắc bất biến khi code ReAct Loop:\n\n1. **Không lặp vô hạn**: Bắt buộc có phanh `MAX_ITERATIONS`.\n2. **Mỗi Action ➔ Đúng 1 Observation**: Application chèn kết quả thật từ Tool, LLM không tự bịa Observation.\n3. **Observation quay lại Prompt**: Làm ngữ cảnh cho bước suy luận `Thought` tiếp theo.\n4. **Không khẳng định khi thiếu bằng chứng**: Phải gọi Tool lấy data rồi mới ra `Final Answer`.\n\n### Bạn làm (Role 3 & Role 4):\n\n1. **Role 3**: Soạn `REACT_SYSTEM_PROMPT` và cấu hình phanh Guardrails `MAX_ITERATIONS` trong `src/prompts.py`.\n2. **Role 4 (Integrator)**: Thực hiện `git pull` kéo file của Role 1, 2, 3 về ➔ Vibe Code ghép nối vòng lặp `run_react_agent()` trong `src/app.py`.\n3. **Role 5**: Chạy `python src/app.py` và dán chuỗi log trace vào `docs/trace_eval.md`.\n\n:::checkpoint{title=\"Hoàn thành khi\"}\n[ ] Agent chạy qua đúng chuỗi `Thought -> Action -> Observation`.\n[ ] Observation của bước trước xuất hiện trong prompt suy luận của bước sau.\n[ ] Phanh Guardrail `MAX_ITERATIONS` hoạt động ngắt lặp an toàn khi gặp câu bẫy.\n[ ] Đã lưu log trace vào `docs/trace_eval.md`.\n:::\n\n:::caution{title=\"Troubleshooting — Vấn đề thường gặp\"}\nAgent lặp đi lặp lại cùng một Tool + cùng tham số\n→ **Mindset**: Agent không tự nhận ra mình bị kẹt lặp.\n→ Kiểm tra: Đã đặt `MAX_ITERATIONS` chưa? Prompt có hướng dẫn nếu tool báo lỗi thì thử cách khác không?\n\nAgent trả Final Answer quá sớm — trước khi gọi Tool\n→ **Mindset**: Prompt chưa ép khung kỷ luật.\n→ Thêm quy tắc vào `REACT_SYSTEM_PROMPT`: \"Chỉ trả Final Answer khi đã có dữ liệu Observation từ Tool.\"\n:::\n\n---"
      },
      {
        "title": "5. Failed trace → Agent V2",
        "content": ":::goal{title=\"Sửa lỗi có bằng chứng, nâng cấp Agent V2\"}\nPhát hiện một failed trace (lỗi lặp vô hạn, gọi sai tên tool, nhập sai tham số), phân tích nguyên nhân gốc (Root Cause) và nâng cấp lên Agent V2.\n:::\n\n### Tạo lỗi có chủ đích & Phân tích RCA (Root Cause Analysis)\n\n| Dạng lỗi (Failure Mode) | Biểu hiện thực tế                                      | Cách Agent V2 khắc phục                                                                                        |\n| :------------------------ | :--------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------- |\n| **Unknown Tool**    | AI gọi tool`search_product` không có trong danh sách | Trả về thông báo lỗi dạng:`Tool không tồn tại, các tool hợp lệ gồm: [get_weather, search_flights]` |\n| **Malformed Args**  | AI truyền tham số sai cú pháp`get_weather['Hanoi'`   | Xử lý parser linh hoạt hoặc trả về gợi ý cú pháp đúng                                                 |\n| **Repeated Action** | Gọi liên tục 1 tool với cùng tham số                 | Phanh an toàn ngắt khi chạm ngưỡng`MAX_ITERATIONS`                                                         |\n\n### Bạn làm:\n\n1. **Role 1 & Role 5**: Cố tình đặt 1 câu hỏi bẫy (Edge Case) trong `config/test_cases.json` để ép Agent bộc lộ lỗi.\n2. **Role 3 & Role 4**: Nâng cấp System Prompt & Parser trong `src/prompts.py` và `src/app.py` thành phiên bản **Agent V2** có khả năng tự phục hồi (Recovery) và Safe Fallback.\n3. **Role 5**: Ghi lại so sánh Before/After vào `docs/trace_eval.md`.\n\n:::checkpoint{title=\"Hoàn thành khi\"}\n[ ] Có ít nhất 1 Failed Trace được phân tích nguyên nhân gốc trong `docs/trace_eval.md`.\n[ ] Agent V2 không bị crash khi gặp câu bẫy, trả về câu thông báo lịch sự khi chạm giới hạn.\n:::\n\n---"
      },
      {
        "title": "6. Evaluation, report và nộp bài",
        "content": ":::goal{title=\"So sánh công bằng, nộp bài sạch sẽ lên GitHub\"}\nChạy bộ Test Cases trên cả Chatbot Baseline và ReAct Agent, hoàn thiện báo cáo docs/trace_eval.md và push code sạch lên GitHub.\n:::\n\n### Bộ 5 Test Cases gợi ý (`config/test_cases.json`)\n\n|      #      | Loại câu hỏi                   | Mục đích kiểm tra                     | Kỳ vọng ở Agent                                          |\n| :---------: | :-------------------------------- | :---------------------------------------- | :---------------------------------------------------------- |\n| **1** | 🟢 Đơn giản (Chỉ lý thuyết) | Hỏi đáp thông thường                | Trả lời ngay, Chatbot có thể nhanh hơn                 |\n| **2** | 🟢 Đơn giản (Chỉ lý thuyết) | Hỏi đáp quy định/chính sách        | Trả lời ngay, không cần gọi tool                       |\n| **3** | 🟡 Multi-step (Cần Tool)         | Đòi hỏi dữ liệu thời gian thực     | Gọi đúng 1 Tool ➔ Trả lời có bằng chứng            |\n| **4** | 🟡 Multi-step (Cần 2 Tools)      | Phụ thuộc nhiều bước                 | Gọi Tool 1 ➔ Gọi Tool 2 ➔ Tổng hợp kết quả          |\n| **5** | 🔴 Edge Case (Câu bẫy)          | Nhập sai địa điểm / tham số vô lý | Tool báo lỗi ➔ Agent ngắt lặp an toàn bằng Guardrail |\n\n### Rubric đánh giá 0–2 điểm mỗi case\n\n| Tiêu chí                    | 0 điểm                | 1 điểm                  | 2 điểm                              |\n| :---------------------------- | :---------------------- | :------------------------ | :------------------------------------ |\n| **Factual correctness** | Sai / Bịa đặt        | Đúng một phần         | Đúng hoàn toàn                    |\n| **Grounding**           | Không có bằng chứng | Bằng chứng thiếu       | Trích dẫn Observation rõ ràng     |\n| **Tool selection**      | Gọi sai / Không gọi  | Có tự sửa lỗi         | Gọi đúng thứ tự tool path        |\n| **Termination**         | Lặp vô hạn / Crash   | Dừng nhưng thừa bước | Dừng đúng lúc (Final / Guardrail) |\n\n### Kiểm tra Bảo mật & Nộp bài (Security Check & Submission)\n\n1. **Kiểm tra `.gitignore`**: Đảm bảo `.env`, `__pycache__/` không bị đẩy lên Git.\n2. **Đẩy code lên GitHub**:\n   ```bash\n   git add .\n   git commit -m \"Hoan thanh Lab 03: Chatbot vs ReAct Agent E402\"\n   git push origin main\n   ```\n3. **Nộp link Repository**: Gửi link repo GitHub cho Giảng viên/Coach kiểm tra.\n\n---\n\n### 📋 CHECKLIST ARTIFACTS BẮT BUỘC KHI NỘP BÀI\n\n- [X] 📘 `README.md` — Tổng quan kiến trúc & Rubric chấm điểm.\n- [X] 📋 `docs/PHAN_CONG_CONG_VIEC.md` — Sổ tay phân công 5 Roles & Checklist theo mốc.\n- [X] 💡 `docs/DANH_SACH_DE_TAI.md` — Danh sách 10 chủ đề gợi ý.\n- [X] 📊 `docs/trace_eval.md` — Báo cáo Log Trace & Bảng đánh giá Scoring Matrix.\n- [X] 🟢 `config/test_cases.json` — Bộ đề Test Cases.\n- [X] 🛠️ `src/tools.py` — Khai báo các công cụ (Role 2).\n- [X] 🧠 `src/prompts.py` — System Prompt ReAct & Guardrails (Role 3).\n- [X] 🚀 `src/app.py` — Core App ghép nối vòng lặp ReAct (Role 4).\n\n---\n\n> 🎯 **Thông điệp cuối cùng**: Đừng chỉ đánh giá Agent bằng câu trả lời cuối cùng. Hãy đánh giá toàn bộ hành trình — từ Tool contract, Action, Observation, cơ chế tự phục hồi lỗi, phanh an toàn Guardrail đến nhật ký Trace Log định lượng!"
      }
    ]
  },
  "day05-06-ai-thuc-chien-venture-arena": {
    "id": "day05-06-ai-thuc-chien-venture-arena",
    "title": "Lab 05–06 — AI Thực Chiến: Venture Arena",
    "duration": 900,
    "author": "AI Thực Chiến",
    "updated": "2026-07-30",
    "category": "AI Product Hackathon",
    "description": "Hướng dẫn từng bước để team xây, kiểm chứng, pitch và đầu tư trong Venture Arena.",
    "day": "05–06",
    "preparationTipIds": "$undefined",
    "keywords": "$undefined",
    "version": "1",
    "updatedSignificant": "$undefined",
    "learningPath": "$undefined",
    "sequence": "$undefined",
    "level": "intermediate",
    "prerequisites": [
      "Đã hoàn thành các Lab AI Thực Chiến trước đó",
      "Có thể truy cập repository đề bài đúng khóa"
    ],
    "requiredLessonIds": "$undefined",
    "outcomes": [
      "Chứng minh một pain point bằng dữ liệu",
      "Hoàn thiện prototype AI có thể demo",
      "Pitch và đầu tư có căn cứ"
    ],
    "supportedOs": [
      "Windows",
      "macOS"
    ],
    "requiredTools": [
      "GitHub",
      "Trình duyệt",
      "Công cụ AI phù hợp với giải pháp"
    ],
    "commonErrors": [
      "Chọn sai repository của khóa",
      "Dùng dữ liệu định danh hoặc commit data pack",
      "Nộp checkpoint muộn"
    ],
    "requiresSubmission": "$undefined",
    "presentationUrl": "$undefined",
    "bookletUrl": "$undefined",
    "published": true,
    "format": "steps",
    "steps": [
      {
        "title": "1. Chọn chiến tuyến và hiểu cách thắng",
        "content": "Bạn không cần làm sản phẩm lớn nhất. Bạn cần tìm một vấn đề đủ thật, chứng minh nó bằng dữ liệu và đưa ra một lát cắt AI đáng để thử.\n\nChọn một trong ba chiến tuyến:\n\n1. **Cải tiến VLearn AI Tutor:** tối ưu tutor hiện có hoặc đề xuất một năng lực AI mới.\n2. **Trợ lý học viên trên Discord:** giúp cộng đồng tìm đúng tri thức, đúng người hoặc đúng hỗ trợ vào đúng lúc.\n3. **Hướng mở:** tự tìm một pain point đáng giải từ dữ liệu được phép khai thác.\n\n:::goal{title=\"Mục tiêu của team\"}\nChốt một pain point cụ thể: ai gặp vấn đề, ở khoảnh khắc nào và hậu quả là gì.\n:::\n\n**Kết quả mong đợi:** cả team có thể nói rõ trong một câu: “Chúng tôi giúp _ai_ làm _việc gì_ tốt hơn khi _điểm đau nào_ xảy ra.”"
      },
      {
        "title": "2. Lập team và mở đúng đề bài",
        "content": "Mỗi team thường có **3–5 thành viên**. Hãy phân công tối thiểu một người chịu trách nhiệm theo dõi repository và checkpoint; tất cả thành viên vẫn phải hiểu được phần team nộp.\n\n1. Hoàn thiện [Form lập đội](https://forms.gle/YQyndjYtPKfw1aaGA).\n2. Chọn đúng repository đề bài của khóa bạn đang học:\n   - [Khóa 3 — Batch03-K3-AI-Product-Hackathon](https://github.com/VinUni-AI20k/Batch03-K3-AI-Product-Hackathon)\n   - [Khóa 4 — Batch03-K4-AI-Product-Hackathon](https://github.com/VinUni-AI20k/Batch03-K4-AI-Product-Hackathon)\n3. Đọc `README.md`, `01-de-bai.md`, `04-rubric.md` và cấu trúc artifact trước khi bắt đầu build.\n\n:::caution{title=\"Chọn đúng khóa\"}\nKhông dùng repository của khóa khác. Rubric, lịch checkpoint và cách nộp được áp dụng theo repository của đúng khóa bạn đang học.\n:::\n\n**Kết quả mong đợi:** team có một repository chung và biết rõ artifact nào cần xuất hiện trong đó."
      },
      {
        "title": "3. Khai thác dữ liệu và chốt Problem Canvas",
        "content": "Bắt đầu từ bằng chứng, không bắt đầu từ tên tính năng.\n\n1. Đọc data dictionary trước khi mining chatlog AI Tutor hoặc transcript bài giảng.\n2. Viết tối thiểu một pain point với actor, hành vi, trở ngại và hậu quả rõ ràng.\n3. Dùng một trong hai con đường bằng chứng: khảo sát tối thiểu 20 người ngoài team với ít nhất 50% xác nhận, **hoặc** mining có số đếm, ít nhất 5 ví dụ và cách kiểm lại được.\n4. So sánh ít nhất ba cơ hội impact trước khi chọn một cơ hội để đi tiếp.\n\n:::caution{title=\"Dữ liệu là đặc quyền\"}\nChỉ dùng data pack của hackathon hoặc dữ liệu giả tự sinh. Không đưa data pack lên repository, không công khai raw chat và không cố suy ngược danh tính từ dữ liệu đã ẩn danh.\n:::\n\n:::checkpoint{title=\"Sẵn sàng cho CP1\"}\n- Pain point có actor, thời điểm và hậu quả.\n- Có evidence log hoặc kế hoạch khảo sát kiểm lại được.\n- Team đã chốt candidate đi tiếp.\n:::"
      },
      {
        "title": "4. Thiết kế lát cắt và làm AI chạy thật",
        "content": "Một sản phẩm đáng demo không cần bao phủ cả thế giới. Nó cần giải quyết trọn vẹn một khoảnh khắc giá trị.\n\n1. Viết lát cắt theo mẫu: **một người dùng · một công việc · một quyết định AI · một kết quả**.\n2. Xác định phần nào là Sketch, Mock hoặc Working; ghi rõ mọi phần mock.\n3. Prototype ở bất kỳ mức nào cũng cần có **ít nhất một lời gọi AI chạy thật**.\n4. Xác định ít nhất ba chỗ khó hoặc kịch bản rủi ro, cùng cách team xử lý/fallback.\n5. Chuẩn bị flow mà người xem có thể bấm hoặc quan sát được ở CP2 và CP3.\n\n**Kết quả mong đợi:** bạn demo được một hành trình hẹp trong khoảng 5 phút và giải thích được vì sao AI xuất hiện ở đúng điểm đó."
      },
      {
        "title": "5. Kiểm thử, validation và hoàn thiện artifact",
        "content": "Đừng đợi đến Demo mới tìm bằng chứng sản phẩm có giá trị.\n\n1. Tạo `eval/` với golden set và kết quả các lượt chạy; nêu quality bar của team.\n2. Lưu feedback thực tế trong `validation/`; có ít nhất 3 người thật ngoài team đồng ý thử prototype trước Demo.\n3. Hoàn thiện `spec.md`, `codebase/`, `eval/`, `validation/`, `demo-slides.pdf` và `reflection/` theo repository đề bài.\n4. Nộp `spec.md` trước hạn cứng **23:59 ngày 1**.\n\n### Điểm học thuật\n\nTổng điểm là **100 = 25 điểm nộp checkpoint + 75 điểm chấm artifact trong repository**.\n\n- CP1–CP5: mỗi checkpoint 5 điểm; nộp đúng hạn được 5 điểm, nộp muộn nhận 0 điểm tại mốc đó.\n- Mỗi thành viên nộp riêng, nhưng cả team dùng chung một link repository.\n- 75 điểm artifact: R1 Bằng chứng & impact 15; R2 Lát cắt & thiết kế 15; R3 Chỗ khó & kịch bản rủi ro 11; R4 Kiểm thử 15; R5 Prototype 8; R6 Validation 8; R7 Quy trình & repo 3."
      },
      {
        "title": "6. Pitch như Startup, đầu tư như Investor",
        "content": "Venture Arena mô phỏng một thị trường: giá trị tốt cần được nhìn thấy và hiểu đúng.\n\n1. Khi đến lượt Startup, pitch khoảng 5 phút theo điều phối của Labcoach: pain point, bằng chứng, lát cắt giải pháp, demo, validation và lời mời đầu tư.\n2. Khi đến lượt Investor, xem kỹ các team khác và dùng tối đa **100 điểm đầu tư giả lập**.\n3. Không đầu tư cho chính team mình; team có thể dồn điểm cho một Startup hoặc phân bổ theo chiến lược.\n4. Mỗi khoản đầu tư bắt buộc có một lý do ngắn, cụ thể dựa trên pain point, evidence, khả năng triển khai, tác động hoặc chất lượng pitch.\n\n:::decision{title=\"Đầu tư có căn cứ\"}\n| Câu hỏi trước khi đầu tư | Dấu hiệu tốt |\n| --- | --- |\n| Pain có thật không? | Có evidence kiểm lại được. |\n| AI có cần thiết không? | AI tạo một quyết định hoặc trải nghiệm rõ hơn cách làm thông thường. |\n| Team có thể đi tiếp không? | Demo, risk và validation cho thấy hướng triển khai khả thi. |\n:::\n\n**Kết quả mong đợi:** phiếu đầu tư hợp lệ, không vượt 100 điểm và có lý do cho từng khoản."
      },
      {
        "title": "7. Demo, vinh danh và bàn giao",
        "content": "Top 3 Startup là ba team nhận tổng điểm đầu tư cao nhất. Với mỗi Startup Top 3, team đầu tư nhiều điểm nhất vào startup đó được vinh danh là **Investor đồng hành**. Cả Top 3 Startup và ba Investor đồng hành đều có phần thưởng.\n\nNếu hòa điểm đầu tư, ban tổ chức dùng tổng điểm checkpoint/jury đã công bố để phân hạng. Điểm đầu tư không thay thế điểm học thuật.\n\nTrước CP6, kiểm tra lần cuối:\n\n- [ ] Repository không chứa API key hoặc data pack.\n- [ ] Demo chạy được và team có phương án fallback.\n- [ ] `spec.md`, eval, validation và reflection khớp với những gì team pitch.\n- [ ] Mỗi thành viên hiểu phần team đã làm.\n- [ ] Pitch giải thích được vì sao sản phẩm cần tồn tại, không chỉ sản phẩm trông như thế nào.\n\n> **Đừng pitch để được vỗ tay. Hãy pitch để được đặt cược.**"
      }
    ]
  }
};