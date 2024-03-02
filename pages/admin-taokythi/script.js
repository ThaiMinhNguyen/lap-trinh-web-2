let questionCounter = 1;

function addQuestion() {
  const questionsContainer = document.getElementById('questionsContainer');

  const questionDiv = document.createElement('div');
  questionDiv.id = `question${questionCounter}`;

  const questionNumber = questionCounter;
  const questionLabel = document.createElement('label');
  questionLabel.textContent = `Question ${questionNumber}:`;
  const questionInput = document.createElement('input');
  questionInput.type = 'text';
  questionInput.name = `question${questionNumber}`;
  questionInput.required = true;

  const answersLabel = document.createElement('label');
  
  

  const answerA = createAnswerInput('A', questionNumber);
  const answerB = createAnswerInput('B', questionNumber);
  const answerC = createAnswerInput('C', questionNumber);
  const answerD = createAnswerInput('D', questionNumber);

  const correctAnswerLabel = document.createElement('label');
  correctAnswerLabel.textContent = 'Đáp án:';

  const correctAnswerSelect = document.createElement('select');
  correctAnswerSelect.name = `correctAnswer${questionNumber}`;
  correctAnswerSelect.required = true;

  const optionA = createOption('A');
  const optionB = createOption('B');
  const optionC = createOption('C');
  const optionD = createOption('D');

  correctAnswerSelect.appendChild(optionA);
  correctAnswerSelect.appendChild(optionB);
  correctAnswerSelect.appendChild(optionC);
  correctAnswerSelect.appendChild(optionD);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Xóa';
  deleteButton.type = 'button';
  deleteButton.onclick = function() {
    questionsContainer.removeChild(questionDiv);
    updateQuestionNumbers();
  };

  questionDiv.appendChild(questionLabel);
  questionDiv.appendChild(questionInput);
  questionDiv.appendChild(answersLabel);
  questionDiv.appendChild(answerA.label);
  questionDiv.appendChild(answerA.input);
  questionDiv.appendChild(answerB.label);
  questionDiv.appendChild(answerB.input);
  questionDiv.appendChild(answerC.label);
  questionDiv.appendChild(answerC.input);
  questionDiv.appendChild(answerD.label);
  questionDiv.appendChild(answerD.input);
  questionDiv.appendChild(correctAnswerLabel);
  questionDiv.appendChild(correctAnswerSelect);
  questionDiv.appendChild(deleteButton);

  questionsContainer.appendChild(questionDiv);

  questionCounter++;
  updateQuestionNumbers();
}
function createNewExam() {
  // Lấy tham chiếu đến các phần tử HTML trong bảng tạo thông tin bài thi
  const examFormContainer = document.getElementById('examFormContainer');
  const examNameInput = document.getElementById('examName');
  const descriptionInput = document.getElementById('description');
  const examTypeSelect = document.getElementById('examType');
  const questionsContainer = document.getElementById('questionsContainer');

  // Xóa các giá trị trong các trường nhập liệu
  examNameInput.value = '';
  descriptionInput.value = '';
  examTypeSelect.value = '';

  // Xóa tất cả các câu hỏi cũ
  questionsContainer.innerHTML = '';

  // Hiển thị bảng tạo thông tin bài thi
  
}

function createAnswerInput(choice, questionNumber) {
  const answerLabel = document.createElement('label');
  answerLabel.textContent = ` ${choice}:`;
  const answerInput = document.createElement('input');
  answerInput.type = 'text';
  answerInput.name = `answer${choice}${questionNumber}`;
  answerInput.required = true;
  return { label: answerLabel, input: answerInput };
}

function createOption(choice) {
  const option = document.createElement('option');
  option.value = choice;
  option.text = choice;
  return option;
}

function updateQuestionNumbers() {
  const questionsContainer = document.getElementById('questionsContainer');
  const questionDivs = questionsContainer.querySelectorAll('[id^="question"]');

  for (let i = 0; i < questionDivs.length; i++) {
    const questionDiv = questionDivs[i];

    const questionNumber = i + 1;
    const questionLabel = questionDiv.querySelector('label');
    questionLabel.textContent = `Câu ${questionNumber}:`;

    const questionInput = questionDiv.querySelector('input[type="text"]');
    questionInput.name = `question${questionNumber}`;

    const answerInputs = questionDiv.querySelectorAll('input[name^="answer"]');
    answerInputs.forEach((input, index) => {
      const choice = String.fromCharCode(65 + index);
      input.name = `answer${choice}${questionNumber}`;
    });

    const correctAnswerSelect = questionDiv.querySelector('select');
    correctAnswerSelect.name =`correctAnswer${questionNumber}`;
  }
}
// Thêm biến để theo dõi trạng thái hiển thị của bảng tạo thông tin bài thi
let examFormVisible = false;

function showExamForm() {
  const examFormContainer = document.getElementById('examFormContainer');
  const examResultsContainer = document.getElementById('examResultsContainer');
  const addExamButton = document.getElementById('addExamButton');

  // Ẩn/Hiện bảng tạo thông tin bài thi
  examFormVisible = !examFormVisible;
  examFormContainer.style.display = examFormVisible ? 'block' : 'none';

  // Ẩn/Hiện kết quả của bài thi
  examResultsContainer.style.display = examFormVisible ? 'none' : 'block';

  // Đổi chữ trên nút "Thêm bài thi"
  addExamButton.textContent = examFormVisible ? 'Quay lại' : 'Tạo mới';
}
function submitExam() {
  const examName = document.getElementById('examName').value;
  const description = document.getElementById('description').value;
  const examType = document.getElementById('examType').value;
  const questionData = getQuestionData();

  // Perform further processing or submission logic here
  displayExamResults(examName, description, examType, questionData);
  showExamForm();
  createNewExam();
}
function displayExamResults(examName, description, examType, questionData) {
    const resultsContainer = document.getElementById('examResultsContainer');
  
    // Tạo container cho kết quả bài thi
    const examResultsDiv = document.createElement('div');
    examResultsDiv.className = 'exam-results';
  
    // Tạo header chứa tên bài thi, số câu hỏi và nút "Chỉnh sửa" và "Xoá"
    const headerDiv = document.createElement('div');
    headerDiv.className = 'exam-header';
  
    const examHeader = document.createElement('h2');
    examHeader.textContent = `Bài thi - ${examName}`;
    headerDiv.appendChild(examHeader);
  
    // Hiển thị số câu hỏi
    const numberOfQuestions = document.createElement('p');
    numberOfQuestions.textContent = `Số câu: ${questionData.length}`;
    headerDiv.appendChild(numberOfQuestions);
  
    // Thêm nút "Chỉnh sửa"
    const editButton = document.createElement('button');
    editButton.textContent = 'Chỉnh sửa';
    editButton.type = 'button';
    editButton.onclick = function() {
      // Gọi hàm chỉnh sửa bài thi
      deleteExam(examName);
      editExam(examName, description, examType, questionData);
    };
    headerDiv.appendChild(editButton);
  
    // Thêm nút "Xoá"
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Xóa';
    deleteButton.type = 'button';
    deleteButton.onclick = function() {
      // Gọi hàm xoá bài thi
      deleteExam(examName);
    };
    headerDiv.appendChild(deleteButton);
  
    // Thêm header vào container
    examResultsDiv.appendChild(headerDiv);
  
    // Hiển thị thông tin bài thi
    const examInfoParagraph = document.createElement('p');
    examInfoParagraph.innerHTML = `<strong>Mô tả:</strong> ${description}<br><strong>Loại kỳ thi:</strong> ${examType}`;
    examResultsDiv.appendChild(examInfoParagraph);
  
    resultsContainer.insertBefore(examResultsDiv, resultsContainer.firstChild); // Chèn bài thi mới lên trên cùng
  }
  
  
  
  function editExam(examName, description, examType, questionData) {
    // Lấy tham chiếu đến các phần tử HTML trong bảng tạo thông tin bài thi
    const examFormContainer = document.getElementById('examFormContainer');
    const examNameInput = document.getElementById('examName');
    const descriptionInput = document.getElementById('description');
    const examTypeSelect = document.getElementById('examType');
    const questionsContainer = document.getElementById('questionsContainer');
  
    // Điền thông tin bài thi hiện tại vào các trường nhập liệu trong bảng tạo thông tin bài thi
    examNameInput.value = examName;
    descriptionInput.value = description;
    examTypeSelect.value = examType;
  
    // Xóa các câu hỏi hiện tại trong bảng tạo thông tin bài thi
    questionsContainer.innerHTML = '';
  
    // Thêm lại các câu hỏi từ dữ liệu của bài thi hiện tại
    for (let i = 0; i < questionData.length; i++) {
      const question = questionData[i];
  
      const questionDiv = document.createElement('div');
      questionDiv.id = `question${i + 1}`;
  
      const questionLabel = document.createElement('label');
      questionLabel.textContent = `Câu ${i + 1}:`;
      const questionInput = document.createElement('input');
      questionInput.type = 'text';
      questionInput.name = `question${i + 1}`;
      questionInput.required = true;
      questionInput.value = question.question;
  
      const answersLabel = document.createElement('label');
      
  
      const answerInputs = [];
      const correctAnswer = question.correctAnswer;
  
      for (let j = 0; j < question.answers.length; j++) {
        const choice = String.fromCharCode(65 + j);
  
        const answerLabel = document.createElement('label');
        answerLabel.textContent = ` ${choice}:`;
        const answerInput = document.createElement('input');
        answerInput.type = 'text';
        answerInput.name = `answer${choice}${i + 1}`;
        answerInput.required = true;
        answerInput.value = question.answers[j];
  
        answerInputs.push({ label: answerLabel, input: answerInput });
      }
  
      const correctAnswerLabel = document.createElement('label');
      correctAnswerLabel.textContent = 'Đáp án:';
  
      const correctAnswerSelect = document.createElement('select');
      correctAnswerSelect.name = `correctAnswer${i + 1}`;
      correctAnswerSelect.required = true;
  
      const optionA = createOption('A', correctAnswer);
      const optionB = createOption('B', correctAnswer);
      const optionC = createOption('C', correctAnswer);
      const optionD = createOption('D', correctAnswer);
  
      correctAnswerSelect.appendChild(optionA);
      correctAnswerSelect.appendChild(optionB);
      correctAnswerSelect.appendChild(optionC);
      correctAnswerSelect.appendChild(optionD);

      questionDiv.appendChild(questionLabel);
      questionDiv.appendChild(questionInput);
      questionDiv.appendChild(answersLabel);
  
      for (let j = 0; j < answerInputs.length; j++) {
        const answer = answerInputs[j];
        questionDiv.appendChild(answer.label);
        questionDiv.appendChild(answer.input);
      }
  
      questionDiv.appendChild(correctAnswerLabel);
      questionDiv.appendChild(correctAnswerSelect);
  
      questionsContainer.appendChild(questionDiv);
    }
  
    // Hiển thị bảng tạo thông tin bài thi
    showExamForm();
    recreateDeleteButtons();
  }
  function recreateDeleteButtons() {
    const questionsContainer = document.getElementById('questionsContainer');
    const questionDivs = questionsContainer.querySelectorAll('[id^="question"]');
  
    questionDivs.forEach((questionDiv, index) => {
      // Tạo nút "Xóa"
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Xóa';
      deleteButton.type = 'button';
      deleteButton.onclick = function() {
        questionsContainer.removeChild(questionDiv);
         // Tái tạo nút "Xóa" sau khi xoá câu hỏi
        updateQuestionNumbers(); // Cập nhật số thứ tự câu hỏi
      };
  
      // Thêm nút "Xóa" vào câu hỏi
      questionDiv.appendChild(deleteButton);
    });
  }
  function deleteExam(examName) {
    const resultsContainer = document.getElementById('examResultsContainer');
    
    // Tìm và xóa chỉ bài thi được chọn
    const examDivs = resultsContainer.querySelectorAll('.exam-results');
    for (let i = 0; i < examDivs.length; i++) {
      const examDiv = examDivs[i];
      const header = examDiv.querySelector('.exam-header');
      const examHeader = header.querySelector('h2');
      
      // So sánh chính xác với tên bài thi
      if (examHeader.textContent === `Bài thi - ${examName}`) {
        examDiv.remove();
        break; // Dừng sau khi xóa bài thi được chọn
      }
    }
  }

function getQuestionData() {
  const questionsContainer = document.getElementById('questionsContainer');
  const questionDivs = questionsContainer.querySelectorAll('[id^="question"]');

  const questionData = [];

  for (let i = 0; i < questionDivs.length; i++) {
    const questionDiv = questionDivs[i];

    const questionInput = questionDiv.querySelector('input[name^="question"]');
    const question = questionInput.value;

    const answerInputs = questionDiv.querySelectorAll('input[name^="answer"]');
    const answers = Array.from(answerInputs).map(input => input.value);

    const correctAnswerSelect = questionDiv.querySelector('select[name^="correctAnswer"]');
    const correctAnswer = correctAnswerSelect.value;

    questionData.push({
      question: question,
      answers: answers,
      correctAnswer: correctAnswer
    });
  }

  return questionData;
}