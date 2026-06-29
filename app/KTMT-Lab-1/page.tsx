"use client";

import React, { useState } from "react";

const questionsData = [
  {
    question: "Trong công cụ giả lập RARS, bảng Registers có 3 tab (thẻ) chính là gì?",
    options: [
      "Registers, Memory, Cache",
      "Registers, Floating Point, Control and Status",
      "Text Segment, Data Segment, Stack",
      "Edit, Execute, Messages"
    ],
    answer: 1
  },
  {
    question: "Vùng không gian bộ nhớ Text Segment trong công cụ RARS chứa gì?",
    options: [
      "Các biến và dữ liệu toàn cục",
      "Các mã lệnh hợp ngữ (mã máy)",
      "Vùng nhớ ngăn xếp (Stack)",
      "Trạng thái các thanh ghi"
    ],
    answer: 1
  },
  {
    question: "Vùng không gian bộ nhớ Data Segment trong công cụ RARS chứa gì?",
    options: [
      "Mã lệnh của chương trình",
      "Các biến và dữ liệu được khởi tạo",
      "Các thanh ghi hệ thống",
      "Các ngắt và ngoại lệ"
    ],
    answer: 1
  },
  {
    question: "Phím tắt nào dùng để biên dịch (Assemble) chương trình trong IDE RARS?",
    options: [
      "F3",
      "F5",
      "F10",
      "F11"
    ],
    answer: 0
  },
  {
    question: "Lệnh addi thuộc khuôn dạng lệnh nào trong kiến trúc RISC-V?",
    options: [
      "R-type",
      "I-type",
      "S-type",
      "U-type"
    ],
    answer: 1
  },
  {
    question: "Thanh ghi x0 (zero) trong RISC-V luôn chứa giá trị gì?",
    options: [
      "1",
      "Địa chỉ câu lệnh tiếp theo",
      "0",
      "Giá trị khởi tạo mảng"
    ],
    answer: 2
  },
  {
    question: "Hằng số trong lệnh có định dạng I-type của RISC-V sử dụng bao nhiêu bit?",
    options: [
      "8 bits",
      "12 bits",
      "16 bits",
      "32 bits"
    ],
    answer: 1
  },
  {
    question: "Để gán một hằng số 32-bit vào thanh ghi, ta thường dùng kết hợp hai lệnh nào?",
    options: [
      "li và lw",
      "lui và addi",
      "la và sw",
      "auipc và jalr"
    ],
    answer: 1
  },
  {
    question: "Lệnh nào dùng để nhảy không điều kiện trong RISC-V?",
    options: [
      "beq",
      "bne",
      "blt",
      "jal"
    ],
    answer: 3
  },
  {
    "question": "Lệnh 'beq rs1, rs2, label' thực hiện nhảy khi nào?",
    options: [
      "rs1 > rs2",
      "rs1 < rs2",
      "rs1 = rs2",
      "rs1 != rs2"
    ],
    answer: 2
  },
  {
    question: "Lệnh 'blt rs1, rs2, label' thực hiện nhảy khi nào?",
    options: [
      "rs1 > rs2",
      "rs1 < rs2",
      "rs1 = rs2",
      "rs1 != rs2"
    ],
    answer: 1
  },
  {
    question: "Giả lệnh 'j label' tương đương với lệnh chính thống nào trong RISC-V?",
    options: [
      "jal x0, label",
      "jalr x1, label",
      "beq x0, x0, label",
      "bne x0, x1, label"
    ],
    answer: 0
  },
  {
    "question": "Lệnh logic nào thường được sử dụng để trích xuất (giữ lại) một số bit cụ thể trong thanh ghi?",
    "options": [
      "or / ori",
      "and / andi",
      "xor / xori",
      "not"
    ],
    answer: 1 
  },
  {
    "question": "Lệnh dịch trái (sll) N bit đối với số nguyên tương đương với phép toán học nào (giả sử không bị tràn)?",
    "options": [
      "Nhân với 2^N",
      "Chia cho 2^N",
      "Cộng với 2^N",
      "Trừ đi 2^N"
    ],
    "answer": 0
  },
  {
    "question": "Hiện tượng tràn số (overflow) khi thực hiện cộng hai số nguyên CÓ DẤU xảy ra khi nào?",
    "options": [
      "Hai toán hạng khác dấu",
      "Tổng bằng 0",
      "Hai toán hạng cùng dấu nhưng tổng của chúng có dấu ngược lại",
      "Kết quả lớn hơn hoặc bằng 0"
    ],
    "answer": 2
  },
  {
    "question": "Lệnh nào trong extension RV32M dùng để nhân hai số có dấu và lấy 32-bit phần CAO của kết quả?",
    "options": [
      "mul",
      "mulh",
      "mulhsu",
      "mulhu"
    ],
    "answer": 1
  },
  {
    "question": "Để in một số nguyên ra màn hình Run I/O bằng hàm ecall, ta cần gán giá trị nào vào thanh ghi a7?",
    "options": [
      "1",
      "4",
      "5",
      "10"
    ],
    "answer": 0
  },
  {
    "question": "Dịch vụ hệ thống (ecall) có số hiệu a7 = 10 dùng để làm gì?",
    "options": [
      "In số nguyên",
      "In chuỗi ký tự",
      "Nhập ký tự",
      "Kết thúc chương trình (Exit)"
    ],
    "answer": 3
  },
  {
    "question": "Để nhập một chuỗi ký tự từ bàn phím bằng ecall, cần gán giá trị nào vào thanh ghi a7?",
    "options": [
      "4",
      "5",
      "8",
      "12"
    ],
    "answer": 2
  },
  {
    "question": "Khi gọi hàm ecall để in chuỗi ký tự (a7 = 4), địa chỉ của chuỗi cần in phải được nạp vào thanh ghi nào?",
    "options": [
      "a0",
      "a1",
      "a2",
      "a7"
    ],
    "answer": 0
  },
  {
    "question": "Kích thước của một từ (word) trong kiến trúc RISC-V RV32I là bao nhiêu byte?",
    "options": [
      "1 byte",
      "2 bytes",
      "4 bytes",
      "8 bytes"
    ],
    "answer": 2
  },
  {
    "question": "Lệnh nào dùng để đọc một từ (word) từ bộ nhớ vào thanh ghi?",
    "options": [
      "sw",
      "sb",
      "lw",
      "lb"
    ],
    "answer": 2
  },
  {
    "question": "Giả sử mảng A chứa các phần tử kiểu word, địa chỉ phần tử A[0] nằm trong thanh ghi a0. Địa chỉ của A[3] tính bằng công thức nào?",
    "options": [
      "a0 + 3",
      "a0 + 4",
      "a0 + 8",
      "a0 + 12"
    ],
    "answer": 3
  },
  {
    "question": "Chỉ thị biên dịch nào dùng để cấp phát một vùng nhớ với kích thước số byte cụ thể nhưng không cần khởi tạo giá trị?",
    "options": [
      ".word",
      ".asciz",
      ".space",
      ".byte"
    ],
    "answer": 2
  },
  {
    "question": "Theo quy ước, địa chỉ quay về sau khi gọi một chương trình con bằng lệnh jal được lưu ở thanh ghi nào?",
    "options": [
      "sp",
      "ra",
      "gp",
      "tp"
    ],
    "answer": 1
  },
  {
    "question": "Trong RISC-V, vùng nhớ ngăn xếp (stack) phát triển theo chiều nào trong không gian địa chỉ?",
    "options": [
      "Từ địa chỉ thấp lên địa chỉ cao",
      "Từ địa chỉ cao xuống địa chỉ thấp",
      "Tùy thuộc vào người lập trình",
      "Ngẫu nhiên"
    ],
    "answer": 1
  },
  {
    "question": "Thanh ghi nào được quy ước sử dụng làm con trỏ ngăn xếp (stack pointer)?",
    "options": [
      "s0",
      "a0",
      "sp",
      "ra"
    ],
    "answer": 2
  },
  {
    "question": "Để cấp phát thêm không gian cho 4 thanh ghi (16 bytes) trên ngăn xếp, lệnh nào sau đây là đúng?",
    "options": [
      "addi sp, sp, 16",
      "addi sp, sp, -16",
      "lw sp, 16(sp)",
      "sw sp, -16(sp)"
    ],
    "answer": 1
  },
  {
    "question": "Thanh ghi CSR nào chứa địa chỉ của chương trình con phục vụ ngắt (mức User) trong RISC-V?",
    "options": [
      "ucause",
      "uepc",
      "utvec",
      "ustatus"
    ],
    "answer": 2
  },
  {
    "question": "Lệnh nào dùng để quay trở lại chương trình chính từ chương trình con xử lý ngắt (ở chế độ User)?",
    "options": [
      "jr ra",
      "ret",
      "uret",
      "jalr x0"
    ],
    "answer": 2
  },
  {
    "question": "Bit UIE (User Interrupt Enable) tại thanh ghi ustatus có vai trò gì?",
    "options": [
      "Chỉ ra nguyên nhân gây ngắt",
      "Cho phép hoặc không cho phép các ngắt toàn cục ở mức User",
      "Lưu địa chỉ khi có ngắt xảy ra",
      "Bật cờ chờ xử lý ngắt"
    ],
    "answer": 1
  },
  {
    "question": "Kỹ thuật chương trình dùng vòng lặp liên tục đọc trạng thái một thanh ghi ngoại vi để chờ sự kiện xảy ra gọi là gì?",
    "options": [
      "Xử lý ngắt (Interrupt)",
      "Thăm dò (Polling)",
      "DMA (Direct Memory Access)",
      "Pipeline"
    ],
    "answer": 1
  },
  {
    "question": "Khi phần mềm truy cập các phần tử mảng một cách tuần tự liên tiếp, việc tăng kích thước khối (block size) của Cache sẽ làm tỷ lệ Cache Hit thay đổi thế nào?",
    "options": [
      "Giảm đi",
      "Không thay đổi",
      "Tăng lên",
      "Biến thiên ngẫu nhiên"
    ],
    "answer": 2
  },
  {
    "question": "Thanh ghi uepc (User Exception Program Counter) lưu trữ giá trị gì khi xảy ra ngắt?",
    "options": [
      "Địa chỉ chương trình xử lý ngắt",
      "Giá trị của thanh ghi PC tại thời điểm ngắt xảy ra",
      "Nguyên nhân gây ra ngắt",
      "Cờ trạng thái cho phép ngắt"
    ],
    "answer": 1
  },
  {
    "question": "Chức năng của giả lệnh la (load address) là gì?",
    "options": [
      "Tải nội dung dữ liệu từ bộ nhớ vào thanh ghi",
      "Ghi nội dung từ thanh ghi ra vùng nhớ",
      "Nạp địa chỉ của một nhãn (label) vào thanh ghi",
      "Dịch bít địa chỉ sang trái"
    ],
    "answer": 2
  },
  {
    "question": "Trong giả lập Bitmap Display, mỗi đơn vị điểm ảnh (pixel) chiếm không gian lưu trữ bao nhiêu trong bộ nhớ?",
    "options": [
      "1 byte",
      "2 bytes",
      "4 bytes (1 word)",
      "8 bytes"
    ],
    "answer": 2
  },
  {
    "question": "Vi điều khiển trên mạch phát triển ESP32-C3 được thiết kế dựa trên kiến trúc tập lệnh nào?",
    "options": [
      "ARM Cortex-M",
      "MIPS",
      "RISC-V 32-bit",
      "x86"
    ],
    "answer": 2
  },
  {
    "question": "Để thiết lập MỨC CAO (logic 1) cho một chân GPIO là output trên ESP32-C3, ta thường ghi giá trị 1 vào thanh ghi nào sau đây?",
    "options": [
      "GPIO_OUT_W1TS_REG",
      "GPIO_OUT_W1TC_REG",
      "GPIO_IN_REG",
      "GPIO_ENABLE_REG"
    ],
    "answer": 0
  },
  {
    "question": "Thanh ghi nào của vi điều khiển ESP32-C3 dùng để CHO PHÉP (enable) một chân GPIO hoạt động với vai trò là đầu ra (output)?",
    "options": [
      "GPIO_OUT_REG",
      "GPIO_ENABLE_REG",
      "GPIO_IN_REG",
      "IO_MUX_GPIO_REG"
    ],
    "answer": 1
  },
  {
    "question": "Trong môi trường Wokwi hoặc PlatformIO, tập tin chứa mã nguồn hợp ngữ cho ESP32-C3 thường có phần đuôi mở rộng là gì?",
    "options": [
      ".asm",
      ".S",
      ".c",
      ".cpp"
    ],
    "answer": 1
  }
];

export default function ExamPage() {
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleOptionChange = (questionIndex: number, optionIndex: number) => {
    if (isSubmitted) return;
    setAnswers({
      ...answers,
      [questionIndex]: optionIndex,
    });
  };

  const handleSubmit = () => {
    let currentScore = 0;
    questionsData.forEach((q, index) => {
      if (answers[index] === q.answer) {
        currentScore += 1;
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
            const isCorrect = answers[qIndex] === q.answer;
            const isUnanswered = answers[qIndex] === undefined;

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

                <div className="ml-11 space-y-3">
                  {q.options.map((option, oIndex) => {
                    const isSelected = answers[qIndex] === oIndex;
                    const isCorrectOption = oIndex === q.answer;
                    
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
                          type="radio"
                          name={`question-${qIndex}`}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 disabled:opacity-60 cursor-pointer"
                          checked={isSelected}
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
                  })}
                </div>
                
                {isSubmitted && !isCorrect && (
                  <div className="ml-11 mt-4 p-3 bg-blue-50 text-blue-800 rounded text-sm">
                    <strong>Giải thích:</strong> Đáp án đúng là: <span className="font-semibold">{q.options[q.answer]}</span>
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