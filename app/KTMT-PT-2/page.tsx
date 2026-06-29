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
    question: "Trong quy ước gọi hàm (Calling Convention) của RISC-V, thanh ghi nào sau đây người gọi (Caller) KHÔNG CẦN phải lưu lại vào stack trước khi thực hiện lệnh `jal` nếu muốn giữ giá trị của nó?",
    options: ["t0", "t1", "a0", "s0"],
    answer: 3,
    explanation: "s0 (Saved Register) thuộc nhóm Callee-saved. Hàm được gọi (Callee) phải có trách nhiệm lưu và khôi phục nó nếu thay đổi. Các thanh ghi t (Temporary) và a (Argument) là Caller-saved."
  },
  {
    id: 2,
    type: "single",
    question: (
      <div>
        Đoạn mã sau thực hiện điều gì?
        <pre className="bg-slate-100 p-3 mt-3 rounded-lg border border-slate-200">
          <code>
            li a7, 8{"\n"}
            la a0, buffer{"\n"}
            li a1, 64{"\n"}
            ecall
          </code>
        </pre>
      </div>
    ),
    options: [
      "In ra màn hình một chuỗi từ địa chỉ buffer có độ dài tối đa 64 ký tự",
      "Đọc một chuỗi từ bàn phím vào địa chỉ buffer, độ dài tối đa 64 ký tự",
      "Đọc 64 số nguyên từ bàn phím và lưu vào buffer",
      "Phân bổ 64 byte bộ nhớ cho biến buffer"
    ],
    answer: 1,
    explanation: "ecall số hiệu 8 (a7=8) trong RARS là ReadString. a0 trỏ tới vùng nhớ đệm (buffer) và a1 chứa kích thước tối đa của chuỗi cần đọc."
  },
  {
    id: 3,
    type: "single",
    question: "Lệnh `auipc t0, 0x10` sẽ thực hiện thao tác nào?",
    options: [
      "t0 = PC + 0x10000",
      "t0 = PC + 0x10",
      "t0 = 0x10000",
      "t0 = PC + (0x10 << 12)"
    ],
    answer: 3,
    explanation: "auipc (Add Upper Immediate to PC) dịch trái immediate 12 bit và cộng vào PC hiện tại. 0x10 << 12 = 0x10000, nên t0 = PC + 0x10000."
  },
  {
    id: 4,
    type: "single",
    question: (
      <div>
        Cho biết giá trị của thanh ghi t1 sau khi thực hiện đoạn mã (Giả sử hệ thống Little-Endian):
        <pre className="bg-slate-100 p-3 mt-3 rounded-lg border border-slate-200">
          <code>
            .data{"\n"}
            arr: .word 0x11223344, 0x55667788{"\n"}
            .text{"\n"}
            la t0, arr{"\n"}
            lhu t1, 2(t0)
          </code>
        </pre>
      </div>
    ),
    options: ["0x1122", "0x2233", "0x5566", "0x3344"],
    answer: 0,
    explanation: "arr[0] là 0x11223344. Lưu ở Little Endian: 44 33 22 11. Offset 2 trỏ tới byte 22 và byte tiếp theo là 11. lhu (Load Halfword Unsigned) đọc 2 byte này tạo thành giá trị 0x1122."
  },
  {
    id: 5,
    type: "single",
    question: "Một hàm đệ quy trong RISC-V luôn cần khai báo không gian Stack (bằng cách giảm sp). Kích thước tối thiểu của Stack Frame thường phải đủ để chứa thanh ghi nào nhằm tránh vòng lặp vô hạn hoặc lỗi khi return?",
    options: ["a0", "sp", "ra", "zero"],
    answer: 2,
    explanation: "Khi gọi đệ quy (dùng jal), thanh ghi ra (Return Address) sẽ bị ghi đè. Do đó, hàm bắt buộc phải lưu ra vào Stack ở đầu hàm và khôi phục ở cuối hàm."
  },
  {
    id: 6,
    type: "single",
    question: (
      <div>
        Phân tích kết quả của vòng lặp sau. Vòng lặp sẽ thực hiện tổng cộng bao nhiêu bước nhảy (bao nhiêu lần thực hiện lệnh `j loop`)?
        <pre className="bg-slate-100 p-3 mt-3 rounded-lg border border-slate-200">
          <code>
            li t0, 0{"\n"}
            li t1, 10{"\n"}
            loop:{"\n"}
            bge t0, t1, exit{"\n"}
            addi t0, t0, 3{"\n"}
            j loop{"\n"}
            exit:
          </code>
        </pre>
      </div>
    ),
    options: ["3 lần", "4 lần", "10 lần", "Lặp vô hạn"],
    answer: 1,
    explanation: "Các giá trị của t0 trước khi kiểm tra bge: 0, 3, 6, 9, 12. Khi t0 = 12, lệnh bge thỏa mãn và nhảy đến exit. Các lần t0 = 0, 3, 6, 9 đều đi qua lệnh j loop. Vậy có 4 lần thực hiện lệnh j loop."
  },
  {
    id: 7,
    type: "single",
    question: "Để trích xuất (isolate) các bit từ 8 đến 15 của thanh ghi t0 và lưu kết quả vào t1 (giữ nguyên vị trí bit, các bit khác bằng 0), cặp lệnh nào sau đây là đúng?",
    options: [
      "slli t1, t0, 8 \n srli t1, t1, 24",
      "lui t1, 0xFF \n and t1, t0, t1",
      "li t2, 0xFF00 \n and t1, t0, t2",
      "srli t1, t0, 8 \n andi t1, t1, 0xFF"
    ],
    answer: 2,
    explanation: "Mask cần thiết là 0xFF00 (chỉ bật các bit 8-15). Lệnh AND giữa t0 và 0xFF00 sẽ giữ nguyên các bit 8-15 và xóa các bit còn lại. Option D dịch chuyển vị trí bit nên không đúng yêu cầu giữ nguyên vị trí."
  },
  {
    id: 8,
    type: "multiple",
    question: "Chọn tất cả những nguyên nhân có thể gây ra hiện tượng 'Infinite Loop' (lặp vô hạn) trong lập trình RISC-V Assembly.",
    options: [
      "Quên tăng/giảm biến đếm trong vòng lặp",
      "Sử dụng sai điều kiện rẽ nhánh (ví dụ: bge thay vì blt)",
      "Gọi hàm con nhưng hàm con không khôi phục thanh ghi s0",
      "Hàm gọi chính nó (đệ quy) nhưng không lưu thanh ghi ra vào stack"
    ],
    answer: [0, 1, 3],
    explanation: "Quên đổi biến đếm và sai điều kiện nhánh rõ ràng gây lặp vô hạn. Đệ quy không lưu `ra` khiến hàm nhảy về chính thân nó mãi mãi thay vì thoát về hàm cha. Không khôi phục `s0` chỉ gây sai dữ liệu logic, không trực tiếp gây lặp vô hạn."
  },
  {
    id: 9,
    type: "single",
    question: "Lệnh giả `li t0, 0xABCDE000` không thể dịch bằng 1 lệnh `addi`. Assembler sẽ tách nó thành cặp lệnh nào?",
    options: [
      "lui t0, 0xABCDE; addi t0, t0, 0",
      "lui t0, 0xABCDE; slli t0, t0, 12",
      "auipc t0, 0xABCDE; addi t0, t0, 0",
      "lui t0, 0xABCDE; ori t0, t0, 000"
    ],
    answer: 0,
    explanation: "Phần 12 bit thấp của 0xABCDE000 là 0. Do đó, lệnh addi sẽ cộng 0. Phần 20 bit cao là 0xABCDE được gán trực tiếp qua lui."
  },
  {
    id: 10,
    type: "single",
    question: "Trong kiến trúc RISC-V RV32I, định dạng lệnh S-type (dùng cho các lệnh Store như sw, sb) có đặc điểm mã hóa Immediate (hằng số) như thế nào?",
    options: [
      "Immediate được lưu nguyên vẹn ở 12 bit cao nhất",
      "Immediate bị chia làm 2 phần: 7 bit lưu ở bit 25-31 và 5 bit lưu ở bit 7-11",
      "Immediate được lưu ở bit 12-23",
      "S-type không có Immediate"
    ],
    answer: 1,
    explanation: "Để giữ nguyên vị trí thanh ghi rs1 và rs2 trong toàn bộ tập lệnh, định dạng S-type phải chẻ immediate 12-bit thành hai mảnh: imm[11:5] nằm ở bit 25-31, imm[4:0] nằm ở bit 7-11."
  },
  {
    id: 11,
    type: "single",
    question: (
      <div>
        Thực hiện đoạn mã sau:
        <pre className="bg-slate-100 p-3 mt-3 rounded-lg border border-slate-200">
          <code>
            li t0, -4{"\n"}
            srai t1, t0, 1{"\n"}
            srli t2, t0, 1
          </code>
        </pre>
        So sánh giá trị của t1 và t2 (được coi là số nguyên có dấu bù 2):
      </div>
    ),
    options: [
      "t1 = -2, t2 = -2",
      "t1 = 2, t2 = 2147483646",
      "t1 = -2, t2 = 2147483646",
      "t1 = -2, t2 = -4"
    ],
    answer: 2,
    explanation: "t0 = -4 (111...11111100). srai giữ nguyên bit dấu, dịch phải 1 bit -> 111...11111110 (-2). srli chèn 0 vào bit cao nhất -> 011...11111110 (2147483646)."
  },
  {
    id: 12,
    type: "single",
    question: (
      <div>
        Một sinh viên viết đoạn mã tính chiều dài chuỗi (strlen) nhưng vòng lặp không hoạt động đúng. Lỗi sai nằm ở đâu?
        <pre className="bg-slate-100 p-3 mt-3 rounded-lg border border-slate-200">
          <code>
            la a0, string{"\n"}
            li t0, 0{"\n"}
            loop:{"\n"}
            lw t1, 0(a0){"\n"}
            beq t1, zero, done{"\n"}
            addi a0, a0, 1{"\n"}
            addi t0, t0, 1{"\n"}
            j loop{"\n"}
            done:
          </code>
        </pre>
      </div>
    ),
    options: [
      "Khởi tạo thanh ghi t0 sai",
      "Dùng lệnh lw (đọc 4 byte) thay vì lbu/lb (đọc 1 ký tự)",
      "Quên lệnh thoát ecall ở nhãn done",
      "Bước tăng địa chỉ a0 phải là 4 thay vì 1"
    ],
    answer: 1,
    explanation: "Chuỗi ASCII được lưu từng byte. Để đọc từng ký tự phải dùng lbu hoặc lb. Dùng lw sẽ đọc 4 ký tự cùng lúc và tiến a0 lên 1 byte sẽ gây lỗi unaligned address hoặc logic sai hoàn toàn."
  },
  {
    id: 13,
    type: "fill",
    question: "Lệnh `j label` có thể nhảy tới một địa chỉ xa tối đa khoảng ±___ MB so với PC hiện tại. (Điền một con số nguyên).",
    answer: "1",
    explanation: "Lệnh j được biên dịch thành jal. jal sử dụng 20 bit immediate tạo ra offset 21 bit (do luôn canh chẵn), cho phép nhảy xa ±2^20 byte = ±1 MB."
  },
  {
    id: 14,
    type: "single",
    question: "Kỹ thuật Polling trong lập trình I/O MMIO (ví dụ đọc bàn phím RARS) có nhược điểm lớn nhất là gì so với kỹ thuật Ngắt (Interrupt)?",
    options: [
      "Chiếm dụng 100% tài nguyên CPU chỉ để chờ sự kiện, làm lãng phí năng lượng và chu kỳ máy",
      "Không thể đọc được dữ liệu nếu người dùng bấm phím quá nhanh",
      "Yêu cầu cấu hình thanh ghi phần cứng phức tạp hơn nhiều",
      "Địa chỉ ô nhớ bị thay đổi liên tục"
    ],
    answer: 0,
    explanation: "Polling là vòng lặp vô hạn liên tục kiểm tra trạng thái (busy-waiting). Điều này khiến CPU luôn bận rộn ngay cả khi không có sự kiện gì xảy ra."
  },
  {
    id: 15,
    type: "single",
    question: "Trong đồ họa Bitmap Display, nếu Base Address là 0x10008000, màn hình có Width = 64 pixels, Height = 64 pixels, mỗi pixel 4 byte. Địa chỉ của pixel ở tọa độ (x = 10, y = 5) được tính theo công thức nào? (Gốc tọa độ ở góc trên cùng bên trái).",
    options: [
      "0x10008000 + (10 * 64 + 5) * 4",
      "0x10008000 + (5 * 64 + 10) * 4",
      "0x10008000 + (5 * 64 + 10)",
      "0x10008000 + (10 * 64 + 5)"
    ],
    answer: 1,
    explanation: "Địa chỉ bộ nhớ là mảng 1 chiều liên tục. Offset = (y * Width + x) * kích thước_pixel. Vậy Offset = (5 * 64 + 10) * 4."
  },
  {
    id: 16,
    type: "single",
    question: (
      <div>
        Xét đoạn mã so sánh không dấu sau:
        <pre className="bg-slate-100 p-3 mt-3 rounded-lg border border-slate-200">
          <code>
            li t0, -1{"\n"}
            li t1, 1{"\n"}
            sltu t2, t0, t1
          </code>
        </pre>
        Giá trị của t2 sẽ là:
      </div>
    ),
    options: ["1", "0", "-1", "Lỗi biên dịch"],
    answer: 1,
    explanation: "t0 = -1 (là 0xFFFFFFFF trong hệ bù 2). Khi so sánh không dấu (sltu), 0xFFFFFFFF là giá trị số dương lớn nhất có thể. Do đó t0 > t1 (1). Phép toán sltu (Set Less Than Unsigned) sẽ đánh giá t0 < t1 là sai, gán t2 = 0."
  },
  {
    id: 17,
    type: "single",
    question: "Sự khác biệt chính giữa `bge` và `bgeu` trong RV32I là gì?",
    options: [
      "bge nhảy nếu bằng, bgeu nhảy nếu lớn hơn",
      "bge dùng cho số thực, bgeu dùng cho số nguyên",
      "bge so sánh 2 số nguyên có dấu (signed), bgeu so sánh 2 số nguyên không dấu (unsigned)",
      "Không có sự khác biệt, chỉ là alias của nhau"
    ],
    answer: 2,
    explanation: "Hậu tố 'u' trong các lệnh nhánh (bltu, bgeu) và lệnh slt (sltu) luôn mang ý nghĩa Unsigned (Không dấu)."
  },
  {
    id: 18,
    type: "short",
    question: (
      <div>
        Đoạn mã sau lặp qua một mảng để tính tổng các phần tử, nhưng bị thiếu một dòng cực kỳ quan trọng ở vị trí [MISSING CODE]. Hãy viết lại dòng code đó.
        <pre className="bg-slate-100 p-3 mt-3 rounded-lg border border-slate-200">
          <code>
            la t0, array{"\n"}
            li t1, 0      # Sum{"\n"}
            li t2, 5      # Array size{"\n"}
            li t3, 0      # Counter{"\n"}
            loop:{"\n"}
            bge t3, t2, end{"\n"}
            lw t4, 0(t0){"\n"}
            add t1, t1, t4{"\n"}
            [MISSING CODE]{"\n"}
            addi t3, t3, 1{"\n"}
            j loop{"\n"}
            end:
          </code>
        </pre>
      </div>
    ),
    answer: "addi t0, t0, 4",
    explanation: "Vì mảng chứa các phần tử word (lw t4, 0(t0)), con trỏ bộ nhớ t0 phải được tăng lên 4 byte ở mỗi vòng lặp để trỏ tới phần tử tiếp theo."
  },
  {
    id: 19,
    type: "single",
    question: "Chỉ thị dữ liệu `.space n` trong RARS thực hiện công việc gì?",
    options: [
      "In ra màn hình n khoảng trắng",
      "Khai báo một vùng nhớ chưa được khởi tạo (điền toàn 0) với kích thước n byte",
      "Căn chỉnh bộ nhớ (align) để địa chỉ tiếp theo chia hết cho n",
      "Nhảy cách n dòng mã lệnh"
    ],
    answer: 1,
    explanation: ".space (hoặc đôi khi dùng .skip) yêu cầu Assembler cấp phát n byte liên tiếp và điền giá trị 0 vào vùng Data segment."
  },
  {
    id: 20,
    type: "multiple",
    question: "Trong RISC-V, những thanh ghi nào dưới đây được sử dụng để truyền tham số (Arguments) cho hàm theo chuẩn Calling Convention?",
    options: ["a0", "a7", "s0", "a3"],
    answer: [0, 1, 3],
    explanation: "Các thanh ghi từ a0 đến a7 (x10 - x17) được quy ước dành riêng cho việc truyền đối số vào hàm và trả về kết quả (đối với a0, a1)."
  },
  {
    id: 21,
    type: "single",
    question: (
      <div>
        Quan sát đoạn bộ nhớ Little Endian và đoạn code. Giá trị cuối cùng của t1 là bao nhiêu?
        <pre className="bg-slate-100 p-3 mt-3 rounded-lg border border-slate-200">
          <code>
            .data{"\n"}
            bytes: .byte 0x0A, 0x0B, 0x0C, 0x0D{"\n"}
            .text{"\n"}
            la t0, bytes{"\n"}
            lhu t1, 1(t0)
          </code>
        </pre>
      </div>
    ),
    options: ["0x0B0C", "0x0C0B", "0x0A0B", "0x0D0C"],
    answer: 1,
    explanation: "Đọc 2 byte (Halfword) bắt đầu từ offset 1. Byte tại offset 1 là 0x0B, byte tại offset 2 là 0x0C. Ghép lại theo Little Endian (byte địa chỉ cao đứng trước) sẽ thành 0x0C0B."
  },
  {
    id: 22,
    type: "fill",
    question: "Lệnh kiểm tra xem số chứa trong t0 là số chẵn hay lẻ bằng phép AND bit logic: `andi t1, t0, ___`. Hãy điền hằng số phù hợp vào chỗ trống để t1 = 0 nếu chẵn, t1 = 1 nếu lẻ.",
    answer: "1",
    explanation: "Bit thấp nhất (LSB) của một số nguyên quyết định tính chẵn lẻ. Nếu LSB = 0 thì số chẵn, = 1 thì số lẻ. Masking bằng `andi t1, t0, 1` sẽ trích xuất chính xác LSB."
  },
  {
    id: 23,
    type: "single",
    question: "Lệnh RV32I nào cho phép ghi dữ liệu 32-bit từ thanh ghi vào bộ nhớ tại một địa chỉ được tính bằng tổng của thanh ghi cơ sở và một hằng số Immediate?",
    options: ["lw", "sh", "sw", "sb"],
    answer: 2,
    explanation: "sw (Store Word) ghi 4 byte (32-bit) vào bộ nhớ. Cú pháp `sw rs2, offset(rs1)`."
  },
  {
    id: 24,
    type: "single",
    question: "Trong RISC-V, khi muốn xử lý ngoại lệ (Exception) hay Ngắt (Interrupt), thanh ghi mstatus (Machine Status) thường chứa một bit có tác dụng bật/tắt toàn bộ ngắt. Bit đó tên là gì?",
    options: ["MIE (Machine Interrupt Enable)", "MPIE", "MEPC", "MCAUSE"],
    answer: 0,
    explanation: "MIE là bit Enable tổng cho phép ngắt cấp độ Machine. Khi bằng 0, CPU bỏ qua tất cả ngắt."
  },
  {
    id: 25,
    type: "single",
    question: (
      <div>
        Đoạn lệnh này thực hiện thao tác gì với mảng arr?
        <pre className="bg-slate-100 p-3 mt-3 rounded-lg border border-slate-200">
          <code>
            la t0, arr{"\n"}
            lw t1, 0(t0){"\n"}
            lw t2, 4(t0){"\n"}
            sw t2, 0(t0){"\n"}
            sw t1, 4(t0)
          </code>
        </pre>
      </div>
    ),
    options: [
      "Sao chép giá trị của phần tử 0 sang phần tử 1",
      "Hoán đổi (Swap) giá trị của 2 phần tử đầu tiên trong mảng arr",
      "Nhân đôi giá trị của 2 phần tử đầu tiên",
      "Xóa mảng arr"
    ],
    answer: 1,
    explanation: "Đọc phần tử index 0 vào t1, index 1 vào t2. Sau đó ghi ngược t2 vào index 0 và t1 vào index 1. Đây là thuật toán Swap cơ bản."
  },
  {
    id: 26,
    type: "single",
    question: "Lệnh giả `nop` tương đương với lệnh thật nào sau đây theo chuẩn RISC-V?",
    options: ["add zero, zero, zero", "addi zero, zero, 0", "sub x0, x0, x0", "slli x0, x0, 0"],
    answer: 1,
    explanation: "Theo đặc tả RISC-V, NOP được mã hóa mặc định là `addi x0, x0, 0`."
  },
  {
    id: 27,
    type: "single",
    question: "Mã hóa lệnh R-type bao gồm 6 trường. Hai trường nào phối hợp với nhau để xác định chính xác thao tác (ví dụ phân biệt ADD và SUB)?",
    options: ["rs1 và rs2", "opcode và rd", "funct3 và funct7", "shamt và imm"],
    answer: 2,
    explanation: "Lệnh R-type có cùng opcode cho các phép toán số học/logic (0110011). Phân biệt cụ thể lệnh nào được thực hiện là dựa vào funct3 (3 bit) và funct7 (7 bit)."
  },
  {
    id: 28,
    type: "single",
    question: "Nếu có 1 chuỗi ký tự kết thúc bằng Null (`.asciiz`). Hàm nào của Syscall RARS thường được dùng để xuất trực tiếp chuỗi này ra console?",
    options: ["ecall với a7 = 1", "ecall với a7 = 4", "ecall với a7 = 8", "ecall với a7 = 11"],
    answer: 1,
    explanation: "Syscall 4 là PrintString, chuyên nhận địa chỉ chuỗi kết thúc bằng Null ở a0 và in toàn bộ chuỗi."
  },
  {
    id: 29,
    type: "single",
    question: (
      <div>
        Để viết một hàm Assembly tính giai thừa (factorial), nếu gọi hàm `fact` lồng nhau n lần, chương trình cần thực hiện tổng cộng tối thiểu bao nhiêu lần lệnh `sw` để cất `ra` vào stack?
      </div>
    ),
    options: ["1 lần", "n lần", "2n lần", "Không cần"],
    answer: 1,
    explanation: "Mỗi khi hàm fact chuẩn bị gọi lại chính nó đệ quy, nó sinh ra một khung stack (stack frame) mới và phải cất thanh ghi `ra` của chính nó đi. Gọi n lần thì phải cất n lần."
  },
  {
    id: 30,
    type: "single",
    question: "Lệnh RV32I nào dưới đây dùng Immediate 20-bit, đồng thời điền thêm 12 số 0 vào phía sau (dịch trái 12 bit)?",
    options: ["jal", "lui", "addi", "jalr"],
    answer: 1,
    explanation: "LUI (Load Upper Immediate) lấy 20 bit từ mã lệnh đặt vào 20 bit cao của thanh ghi đích, và điền 12 bit 0 vào vị trí thấp nhất."
  },
  {
    id: 31,
    type: "single",
    question: (
      <div>
        Giá trị của t0 sau đoạn lệnh này là bao nhiêu?
        <pre className="bg-slate-100 p-3 mt-3 rounded-lg border border-slate-200">
          <code>
            li t1, 0x55555555{"\n"}
            li t2, 0xAAAAAAAA{"\n"}
            xor t0, t1, t2
          </code>
        </pre>
      </div>
    ),
    options: ["0x00000000", "0xFFFFFFFF", "0x55555555", "0xAAAAAAAA"],
    answer: 1,
    explanation: "0x55555555 = 01010101... và 0xAAAAAAAA = 10101010... Hai số này ngược bit hoàn toàn. Khi XOR, các bit khác nhau cho 1 -> 11111111... = 0xFFFFFFFF."
  },
  {
    id: 32,
    type: "single",
    question: "Khai báo `.word 5:3` trong chỉ thị Data có ý nghĩa gì?",
    options: [
      "Khởi tạo 1 mảng gồm 5 phần tử có giá trị 3",
      "Khởi tạo 1 mảng gồm 3 phần tử có giá trị 5",
      "Ghi giá trị 53 vào bộ nhớ",
      "Tạo tỉ lệ màn hình 5:3"
    ],
    answer: 1,
    explanation: "Cú pháp `giá_trị : số_lượng` cấp phát một mảng khởi tạo với số_lượng phần tử mang giá_trị đó. Tức là 3 word, mỗi word bằng 5."
  },
  {
    id: 33,
    type: "single",
    question: (
      <div>
        Phân tích và cho biết biến `result` sẽ mang giá trị bao nhiêu sau lệnh cuối cùng.
        <pre className="bg-slate-100 p-3 mt-3 rounded-lg border border-slate-200">
          <code>
            .data{"\n"}
            A: .word 5{"\n"}
            B: .word -2{"\n"}
            result: .word 0{"\n"}
            .text{"\n"}
            la t0, A{"\n"}
            lw t1, 0(t0){"\n"}
            lw t2, 4(t0){"\n"}
            add t3, t1, t2{"\n"}
            sw t3, 8(t0)
          </code>
        </pre>
      </div>
    ),
    options: ["-2", "3", "7", "5"],
    answer: 1,
    explanation: "A ở offset 0, B ở offset 4, result ở offset 8. Code đọc A (5) vào t1, đọc B (-2) vào t2. Cộng lại t3 = 3. Ghi vào result (offset 8). Kết quả = 3."
  },
  {
    id: 34,
    type: "single",
    question: "Thanh ghi PC (Program Counter) trong kiến trúc RISC-V RV32I lưu trữ giá trị gì?",
    options: [
      "Số lượng lệnh đã được thực thi từ khi chương trình bắt đầu",
      "Địa chỉ của lệnh hợp ngữ sẽ được thực thi ở chu kỳ xung nhịp tiếp theo",
      "Con trỏ trỏ tới đỉnh ngăn xếp Stack",
      "Trạng thái lỗi của hệ thống"
    ],
    answer: 1,
    explanation: "Program Counter chứa địa chỉ của lệnh đang hoặc sẽ được thực thi trong bộ nhớ."
  },
  {
    id: 35,
    type: "short",
    question: (
      <div>
        Trong cơ chế dịch thuật Pseudo-instruction, giả sử muốn nạp số nguyên cực lớn `0xDEADBEEF` vào `t0`. Assembler sẽ sinh ra hai lệnh gốc là `lui` và `addi`. Dòng 1: `lui t0, 0xDEADC`. Hãy điền lệnh dòng số 2 để thu được giá trị chính xác.
      </div>
    ),
    answer: "addi t0, t0, -273",
    explanation: "0xEEF trong hệ 12 bit có dấu là số âm (-273). Mở rộng dấu của nó sinh ra 0xFFFFFEEF. Để bù lại sự tràn dấu FF này, phần LUI phải cộng thêm 1 (0xDEADB + 1 = 0xDEADC). Do đó dòng 2 là addi t0, t0, -273 (hoặc addi t0, t0, 0xEEF nếu RARS hỗ trợ dịch)."
  },
  {
    id: 36,
    type: "single",
    question: "Thanh ghi `gp` (Global Pointer) trong RISC-V được sử dụng với mục đích chính là gì?",
    options: [
      "Quản lý bộ nhớ Heap cấp phát động",
      "Lưu địa chỉ trở về khi có ngắt hệ thống",
      "Cho phép truy xuất siêu nhanh tới một số biến tĩnh và biến toàn cục thông qua định tuyến offset trực tiếp",
      "Giữ nguyên giá trị 0 tương tự thanh ghi zero"
    ],
    answer: 2,
    explanation: "Global Pointer (x3) được thiết lập ở vùng chứa biến toàn cục, giúp các lệnh lw/sw truy cập dữ liệu nhanh gọn chỉ bằng 1 lệnh kết hợp offset, thay vì phải lui/addi 2 lệnh."
  },
  {
    id: 37,
    type: "single",
    question: (
      <div>
        Với đoạn mã tính giai thừa sau, nếu a0 đầu vào = 4, ecall in số nguyên cuối cùng sẽ hiển thị gì?
        <pre className="bg-slate-100 p-3 mt-3 rounded-lg border border-slate-200">
          <code>
            li a0, 4{"\n"}
            li t0, 1{"\n"}
            loop:{"\n"}
            beq a0, zero, done{"\n"}
            mul t0, t0, a0{"\n"}
            addi a0, a0, -1{"\n"}
            j loop{"\n"}
            done:{"\n"}
            mv a0, t0{"\n"}
            li a7, 1{"\n"}
            ecall
          </code>
        </pre>
      </div>
    ),
    options: ["4", "10", "24", "16"],
    answer: 2,
    explanation: "Đây là vòng lặp tính a0! (giai thừa). a0 đi từ 4 xuống 1. t0 = 1 * 4 * 3 * 2 * 1 = 24."
  },
  {
    id: 38,
    type: "single",
    question: "Lệnh ngắt mềm `ecall` được CPU RISC-V xử lý bằng cách nhảy tới Trap Handler (hàm xử lý ngoại lệ). Lúc này, CPU sẽ lưu số định danh nguyên nhân ngắt (ví dụ: ECALL from User Mode) vào thanh ghi CSR nào?",
    options: ["mepc", "mcause", "mtvec", "mstatus"],
    answer: 1,
    explanation: "mcause (Machine Cause Register) lưu mã lỗi hoặc mã ngắt. Ví dụ mã số 8 tương ứng với Environment Call from U-mode."
  },
  {
    id: 39,
    type: "single",
    question: "Kiểu dữ liệu `.asciiz` khác với `.ascii` như thế nào trong bộ nhớ RARS?",
    options: [
      ".asciiz dùng bộ mã Unicode, .ascii dùng bộ mã ASCII chuẩn",
      ".asciiz tự động gắn thêm ký tự Null byte (0x00) ở cuối chuỗi",
      ".asciiz lưu mỗi ký tự thành 4 byte thay vì 1 byte",
      ".asciiz là lệnh Macro để khai báo mảng tĩnh"
    ],
    answer: 1,
    explanation: "Chữ 'z' trong asciiz đại diện cho 'Zero-terminated'. Trình biên dịch sẽ tự chèn mã 0x00 vào sau ký tự cuối cùng của chuỗi."
  },
  {
    id: 40,
    type: "single",
    question: (
      <div>
        Đoạn chương trình sau sẽ rơi vào trạng thái nào?
        <pre className="bg-slate-100 p-3 mt-3 rounded-lg border border-slate-200">
          <code>
            li t0, 0x7FFFFFFF{"\n"}
            li t1, 1{"\n"}
            add t2, t0, t1{"\n"}
            blt t2, zero, neg{"\n"}
            j pos{"\n"}
            neg: li a0, 0{"\n"}
            pos: li a0, 1
          </code>
        </pre>
      </div>
    ),
    options: [
      "Nhảy tới pos vì t2 là số dương lớn nhất (a0 = 1)",
      "Báo lỗi tràn số học khi thực thi add",
      "Nhảy tới neg vì t2 bị tràn và biến thành số âm bù 2 (a0 = 0)",
      "Chương trình bị treo ở lệnh j pos"
    ],
    answer: 2,
    explanation: "0x7FFFFFFF là số nguyên có dấu dương lớn nhất (2147483647). Cộng thêm 1 sẽ thành 0x80000000 (là -2147483648 trong hệ bù 2). Lệnh blt kiểm tra t2 < 0 là đúng, nên rẽ sang neg gán a0 = 0."
  }
];

export default function AdvancedRiscVExamApp() {
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
    <div className="min-h-screen bg-neutral-50 text-neutral-800 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6 flex flex-col md:flex-row justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-neutral-200">
          <div>
            <h1 className="text-2xl font-black text-indigo-800">Bài Thi Nâng Cao: Thực Hành Kiến Trúc Máy Tính</h1>
            <p className="text-sm text-neutral-500 font-medium mt-1">Kiến trúc: RISC-V (RV32I) | Cấp độ: Mở rộng & Suy luận</p>
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
                    <p className="font-mono text-lg font-bold text-teal-700">{question.answer}</p>
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