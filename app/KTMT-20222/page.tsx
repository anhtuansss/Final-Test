"use client";

import React, { useState, useEffect } from "react";

type QuestionType = "single" | "multiple" | "truefalse" | "fill" | "short";

interface Question {
  id: number;
  type: QuestionType;
  question: string;
  options?: string[];
  answer: any;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    type: "single",
    question: `Chọn phát biểu đúng với chương trình sau đây thực hiện trên công cụ RARS (RISC-V):

.eqv IN_ADRESS_HEXA_KEYBOARD 0xFFFF0012
.data
Message: .asciiz "Key is pressed\\n"
.text
main:
  li t1, IN_ADRESS_HEXA_KEYBOARD
  li t3, 0x80
  sb t3, 0(t1)
Loop:
  nop
  nop
  j Loop

# Giả sử Trap Handler đã được cấu hình từ trước
handler:
  li a7, 4
  la a0, Message
  ecall
  mret`,
    options: [
      "Chương trình cài đặt cơ chế thăm dò (polling), khi có phím được bấm sẽ hiện xâu thông báo ra màn hình",
      "Chương trình cài đặt cơ chế ngắt (interrupt), khi có phím được bấm thì sẽ thực hiện chương trình phục vụ ngắt để in thông báo",
      "Chương trình cài đặt cơ chế ngắt, trong đó chương trình chính sẽ chủ động gọi chương trình xử lý ngắt",
      "Chương trình cài đặt cơ chế thăm dò, trong đó chương trình chính gọi chương trình con tại địa chỉ xử lý ngắt"
    ],
    answer: 1,
    explanation: "Đoạn code thiết lập phần cứng ngoại vi và sau đó rơi vào vòng lặp vô hạn (Loop). Việc in chuỗi được thực hiện trong hàm handler, cho thấy cơ chế ngắt bất đồng bộ được sử dụng thay vì thăm dò liên tục."
  },
  {
    id: 2,
    type: "single",
    question: `Chọn phát biểu đúng khi thực hiện chương trình sau:

.text
  addi t0, zero, 1
  jal f1
  addi t0, zero, 2
f1:
  addi t0, zero, 3
  jal f2
  addi t0, zero, 4
f2:
  jr ra
  addi t0, zero, 5
  jr ra`,
    options: [
      "Sau khi chương trình kết thúc thanh ghi t0 có giá trị bằng 1",
      "Sau khi chương trình kết thúc thanh ghi t0 có giá trị bằng 2",
      "Chương trình bị lặp vô hạn, không dừng",
      "Sau khi chương trình kết thúc thanh ghi t0 có giá trị bằng 4"
    ],
    answer: 2,
    explanation: "Khi gọi đệ quy hoặc gọi hàm lồng nhau (jal f2), thanh ghi ra bị ghi đè. Lệnh jr ra trong f2 sẽ nhảy về addi t0, zero, 4, sau đó tiếp tục chạy xuống jr ra và lại quay về addi t0, zero, 4, gây ra vòng lặp vô hạn."
  },
  {
    id: 3,
    type: "single",
    question: `Lệnh sau đây thuộc nhóm khuôn dạng lệnh (Instruction Format) nào trong RV32I?

addi s0, zero, 0x0000`,
    options: ["I-type", "R-type", "J-type", "S-type"],
    answer: 0,
    explanation: "Lệnh addi (Add Immediate) kết hợp một thanh ghi nguồn và một hằng số 12-bit để lưu vào thanh ghi đích, thuộc định dạng I-type."
  },
  {
    id: 4,
    type: "fill",
    question: `Đoạn chương trình sau hiển thị chuỗi ký tự gì ra màn hình I/O?

.data
str: .asciiz "hello"
.text
  la a0, str
  li a1, 0
label1:
  add a2, a1, a0
  lb a3, 0(a2)
  beq a3, zero, label2
  addi a3, a3, -32
  sb a3, 0(a2)
  addi a1, a1, 1
  j label1
label2:
  li a7, 4
  ecall`,
    answer: "HELLO",
    explanation: "Chương trình duyệt từng ký tự của chuỗi 'hello' và trừ đi 32 (khoảng cách mã ASCII giữa chữ thường và chữ hoa), sau đó ghi đè lại vào bộ nhớ, biến chuỗi thành chữ in hoa."
  },
  {
    id: 5,
    type: "single",
    question: "Trong nhóm lệnh I-type của tập lệnh RISC-V, ví dụ lệnh addi t0, zero, imm, giá trị dương lớn nhất của toán hạng imm là bao nhiêu (imm là giá trị có dấu)?",
    options: ["2^8 - 1", "2^31 - 1", "2^11 - 1", "2^15 - 1"],
    answer: 2,
    explanation: "Trường immediate của lệnh I-type trong RV32I có chiều dài 12 bit dùng mã bù 2. Giá trị dương lớn nhất là 2^11 - 1 (tức là 2047)."
  },
  {
    id: 6,
    type: "multiple",
    question: `Chương trình sau thực hiện quét bàn phím ma trận trong công cụ RARS. Chọn các phát biểu đúng:

.text
  li t1, 0xFFFF0012
  li t2, 0xFFFF0014
polling:
  li t3, 0x08
  sb t3, 0(t1)
  lb a0, 0(t2)
print:
  li a7, 34
  ecall
sleep:
  li a0, 100
  li a7, 32
  ecall
  j polling`,
    options: [
      "Chương trình quét 1 hàng của keyboard matrix bằng cách ghi chỉ số vào 0xFFFF0014",
      "Chương trình quét 1 hàng của keyboard matrix bằng cách ghi chỉ số vào 0xFFFF0012",
      "Chương trình quét tất cả các hàng bằng phương pháp polling",
      "Chương trình chỉ quét 1 hàng cuối (row 4) bằng phương pháp polling"
    ],
    answer: [1, 3],
    explanation: "Chương trình ghi giá trị t3 (0x08 = 1000b, tương ứng hàng thứ 4) vào địa chỉ điều khiển (0xFFFF0012) để kích hoạt. Vì không có mã thay đổi t3 trong vòng lặp nên nó chỉ quét duy nhất hàng cuối cùng này."
  },
  {
    id: 7,
    type: "single",
    question: `Cho đoạn lệnh sau:

main:
  li a0, -45
  jal func
  nop
endmain:
func:
  jr ra

Hỏi sau khi thực hiện câu lệnh jr ra, thanh ghi PC sẽ chứa địa chỉ của lệnh nào tiếp theo?`,
    options: ["jal func", "jr ra", "nop", "li a0, -45"],
    answer: 2,
    explanation: "Lệnh jal func lưu địa chỉ của lệnh kế tiếp nó (là lệnh nop) vào thanh ghi ra. Vì vậy jr ra sẽ quay trở lại lệnh nop."
  },
  {
    id: 8,
    type: "single",
    question: `Giá trị thanh ghi t3 sau khi thực hiện đoạn lệnh sau (chia lấy phần dư) là bao nhiêu?

addi t1, zero, -7
addi t2, zero, 2
rem t3, t1, t2`,
    options: ["0xFFFFFFFF", "0x00000001", "0xFFFFFFFD", "Báo lỗi"],
    answer: 0,
    explanation: "Phép chia lấy phần dư (rem) của -7 cho 2 trả về -1. Số -1 được biểu diễn trong hệ 32-bit bù 2 là 0xFFFFFFFF."
  },
  {
    id: 9,
    type: "single",
    question: `Xác định giá trị thanh ghi a1 sau khi đoạn chương trình sau được thực hiện với công cụ RARS. Biết RARS sử dụng kiến trúc Little-Endian.

.data
A0: .byte 0x01, 0x02, 0x03, 0x04
.text
  la a0, A0
  lw a1, 0(a0)`,
    options: ["0x01020304", "0x04030201", "0x04", "0x01"],
    answer: 1,
    explanation: "Little-Endian lưu byte thấp ở địa chỉ thấp. Byte ở offset 0 (0x01) sẽ là byte thấp nhất (LSB) của thanh ghi, byte ở offset 3 (0x04) sẽ là MSB. Do đó đọc bằng lw sẽ cho kết quả 0x04030201."
  },
  {
    id: 10,
    type: "single",
    question: "Những lệnh nào sau đây có thể được sử dụng để xóa nội dung thanh ghi s0 về 0?",
    options: [
      "or s0, s0, t0",
      "and s0, s0, zero",
      "xor s0, s0, t0",
      "addi s0, s0, 0"
    ],
    answer: 1,
    explanation: "Phép AND giữa bất kỳ số nào với giá trị 0 (từ thanh ghi zero) đều cho kết quả là 0."
  },
  {
    id: 11,
    type: "fill",
    question: `Cho biết giá trị của thanh ghi s1 (ở hệ cơ số 10) sau khi thực hiện đoạn lệnh sau:

li s0, 5
srli s1, s0, 1
slli s1, s1, 1`,
    answer: "4",
    explanation: "s0 = 5 (0101b). Dịch phải 1 bit (srli) thành 2 (0010b). Dịch trái 1 bit (slli) thành 4 (0100b)."
  },
  {
    id: 12,
    type: "single",
    question: "Hãy dịch lệnh sau thành mã máy (dạng hexa): add t0, t1, t2. Biết lệnh add có opcode=0x33(0110011), funct3=0, funct7=0. Mã thanh ghi: t0=x5, t1=x6, t2=x7.",
    options: ["0x007302B3", "0x007342B3", "0x014B4820", "0x012A4020"],
    answer: 1,
    explanation: "Định dạng R-type: funct7(0000000) rs2(00111) rs1(00110) funct3(000) rd(00101) opcode(0110011) -> 0000000_00111_00110_000_00101_0110011 = 0000_0000_0111_0011_0100_0010_1011_0011 = 0x007342B3."
  },
  {
    id: 13,
    type: "single",
    question: `Giả sử có đoạn chương trình như sau:

.data
x: .word 2023
.text
  la a0, x
  lb t0, 1(a0)

Hỏi t0 chứa giá trị nào?`,
    options: ["0x07", "0x00", "0xE7", "0x20"],
    answer: 0,
    explanation: "2023 hệ 10 = 0x07E7 hệ 16. Trên bộ nhớ Little-Endian, nó được lưu thành 4 byte: E7 07 00 00. Lệnh lb đọc 1 byte tại offset 1, lấy được giá trị 0x07."
  },
  {
    id: 14,
    type: "single",
    question: "Để thực hiện xóa (đưa về 0) các bit của byte thấp nhất (LSB) của thanh ghi s0 ta dùng lệnh nào sau đây? Biết giá trị t0 = 0xFF, t1 = 0xFFFFFF00.",
    options: [
      "or s0, s0, t0",
      "and s0, s0, t1",
      "xor s0, s0, t0",
      "and s0, s0, t0"
    ],
    answer: 1,
    explanation: "Sử dụng lệnh AND với một mặt nạ (mask) có byte thấp nhất bằng 00 và các byte khác bằng FF (tức là 0xFFFFFF00 chứa trong t1) sẽ xóa byte LSB và giữ nguyên các byte còn lại."
  },
  {
    id: 15,
    type: "fill",
    question: "Khai báo 1 biến như sau: X: .word 10. Hỏi biến X chiếm mấy byte bộ nhớ?",
    answer: "4",
    explanation: "Trong hệ thống RISC-V 32-bit (RV32I), kiểu dữ liệu .word luôn có kích thước cố định là 4 byte (32 bit)."
  },
  {
    id: 16,
    type: "single",
    question: "Đoạn lệnh nào sau đây có xảy ra hiện tượng tràn số học logic (Overflow) trên dữ liệu có dấu?",
    options: [
      "li s0, 0xFFFFFFFF\nli s1, 0x80000000\nadd s2, s0, s1",
      "li s0, 0xFFFFFFFF\nli s1, 0x80000000\nsub s2, s0, s1",
      "li s0, 0xFFFFFFFF\nli s1, 0xFFFFFFFF\nadd s2, s0, s1",
      "li s0, 0xFFFFFFFF\nli s1, 0xFFFFFFFF\nsub s2, s0, s1"
    ],
    answer: 0,
    explanation: "0xFFFFFFFF là -1, 0x80000000 là -2147483648 (giá trị âm nhỏ nhất). Khi cộng hai số âm này lại, kết quả sẽ vượt khỏi phạm vi lưu trữ của số nguyên 32-bit có dấu, gây tràn (overflow)."
  },
  {
    id: 17,
    type: "single",
    question: "Trong các khuôn dạng lệnh RISC-V, trường opcode (mã thao tác) nằm ở vị trí nào?",
    options: ["Bit 26-31", "Bit 0-6", "Bit 16-20", "Bit 21-25"],
    answer: 1,
    explanation: "Kiến trúc RISC-V RV32I dành 7 bit thấp nhất (từ bit 0 đến bit 6) của tất cả các khuôn dạng lệnh cho trường Opcode."
  },
  {
    id: 18,
    type: "single",
    question: "Câu lệnh giả la a0, 0x10203040 sau khi biên dịch (thường tách thành lui và addi) sẽ chiếm tổng cộng mấy byte bộ nhớ mã lệnh?",
    options: ["2", "4", "8", "16"],
    answer: 2,
    explanation: "Vì địa chỉ/hằng số có kích thước 32-bit nên Assembler sẽ tách la thành 2 lệnh nguyên thủy 32-bit (mỗi lệnh 4 byte). Tổng cộng tốn 8 byte bộ nhớ."
  },
  {
    id: 19,
    type: "fill",
    question: `Giá trị của thanh ghi s0 (hệ thập phân) sau khi đoạn chương trình sau được thực hiện:

.text
  li s0, 0
  li s1, 1
  li s2, 10
loop:
  slt t0, s2, s1
  bne t0, zero, end
  addi s0, s0, 1
  addi s1, s1, 1
  addi s2, s2, -1
  j loop
end:`,
    answer: "5",
    explanation: "Mỗi vòng lặp, s1 tăng 1 và s2 giảm 1. Các cặp (s1, s2) qua từng vòng: (1,10), (2,9), (3,8), (4,7), (5,6). Tại lần kiểm tra tiếp theo s1=6 và s2=5, điều kiện s2 < s1 (5 < 6) đúng -> t0=1, thoát vòng lặp. s0 đếm số vòng lặp nên s0 = 5."
  },
  {
    id: 20,
    type: "single",
    question: `Giá trị thanh ghi t3 (thương số) sau khi thực hiện đoạn lệnh sau là bao nhiêu?

addi t1, zero, -7
addi t2, zero, 2
div t3, t1, t2`,
    options: ["0xFFFFFFFD", "0x00000001", "Báo lỗi", "0xFFFFFFFF"],
    answer: 0,
    explanation: "Phép chia lấy phần nguyên (div) của -7 cho 2 trả về -3. Số -3 được biểu diễn trong mã bù 2 là 0xFFFFFFFD."
  },
  {
    id: 21,
    type: "single",
    question: "Trong phần mềm RARS (hoặc MARS), cửa sổ Data Segment có thể hiển thị dữ liệu ở vùng nhớ nào?",
    options: ["Vùng nhớ chứa lệnh", "Vùng nhớ chứa các thanh ghi", "Vùng nhớ chứa các biến", "Vùng nhớ ngăn xếp"],
    answer: 2,
    explanation: "Data Segment là khu vực chuyên dụng để hiển thị các dữ liệu bộ nhớ tĩnh (static data), bao gồm các biến và mảng toàn cục được cấp phát qua từ khóa .data."
  },
  {
    id: 22,
    type: "single",
    question: "Lựa chọn nào là lệnh tương ứng với mã máy sau 0x00130313, biết rằng đây là mã máy của lệnh addi trong RV32I?",
    options: [
      "addi t1, t1, 1",
      "addi t0, t0, 1",
      "addi t2, t2, 1",
      "addi t3, t3, 1"
    ],
    answer: 0,
    explanation: "Giải mã 0x00130313 ra nhị phân là 000000000001_00110_000_00110_0010011. imm = 1, rs1 = 00110 (x6 tức t1), rd = 00110 (t1), opcode = 0010011 (addi). Lệnh là addi t1, t1, 1."
  },
  {
    id: 23,
    type: "single",
    question: `Đoạn chương trình sau hiển thị gì ra màn hình I/O?

.data
str1: .ascii "Hello"
str2: .asciiz "World"
.text
  li a7, 4
  la a0, str1
  ecall`,
    options: ["Hello", "HelloWorld", "Hello World", "World"],
    answer: 1,
    explanation: "Khai báo .ascii không tự động chèn ký tự Null (0x00) vào cuối chuỗi. Hàm in chuỗi sẽ in str1 và tiếp tục đọc tràn sang str2 cho đến khi gặp ký tự Null của str2. Do đó nó in ra liền nhau 'HelloWorld'."
  },
  {
    id: 24,
    type: "single",
    question: `Biết rằng vùng DATA trong chương trình mặc định bắt đầu từ địa chỉ 0x10010000. Trong đoạn mã sau, lệnh lb sẽ đọc nội dung byte ở địa chỉ nào?

.data
x: .word 0x01020304
.text
  la t0, x
  lb t1, 2(t0)`,
    options: ["0x10010000", "0x10010003", "0x10010002", "0x10010001"],
    answer: 2,
    explanation: "Địa chỉ cơ sở của biến x được tải vào t0 là 0x10010000. Lệnh lb dùng offset 2, nên địa chỉ thực tế cần đọc là 0x10010000 + 2 = 0x10010002."
  },
  {
    id: 25,
    type: "fill",
    question: `Cho biết giá trị của thanh ghi s1 trong hệ cơ số 10 sau khi đoạn chương trình sau được thực hiện:

.text
  addi s0, zero, 0xA
  andi s1, s0, 0x7`,
    answer: "2",
    explanation: "0xA là 10 (nhị phân 1010). AND với 0x7 (nhị phân 0111) cho kết quả là 0010, tức là 2 trong hệ thập phân."
  },
  {
    id: 26,
    type: "single",
    question: "Biết rằng vùng nhớ ngăn xếp (stack) trong RISC-V có chiều cấp phát từ đáy đến đỉnh ngược với chiều tăng của địa chỉ bộ nhớ chính (Grow down). Để cất dữ liệu thanh ghi s0 vào đỉnh stack ta cần sử dụng cặp lệnh nào?",
    options: [
      "addi sp, sp, -4 \nsw s0, 0(sp)",
      "addi sp, sp, 0 \nsw s0, 0(sp)",
      "addi sp, sp, 4 \nsw s0, 0(sp)",
      "addi sp, sp, -8 \nsw s0, 4(sp)"
    ],
    answer: 0,
    explanation: "Để cấp phát không gian trên stack, ta phải giảm thanh ghi sp (addi sp, sp, -4). Sau khi sp đã trỏ đến vùng nhớ trống mới, ta dùng lệnh sw s0, 0(sp) để lưu giá trị."
  },
  {
    id: 27,
    type: "fill",
    question: `Giả sử có đoạn chương trình như sau:

.data
x: .word 10
y: .word 11
z: .word 12
.text
  la t0, x
  la t1, y
  la t2, z

Nếu sau khi nạp, t1 mang giá trị địa chỉ là 0x10010004. Hỏi thanh ghi t2 sẽ mang giá trị địa chỉ bao nhiêu (điền dưới dạng hexa: 0x...)?`,
    answer: "0x10010008",
    explanation: "Các biến .word được xếp liền kề trong bộ nhớ, mỗi biến chiếm 4 byte. Biến z nằm ngay sau biến y, do đó địa chỉ của z là địa chỉ của y cộng thêm 4: 0x10010004 + 4 = 0x10010008."
  },
  {
    id: 28,
    type: "single",
    question: "Trong hợp ngữ, khai báo nào sau đây là khai báo vùng chứa mã lệnh thực thi của chương trình?",
    options: [".code", ".text", ".data", ".stack"],
    answer: 1,
    explanation: "Chỉ thị .text được dùng để báo hiệu bắt đầu phân đoạn bộ nhớ chứa các lệnh máy (instructions) để CPU thực thi."
  }
];

export default function Exam2022App() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: any }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45 * 60);

  useEffect(() => {
    if (timeLeft <= 0 && !isSubmitted) {
      setIsSubmitted(true);
      return;
    }
    if (isSubmitted) return;
    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft, isSubmitted]);

  const question = questions[currentIdx];

  const handleSelectSingle = (optionIdx: number) => {
    if (isSubmitted) return;
    setAnswers({ ...answers, [question.id]: optionIdx });
  };

  const handleSelectMultiple = (optionIdx: number) => {
    if (isSubmitted) return;
    const current = answers[question.id] || [];
    if (current.includes(optionIdx)) {
      setAnswers({ ...answers, [question.id]: current.filter((x: number) => x !== optionIdx) });
    } else {
      setAnswers({ ...answers, [question.id]: [...current, optionIdx] });
    }
  };

  const handleInputFill = (value: string) => {
    if (isSubmitted) return;
    setAnswers({ ...answers, [question.id]: value });
  };

  const isCorrect = (q: Question) => {
    const userAns = answers[q.id];
    if (q.type === "single" || q.type === "truefalse") return userAns === q.answer;
    if (q.type === "multiple") {
      return (
        Array.isArray(userAns) &&
        userAns.length === q.answer.length &&
        userAns.every((val) => q.answer.includes(val))
      );
    }
    if (q.type === "fill" || q.type === "short") {
      return (
        userAns &&
        typeof userAns === "string" &&
        userAns.trim().toLowerCase() === String(q.answer).trim().toLowerCase()
      );
    }
    return false;
  };

  const getScore = () => {
    return questions.filter(q => isCorrect(q)).length;
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        
    <div className="max-w-4xl mx-auto p-4 md:p-8 font-sans text-slate-800 bg-slate-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-blue-900 tracking-tight">Đề Thi Thực Hành Kiến Trúc Máy Tính (2022.2)</h1>
          <p className="text-slate-500 font-medium">Đã chuẩn hóa hoàn toàn sang kiến trúc RV32I</p>
        </div>
        
        <span className={`text-xl font-bold font-mono px-4 py-2 rounded-lg whitespace-nowrap ${timeLeft < 300 && !isSubmitted ? 'bg-red-100 text-red-600' : 'bg-slate-200 text-slate-700'}`}>
          Thời gian: {formatTime(timeLeft)}
        </span>
      </div>

      <div className="w-full bg-slate-200 rounded-full h-2 mb-6">
        <div 
          className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
          style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {isSubmitted && (
        <div className="bg-emerald-50 border border-emerald-400 text-emerald-800 p-5 rounded-xl shadow-sm mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Kết Quả Bài Thi</h2>
            <p className="text-lg mt-1 font-medium">Bạn đạt: {getScore()} / {questions.length} điểm</p>
          </div>
        </div>
      )}

      <div className="bg-white shadow border border-slate-200 rounded-xl p-6 md:p-8 mb-6 relative overflow-hidden">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
          <span className="text-lg font-bold text-slate-700">Câu {currentIdx + 1} / {questions.length}</span>
          {isSubmitted && (
            <span className={`px-4 py-1.5 rounded-lg text-sm font-bold uppercase tracking-wider ${isCorrect(question) ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
              {isCorrect(question) ? "ĐÚNG" : "SAI"}
            </span>
          )}
        </div>
        
        <div className="text-lg md:text-xl font-medium mb-8 text-slate-800 leading-relaxed whitespace-pre-wrap font-mono bg-slate-50 p-4 rounded-lg">
          {question.question}
        </div>

        <div className="space-y-3">
          {question.type === "single" &&
            question.options?.map((opt, idx) => {
              const isSelected = answers[question.id] === idx;
              const isAns = question.answer === idx;
              let optionStyle = "border-slate-300 hover:border-blue-400 hover:bg-blue-50";
              
              if (isSubmitted) {
                if (isAns) optionStyle = "bg-emerald-50 border-emerald-500 font-semibold ring-1 ring-emerald-500";
                else if (isSelected) optionStyle = "bg-red-50 border-red-400 opacity-80";
                else optionStyle = "opacity-40 border-slate-200 bg-slate-50";
              } else if (isSelected) {
                optionStyle = "bg-blue-50 border-blue-500 ring-1 ring-blue-500";
              }

              return (
                <div
                  key={idx}
                  onClick={() => handleSelectSingle(idx)}
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${optionStyle}`}
                >
                  <div className="flex items-start">
                    <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center mr-4 ${isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-400'}`}>
                      {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                    <span className="whitespace-pre-wrap">{opt}</span>
                  </div>
                </div>
              );
            })}

          {question.type === "multiple" &&
            question.options?.map((opt, idx) => {
              const currentAnsArray = answers[question.id] || [];
              const isSelected = currentAnsArray.includes(idx);
              const isAns = question.answer.includes(idx);
              let optionStyle = "border-slate-300 hover:border-blue-400 hover:bg-blue-50";

              if (isSubmitted) {
                if (isAns) optionStyle = "bg-emerald-50 border-emerald-500 font-semibold ring-1 ring-emerald-500";
                else if (isSelected) optionStyle = "bg-red-50 border-red-400 opacity-80";
                else optionStyle = "opacity-40 border-slate-200 bg-slate-50";
              } else if (isSelected) {
                optionStyle = "bg-blue-50 border-blue-500 ring-1 ring-blue-500";
              }

              return (
                <div
                  key={idx}
                  onClick={() => handleSelectMultiple(idx)}
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${optionStyle}`}
                >
                  <div className="flex items-start">
                     <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded flex items-center justify-center mr-4 ${isSelected ? 'bg-blue-600 border-blue-600' : 'border border-slate-400'}`}>
                      {isSelected && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>}
                    </div>
                    <span className="whitespace-pre-wrap">{opt}</span>
                  </div>
                </div>
              );
            })}

          {(question.type === "fill" || question.type === "short") && (
            <div>
              <input
                type="text"
                className={`w-full p-4 border-2 rounded-xl outline-none font-mono text-lg transition-all ${
                  isSubmitted
                    ? isCorrect(question)
                      ? "bg-emerald-50 border-emerald-500 text-emerald-900"
                      : "bg-red-50 border-red-400 text-red-900"
                    : "bg-slate-50 border-slate-300 focus:border-blue-500 focus:bg-white"
                }`}
                placeholder="Điền đáp án..."
                value={answers[question.id] || ""}
                onChange={(e) => handleInputFill(e.target.value)}
                readOnly={isSubmitted}
                spellCheck={false}
              />
              {isSubmitted && !isCorrect(question) && (
                <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <p className="text-sm text-emerald-800 font-bold mb-1 uppercase tracking-wider">Đáp án mẫu:</p>
                  <p className="font-mono text-lg font-bold text-emerald-700">{question.answer}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {isSubmitted && (
          <div className="mt-8 p-5 bg-blue-50 border-l-4 border-blue-500 rounded-r-xl">
            <h4 className="font-bold text-blue-900 mb-2">Giải thích chi tiết:</h4>
            <p className="text-blue-900 leading-relaxed font-medium whitespace-pre-wrap">{question.explanation}</p>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center pb-12">
        <button
          onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
          disabled={currentIdx === 0}
          className="px-6 py-3 bg-white text-slate-700 border border-slate-300 rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed font-bold transition-all shadow-sm"
        >
          Quay lại
        </button>

        {!isSubmitted && (
          <button
            onClick={() => {
              if(window.confirm("Xác nhận nộp bài?")) {
                setIsSubmitted(true);
              }
            }}
            className="px-8 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 font-bold shadow-md transition-all"
          >
            Nộp Bài
          </button>
        )}

        <button
          onClick={() => setCurrentIdx((prev) => Math.min(questions.length - 1, prev + 1))}
          disabled={currentIdx === questions.length - 1}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed font-bold transition-all shadow-md"
        >
          Tiếp theo
        </button>
      </div>
    </div>
    </div>
    </div>
  );
}