"use client";

import React, { useState } from "react";

// --- INTERFACES ---
interface Question {
  id: number;
  chapter: string;
  question: string;
  options: string[];
  correctAnswer: number;
  rationale: string;
}

// --- DỮ LIỆU 30 CÂU HỎI (TUYỆT ĐỐI KHÔNG CẮT XÉN) ---
const questions: Question[] = [
  // ================= CHƯƠNG 7: HỆ THỐNG VÀO-RA (15 CÂU) =================
  {
    id: 1,
    chapter: "Chương 7",
    question: "Trong phương pháp 'Vào-ra bằng chương trình' (Programmed I/O), nhược điểm lớn nhất khiến hiệu năng hệ thống giảm sút là gì?",
    options: [
      "A. Lỗi phần cứng xảy ra thường xuyên do xung đột bus.",
      "B. CPU phải liên tục đọc thanh ghi trạng thái của mô-đun I/O trong một vòng lặp chờ (polling) cho đến khi thiết bị sẵn sàng, gây lãng phí chu kỳ máy.",
      "C. Cần phải thiết kế thêm một vi mạch DMAC riêng biệt gây tốn kém chi phí.",
      "D. CPU mất quyền điều khiển bus dữ liệu hoàn toàn vào tay mô-đun I/O."
    ],
    correctAnswer: 1,
    rationale: "Vào-ra bằng chương trình yêu cầu CPU phải liên tục kiểm tra (polling) trạng thái của thiết bị I/O. Do tốc độ của thiết bị ngoại vi chậm hơn CPU hàng triệu lần, CPU sẽ bị 'kẹt' trong vòng lặp chờ này và không thể làm việc khác, gây lãng phí tài nguyên nghiêm trọng."
  },
  {
    id: 2,
    chapter: "Chương 7",
    question: "Sự khác biệt cốt lõi giữa 'Vào-ra điều khiển bằng ngắt' (Interrupt-driven I/O) và 'Truy cập bộ nhớ trực tiếp' (DMA) là gì?",
    options: [
      "A. Trong ngắt, CPU không tham gia chuyển dữ liệu. Trong DMA, CPU phải chuyển từng byte.",
      "B. Trong ngắt, thiết bị tự ghi dữ liệu vào RAM. Trong DMA, hệ điều hành ghi dữ liệu.",
      "C. Trong ngắt, CPU vẫn phải trực tiếp thực hiện lệnh đọc/ghi dữ liệu giữa I/O và Bộ nhớ. Trong DMA, DMAC tự động làm việc này mà không cần CPU chuyển dữ liệu.",
      "D. DMA chỉ dùng cho thiết bị tốc độ chậm, ngắt dùng cho thiết bị tốc độ siêu cao."
    ],
    correctAnswer: 2,
    rationale: "Trong Interrupt-driven I/O, thiết bị gửi ngắt để báo nó đã sẵn sàng, nhưng CPU vẫn phải thực thi lệnh lấy dữ liệu từ I/O và ghi vào RAM. Ngược lại, với DMA, bộ điều khiển DMA (DMAC) lấy quyền điều khiển Bus và tự động chuyển toàn bộ khối dữ liệu giữa I/O và RAM, giải phóng CPU hoàn toàn khỏi việc trung chuyển."
  },
  {
    id: 3,
    chapter: "Chương 7",
    question: "Trong kiến trúc 'Vào-ra theo bản đồ bộ nhớ' (Memory-mapped I/O), điều nào sau đây là ĐÚNG?",
    options: [
      "A. Cổng I/O và bộ nhớ chính (RAM) chia sẻ chung một không gian địa chỉ duy nhất.",
      "B. Phải sử dụng các lệnh hợp ngữ chuyên dụng (như IN, OUT) để giao tiếp với thiết bị.",
      "C. Các thanh ghi của mô-đun I/O được cách ly hoàn toàn khỏi không gian địa chỉ của CPU.",
      "D. Tốc độ truyền dữ liệu chậm hơn nhiều so với Isolated I/O do xung đột địa chỉ."
    ],
    correctAnswer: 0,
    rationale: "Trong Memory-mapped I/O, các cổng I/O được ánh xạ vào cùng không gian địa chỉ với bộ nhớ. Ưu điểm lớn nhất là CPU có thể sử dụng cùng một tập lệnh đọc/ghi bộ nhớ (ví dụ: lw, sw trong RISC-V) để thao tác với thiết bị I/O mà không cần tập lệnh đặc biệt."
  },
  {
    id: 4,
    chapter: "Chương 7",
    question: "Khi một quá trình truyền khối dữ liệu lớn bằng DMA hoàn tất, bộ điều khiển DMAC sẽ thông báo cho CPU bằng cách nào?",
    options: [
      "A. Ghi giá trị 1 vào thanh ghi trạng thái để CPU tự kiểm tra (Polling).",
      "B. Gửi một tín hiệu ngắt (Interrupt) đến CPU.",
      "C. Tắt nguồn mô-đun I/O tương ứng.",
      "D. Gửi một gói dữ liệu (Packet) qua cổng PCIe."
    ],
    correctAnswer: 1,
    rationale: "Nguyên lý hoạt động của DMA: CPU khởi tạo DMAC (giao địa chỉ đầu, số lượng từ, lệnh đọc/ghi), sau đó CPU đi làm việc khác. DMAC tự động truyền dữ liệu. Khi truyền xong toàn bộ khối dữ liệu, DMAC mới phát ra tín hiệu Ngắt (Interrupt) để báo cho CPU biết công việc đã hoàn tất."
  },
  {
    id: 5,
    chapter: "Chương 7",
    question: "Tại sao chuẩn liên kết điểm-điểm (Point-to-Point Interconnect) như PCIe hoặc QPI lại thay thế cấu trúc Bus dùng chung (Shared Bus) trong các máy tính hiện đại?",
    options: [
      "A. Vì Bus dùng chung có băng thông cao hơn nhưng lại quá đắt tiền.",
      "B. Vì liên kết điểm-điểm cho phép kết nối song song nhiều bit hơn (lên tới 1024 dây).",
      "C. Vì khi tốc độ dữ liệu tăng cao, Bus dùng chung gặp khó khăn trong việc phân xử (arbitration) và đồng bộ hóa giữa nhiều thiết bị, gây ra độ trễ lớn.",
      "D. Vì Bus dùng chung không hỗ trợ cơ chế truy cập DMA."
    ],
    correctAnswer: 2,
    rationale: "Bus dùng chung (Shared bus) khi có nhiều thiết bị tốc độ cao sẽ dẫn đến hiện tượng thắt cổ chai, xung đột và độ trễ phân xử bus lớn. Liên kết điểm-điểm (PCIe, QPI) kết nối trực tiếp từng cặp thiết bị với giao thức phân lớp và truyền gói tin (packet-based), loại bỏ việc phân xử bus, giảm độ trễ và tăng băng thông."
  },
  {
    id: 6,
    chapter: "Chương 7",
    question: "Một mô-đun Vào-ra (I/O Module) tiêu chuẩn KHÔNG bao gồm thành phần nào sau đây?",
    options: [
      "A. Bộ đệm dữ liệu (Data Buffer).",
      "B. Khối logic điều khiển (Control Logic).",
      "C. Bộ ALU (Arithmetic Logic Unit) để tính toán dấu phẩy động.",
      "D. Bộ chuyển đổi dữ liệu (từ song song sang nối tiếp và ngược lại)."
    ],
    correctAnswer: 2,
    rationale: "Mô-đun I/O làm nhiệm vụ giao tiếp giữa Bus hệ thống và thiết bị ngoại vi. Cấu tạo của nó gồm Khối logic điều khiển, Bộ đệm dữ liệu, Bộ chuyển đổi định dạng dữ liệu (ADC/DAC hoặc Serial/Parallel). Nó không chứa ALU vì việc tính toán số học là nhiệm vụ của CPU hoặc GPU."
  },
  {
    id: 7,
    chapter: "Chương 7",
    question: "Đặc điểm của phương pháp truyền dữ liệu 'Nối tiếp' (Serial transmission) so với 'Song song' (Parallel transmission) là gì?",
    options: [
      "A. Nối tiếp truyền nhiều bit cùng lúc nên tốc độ nhanh hơn Song song.",
      "B. Nối tiếp yêu cầu nhiều đường truyền dữ liệu (nhiều dây) hơn Song song.",
      "C. Nối tiếp truyền lần lượt từng bit, cần ít đường truyền, phù hợp với khoảng cách xa.",
      "D. Nối tiếp không cần bộ chuyển đổi dữ liệu ở mô-đun I/O."
    ],
    correctAnswer: 2,
    rationale: "Truyền song song truyền nhiều bit cùng lúc (nhanh) nhưng cần nhiều dây, dễ nhiễu xuyên âm nên chỉ dùng cho khoảng cách cực ngắn. Truyền nối tiếp truyền từng bit trên 1 đường tín hiệu, cần ít dây cáp, ít nhiễu, phù hợp truyền khoảng cách xa (như USB, SATA, Ethernet)."
  },
  {
    id: 8,
    chapter: "Chương 7",
    question: "Trong kỹ thuật 'Vào-ra độc lập' (Isolated I/O), để CPU phân biệt được địa chỉ đó thuộc về bộ nhớ hay thuộc về cổng I/O, hệ thống cần gì?",
    options: [
      "A. Cần thêm đường tín hiệu điều khiển phân biệt (Ví dụ: Memory/IO signal) trên Control Bus.",
      "B. Không cần gì cả, CPU tự đoán dựa trên kích thước dữ liệu.",
      "C. Cần sử dụng chuẩn PCIe thay cho Bus thông thường.",
      "D. Địa chỉ của thiết bị I/O bắt buộc phải bắt đầu bằng số 0xFF."
    ],
    correctAnswer: 0,
    rationale: "Trong Isolated I/O, không gian địa chỉ I/O và Bộ nhớ trùng nhau (ví dụ cùng có địa chỉ 0x0010). Để phân biệt, CPU dùng tập lệnh riêng (IN/OUT) và sinh ra một tín hiệu điều khiển trên Control Bus (như M/IO=1 là bộ nhớ, M/IO=0 là I/O) để kích hoạt đúng mô-đun."
  },
  {
    id: 9,
    chapter: "Chương 7",
    question: "Tình huống nào sau đây bắt buộc nên sử dụng kỹ thuật DMA thay vì Interrupt-driven I/O để tối ưu hiệu năng?",
    options: [
      "A. Đọc từng ký tự từ bàn phím khi người dùng gõ.",
      "B. Truyền một khối dữ liệu lớn (video, file ảnh) từ Ổ cứng (Disk) vào Bộ nhớ chính.",
      "C. Gửi tín hiệu điều khiển bật/tắt một đèn LED.",
      "D. Chuột máy tính gửi tọa độ di chuyển mới."
    ],
    correctAnswer: 1,
    rationale: "DMA được thiết kế đặc biệt để trao đổi CÁC MẢNG DỮ LIỆU CÓ KÍCH THƯỚC LỚN (Block transfer) tốc độ cao giữa I/O và RAM mà không chiếm dụng CPU. Với các sự kiện rời rạc, nhỏ lẻ, tốc độ chậm (chuột, phím), dùng Interrupt-driven I/O là đủ và hiệu quả hơn việc setup DMA."
  },
  {
    id: 10,
    chapter: "Chương 7",
    question: "Giao thức PCIe (PCI Express) sử dụng cấu trúc giao tiếp nào?",
    options: [
      "A. Bus dùng chung đồng bộ nhiều master.",
      "B. Liên kết điểm-điểm, cấu trúc phân lớp (Layered protocol) và truyền dữ liệu dạng gói (Packet).",
      "C. Vòng (Ring) token-passing.",
      "D. Truyền vô tuyến dải rộng."
    ],
    correctAnswer: 1,
    rationale: "PCI Express (PCIe) là sự nâng cấp từ chuẩn PCI cũ. Nó loại bỏ kiến trúc bus dùng chung, thay bằng liên kết điểm-điểm (point-to-point) trực tiếp, truyền dữ liệu nối tiếp, sử dụng kiến trúc phân lớp (Physical, Data Link, Transaction) và đóng gói dữ liệu giống như mạng máy tính."
  },
  {
    id: 11,
    chapter: "Chương 7",
    question: "Chu kỳ lấy trộm (Cycle Stealing) là một khái niệm liên quan đến cơ chế nào?",
    options: [
      "A. Lỗi phần cứng do phần mềm độc hại.",
      "B. Bộ điều khiển DMA (DMAC) ép CPU tạm dừng 1 chu kỳ máy để nhường Bus cho DMAC truyền 1 từ (word) dữ liệu.",
      "C. Interrupt-driven I/O giành quyền của Programmed I/O.",
      "D. Caching dữ liệu I/O vào bộ nhớ ảo."
    ],
    correctAnswer: 1,
    rationale: "Trong DMA, để truyền dữ liệu, DMAC cần dùng Bus hệ thống. Nó thực hiện 'Cycle Stealing' (lấy trộm chu kỳ) bằng cách yêu cầu CPU nhả Bus trong 1 chu kỳ để DMAC truyền 1 word, sau đó trả lại. Điều này làm CPU chậm lại một chút nhưng hiệu quả truyền dữ liệu lại rất cao."
  },
  {
    id: 12,
    chapter: "Chương 7",
    question: "Bộ vi mạch chipset trên bo mạch chủ (Motherboard) thường đóng vai trò gì trong Hệ thống Vào-ra?",
    options: [
      "A. Chạy hệ điều hành để phân bổ RAM.",
      "B. Tăng tốc xung nhịp của CPU lên giới hạn tối đa.",
      "C. Đóng vai trò cầu nối (Bridge) liên kết CPU, Bộ nhớ chính với các Bus Vào-ra tốc độ cao và tốc độ thấp.",
      "D. Lưu trữ vĩnh viễn dữ liệu của người dùng."
    ],
    correctAnswer: 2,
    rationale: "Chipset (như Northbridge/Southbridge trước đây hoặc PCH hiện nay) là vi mạch điều khiển tổng hợp. Chức năng chính là làm cầu nối, dịch giao thức và định tuyến dữ liệu giữa bộ xử lý, bộ nhớ và các mô-đun vào-ra, thiết bị ngoại vi."
  },
  {
    id: 13,
    chapter: "Chương 7",
    question: "Tại sao phương pháp Interrupt-driven I/O lại hiệu quả hơn Programmed I/O?",
    options: [
      "A. Vì nó không cần dùng Bus hệ thống.",
      "B. Vì nó chuyển được nhiều khối dữ liệu hơn trong 1 chu kỳ.",
      "C. Vì thiết bị tự lo việc truyền dữ liệu vào RAM.",
      "D. Vì CPU có thể thực thi mã chương trình khác trong khi chờ thiết bị I/O sẵn sàng, thay vì rơi vào vòng lặp chờ vô ích."
    ],
    correctAnswer: 3,
    rationale: "Interrupt loại bỏ hoàn toàn việc Polling (kiểm tra liên tục). CPU cứ làm việc khác, chỉ khi nào mô-đun I/O xong việc và ném tín hiệu ngắt (IRQ) thì CPU mới tạm dừng để xử lý việc chuyển dữ liệu, tối ưu hóa thời gian sử dụng CPU."
  },
  {
    id: 14,
    chapter: "Chương 7",
    question: "Khi DMAC lấy quyền điều khiển Bus từ CPU, ai là 'Master' trên Bus hệ thống?",
    options: [
      "A. CPU",
      "B. Bộ nhớ chính (Main Memory)",
      "C. Bộ điều khiển DMAC",
      "D. Thiết bị ngoại vi (ví dụ: ổ cứng)"
    ],
    correctAnswer: 2,
    rationale: "Trong thời gian DMA hoạt động, CPU đã cấp quyền điều khiển Bus (Bus Grant) cho DMAC. Lúc này, DMAC trở thành Bus Master, tự động sinh ra các tín hiệu địa chỉ và điều khiển đọc/ghi để trung chuyển dữ liệu giữa thiết bị I/O và Bộ nhớ chính."
  },
  {
    id: 15,
    chapter: "Chương 7",
    question: "Một trong những lợi ích của cấu trúc liên kết QPI (Quick Path Interconnect) của Intel là gì?",
    options: [
      "A. Hỗ trợ truyền dữ liệu song song 128-bit.",
      "B. Kết nối đa xử lý trực tiếp (điểm-điểm) giữa các CPU với nhau và với chipset, loại bỏ hoàn toàn nghẽn cổ chai của FSB (Front Side Bus) cũ.",
      "C. Giảm tiêu thụ điện năng bằng cách giới hạn băng thông.",
      "D. Cho phép gắn ổ cứng trực tiếp vào chân của CPU."
    ],
    correctAnswer: 1,
    rationale: "QPI được Intel giới thiệu (tương tự HyperTransport của AMD) để thay thế Front Side Bus (FSB) dùng chung. Nó cung cấp các liên kết điểm-điểm tốc độ cao trực tiếp giữa các bộ xử lý (trong hệ đa socket) và chipset, giúp tăng băng thông và giảm độ trễ."
  },

  // ================= CHƯƠNG 8: CÁC KIẾN TRÚC SONG SONG (15 CÂU) =================
  {
    id: 16,
    chapter: "Chương 8",
    question: "Theo phân loại kiến trúc máy tính của Michael Flynn (1966), kiến trúc của bộ xử lý đồ họa (GPU) chủ yếu dựa trên mô hình nào?",
    options: [
      "A. SISD (Single Instruction, Single Data)",
      "B. SIMD (Single Instruction, Multiple Data)",
      "C. MISD (Multiple Instruction, Single Data)",
      "D. MIMD (Multiple Instruction, Multiple Data)"
    ],
    correctAnswer: 1,
    rationale: "GPU xử lý hàng triệu điểm ảnh hoặc đỉnh đa giác bằng cách áp dụng CÙNG MỘT LỆNH (ví dụ: cộng màu, nhân ma trận biến đổi) lên NHIỀU DỮ LIỆU khác nhau cùng một lúc. Đây chính là bản chất của mô hình SIMD (Đơn lệnh, Đa dữ liệu)."
  },
  {
    id: 17,
    chapter: "Chương 8",
    question: "Các bộ vi xử lý Đa lõi (Multicore CPU) hiện đại như Intel Core i7 hay AMD Ryzen thuộc vào loại kiến trúc nào theo Flynn?",
    options: [
      "A. SISD",
      "B. SIMD",
      "C. MISD",
      "D. MIMD (Multiple Instruction, Multiple Data)"
    ],
    correctAnswer: 3,
    rationale: "Các lõi (Cores) trong một Multicore CPU có thể thực thi các luồng lệnh KHÁC NHAU, hoạt động trên các luồng dữ liệu KHÁC NHAU một cách độc lập (Ví dụ: Lõi 1 chạy Word, lõi 2 chạy Game). Do đó, nó thuộc mô hình MIMD (Đa lệnh, Đa dữ liệu)."
  },
  {
    id: 18,
    chapter: "Chương 8",
    question: "Trong kiến trúc Đa xử lý bộ nhớ dùng chung, khái niệm NUMA (Non-Uniform Memory Access) nghĩa là gì?",
    options: [
      "A. Mọi CPU truy cập vào mọi ô nhớ với thời gian trễ giống hệt nhau.",
      "B. CPU không thể truy cập bộ nhớ của CPU khác.",
      "C. Hệ thống dùng chung một không gian địa chỉ, nhưng thời gian CPU truy cập vào bộ nhớ cục bộ của nó sẽ NHANH HƠN truy cập vào bộ nhớ gắn trên CPU khác.",
      "D. Bộ nhớ liên tục thay đổi cấu trúc dữ liệu theo thuật toán AI."
    ],
    correctAnswer: 2,
    rationale: "NUMA (Truy cập bộ nhớ không đồng nhất) thường gặp ở các máy chủ nhiều socket (nhiều CPU). Mỗi CPU có thanh RAM cắm riêng cạnh nó (Local memory) nên truy cập rất nhanh. Nhưng nó vẫn có thể truy cập RAM của CPU khác (Remote memory) thông qua bus liên kết (như QPI), tuy nhiên thời gian trễ (latency) sẽ lâu hơn."
  },
  {
    id: 19,
    chapter: "Chương 8",
    question: "Phép toán cốt lõi mà phần cứng Tensor Core (trong GPU NVIDIA) sinh ra để giải quyết và tăng tốc cho Trí tuệ nhân tạo (AI/Deep Learning) là gì?",
    options: [
      "A. Xử lý đồ họa bóng đổ (Ray Tracing) thời gian thực.",
      "B. Thực hiện tính toán nhân-cộng ma trận 4x4 (D = A × B + C) trong một số lượng rất ít chu kỳ xung nhịp.",
      "C. Tính toán lượng giác phức tạp (sin, cos, tan) siêu tốc.",
      "D. Thực thi các lệnh phân nhánh IF/ELSE phức tạp song song."
    ],
    correctAnswer: 1,
    rationale: "Mạng nơ-ron nhân tạo (Deep Learning) phụ thuộc khổng lồ vào phép nhân ma trận. Lõi Tensor (Tensor Core) được thiết kế chuyên biệt ở mức phần cứng để thực hiện phép toán D = A * B + C cho các khối ma trận nhỏ (thường là 4x4) cực kỳ nhanh, thay vì dùng ALU tính từng số vô hướng."
  },
  {
    id: 20,
    chapter: "Chương 8",
    question: "Tensor Core thường áp dụng kỹ thuật tính toán 'Mixed Precision' (Độ chính xác hỗn hợp). Cơ chế này hoạt động như thế nào trong phép toán D = A × B + C?",
    options: [
      "A. Đầu vào A, B dùng FP64 (nhân đôi độ chính xác), tích lũy C, D dùng FP16.",
      "B. Cả A, B, C, D đều dùng INT8 (số nguyên 8-bit) để tiết kiệm điện.",
      "C. Đầu vào A, B dùng FP16 (16-bit) để tăng tốc độ nhân, nhưng việc cộng dồn (tích lũy) vào C và kết quả D dùng FP32 (32-bit) để tránh mất mát độ chính xác.",
      "D. Ma trận A dùng định dạng nguyên, ma trận B dùng định dạng thực."
    ],
    correctAnswer: 2,
    rationale: "Mixed Precision tận dụng ưu điểm của cả hai chuẩn. Đầu vào FP16 (Half-precision) nhỏ gọn, cho phép nạp nhiều dữ liệu và tính nhân rất nhanh. Tuy nhiên, nếu cộng dồn nhiều số nhỏ bằng FP16 sẽ bị sai số làm tròn nghiêm trọng. Do đó, Tensor Core dùng bộ cộng FP32 (Single-precision) để tích lũy kết quả, đảm bảo mô hình AI vẫn học chính xác."
  },
  {
    id: 21,
    chapter: "Chương 8",
    question: "Kiến trúc máy tính cụm (Clusters / Đa xử lý bộ nhớ phân tán) kết nối các máy tính độc lập qua mạng (LAN/Infiniband). Chúng giao tiếp dữ liệu với nhau bằng cách nào?",
    options: [
      "A. Bằng cách đọc/ghi trực tiếp vào một thanh RAM cắm chung.",
      "B. Thông qua cơ chế Truyền thông điệp (Message Passing, ví dụ chuẩn MPI).",
      "C. Bằng cách dùng chung bộ đệm L1 Cache.",
      "D. Thông qua DMA chia sẻ chung trên PCIe."
    ],
    correctAnswer: 1,
    rationale: "Trong kiến trúc bộ nhớ phân tán (Distributed Memory), mỗi node (máy tính) có RAM độc lập, không chia sẻ không gian địa chỉ. Để một node có được dữ liệu của node khác, chúng phải đóng gói dữ liệu và gửi qua mạng dưới dạng thông điệp (Message Passing Interface - MPI)."
  },
  {
    id: 22,
    chapter: "Chương 8",
    question: "Sự khác biệt cơ bản giữa Đa luồng đồng thời (SMT / Hyper-threading) và Đa lõi (Multicore) là gì?",
    options: [
      "A. SMT chia sẻ các tài nguyên thực thi vật lý (ALU, Pipeline) trong cùng 1 lõi để chạy nhiều luồng, còn Multicore nhân bản toàn bộ tài nguyên tạo thành các lõi vật lý riêng biệt.",
      "B. SMT dùng cho GPU, còn Multicore dùng cho CPU.",
      "C. SMT cung cấp hiệu năng nhân đôi chính xác như thêm 1 lõi vật lý.",
      "D. SMT yêu cầu hệ điều hành quản lý bộ nhớ phân tán."
    ],
    correctAnswer: 0,
    rationale: "Hardware Multithreading (như Hyper-Threading của Intel) tạo ra các luồng logic để lấp đầy những lúc ALU/Pipeline bị trống (stall), tài nguyên phần cứng vật lý vẫn chỉ là 1 bộ. Còn Multicore là có nhiều bộ ALU/Pipeline độc lập hoàn toàn, cho sức mạnh xử lý song song thực sự lớn hơn."
  },
  {
    id: 23,
    chapter: "Chương 8",
    question: "Vì sao các ứng dụng đồ họa và đào tạo Trí tuệ nhân tạo (AI) lại chạy nhanh hơn hàng chục lần trên GPU so với CPU cao cấp nhất?",
    options: [
      "A. Vì GPU có xung nhịp clock (GHz) cao hơn CPU rất nhiều.",
      "B. Vì GPU có Cache L3 dung lượng lớn hơn CPU.",
      "C. Vì GPU có hàng ngàn lõi nhỏ được thiết kế tối ưu cho luồng dữ liệu song song khổng lồ (Throughput), trong khi CPU có ít lõi nhưng tối ưu cho tác vụ phức tạp, phân nhánh nhiều (Latency).",
      "D. Vì GPU bỏ qua mọi quy tắc bắt lỗi bộ nhớ."
    ],
    correctAnswer: 2,
    rationale: "Triết lý thiết kế: CPU = Low Latency (Xử lý các logic phức tạp, rẽ nhánh nhanh với Cache lớn, Control logic mạnh). GPU = High Throughput (Hi sinh Control logic/Cache để nhét hàng nghìn lõi ALU đơn giản vào chip). AI và Đồ họa là toán học ma trận (cùng 1 phép tính lặp lại hàng triệu lần), rất phù hợp với SIMD/GPU."
  },
  {
    id: 24,
    chapter: "Chương 8",
    question: "Trong danh sách sau, loại vi mạch nào được thiết kế CHUYÊN BIỆT NHẤT (ASIC) chỉ để chạy các mô hình mạng nơ-ron nhân tạo (Deep Learning)?",
    options: [
      "A. CPU (Central Processing Unit)",
      "B. FPGA (Field Programmable Gate Array)",
      "C. TPU (Tensor Processing Unit) / NPU",
      "D. IGPU (Integrated GPU)"
    ],
    correctAnswer: 2,
    rationale: "TPU (của Google) hay NPU (Neural Processing Unit) là các bộ xử lý chuyên dụng kiến trúc Tensor, loại bỏ các thành phần đồ họa của GPU và tính toán đa dụng của CPU, chỉ tập trung tối đa phần cứng vào phép nhân ma trận cường độ cao để chạy AI nhanh và tiết kiệm điện nhất."
  },
  {
    id: 25,
    chapter: "Chương 8",
    question: "Kiến trúc UMA (Uniform Memory Access) có đặc điểm nào sau đây?",
    options: [
      "A. Thời gian một lõi CPU truy cập đến bất kỳ vị trí nào trong bộ nhớ chính đều bằng nhau.",
      "B. Là kiến trúc của hệ thống máy chủ mạng cụm (Clusters).",
      "C. Mỗi CPU sở hữu một dải địa chỉ riêng biệt không chồng lấn.",
      "D. Bắt buộc phải sử dụng Message Passing."
    ],
    correctAnswer: 0,
    rationale: "UMA (Truy cập bộ nhớ đồng nhất), thường được gọi là SMP (Symmetric Multiprocessor), kết nối các CPU với một bộ nhớ chia sẻ chung qua một bus hoặc crossbar switch. Do đó, thời gian trễ để lấy dữ liệu từ RAM là như nhau bất kể CPU nào phát lệnh."
  },
  {
    id: 26,
    chapter: "Chương 8",
    question: "Trong vòng lặp: `for(int i=0; i<100; i++) C[i] = A[i] + B[i];`, kiến trúc SIMD sẽ tối ưu hóa đoạn mã này như thế nào?",
    options: [
      "A. Gửi 100 vòng lặp sang 100 lõi CPU khác nhau để chạy MIMD.",
      "B. Nạp nhiều phần tử của mảng A và B vào các thanh ghi Vector lớn (ví dụ 256-bit), sau đó dùng 1 lệnh duy nhất để cộng song song nhiều cặp phần tử cùng lúc.",
      "C. Đoán trước nhánh for sẽ lặp 100 lần để tăng xung nhịp.",
      "D. Bỏ qua các phần tử có giá trị 0."
    ],
    correctAnswer: 1,
    rationale: "Đây là nguyên lý của xử lý Vector (SIMD). Thay vì cộng từng số (scalar), CPU nạp 4, 8 hoặc 16 số nguyên vào một thanh ghi Vector cực rộng (như AVX của Intel), và một lệnh ADD duy nhất sẽ cộng đồng thời tất cả các số đó trong 1 chu kỳ."
  },
  {
    id: 27,
    chapter: "Chương 8",
    question: "Theo phân loại Flynn, hệ thống MISD (Multiple Instruction, Single Data) có tính ứng dụng như thế nào trong thực tế?",
    options: [
      "A. Rất phổ biến, là nền tảng của mọi máy tính cá nhân hiện nay.",
      "B. Chủ yếu được ứng dụng trong các card đồ họa (VGA).",
      "C. Rất hiếm gặp trong thực tế, chỉ áp dụng trong một số hệ thống đòi hỏi tính chịu lỗi cực cao (nhiều thuật toán cùng kiểm tra 1 luồng dữ liệu).",
      "D. Là cơ sở của mạng Internet."
    ],
    correctAnswer: 2,
    rationale: "MISD áp dụng nhiều lệnh khác nhau lên cùng một luồng dữ liệu. Mô hình này rất hiếm, thường chỉ thấy ở hệ thống máy tính điều khiển bay không gian hoặc hạt nhân, nơi nhiều bộ xử lý tính toán các thuật toán khác nhau trên cùng một dữ liệu cảm biến để đối chiếu, nhằm tăng độ tin cậy."
  },
  {
    id: 28,
    chapter: "Chương 8",
    question: "Hiện tượng 'Data-level parallelism' (Song song mức dữ liệu) thể hiện rõ nét nhất ở kiến trúc nào?",
    options: [
      "A. Pipelining trong lõi CPU SISD.",
      "B. SIMD và các bộ xử lý Vector / GPU.",
      "C. Cụm máy chủ lưu trữ dữ liệu NAS.",
      "D. Kiến trúc Harvard."
    ],
    correctAnswer: 1,
    rationale: "Song song mức dữ liệu (Data-level parallelism) xảy ra khi một thao tác (lệnh) giống nhau được áp dụng đồng thời lên một tập dữ liệu lớn. Đây là định nghĩa và thế mạnh cốt lõi của kiến trúc SIMD (GPU, Vector processors)."
  },
  {
    id: 29,
    chapter: "Chương 8",
    question: "Vấn đề 'Cache Coherence' (Tính nhất quán của bộ đệm) là một thách thức kỹ thuật cực lớn đối với kiến trúc nào?",
    options: [
      "A. Máy tính kiến trúc SISD cơ bản.",
      "B. Hệ thống Đa xử lý bộ nhớ phân tán (Clusters).",
      "C. Hệ thống Đa xử lý bộ nhớ dùng chung (Shared Memory Multiprocessor / Multicore).",
      "D. Mạch giải mã lệnh (Instruction Decode)."
    ],
    correctAnswer: 2,
    rationale: "Trong hệ thống Multicore dùng chung RAM, mỗi lõi có bộ đệm Cache L1/L2 riêng. Nếu Lõi 1 đọc biến X vào Cache và sửa nó, Lõi 2 cũng đọc X, làm sao để Lõi 2 biết X đã bị Lõi 1 thay đổi mà lấy giá trị mới? Đây chính là bài toán nhất quán Cache (Snooping protocols/Directory-based) rất phức tạp ở SMP."
  },
  {
    id: 30,
    chapter: "Chương 8",
    question: "Nếu một mô hình AI cần nhân hai ma trận kích thước lớn, lợi thế lớn nhất của Tensor Core so với CUDA Core (ALU thông thường) trong GPU là gì?",
    options: [
      "A. Tensor Core có dung lượng RAM lớn hơn.",
      "B. CUDA Core thực hiện nhân-cộng (FMA) 1 cặp số trong 1 chu kỳ, trong khi 1 Tensor Core thực hiện nhân-cộng nguyên một khối ma trận (ví dụ 64 phép nhân) trong cùng 1 chu kỳ.",
      "C. Tensor Core hoạt động độc lập không cần GPU.",
      "D. Tensor Core dùng cơ chế Interrupt-driven I/O."
    ],
    correctAnswer: 1,
    rationale: "ALU thông thường (CUDA core) xử lý số vô hướng (Scalar), một chu kỳ tính được 1 phép tính `a * b + c`. Tensor Core là mạch chuyên dụng xử lý ma trận (Matrix), trong 1 chu kỳ nó hoàn thành thao tác tính toán cho cả 1 mảng số (như ma trận 4x4), đem lại tốc độ bứt phá cho Deep Learning."
  }
];

export default function ComputerArchitectureQuiz() {
  // Trạng thái lưu trữ các câu trả lời của người dùng. Key: question_id, Value: option_index
  const [answers, setAnswers] = useState<Record<number, number>>({});

  // Hàm xử lý chọn đáp án
  const handleSelect = (questionId: number, optionIndex: number) => {
    // Nếu đã trả lời câu này rồi thì khóa (không cho chọn lại)
    if (answers[questionId] !== undefined) return;
    
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  // Tính toán số điểm
  const score = questions.reduce((acc, q) => {
    if (answers[q.id] === q.correctAnswer) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const answeredCount = Object.keys(answers).length;

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Sticky Header: Score & Progress */}
        <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200 py-4 px-6 rounded-2xl mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
              Kiến trúc máy tính: IT3030
            </h1>
            <p className="text-sm text-slate-500 font-medium">
              Chương 7 (Hệ thống Vào-Ra) & Chương 8 (Kiến trúc song song)
            </p>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-3xl font-black text-indigo-600">
              {score}<span className="text-lg text-slate-400"> / 30</span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-1 rounded-md mt-1">
              Đã trả lời: {answeredCount}/30
            </span>
          </div>
        </div>

        {/* Danh sách câu hỏi */}
        <div className="space-y-8">
          {questions.map((q, index) => {
            const hasAnswered = answers[q.id] !== undefined;
            const userAnswer = answers[q.id];
            const isCorrect = userAnswer === q.correctAnswer;

            return (
              <div 
                key={q.id} 
                className={`bg-white p-6 md:p-8 rounded-2xl shadow-sm border transition-all duration-300
                  ${hasAnswered 
                    ? isCorrect 
                      ? 'border-emerald-500 ring-1 ring-emerald-500/20' 
                      : 'border-rose-400 ring-1 ring-rose-400/20' 
                    : 'border-slate-200 hover:border-indigo-300'}
                `}
              >
                {/* Meta Header */}
                <div className="flex items-center gap-3 mb-4">
                  <span className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm text-white shadow-sm
                    ${hasAnswered ? (isCorrect ? 'bg-emerald-500' : 'bg-rose-500') : 'bg-indigo-600'}
                  `}>
                    {index + 1}
                  </span>
                  <span className="bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    {q.chapter}
                  </span>
                </div>

                {/* Câu hỏi */}
                <h3 className="text-lg font-semibold text-slate-800 mb-6 leading-relaxed">
                  {q.question}
                </h3>

                {/* Danh sách đáp án */}
                <div className="grid gap-3">
                  {q.options.map((option, optIdx) => {
                    let btnClass = "border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-indigo-300 cursor-pointer";
                    let icon = null;

                    if (hasAnswered) {
                      // Khóa chuột
                      btnClass = "cursor-not-allowed ";
                      
                      if (optIdx === q.correctAnswer) {
                        // Đáp án đúng của hệ thống (luôn bôi xanh)
                        btnClass += "bg-emerald-50 border-emerald-500 text-emerald-800 font-medium shadow-sm";
                        icon = <span className="font-bold text-emerald-600 mr-2">✓</span>;
                      } else if (optIdx === userAnswer && !isCorrect) {
                        // Đáp án sai mà user chọn (bôi đỏ, gạch ngang)
                        btnClass += "bg-rose-50 border-rose-400 text-rose-800 line-through opacity-80";
                        icon = <span className="font-bold text-rose-600 mr-2">✗</span>;
                      } else {
                        // Các đáp án sai khác không được chọn (làm mờ)
                        btnClass += "bg-slate-50 border-slate-100 text-slate-400 opacity-60";
                      }
                    }

                    return (
                      <div
                        key={optIdx}
                        onClick={() => handleSelect(q.id, optIdx)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-start ${btnClass}`}
                      >
                        <div className="mt-0.5">{icon}</div>
                        <span className="flex-1">{option}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Khối Giải thích (Rationale) hiển thị ngay lập tức khi đã chọn */}
                {hasAnswered && (
                  <div className={`mt-6 p-5 rounded-xl border animate-fade-in-down
                    ${isCorrect ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/50 border-rose-200'}
                  `}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-sm font-bold uppercase tracking-wider
                        ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}
                      `}>
                        {isCorrect ? '🎉 Chính xác!' : '💡 Sai rồi! Hãy xem lại bản chất:'}
                      </span>
                    </div>
                    <p className={`text-sm leading-relaxed ${isCorrect ? 'text-emerald-900' : 'text-rose-900'}`}>
                      <strong>Giải thích chi tiết: </strong>{q.rationale}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Màn hình tổng kết cuối trang */}
        {answeredCount === questions.length && (
          <div className="mt-12 p-8 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl text-center shadow-xl text-white">
            <h2 className="text-3xl font-black mb-4">HOÀN THÀNH BÀI KIỂM TRA!</h2>
            <div className="text-5xl font-black text-yellow-300 drop-shadow-sm mb-4">
              {score} / 30
            </div>
            <p className="text-lg text-indigo-100 italic mb-8 max-w-2xl mx-auto leading-relaxed">
              {score >= 25 
                ? "Thành tích xuất sắc! Bạn nắm cực kỳ vững bản chất của DMA, Bus, chuẩn PCIe cũng như kiến trúc Tensor Core và SIMD. Bạn hoàn toàn sẵn sàng cho kỳ thi!"
                : score >= 15
                ? "Làm tốt lắm! Tuy nhiên, hãy ôn tập kỹ hơn về kiến trúc điểm-điểm, phân loại Flynn và vấn đề mixed precision trong AI để đạt điểm tối đa."
                : "Có vẻ bạn cần ôn lại lý thuyết Chương 7 và Chương 8. Hãy đọc kỹ phần giải thích chi tiết của các câu trả lời sai nhé!"}
            </p>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white text-indigo-700 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-slate-50 hover:scale-105 transition-all active:scale-95"
            >
              Lên đầu trang kiểm tra lại đáp án
            </button>
          </div>
        )}
      </div>
    </div>
  );
}