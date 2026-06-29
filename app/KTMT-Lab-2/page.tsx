"use client";

import React, { useState } from "react";

const questionsData = [
  // --- PHẦN 1: TRẮC NGHIỆM MỘT ĐÁP ÁN (20 câu) ---
  {
    id: 1, type: "single",
    question: "Đoạn code `li t0, 0x12345678` sẽ được RARS biên dịch thành các lệnh cơ bản nào?",
    options: ["lui và addi", "lui và ori", "Chỉ một lệnh addi", "auipc và jalr"],
    answer: 0
  },
  {
    id: 2, type: "single",
    question: "Trong RISC-V Calling Convention, thanh ghi nào phải được khôi phục lại giá trị cũ (callee-saved) trước khi thoát khỏi chương trình con?",
    options: ["t0 - t6", "a0 - a7", "s0 - s11", "ra"],
    answer: 2
  },
  {
    id: 3, type: "single",
    question: "Lệnh `jalr x0, 0(ra)` có tác dụng gì?",
    options: ["Nhảy đến địa chỉ trong thanh ghi x0", "Gọi một chương trình con tại địa chỉ ra", "Trở về từ một chương trình con (tương đương ret)", "Lưu địa chỉ hiện tại vào x0"],
    answer: 2
  },
  {
    id: 4, type: "single",
    question: "Để nhân giá trị thanh ghi t0 với 9 mà không dùng lệnh `mul`, ta có thể dùng chuỗi lệnh nào tối ưu nhất?",
    options: ["sll t1, t0, 3; add t0, t1, t0", "sll t1, t0, 4; sub t0, t1, t0", "addi t1, t0, 9", "slli t1, t0, 3; add t0, t0, t0"],
    answer: 0
  },
  {
    id: 5, type: "single",
    question: "Khi khởi tạo Stack Frame cho một hàm có sử dụng 4 biến cục bộ (kiểu word) và cần lưu thanh ghi ra, sp cần được trừ đi ít nhất bao nhiêu byte?",
    options: ["16 bytes", "20 bytes", "24 bytes", "32 bytes"],
    answer: 1
  },
  {
    id: 6, type: "single",
    question: "Trên ESP32-C3, để cấu hình GPIO 5 làm đầu ra (Output), ta cần ghi giá trị 1 vào bit số 5 của thanh ghi nào?",
    options: ["GPIO_OUT_REG", "GPIO_IN_REG", "GPIO_ENABLE_REG", "GPIO_STATUS_REG"],
    answer: 2
  },
  {
    id: 7, type: "single",
    question: "Lệnh `lb t0, 0(a0)` tải 1 byte từ bộ nhớ vào t0. Nếu byte đó là 0xFE, giá trị trong t0 (32-bit) sẽ là:",
    options: ["0x000000FE", "0xFFFFFFFE", "0x0000FE00", "Lỗi biên dịch"],
    answer: 1
  },
  {
    id: 8, type: "single",
    question: "Lệnh `lbu t0, 0(a0)` tải 1 byte từ bộ nhớ vào t0. Nếu byte đó là 0xFE, giá trị trong t0 (32-bit) sẽ là:",
    options: ["0x000000FE", "0xFFFFFFFE", "0x0000FE00", "0xFE000000"],
    answer: 0
  },
  {
    id: 9, type: "single",
    question: "Để kiểm tra xem số nguyên trong thanh ghi a0 là chẵn hay lẻ, ta dùng lệnh bitwise nào là hiệu quả nhất?",
    options: ["andi t0, a0, 1", "ori t0, a0, 1", "srai t0, a0, 1", "xori t0, a0, 1"],
    answer: 0
  },
  {
    id: 10, type: "single",
    question: "Chỉ thị `.align 2` trong RARS có ý nghĩa gì?",
    options: ["Căn lề dữ liệu tiếp theo ở địa chỉ chia hết cho 2", "Căn lề dữ liệu tiếp theo ở địa chỉ chia hết cho 4 (2^2)", "Dành ra 2 byte nhớ trống", "Khởi tạo mảng có 2 phần tử"],
    answer: 1
  },
  {
    id: 11, type: "single",
    question: "Khi ngắt (interrupt) xảy ra ở chế độ User (RV32), địa chỉ lệnh đang thực thi dở dang được lưu tự động vào thanh ghi CSR nào?",
    options: ["ustatus", "utvec", "uepc", "ucause"],
    answer: 2
  },
  {
    id: 12, type: "single",
    question: "Đoạn mã: `addi t0, x0, -1; srli t1, t0, 1` sẽ cho kết quả trong t1 là bao nhiêu (viết dưới dạng Hex)?",
    options: ["0xFFFFFFFF", "0x7FFFFFFF", "0x80000000", "0x00000000"],
    answer: 1
  },
  {
    id: 13, type: "single",
    question: "Một bộ nhớ Cache Direct Mapped có 64 blocks, mỗi block 16 bytes. Địa chỉ bộ nhớ 32-bit. Trường Index có bao nhiêu bit?",
    options: ["4 bits", "6 bits", "10 bits", "22 bits"],
    answer: 1
  },
  {
    id: 14, type: "single",
    question: "Thanh ghi `a0` thường được dùng để làm gì trong RISC-V calling convention?",
    options: ["Lưu địa chỉ quay về của hàm", "Truyền tham số thứ nhất và lưu giá trị trả về", "Lưu con trỏ ngăn xếp", "Lưu trữ dữ liệu tạm thời không cần khôi phục"],
    answer: 1
  },
  {
    id: 15, type: "single",
    question: "Phát biểu nào ĐÚNG về bộ nhớ Memory-Mapped I/O (MMIO)?",
    options: ["Các thiết bị ngoại vi có tập lệnh I/O riêng biệt với CPU", "Các thanh ghi thiết bị được ánh xạ vào cùng không gian địa chỉ với bộ nhớ chính", "Chỉ có thể truy cập qua lệnh ecall", "Tốc độ luôn luôn nhanh hơn Cache"],
    answer: 1
  },
  {
    id: 16, type: "single",
    question: "Đoạn code: `la t0, array; lw t1, 4(t0)` sẽ load phần tử thứ mấy của mảng word `array` vào `t1`?",
    options: ["Phần tử thứ 0", "Phần tử thứ 1", "Phần tử thứ 2", "Phần tử thứ 4"],
    answer: 1
  },
  {
    id: 17, type: "single",
    question: "Lệnh `bge t0, t1, loop` sẽ nhảy tới `loop` khi nào? (t0, t1 là số có dấu)",
    options: ["t0 > t1", "t0 < t1", "t0 >= t1", "t0 != t1"],
    answer: 2
  },
  {
    id: 18, type: "single",
    question: "Trong mạch Bitmap Display trên RARS, nếu Base address là 0x10010000, pixel ở tọa độ (x=1, y=0) định dạng 1 word/pixel nằm ở địa chỉ nào?",
    options: ["0x10010000", "0x10010001", "0x10010004", "0x10010010"],
    answer: 2
  },
  {
    id: 19, type: "single",
    question: "Thanh ghi ngoại vi `GPIO_OUT_W1TS_REG` trên ESP32-C3 có tác dụng gì khi ta ghi bit 1 vào đó?",
    options: ["Bật (Set) chân GPIO lên mức CAO (1)", "Xóa (Clear) chân GPIO về mức THẤP (0)", "Đảo trạng thái (Toggle) chân GPIO", "Thiết lập GPIO thành đầu ra"],
    answer: 0
  },
  {
    id: 20, type: "single",
    question: "Kỹ thuật `Polling` khác `Interrupt` ở điểm cơ bản nào?",
    options: ["Polling phản hồi nhanh hơn Interrupt trong mọi trường hợp", "Polling yêu cầu phần cứng phức tạp hơn", "Polling bắt CPU liên tục kiểm tra trạng thái, Interrupt cho phép CPU làm việc khác", "Interrupt không tiêu tốn chu kỳ máy của CPU"],
    answer: 2
  },

  // --- PHẦN 2: CHỌN NHIỀU ĐÁP ÁN ĐÚNG (10 câu) ---
  {
    id: 21, type: "multiple",
    question: "(Chọn NHIỀU đáp án) Những lệnh nào sau đây thuộc định dạng I-Type trong RISC-V?",
    options: ["addi", "lw", "sw", "jalr"],
    answer: [0, 1, 3] 
  },
  {
    id: 22, type: "multiple",
    question: "(Chọn NHIỀU đáp án) Những thanh ghi nào sau đây là 'Caller-saved'?",
    options: ["t0", "t5", "s2", "a0"],
    answer: [0, 1, 3] 
  },
  {
    id: 23, type: "multiple",
    question: "(Chọn NHIỀU đáp án) Để xóa bit số 4 của t0 về 0 mà không đổi các bit khác, ta dùng lệnh nào?",
    options: [
      "andi t0, t0, -17", 
      "li t1, 16; not t1, t1; and t0, t0, t1", 
      "ori t0, t0, 0", 
      "xori t0, t0, 16"
    ],
    answer: [0, 1] 
  },
  {
    id: 24, type: "multiple",
    question: "(Chọn NHIỀU đáp án) Trong ngắt mức User (RV32), các thanh ghi CSR nào được sử dụng?",
    options: ["utvec", "mepc", "ustatus", "ucause"],
    answer: [0, 2, 3] 
  },
  {
    id: 25, type: "multiple",
    question: "(Chọn NHIỀU đáp án) Những lệnh nào dùng để rẽ nhánh có điều kiện trong RISC-V?",
    options: ["bne", "jal", "bltu", "bgez"],
    answer: [0, 2, 3] 
  },
  {
    id: 26, type: "multiple",
    question: "(Chọn NHIỀU đáp án) Trong ESP32-C3, để đọc tín hiệu nút nhấn nối GND ổn định, cần cấu hình gì cho GPIO?",
    options: ["Kích hoạt Input (GPIO_IN_REG)", "Kích hoạt Pull-up resistor nội bộ", "Kích hoạt Output", "Ghi mức CAO ra GPIO_OUT_REG"],
    answer: [0, 1]
  },
  {
    id: 27, type: "multiple",
    question: "(Chọn NHIỀU đáp án) Các giả lệnh nào sau đây có thể biên dịch thành nhiều hơn 1 lệnh mã máy?",
    options: ["li", "la", "nop", "mv"],
    answer: [0, 1]
  },
  {
    id: 28, type: "multiple",
    question: "(Chọn NHIỀU đáp án) Phát biểu nào ĐÚNG về bộ nhớ Cache?",
    options: [
      "Cache Miss xảy ra khi CPU không tìm thấy dữ liệu trong Cache.",
      "Tăng Block size luôn làm giảm Miss rate vô điều kiện.",
      "Lệnh `sw` có thể dùng Write-Through hoặc Write-Back.",
      "SRAM (Cache) chậm hơn DRAM (Main Memory)."
    ],
    answer: [0, 2]
  },
  {
    id: 29, type: "multiple",
    question: "(Chọn NHIỀU đáp án) Lệnh dịch bit nào trong RISC-V giữ nguyên dấu của số nguyên?",
    options: ["slli", "srai", "srli", "sra"],
    answer: [1, 3] 
  },
  {
    id: 30, type: "multiple",
    question: "(Chọn NHIỀU đáp án) Để in chuỗi ra RARS console bằng `ecall`, cần điều kiện gì?",
    options: [
      "Gán giá trị 4 vào a7",
      "Gán giá trị 1 vào a7",
      "Chuỗi kết thúc bằng byte NULL (0x00)",
      "Truyền địa chỉ bắt đầu của chuỗi vào a0"
    ],
    answer: [0, 2, 3]
  },
  {
    id: 31,
    type: "short-answer",
    question: "Viết đoạn mã RISC-V để gán giá trị 25 vào thanh ghi t0 và 17 vào thanh ghi t1, sau đó tính tổng và lưu vào thanh ghi s0.",
    answer: [
      "addi t0, zero, 25",
      "addi t1, zero, 17",
      "add s0, t0, t1"
    ]
  },

  {
    id: 32,
    type: "fix-code",
    question: "Đoạn chương trình sau có lỗi gì? Hãy sửa lại.",
    code: `.data
msg: .word "Hello"
.text
li a7, 4
la a0, msg
ecall`,
    answer: [
      "Không thể khai báo chuỗi bằng .word.",
      "Phải dùng .asciz để tạo chuỗi kết thúc bằng NULL.",
      "Sửa thành:",
      ".data",
      'msg: .asciz "Hello"',
      ".text",
      "li a7, 4",
      "la a0, msg",
      "ecall"
    ]
  },

  {
    id: 33,
    type: "fix-code",
    question: "Đoạn mã sau nhằm đọc giá trị biến X nhưng kết quả sai. Lỗi ở đâu?",
    code: `.data
X: .word 10
.text
lw t0, X`,
    answer: [
      "lw không nhận trực tiếp tên nhãn.",
      "Cần lấy địa chỉ trước bằng la.",
      "Sửa:",
      "la t1, X",
      "lw t0, 0(t1)"
    ]
  },

  {
    id: 34,
    type: "short-answer",
    question: "Viết đoạn mã lưu giá trị thanh ghi s0 vào biến RESULT trong vùng nhớ.",
    answer: [
      ".data",
      "RESULT: .word 0",
      ".text",
      "la t0, RESULT",
      "sw s0, 0(t0)"
    ]
  },

  {
    id: 35,
    type: "fix-code",
    question: "Đoạn chương trình sau không in được số nguyên. Hãy tìm lỗi và sửa.",
    code: `li a7, 4
li a0, 100
ecall`,
    answer: [
      "Dịch vụ 4 là in chuỗi.",
      "Muốn in số nguyên phải dùng ecall 1.",
      "Sửa:",
      "li a7, 1",
      "li a0, 100",
      "ecall"
    ]
  },

  {
    id: 36,
    type: "short-answer",
    question: "Viết đoạn mã thực hiện câu lệnh if (t0 == t1) goto equal;",
    answer: [
      "beq t0, t1, equal"
    ]
  },

  {
    id: 37,
    type: "fix-code",
    question: "Đoạn chương trình sau muốn cộng hai biến X và Y rồi lưu vào Z nhưng có lỗi. Hãy sửa.",
    code: `.data
X: .word 3
Y: .word 5
Z: .word 0
.text
lw t0, X
lw t1, Y
add t2, t0, t1
sw t2, Z`,
    answer: [
      "lw/sw phải truy cập thông qua địa chỉ.",
      "Sửa:",
      "la s0, X",
      "lw t0, 0(s0)",
      "la s1, Y",
      "lw t1, 0(s1)",
      "add t2, t0, t1",
      "la s2, Z",
      "sw t2, 0(s2)"
    ]
  },

  {
    id: 38,
    type: "short-answer",
    question: "Viết đoạn mã sử dụng ecall để nhập một số nguyên từ bàn phím và lưu kết quả vào thanh ghi s0.",
    answer: [
      "li a7, 5",
      "ecall",
      "mv s0, a0"
    ]
  },

  {
    id: 39,
    type: "fix-code",
    question: "Đoạn mã sau có thể gây lỗi biên dịch. Hãy giải thích và sửa.",
    code: `addi s0, zero, 0x20232024`,
    answer: [
      "addi chỉ hỗ trợ immediate 12-bit.",
      "Phải dùng lui + addi hoặc giả lệnh li.",
      "Ví dụ:",
      "li s0, 0x20232024"
    ]
  },

  {
    id: 40,
    type: "short-answer",
    question: "Viết đoạn mã duyệt mảng số nguyên A, đọc phần tử đầu tiên vào thanh ghi t0.",
    answer: [
      ".data",
      "A: .word 5, 8, 9",
      ".text",
      "la t1, A",
      "lw t0, 0(t1)"
    ]
  }
];

export default function ExamPage() {
  const [answers, setAnswers] = useState<{ [key: number]: number | number[] | string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleOptionChange = (questionIndex: number, optionIndex: number) => {
    if (isSubmitted) return;
    const question = questionsData[questionIndex];

    if (question.type === "single") {
      setAnswers({
        ...answers,
        [questionIndex]: optionIndex,
      });
    } else if (question.type === "multiple") {
      const currentAnswers = (answers[questionIndex] || []) as number[];
      let newAnswers: number[];

      if (currentAnswers.includes(optionIndex)) {
        newAnswers = currentAnswers.filter((item) => item !== optionIndex);
      } else {
        newAnswers = [...currentAnswers, optionIndex].sort((a, b) => a - b);
      }

      setAnswers({
        ...answers,
        [questionIndex]: newAnswers,
      });
    }
  };

  const handleSubmit = () => {
    let currentScore = 0;
    questionsData.forEach((q, qIndex) => {
      if (q.type === "single") {
        if (answers[qIndex] === q.answer) {
          currentScore += 1;
        }
      } else if (q.type === "multiple") {
        const userAnswers = (answers[qIndex] || []) as number[];
        const correctAnswers = (q.answer || []) as number[];

        // Sort both arrays to ensure correct comparison
        userAnswers.sort((a, b) => a - b);
        correctAnswers.sort((a, b) => a - b);

        if (
          userAnswers.length === correctAnswers.length &&
          userAnswers.every((val, i) => val === correctAnswers[i])
        ) {
          currentScore += 1;
        }
      } else if (q.type === "short-answer" || q.type === "fix-code") {
        const userAnswer = ((answers[qIndex] as string) || "").trim().toLowerCase();
        const correctAnswer = (q.answer as string[]).join("\n").trim().toLowerCase();

        if (userAnswer === correctAnswer) {
          currentScore += 1;
        }
      }
    });
    setScore(currentScore);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 text-center border-t-4 border-blue-600">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Đề Thi Trắc Nghiệm: Thực Hành Kiến Trúc Máy Tính
          </h1>
          <p className="text-gray-600">Tổng số câu: {questionsData.length} câu</p>
          <p className="text-sm text-gray-500 mt-2">Dành cho sinh viên HUST - Môn IT3280</p>
        </div>

        {/* Results Banner */}
        {isSubmitted && (
          <div className={`rounded-lg shadow-md p-6 mb-8 text-center ${score >= 20 ? 'bg-green-50 border-t-4 border-green-500' : 'bg-red-50 border-t-4 border-red-500'}`}>
            <h2 className={`text-2xl font-bold ${score >= 20 ? 'text-green-700' : 'text-red-700'}`}>
              Kết Quả Làm Bài
            </h2>
            <p className="text-lg mt-2 font-semibold">
              Điểm của bạn: {score} / {questionsData.length}
            </p>
            <p className="text-md text-gray-700 mt-1">
              ({Math.round((score / questionsData.length) * 10)} điểm hệ 10)
            </p>
          </div>
        )}

        {/* Questions List */}
        <div className="space-y-6">
          {questionsData.map((q, qIndex) => {
            let isCorrect = false;
            let isUnanswered = true;
            const options = q.options ?? [];

            if (q.type === "single") {
              isCorrect = (answers[qIndex] as number) === (q.answer as number);
              isUnanswered = answers[qIndex] === undefined;
            } else if (q.type === "multiple") {
              const userAnswers = (answers[qIndex] || []) as number[];
              const correctAnswers = (q.answer || []) as number[];
              userAnswers.sort((a, b) => a - b);
              correctAnswers.sort((a, b) => a - b);
              isCorrect = userAnswers.length === correctAnswers.length && userAnswers.every((val, i) => val === correctAnswers[i]);
              isUnanswered = userAnswers.length === 0;
            } else if (q.type === "short-answer" || q.type === "fix-code") {
              const userAnswer = ((answers[qIndex] as string) || "").trim().toLowerCase();
              const correctAnswer = (q.answer as string[]).join("\n").trim().toLowerCase();

              isCorrect = userAnswer === correctAnswer;
              isUnanswered = userAnswer.length === 0;
            }

            return (
              <div 
                key={qIndex} 
                className={`bg-white rounded-lg shadow p-6 border-l-4 ${
                  !isSubmitted ? 'border-gray-200' : 
                  isCorrect ? 'border-green-500' : 'border-red-500'
                }`}
              >
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 bg-blue-100 text-blue-800 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">
                    {qIndex + 1}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mt-1">
                    {q.question}
                  </h3>
                </div>

                {"code" in q && q.code && (
                  <pre className="ml-11 mb-4 overflow-x-auto rounded-md bg-gray-100 p-3 text-sm text-gray-800">
                    <code>{q.code}</code>
                  </pre>
                )}

                <div className="ml-11 space-y-3">
                  {q.type === "single" || q.type === "multiple" ? (
                    options.map((option, oIndex) => {
                      const isSelected = q.type === "single"
                        ? (answers[qIndex] as number) === oIndex
                        : (answers[qIndex] as number[] | undefined)?.includes(oIndex);

                      const isCorrectOption = q.type === "single"
                        ? oIndex === (q.answer as number)
                        : (q.answer as number[] | undefined)?.includes(oIndex);
                      
                      let optionClasses = "flex items-center p-3 rounded-md border transition-colors cursor-pointer ";
                      
                      if (!isSubmitted) {
                        optionClasses += isSelected 
                          ? "border-blue-500 bg-blue-50" 
                          : "border-gray-200 hover:bg-gray-50";
                      } else {
                        if (isCorrectOption) {
                          optionClasses += "border-green-500 bg-green-50 text-green-800 font-medium";
                        } else if (isSelected && !isCorrectOption) {
                          optionClasses += "border-red-500 bg-red-50 text-red-800";
                        } else {
                          optionClasses += "border-gray-200 opacity-60";
                        }
                      }

                      return (
                        <label key={oIndex} className={optionClasses}>
                          <input
                            type={q.type === "single" ? "radio" : "checkbox"}
                            name={`question-${qIndex}`}
                            className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 disabled:opacity-60 cursor-pointer"
                            checked={isSelected || false}
                            onChange={() => handleOptionChange(qIndex, oIndex)}
                            disabled={isSubmitted}
                          />
                          <span className="ml-3 text-gray-800">{option}</span>
                          {isSubmitted && isCorrectOption && (
                            <span className="ml-auto text-green-600">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                          )}
                          {isSubmitted && isSelected && !isCorrectOption && (
                            <span className="ml-auto text-red-600">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </span>
                          )}
                        </label>
                      );
                    })
                  ) : q.type === "short-answer" || q.type === "fix-code" ? (
                    <textarea
                      className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                      rows={5}
                      placeholder="Nhập câu trả lời của bạn..."
                      value={(answers[qIndex] as string) || ''}
                      onChange={(e) => {
                        if (!isSubmitted) {
                          setAnswers({
                            ...answers,
                            [qIndex]: e.target.value,
                          });
                        }
                      }}
                      disabled={isSubmitted}
                    ></textarea>
                  ) : null}
                </div>
                
                {isSubmitted && !isCorrect && (
                  <div className="ml-11 mt-4 p-3 bg-blue-50 text-blue-800 rounded text-sm">
                    <strong>Giải thích:</strong> Đáp án đúng là: <span className="font-semibold">{
                      q.type === "single"
                        ? options[q.answer as number]
                        : q.type === "multiple"
                        ? (q.answer as number[]).map(ansIndex => options[ansIndex]).join(", ")
                        : (q.answer as string[]).join("\n") // For short answer, assuming answer is an array of strings
                    }</span>
                  </div>
                )}
                {isSubmitted && isUnanswered && (
                  <div className="ml-11 mt-2 text-sm font-semibold text-red-600">
                    * Bạn chưa chọn đáp án cho câu hỏi này.
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="mt-8 text-center">
          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-full shadow-lg transition-transform transform hover:-translate-y-1"
            >
              Nộp Bài & Chấm Điểm
            </button>
          ) : (
            <button
              onClick={() => {
                setIsSubmitted(false);
                setAnswers({});
                setScore(0);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-10 rounded-full shadow-lg transition-transform transform hover:-translate-y-1"
            >
              Làm Lại Bài Thi
            </button>
          )}
        </div>
        
      </div>
    </div>
  );
}
