function search() {
    // Lấy giá trị từ ô tìm kiếm
    var searchQuery = document.getElementById("searchInput").value;
  
    // Simulate fetching student data from server
    var studentData = {
      name: "Nguyễn Văn An",
      studentID: "B21DCCN001",
      exams: [
        {
          examName: "Mạng máy tính",
          score: 10,
          status: "Hoàn thành",
          time: "10:00 AM - 11:30 AM",
          answers: ["A", "C", "C", "D", "B", "A", "D"],
          correctAnswers: ["1A", "2C", "3C", "4D", "5B", "6A", "7D"],
          explanations: ["Câu 1: Kết nối mạng sử dụng các giao thức khác nhau bằng <b>các bộ định tuyến</b>", "Câu 2: Nhược điểm của mạng dạng hình sao (Star) là: <b>Cần quá nhiều cáp để kết nối tới nút mạng trung tâm</b>", "Câu 3: Kiểu mạng <b>LAN</b> được hạn chế ở cấp tòa cao ốc hay một công sở", "Câu 4: Chiều dài tối đa của một đoạn trong kiến trúc 100Base-TX:<b>100m</b>","Câu 5: Khi nối mạng giữa 2 máy tính, thường sử dụng loại cáp nào để nối trực tiếp giữa chúng: <b>Cáp UTP chéo</b>","Câu 6: Các quy tắc điều quản việc truyền thông máy tính được gọi là: <b>A-Các giao thức</b>","Câu 7: Biễu diễn số 125 từ cơ số decimal sang cơ số binary: <b>A-01111101</b>"
          ]
        },
        
      ]
    };
  
    // Hiển thị kết quả
    var studentResultsDiv = document.getElementById("studentResults");
    studentResultsDiv.innerHTML = `
      <h2>Kết quả của sinh viên ${studentData.name} - ${studentData.studentID}</h2>
      ${studentData.exams.map(exam => `
        <div class="examResult">
          <h3>Kỳ thi: ${exam.examName}</h3>
          <p><strong>Điểm số:</strong> <b><span style="color: red;">${exam.score}</span></b></p>
          <p><strong>Trạng thái:</strong> ${exam.status}</p>
          <p><strong>Thời gian:</strong> ${exam.time}</p>
          <p><strong>Câu trả lời của sinh viên:</strong> ${exam.answers.join(", ")}</p>
          <p><strong>Đáp án đúng:</strong></p>
          <ul>
            ${exam.correctAnswers.map(answer => `<li>${answer}</li>`).join("")}
          </ul>
          ${exam.explanations.length > 0 ? `<p><strong><span style="color: red;">Giải thích chi tiết đáp án:</span></strong><br> ${exam.explanations.join("<br>")}</p>` : ""}
        </div>
      `).join("")}
      
    `;
    
  }

