"use client";

import React, { useState, useEffect } from "react";

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
    question: "Trong kiến trúc RISC-V (RV32I), thanh ghi nào luôn giữ giá trị bằng 0 và mọi thao tác ghi vào thanh ghi này đều bị bỏ qua?",
    options: ["x1 (ra)", "x2 (sp)", "x0 (zero)", "x3 (gp)"],
    answer: 2,
    explanation: "Thanh ghi x0 (zero) được nối cứng (hardwired) với giá trị 0. Điều này giúp tối ưu hóa tập lệnh, biến nhiều thao tác phức tạp thành giả lệnh (pseudo-instruction) bằng cách sử dụng x0."
  },
  {
    id: 2,
    type: "single",
    question: "Theo quy ước gọi hàm (Calling Convention) chuẩn của RISC-V, nhóm thanh ghi nào sau đây thuộc loại Callee-saved (hàm được gọi phải bảo toàn giá trị)?",
    options: ["t0 - t6", "a0 - a7", "s0 - s11", "ra, sp"],
    answer: 2,
    explanation: "Các thanh ghi 's' (Saved registers) là Callee-saved. Nếu hàm con muốn sử dụng chúng, nó phải cất giá trị cũ vào stack và khôi phục trước khi kết thúc hàm."
  },
  {
    id: 3,
    type: "fill",
    question: "Hàm dịch vụ hệ thống (Syscall) trong RARS để ĐỌC một số nguyên từ bàn phím yêu cầu truyền số hiệu dịch vụ vào thanh ghi a7. Số hiệu đó là bao nhiêu?",
    answer: "5",
    explanation: "Syscall 5 (Read Integer) sẽ dừng chương trình chờ người dùng nhập số nguyên, sau đó lưu giá trị đọc được vào thanh ghi a0."
  },
  {
    id: 4,
    type: "single",
    question: (
      <div>
        Lệnh `lb t0, 0(t1)` và `lbu t0, 0(t1)` khác nhau như thế nào khi giá trị byte được đọc từ bộ nhớ là 0xFF?
      </div>
    ),
    options: [
      "Không có sự khác biệt, t0 đều mang giá trị 0x000000FF",
      "lb sẽ mở rộng dấu thành 0xFFFFFFFF, lbu sẽ chèn 0 thành 0x000000FF",
      "lb sẽ chèn 0 thành 0x000000FF, lbu sẽ mở rộng dấu thành 0xFFFFFFFF",
      "Cả hai lệnh đều báo lỗi vì 0xFF là số âm"
    ],
    answer: 1,
    explanation: "lb (Load Byte) thực hiện sign-extend (mở rộng bit dấu) nên byte 0xFF có bit cao nhất là 1 sẽ thành 0xFFFFFFFF. lbu (Load Byte Unsigned) thực hiện zero-extend thành 0x000000FF."
  },
  {
    id: 5,
    type: "single",
    question: "Khai báo `.space 100` trong phân vùng `.data` của chương trình RARS có tác dụng gì?",
    options: [
      "Khởi tạo mảng có 100 phần tử, mỗi phần tử 4 byte",
      "Tạo ra 100 ký tự khoảng trắng (Space)",
      "Cấp phát một khối nhớ trống liên tục kích thước 100 byte và khởi tạo bằng 0",
      "Căn chỉnh địa chỉ bộ nhớ (align) chia hết cho 100"
    ],
    answer: 2,
    explanation: "Chỉ thị `.space n` (hoặc `.skip n`) yêu cầu Assembler dành riêng n byte liên tiếp trong vùng Data Segment và điền giá trị 0."
  },
  {
    id: 6,
    type: "single",
    question: "Trường funct3 và funct7 trong khuôn dạng lệnh R-type (RV32I) có vai trò gì?",
    options: [
      "Chứa giá trị hằng số Immediate",
      "Phân biệt các thao tác khác nhau có cùng Opcode (ví dụ ADD và SUB)",
      "Lưu trữ địa chỉ của lệnh tiếp theo",
      "Mã hóa thanh ghi đích (rd)"
    ],
    answer: 1,
    explanation: "Các lệnh số học R-type dùng chung một Opcode (0110011). Để CPU biết đó là lệnh ADD, SUB, hay XOR, nó phải kiểm tra thêm các bit ở trường funct3 và funct7."
  },
  {
    id: 7,
    type: "single",
    question: "Giá trị dương lớn nhất mà toán hạng Immediate trong lệnh I-type của RV32I có thể biểu diễn là bao nhiêu?",
    options: ["2^7 - 1", "2^11 - 1", "2^15 - 1", "2^31 - 1"],
    answer: 1,
    explanation: "Lệnh I-type dành 12 bit cho phần Immediate có dấu (bù 2). Giá trị dương lớn nhất biểu diễn được là 2^11 - 1 (tức là 2047)."
  },
  {
    id: 8,
    type: "single",
    question: (
      <div>
        Thực hiện đoạn lệnh sau, giá trị của thanh ghi t1 là bao nhiêu (viết dưới dạng số nguyên có dấu)?
        <pre className="bg-slate-100 p-3 mt-3 rounded-lg border border-slate-200">
          <code>
            li t0, -8{"\n"}
            srai t1, t0, 2
          </code>
        </pre>
      </div>
    ),
    options: ["-2", "2", "-32", "1073741822"],
    answer: 0,
    explanation: "Lệnh srai (Shift Right Arithmetic Immediate) dịch phải và giữ nguyên bit dấu. Dịch phải số nguyên 2 bit tương đương với việc chia cho 4. Vậy -8 / 4 = -2."
  },
  {
    id: 9,
    type: "single",
    question: "Khi biên dịch giả lệnh `li t0, 0x12345678`, Assembler RARS sẽ tách thành 2 lệnh nguyên thủy nào?",
    options: [
      "lui t0, 0x12345 và ori t0, t0, 0x678",
      "lui t0, 0x12345 và addi t0, t0, 0x678",
      "lui t0, 0x12345 và slli t0, t0, 12",
      "auipc t0, 0x12345 và addi t0, t0, 0x678"
    ],
    answer: 1,
    explanation: "Để tải một số 32-bit đầy đủ, RARS kết hợp `lui` (tải 20 bit cao) và `addi` (cộng 12 bit thấp). Lưu ý: nếu 12 bit thấp là số âm, RARS sẽ tự cộng thêm 1 vào phần `lui` để bù dấu."
  },
  {
    id: 10,
    type: "single",
    question: (
      <div>
        Cho biết giá trị của a1 sau khi đoạn mã thực thi. Biết bộ nhớ sử dụng kiến trúc Little-Endian.
        <pre className="bg-slate-100 p-3 mt-3 rounded-lg border border-slate-200">
          <code>
            .data{"\n"}
            A0: .word 0x11223344{"\n"}
            .text{"\n"}
            la a0, A0{"\n"}
            lh a1, 0(a0)
          </code>
        </pre>
      </div>
    ),
    options: ["0x1122", "0x3344", "0x00003344", "0xFFFF3344"],
    answer: 2,
    explanation: "Little-Endian lưu trữ: 44 33 22 11. `lh` đọc 2 byte ở địa chỉ thấp (44 và 33) tạo thành 0x3344. Vì bit cao nhất của số 0x3344 là 0, khi mở rộng dấu nó vẫn là 0x00003344."
  },
  {
    id: 11,
    type: "single",
    question: "Để tính khoảng cách địa chỉ giữa phần tử `array[0]` và `array[5]` trong một mảng số nguyên (kiểu .word), kết quả là bao nhiêu byte?",
    options: ["5", "10", "20", "24"],
    answer: 2,
    explanation: "Mỗi phần tử `.word` chiếm 4 byte. Khoảng cách địa chỉ từ index 0 đến index 5 là 5 * 4 = 20 byte."
  },
  {
    id: 12,
    type: "multiple",
    question: "Những lệnh nhảy nhánh nào sau đây là lệnh nhảy CÓ ĐIỀU KIỆN (Conditional Branch) trong RISC-V?",
    options: ["jal", "bgeu", "blt", "jalr"],
    answer: [1, 2],
    explanation: "`bgeu` (Branch if Greater/Equal Unsigned) và `blt` (Branch if Less Than) là các lệnh rẽ nhánh có điều kiện B-type. `jal` và `jalr` là lệnh nhảy không điều kiện."
  },
  {
    id: 13,
    type: "single",
    question: (
      <div>
        Tại sao vòng lặp tính chiều dài chuỗi sau bị lặp vô hạn?
        <pre className="bg-slate-100 p-3 mt-3 rounded-lg border border-slate-200">
          <code>
            la t0, string{"\n"}
            li t1, 0{"\n"}
            loop:{"\n"}
            lbu t2, 0(t0){"\n"}
            beq t2, zero, exit{"\n"}
            addi t1, t1, 1{"\n"}
            j loop{"\n"}
            exit:
          </code>
        </pre>
      </div>
    ),
    options: [
      "Quên lệnh cập nhật thanh ghi chứa địa chỉ con trỏ chuỗi (t0)",
      "Dùng sai lệnh lbu, phải dùng lw",
      "Khởi tạo t1 sai giá trị",
      "Điều kiện so sánh thoát vòng lặp beq bị ngược"
    ],
    answer: 0,
    explanation: "Trong thân vòng lặp, con trỏ chuỗi `t0` không được tăng lên (`addi t0, t0, 1`), khiến vòng lặp luôn chỉ đọc ký tự đầu tiên mãi mãi."
  },
  {
    id: 14,
    type: "single",
    question: "Ngăn xếp (Stack) trong RISC-V phát triển theo chiều nào và thanh ghi nào được dùng làm con trỏ ngăn xếp?",
    options: [
      "Phát triển từ địa chỉ thấp lên địa chỉ cao, dùng thanh ghi sp (x2)",
      "Phát triển từ địa chỉ cao xuống địa chỉ thấp, dùng thanh ghi sp (x2)",
      "Phát triển từ địa chỉ cao xuống địa chỉ thấp, dùng thanh ghi gp (x3)",
      "Phát triển từ địa chỉ thấp lên địa chỉ cao, dùng thanh ghi fp (x8)"
    ],
    answer: 1,
    explanation: "Stack của RISC-V là loại 'Grow down' (từ địa chỉ lớn xuống nhỏ). Do đó, khi Push dữ liệu, ta trừ `sp` đi kích thước cần cấp phát. `sp` là x2."
  },
  {
    id: 15,
    type: "short",
    question: (
      <div>
        Viết 2 dòng lệnh Assembly (RISC-V) để cất giá trị thanh ghi `ra` vào đỉnh ngăn xếp (Stack), giả sử mỗi phần tử chiếm 4 byte.
      </div>
    ),
    answer: "addi sp, sp, -4\nsw ra, 0(sp)",
    explanation: "Đầu tiên giảm con trỏ sp đi 4 byte để tạo chỗ trống (grow down). Sau đó dùng lệnh ghi bộ nhớ `sw` cất thanh ghi `ra` vào vị trí sp vừa cấp phát."
  },
  {
    id: 16,
    type: "single",
    question: "Khi gọi một hàm đệ quy (Recursive function) nhiều lần lồng nhau bằng lệnh `jal`, nếu lập trình viên quên không lưu thanh ghi `ra` vào Stack thì hậu quả là gì?",
    options: [
      "Trình biên dịch báo lỗi Syntax Error",
      "Lỗi Access Violation (Segmentation Fault) do truy cập bộ nhớ cấm",
      "Chương trình chạy bình thường nhưng kết quả toán học bị sai",
      "Hàm không thể quay trở về điểm xuất phát (Caller) ban đầu, rơi vào lặp vô hạn hoặc thoát sai"
    ],
    answer: 3,
    explanation: "Mỗi lệnh `jal` sẽ ghi đè địa chỉ trở về mới lên thanh ghi `ra`. Nếu không lưu `ra` cũ vào stack, khi gọi `jr ra` nó chỉ biết nhảy về địa chỉ của lần gọi cuối cùng, mất dấu hàm Caller gốc."
  },
  {
    id: 17,
    type: "single",
    question: "Sự khác biệt giữa lệnh `bge` và `bgeu` khi so sánh t0 = -1 (0xFFFFFFFF) và t1 = 1 (0x00000001) là gì?",
    options: [
      "bge nhảy, bgeu không nhảy",
      "bge không nhảy, bgeu nhảy",
      "Cả hai đều nhảy",
      "Cả hai đều không nhảy"
    ],
    answer: 1,
    explanation: "bge so sánh CÓ DẤU (-1 >= 1 là SAI -> Không nhảy). bgeu so sánh KHÔNG DẤU (0xFFFFFFFF >= 0x00000001 là ĐÚNG vì 0xFFFFFFFF là số dương lớn nhất -> Nhảy)."
  },
  {
    id: 18,
    type: "single",
    question: "Trong kiến trúc RISC-V, khi thực hiện phép cộng số nguyên có dấu bằng lệnh `add` và xảy ra hiện tượng tràn số (Overflow logic), CPU sẽ làm gì?",
    options: [
      "Bật cờ ngắt Overflow và nhảy vào Exception Handler",
      "Treo chương trình và báo lỗi phần cứng",
      "CPU không sinh lỗi tự động, kết quả bị cắt cụt/tràn dấu im lặng",
      "Kết quả tự động được lưu vào một thanh ghi dự phòng hi/lo"
    ],
    answer: 2,
    explanation: "Không giống như MIPS (lệnh add sinh exception, addu thì không), RISC-V quyết định loại bỏ mọi overflow exception sinh ra từ lệnh số học để đơn giản hóa kiến trúc. Lập trình viên phải tự kiểm tra nhánh nếu cần."
  },
  {
    id: 19,
    type: "single",
    question: (
      <div>
        Thuật toán trong đoạn mã dưới đây dùng để làm gì?
        <pre className="bg-slate-100 p-3 mt-3 rounded-lg border border-slate-200">
          <code>
            la a0, arr{"\n"}
            lw t0, 0(a0){"\n"}
            lw t1, 4(a0){"\n"}
            sw t1, 0(a0){"\n"}
            sw t0, 4(a0)
          </code>
        </pre>
      </div>
    ),
    options: [
      "Tính tổng 2 phần tử đầu tiên",
      "Sao chép phần tử thứ 1 sang phần tử thứ 2",
      "Hoán đổi (Swap) giá trị của 2 phần tử đầu tiên trong mảng",
      "Xóa mảng"
    ],
    answer: 2,
    explanation: "Đọc phần tử ở index 0 và 1 lên t0, t1. Sau đó lưu ngược t1 xuống index 0 và t0 xuống index 1. Đây là thao tác Swap."
  },
  {
    id: 20,
    type: "single",
    question: "Trong lập trình giao tiếp I/O với RARS (ví dụ Keyboard Matrix), nhược điểm lớn nhất của phương pháp Thăm dò (Polling) là gì?",
    options: [
      "Phải viết mã nguồn quá dài và phức tạp",
      "Lãng phí tài nguyên CPU do CPU phải chạy vòng lặp liên tục để kiểm tra trạng thái phần cứng",
      "Không bắt được sự kiện nếu có ngắt xảy ra",
      "Thiết bị ngoại vi không hỗ trợ Polling"
    ],
    answer: 1,
    explanation: "Polling ép CPU rơi vào trạng thái 'busy-waiting' (vòng lặp vô hạn đọc biến trạng thái), tốn 100% tài nguyên chỉ để chờ một thao tác rất chậm (bấm phím)."
  },
  {
    id: 21,
    type: "single",
    question: "Trong hệ thống ngắt/ngoại lệ của RISC-V, thanh ghi CSR nào chứa ĐỊA CHỈ của lệnh đã gây ra sự kiện ngoại lệ, để CPU có thể quay lại sau khi xử lý xong?",
    options: ["mtvec", "mcause", "mstatus", "mepc"],
    answer: 3,
    explanation: "`mepc` (Machine Exception Program Counter) lưu trữ giá trị PC lúc xảy ra ngoại lệ. Lệnh `mret` sẽ lấy giá trị từ đây nạp lại vào PC."
  },
  {
    id: 22,
    type: "single",
    question: "Trên thanh ghi điều khiển mstatus, bit MIE (Machine Interrupt Enable) có chức năng gì?",
    options: [
      "Lưu mã định danh của lỗi (Error Code)",
      "Bật/Tắt (Enable/Disable) việc tiếp nhận ngắt cục bộ cho toàn hệ thống ở chế độ Machine",
      "Cấu hình địa chỉ cơ sở của bảng Vector ngắt",
      "Báo hiệu bàn phím đã có dữ liệu"
    ],
    answer: 1,
    explanation: "Bit MIE hoạt động như một công tắc tổng. Nếu MIE = 0, CPU sẽ phớt lờ mọi yêu cầu ngắt từ ngoại vi."
  },
  {
    id: 23,
    type: "single",
    question: "Trong RARS Digital Lab Sim, bàn phím ma trận (Hexa Keyboard) có cơ chế I/O Mapped Memory. Thanh ghi Row (OUT_ADDRESS) để kích hoạt hàng nằm ở địa chỉ nào?",
    options: ["0xFFFF0012", "0xFFFF0014", "0xFFFF0010", "0xFFFF8010"],
    answer: 0,
    explanation: "Đầu ra ghi chọn hàng (Row write) là 0xFFFF0012. Đầu vào đọc cột (Col read) là 0xFFFF0014."
  },
  {
    id: 24,
    type: "single",
    question: (
      <div>
        Đèn LED 7 thanh trong RARS quy định mỗi đoạn mã hóa bằng 1 bit (DP G F E D C B A). Để hiển thị chữ số '1' (bật đoạn B và C), ta phải gửi mã nhị phân nào?
      </div>
    ),
    options: ["0x06", "0x3F", "0x4F", "0x5B"],
    answer: 0,
    explanation: "Đoạn B (bit 1) và C (bit 2) được bật. Chuỗi bit là 00000110. Đổi ra Hexa là 0x06."
  },
  {
    id: 25,
    type: "single",
    question: "Trong công cụ Bitmap Display, nếu Unit Width = 16, Display Width = 256. Để tính toán độ dời offset của pixel (mỗi pixel 4 byte) ở tọa độ cột x và hàng y (bắt đầu từ 0), công thức nào đúng?",
    options: [
      "Offset = (y * 16 + x) * 4",
      "Offset = (y * 256 + x) * 4",
      "Offset = (x * 16 + y) * 4",
      "Offset = (x * 256 + y) * 4"
    ],
    answer: 0,
    explanation: "Số pixel trên mỗi hàng = Display Width / Unit Width = 256 / 16 = 16. Do đó Offset tổng bằng (y * 16 + x) * kích thước pixel (4 byte)."
  },
  {
    id: 26,
    type: "fill",
    question: (
      <div>
        Điền giá trị của thanh ghi t1 sau khi thực thi đoạn mã sau (Dạng thập phân):
        <pre className="bg-slate-100 p-3 mt-3 rounded-lg border border-slate-200">
          <code>
            .data{"\n"}
            msg: .asciiz "SoICT"{"\n"}
            .text{"\n"}
            la t0, msg{"\n"}
            lbu t1, 2(t0)
          </code>
        </pre>
      </div>
    ),
    answer: "73",
    explanation: "Ký tự thứ 3 (offset 2) của 'SoICT' là chữ 'I'. Mã ASCII của 'I' là 73 (0x49)."
  },
  {
    id: 27,
    type: "single",
    question: "Chỉ thị `.eqv MAX 100` trong hợp ngữ có tác dụng tương tự từ khóa nào trong ngôn ngữ C?",
    options: ["#include", "typedef", "#define", "int MAX = 100;"],
    answer: 2,
    explanation: "Chỉ thị `.eqv` (Equate) khai báo một Macro tìm kiếm và thay thế toàn văn. Mỗi lần chuỗi 'MAX' xuất hiện, Assembler thay nó bằng '100', giống hệt '#define' trong C."
  },
  {
    id: 28,
    type: "single",
    question: "Trong điều khiển Marsbot giả lập, để kích hoạt di chuyển tịnh tiến, lệnh nào cần được ghi 1 vào địa chỉ 0xFFFF8050?",
    options: ["lw", "sb", "sw", "lh"],
    answer: 1,
    explanation: "Thanh ghi điều khiển Move ngoại vi MMIO của Marsbot yêu cầu ghi 1 byte (hoặc sw tùy cài đặt, nhưng phổ biến nhất là ghi byte kích hoạt) với lệnh Store. Các đáp án read (lw, lh) là sai, ghi phải là sb hoặc sw."
  },
  {
    id: 29,
    type: "single",
    question: "Với khai báo `arr: .word 5:3`, trình biên dịch sẽ cấp phát vùng nhớ như thế nào?",
    options: [
      "Khởi tạo mảng có 5 phần tử với giá trị 3",
      "Khởi tạo mảng có 3 phần tử với giá trị 5",
      "Lưu liên tiếp số 5 và số 3",
      "Dành vùng nhớ tỷ lệ 5:3 cho dữ liệu"
    ],
    answer: 1,
    explanation: "Cú pháp `value : count` chỉ định lặp lại giá trị đó một số lần. Ở đây là cấp 3 khối .word mang giá trị 5."
  },
  {
    id: 30,
    type: "single",
    question: (
      <div>
        Đoạn chương trình sau sẽ in ra gì? Biết syscall 1 là in số nguyên.
        <pre className="bg-slate-100 p-3 mt-3 rounded-lg border border-slate-200">
          <code>
            li a0, 5{"\n"}
            li t0, 3{"\n"}
            xor a0, a0, t0{"\n"}
            li a7, 1{"\n"}
            ecall
          </code>
        </pre>
      </div>
    ),
    options: ["5", "3", "6", "2"],
    answer: 2,
    explanation: "5 (0101b) XOR 3 (0011b) = 0110b. Đổi ra thập phân là 6."
  },
  {
    id: 31,
    type: "single",
    question: "Lệnh giả `nop` (không thực hiện thao tác) trong RISC-V là một alias của lệnh nào sau đây?",
    options: [
      "sub zero, zero, zero",
      "addi zero, zero, 0",
      "slli zero, zero, 0",
      "jal zero, 0"
    ],
    answer: 1,
    explanation: "Theo chuẩn ISA của RISC-V, NOP được mã hóa chính thức dưới dạng `addi x0, x0, 0`."
  },
  {
    id: 32,
    type: "single",
    question: (
      <div>
        Hàm đệ quy `fact` dưới đây bị thiếu 1 lệnh. Chọn lệnh thích hợp điền vào `[MISSING]`.
        <pre className="bg-slate-100 p-3 mt-3 rounded-lg border border-slate-200">
          <code>
            fact:{"\n"}
            addi sp, sp, -8{"\n"}
            sw ra, 4(sp){"\n"}
            sw a0, 0(sp){"\n"}
            ...{"\n"}
            jal fact{"\n"}
            ...{"\n"}
            lw a0, 0(sp){"\n"}
            [MISSING]{"\n"}
            addi sp, sp, 8{"\n"}
            jr ra
          </code>
        </pre>
      </div>
    ),
    options: ["lw ra, 4(sp)", "sw ra, 0(sp)", "lw sp, 4(ra)", "jalr ra"],
    answer: 0,
    explanation: "Khi gọi hàm xong, phải Pop (khôi phục) lại giá trị gốc của các thanh ghi đã cất vào stack trước khi giải phóng bộ nhớ và return. Lệnh thiếu là đọc `ra` từ 4(sp)."
  },
  {
    id: 33,
    type: "short",
    question: (
      <div>
        Viết mã Hexa (đủ 8 ký tự, ví dụ 0xFFFFFFFF) của t1 sau khi thực thi đoạn mã Little-Endian này:
        <pre className="bg-slate-100 p-3 mt-3 rounded-lg border border-slate-200">
          <code>
            li t0, 0x12345678{"\n"}
            addi sp, sp, -4{"\n"}
            sw t0, 0(sp){"\n"}
            lb t1, 0(sp)
          </code>
        </pre>
      </div>
    ),
    answer: "0x00000078",
    explanation: "Ghi 0x12345678 theo Little Endian vào Stack: sp[0]=78, sp[1]=56, sp[2]=34, sp[3]=12. `lb` đọc byte ở offset 0 (là 0x78) và mở rộng dấu. Vì 0x78 có bit cao nhất là 0, mở rộng thành 0x00000078."
  },
  {
    id: 34,
    type: "single",
    question: "Định dạng lệnh U-type (Upper Immediate) của RISC-V như `lui` sử dụng bao nhiêu bit để lưu giá trị Immediate?",
    options: ["12 bit", "20 bit", "32 bit", "16 bit"],
    answer: 1,
    explanation: "U-type dành ra 20 bit (từ bit 12 đến bit 31 của lệnh máy) để biểu diễn các hằng số lớn, và nó được nạp trực tiếp vào 20 bit cao của thanh ghi."
  },
  {
    id: 35,
    type: "single",
    question: "Một lỗi phổ biến 'Address not aligned on word boundary' xuất hiện khi nào trong RARS?",
    options: [
      "Đọc quá giới hạn của mảng",
      "Lệnh lw (hoặc sw) nhận vào một địa chỉ không chia hết cho 4",
      "Lệnh rẽ nhánh nhảy tới địa chỉ không chia hết cho 4",
      "Viết vượt quá bộ nhớ ngăn xếp sp"
    ],
    answer: 1,
    explanation: "Kiến trúc RV32I yêu cầu truy cập các Word (4 byte) phải được căn chỉnh địa chỉ (aligned). Nghĩa là địa chỉ truyền vào lệnh lw/sw phải là bội số của 4."
  },
  {
    id: 36,
    type: "multiple",
    question: "Những kiểu dữ liệu hợp lệ nào có thể được khai báo trong phân vùng `.data` của RARS?",
    options: [".word", ".ascii", ".float", ".integer"],
    answer: [0, 1, 2],
    explanation: "`.word` (32 bit int), `.ascii` (chuỗi), và `.float` (số thực 32-bit float point) đều hợp lệ. RARS không có kiểu `.integer`."
  },
  {
    id: 37,
    type: "single",
    question: "Để đảo ngược (NOT logic) toàn bộ 32 bit của thanh ghi t0, ta có thể dùng phép tính nào với t0 và 0xFFFFFFFF (giá trị -1)?",
    options: ["and", "or", "xor", "nor"],
    answer: 2,
    explanation: "Phép XOR với chuỗi toàn bit 1 sẽ đảo ngược toàn bộ bit (1 XOR 1 = 0, 0 XOR 1 = 1). Đây là cách RISC-V cài đặt phép NOT giả lệnh `not t1, t0` -> `xori t1, t0, -1`."
  },
  {
    id: 38,
    type: "single",
    question: "Lệnh `auipc t0, 0x10` thực hiện thao tác toán học nào dưới đây?",
    options: [
      "t0 = PC + 0x10000",
      "t0 = 0x10000",
      "t0 = PC + 0x10",
      "t0 = PC * 0x10"
    ],
    answer: 0,
    explanation: "auipc (Add Upper Immediate to PC) lấy immediate 20-bit, dịch trái 12 bit (0x10 << 12 = 0x10000) và cộng với địa chỉ PC hiện tại lưu vào t0."
  },
  {
    id: 39,
    type: "single",
    question: (
      <div>
        Với mảng A lưu tại t0. Lệnh nào tương đương với thao tác đọc phần tử thứ i (giả sử i lưu ở t1, i tính bằng số nguyên 32 bit) vào thanh ghi t2?
      </div>
    ),
    options: [
      "slli t3, t1, 2 \nadd t3, t3, t0 \nlw t2, 0(t3)",
      "slli t3, t1, 4 \nadd t3, t3, t0 \nlw t2, 0(t3)",
      "add t3, t1, t0 \nlw t2, 0(t3)",
      "lw t2, t1(t0)"
    ],
    answer: 0,
    explanation: "Trong mảng kiểu Word, khoảng cách giữa mỗi phần tử là 4 byte. Ta nhân i với 4 bằng cách dịch trái 2 bit (`slli t3, t1, 2`). Sau đó cộng vào địa chỉ cơ sở t0 và dùng lệnh lw để lấy nội dung."
  },
  {
    id: 40,
    type: "single",
    question: (
      <div>
        Đoạn lệnh này sẽ cho t2 kết quả cuối cùng là gì? Biết mảng arr = [4, 1, 9, 7].
        <pre className="bg-slate-100 p-3 mt-3 rounded-lg border border-slate-200">
          <code>
            la a0, arr{"\n"}
            li t1, 4{"\n"}
            lw t2, 0(a0){"\n"}
            li t0, 1{"\n"}
            loop:{"\n"}
            bge t0, t1, exit{"\n"}
            slli t3, t0, 2{"\n"}
            add t4, a0, t3{"\n"}
            lw t5, 0(t4){"\n"}
            ble t5, t2, skip{"\n"}
            add t2, t5, zero{"\n"}
            skip:{"\n"}
            addi t0, t0, 1{"\n"}
            j loop{"\n"}
            exit:
          </code>
        </pre>
      </div>
    ),
    options: ["1", "4", "7", "9"],
    answer: 3,
    explanation: "Thuật toán tuần tự duyệt qua mảng. `t2` khởi tạo bằng phần tử đầu tiên (4). Nếu t5 > t2, cập nhật t2 = t5. Đây là bài toán tìm phần tử lớn nhất (MAX) trong mảng. Kết quả là 9."
  }
];

export default function RiscVGeneralReviewApp() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: any }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60 * 60);

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
    <div className="min-h-screen bg-neutral-50 text-neutral-800 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6 flex flex-col md:flex-row justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-neutral-200">
          <div>
            <h1 className="text-2xl font-black text-indigo-800">Đề Thi Tổng Ôn IT3280: Kiến Trúc Máy Tính</h1>
            <p className="text-sm text-neutral-500 font-medium mt-1">Chuẩn SoICT - Kiến trúc: RISC-V (RV32I) - Tổng: {questions.length} câu</p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col items-end">
            <span className={`text-lg font-bold font-mono px-5 py-2.5 rounded-xl ${timeLeft < 300 && !isSubmitted ? 'bg-red-100 text-red-600 border border-red-200' : 'bg-neutral-100 text-neutral-700 border border-neutral-200'}`}>
              ⏳ {formatTime(timeLeft)}
            </span>
          </div>
        </header>

        <div className="w-full bg-neutral-200 rounded-full h-3 mb-6">
          <div 
            className="bg-indigo-600 h-3 rounded-full transition-all duration-300 shadow-sm" 
            style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        {isSubmitted && (
          <div className="bg-teal-50 border-2 border-teal-500 text-teal-900 p-6 rounded-2xl shadow-sm mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black mb-1">Kết Quả Đánh Giá</h2>
              <p className="text-lg font-semibold">Thành tích: {getScore()} / {questions.length} câu chính xác</p>
            </div>
          </div>
        )}

        <div className="bg-white shadow-sm border border-neutral-200 rounded-2xl p-6 md:p-8 mb-6 relative overflow-hidden">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-neutral-100">
            <span className="text-lg font-bold text-neutral-600 bg-neutral-100 px-4 py-1.5 rounded-lg">
              Câu {currentIdx + 1} / {questions.length}
            </span>
            {isSubmitted && (
              <span className={`px-5 py-2 rounded-xl text-sm font-black uppercase tracking-widest ${isCorrect(question) ? "bg-teal-100 text-teal-700 border border-teal-200" : "bg-red-100 text-red-700 border border-red-200"}`}>
                {isCorrect(question) ? "✔ ĐÚNG" : "✘ SAI"}
              </span>
            )}
          </div>
          
          <div className="text-lg md:text-xl font-medium mb-8 text-neutral-800 leading-relaxed">
            {question.question}
          </div>

          <div className="space-y-4">
            {question.type === "single" &&
              question.options?.map((opt, idx) => {
                const isSelected = answers[question.id] === idx;
                const isAns = question.answer === idx;
                let optionStyle = "border-neutral-200 hover:border-indigo-400 hover:bg-indigo-50/50";
                
                if (isSubmitted) {
                  if (isAns) optionStyle = "bg-teal-50 border-teal-500 font-semibold ring-2 ring-teal-500/20";
                  else if (isSelected) optionStyle = "bg-red-50 border-red-400 opacity-80";
                  else optionStyle = "opacity-40 border-neutral-200 bg-neutral-50";
                } else if (isSelected) {
                  optionStyle = "bg-indigo-50 border-indigo-500 ring-2 ring-indigo-500/20";
                }

                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectSingle(idx)}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${optionStyle}`}
                  >
                    <div className="flex items-start">
                      <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center mr-4 ${isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-neutral-400'}`}>
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
                let optionStyle = "border-neutral-200 hover:border-indigo-400 hover:bg-indigo-50/50";

                if (isSubmitted) {
                  if (isAns) optionStyle = "bg-teal-50 border-teal-500 font-semibold ring-2 ring-teal-500/20";
                  else if (isSelected) optionStyle = "bg-red-50 border-red-400 opacity-80";
                  else optionStyle = "opacity-40 border-neutral-200 bg-neutral-50";
                } else if (isSelected) {
                  optionStyle = "bg-indigo-50 border-indigo-500 ring-2 ring-indigo-500/20";
                }

                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectMultiple(idx)}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${optionStyle}`}
                  >
                    <div className="flex items-start">
                       <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded flex items-center justify-center mr-4 ${isSelected ? 'bg-indigo-600 border-indigo-600' : 'border border-neutral-400'}`}>
                        {isSelected && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>}
                      </div>
                      <span className="whitespace-pre-wrap">{opt}</span>
                    </div>
                  </div>
                );
              })}

            {(question.type === "fill" || question.type === "short") && (
              <div>
                <textarea
                  rows={2}
                  className={`w-full p-4 border-2 rounded-xl outline-none font-mono text-lg transition-all ${
                    isSubmitted
                      ? isCorrect(question)
                        ? "bg-teal-50 border-teal-500 text-teal-900"
                        : "bg-red-50 border-red-400 text-red-900"
                      : "bg-neutral-50 border-neutral-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                  }`}
                  placeholder="Gõ lệnh hoặc đáp án tại đây..."
                  value={answers[question.id] || ""}
                  onChange={(e) => handleInputFill(e.target.value)}
                  readOnly={isSubmitted}
                  spellCheck={false}
                />
                {isSubmitted && !isCorrect(question) && (
                  <div className="mt-4 p-4 bg-teal-50 border border-teal-200 rounded-xl">
                    <p className="text-sm text-teal-800 font-bold mb-1 uppercase tracking-wider">Mã / Đáp án mẫu:</p>
                    <p className="font-mono text-lg font-bold text-teal-700 whitespace-pre-wrap">{question.answer}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {isSubmitted && (
            <div className="mt-8 p-6 bg-amber-50 border-2 border-amber-200 rounded-xl">
              <h4 className="font-black text-amber-900 mb-2 flex items-center uppercase tracking-wide text-sm">
                <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Ghi chú & Phân tích
              </h4>
              <p className="text-amber-900 leading-relaxed font-medium">{question.explanation}</p>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center pb-12">
          <button
            onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
            disabled={currentIdx === 0}
            className="px-6 py-3 bg-white text-neutral-700 border-2 border-neutral-200 rounded-xl hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed font-bold transition-all shadow-sm"
          >
            &larr; Câu trước
          </button>

          {!isSubmitted && (
            <button
              onClick={() => {
                if(window.confirm("Kiểm tra kỹ trước khi nộp. Bạn có chắc chắn muốn nộp bài?")) {
                  setIsSubmitted(true);
                }
              }}
              className="px-10 py-3 bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 font-black shadow-xl shadow-neutral-900/20 transition-all transform hover:-translate-y-1"
            >
              NỘP BÀI THI
            </button>
          )}

          <button
            onClick={() => setCurrentIdx((prev) => Math.min(questions.length - 1, prev + 1))}
            disabled={currentIdx === questions.length - 1}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed font-bold transition-all shadow-lg shadow-indigo-600/20"
          >
            Câu kế &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}