"use client";

import React, { useState } from 'react';

// Cấu trúc dữ liệu câu hỏi
type Question = {
  id: number;
  type: 'theory' | 'practice';
  chapter: 1 | 2 | 3;
  question: string;
  options: string[];
  correctAnswer: number;
  rationale: string;
};

// DỮ LIỆU HARDCODE ĐẦY ĐỦ 50 CÂU HỎI (Tuyệt đối không cắt xén)
const questions: Question[] = [
  // --- CHƯƠNG 1 & 2 & 3: 20 CÂU LÝ THUYẾT ĐÁNH ĐỐ ---
  {
    id: 1, type: 'theory', chapter: 1,
    question: "Khẳng định nào sau đây phân biệt chính xác nhất giữa Kiến trúc tập lệnh (ISA) và Tổ chức máy tính (Vi kiến trúc)?",
    options: [
      "A. ISA quy định cách thức thiết kế phần cứng, trong khi Vi kiến trúc quy định phần mềm.",
      "B. ISA là giao diện giữa phần mềm và phần cứng nhìn từ góc độ lập trình viên, còn Vi kiến trúc là cách triển khai ISA đó bằng các thành phần phần cứng cụ thể.",
      "C. Cùng một ISA chỉ có thể được triển khai bằng một Vi kiến trúc duy nhất để đảm bảo tính tương thích.",
      "D. Vi kiến trúc quyết định số lượng thanh ghi hiển thị cho lập trình viên, còn ISA quyết định công nghệ bóng bán dẫn."
    ],
    correctAnswer: 1,
    rationale: "ISA (Instruction Set Architecture) là khái niệm logic, quyết định các lệnh, thanh ghi mà phần mềm 'nhìn thấy'. Vi kiến trúc (Microarchitecture) là cách kỹ sư phần cứng hiện thực hóa ISA đó (ví dụ dùng pipeline, superscalar). Nhiều vi kiến trúc khác nhau (Core i3, i7) có thể dùng chung một ISA (x86)."
  },
  {
    id: 2, type: 'theory', chapter: 1,
    question: "Tại sao tham số MIPS (Million Instructions Per Second) lại bị coi là một thước đo hiệu năng không đáng tin cậy khi so sánh hai máy tính có Kiến trúc tập lệnh (ISA) khác nhau?",
    options: [
      "A. Vì MIPS không tính đến thời gian trễ của bộ nhớ cache.",
      "B. Vì các ISA khác nhau sẽ cần số lượng lệnh (Instruction Count) khác nhau để thực hiện cùng một chương trình.",
      "C. Vì MIPS chỉ đo tốc độ xung nhịp của CPU chứ không đo tốc độ thực thi lệnh.",
      "D. Vì MIPS luôn tỷ lệ nghịch với thời gian thực thi (Execution Time) trên mọi cấu hình."
    ],
    correctAnswer: 1,
    rationale: "MIPS = Instruction Count / (Execution Time * 10^6). Khi so sánh 2 máy có ISA khác nhau (VD: CISC vs RISC), chương trình trên CISC có thể tốn ít lệnh hơn nhưng lệnh phức tạp hơn. Do đó máy có MIPS cao hơn chưa chắc đã chạy chương trình nhanh hơn nếu nó cần phải chạy quá nhiều lệnh đơn giản."
  },
  {
    id: 3, type: 'theory', chapter: 2,
    question: "Trong cấu trúc liên kết Bus của hệ thống máy tính, tín hiệu nào sau đây KHÔNG do CPU phát ra trên Control Bus?",
    options: [
      "A. Memory Read (Điều khiển đọc bộ nhớ)",
      "B. Memory Write (Điều khiển ghi bộ nhớ)",
      "C. Interrupt Request (Yêu cầu ngắt)",
      "D. I/O Read (Điều khiển đọc thiết bị vào-ra)"
    ],
    correctAnswer: 2,
    rationale: "Interrupt Request (Yêu cầu ngắt) là tín hiệu được phát ra từ các thiết bị ngoại vi (Module I/O) hoặc bộ định thời để báo hiệu cho CPU, chứ không phải do CPU phát ra để điều khiển các module khác."
  },
  {
    id: 4, type: 'theory', chapter: 2,
    question: "Quá trình nào xảy ra ĐÚNG NHẤT khi CPU xử lý một tín hiệu ngắt (Interrupt) từ thiết bị Vào-Ra?",
    options: [
      "A. CPU dừng ngay lập tức lệnh đang thực hiện dở dang, nhảy đến trình phục vụ ngắt.",
      "B. CPU hoàn thành lệnh đang thực thi, lưu ngữ cảnh (PC), chuyển quyền điều khiển cho chương trình con xử lý ngắt, sau đó khôi phục ngữ cảnh và tiếp tục.",
      "C. CPU bỏ qua ngắt nếu đang thực thi lệnh tính toán số học, chỉ nhận ngắt khi đang rảnh rỗi.",
      "D. Module I/O tự động ghi dữ liệu vào bộ nhớ chính (RAM) mà không cần báo cho CPU."
    ],
    correctAnswer: 1,
    rationale: "Nguyên tắc xử lý ngắt: CPU luôn hoàn thành nốt chu trình lệnh hiện tại (không dừng lệnh đang dở dang), kiểm tra cờ ngắt, lưu lại giá trị Program Counter (PC) hiện tại để biết đường quay về, sau đó mới nạp địa chỉ của trình phục vụ ngắt vào PC."
  },
  {
    id: 5, type: 'theory', chapter: 2,
    question: "Đặc điểm nào sau đây mô tả đúng nhất chức năng của DMA (Direct Memory Access)?",
    options: [
      "A. Cho phép CPU truy cập trực tiếp vào đĩa cứng mà không qua bộ nhớ đệm.",
      "B. Cho phép Module I/O trao đổi dữ liệu trực tiếp với Bộ nhớ chính mà CPU không cần can thiệp vào từng byte dữ liệu.",
      "C. Cho phép Bộ nhớ chính gửi lệnh điều khiển trực tiếp đến các thiết bị ngoại vi.",
      "D. Giúp tăng tốc độ xung nhịp CPU khi xử lý các mảng dữ liệu lớn."
    ],
    correctAnswer: 1,
    rationale: "DMA giải phóng CPU khỏi việc phải trung chuyển từng khối dữ liệu. Module I/O (hoặc bộ điều khiển DMA) sẽ nắm quyền điều khiển Bus để tự động truyền dữ liệu trực tiếp vào/ra Bộ nhớ chính (RAM)."
  },
  {
    id: 6, type: 'theory', chapter: 3,
    question: "Trong kiến trúc RISC-V (32-bit), thanh ghi 'zero' (x0) có đặc điểm gì đặc biệt khiến nó trở nên hữu ích trong thiết kế tập lệnh?",
    options: [
      "A. Nó chứa địa chỉ trả về của một chương trình con.",
      "B. Nó luôn được phần cứng gắn cứng với giá trị 0, các thao tác ghi vào nó sẽ bị bỏ qua, giúp tổng hợp nhiều Pseudo-instructions.",
      "C. Nó là thanh ghi duy nhất có độ rộng 64-bit trong kiến trúc RV32I.",
      "D. Nó tự động đếm số lượng lệnh có giá trị 0 đã thực thi."
    ],
    correctAnswer: 1,
    rationale: "x0 luôn bằng 0. Ghi vào x0 không có tác dụng (bị vứt bỏ). Điều này cho phép tạo ra các Pseudo-instruction (lệnh giả) như 'mv rd, rs' thực chất là 'add rd, rs, x0', hoặc 'nop' là 'addi x0, x0, 0' giúp ISA nhỏ gọn hơn."
  },
  {
    id: 7, type: 'theory', chapter: 3,
    question: "Khi thực hiện lệnh 'lb x5, 0(x10)' trong RISC-V, nếu byte được nạp từ bộ nhớ có giá trị là 0x8A, giá trị cuối cùng của thanh ghi x5 (32-bit) sẽ là gì?",
    options: [
      "A. 0x0000008A",
      "B. 0x8A000000",
      "C. 0xFFFFFF8A",
      "D. 0x00000000"
    ],
    correctAnswer: 2,
    rationale: "Lệnh 'lb' (Load Byte) thực hiện mở rộng có dấu (Sign-extension). Giá trị 0x8A có dạng nhị phân là 1000 1010, bit dấu (bit 7) là 1. Vì vậy, khi mở rộng lên 32-bit, các bit cao sẽ được điền toàn số 1, kết quả là 0xFFFFFF8A."
  },
  {
    id: 8, type: 'theory', chapter: 3,
    question: "Lệnh rẽ nhánh (Branch) trong RISC-V như 'beq rs1, rs2, imm' sử dụng định dạng B-Type. Đặc điểm nào của trường immediate (imm) trong lệnh này là hệ quả của thiết kế tối ưu phần cứng?",
    options: [
      "A. imm không lưu bit 0 (bit LSB luôn bằng 0 do địa chỉ lệnh phải chẵn), tiết kiệm được 1 bit để tăng tầm rẽ nhánh lên ±4KB.",
      "B. imm được chia làm 3 phần để ALU xử lý song song.",
      "C. imm luôn là số không dấu (unsigned) để không phải thực hiện Sign-extension.",
      "D. imm tự động được cộng thêm 4 ngay trong mạch giải mã trước khi đưa vào ALU."
    ],
    correctAnswer: 0,
    rationale: "Các lệnh trong RISC-V dài 32-bit (4 byte) hoặc 16-bit (ở chế độ nén), nên địa chỉ lệnh luôn chẵn (bit 0 = 0). Thay vì lưu bit 0 lãng phí, RISC-V dịch imm sang trái 1 bit (imm[12:1]), giúp biểu diễn được tầm rẽ nhánh rộng gấp đôi (-4096 đến 4094 byte)."
  },
  {
    id: 9, type: 'theory', chapter: 3,
    question: "Tại sao RISC-V phân biệt rạch ròi các lệnh dịch phải: srl (Shift Right Logical) và sra (Shift Right Arithmetic)?",
    options: [
      "A. srl dùng cho số thực dấu phẩy động, sra dùng cho số nguyên.",
      "B. srl chèn bit 0 vào vị trí trống bên trái, phù hợp với số không dấu. sra chèn bản sao của bit dấu ban đầu, để bảo toàn dấu cho số nguyên có dấu.",
      "C. sra dịch toàn bộ thanh ghi sang phải 2 bit, srl dịch 1 bit.",
      "D. Không có sự khác biệt về kết quả, chỉ khác nhau ở mã opcode."
    ],
    correctAnswer: 1,
    rationale: "Shift Right Logical (SRL) luôn điền các bit 0 vào vị trí cao nhất (MSB), dùng cho logic mask hoặc unsigned int. Shift Right Arithmetic (SRA) sao chép MSB cũ vào MSB mới, bảo toàn dấu cho phép chia số có dấu (signed int) cho lũy thừa 2."
  },
  {
    id: 10, type: 'theory', chapter: 2,
    question: "Bộ đệm Cache trong hệ thống phân cấp bộ nhớ hoạt động dựa trên nguyên lý nào sau đây?",
    options: [
      "A. Nguyên lý đa luồng (Multithreading)",
      "B. Tính cục bộ về không gian và thời gian (Spatial and Temporal Locality)",
      "C. Nguyên lý truy cập ngẫu nhiên (Random Access)",
      "D. Cơ chế bộ nhớ ảo (Virtual Memory)"
    ],
    correctAnswer: 1,
    rationale: "Cache dựa trên nguyên lý Locality. Temporal locality: dữ liệu vừa truy cập khả năng cao sẽ được truy cập lại. Spatial locality: dữ liệu nằm gần dữ liệu vừa truy cập khả năng cao sẽ được truy cập tới (ví dụ duyệt mảng tuần tự)."
  },
  {
    id: 11, type: 'theory', chapter: 3,
    question: "Thanh ghi 'ra' (x1 - Return Address) trong tập thanh ghi RISC-V có nhiệm vụ chính là gì trong quá trình gọi chương trình con (procedure)?",
    options: [
      "A. Lưu trữ kết quả trả về của hàm (Return Value).",
      "B. Lưu trữ các tham số truyền vào hàm.",
      "C. Lưu trữ địa chỉ của lệnh tiếp theo ngay sau lệnh gọi hàm (jal), để hàm có thể quay trở lại nơi gọi.",
      "D. Lưu trữ con trỏ ngăn xếp (Stack Pointer)."
    ],
    correctAnswer: 2,
    rationale: "Lệnh JAL (Jump and Link) nạp địa chỉ nhảy tới vào PC, đồng thời tự động lưu PC+4 (địa chỉ lệnh tiếp theo) vào thanh ghi x1 (ra). Khi hàm kết thúc, lệnh JALR thực hiện nhảy tới địa chỉ chứa trong x1 để quay về."
  },
  {
    id: 12, type: 'theory', chapter: 1,
    question: "Khi tăng số tầng (stages) của đường ống (Pipeline) trong bộ xử lý, yếu tố nào sau đây có khả năng bị ảnh hưởng tiêu cực (tăng lên) làm giảm hiệu năng kỳ vọng?",
    options: [
      "A. MIPS giảm đột ngột do xung nhịp giảm.",
      "B. Tổn thất do Hazards (đặc biệt là rẽ nhánh) cao hơn, và CPI thực tế bị tăng lên do phải stall đường ống nhiều hơn.",
      "C. Bộ nhớ Cache L1 tự động bị giảm dung lượng do phải nhường diện tích chip.",
      "D. Instruction Count (IC) của chương trình bị tăng theo số tầng."
    ],
    correctAnswer: 1,
    rationale: "Đường ống sâu (deep pipeline) giúp tăng xung nhịp (giảm T0), nhưng khi xảy ra rẽ nhánh sai (branch misprediction) hoặc Data Hazard, số lượng chu kỳ bị lãng phí (stall/flush) sẽ lớn hơn rất nhiều, làm tăng CPI trung bình."
  },
  {
    id: 13, type: 'theory', chapter: 3,
    question: "Trong quy ước gọi hàm của RISC-V, nhóm thanh ghi nào thuộc loại 'Callee-saved' (Hàm được gọi phải bảo toàn giá trị)?",
    options: [
      "A. t0 - t6 (Thanh ghi tạm)",
      "B. a0 - a7 (Thanh ghi đối số)",
      "C. s0 - s11 (Thanh ghi lưu trữ)",
      "D. x0 (Zero register)"
    ],
    correctAnswer: 2,
    rationale: "Các thanh ghi 's' (Saved registers) là Callee-saved. Nghĩa là nếu hàm con muốn sử dụng chúng, hàm con có trách nhiệm lưu chúng vào Stack và khôi phục nguyên vẹn trước khi trả về. Các thanh ghi 't' (Temporary) là Caller-saved, hàm con có quyền ghi đè tự do."
  },
  {
    id: 14, type: 'theory', chapter: 3,
    question: "Bộ nhớ RISC-V tuân theo quy tắc 'Little-endian'. Nếu một thanh ghi chứa giá trị 32-bit là 0x11223344 được lưu vào bộ nhớ tại địa chỉ 0x100, nội dung tại byte có địa chỉ 0x102 sẽ là bao nhiêu?",
    options: [
      "A. 0x11",
      "B. 0x22",
      "C. 0x33",
      "D. 0x44"
    ],
    correctAnswer: 1,
    rationale: "Little-endian lưu byte thấp nhất (LSB) ở địa chỉ nhỏ nhất. 0x44 nằm ở 0x100, 0x33 nằm ở 0x101, 0x22 nằm ở 0x102, và 0x11 nằm ở 0x103."
  },
  {
    id: 15, type: 'theory', chapter: 1,
    question: "Định luật Amdahl thể hiện nguyên lý gì về hiệu năng hệ thống?",
    options: [
      "A. Hiệu năng của toàn bộ hệ thống tăng tuyến tính theo số lượng lõi CPU.",
      "B. Tốc độ cải thiện của hệ thống bị giới hạn bởi phần trăm thời gian của công việc không được cải thiện.",
      "C. Tốc độ xung nhịp CPU sẽ tăng gấp đôi sau mỗi 18 tháng.",
      "D. Giảm thời gian truy cập cache sẽ tỷ lệ thuận bình phương với MIPS."
    ],
    correctAnswer: 1,
    rationale: "Amdahl's Law: Speedup = 1 / ((1 - F) + F/S). Trong đó F là tỷ lệ phần cứng/phần mềm được tăng tốc (S lần). Dù S tiến tới vô cùng, giới hạn cải thiện tối đa vẫn bị kìm hãm bởi phần (1 - F) không thể tăng tốc."
  },
  {
    id: 16, type: 'theory', chapter: 2,
    question: "Tại sao dữ liệu trong quá trình CPU thực thi lệnh cần qua đường 'Data Path' và 'Control Path' độc lập với nhau?",
    options: [
      "A. Để giảm số bóng bán dẫn cần thiết.",
      "B. Data Path chịu trách nhiệm vận chuyển, biến đổi số liệu (ALU, thanh ghi), Control Path sinh ra các tín hiệu (MUX, Write Enable) để điều khiển các phần tử trong Data Path hoạt động đúng trình tự.",
      "C. Control path chỉ tương tác với RAM, Data path chỉ tương tác với đĩa cứng.",
      "D. Hai đường này ghép lại làm tăng Instruction Count."
    ],
    correctAnswer: 1,
    rationale: "Vi kiến trúc chia làm Data Path (khối dữ liệu: ALU, thanh ghi, bộ nhớ) và Control Unit (khối điều khiển). Khối điều khiển nhận Opcode, giải mã và phát các tín hiệu điều khiển (như ALUSrc, RegWrite) để quyết định dữ liệu trong Data Path chảy như thế nào."
  },
  {
    id: 17, type: 'theory', chapter: 3,
    question: "Lệnh LUI (Load Upper Immediate) trong RISC-V có định dạng U-Type. Mục đích chính của nó khi kết hợp với ADDI là gì?",
    options: [
      "A. Để tăng xung nhịp CPU lên gấp đôi.",
      "B. Lấy dữ liệu từ bộ nhớ tĩnh nạp vào bộ nhớ động.",
      "C. Giúp cấu tạo nên một hằng số 32-bit hoàn chỉnh vào một thanh ghi do ADDI chỉ nạp được 12-bit.",
      "D. Đọc dữ liệu từ thanh ghi trạng thái điều khiển (CSR)."
    ],
    correctAnswer: 2,
    rationale: "Lệnh LUI nạp 20 bit cao vào thanh ghi, xóa 12 bit thấp. Lệnh ADDI có thể cộng thêm hằng số 12 bit thấp (có dấu). Kết hợp LUI + ADDI là thủ thuật chuẩn trong RISC-V để tạo ra hằng số 32-bit tùy ý trong 2 lệnh (ví dụ pseudo-instruction 'li')."
  },
  {
    id: 18, type: 'theory', chapter: 3,
    question: "Điểm khác biệt căn bản về format giữa lệnh I-Type (như addi) và lệnh S-Type (như sw) trong kiến trúc RISC-V là gì?",
    options: [
      "A. I-Type có 2 thanh ghi nguồn, S-Type chỉ có 1 thanh ghi nguồn.",
      "B. Lệnh I-Type lưu imm liên tục ở 12 bit cao nhất, trong khi S-Type cắt imm thành 2 nửa (imm[11:5] và imm[4:0]) để nhường chỗ cho vị trí cố định của các trường rs1 và rs2 trên mã lệnh.",
      "C. S-Type không có trường immediate, mọi dữ liệu lấy từ thanh ghi.",
      "D. I-Type chỉ dùng cho số không dấu, S-Type chỉ dùng cho số có dấu."
    ],
    correctAnswer: 1,
    rationale: "RISC-V cố gắng giữ cố định vị trí các trường thanh ghi (rs1 ở bit 19:15, rs2 ở 24:20) trên mọi định dạng lệnh để việc giải mã nhanh nhất. Vì lệnh Store (S-Type) cần cả rs1 (base address) và rs2 (dữ liệu để cất đi), trường imm buộc phải bị tách làm 2 mảnh: bit 31-25 và bit 11-7."
  },
  {
    id: 19, type: 'theory', chapter: 3,
    question: "Mã giả (Pseudo-instruction) 'j label' được trình biên dịch hợp ngữ RISC-V dịch thành lệnh thật nào dưới đây?",
    options: [
      "A. beq x0, x0, label",
      "B. jal x0, label",
      "C. auipc x1, label",
      "D. jalr x1, x0, label"
    ],
    correctAnswer: 1,
    rationale: "Lệnh Jump vô điều kiện trong RISC-V là JAL. 'j label' tức là nhảy mà không cần lưu địa chỉ trả về (không phải hàm). Trình biên dịch dịch nó thành 'jal x0, label', sử dụng x0 làm thanh ghi đích nên địa chỉ trả về bị ném đi."
  },
  {
    id: 20, type: 'theory', chapter: 1,
    question: "Thành phần cốt lõi nào của hệ thống máy tính chịu trách nhiệm dịch (biên dịch) mã nguồn cấp cao (ví dụ C/C++) xuống một tập hợp các lệnh hợp ngữ (Assembly) tuân theo ISA?",
    options: [
      "A. Hệ điều hành (OS)",
      "B. Trình liên kết (Linker)",
      "C. Trình biên dịch (Compiler)",
      "D. Vi kiến trúc phần cứng (Microarchitecture)"
    ],
    correctAnswer: 2,
    rationale: "Compiler (Trình biên dịch) dịch ngôn ngữ bậc cao (C) sang Assembly. Assembler (Trình hợp dịch) dịch Assembly sang Machine code (Object file). Linker kết nối các Object file thành file thực thi."
  },

  // --- CHƯƠNG 1: 15 CÂU BÀI TẬP HIỆU NĂNG ---
  {
    id: 21, type: 'practice', chapter: 1,
    question: "Một bộ xử lý chạy với xung nhịp f = 2 GHz và có chỉ số CPI trung bình là 4. Tính tốc độ thực thi lệnh theo MIPS của bộ xử lý này.",
    options: [
      "A. 500 MIPS",
      "B. 800 MIPS",
      "C. 2000 MIPS",
      "D. 250 MIPS"
    ],
    correctAnswer: 0,
    rationale: "Tốc độ tính bằng lệnh/giây = f / CPI = (2 * 10^9) / 4 = 0.5 * 10^9 lệnh/s = 500 * 10^6 lệnh/s. Vậy MIPS = 500."
  },
  {
    id: 22, type: 'practice', chapter: 1,
    question: "Một bộ xử lý có tốc độ xung nhịp 1 GHz. Khi thực thi một chương trình, công cụ đo được tốc độ MIPS là 400. Hỏi CPI trung bình của chương trình này trên bộ xử lý là bao nhiêu?",
    options: [
      "A. 4.0",
      "B. 2.0",
      "C. 2.5",
      "D. 0.4"
    ],
    correctAnswer: 2,
    rationale: "MIPS = f / (CPI * 10^6) => CPI = f / (MIPS * 10^6). Với f = 10^9 Hz, CPI = 10^9 / (400 * 10^6) = 1000 / 400 = 2.5 chu kỳ/lệnh."
  },
  {
    id: 23, type: 'practice', chapter: 1,
    question: "Một chương trình C biên dịch ra 5x10^8 lệnh máy. Chạy trên CPU 2GHz với CPI = 1.2. Tính thời gian CPU để thực thi xong chương trình này.",
    options: [
      "A. 0.3 giây",
      "B. 0.6 giây",
      "C. 1.2 giây",
      "D. 3.0 giây"
    ],
    correctAnswer: 0,
    rationale: "CPU Time = IC * CPI / f = (5 * 10^8) * 1.2 / (2 * 10^9) = 6 * 10^8 / 2 * 10^9 = 0.3 giây."
  },
  {
    id: 24, type: 'practice', chapter: 1,
    question: "Thống kê các nhóm lệnh của một chương trình gồm: ALU (60%, CPI=1), Load (20%, CPI=5), Store (10%, CPI=4), Branch (10%, CPI=3). CPI trung bình của bộ xử lý là?",
    options: [
      "A. 1.3",
      "B. 2.3",
      "C. 3.25",
      "D. 1.0"
    ],
    correctAnswer: 1,
    rationale: "CPI trung bình = Σ(Tỷ lệ * CPI từng loại) = (0.6 * 1) + (0.2 * 5) + (0.1 * 4) + (0.1 * 3) = 0.6 + 1.0 + 0.4 + 0.3 = 2.3."
  },
  {
    id: 25, type: 'practice', chapter: 1,
    question: "Máy M1 có f=2GHz, CPI=1.5. Máy M2 có f=3GHz, CPI=2.5. Hai máy chạy cùng tập lệnh ISA và biên dịch cùng chương trình C ra cùng số lệnh (IC). Máy nào nhanh hơn và nhanh hơn bao nhiêu lần?",
    options: [
      "A. M2 nhanh hơn M1 khoảng 1.2 lần",
      "B. M1 nhanh hơn M2 khoảng 1.11 lần",
      "C. M1 nhanh hơn M2 khoảng 1.5 lần",
      "D. M2 nhanh hơn M1 khoảng 1.67 lần"
    ],
    correctAnswer: 1,
    rationale: "Time = IC * CPI / f. T_M1 = IC * 1.5 / 2 = 0.75 * IC (ns). T_M2 = IC * 2.5 / 3 = 0.833 * IC (ns). T_M1 < T_M2 nên M1 chạy mất ít thời gian hơn (nhanh hơn). Mức độ = T_M2 / T_M1 = 0.833 / 0.75 ≈ 1.11 lần."
  },
  {
    id: 26, type: 'practice', chapter: 1,
    question: "Áp dụng định luật Amdahl: Một công ty muốn cải thiện hệ thống máy chủ, trong đó thao tác xử lý đồ họa (chiếm 40% thời gian) được nâng cấp lên thẻ GPU mới chạy nhanh gấp 4 lần. Hiệu năng tổng thể của toàn hệ thống sẽ tăng (Speedup) bao nhiêu lần?",
    options: [
      "A. 1.42 lần",
      "B. 2.0 lần",
      "C. 1.25 lần",
      "D. 4.0 lần"
    ],
    correctAnswer: 0,
    rationale: "S_overall = 1 / ((1 - 0.4) + 0.4 / 4) = 1 / (0.6 + 0.1) = 1 / 0.7 ≈ 1.428 lần."
  },
  {
    id: 27, type: 'practice', chapter: 1,
    question: "Một CPU thực thi chương trình A sinh ra 2x10^9 chu kỳ xung nhịp (clock cycles) và hoàn thành trong 1 giây. Xung nhịp f của CPU này bằng bao nhiêu?",
    options: [
      "A. 1 GHz",
      "B. 2 GHz",
      "C. 4 GHz",
      "D. 500 MHz"
    ],
    correctAnswer: 1,
    rationale: "f = Clock Cycles / CPU Time = (2 * 10^9) / 1s = 2 * 10^9 Hz = 2 GHz."
  },
  {
    id: 28, type: 'practice', chapter: 1,
    question: "Để giảm thời gian thực thi (Execution Time) của một chương trình, kỹ sư có thể tối ưu theo các hướng nào dựa trên phương trình hiệu năng?",
    options: [
      "A. Tăng IC, giảm CPI, giảm f",
      "B. Giảm chu kỳ xung nhịp (T0), giảm CPI, giảm IC (số lệnh)",
      "C. Tăng CPI, tăng f, tăng IC",
      "D. Chỉ cần tăng MIPS mà không quan tâm đến IC"
    ],
    correctAnswer: 1,
    rationale: "Time = IC * CPI * T0 (hoặc Time = IC * CPI / f). Để Time nhỏ nhất, ta cần làm nhỏ IC (compiler tốt), làm nhỏ CPI (vi kiến trúc tốt, ít hazard), và làm nhỏ T0 tức là tăng xung nhịp f."
  },
  {
    id: 29, type: 'practice', chapter: 1,
    question: "Bộ xử lý P1 có T0 = 0.25ns. P1 thực thi chương trình B có IC = 10^6 lệnh, tổng số chu kỳ mất 1.5x10^6 cycles. CPI và Thời gian CPU của P1 lần lượt là?",
    options: [
      "A. CPI = 1.5, Time = 0.375 ms",
      "B. CPI = 0.66, Time = 0.25 ms",
      "C. CPI = 1.5, Time = 3.75 ms",
      "D. CPI = 2.0, Time = 1.5 ms"
    ],
    correctAnswer: 0,
    rationale: "CPI = Cycles / IC = 1.5*10^6 / 10^6 = 1.5. CPU Time = Cycles * T0 = 1.5*10^6 * 0.25*10^-9 = 0.375 * 10^-3 giây = 0.375 ms."
  },
  {
    id: 30, type: 'practice', chapter: 1,
    question: "Hai trình biên dịch A và B biên dịch cùng đoạn mã C cho cùng kiến trúc RISC-V. Biên dịch A sinh ra 10 tỷ lệnh, CPI = 1.2. Biên dịch B sinh ra 8 tỷ lệnh, CPI = 1.6. Chương trình do compiler nào chạy nhanh hơn trên cùng CPU?",
    options: [
      "A. Trình biên dịch A",
      "B. Trình biên dịch B",
      "C. Cả hai bằng nhau",
      "D. Không đủ dữ kiện để tính vì thiếu f"
    ],
    correctAnswer: 0,
    rationale: "Số chu kỳ A = IC * CPI = 10 * 1.2 = 12 tỷ cycles. Số chu kỳ B = 8 * 1.6 = 12.8 tỷ cycles. Do chạy trên cùng CPU (cùng T0), chương trình A tốn ít chu kỳ hơn nên chạy nhanh hơn."
  },
  {
    id: 31, type: 'practice', chapter: 1,
    question: "Bộ xử lý nâng cấp kiến trúc giúp CPI trung bình giảm từ 2.5 xuống 2.0, nhưng xung nhịp f buộc phải giảm từ 3GHz xuống 2.8GHz do vấn đề tỏa nhiệt. So sánh hiệu năng của máy mới so với máy cũ?",
    options: [
      "A. Máy mới chạy chậm hơn máy cũ",
      "B. Hiệu năng giảm 5%",
      "C. Tốc độ (Speedup) = 1.16 lần (Máy mới nhanh hơn)",
      "D. Tốc độ bằng nhau"
    ],
    correctAnswer: 2,
    rationale: "Time_old = IC * 2.5 / 3 = 0.833 * IC (ns). Time_new = IC * 2.0 / 2.8 = 0.714 * IC (ns). Do Time_new < Time_old, máy mới nhanh hơn. Speedup = Time_old / Time_new = 0.833 / 0.714 ≈ 1.16 lần."
  },
  {
    id: 32, type: 'practice', chapter: 1,
    question: "Khái niệm 'Chu trình Lệnh' (Instruction Cycle) tiêu chuẩn theo kiến trúc Von Neumann cơ bản gồm các bước nào?",
    options: [
      "A. Read, Calculate, Display",
      "B. Fetch (Nhận lệnh), Decode (Giải mã), Execute (Thực thi), Memory (Truy cập nhớ), Write-back (Ghi lại kết quả)",
      "C. Cấp phát động, Biên dịch, Liên kết",
      "D. Tăng PC, Chạy ALU, Báo lỗi"
    ],
    correctAnswer: 1,
    rationale: "Đây là 5 bước vi kiến trúc kinh điển của máy tính RISC: Lấy lệnh từ RAM (Fetch), Giải mã lệnh và đọc thanh ghi (Decode), Tính toán (Execute), Truy cập bộ nhớ dữ liệu (Memory), Ghi lại kết quả vào thanh ghi (Write-back)."
  },
  {
    id: 33, type: 'practice', chapter: 1,
    question: "Một đoạn mã lặp 100 lần, mỗi vòng lặp có 5 lệnh ALU, 2 lệnh Load, 1 lệnh Store, 1 lệnh Branch. Biết CPI ALU=1, Load=5, Store=4, Branch=3. Tổng số clock cycles để thực thi toàn bộ vòng lặp này là?",
    options: [
      "A. 22 cycles",
      "B. 1000 cycles",
      "C. 2200 cycles",
      "D. 900 cycles"
    ],
    correctAnswer: 2,
    rationale: "Cycles trong 1 vòng = (5*1) + (2*5) + (1*4) + (1*3) = 5 + 10 + 4 + 3 = 22 cycles. Chạy 100 vòng -> 22 * 100 = 2200 cycles."
  },
  {
    id: 34, type: 'practice', chapter: 1,
    question: "Có 2 lựa chọn thiết kế phần cứng: D1 cho f=4GHz, CPI ALU=2, CPI Memory=4. D2 cho f=2GHz, CPI ALU=1, CPI Memory=2. Với IC = 60% ALU và 40% Memory, thiết kế nào tốt hơn?",
    options: [
      "A. D1 tốt hơn",
      "B. D2 tốt hơn",
      "C. Hiệu năng của D1 và D2 là như nhau",
      "D. D2 tiêu tốn ít chu kỳ hơn nhưng chạy chậm hơn"
    ],
    correctAnswer: 2,
    rationale: "CPI_D1 = 0.6*2 + 0.4*4 = 2.8. Time_D1 = IC * 2.8 / 4G = 0.7 * IC (ns). CPI_D2 = 0.6*1 + 0.4*2 = 1.4. Time_D2 = IC * 1.4 / 2G = 0.7 * IC (ns). Hai thiết kế cho thời gian bằng nhau."
  },
  {
    id: 35, type: 'practice', chapter: 1,
    question: "Định luật Moore (Moore's Law) ban đầu phát biểu điều gì ảnh hưởng trực tiếp đến kiến trúc máy tính?",
    options: [
      "A. Xung nhịp CPU sẽ nhân đôi mỗi 18 tháng.",
      "B. Số lượng transistor trên một chip vi mạch tích hợp sẽ tăng gấp đôi sau khoảng 18-24 tháng.",
      "C. Mật độ lỗi phần cứng giảm dần theo thời gian.",
      "D. Dung lượng RAM luôn lớn hơn dung lượng Cache 1000 lần."
    ],
    correctAnswer: 1,
    rationale: "Gordon Moore quan sát thấy mật độ tích hợp bóng bán dẫn (transistor) trên một vi mạch tăng gấp đôi sau mỗi 1.5 - 2 năm. Nó không trực tiếp nói về tốc độ xung nhịp, dù mật độ cao giúp thu nhỏ gate, từng làm tăng xung nhịp trong quá khứ."
  },

  // --- CHƯƠNG 3: 15 CÂU BÀI TẬP DỊCH MÃ RISC-V VÀ TÍNH TOÁN ---
  {
    id: 36, type: 'practice', chapter: 3,
    question: "Cho lệnh RISC-V: beq t2, s3, L1. Biết lệnh này đang nằm tại địa chỉ bộ nhớ PC = 0x00401020 và chuỗi bit immediate sau khi giải mã (có tính dấu) là 24 (hệ thập phân). Địa chỉ đích (Branch Target Address - BTA) của L1 là bao nhiêu?",
    options: [
      "A. 0x00401044",
      "B. 0x00401024",
      "C. 0x00401038",
      "D. 0x00401008"
    ],
    correctAnswer: 2,
    rationale: "Trong RISC-V, BTA = PC + immediate. BTA = 0x00401020 + 24(dec). Chuyển 24 sang hex là 0x18. BTA = 0x00401020 + 0x18 = 0x00401038. (Trùng với ví dụ trong bài giảng Bách Khoa IT3030)."
  },
  {
    id: 37, type: 'practice', chapter: 3,
    question: "Giải mã đoạn mã máy dạng Hex: 0x01338C63. Biết opcode là 1100011 (lệnh branch), funct3 là 000 (beq). Đây là lệnh hợp ngữ nào? (Gợi ý: rs1=x7, rs2=x19)",
    options: [
      "A. bne x19, x7, 24",
      "B. beq x7, x19, L1 (với offset = 24)",
      "C. beq x7, x19, L1 (với offset = 12)",
      "D. blt x19, x7, -24"
    ],
    correctAnswer: 1,
    rationale: "0x01338C63 = 0000 0001 0011 0011 1000 1100 0110 0011. Opcode: 1100011, funct3: 000 -> beq. rs1 = 00111 = 7 (x7/t2), rs2 = 10011 = 19 (x19/s3). imm ráp từ B-type format ra 24. Lệnh là beq x7, x19, offset=24."
  },
  {
    id: 38, type: 'practice', chapter: 3,
    question: "Dịch lệnh hợp ngữ R-Type sau sang mã máy dạng nhị phân 32-bit: add x5, x6, x7. Cho biết: opcode của R-Type là 0110011, funct3 của add là 000, funct7 của add là 0000000.",
    options: [
      "A. 0000000 00111 00110 000 00101 0110011",
      "B. 0000000 00110 00111 000 00101 0110011",
      "C. 0000000 00101 00110 000 00111 0110011",
      "D. 0000000 00111 00101 000 00110 0110011"
    ],
    correctAnswer: 0,
    rationale: "Format R-Type: funct7 | rs2 | rs1 | funct3 | rd | opcode. Ở đây rd=x5 (00101), rs1=x6 (00110), rs2=x7 (00111). Ghép lại: 0000000_00111_00110_000_00101_0110011."
  },
  {
    id: 39, type: 'practice', chapter: 3,
    question: "Lệnh 'addi x5, x6, -1' có imm=-1. Khi chuyển sang mã máy định dạng I-Type, chuỗi 12-bit của trường imm sẽ là gì?",
    options: [
      "A. 000000000001",
      "B. 100000000001",
      "C. 111111111111",
      "D. 111111111110"
    ],
    correctAnswer: 2,
    rationale: "Số -1 trong hệ nhị phân bù 2. Dạng 12-bit của -1 là tất cả các bit đều bằng 1, tức là 111111111111 (0xFFF)."
  },
  {
    id: 40, type: 'practice', chapter: 3,
    question: "Giả sử bộ nhớ tại địa chỉ 0x200 chứa 2 byte: 0xFE, 0xFF. Khi thực hiện lệnh 'lh x10, 0(x5)' (với x5 = 0x200), do là Load Halfword (có dấu), giá trị thanh ghi x10 (32-bit) sẽ là gì?",
    options: [
      "A. 0x0000FFFE",
      "B. 0xFFFFFFFE",
      "C. 0x0000FEFF",
      "D. 0xFEFF0000"
    ],
    correctAnswer: 1,
    rationale: "Theo Little-endian, byte thấp ở địa chỉ thấp. Halfword đọc được là 0xFFFE. Bit dấu (bit 15) của 0xFFFE là 1. Lệnh 'lh' (Load Halfword signed) sẽ Sign-extend bit 1 này ra 16 bit cao của thanh ghi 32-bit. Kết quả: 0xFFFFFFFE."
  },
  {
    id: 41, type: 'practice', chapter: 3,
    question: "Thanh ghi x5 chứa 0xFFFFFFFF, thanh ghi x6 chứa 0x00000001. So sánh hai lệnh rẽ nhánh: 'blt x5, x6, L1' và 'bltu x5, x6, L2'. Lệnh nào sẽ thực hiện rẽ nhánh (branch taken)?",
    options: [
      "A. Cả hai lệnh đều rẽ",
      "B. Cả hai lệnh đều không rẽ",
      "C. Chỉ có lệnh blt rẽ",
      "D. Chỉ có lệnh bltu rẽ"
    ],
    correctAnswer: 2,
    rationale: "blt (branch less than - có dấu): 0xFFFFFFFF là -1. -1 < 1 là ĐÚNG -> rẽ nhánh. bltu (branch less than unsigned): 0xFFFFFFFF là 4 tỷ > 1 là SAI -> không rẽ."
  },
  {
    id: 42, type: 'practice', chapter: 3,
    question: "Lệnh 'jal x1, Lable' đang nằm tại địa chỉ bộ nhớ PC = 0x00001000. Giả sử nhãn Lable nằm ở địa chỉ 0x00002000. Sau khi lệnh này thực thi, giá trị lưu trong PC và thanh ghi x1 sẽ là bao nhiêu?",
    options: [
      "A. PC = 0x00001004, x1 = 0x00002000",
      "B. PC = 0x00002000, x1 = 0x00001004",
      "C. PC = 0x00002000, x1 = 0x00001000",
      "D. PC = 0x00001000, x1 = 0x00001004"
    ],
    correctAnswer: 1,
    rationale: "Lệnh JAL cập nhật PC thành địa chỉ nhãn để nhảy tới (PC = 0x00002000). Đồng thời, nó lưu địa chỉ lệnh kế tiếp ngay sau JAL là PC + 4 (0x00001000 + 4 = 0x00001004) vào thanh ghi x1 (return address)."
  },
  {
    id: 43, type: 'practice', chapter: 3,
    question: "Một lệnh rẽ nhánh B-Type đang đứng tại PC = 100. Đích đến là nhãn Loop tại PC = 80. Khoảng cách (Offset) cần mã hóa vào lệnh B-Type là bao nhiêu?",
    options: [
      "A. 20",
      "B. -20",
      "C. -80",
      "D. -10"
    ],
    correctAnswer: 1,
    rationale: "Target = PC + Offset => Offset = Target - PC = 80 - 100 = -20. (Trong mã máy, số -20 này sẽ được dịch phải 1 bit còn -10 để đưa vào chuỗi bit imm của B-Type)."
  },
  {
    id: 44, type: 'practice', chapter: 3,
    question: "Để nạp giá trị 32-bit 0x12345678 vào thanh ghi x10, assembler sẽ dùng giả lệnh 'li x10, 0x12345678' và biên dịch thành 2 lệnh: LUI và ADDI. Hai lệnh đó chính xác là gì?",
    options: [
      "A. lui x10, 0x12345; addi x10, x10, 0x678",
      "B. lui x10, 0x12345; addi x10, x10, 0x123",
      "C. lui x10, 0x12346; addi x10, x10, -0x988",
      "D. lui x10, 0x56780; addi x10, x10, 0x123"
    ],
    correctAnswer: 0,
    rationale: "LUI nạp 20 bit cao: lui x10, 0x12345 (kết quả x10 = 0x12345000). ADDI nạp 12 bit thấp: addi x10, x10, 0x678 (cộng thêm 0x678). Kết quả: 0x12345678. (Chú ý bit dấu của 0x678 là 0, nên không bị âm, không cần bù trừ bit LUI như trường hợp 12-bit thấp là số âm)."
  },
  {
    id: 45, type: 'practice', chapter: 3,
    question: "Trường immediate của lệnh S-Type (như sw) bị chia làm 2 phần: imm[11:5] nằm ở bit 31:25 của lệnh, và imm[4:0] nằm ở bit 11:7. Lệnh 'sw x5, -4(x10)' có imm = -4 (bù 2 là 1111 1111 1100). Giá trị của imm[11:5] là?",
    options: [
      "A. 0000000",
      "B. 1111111",
      "C. 1100000",
      "D. 1111100"
    ],
    correctAnswer: 1,
    rationale: "-4 trong 12 bit bù hai là 1111 1111 1100. Chia làm 2 phần: imm[11:5] là 7 bit cao tức là 1111111, và imm[4:0] là 5 bit thấp tức là 11100."
  },
  {
    id: 46, type: 'practice', chapter: 3,
    question: "Chỉ thị slli (Shift Left Logical Immediate) thao tác với một hằng số. Nếu 'slli x5, x6, 3' (với x6 chứa giá trị 5), x5 sẽ chứa giá trị bằng bao nhiêu?",
    options: [
      "A. 15",
      "B. 8",
      "C. 40",
      "D. 20"
    ],
    correctAnswer: 2,
    rationale: "Dịch trái logic n bit tương đương với nhân với 2^n. Dịch trái 3 bit = nhân với 2^3 = 8. Do đó 5 * 8 = 40. Về mặt nhị phân: 5 là 000...0101, dịch trái 3 bit là 000...0010 1000 = 32 + 8 = 40."
  },
  {
    id: 47, type: 'practice', chapter: 3,
    question: "Đoạn code hội ngữ: \n addi sp, sp, -16 \n sw s0, 12(sp) \n sw s1, 8(sp) \n sw s2, 4(sp) \n sw s3, 0(sp) \n Đoạn code trên đang làm thao tác gì đối với Stack?",
    options: [
      "A. Pop 4 từ (words) ra khỏi Stack vào các thanh ghi s0, s1, s2, s3.",
      "B. Push 4 từ từ các thanh ghi s0, s1, s2, s3 vào Stack để bảo toàn (Callee-saved).",
      "C. Xóa 16 byte của Stack.",
      "D. Khởi tạo giá trị 0 cho s0, s1, s2, s3."
    ],
    correctAnswer: 1,
    rationale: "Stack của RISC-V phát triển từ địa chỉ cao xuống địa chỉ thấp. 'addi sp, sp, -16' mở rộng vùng Stack thêm 16 byte (đủ chứa 4 words). Sau đó các lệnh Store Word (sw) lưu (push) giá trị các thanh ghi 's' vào vùng không gian vừa cấp phát để bảo toàn."
  },
  {
    id: 48, type: 'practice', chapter: 3,
    question: "Lệnh rẽ nhánh có điều kiện (B-Type) có thể nhảy xa tối đa bao nhiêu byte tính từ PC hiện tại?",
    options: [
      "A. ± 2048 bytes",
      "B. ± 4096 bytes",
      "C. ± 1 Mbyte",
      "D. Khắp không gian nhớ 4GB"
    ],
    correctAnswer: 1,
    rationale: "Trường immediate của B-Type có 12-bit. Mặc dù có 12 bit, nhưng bit thứ 0 luôn bị ép bằng 0 (vì địa chỉ lệnh trong RISC-V luôn là bội số của 2), tạo thành con số 13-bit có dấu. Phạm vi là từ -2^12 đến +2^12 - 1, tức là -4096 đến +4094 bytes."
  },
  {
    id: 49, type: 'practice', chapter: 3,
    question: "Lệnh jalr (Jump and Link Register) thuộc định dạng lệnh nào và sử dụng phương pháp tính địa chỉ đích nào?",
    options: [
      "A. J-Type; Đích = PC + imm",
      "B. I-Type; Đích = rs1 + imm (xóa bit 0)",
      "C. U-Type; Đích = rd + imm",
      "D. R-Type; Đích = rs1 + rs2"
    ],
    correctAnswer: 1,
    rationale: "JALR (khác với JAL là J-Type) lại là lệnh I-Type. Nó lấy địa chỉ nền từ thanh ghi rs1, cộng với hằng số offset (imm 12-bit có dấu) để ra đích nhảy, và lưu PC+4 vào thanh ghi rd (thường là ra). Bit LSB của kết quả bị ép về 0."
  },
  {
    id: 50, type: 'practice', chapter: 3,
    question: "Giả sử thanh ghi x11 có giá trị là 0x80000000. Sau khi thực hiện 'sra x12, x11, 2' (Shift Right Arithmetic), thanh ghi x12 chứa giá trị nào?",
    options: [
      "A. 0x20000000",
      "B. 0xE0000000",
      "C. 0xC0000000",
      "D. 0x00000000"
    ],
    correctAnswer: 1,
    rationale: "0x80000000 trong nhị phân là 1000...000 (bit cao nhất là 1, số âm). Lệnh sra (Shift Arithmetic) khi dịch phải sẽ sao chép bit dấu (số 1) vào chỗ trống. Dịch 2 bit: 1110 0000...000. Dịch ra Hex là 0xE0000000."
  }
];

export default function ComputerArchitectureQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleOptionSelect = (optionIndex: number) => {
    if (isSubmitted || currentQuestionIndex in selectedAnswers) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: optionIndex
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    if (window.confirm("Bạn có chắc chắn muốn nộp bài không?")) {
      setIsSubmitted(true);
      window.scrollTo(0, 0);
    }
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        score += 1;
      }
    });
    return score;
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  // --- TRANG HIỂN THỊ KẾT QUẢ ---
  if (isSubmitted) {
    const score = calculateScore();
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 text-gray-800">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="bg-blue-600 text-white p-6 text-center">
              <h1 className="text-3xl font-bold">Kết Quả Bài Thi</h1>
              <p className="mt-2 text-blue-100">IT3030 - Kiến Trúc Máy Tính (RISC-V)</p>
            </div>
            <div className="p-8 text-center border-b border-gray-100">
              <div className="text-6xl font-extrabold text-blue-600">
                {score} <span className="text-3xl text-gray-400">/ {questions.length}</span>
              </div>
              <p className="mt-4 text-lg text-gray-600">
                {score >= 40 ? "Xuất sắc! Bạn nắm rất vững kiến trúc RISC-V." : 
                 score >= 25 ? "Làm tốt lắm, nhưng hãy xem lại các phần tính toán nhé." : 
                 "Cần cố gắng hơn. Hãy đọc kỹ lại phần vi kiến trúc và dịch mã."}
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-6 px-2">Chi tiết từng câu hỏi:</h2>
          
          <div className="space-y-6">
            {questions.map((q, qIndex) => {
              const userAnswer = selectedAnswers[qIndex];
              const isCorrect = userAnswer === q.correctAnswer;
              
              return (
                <div key={q.id} className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${isCorrect ? 'border-green-500' : 'border-red-500'}`}>
                  <div className="flex items-start gap-4 mb-4">
                    <span className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full text-white font-bold ${isCorrect ? 'bg-green-500' : 'bg-red-500'}`}>
                      {isCorrect ? '✓' : '✗'}
                    </span>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">Câu {qIndex + 1}: {q.question}</h3>
                      <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded">
                        Chương {q.chapter} - {q.type === 'theory' ? 'Lý thuyết' : 'Bài tập/Tính toán'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="ml-12 space-y-2">
                    {q.options.map((opt, optIndex) => {
                      let bgColor = "bg-gray-50 border-gray-200 text-gray-700";
                      let icon = "";
                      
                      if (optIndex === q.correctAnswer) {
                        bgColor = "bg-green-100 border-green-400 text-green-800 font-medium";
                        icon = "✓ ";
                      } else if (optIndex === userAnswer && !isCorrect) {
                        bgColor = "bg-red-100 border-red-400 text-red-800 line-through opacity-80";
                        icon = "✗ ";
                      }
                      
                      return (
                        <div key={optIndex} className={`p-3 border rounded-lg ${bgColor}`}>
                          {icon}{opt}
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="ml-12 mt-4 bg-blue-50 border border-blue-100 rounded-lg p-4">
                    <h4 className="font-bold text-blue-800 mb-1">Giải thích chi tiết:</h4>
                    <p className="text-blue-900 text-sm leading-relaxed">{q.rationale}</p>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-8 text-center flex justify-center gap-4">
            <button 
              onClick={() => window.location.reload()}
              className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105"
            >
              Làm Lại Bài Thi
            </button>
            <a 
              href="/"
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 inline-block"
            >
              Về Trang Chủ
            </a>
          </div>
        </div>
      </div>
    );
  }

  // --- TRANG THI TRẮC NGHIỆM ---
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 text-gray-800">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-blue-600 p-6 text-white relative">
          <a href="/" className="absolute top-6 right-6 text-blue-200 hover:text-white transition-colors">
            ✕ Thoát
          </a>
          <h1 className="text-2xl font-bold pr-12">Ôn tập IT3030 - Kiến Trúc Máy Tính</h1>
          <p className="opacity-80 mt-1">RISC-V Edition</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2">
          <div 
            className="bg-green-500 h-2 transition-all duration-300 ease-out" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        <div className="p-8">
          {/* Question Meta */}
          <div className="flex justify-between items-center mb-6 text-sm font-medium text-gray-500">
            <span>Câu {currentQuestionIndex + 1} / {questions.length}</span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              Chương {currentQuestion.chapter} - {currentQuestion.type === 'theory' ? 'Lý thuyết' : 'Tính toán'}
            </span>
          </div>

          {/* Question Text */}
          <h2 className="text-xl font-bold text-gray-900 mb-6 leading-relaxed">
            {currentQuestion.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => {
              const hasAnswered = currentQuestionIndex in selectedAnswers;
              const isSelected = selectedAnswers[currentQuestionIndex] === index;
              const isCorrect = currentQuestion.correctAnswer === index;
              
              let optionClass = "p-4 border-2 rounded-xl transition-all duration-200 flex items-center gap-3 ";
              let circleClass = "w-6 h-6 rounded-full border-2 flex items-center justify-center font-bold text-xs ";
              
              if (!hasAnswered) {
                optionClass += "cursor-pointer border-gray-200 hover:border-blue-300 hover:bg-gray-50 text-gray-700";
                circleClass += "border-gray-300";
              } else {
                optionClass += "cursor-default ";
                if (isCorrect) {
                  optionClass += "border-green-500 bg-green-50 text-green-800 font-medium";
                  circleClass += "border-green-500 bg-green-500 text-white";
                } else if (isSelected && !isCorrect) {
                  optionClass += "border-red-500 bg-red-50 text-red-800";
                  circleClass += "border-red-500 bg-red-500 text-white";
                } else {
                  optionClass += "border-gray-200 bg-gray-50 text-gray-400 opacity-60";
                  circleClass += "border-gray-300";
                }
              }

              return (
                <div 
                  key={index}
                  onClick={() => !hasAnswered && handleOptionSelect(index)}
                  className={optionClass}
                >
                  <div className={circleClass}>
                    {hasAnswered && isCorrect ? "✓" : hasAnswered && isSelected && !isCorrect ? "✗" : ""}
                  </div>
                  <span className="text-lg">{option}</span>
                </div>
              );
            })}
          </div>

          {/* Hiển thị giải thích ngay khi đã chọn đáp án */}
          {currentQuestionIndex in selectedAnswers && (
            <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-5">
              <h4 className="font-bold text-blue-800 mb-2">Giải thích chi tiết:</h4>
              <p className="text-blue-900 text-sm leading-relaxed">{currentQuestion.rationale}</p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between items-center pt-6 border-t border-gray-100">
            <button
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              className={`px-6 py-2.5 rounded-lg font-medium transition-colors
                ${currentQuestionIndex === 0 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
            >
              Quay lại
            </button>
            
            <div className="flex gap-3">
              <button
                onClick={handleSubmit}
                className="px-6 py-2.5 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-lg shadow-md transition-colors"
              >
                Nộp Bài
              </button>
              
              {currentQuestionIndex < questions.length - 1 && (
                <button
                  onClick={handleNext}
                  className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-colors"
                >
                  Câu tiếp theo
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
