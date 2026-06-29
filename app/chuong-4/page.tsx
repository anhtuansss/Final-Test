"use client";

import React, { useState } from "react";

// Khai báo kiểu dữ liệu cho câu hỏi
type Question = {
    id: number;
    topic: string;
    question: string;
    options: string[];
    correctAnswer: number; // Index của đáp án đúng (0-3)
    rationale: string;
};

// DỮ LIỆU HARDCODE ĐẦY ĐỦ 20 CÂU HỎI (CHƯƠNG 4 - SỐ HỌC MÁY TÍNH)
const questions: Question[] = [
    {
        id: 1,
        topic: "Chuyển đổi cơ số",
        question: "Chuyển đổi chuỗi nhị phân '1101 1010 0111 0011' sang hệ cơ số mười sáu (Hexadecimal). Kết quả nào sau đây là đúng?",
        options: ["A. DA73", "B. DB73", "C. CD74", "D. DA74"],
        correctAnswer: 0,
        rationale: "Gộp mỗi 4 bit nhị phân thành 1 ký số Hex: 1101 = D (13), 1010 = A (10), 0111 = 7, 0011 = 3. Vậy kết quả chính xác là DA73. Lỗi phổ biến là tính sai 1101 thành C hoặc 1010 thành B."
    },
    {
        id: 2,
        topic: "Biểu diễn số nguyên",
        question: "Số thập phân -43 được biểu diễn trong hệ nhị phân 8-bit dùng hệ thống 'Bù 2' (Two's complement) là:",
        options: ["A. 1010 1011", "B. 1101 0100", "C. 1101 0101", "D. 0010 1011"],
        correctAnswer: 2,
        rationale: "Bước 1: Tìm nhị phân của +43 là 0010 1011. Bước 2: Lấy bù 1 (đảo bit) thành 1101 0100. Bước 3: Lấy bù 2 (Cộng 1 vào bù 1) thành 1101 0101. Đáp án A là lỗi dùng dấu-lượng (Sign-magnitude), B là lỗi chỉ lấy bù 1, D là số +43."
    },
    {
        id: 3,
        topic: "Biểu diễn số nguyên",
        question: "Dải giá trị biểu diễn được của một số nguyên CÓ DẤU 32-bit (sử dụng bù 2) là khoảng nào?",
        options: [
            "A. Từ 0 đến (2^32) - 1",
            "B. Từ -(2^31) đến (2^31) - 1",
            "C. Từ -(2^32) đến (2^32) - 1",
            "D. Từ -(2^31 - 1) đến (2^31) - 1"
        ],
        correctAnswer: 1,
        rationale: "Số nguyên có dấu bù 2 với N bit có dải giá trị từ -(2^(N-1)) đến (2^(N-1)) - 1. Với N=32, dải là -(2^31) đến (2^31) - 1. Đáp án A là của số không dấu. Đáp án D là dải của hệ Bù 1 (có 2 giá trị 0)."
    },
    {
        id: 4,
        topic: "Biểu diễn số nguyên",
        question: "Khi thực hiện mở rộng dấu (Sign-extension) số nhị phân 8-bit '1011 0101' thành 16-bit để thực thi lệnh tính toán, kết quả đúng trên thanh ghi là?",
        options: [
            "A. 0000 0000 1011 0101",
            "B. 1000 0000 1011 0101",
            "C. 0111 1111 1011 0101",
            "D. 1111 1111 1011 0101"
        ],
        correctAnswer: 3,
        rationale: "Mở rộng dấu (Sign-extension) yêu cầu chép bit dấu (MSB) vào toàn bộ các bit được thêm vào ở phía trái. Vì MSB của '1011 0101' là 1, ta phải điền toàn số 1 vào 8 bit cao. Đáp án A là mở rộng không dấu (Zero-extension)."
    },
    {
        id: 5,
        topic: "Tràn số (Overflow)",
        question: "Theo quy tắc số học máy tính, phép cộng hai số nguyên CÓ DẤU (Signed) bị tràn số (Overflow) trong trường hợp nào sau đây?",
        options: [
            "A. Khi cộng hai số trái dấu và kết quả mang dấu âm.",
            "B. Khi có cờ nhớ (Carry Out) sinh ra từ bit cao nhất (MSB).",
            "C. Khi cộng hai số dương nhưng kết quả sinh ra lại có bit MSB bằng 1 (mang dấu âm), hoặc cộng hai số âm nhưng kết quả có MSB bằng 0.",
            "D. Bất cứ khi nào tổng vượt qua giới hạn của số lượng bit, bất kể dấu."
        ],
        correctAnswer: 2,
        rationale: "Tràn số có dấu (Signed Overflow) XẢY RA KHI cộng 2 số CÙNG DẤU nhưng kết quả lại TRÁI DẤU với 2 số đó (Dương + Dương = Âm, hoặc Âm + Âm = Dương). Cộng hai số trái dấu KHÔNG BAO GIỜ bị tràn. Đáp án B là điều kiện tràn của số KHÔNG DẤU (Unsigned)."
    },
    {
        id: 6,
        topic: "Tràn số (Overflow)",
        question: "Phép trừ hai số nguyên có dấu A - B gây ra tràn số (Overflow) khi nào?",
        options: [
            "A. A dương, B dương, và kết quả âm.",
            "B. A âm, B dương, và kết quả dương; hoặc A dương, B âm, và kết quả âm.",
            "C. A âm, B âm, và kết quả dương.",
            "D. Luôn tràn khi A nhỏ hơn B."
        ],
        correctAnswer: 1,
        rationale: "A - B thực chất là A + (-B). Nếu A âm, B dương thì -B là âm, bài toán trở thành Âm + Âm. Nếu kết quả là Dương thì tràn. Tương tự, A dương, B âm thì -B là dương (Dương + Dương). Nếu kết quả Âm thì tràn. Các lựa chọn khác không tạo ra tình huống cộng 2 số cùng dấu bị sai dấu."
    },
    {
        id: 7,
        topic: "Tràn số (Overflow)",
        question: "Trong phần cứng ALU, với phép cộng C = A + B (A, B, C là các số có dấu), biểu thức logic nào sau đây phát hiện chính xác cờ Overflow (V)? (Quy ước: X_31 là bit dấu (MSB) của X)",
        options: [
            "A. V = CarryIn_31 XOR CarryOut_31",
            "B. V = (A_31 AND B_31 AND NOT C_31) OR (NOT A_31 AND NOT B_31 AND C_31)",
            "C. Cả A và B đều là biểu thức đúng để phát hiện Overflow.",
            "D. V = CarryOut_31 (Chỉ cần kiểm tra Carry out của MSB)"
        ],
        correctAnswer: 2,
        rationale: "Có 2 cách phát hiện tràn số có dấu bằng phần cứng: 1 là kiểm tra dấu (A dương, B dương sinh C âm HOẶC A âm, B âm sinh C dương) giống biểu thức B. Cách 2 tối ưu hơn trong ALU là dùng XOR giữa Carry In vào MSB và Carry Out từ MSB (biểu thức A). Do đó cả A và B đều đúng."
    },
    {
        id: 8,
        topic: "Phép toán số nguyên",
        question: "Trong thuật toán NHÂN hai số nguyên bằng phần cứng (phiên bản cơ bản Shift-Add), điều gì xảy ra ở một bước lặp nếu bit thấp nhất (LSB) của thanh ghi Multiplier (Số nhân) bằng 1?",
        options: [
            "A. Chỉ thực hiện dịch phải thanh ghi Product (Tích).",
            "B. Cộng Multiplicand (Số bị nhân) vào nửa trên của thanh ghi Product, sau đó dịch phải thanh ghi Product và Multiplier.",
            "C. Trừ Multiplicand khỏi thanh ghi Product, sau đó dịch trái.",
            "D. Kết thúc thuật toán và báo lỗi tràn số."
        ],
        correctAnswer: 1,
        rationale: "Thuật toán nhân phần cứng hoạt động bằng cách: Kiểm tra bit LSB của Multiplier. Nếu là 1, phần cứng sẽ cộng Multiplicand vào nửa cao của Tích. Nếu là 0 thì không cộng. Sau đó, bất kể bit là 0 hay 1, hệ thống đều dịch phải thanh ghi Tích (chứa chung cả số nhân ở nửa dưới) 1 bit."
    },
    {
        id: 9,
        topic: "Phép toán số nguyên",
        question: "Trong thuật toán CHIA số nguyên bằng phần cứng, thao tác 'Phục hồi' (Restore) được thực hiện khi nào và như thế nào?",
        options: [
            "A. Khi Remainder (Số dư) >= 0. Hệ thống ghi bit 1 vào Quotient (Thương).",
            "B. Khi Remainder < 0 sau khi trừ Divisor (Số chia). Hệ thống cộng lại Divisor vào Remainder để phục hồi, và ghi bit 0 vào Quotient.",
            "C. Khi phát hiện phép chia cho 0. Hệ thống tự động phục hồi Quotient về 0.",
            "D. Khi Quotient bị tràn, hệ thống tự động dịch phải Remainder."
        ],
        correctAnswer: 1,
        rationale: "Ở mỗi bước của phép chia, hệ thống thử trừ Divisor khỏi Remainder. Nếu kết quả âm (<0), nghĩa là 'trừ quá tay' (chưa chia được), nó phải CỘNG LẠI (restore) Divisor vào Remainder để trả về giá trị cũ, đồng thời đẩy bit 0 vào Thương. Nếu kết quả >=0, nó giữ nguyên và đẩy bit 1 vào Thương."
    },
    {
        id: 10,
        topic: "Dấu phẩy động",
        question: "Theo chuẩn IEEE 754 độ chính xác đơn (Single precision - 32 bits), cấu trúc phân bổ các trường bit từ trái sang phải (MSB đến LSB) là gì?",
        options: [
            "A. 1 bit Dấu (Sign), 11 bit Mũ (Exponent), 20 bit Định trị (Fraction)",
            "B. 1 bit Dấu, 8 bit Định trị, 23 bit Mũ",
            "C. 1 bit Dấu, 8 bit Mũ, 23 bit Định trị",
            "D. 1 bit Dấu, 7 bit Mũ, 24 bit Định trị"
        ],
        correctAnswer: 2,
        rationale: "Chuẩn IEEE 754 Single Precision sử dụng 32 bit: 1 bit Sign (dấu), 8 bit Exponent (Mũ có độ lệch Bias), và 23 bit Fraction/Mantissa (Phần định trị). Đáp án A mô tả cấu trúc gần với chuẩn Floating point, nhưng kích thước đó không có thực (Double là 1-11-52)."
    },
    {
        id: 11,
        topic: "Dấu phẩy động",
        question: "Để giải quyết vấn đề so sánh số mũ âm và dương, chuẩn IEEE 754 cộng thêm một độ lệch (Bias) vào số mũ thực. Giá trị Bias của độ chính xác Đơn (32-bit) và Kép (64-bit) lần lượt là:",
        options: [
            "A. 128 và 1024",
            "B. 127 và 1023",
            "C. 255 và 2047",
            "D. 127 và 255"
        ],
        correctAnswer: 1,
        rationale: "Bias giúp các số mũ luôn được lưu trữ dưới dạng số không dấu dương để mạch so sánh số nguyên chạy nhanh hơn. Công thức tính Bias là (2^(k-1)) - 1, với k là số bit của Exponent. Độ chính xác đơn k=8 -> Bias=127. Độ chính xác kép k=11 -> Bias=1023."
    },
    {
        id: 12,
        topic: "Dấu phẩy động",
        question: "Số thập phân -0.75 được biểu diễn theo chuẩn IEEE 754 (32-bit) sẽ có trường Mũ (Exponent) và phần Định trị (Fraction) lưu trong bộ nhớ như thế nào? (Gợi ý: -0.75 = -1.5 x 2^-1)",
        options: [
            "A. Sign = 1, Exponent = 126, Fraction = 1000...0",
            "B. Sign = 1, Exponent = 127, Fraction = 1100...0",
            "C. Sign = 0, Exponent = 126, Fraction = 1000...0",
            "D. Sign = 1, Exponent = 126, Fraction = 0100...0"
        ],
        correctAnswer: 0,
        rationale: "-0.75 = -0.11 (nhị phân) = -1.1 x 2^-1 (dạng chuẩn hóa). Vì là số âm -> Sign = 1. Số mũ thực là -1 -> Số mũ lưu trữ (Exponent) = -1 + Bias 127 = 126. Phần định trị là phần sau dấu phẩy (bỏ đi số 1 ẩn) -> 10000...0 (được chèn vào trường 23 bit). => Đáp án A."
    },
    {
        id: 13,
        topic: "Dấu phẩy động",
        question: "Khái niệm 'Bit ẩn' (Hidden bit / Implicit leading 1) trong chuẩn IEEE 754 mang lại lợi ích gì?",
        options: [
            "A. Giúp che giấu dấu của số bị biểu diễn.",
            "B. Tiết kiệm được 1 bit lưu trữ, do mọi số chuẩn hóa hệ cơ số 2 đều bắt đầu bằng '1.', nên ta không cần lưu số 1 đó, tăng độ chính xác của phần định trị lên 24 bit thực tế.",
            "C. Giúp CPU biết khi nào xảy ra hiện tượng Overflow.",
            "D. Dùng để làm bit parity kiểm tra lỗi bộ nhớ."
        ],
        correctAnswer: 1,
        rationale: "Bởi vì một số dấu phẩy động ở dạng chuẩn hóa (Normalized) trong hệ nhị phân luôn có dạng 1.xxxxx * 2^E, số 1 nguyên đứng trước dấu phẩy thập phân là hằng số hiển nhiên. Do đó IEEE 754 quy ước không lưu nó, giúp 'ăn gian' thêm 1 bit (từ 23 bit thành 24 bit định trị)."
    },
    {
        id: 14,
        topic: "Dấu phẩy động",
        question: "Chuẩn IEEE 754 định nghĩa giá trị Số không (Zero) như thế nào trong mã máy?",
        options: [
            "A. Exponent chứa toàn bit 1, Fraction chứa toàn bit 0.",
            "B. Sign bit = 0, Exponent chứa toàn bit 1, Fraction khác 0.",
            "C. Exponent chứa toàn bit 0, Fraction chứa toàn bit 0.",
            "D. Exponent chứa toàn bit 0, Fraction chứa toàn bit 1."
        ],
        correctAnswer: 2,
        rationale: "Trong IEEE 754, giá trị 0.0 được mã hóa đặc biệt: toàn bộ các bit của Exponent bằng 0 và toàn bộ các bit của Fraction bằng 0. (Có thể có +0 và -0 tùy vào bit Sign). Đáp án A là định nghĩa của Vô cực (Infinity). Đáp án B là định nghĩa của NaN (Not a Number)."
    },
    {
        id: 15,
        topic: "Dấu phẩy động",
        question: "Bước ĐẦU TIÊN mà ALU phần cứng phải làm khi cộng hai số dấu phẩy động (Floating-point Addition) là gì?",
        options: [
            "A. Cộng trực tiếp 2 phần định trị (Fraction) lại với nhau.",
            "B. So sánh hai số mũ (Exponent), và dịch phải phần định trị của số có số mũ nhỏ hơn để hai số mũ cân bằng nhau.",
            "C. Chuẩn hóa (Normalize) cả 2 toán hạng trước khi bắt đầu.",
            "D. Cộng hai số mũ lại với nhau."
        ],
        correctAnswer: 1,
        rationale: "Giống như toán thập phân (ví dụ cộng 1.5x10^2 với 2.0x10^1), bạn không thể cộng định trị khi số mũ khác nhau. Bước 1 bắt buộc là đẩy số mũ nhỏ hơn lên bằng số mũ lớn hơn bằng cách dịch phải phần định trị của nó (căn chỉnh dấu phẩy) trước khi thực hiện cộng."
    },
    {
        id: 16,
        topic: "Dấu phẩy động",
        question: "Hiện tượng 'Tràn dưới' (Underflow) của hệ dấu phẩy động xảy ra trong trường hợp nào?",
        options: [
            "A. Khi số mũ dương (positive exponent) quá lớn vượt quá khả năng biểu diễn (ví dụ > 127).",
            "B. Khi cộng hai phần định trị sinh ra bit nhớ đẩy ra ngoài.",
            "C. Khi số mũ âm (negative exponent) vượt quá giới hạn nhỏ nhất có thể biểu diễn được, kết quả tiến sát về 0 và không thể lưu chính xác.",
            "D. Khi chia một số dương cho vô cùng (Infinity)."
        ],
        correctAnswer: 2,
        rationale: "Tràn trên (Overflow) xảy ra khi Exponent quá lớn (ra dương vô cùng). Còn Tràn dưới (Underflow) xảy ra khi Exponent âm quá nhỏ (ví dụ 2^-150 trong khi số mũ nhỏ nhất hỗ trợ chỉ là 2^-126 ở single precision), khiến số quá nhỏ và thường bị phần cứng vứt bỏ hoặc đặt về 0."
    },
    {
        id: 17,
        topic: "Chuyển đổi cơ số",
        question: "Biểu diễn hệ nhị phân của số thập phân phân số 13.25 là gì?",
        options: [
            "A. 1101.10",
            "B. 1011.01",
            "C. 1110.01",
            "D. 1101.01"
        ],
        correctAnswer: 3,
        rationale: "Phần nguyên: 13 = 8 + 4 + 1 = 1101_2. Phần phân số: 0.25 * 2 = 0.5 (ghi 0), 0.5 * 2 = 1.0 (ghi 1). Vậy 0.25_10 = 0.01_2. Ghép lại ta được 1101.01_2. Sinh viên thường nhầm 0.25 là .10 (do tư duy hệ thập phân)."
    },
    {
        id: 18,
        topic: "Dấu phẩy động",
        question: "Tại sao không thể biểu diễn chính xác tuyệt đối số thập phân 0.1 trong chuẩn máy tính IEEE 754?",
        options: [
            "A. Vì máy tính không có thuật toán nhân chia cho số lẻ.",
            "B. Vì 0.1 sinh ra Underflow do số mũ quá nhỏ.",
            "C. Vì 0.1 khi chuyển sang hệ cơ số 2 tạo thành chuỗi bit tuần hoàn vô hạn (0.000110011...), bị giới hạn cắt cụt bởi trường Fraction 23 bit.",
            "D. Vì bit ẩn (hidden bit) không hỗ trợ các số có giá trị tuyệt đối nhỏ hơn 1."
        ],
        correctAnswer: 2,
        rationale: "Rất nhiều phân số hữu hạn ở hệ cơ số 10 lại là vô hạn tuần hoàn ở hệ cơ số 2 (giống như 1/3 trong hệ thập phân là 0.3333...). Khi lưu vào thanh ghi bị giới hạn độ dài (23 bit Fraction), các bit cuối cùng sẽ bị chặt bỏ hoặc làm tròn, tạo ra sai số làm tròn (Rounding error)."
    },
    {
        id: 19,
        topic: "Phép toán số nguyên",
        question: "Phép nhân số nguyên có dấu 32-bit phần mềm hoặc phần cứng sinh ra kết quả lớn nhất có kích thước bao nhiêu bit?",
        options: [
            "A. 32 bit",
            "B. 31 bit",
            "C. 64 bit",
            "D. 128 bit"
        ],
        correctAnswer: 2,
        rationale: "Khi nhân hai số nguyên kích thước N bit, kết quả (Tích - Product) cần tối đa 2N bit để chứa mà không bị mất mát dữ liệu (không bị overflow). Với hai số 32-bit, thanh ghi chứa Tích phải có kích thước 64 bit."
    },
    {
        id: 20,
        topic: "Tràn số (Overflow)",
        question: "Khi thực hiện phép cộng 2 số không dấu (Unsigned) 32-bit, ta có thể dùng cờ nhớ thoát (Carry Out) của mạch cộng để biết có tràn số hay không. Tính chất này có đúng với số CÓ DẤU (Signed) bù 2 không?",
        options: [
            "A. Đúng hoàn toàn, cờ Carry Out dùng chung cho cả 2 loại.",
            "B. Sai. Đối với số có dấu, Carry Out từ MSB không có ý nghĩa cảnh báo tràn số. Tràn số có dấu được phát hiện qua sự bất thường về dấu (VD: + cộng + ra -).",
            "C. Đúng một nửa, nó chỉ áp dụng nếu cả 2 số đều mang dấu âm.",
            "D. Sai, số có dấu không bao giờ bị tràn."
        ],
        correctAnswer: 1,
        rationale: "Kiến trúc máy tính dùng chung một khối ALU cộng (Adder) cho cả số có dấu và không dấu. Tuy nhiên, logic báo lỗi khác nhau: Cờ CarryOut từ MSB dùng để báo tràn số Không dấu. Còn với số Có dấu bù 2, ta bỏ qua CarryOut (vì số âm sinh ra CarryOut rất tự nhiên), mà phải dựa vào cờ Overflow (V) (kiểm tra sự trái dấu bất thường)."
    }
];

export default function ComputerArithmeticQuiz() {
    // State lưu đáp án user đã chọn. Key là câu hỏi id, value là option index
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

    // Hàm xử lý chọn đáp án
    const handleSelectOption = (questionId: number, optionIndex: number) => {
        // Nếu câu hỏi này đã được trả lời thì khóa (không cho chọn lại)
        if (selectedAnswers[questionId] !== undefined) return;

        setSelectedAnswers((prev) => ({
            ...prev,
            [questionId]: optionIndex,
        }));
    };

    // Tính toán số điểm realtime
    const score = Object.entries(selectedAnswers).reduce((acc, [qId, ansIdx]) => {
        const question = questions.find((q) => q.id === Number(qId));
        if (question && question.correctAnswer === ansIdx) {
            return acc + 1;
        }
        return acc;
    }, 0);

    const answeredCount = Object.keys(selectedAnswers).length;

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 font-sans">
            <div className="max-w-4xl mx-auto">

                {/* Header - Sticky */}
                <div className="sticky top-0 z-50 bg-white rounded-2xl shadow-lg p-6 mb-8 flex flex-col md:flex-row items-center justify-between border-b-4 border-indigo-500">
                    <div>
                        <h1 className="text-2xl font-extrabold text-slate-800">IT3030 - Quiz CH4: Số học máy tính</h1>
                        <p className="text-slate-500 text-sm mt-1">Ôn tập hệ đếm, IEEE 754, ALU, Overflow (Strictly CH4)</p>
                    </div>
                    <div className="mt-4 md:mt-0 bg-indigo-50 px-6 py-3 rounded-xl border border-indigo-100 flex flex-col items-center">
                        <span className="text-indigo-800 font-bold text-xl">
                            {score} / 20 Điểm
                        </span>
                        <span className="text-xs text-indigo-500 font-medium tracking-wide uppercase">
                            Đã làm: {answeredCount}/20
                        </span>
                    </div>
                </div>

                {/* Danh sách câu hỏi */}
                <div className="space-y-8">
                    {questions.map((q, index) => {
                        const hasAnswered = selectedAnswers[q.id] !== undefined;
                        const userAnswer = selectedAnswers[q.id];
                        const isCorrect = userAnswer === q.correctAnswer;

                        return (
                            <div
                                key={q.id}
                                className={`bg-white rounded-2xl p-6 md:p-8 shadow-sm border ${hasAnswered
                                        ? isCorrect ? 'border-green-300 bg-green-50/10' : 'border-red-300 bg-red-50/10'
                                        : 'border-slate-200'
                                    } transition-colors duration-300`}
                            >
                                {/* Meta thông tin câu hỏi */}
                                <div className="flex items-center space-x-3 mb-4">
                                    <span className="flex items-center justify-center bg-indigo-600 text-white font-bold w-10 h-10 rounded-full shadow-md">
                                        {index + 1}
                                    </span>
                                    <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                                        {q.topic}
                                    </span>
                                </div>

                                {/* Nội dung câu hỏi */}
                                <h3 className="text-lg md:text-xl font-medium text-slate-800 mb-6 leading-relaxed">
                                    {q.question}
                                </h3>

                                {/* Các đáp án */}
                                <div className="grid grid-cols-1 gap-3">
                                    {q.options.map((option, optIdx) => {
                                        // Logic màu sắc đáp án
                                        let optionClass = "border-slate-200 text-slate-700 bg-white hover:border-indigo-400 hover:bg-indigo-50 cursor-pointer";
                                        let icon = null;

                                        if (hasAnswered) {
                                            // Khóa chuột
                                            optionClass = "cursor-not-allowed ";

                                            if (optIdx === q.correctAnswer) {
                                                // Đáp án đúng luôn xanh
                                                optionClass += "border-green-500 bg-green-50 text-green-800 font-medium shadow-sm";
                                                icon = <span className="mr-2 text-green-600 font-bold">✓</span>;
                                            } else if (optIdx === userAnswer && !isCorrect) {
                                                // Đáp án sai mà user chọn thì đỏ
                                                optionClass += "border-red-400 bg-red-50 text-red-800 line-through opacity-80";
                                                icon = <span className="mr-2 text-red-500 font-bold">✗</span>;
                                            } else {
                                                // Đáp án sai mà user ko chọn thì làm mờ
                                                optionClass += "border-slate-100 bg-slate-50 text-slate-400 opacity-50";
                                            }
                                        }

                                        return (
                                            <div
                                                key={optIdx}
                                                onClick={() => handleSelectOption(q.id, optIdx)}
                                                className={`p-4 rounded-xl border-2 transition-all duration-200 flex items-center ${optionClass}`}
                                            >
                                                {icon}
                                                <span className="flex-1">{option}</span>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Phần Rationale (Giải thích) xổ ra khi đã chọn */}
                                {hasAnswered && (
                                    <div className={`mt-6 p-5 rounded-xl border ${isCorrect ? 'bg-green-100 border-green-200' : 'bg-red-50 border-red-200'
                                        } animate-fade-in-down`}>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={`text-lg font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                                                {isCorrect ? '🎉 Chính xác!' : '💡 Sai rồi! Hãy xem lại lý thuyết:'}
                                            </span>
                                        </div>
                                        <p className={`text-sm leading-relaxed ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                                            <strong>Giải thích: </strong> {q.rationale}
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Footer */}
                {answeredCount === questions.length && (
                    <div className="mt-12 p-8 bg-indigo-600 rounded-2xl text-center shadow-xl text-white">
                        <h2 className="text-3xl font-extrabold mb-2">Hoàn thành bài thi!</h2>
                        <p className="text-indigo-200 text-lg">
                            Số điểm cuối cùng của bạn là: <span className="text-white font-bold text-2xl">{score} / {questions.length}</span>
                        </p>
                        <p className="mt-4 italic">
                            {score >= 16 ? "Xuất sắc! Bạn nắm cực chắc kiến trúc ALU và IEEE 754." :
                                score >= 10 ? "Khá ổn, nhưng hãy ôn kỹ lại phần phân biệt dấu (Signed/Unsigned) nhé." :
                                    "Bạn cần xem lại slide Chương 4 (Số học máy tính) ngay!"}
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-6 bg-white text-indigo-700 font-bold px-8 py-3 rounded-full hover:bg-indigo-50 transition-colors shadow-md"
                        >
                            Làm lại từ đầu
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}