"use client";

import React, { useState } from "react";

type QuestionType = "single" | "multiple" | "truefalse" | "fill" | "short";

interface Question {
  id: number;
  type: QuestionType;
  question: string | React.ReactNode;
  options?: string[];
  answer: any;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    type: "single",
    question: "Lệnh `slt t2, t1, t0` tương đương với mệnh đề nào sau đây:",
    options: [
      "if t1 < t0 then t2 = 1 else t2 = 0",
      "if t1 > t0 then t2 = 1 else t2 = 0",
      "if t1 < t0 then t2 = 0 else t2 = 1",
      "if t1 > t0 then t2 = 0 else t2 = 1",
    ],
    answer: 0,
    explanation: "Lệnh `slt` (Set on Less Than) sẽ gán rd = 1 nếu rs1 < rs2, ngược lại gán rd = 0.",
  },
  {
    id: 2,
    type: "multiple",
    question: "Những lệnh nào sau đây có thể được sử dụng để xóa nội dung thanh ghi s0 về 0 trong RISC-V?",
    options: [
      "and s0, s0, zero",
      "xor s0, s0, s0",
      "xor s0, s0, zero",
      "and s0, s0, s0",
    ],
    answer: [0, 1],
    explanation: "Lệnh `and s0, s0, zero` (AND với 0) và `xor s0, s0, s0` (XOR với chính nó) đều cho kết quả bằng 0.",
  },
  {
    id: 3,
    type: "single",
    question: "Trong các khuôn dạng lệnh RISC-V (RV32I), trường opcode (mã thao tác) nằm ở vị trí nào?",
    options: ["Bit 21-25", "Bit 0-6", "Bit 25-31", "Bit 12-14"],
    answer: 1,
    explanation: "Trong RISC-V, 7 bit thấp nhất (bit 0-6) của mọi lệnh đều dành cho trường Opcode.",
  },
  {
    id: 4,
    type: "single",
    question: (
      <div>
        Cho biết giá trị của thanh ghi s1 sau khi thực hiện đoạn lệnh sau:
        <pre className="bg-gray-100 p-2 mt-2 rounded">
          <code>
            li s0, 5{"\n"}
            srli s1, s0, 1{"\n"}
            slli s1, s1, 1
          </code>
        </pre>
      </div>
    ),
    options: ["0", "4", "6", "5"],
    answer: 1,
    explanation: "5 (0101b). Dịch phải 1 bit (srli) thành 2 (0010b). Dịch trái 1 bit (slli) thành 4 (0100b).",
  },
  {
    id: 5,
    type: "single",
    question: (
      <div>
        Cho biết giá trị của biến x (đọc theo word) sau khi thực hiện đoạn mã dưới đây?
        <pre className="bg-gray-100 p-2 mt-2 rounded">
          <code>
            .data{"\n"}
            x: .word 0x01020304{"\n"}
            .text{"\n"}
            la t0, x{"\n"}
            li t1, 0x2023{"\n"}
            sb t1, 2(t0)
          </code>
        </pre>
      </div>
    ),
    options: [
      "0x01230304",
      "0x01022023",
      "0x01020304",
      "0x01022304",
      "0x01020323",
      "0x00002023",
    ],
    answer: 0,
    explanation: "RISC-V sử dụng Little Endian. x lưu trong bộ nhớ dạng byte: 04 03 02 01. `t1` có byte thấp nhất là 0x23. `sb` ghi byte 0x23 vào vị trí offset 2, ghi đè lên 02. Bộ nhớ thành: 04 03 23 01 -> đọc lên thành 0x01230304.",
  },
  {
    id: 6,
    type: "single",
    question: (
      <div>
        Giá trị của thanh ghi t0 và t1 sau khi đoạn chương trình sau được thực hiện:
        <pre className="bg-gray-100 p-2 mt-2 rounded">
          <code>
            .text{"\n"}
            li s1, 3{"\n"}
            li s2, 2{"\n"}
            slt t0, s2, s1{"\n"}
            bne t0, zero, label{"\n"}
            addi t1, zero, 1{"\n"}
            j end{"\n"}
            label:{"\n"}
            addi t1, zero, 2{"\n"}
            end:
          </code>
        </pre>
      </div>
    ),
    options: [
      "t0=1, t1=1",
      "t0=1, t1=2",
      "t0=0, t1=2",
      "t0=0, t1=1",
    ],
    answer: 1,
    explanation: "s2 (2) < s1 (3) nên t0 = 1. Lệnh bne nhảy đến label vì t0 != zero, gán t1 = 2.",
  },
  {
    id: 7,
    type: "single",
    question: (
      <div>
        Giá trị thanh ghi t3 sau khi thực hiện đoạn lệnh sau là bao nhiêu?
        <pre className="bg-gray-100 p-2 mt-2 rounded">
          <code>
            addi t1, zero, -7{"\n"}
            addi t2, zero, 2{"\n"}
            rem t3, t1, t2
          </code>
        </pre>
      </div>
    ),
    options: [
      "0xFFFFFFFF",
      "Báo lỗi",
      "0xFFFFFFFD",
      "0x00000001",
    ],
    answer: 0,
    explanation: "Phép chia lấy dư (rem) của -7 cho 2 là -1. Trong hệ 32-bit bù 2, -1 được biểu diễn là 0xFFFFFFFF.",
  },
  {
    id: 8,
    type: "fill",
    question: (
      <div>
        Đoạn chương trình sau hiển thị chuỗi ký tự gì ra màn hình Run I/O? Biết rằng 11 là số hiệu hàm dịch vụ in một ký tự (PrintChar) trong RARS.
        <pre className="bg-gray-100 p-2 mt-2 rounded">
          <code>
            .data{"\n"}
            str: .asciiz "123456"{"\n"}
            .text{"\n"}
            la a3, str{"\n"}
            li a2, 0{"\n"}
            li a7, 11{"\n"}
            loop:{"\n"}
            add a1, a2, a3{"\n"}
            lb a0, 0(a1){"\n"}
            beq a0, zero, end{"\n"}
            addi a0, a0, 1{"\n"}
            ecall{"\n"}
            addi a2, a2, 1{"\n"}
            j loop{"\n"}
            end:
          </code>
        </pre>
      </div>
    ),
    answer: "234567",
    explanation: "Vòng lặp lấy từng ký tự của chuỗi, cộng thêm 1 vào giá trị ASCII (biến '1' thành '2', '2' thành '3', v.v.) rồi mới in ra.",
  },
  {
    id: 9,
    type: "single",
    question: (
      <div>
        Chọn phát biểu đúng với chương trình sử dụng Digital Lab Sim trong RARS hoặc ngoại vi tương tự:
        <pre className="bg-gray-100 p-2 mt-2 rounded">
          <code>
            .eqv IN_ADRESS_HEXA_KEYBOARD 0xFFFF0012{"\n"}
            .data{"\n"}
            Message: .asciiz "Key is pressed\n"{"\n"}
            .text{"\n"}
            main:{"\n"}
            li t1, IN_ADRESS_HEXA_KEYBOARD{"\n"}
            li t3, 0x80{"\n"}
            sb t3, 0(t1){"\n"}
            Loop:{"\n"}
            nop{"\n"}
            nop{"\n"}
            j Loop{"\n"}
            // (Giả sử có một Exception Handler đã được cấu hình từ trước để bắt ngắt){"\n"}
            handler:{"\n"}
            li a7, 4{"\n"}
            la a0, Message{"\n"}
            ecall{"\n"}
            mret
          </code>
        </pre>
      </div>
    ),
    options: [
      "Chương trình cài đặt cơ chế thăm dò (polling), khi có phím được bấm sẽ hiện xâu ra màn hình",
      "Chương trình cài đặt cơ chế ngắt, khi có phím được bấm sẽ thực hiện chương trình phục vụ ngắt để xử lý",
      "Chương trình cài đặt cơ chế ngắt, trong đó chương trình chính sẽ gọi chương trình xử lý ngắt",
      "Chương trình cài đặt cơ chế thăm dò (polling), chương trình chính sẽ gọi hàm con",
    ],
    answer: 1,
    explanation: "Đoạn code thiết lập ngoại vi rồi rơi vào vòng lặp vô hạn (Loop). Việc in chuỗi được thực hiện trong handler, cho thấy đây là cơ chế ngắt (Interrupt).",
  },
  {
    id: 10,
    type: "single",
    question: (
      <div>
        Đoạn chương trình sau hiển thị gì ra màn hình I/O của RARS? Biết 4 là số hiệu hàm in chuỗi.
        <pre className="bg-gray-100 p-2 mt-2 rounded">
          <code>
            .data{"\n"}
            str1: .ascii "Hello"{"\n"}
            str2: .asciiz "World"{"\n"}
            .text{"\n"}
            li a7, 4{"\n"}
            la a0, str1{"\n"}
            ecall
          </code>
        </pre>
      </div>
    ),
    options: ["HelloWorld", "Hello World", "World", "Hello"],
    answer: 0,
    explanation: ".ascii không tự động thêm ký tự Null (\\0) kết thúc chuỗi. Khi ecall in str1, nó sẽ in tràn sang str2 cho tới khi gặp Null của str2. Kết quả là in ra liền nhau HelloWorld.",
  },
  {
    id: 11,
    type: "single",
    question: (
      <div>
        Chương trình sau thực hiện quét bàn phím ma trận trong công cụ RARS. Chọn phát biểu đúng:
        <pre className="bg-gray-100 p-2 mt-2 rounded">
          <code>
            .eqv OUT_ADRESS_HEXA_KEYBOARD 0xFFFF0012{"\n"}
            .eqv IN_ADRESS_HEXA_KEYBOARD 0xFFFF0014{"\n"}
            .text{"\n"}
            main:{"\n"}
            li t1, OUT_ADRESS_HEXA_KEYBOARD{"\n"}
            li t2, IN_ADRESS_HEXA_KEYBOARD{"\n"}
            polling:{"\n"}
            li t3, 0x08{"\n"}
            sb t3, 0(t1){"\n"}
            lb a0, 0(t2){"\n"}
            print:{"\n"}
            li a7, 34{"\n"}
            ecall{"\n"}
            sleep:{"\n"}
            li a0, 100{"\n"}
            li a7, 32{"\n"}
            ecall{"\n"}
            j polling
          </code>
        </pre>
      </div>
    ),
    options: [
      "Chương trình quét 1 hàng của keyboard matrix bằng cách ghi chỉ số vào 0xFFFF0014",
      "Chương trình quét 1 hàng của keyboard matrix bằng cách ghi chỉ số vào 0xFFFF0012",
      "Chương trình quét tất cả các hàng bằng phương pháp polling",
      "Chương trình chỉ quét 1 hàng cuối (row 4) bằng phương pháp polling",
    ],
    answer: 3,
    explanation: "t3 = 0x08 = 1000 trong hệ nhị phân, tương ứng với việc chọn hàng thứ 4 (hàng cuối). Code không thay đổi t3 nên chỉ quét mỗi hàng này theo phương pháp thăm dò (polling).",
  },
  {
    id: 12,
    type: "fill",
    question: "Trong RARS, vùng nhớ chứa lệnh (.text) mặc định được bắt đầu từ địa chỉ nào? (Nhập dạng Hexa 32-bit)",
    answer: "0x00400000",
    explanation: "Địa chỉ mặc định của vùng .text (chứa mã lệnh) trong cả MARS và RARS đều là 0x00400000.",
  },
  {
    id: 13,
    type: "fill",
    question: (
      <div>
        Cho biết giá trị của thanh ghi s1 (trong hệ 10) sau khi đoạn chương trình sau được thực hiện:
        <pre className="bg-gray-100 p-2 mt-2 rounded">
          <code>
            .text{"\n"}
            addi s0, zero, 0xA{"\n"}
            andi s1, s0, 0x7
          </code>
        </pre>
      </div>
    ),
    answer: "2",
    explanation: "s0 = 10 (1010b). s1 = 1010b AND 0111b (0x7) = 0010b = 2 trong hệ thập phân.",
  },
  {
    id: 14,
    type: "fill",
    question: (
      <div>
        Giả sử có đoạn chương trình như sau:
        <pre className="bg-gray-100 p-2 mt-2 rounded">
          <code>
            .data{"\n"}
            x: .word 10{"\n"}
            y: .word 11{"\n"}
            z: .word 12{"\n"}
            .text{"\n"}
            la t0, x{"\n"}
            la t1, y{"\n"}
            la t2, z
          </code>
        </pre>
        Sau khi thực hiện, t1 có giá trị là 0x10010004. Hỏi t2 có giá trị là bao nhiêu (viết dạng hexa)?
      </div>
    ),
    answer: "0x10010008",
    explanation: "Mỗi .word chiếm 4 byte. Nếu y ở địa chỉ 0x10010004 thì z (nằm ngay sau y) sẽ ở địa chỉ 0x10010004 + 4 = 0x10010008.",
  },
  {
    id: 15,
    type: "single",
    question: (
      <div>
        Đoạn chương trình sau lập trình cho Marsbot di chuyển liên tục theo hình vuông:
        <pre className="bg-gray-100 p-2 mt-2 rounded">
          <code>
            .text{"\n"}
            loop:{"\n"}
            li s0, 0xffff8010  # Heading{"\n"}
            li s1, 0xffff8050  # Move{"\n"}
            li t0, 0{"\n"}
            li t1, 1{"\n"}
            [[1]]{"\n"}
            addi t0, t0, 90{"\n"}
            [[2]]{"\n"}
            li a7, 32{"\n"}
            li a0, 2000{"\n"}
            ecall{"\n"}
            j loop
          </code>
        </pre>
        Hãy chọn các câu lệnh thích hợp điền vào chỗ trống?
      </div>
    ),
    options: [
      "[1] sb t0, 0(s0) và [2] sb t1, 0(s1)",
      "[1] sb t1, 0(s1) và [2] sb t0, 0(s0)",
      "[1] sw t1, 0(s1) và [2] sw t0, 0(s0)",
      "[1] lb t1, 0(s1) và [2] lb t0, 0(s0)",
    ],
    answer: 1,
    explanation: "[1] sb t1, 0(s1) để kích hoạt di chuyển (ghi 1 vào 0xffff8050). [2] sb t0, 0(s0) để ghi góc quay mới (heading) vào 0xffff8010.",
  },
  {
    id: 16,
    type: "single",
    question: (
      <div>
        Khi dịch thành mã máy, 2 lệnh sau đây trong RISC-V khác nhau ở trường thông tin nào?
        <pre className="bg-gray-100 p-2 mt-2 rounded">
          <code>
            and t0, t1, t2{"\n"}
            or x8, x9, x10
          </code>
        </pre>
        (Bỏ qua sự khác biệt về số hiệu thanh ghi)
      </div>
    ),
    options: [
      "Giá trị trường funct7",
      "Giá trị trường Opcode",
      "Giá trị trường funct3",
      "Cả Opcode và funct3",
    ],
    answer: 2,
    explanation: "Cả AND và OR đều là lệnh R-type chung opcode (0110011) và funct7 (0000000). Chúng chỉ khác nhau ở trường funct3 (AND là 111, OR là 110).",
  },
  {
    id: 17,
    type: "single",
    question: (
      <div>
        Đoạn lệnh nào sau đây có xảy ra hiện tượng tràn số học (Overflow logic)?
      </div>
    ),
    options: [
      "li s0, 0xFFFFFFFF\nli s1, 0x80000000\nsub s2, s0, s1",
      "li s0, 0xFFFFFFFF\nli s1, 0x80000000\nadd s2, s0, s1",
      "li s0, 0xFFFFFFFF\nli s1, 0x7FFFFFFE\nadd s2, s0, s1",
      "li s0, 0xFFFFFFFF\nli s1, 0x7FFFFFFE\nsub s2, s0, s1",
    ],
    answer: 1,
    explanation: "0xFFFFFFFF là -1, 0x80000000 là số âm nhỏ nhất (-2147483648). Phép cộng hai số âm này (-1 + -2147483648) vượt ra khỏi giới hạn lưu trữ của số nguyên 32-bit có dấu, gây tràn (overflow).",
  },
  {
    id: 18,
    type: "fill",
    question: (
      <div>
        Xác định giá trị thanh ghi a2 (ở hệ cơ số 10) sau khi đoạn chương trình sau được thực hiện:
        <pre className="bg-gray-100 p-2 mt-2 rounded">
          <code>
            .data{"\n"}
            A0: .word 1,3,5,7,9{"\n"}
            A1:{"\n"}
            .text{"\n"}
            la a0, A0{"\n"}
            la a1, A1{"\n"}
            sub a2, a1, a0
          </code>
        </pre>
      </div>
    ),
    answer: "20",
    explanation: "Mảng A0 có 5 phần tử .word. Mỗi word là 4 byte. Do đó nhãn A1 nằm cách nhãn A0 là 5 * 4 = 20 byte. Khoảng cách địa chỉ tính bằng phép trừ cho ra 20.",
  },
  {
    id: 19,
    type: "single",
    question: (
      <div>
        Biến X được khai báo như sau:
        <pre className="bg-gray-100 p-2 mt-2 rounded">
          <code>
            .data{"\n"}
            X: .word 3:4
          </code>
        </pre>
        Hỏi biến X chiếm mấy byte bộ nhớ?
      </div>
    ),
    options: ["16", "4", "12", "3"],
    answer: 0,
    explanation: "Cú pháp `giá_trị:số_lượng` khai báo một mảng. `3:4` nghĩa là khởi tạo 4 phần tử có giá trị 3. Vì là kiểu .word (4 byte) nên tổng cộng chiếm 4 * 4 = 16 byte.",
  },
  {
    id: 20,
    type: "single",
    question: "Biết rằng màn hình đồ họa Bitmap Display cho phép vẽ các điểm ảnh, mỗi pixel biểu diễn bằng 1 word. Để hiển thị ảnh kích thước 32x32 pixels thì cần dùng bao nhiêu byte?",
    options: ["4096", "3092", "2048", "1024"],
    answer: 0,
    explanation: "Tổng số pixel: 32 * 32 = 1024 pixels. Mỗi pixel chiếm 1 word (4 byte). Tổng số byte cần dùng là 1024 * 4 = 4096 byte.",
  },
  {
    id: 21,
    type: "single",
    question: "Trong lập trình hợp ngữ, khai báo nào sau đây là khai báo vùng chứa các mã lệnh của chương trình?",
    options: [".code", ".text", ".stack", ".data"],
    answer: 1,
    explanation: "Chỉ thị `.text` được dùng để đánh dấu bắt đầu vùng chứa các lệnh thực thi.",
  },
  {
    id: 22,
    type: "single",
    question: "Để thực hiện xóa các bit của byte thấp nhất (LSB) của thanh ghi s0 ta dùng lệnh nào sau đây, biết giá trị t0 = 0xFF, t1 = 0xFFFFFF00.",
    options: [
      "or s0, s0, t0",
      "xor s0, s0, t0",
      "and s0, s0, t1",
      "and s0, s0, t0",
    ],
    answer: 2,
    explanation: "Để xóa (làm bằng 0) byte LSB mà giữ nguyên các byte khác, cần AND với bitmask có 8 bit LSB bằng 0 và các bit còn lại bằng 1. Giá trị đó chính là 0xFFFFFF00 (chứa trong t1).",
  },
  {
    id: 23,
    type: "single",
    question: "Trong phần mềm RARS, Data Segment hiển thị dữ liệu ở vùng nhớ nào?",
    options: [
      "Vùng nhớ chứa lệnh",
      "Vùng nhớ chứa các thanh ghi",
      "Vùng nhớ chứa các biến",
      "Vùng nhớ ngăn xếp",
    ],
    answer: 2,
    explanation: "Data Segment là phân vùng bộ nhớ dùng để cấp phát các biến tĩnh, dữ liệu toàn cục (khai báo trong `.data`).",
  },
  {
    id: 24,
    type: "single",
    question: "Trong nhóm lệnh I-type của RV32I, ví dụ lệnh `addi t0, zero, imm`, thì giá trị số nguyên có dấu lớn nhất của toán hạng imm là bao nhiêu?",
    options: [
      "2^8 - 1",
      "2^11 - 1",
      "2^15 - 1",
      "2^31 - 1",
    ],
    answer: 1,
    explanation: "Lệnh I-type của RISC-V có trường immediate dài 12 bit có dấu. Giá trị dương lớn nhất là 2^11 - 1 (tức là 2047).",
  },
  {
    id: 25,
    type: "single",
    question: (
      <div>
        Xác định giá trị thanh ghi t2 sau khi đoạn chương trình sau được thực hiện:
        <pre className="bg-gray-100 p-2 mt-2 rounded">
          <code>
            .data{"\n"}
            A0: .word 1,2,3,4,5,6,7,8,9{"\n"}
            .text{"\n"}
            la a0, A0{"\n"}
            li t0, 1{"\n"}
            li t1, 9{"\n"}
            li t2, 0{"\n"}
            loop:{"\n"}
            slt t3, t0, t1{"\n"}
            beq t3, zero, end{"\n"}
            slli t4, t0, 2{"\n"}
            add t4, t4, a0{"\n"}
            lw t5, 0(t4){"\n"}
            add t2, t2, t5{"\n"}
            addi t0, t0, 2{"\n"}
            j loop{"\n"}
            end:
          </code>
        </pre>
      </div>
    ),
    options: ["45", "25", "0", "20"],
    answer: 3,
    explanation: "Vòng lặp tính tổng các phần tử mảng ở các chỉ số (index) t0 = 1, 3, 5, 7. A0[1]=2, A0[3]=4, A0[5]=6, A0[7]=8. Tổng = 2 + 4 + 6 + 8 = 20.",
  },
  {
    id: 26,
    type: "single",
    question: (
      <div>
        Cho đoạn lệnh sau:
        <pre className="bg-gray-100 p-2 mt-2 rounded">
          <code>
            main:{"\n"}
            li a0, -45{"\n"}
            jal func{"\n"}
            nop{"\n"}
            endmain:{"\n"}
            {"\n"}
            func:{"\n"}
            jr ra
          </code>
        </pre>
        Hỏi sau khi thực hiện câu lệnh `jr ra` (hoặc `ret`), thanh ghi PC (Program Counter) sẽ chứa địa chỉ của lệnh nào tiếp theo?
      </div>
    ),
    options: ["nop", "jr ra", "jal func", "li a0, -45"],
    answer: 0,
    explanation: "Lệnh `jal func` tự động lưu địa chỉ của lệnh kế tiếp nó (ở đây là lệnh `nop`) vào thanh ghi `ra`. Do đó, `jr ra` sẽ quay trở về `nop`.",
  },
  {
    id: 27,
    type: "single",
    question: "Các điều kiện nào cần được đảm bảo để một chương trình hợp ngữ có thể được dịch thành công sử dụng công cụ RARS?",
    options: [
      "Cần khai báo chỉ thị dịch .text",
      "Cần khai báo chỉ thị dịch .data",
      "Cần lưu file mã nguồn nếu chưa được lưu lần nào",
      "Không tồn tại các lỗi cú pháp trong chương trình",
    ],
    answer: 3,
    explanation: "Trình biên dịch (Assembler) sẽ kiểm tra cú pháp và dịch chương trình. Nếu có lỗi cú pháp, quá trình dịch sẽ thất bại.",
  },
  {
    id: 28,
    type: "single",
    question: (
      <div>
        Lựa chọn phát biểu đúng với đoạn chương trình Polling sau:
        <pre className="bg-gray-100 p-2 mt-2 rounded">
          <code>
            .eqv KEY_CODE 0xFFFF0004{"\n"}
            .eqv KEY_READY 0xFFFF0000{"\n"}
            .text{"\n"}
            li k0, KEY_CODE{"\n"}
            li k1, KEY_READY{"\n"}
            Wait:{"\n"}
            lw t1, 0(k1){"\n"}
            beq t1, zero, Wait{"\n"}
            lw t0, 0(k0)
          </code>
        </pre>
      </div>
    ),
    options: [
      "Chờ có 1 phím sẵn sàng thì xuất mã phím đó ra màn hình",
      "Chờ có 1 phím sẵn sàng thì đọc mã phím đó lưu vào thanh ghi t0",
      "Đọc mã phím lưu vào thanh ghi t1, đọc trạng thái bàn phím lưu vào thanh ghi t0",
      "Chờ có 1 phím sẵn sàng thì đọc mã phím đó lưu vào thanh ghi t1",
    ],
    answer: 1,
    explanation: "Chương trình liên tục đọc trạng thái (KEY_READY) vào t1. Nếu t1 bằng 0, nó lặp lại. Khi t1 khác 0 (phím sẵn sàng), nó thoát lặp và đọc giá trị phím (KEY_CODE) vào thanh ghi t0.",
  },
  {
    id: 29,
    type: "single",
    question: (
      <div>
        Thiết bị Bitmap Display được thiết lập Unit Width = 16, Display Width = 256. Để thiết lập màu đỏ (0x00FF0000) cho điểm ảnh tại vị trí hàng 3, cột 3 (đánh số từ 1, gốc trên cùng bên trái) thì đoạn chương trình nào đúng?
      </div>
    ),
    options: [
      "li a0, 0x10010000; li a1, 0x00FF00FF; sw a1, 36(a0)",
      "li a0, 0x10010000; li a1, 0x00FF00FF; sw a1, 136(a0)",
      "li a0, 0x10010000; li a1, 0x00FF0000; sw a1, 36(a0)",
      "li a0, 0x10010000; li a1, 0x00FF0000; sw a1, 136(a0)",
    ],
    answer: 3,
    explanation: "Mỗi hàng có 256/16 = 16 pixel. Hàng 3, cột 3 (index hệ 0 là hàng 2, cột 2). Offset = (2 * 16 + 2) * 4 byte = 34 * 4 = 136. Mã màu đỏ là 0x00FF0000.",
  },
  {
    id: 30,
    type: "fill",
    question: (
      <div>
        Xác định giá trị của thanh ghi s0 (hệ cơ số 10) sau khi đoạn chương trình sau được thực hiện:
        <pre className="bg-gray-100 p-2 mt-2 rounded">
          <code>
            .text{"\n"}
            addi sp, sp, -4{"\n"}
            li s0, 555{"\n"}
            sw s0, 0(sp){"\n"}
            lb s0, 0(sp){"\n"}
            addi sp, sp, 4
          </code>
        </pre>
      </div>
    ),
    answer: "43",
    explanation: "555 là 0x0000022B. Lệnh `sw` ghi 4 byte lên Stack (kiểu Little Endian: 2B 02 00 00). Lệnh `lb` đọc đúng 1 byte ở địa chỉ thấp nhất (0x2B = 43) và sign-extend vào s0.",
  },
  {
    id: 31,
    type: "single",
    question: (
      <div>
        Đâu là mã máy dạng Hexa của lệnh `add t0, t1, t2` trong RV32I?
        <br />
        Biết rằng: t0=x5, t1=x6, t2=x7. Lệnh add có opcode = 0110011 (0x33), funct3 = 000, funct7 = 0000000.
      </div>
    ),
    options: [
      "0x007342B3",
      "0x012A4020",
      "0x00734293",
      "0x00000033",
    ],
    answer: 0,
    explanation: "Mã hóa: funct7(0000000) rs2(00111) rs1(00110) funct3(000) rd(00101) opcode(0110011). \nNhị phân: 0000000_00111_00110_000_00101_0110011 = 0000_0000_0111_0011_0100_0010_1011_0011 = 0x007342B3.",
  },
  {
    id: 32,
    type: "single",
    question: (
      <div>
        2 LED 7 thanh có địa chỉ byte được định nghĩa như sau:
        <pre className="bg-gray-100 p-2 mt-2 rounded">
          <code>
            .eqv SEVENSEG_LEFT 0xFFFF0011{"\n"}
            .eqv SEVENSEG_RIGHT 0xFFFF0010
          </code>
        </pre>
        Để hiển thị số 9 trên LED TRÁI, đoạn lệnh nào đúng? (Biết mã hiển thị số 9 là 0x6F)
      </div>
    ),
    options: [
      "li t0, 0xFFFF0010; li a0, 0x7D; sb a0, 0(t0)",
      "li t0, 0xFFFF0018; li a0, 0x6F; sb a0, 0(t0)",
      "li t0, 0xFFFF0011; li a0, 0x7D; sb a0, 0(t0)",
      "li t0, 0xFFFF0011; li a0, 0x6F; sb a0, 0(t0)",
    ],
    answer: 3,
    explanation: "Ghi mã 0x6F vào địa chỉ của LED trái (0xFFFF0011).",
  },
  {
    id: 33,
    type: "single",
    question: "Lệnh nào sau đây KHÔNG PHẢI là giả lệnh (Pseudo Instruction) trong RISC-V?",
    options: [
      "add t0, zero, 2048",
      "addi t0, zero, 2048",
      "addi t0, zero, 2047",
      "li t0, 2047",
    ],
    answer: 2,
    explanation: "Giá trị Immediate của lệnh I-type tối đa là 12-bit có dấu (từ -2048 đến +2047). `addi t0, zero, 2047` là lệnh thật. `addi` có hằng > 2047 hoặc `li` đều là giả lệnh trình biên dịch tự động tách thành lui/addi.",
  },
  {
    id: 34,
    type: "single",
    question: "Lựa chọn nào là lệnh hợp ngữ tương ứng với mã máy 0x00130313 trong RISC-V, biết rằng đây là mã máy của lệnh addi.",
    options: [
      "addi t2, t2, 1",
      "addi t3, t3, 1",
      "addi t1, t1, 1",
      "addi t0, t0, 1",
    ],
    answer: 2,
    explanation: "0x00130313 nhị phân là 000000000001_00110_000_00110_0010011. Khớp theo định dạng I-type: imm = 1, rs1 = 00110 (x6, tức là t1), rd = 00110 (t1), opcode = 0010011 (addi). Vậy đây là lệnh `addi t1, t1, 1`.",
  },
  {
    id: 35,
    type: "single",
    question: "Lệnh `slli s0, s0, 3` thuộc khuôn dạng lệnh nào trong RV32I?",
    options: ["R-type", "I-type", "S-type", "U-type"],
    answer: 1,
    explanation: "Các lệnh dịch bit chứa lượng dịch tĩnh (shamt) như `slli`, `srli`, `srai` trong RISC-V thuộc khuôn dạng I-type (lượng dịch đóng vai trò là một hằng số immediate).",
  },
  {
    id: 36,
    type: "single",
    question: (
      <div>
        Chọn phát biểu đúng khi thực hiện chương trình sau trong RISC-V:
        <pre className="bg-gray-100 p-2 mt-2 rounded">
          <code>
            .text{"\n"}
            addi t0, zero, 1{"\n"}
            jal f1{"\n"}
            addi t0, zero, 2{"\n"}
            f1:{"\n"}
            addi t0, zero, 3{"\n"}
            jal f2{"\n"}
            addi t0, zero, 4{"\n"}
            f2:{"\n"}
            jr ra{"\n"}
            addi t0, zero, 5{"\n"}
            jr ra
          </code>
        </pre>
      </div>
    ),
    options: [
      "Sau khi chương trình kết thúc t0 = 5",
      "Sau khi chương trình kết thúc t0 = 4",
      "Chương trình bị lặp vô hạn, không dừng",
      "Sau khi chương trình kết thúc t0 = 2",
    ],
    answer: 2,
    explanation: "Khi gọi `jal f2`, thanh ghi liên kết `ra` bị ghi đè thành địa chỉ của lệnh `addi t0, zero, 4` (làm mất giá trị `ra` cũ của f1). Ở hàm f2 gọi `jr ra` quay về lại `addi t0, zero, 4`, sau đó chạy `addi t0, zero, 5`, rồi lại `jr ra`... PC tiếp tục nhảy về `addi t0, zero, 4` gây vòng lặp vô hạn.",
  },
  {
    id: 37,
    type: "single",
    question: "Câu lệnh giả (pseudo instruction) `la a0, 0x10203040` sau khi biên dịch trong RARS sẽ chiếm tổng cộng mấy byte bộ nhớ mã lệnh (.text)?",
    options: ["2", "4", "8", "16"],
    answer: 2,
    explanation: "Lệnh la (hoặc li đối với số nguyên 32 bit) sẽ được biên dịch tách thành 2 lệnh: 1 lệnh `lui` và 1 lệnh `addi`. Mỗi lệnh dài 4 byte, tổng cộng là 8 byte.",
  },
  {
    id: 38,
    type: "single",
    question: (
      <div>
        Dữ liệu của chương trình được khai báo như sau:
        <pre className="bg-gray-100 p-2 mt-2 rounded">
          <code>
            .data{"\n"}
            msg: .asciiz "SoICT"{"\n"}
            X: .word 20232
          </code>
        </pre>
        Biết rằng vùng nhớ cấp phát bắt đầu từ địa chỉ 0x10010000. Hỏi biến X được lưu trữ bắt đầu từ địa chỉ nào?
      </div>
    ),
    options: ["0x10010005", "0x10010000", "0x10010008", "0x10010006"],
    answer: 2,
    explanation: "Chuỗi 'SoICT' cộng với ký tự Null (\\0) là 6 byte (chiếm từ địa chỉ 00 đến 05). Biến X là kiểu .word nên cần Address Alignment (địa chỉ chia hết cho 4). Do đó, trình biên dịch sẽ chèn đệm 2 byte để đẩy X đến địa chỉ 0x10010008.",
  },
  {
    id: 39,
    type: "single",
    question: "Trong mã máy của một lệnh khuôn dạng I-type thuộc RV32I, các bit từ 20 đến 24 (lưu trữ lượng dịch - shamt) mang giá trị khác 0. Hỏi lệnh hợp ngữ này có thể là lệnh nào dưới đây?",
    options: ["slli", "add", "slt", "div"],
    answer: 0,
    explanation: "Chỉ các lệnh dịch bit tĩnh (Shift có chữ i phía sau như slli, srli, srai) mới sử dụng trường từ bit 20 đến 24 trong I-type để lưu trữ hằng số shamt (Shift Amount).",
  },
  {
    id: 40,
    type: "single",
    question: "Hằng số 2 trong lệnh `slli s1, s0, 2` được mã hóa vào vị trí nào trong khuôn dạng lệnh I-type của RV32I?",
    options: [
      "Mã hóa từ bit 6 đến bit 10",
      "Mã hóa từ bit 0 đến bit 5",
      "Mã hóa từ bit 20 đến bit 24",
      "Mã hóa từ bit 11 đến bit 15",
    ],
    answer: 2,
    explanation: "Trong lệnh I-type, trường chứa hằng số (Immediate) kéo dài từ bit 20 đến 31. Riêng đối với lệnh dịch bit tĩnh, 5 bit thấp của Immediate (từ bit 20 đến bit 24) được sử dụng để mã hóa lượng dịch (shamt).",
  },
];

export default function ExamApp() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: any }>({});
  const [submitted, setSubmitted] = useState(false);

  const question = questions[currentIdx];

  const handleSelectSingle = (optionIdx: number) => {
    if (submitted) return;
    setAnswers({ ...answers, [question.id]: optionIdx });
  };

  const handleSelectMultiple = (optionIdx: number) => {
    if (submitted) return;
    const current = answers[question.id] || [];
    if (current.includes(optionIdx)) {
      setAnswers({ ...answers, [question.id]: current.filter((x: number) => x !== optionIdx) });
    } else {
      setAnswers({ ...answers, [question.id]: [...current, optionIdx] });
    }
  };

  const handleInputFill = (value: string) => {
    if (submitted) return;
    setAnswers({ ...answers, [question.id]: value });
  };

  const getScore = () => {
    let score = 0;
    questions.forEach((q) => {
      const userAns = answers[q.id];
      if (q.type === "single" || q.type === "truefalse") {
        if (userAns === q.answer) score++;
      } else if (q.type === "multiple") {
        if (
          Array.isArray(userAns) &&
          userAns.length === q.answer.length &&
          userAns.every((val) => q.answer.includes(val))
        ) {
          score++;
        }
      } else if (q.type === "fill" || q.type === "short") {
        if (
          userAns &&
          typeof userAns === "string" &&
          userAns.trim().toLowerCase() === String(q.answer).trim().toLowerCase()
        ) {
          score++;
        }
      }
    });
    return score;
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

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-700">Ôn tập Thực hành Kiến trúc máy tính (RISC-V)</h1>
          <p className="text-sm text-gray-500 mt-2">Tổng số: {questions.length} câu | Được chuyển đổi sang kiến trúc RV32I</p>
        </header>

        {submitted && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6 font-semibold">
            Điểm của bạn: {getScore()} / {questions.length}
          </div>
        )}

        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-gray-600">Câu hỏi {currentIdx + 1} / {questions.length}</span>
            {submitted && (
              <span className={`px-3 py-1 rounded text-sm font-bold ${isCorrect(question) ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                {isCorrect(question) ? "Đúng" : "Sai"}
              </span>
            )}
          </div>
          
          <div className="text-lg mb-6 leading-relaxed">
            {question.question}
          </div>

          <div className="space-y-3">
            {question.type === "single" &&
              question.options?.map((opt, idx) => {
                const isSelected = answers[question.id] === idx;
                const isAns = question.answer === idx;
                let optionStyle = "border-gray-300 hover:bg-blue-50";
                
                if (submitted) {
                  if (isAns) optionStyle = "bg-green-100 border-green-500 font-bold";
                  else if (isSelected) optionStyle = "bg-red-100 border-red-500";
                  else optionStyle = "opacity-50";
                } else if (isSelected) {
                  optionStyle = "bg-blue-100 border-blue-500";
                }

                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectSingle(idx)}
                    className={`p-3 border rounded cursor-pointer transition-colors ${optionStyle}`}
                  >
                    <div className="flex items-center">
                      <input
                        type="radio"
                        checked={isSelected}
                        readOnly
                        className="mr-3 w-4 h-4 text-blue-600"
                      />
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
                let optionStyle = "border-gray-300 hover:bg-blue-50";

                if (submitted) {
                  if (isAns) optionStyle = "bg-green-100 border-green-500 font-bold";
                  else if (isSelected) optionStyle = "bg-red-100 border-red-500";
                  else optionStyle = "opacity-50";
                } else if (isSelected) {
                  optionStyle = "bg-blue-100 border-blue-500";
                }

                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectMultiple(idx)}
                    className={`p-3 border rounded cursor-pointer transition-colors ${optionStyle}`}
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        readOnly
                        className="mr-3 w-4 h-4 text-blue-600 rounded"
                      />
                      <span className="whitespace-pre-wrap">{opt}</span>
                    </div>
                  </div>
                );
              })}

            {(question.type === "fill" || question.type === "short") && (
              <div>
                <input
                  type="text"
                  className={`w-full p-3 border rounded outline-none ${
                    submitted
                      ? isCorrect(question)
                        ? "bg-green-100 border-green-500"
                        : "bg-red-100 border-red-500"
                      : "focus:border-blue-500"
                  }`}
                  placeholder="Nhập câu trả lời của bạn..."
                  value={answers[question.id] || ""}
                  onChange={(e) => handleInputFill(e.target.value)}
                  readOnly={submitted}
                />
                {submitted && !isCorrect(question) && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-300 rounded">
                    <p className="text-sm text-green-700 font-semibold mb-1">Đáp án đúng:</p>
                    <p>{question.answer}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {submitted && (
            <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
              <h4 className="font-bold text-yellow-800 mb-1">Giải thích:</h4>
              <p className="text-sm text-yellow-900 leading-relaxed whitespace-pre-wrap">{question.explanation}</p>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
            disabled={currentIdx === 0}
            className="px-5 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            Quay lại
          </button>

          {!submitted && (
            <button
              onClick={() => setSubmitted(true)}
              className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-bold shadow"
            >
              Nộp bài
            </button>
          )}

          <button
            onClick={() => setCurrentIdx((prev) => Math.min(questions.length - 1, prev + 1))}
            disabled={currentIdx === questions.length - 1}
            className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow"
          >
            Tiếp theo
          </button>
        </div>
      </div>
    </div>
  );
}