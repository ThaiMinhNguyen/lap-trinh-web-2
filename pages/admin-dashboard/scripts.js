const exams = [
    { name: "Quản lý danh sách các kỳ thi", status: "open", link: "../admin-taokythi/admin-taokythi.html"},
    { name: "Quản lý danh sách người dùng", status: "open" , link: "./page2.html"},
    { name: "Xem thống kê", status: "restricted", link: "../admin-thongke/admin-thongke.html"},
    { name: "Xem kết quả sinh viên", status: "restricted", link: "../admin-xemketquasinhvien/admin-xemketquasinhvien.html"},
];

const examsList = document.getElementById('examsList');
const searchInput = document.getElementById('searchInput');
const filterSelect = document.getElementById('filterSelect');

function displayExams() {
    examsList.innerHTML = '';
    const searchTerm = searchInput.value.toLowerCase();
    const filter = filterSelect.value;

    exams.forEach(exam => {
        if ((exam.name.toLowerCase().includes(searchTerm) || searchTerm === '') &&
            (filter === 'all' || exam.status === filter)) {
            const li = document.createElement('li');
            li.className = 'examItem';
            li.textContent = exam.name;
            li.onclick = function(){
                if (exam.link) {
                    window.location.href = exam.link;
                }
            }
            examsList.appendChild(li);
        }
    });
    
}

 //
  
searchInput.addEventListener('input', displayExams);
filterSelect.addEventListener('change', displayExams);


displayExams();
