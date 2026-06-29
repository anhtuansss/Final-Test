export interface Question {
  word: string;
  correct: string;
  meaning: string;
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  questions?: Question[];
  customRoute?: string;
  totalQuestions?: number;
}

export const exams: Exam[] = [
  {
    id: "Chuong-123",
    title: "Kiểm tra chương 1 + 2 + 3",
    description: "50 câu hỏi trắc nghiệm RISC-V",
    customRoute: "/Chuong-123",
    totalQuestions: 50
  },
  {
    id: "Chuong-4",
    title: "Kiểm tra chương 4",
    description: "20 câu hỏi",
    customRoute: "/chuong-4",
    totalQuestions: 20
  },
  {
    id: "Chuong-5",
    title: "Kiểm tra chương 5",
    description: "20 câu hỏi",
    customRoute: "/chuong-5",
    totalQuestions: 20
  },
  {
    id: "Chuong-6",
    title: "Kiểm tra chương 6",
    description: "30 câu hỏi",
    customRoute: "/chuong-6",
    totalQuestions: 30
  },
  {
    id: "Chuong-7",
    title: "Kiểm tra chương 7+8",
    description: "30 câu hỏi",
    customRoute: "/chuong-78",
    totalQuestions: 30
  },
  {
    id: "Test-1-OOP",
    title: "Kiểm tra OOP 1",
    description: "40 câu hỏi",
    customRoute: "/Test-1-OOP",
    totalQuestions: 40
  },
  {
    id: "Test-2-OOP",
    title: "Kiểm tra OOP 2",
    description: "40 câu hỏi",
    customRoute: "/Test-2-OOP",
    totalQuestions: 40
  },
  {
    id: "Test-3-OOP",
    title: "Kiểm tra OOP 3",
    description: "40 câu hỏi",
    customRoute: "/Test-3-OOP",
    totalQuestions: 40
  },
  {
    id: "Test-4-OOP",
    title: "Kiểm tra OOP 4",
    description: "40 câu hỏi",
    customRoute: "/Test-4-OOP",
    totalQuestions: 40
  },
  {
    id: "Test-5-OOP",
    title: "Kiểm tra OOP 5",
    description: "40 câu hỏi",
    customRoute: "/Test-5-OOP",
    totalQuestions: 40
  },
  {
    id: "Test-6-OOP",
    title: "Kiểm tra OOP 6",
    description: "40 câu hỏi",
    customRoute: "/Test-6-OOP",
    totalQuestions: 40
  },
  {
    id: "Test-7-OOP",
    title: "Kiểm tra OOP 7",
    description: "40 câu hỏi",
    customRoute: "/Test-7-OOP",
    totalQuestions: 40
  },
  {
    id: "Test-8-OOP",
    title: "Kiểm tra OOP 8",
    description: "40 câu hỏi",
    customRoute: "/Test-8-OOP",
    totalQuestions: 40
  },
  {
    id: "Test-9-OOP",
    title: "Kiểm tra OOP 9",
    description: "40 câu hỏi",
    customRoute: "/Test-9-OOP",
    totalQuestions: 40
  },
  {
    id: "Test-10-OOP",
    title: "Kiểm tra OOP 10",
    description: "40 câu hỏi",
    customRoute: "/Test-10-OOP",
    totalQuestions: 40
  },
  {
    id: "Test-11-OOP",
    title: "Kiểm tra OOP 11",
    description: "50 câu hỏi",
    customRoute: "/Test-11-OOP",
    totalQuestions: 50
  },
  {
    id: "Test-KTMT-Lab-1",
    title: "Kiểm tra KTMT Lab-1",
    description: "40 câu hỏi",
    customRoute: "/KTMT-Lab-1",
    totalQuestions: 40
  },
  {
    id: "Test-KTMT-Lab-2",
    title: "Kiểm tra KTMT Lab-2",
    description: "40 câu hỏi",
    customRoute: "/KTMT-Lab-2",
    totalQuestions: 40
  },
  {
    id: "KTMT-Đề-20232",
    title: "Kiểm tra KTMT Đề 20232",
    description: "40 câu hỏi",
    customRoute: "/KTMT-20232",
    totalQuestions: 40
  },
  {
    id: "KTMT-Đề-Phát-Triển",
    title: "Kiểm tra KTMT Đề phát triển",
    description: "40 câu hỏi",
    customRoute: "/KTMT-PT",
    totalQuestions: 40
  },
  {
    id: "KTMT-Đề-Phát-Triển-2",
    title: "Kiểm tra KTMT Đề phát triển 2",
    description: "40 câu hỏi",
    customRoute: "/KTMT-PT-2",
    totalQuestions: 40
  },
    {
    id: "KTMT-Đề-2022.2",
    title: "Kiểm tra KTMT 2022.2",
    description: "40 câu hỏi",
    customRoute: "/KTMT-20222",
    totalQuestions: 40
  },
  {
    id: "n3-synonym",
    title: "Ôn Tập Từ Đồng Nghĩa N3",
    description: "Dựa trên bộ 50 cặp từ vựng trọng tâm",
    questions: [
      { word: "欠点 (けってん)", correct: "悪いところ", meaning: "khuyết điểm, điểm chưa tốt" },
      { word: "翌年 (よくねん)", correct: "次の年", meaning: "năm sau" },
      { word: "スケジュール", correct: "予定", meaning: "lịch trình, dự định" },
      { word: "楽な仕事 (らくなしごと)", correct: "簡単な仕事", meaning: "công việc nhàn, đơn giản" },
      { word: "さっき", correct: "少し前に", meaning: "một lúc trước, vừa nãy" },
      { word: "ぜったい", correct: "かならず", meaning: "tuyệt đối, chắc chắn" },
      { word: "気に入っている (きにいっている)", correct: "好きな", meaning: "thích" },
      { word: "サイズ", correct: "大きさ", meaning: "kích cỡ" },
      { word: "確かめる (たしかめる)", correct: "チェックする", meaning: "xác nhận, kiểm tra" },
      { word: "キッチン", correct: "台所", meaning: "bếp" },
      { word: "わけ", correct: "理由", meaning: "lý do, nguyên nhân" },
      { word: "おかしい", correct: "変", meaning: "kỳ lạ" },
      { word: "得意 (とくい)", correct: "上手", meaning: "giỏi" },
      { word: "短気 (たんき)", correct: "すぐ怒る", meaning: "nóng nảy, dễ nổi giận" },
      { word: "機会 (きかい)", correct: "チャンス", meaning: "cơ hội" },
      { word: "奪う (うばう)", correct: "取る", meaning: "lấy đi, cướp đi" },
      { word: "恐ろしい (おそろしい)", correct: "怖い", meaning: "đáng sợ" },
      { word: "減る (へる)", correct: "少なくなる", meaning: "giảm đi, ít đi" },
      { word: "あらゆる", correct: "全部", meaning: "tất cả" },
      { word: "輝く (かがやく)", correct: "光る", meaning: "tỏa sáng, phát sáng" },
      { word: "協力 (きょうりょく)", correct: "手伝う", meaning: "hiệp lực, giúp đỡ" },
      { word: "約 (やく)", correct: "大体", meaning: "khoảng, đại khái" },
      { word: "怒鳴る (どなる)", correct: "大声で怒る", meaning: "gào thét, hét lên" },
      { word: "逆 (ぎゃく)", correct: "反対", meaning: "ngược lại" },
      { word: "眩しい (まぶしい)", correct: "明る過ぎる", meaning: "sáng chói, sáng rực" },
      { word: "当然 (とうぜん)", correct: "もちろん", meaning: "đương nhiên, dĩ nhiên" },
      { word: "余る (あまる)", correct: "残る", meaning: "còn lại" },
      { word: "決まり (きまり)", correct: "規則", meaning: "quy định, quy tắc" },
      { word: "不安 (ふあん)", correct: "心配", meaning: "lo lắng" },
      { word: "全く (まったく)", correct: "全然", meaning: "hoàn toàn" },
      { word: "案 (あん)", correct: "アイデア", meaning: "đề án, ý tưởng" },
      { word: "指導 (しどう)", correct: "教える", meaning: "chỉ giáo, hướng dẫn" },
      { word: "急いで (いそいで)", correct: "慌てて", meaning: "vội vàng" },
      { word: "位置 (いち)", correct: "場所", meaning: "vị trí, địa điểm" },
      { word: "回収 (かいしゅう)", correct: "集める", meaning: "thu thập, thu lại" },
      { word: "漸く (ようやく)", correct: "やっと", meaning: "cuối cùng" },
      { word: "注文 (ちゅうもん)", correct: "頼む", meaning: "yêu cầu" },
      { word: "ぺこぺこ", correct: "空いてる", meaning: "đói meo" },
      { word: "カーブする", correct: "曲がる", meaning: "rẽ, quẹo" },
      { word: "おしまい", correct: "終わり", meaning: "kết thúc" },
      { word: "手段 (しゅだん)", correct: "やり方", meaning: "cách làm" },
      { word: "そっと", correct: "静かに", meaning: "nhẹ nhàng, lặng lẽ" },
      { word: "次第 (しだい)", correct: "少しずつ", meaning: "dần dần, từng chút một" },
      { word: "感謝 (かんしゃ)", correct: "お礼", meaning: "cảm ơn" },
      { word: "多少 (たしょう)", correct: "ちょっと", meaning: "một chút" },
      { word: "このごろ", correct: "最近", meaning: "gần đây" },
      { word: "しゃべる", correct: "話す", meaning: "nói chuyện" },
      { word: "きつい", correct: "大変", meaning: "khó khăn, vất vả" },
      { word: "草臥れる (くたびれる)", correct: "疲れる", meaning: "mệt mỏi" },
      { word: "単純 (たんじゅん)", correct: "わかりやすい", meaning: "đơn giản, dễ hiểu" }
    ]
  },
  {
    id: "demo-exam",
    title: "Bài kiểm tra mẫu",
    description: "Một bài tập ngắn để minh họa cách chọn bài tập",
    questions: [
      { word: "りんご", correct: "アップル", meaning: "quả táo" },
      { word: "ねこ", correct: "キャット", meaning: "con mèo" },
      { word: "いぬ", correct: "ドッグ", meaning: "con chó" }
    ]
  }
];

export const getExamById = (id: string) => {
  return exams.find(exam => exam.id === id);
};
