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
    question: "Để thiết lập thanh ghi t1 về giá trị 0, lệnh nào sau đây KHÔNG đảm bảo luôn hợp lệ (hoặc không đạt mục đích) với mọi giá trị khởi tạo của t1?",
    options: [
      "xor t1, t1, t1",
      "andi t1, t1, 0",
      "sub t1, zero, t1",
      "addi t1, zero, 0"
    ],
    answer: 2,
    explanation: "Lệnh `sub t1, zero, t1` thực hiện t1 = 0 - t1 = -t1. Nếu t1 khác 0, kết quả sẽ không về 0. Các lệnh còn lại luôn làm t1 = 0."
  },
  {
    id: 2,
    type: "single",
    question: "Lệnh nào sau đây dùng để đọc 1 Word (32 bit) từ bộ nhớ vào thanh ghi t0?",
    options: [
      "lw t0, 0(t1)",
      "sw t0, 0(t1)",
      "lb t0, 0(t1)",
      "li t0, 0"
    ],
    answer: 0,
    explanation: "`lw` (Load Word) dùng để nạp 32-bit từ bộ nhớ. `sw` là lưu, `lb` là nạp 1 byte."
  },
  {
    id: 3,
    type: "single",
    question: "Trong kiến trúc RISC-V, thanh ghi nào luôn giữ giá trị bằng 0 và không thể thay đổi dù có thực hiện ghi đè?",
    options: [
      "x1 (ra)",
      "x0 (zero)",
      "x2 (sp)",
      "x3 (gp)"
    ],
    answer: 1,
    explanation: "Thanh ghi x0 (zero) được thiết kế nối đất (hardwired to zero), mọi phép ghi vào x0 đều bị bỏ qua."
  },
  {
    id: 4,
    type: "single",
    question: (
      <div>
        Phân tích đoạn mã Assembly sau:
        <pre className="bg-gray-100 p-2 mt-2 rounded">
          <code>
            li t0, 3{"\n"}
            li t1, 0{"\n"}
            loop:{"\n"}
            add t1, t1, t0{"\n"}
            addi t0, t0, -1{"\n"}
            bne t0, zero, loop
          </code>
        </pre>
        Sau khi vòng lặp kết thúc, giá trị của thanh ghi t1 là bao nhiêu?
      </div>
    ),
    options: ["3", "6", "0", "Lặp vô hạn"],
    answer: 1,
    explanation: "Vòng lặp tính tổng: t1 = 3 + 2 + 1 = 6. Khi t0 = 0, lệnh bne sai và thoát lặp."
  },
  {
    id: 5,
    type: "single",
    question: (
      <div>
        Bộ nhớ được tổ chức theo cấu trúc Little-Endian và có đoạn mã sau:
        <pre className="bg-gray-100 p-2 mt-2 rounded">
          <code>
            .data{"\n"}
            val: .byte 0x11, 0x22, 0x33, 0x44{"\n"}
            .text{"\n"}
            la t0, val{"\n"}
            lw t1, 0(t0)
          </code>
        </pre>
        Thanh ghi t1 sẽ chứa giá trị nào?
      </div>
    ),
    options: ["0x11223344", "0x44332211", "0x00000011", "0x00000044"],
    answer: 1,
    explanation: "Little-Endian lưu byte ít quan trọng (LSB) ở địa chỉ thấp. val[0]=0x11, val[1]=0x22... Khi đọc bằng lw, byte 0x44 lên vị trí cao nhất -> 0x44332211."
  },
  {
    id: 6,
    type: "single",
    question: "Lệnh giả (Pseudo instruction) `li t0, 0x12345800` sẽ được Assembler của RISC-V biên dịch tương đương với chuỗi lệnh nào dưới đây?",
    options: [
      "lui t0, 0x12345; addi t0, t0, 0x800",
      "lui t0, 0x12346; addi t0, t0, -2048",
      "lui t0, 0x12346; ori t0, t0, 0x800",
      "lui t0, 0x12345; slli t0, t0, 12; addi t0, t0, 0x800"
    ],
    answer: 1,
    explanation: "Immediate 0x800 trong hệ 12-bit có dấu là số âm (-2048). Khi addi, nó sẽ bị mở rộng dấu thành 0xFFFFF800. Để bù lại phần bị trừ, bit thứ 12 của LUI phải được cộng thêm 1 (0x12345 + 1 = 0x12346)."
  },
  {
    id: 7,
    type: "multiple",
    question: "Khai báo nào sau đây cấp phát chính xác vùng nhớ 40 byte chứa toàn giá trị 0? (Chọn các đáp án đúng)",
    options: [
      ".space 40",
      ".word 0:10",
      ".byte 0:40",
      ".alloc 40"
    ],
    answer: [0, 1, 2],
    explanation: ".space 40 cấp 40 byte 0. .word 0:10 cấp 10 word (40 byte). .byte 0:40 cấp 40 byte. Tất cả A, B, C đều đúng trên RARS."
  },
  {
    id: 8,
    type: "single",
    question: "Giả sử PC hiện tại chứa địa chỉ 0x00400010 và trỏ tới lệnh `jalr ra, t0, 4`. Ngay sau khi lệnh này thực thi xong, thanh ghi `ra` sẽ chứa giá trị bao nhiêu?",
    options: ["0x00400010", "0x00400014", "t0 + 4", "Không xác định"],
    answer: 1,
    explanation: "Lệnh JALR luôn lưu địa chỉ của lệnh kế tiếp (PC + 4) vào thanh ghi liên kết ra (Return Address). PC hiện tại là 0x10, nên PC+4 = 0x14."
  },
  {
    id: 9,
    type: "single",
    question: (
      <div>
        Vòng lặp sau thực hiện lệnh `j loop` bao nhiêu lần trước khi kết thúc?
        <pre className="bg-gray-100 p-2 mt-2 rounded">
          <code>
            li t0, 1{"\n"}
            li t1, 4{"\n"}
            loop:{"\n"}
            beq t0, t1, end{"\n"}
            addi t0, t0, 1{"\n"}
            j loop{"\n"}
            end:
          </code>
        </pre>
      </div>
    ),
    options: ["1", "2", "3", "4"],
    answer: 2,
    explanation: "t0 bắt đầu từ 1. Lần 1: t0=2, nhảy. Lần 2: t0=3, nhảy. Lần 3: t0=4, nhảy. Lần 4: kiểm tra beq t0(4) == t1(4) -> đúng, nhảy tới end. Vậy lệnh j loop chạy 3 lần."
  },
  {
    id: 10,
    type: "single",
    question: "Trong kiến trúc MMIO của bàn phím ma trận trên RARS, để kiểm tra bằng phương pháp Polling xem có phím nào được bấm chưa, ta cần đọc vào một từ nhớ. Trạng thái 'Sẵn sàng' (Ready) thường được báo hiệu bằng bit số 0 của thanh ghi trạng thái mang giá trị gì?",
    options: ["0", "1", "-1", "Mã ASCII"],
    answer: 1,
    explanation: "Bit Ready (LSB của Control Register) bằng 1 khi có dữ liệu mới sẵn sàng để đọc, bằng 0 khi chưa có."
  },
  {
    id: 11,
    type: "multiple",
    question: "Theo quy ước gọi hàm chuẩn (Calling Convention) của RISC-V, các thanh ghi nào dưới đây thuộc nhóm 'Caller-saved' (Hàm gọi phải tự lưu trữ vào stack nếu cần giữ lại giá trị)?",
    options: ["t0 - t6", "s0 - s11", "a0 - a7", "sp"],
    answer: [0, 2],
    explanation: "Các thanh ghi tạm (t0-t6) và thanh ghi đối số (a0-a7) là caller-saved. Thanh ghi lưu vĩnh viễn (s0-s11) là callee-saved."
  },
  {
    id: 12,
    type: "single",
    question: "Lệnh `beq t0, t1, label` thuộc định dạng lệnh (Instruction Format) nào trong kiến trúc cơ sở RV32I?",
    options: ["R-type", "I-type", "S-type", "B-type"],
    answer: 3,
    explanation: "Lệnh nhánh (Branch) như beq, bne, blt... thuộc dạng B-type, là một biến thể của S-type dùng để nhảy theo địa chỉ PC-relative."
  },
  {
    id: 13,
    type: "single",
    question: "Immediate (giá trị tức thời) của lệnh nhảy nhánh (B-type) trong RV32I biểu diễn độ dời tương đối so với PC. Khoảng nhảy (Jump range) tối đa xấp xỉ là bao nhiêu byte?",
    options: ["±4 KB", "±2 KB", "±1 MB", "±2 MB"],
    answer: 0,
    explanation: "B-type sử dụng immediate 12-bit (nhưng bù thêm 1 bit 0 implicit do lệnh luôn canh hàng chẵn) tạo ra giá trị nhảy 13 bit có dấu, tức là -4096 đến +4094 byte (±4KB)."
  },
  {
    id: 14,
    type: "single",
    question: "Một màn hình Bitmap Display giả lập có kích thước Width = 512, Height = 256. Mỗi điểm ảnh lưu bằng 1 byte. Cần bao nhiêu byte trên bộ nhớ để lưu trữ toàn bộ khung hình (framebuffer)?",
    options: ["65,536 byte", "131,072 byte", "262,144 byte", "524,288 byte"],
    answer: 1,
    explanation: "Tổng số điểm ảnh là 512 * 256 = 131,072. Vì mỗi điểm 1 byte nên cần tổng cộng 131,072 byte."
  },
  {
    id: 15,
    type: "single",
    question: (
      <div>
        Đoạn mã hàm sau dùng tổng cộng bao nhiêu byte không gian Stack ở cấp độ sâu nhất của riêng nó?
        <pre className="bg-gray-100 p-2 mt-2 rounded">
          <code>
            my_func:{"\n"}
            addi sp, sp, -32{"\n"}
            sw ra, 28(sp){"\n"}
            jal child_func{"\n"}
            lw ra, 28(sp){"\n"}
            addi sp, sp, 32{"\n"}
            jr ra
          </code>
        </pre>
      </div>
    ),
    options: ["0", "4", "28", "32"],
    answer: 3,
    explanation: "Lệnh addi sp, sp, -32 đã cấp phát 32 byte trên Stack frame cho my_func."
  },
  {
    id: 16,
    type: "single",
    question: "Phép toán dịch trái logic `slli t1, t0, 3` cho kết quả tương đương với phép toán số học nào (giả sử không xảy ra tràn)?",
    options: ["t1 = t0 / 8", "t1 = t0 * 8", "t1 = t0 * 3", "t1 = t0 / 3"],
    answer: 1,
    explanation: "Dịch trái n bit tương đương với phép nhân giá trị đó với 2^n. slli ... 3 -> nhân với 2^3 = 8."
  },
  {
    id: 17,
    type: "single",
    question: "Trong RISC-V, lệnh `bge t0, t1, label` thực hiện so sánh theo kiểu gì?",
    options: [
      "So sánh nguyên không dấu (Unsigned)",
      "So sánh nguyên có dấu (Signed)",
      "So sánh logic địa chỉ",
      "Chỉ so sánh cờ Zero"
    ],
    answer: 1,
    explanation: "Các lệnh nhảy không có hậu tố 'u' (như bge, blt) đều thực hiện so sánh nguyên có dấu bù 2."
  },
  {
    id: 18,
    type: "single",
    question: "Khi sử dụng hàm hệ thống (Syscall) in một chuỗi ra console trong RARS (ecall số hiệu 4), thanh ghi nào phải chứa địa chỉ bắt đầu của chuỗi?",
    options: ["a7", "v0", "a0", "t0"],
    answer: 2,
    explanation: "Trong chuẩn RARS (và hầu hết RISC-V), a7 chứa số hiệu hàm dịch vụ, còn a0 chứa tham số đầu vào chính (địa chỉ chuỗi)."
  },
  {
    id: 19,
    type: "fill",
    question: "Nhập tên lệnh RISC-V duy nhất dùng để đọc 1 byte từ bộ nhớ vào thanh ghi mà KHÔNG thực hiện mở rộng dấu (Zero-extend).",
    answer: "lbu",
    explanation: "lbu (Load Byte Unsigned) đọc 1 byte và điền 0 vào 24 bit cao, thay vì điền bit dấu như lb."
  },
  {
    id: 20,
    type: "single",
    question: (
      <div>
        Đoạn chương trình sau nhằm in từng ký tự của chuỗi ra màn hình nhưng có lỗi. Lỗi đó là gì?
        <pre className="bg-gray-100 p-2 mt-2 rounded">
          <code>
            .data{"\n"}
            str: .asciiz "Hello"{"\n"}
            .text{"\n"}
            la t0, str{"\n"}
            loop:{"\n"}
            lbu t1, 0(t0){"\n"}
            beq t1, zero, exit{"\n"}
            addi a0, t1, 0{"\n"}
            li a7, 11{"\n"}
            ecall{"\n"}
            j loop{"\n"}
            exit:
          </code>
        </pre>
      </div>
    ),
    options: [
      "Sử dụng sai tham số cho ecall số 11",
      "So sánh điều kiện thoát bị ngược",
      "Nạp sai kích thước dữ liệu bằng lbu",
      "Vòng lặp vô hạn do quên tăng con trỏ t0"
    ],
    answer: 3,
    explanation: "Trong vòng lặp loop không có lệnh `addi t0, t0, 1` để tăng con trỏ chuỗi, nên nó luôn in ký tự 'H' mãi mãi."
  },
  {
    id: 21,
    type: "single",
    question: "Sau khi gọi ecall với chức năng đọc số nguyên (Read Int, a7 = 5), giá trị nguyên mà người dùng nhập từ bàn phím sẽ được RARS trả về ở thanh ghi nào?",
    options: ["a0", "a1", "t0", "v0"],
    answer: 0,
    explanation: "Các giá trị trả về từ ecall (như số đã đọc) luôn được lưu ở thanh ghi trả về quy chuẩn a0."
  },
  {
    id: 22,
    type: "multiple",
    question: "Chọn tất cả các lệnh có thể được dùng để GHI dữ liệu từ thanh ghi vào bộ nhớ (Memory) trong RV32I.",
    options: ["sw", "sb", "lw", "sh"],
    answer: [0, 1, 3],
    explanation: "Store Word (sw), Store Byte (sb), và Store Halfword (sh) đều là lệnh ghi bộ nhớ. lw là Load (đọc)."
  },
  {
    id: 23,
    type: "single",
    question: "Trong bài toán mô phỏng hệ thống lái MarsBot, để quay đầu xe về bên PHẢI một góc chính xác 90 độ, giá trị cập nhật vào thanh ghi điều khiển Hướng (Heading) phải như thế nào so với hiện tại?",
    options: [
      "Heading mới = Heading cũ + 90",
      "Heading mới = Heading cũ - 90",
      "Heading mới = 90",
      "Heading mới = -90"
    ],
    answer: 0,
    explanation: "Theo quy ước tọa độ, vòng tròn heading tăng theo chiều kim đồng hồ. Quay phải nghĩa là tăng thêm 90 độ."
  },
  {
    id: 24,
    type: "single",
    question: "Trong xử lý ngắt và ngoại lệ, thanh ghi CSR `mepc` (Machine Exception Program Counter) có vai trò gì?",
    options: [
      "Chứa địa chỉ bắt đầu của hàm phục vụ ngắt (Handler)",
      "Lưu trữ mã số định danh nguyên nhân gây lỗi",
      "Lưu lại địa chỉ của lệnh bị gián đoạn để CPU có thể quay về sau khi xử lý xong",
      "Kích hoạt hoặc vô hiệu hóa ngắt toàn cục"
    ],
    answer: 2,
    explanation: "`mepc` lưu địa chỉ PC lúc xảy ra ngắt. Lệnh `mret` cuối hàm xử lý ngắt sẽ lấy giá trị từ `mepc` nạp lại vào PC để tiếp tục chương trình chính."
  },
  {
    id: 25,
    type: "single",
    question: (
      <div>
        Kết quả in ra màn hình của đoạn lệnh sau là gì? (a7=1 là in số nguyên)
        <pre className="bg-gray-100 p-2 mt-2 rounded">
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
    explanation: "5 (hệ nhị phân là 0101), 3 (0011). 0101 XOR 0011 = 0110 (tức là 6 trong hệ thập phân)."
  },
  {
    id: 26,
    type: "single",
    question: "Lệnh `jal label` thuộc loại định dạng lệnh nào?",
    options: ["R-type", "I-type", "J-type", "U-type"],
    answer: 2,
    explanation: "JAL (Jump and Link) là lệnh đặc trưng của định dạng J-type, cho phép dùng 20 bit immediate để nhảy."
  },
  {
    id: 27,
    type: "single",
    question: "Lệnh giả `j label` (nhảy không điều kiện nhưng không cần lưu PC quay về) được Assembler biến đổi thành lệnh gốc nào sau đây?",
    options: [
      "jal x0, label",
      "jal ra, label",
      "beq x0, x0, label",
      "bne zero, zero, label"
    ],
    answer: 0,
    explanation: "Lệnh `j` chỉ đơn giản là gọi `jal` nhưng vứt bỏ địa chỉ trả về bằng cách lưu vào thanh ghi zero (x0)."
  },
  {
    id: 28,
    type: "single",
    question: "Phép toán logic NOT (ví dụ: `not t0, t1` để đảo toàn bộ 32 bit của t1 lưu vào t0) được RISC-V thực hiện thông qua lệnh cơ sở nào?",
    options: [
      "sub t0, zero, t1",
      "xori t0, t1, -1",
      "andi t0, t1, 0",
      "ori t0, t1, -1"
    ],
    answer: 1,
    explanation: "Phép XOR với chuỗi toàn bit 1 (giá trị -1 trong hệ bù 2 là 0xFFFFFFFF) sẽ đảo ngược toàn bộ các bit của t1."
  },
  {
    id: 29,
    type: "single",
    question: "Trong hệ thống đòi hỏi Address Alignment nghiêm ngặt, giá trị nào của t1 sẽ gây ra lỗi 'Address not aligned on word boundary' khi chạy lệnh `lw t0, 0(t1)`?",
    options: ["0x10000000", "0x10000004", "0x10000008", "0x10000002"],
    answer: 3,
    explanation: "Lệnh lw yêu cầu địa chỉ phải chia hết cho 4. 0x10000002 không chia hết cho 4, nên bị lỗi căn chỉnh."
  },
  {
    id: 30,
    type: "single",
    question: (
      <div>
        Quan sát cấu trúc hàm đệ quy sau:
        <pre className="bg-gray-100 p-2 mt-2 rounded">
          <code>
            func:{"\n"}
            addi sp, sp, -16{"\n"}
            sw ra, 12(sp){"\n"}
            ...{"\n"}
            jal func{"\n"}
            ...{"\n"}
            lw ra, 12(sp){"\n"}
            addi sp, sp, 16{"\n"}
            jr ra
          </code>
        </pre>
        Mục đích bắt buộc của việc lưu `ra` vào stack ở đây là gì?
      </div>
    ),
    options: [
      "Giữ cho cấu trúc ngăn xếp luôn được căn chỉnh 16 byte",
      "Truyền tham số từ hàm cha sang hàm con",
      "Tránh việc thanh ghi ra bị ghi đè bởi lệnh jal gọi chính nó, gây lỗi khi quay về hàm cha",
      "Tạo biến cục bộ động"
    ],
    answer: 2,
    explanation: "Mỗi khi chạy `jal func`, thanh ghi ra được ghi đè bằng địa chỉ mới. Nếu không lưu ra cũ vào stack, hàm không bao giờ quay lại được người gọi ban đầu."
  },
  {
    id: 31,
    type: "single",
    question: "Sự khác biệt cơ bản về nguyên nhân giữa Ngắt (Interrupt) và Ngoại lệ (Exception) là gì?",
    options: [
      "Ngoại lệ là do phần mềm hoặc tập lệnh gây ra (đồng bộ), còn Ngắt do phần cứng ngoại vi bên ngoài gây ra (bất đồng bộ)",
      "Ngoại lệ do phần cứng sinh ra, ngắt do lệnh gọi phần mềm sinh ra",
      "Không có khác biệt nào, cả hai lưu PC vào cùng một thanh ghi mcause",
      "Ngắt chỉ xảy ra khi CPU khởi động, ngoại lệ xảy ra trong lúc chạy"
    ],
    answer: 0,
    explanation: "Exceptions thường đồng bộ (vd: chia cho 0, lệnh không hợp lệ), còn Interrupts là bất đồng bộ (vd: bàn phím, timer từ bên ngoài CPU)."
  },
  {
    id: 32,
    type: "single",
    question: "Chỉ thị hợp ngữ `.eqv MAX_SIZE 100` có ý nghĩa là:",
    options: [
      "Cấp phát một vùng nhớ heap kích thước 100 byte",
      "Khởi tạo một biến bộ nhớ toàn cục (memory variable) mang giá trị 100",
      "Định nghĩa macro thay thế toàn văn (text replacement), đổi 'MAX_SIZE' thành chuỗi '100' trước khi dịch",
      "Gán trực tiếp số 100 vào thanh ghi MAX_SIZE"
    ],
    answer: 2,
    explanation: ".eqv hoạt động giống #define trong C, nó không chiếm bộ nhớ mà chỉ thay thế chuỗi ký tự trong mã nguồn."
  },
  {
    id: 33,
    type: "single",
    question: "Một mảng 3 phần tử word được khai báo: `array: .word 10, 20, 30`. Giả sử địa chỉ cơ sở nạp vào t0. Để đọc giá trị `30` vào t1, lệnh nào là đúng?",
    options: [
      "lw t1, 2(t0)",
      "lw t1, 3(t0)",
      "lw t1, 8(t0)",
      "lw t1, 12(t0)"
    ],
    answer: 2,
    explanation: "Giá trị 30 nằm ở index thứ 2. Vì mỗi phần tử word dài 4 byte, độ dời (offset) phải là 2 * 4 = 8. Do đó dùng 8(t0)."
  },
  {
    id: 34,
    type: "single",
    question: "Trong RISC-V, khi thực hiện cấp phát dữ liệu vào Stack (push), thanh ghi con trỏ ngăn xếp `sp` sẽ di chuyển theo hướng nào trên không gian bộ nhớ?",
    options: [
      "Từ địa chỉ thấp hướng lên địa chỉ cao (tăng dần)",
      "Từ địa chỉ cao hướng xuống địa chỉ thấp (giảm dần)",
      "Hướng cố định ở địa chỉ 0",
      "Không di chuyển, chỉ con trỏ phụ gp di chuyển"
    ],
    answer: 1,
    explanation: "Stack của RISC-V phát triển xuống dưới. Do đó mỗi lần cấp phát, ta phải TRỪ đi dung lượng ở thanh ghi sp (addi sp, sp, -x)."
  },
  {
    id: 35,
    type: "single",
    question: "Thanh ghi CSR `mtvec` (Machine Trap-Vector Base Address) dùng để làm gì?",
    options: [
      "Lưu trạng thái bật tắt của hệ thống ngắt",
      "Ghi nhận mã nguyên nhân gây ra ngoại lệ",
      "Lưu trữ địa chỉ của lệnh sinh ra ngoại lệ",
      "Lưu địa chỉ cơ sở của bảng Vector Ngắt hoặc hàm Trap Handler để CPU nhảy tới khi có lỗi"
    ],
    answer: 3,
    explanation: "Khi có ngắt, phần cứng đọc mtvec để biết phải chuyển PC về địa chỉ nào để bắt đầu chạy đoạn mã phục vụ (Trap Handler)."
  },
  {
    id: 36,
    type: "single",
    question: "Lệnh giả `nop` (No Operation - không làm gì cả, tốn 1 chu kỳ) được ánh xạ (map) vào lệnh gốc nào trong RV32I?",
    options: [
      "add zero, zero, zero",
      "addi zero, zero, 0",
      "slli zero, zero, 0",
      "sub zero, zero, zero"
    ],
    answer: 1,
    explanation: "Theo chuẩn RISC-V, NOP được dịch thành `addi x0, x0, 0`."
  },
  {
    id: 37,
    type: "single",
    question: "Khẳng định nào dưới đây đúng với quy cách lưu trữ số nguyên có dấu trong RISC-V khi bị tràn số (Arithmetic Overflow) ở phép cộng hai số dương?",
    options: [
      "Hệ thống tự động phát hiện, bật cờ ngắt và dừng chương trình",
      "Thanh ghi PC tự động nhảy tới Exception Handler tương tự như chia cho 0",
      "Phần cứng bỏ qua phần tràn, âm hóa kết quả theo quy tắc bù 2 một cách im lặng mà không báo lỗi",
      "Phần dữ liệu tràn ra sẽ tự động được cất vào thanh ghi chuyên dụng"
    ],
    answer: 2,
    explanation: "Không giống một số kiến trúc khác, RISC-V không tự sinh exception khi tràn số học nguyên. Lập trình viên phải tự viết mã kiểm tra nếu cần."
  },
  {
    id: 38,
    type: "single",
    question: "Trên LED 7 thanh giả lập của Digital Lab Sim, muốn hiện số '0', ta cần bật sáng các đoạn A,B,C,D,E,F và tắt đoạn G, DP. Với quy định gán bit: DP(7) G(6) F(5) E(4) D(3) C(2) B(1) A(0). Mã Hexa cần ghi ra bộ điều khiển là?",
    options: ["0x06", "0x3F", "0x7F", "0x5B"],
    answer: 1,
    explanation: "Các bit 0,1,2,3,4,5 bật (1), bit 6,7 tắt (0). Chuỗi nhị phân là 00111111, đổi ra hex là 0x3F."
  },
  {
    id: 39,
    type: "short",
    question: (
      <div>
        Phân tích đoạn mã và bộ nhớ sau:
        <pre className="bg-gray-100 p-2 mt-2 rounded">
          <code>
            li t0, 0xAABBCCDD{"\n"}
            addi sp, sp, -4{"\n"}
            sw t0, 0(sp){"\n"}
            lb t1, 2(sp)
          </code>
        </pre>
        Biết hệ thống dùng Little-Endian. Hãy điền giá trị Hexa của t1 sau khi thực thi xong (Định dạng đủ 8 ký tự hexa, ví dụ 0xFFFFFFFF).
      </div>
    ),
    answer: "0xFFFFFFBB",
    explanation: "Little Endian: sp[0]=DD, sp[1]=CC, sp[2]=BB, sp[3]=AA. Lệnh lb đọc 1 byte tại offset 2 là 0xBB (byte có bit dấu là 1 vì 0xB = 1011). Khi dùng lệnh lb có dấu, nó tự động mở rộng dấu thành 0xFFFFFFBB."
  },
  {
    id: 40,
    type: "single",
    question: (
      <div>
        Tìm kết quả cuối cùng (giá trị t2) của vòng lặp sau, biết đây là thuật toán cơ bản đối với mảng:
        <pre className="bg-gray-100 p-2 mt-2 rounded">
          <code>
            .data{"\n"}
            arr: .word 4, 1, 9, 7{"\n"}
            .text{"\n"}
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
    explanation: "Thuật toán tuần tự duyệt mảng. Nếu phần tử đọc ra t5 > t2 (t2 là MAX tạm thời), thì cập nhật t2 = t5. Cuối cùng t2 sẽ chứa giá trị lớn nhất trong mảng, tức là 9."
  }
];

export default function RiscVExamApp() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: any }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(40 * 60);

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
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6 flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <div>
            <h1 className="text-2xl font-extrabold text-indigo-700">Đề Thi Thực Hành Kiến Trúc Máy Tính</h1>
            <p className="text-sm text-slate-500 font-medium mt-1">Kiến trúc: RISC-V (RV32I) | Tổng: {questions.length} câu</p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col items-end">
            <span className={`text-xl font-bold font-mono px-4 py-2 rounded-lg ${timeLeft < 300 && !isSubmitted ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-700'}`}>
              Thời gian: {formatTime(timeLeft)}
            </span>
          </div>
        </header>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 rounded-full h-2.5 mb-6">
          <div 
            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        {isSubmitted && (
          <div className="bg-emerald-50 border border-emerald-400 text-emerald-800 p-5 rounded-xl shadow-sm mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black">Kết Quả Bài Thi</h2>
              <p className="text-lg mt-1 font-medium">Bạn đạt: {getScore()} / {questions.length} điểm</p>
            </div>
          </div>
        )}

        <div className="bg-white shadow-sm border border-slate-200 rounded-xl p-6 md:p-8 mb-6">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
            <span className="text-lg font-bold text-slate-700">Câu hỏi {currentIdx + 1} / {questions.length}</span>
            {isSubmitted && (
              <span className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider ${isCorrect(question) ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
                {isCorrect(question) ? "ĐÚNG" : "SAI"}
              </span>
            )}
          </div>
          
          <div className="text-lg md:text-xl font-medium mb-8 text-slate-800 leading-relaxed">
            {question.question}
          </div>

          <div className="space-y-4">
            {question.type === "single" &&
              question.options?.map((opt, idx) => {
                const isSelected = answers[question.id] === idx;
                const isAns = question.answer === idx;
                let optionStyle = "border-slate-300 hover:border-indigo-400 hover:bg-indigo-50/50";
                
                if (isSubmitted) {
                  if (isAns) optionStyle = "bg-emerald-50 border-emerald-500 font-semibold ring-1 ring-emerald-500";
                  else if (isSelected) optionStyle = "bg-rose-50 border-rose-400 opacity-80";
                  else optionStyle = "opacity-50 border-slate-200 bg-slate-50";
                } else if (isSelected) {
                  optionStyle = "bg-indigo-50 border-indigo-500 ring-1 ring-indigo-500";
                }

                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectSingle(idx)}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${optionStyle}`}
                  >
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center mr-4 ${isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-400'}`}>
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
                let optionStyle = "border-slate-300 hover:border-indigo-400 hover:bg-indigo-50/50";

                if (isSubmitted) {
                  if (isAns) optionStyle = "bg-emerald-50 border-emerald-500 font-semibold ring-1 ring-emerald-500";
                  else if (isSelected) optionStyle = "bg-rose-50 border-rose-400 opacity-80";
                  else optionStyle = "opacity-50 border-slate-200 bg-slate-50";
                } else if (isSelected) {
                  optionStyle = "bg-indigo-50 border-indigo-500 ring-1 ring-indigo-500";
                }

                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectMultiple(idx)}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${optionStyle}`}
                  >
                    <div className="flex items-center">
                       <div className={`flex-shrink-0 w-5 h-5 rounded flex items-center justify-center mr-4 ${isSelected ? 'bg-indigo-600 border-indigo-600' : 'border border-slate-400'}`}>
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
                        : "bg-rose-50 border-rose-400 text-rose-900"
                      : "bg-slate-50 border-slate-300 focus:border-indigo-500 focus:bg-white"
                  }`}
                  placeholder="Nhập đáp án của bạn vào đây..."
                  value={answers[question.id] || ""}
                  onChange={(e) => handleInputFill(e.target.value)}
                  readOnly={isSubmitted}
                  spellCheck={false}
                />
                {isSubmitted && !isCorrect(question) && (
                  <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                    <p className="text-sm text-emerald-800 font-bold mb-1 uppercase tracking-wider">Đáp án chuẩn xác:</p>
                    <p className="font-mono text-lg font-bold text-emerald-700">{question.answer}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {isSubmitted && (
            <div className="mt-8 p-5 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl">
              <h4 className="font-bold text-amber-900 mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Giải thích cặn kẽ:
              </h4>
              <p className="text-amber-900 leading-relaxed font-medium">{question.explanation}</p>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center pb-12">
          <button
            onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
            disabled={currentIdx === 0}
            className="px-6 py-3 bg-white text-slate-700 border border-slate-300 rounded-xl hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed font-bold transition-all shadow-sm"
          >
            &larr; Câu trước
          </button>

          {!isSubmitted && (
            <button
              onClick={() => {
                if(window.confirm("Bạn có chắc chắn muốn nộp bài? Hành động này không thể hoàn tác.")) {
                  setIsSubmitted(true);
                }
              }}
              className="px-8 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 font-black shadow-lg shadow-red-200 transition-all transform hover:-translate-y-0.5"
            >
              NỘP BÀI NGAY
            </button>
          )}

          <button
            onClick={() => setCurrentIdx((prev) => Math.min(questions.length - 1, prev + 1))}
            disabled={currentIdx === questions.length - 1}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed font-bold transition-all shadow-lg shadow-indigo-200 flex items-center"
          >
            Câu tiếp &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}