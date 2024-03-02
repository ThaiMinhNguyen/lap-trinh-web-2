function sortByKythi(){
    const selectedExam = document.getElementById("exam-select").value;
    const table = document.getElementById("thongke-hocsinh");
    const rows = table.querySelectorAll("tbody tr");
    // console.log(selectedExam);
    for (const row of rows) {
        const cells = row.querySelectorAll("td");
        console.log(cells[2].textContent.trim());
        if (cells[2].textContent.trim() === selectedExam){
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    }
}

document.getElementById("exam-select").addEventListener("change", sortByKythi);

function getTableData() {
    const table = document.getElementById("thongke-hocsinh");
    const rows = table.querySelectorAll("tbody tr");
    const data = [];
    const kyThi1Data = {
        tongSoLanThamGia: 0,
        diemTong: 0,
        soLanDat: 0
    }; // Lưu trữ dữ liệu cho Kỳ thi 1
    const kyThi2Data = {
        tongSoLanThamGia: 0,
        diemTong: 0,
        soLanDat: 0
    }; // Lưu trữ dữ liệu cho Kỳ thi 2

    const diemthi = [];

    for (const row of rows) {
        const cells = row.querySelectorAll("td");
        const kyThi = cells[2].textContent.trim(); // Kỳ thi
        // console.log(kyThi);
        const diem = parseInt(cells[4].textContent.trim()); // Điểm
        // console.log(diem);
        diemthi.push(diem);
        if (kyThi === "Kỳ thi 1") {
            kyThi1Data.tongSoLanThamGia++;
            kyThi1Data.diemTong += diem;
            if (diem >= 5) kyThi1Data.soLanDat++;
        } else if (kyThi === "Kỳ thi 2") {
            kyThi2Data.tongSoLanThamGia++;
            kyThi2Data.diemTong += diem;
            if (diem >= 5) kyThi2Data.soLanDat++;
        }
    }

    // Tính toán tỷ lệ hoàn thành và điểm trung bình
    kyThi1Data.tyLeHoanThanh = kyThi1Data.soLanDat / kyThi1Data.tongSoLanThamGia * 100;
    kyThi1Data.diemTrungBinh = kyThi1Data.diemTong / kyThi1Data.tongSoLanThamGia;
    kyThi2Data.tyLeHoanThanh = kyThi2Data.soLanDat / kyThi2Data.tongSoLanThamGia * 100;
    kyThi2Data.diemTrungBinh = kyThi2Data.diemTong / kyThi2Data.tongSoLanThamGia;

    data.push(kyThi1Data, kyThi2Data);

    return data;
}

function getScoreData() {
    const table = document.getElementById("thongke-hocsinh");
    const rows = table.querySelectorAll("tbody tr");
    const data = [];
    
    const diemthi = [0,0,0,0,0,0,0,0,0,0,0];

    for (const row of rows) {
        const cells = row.querySelectorAll("td");
        const kyThi = cells[2].textContent.trim(); // Kỳ thi
        // console.log(kyThi);
        const diem = parseInt(cells[4].textContent.trim()); // Điểm
        // console.log(diem);
        diemthi[Math.round(diem)]++;
        console.log(diemthi);
    }

    return diemthi;
}



function updateChart() {
    const selectedStatistic = document.getElementById("statistic-select").value;
    // var chartContainer = document.getElementById("chartContainer");
    var chartContainer = Chart.getChart("chartContainer");
    const data = getTableData();
    let chartType = 'bar';

    // Clear existing chart
    if(chartContainer != undefined){
        chartContainer.destroy();
    }


    let chartData = {
        labels: ["Kỳ thi 1", "Kỳ thi 2"],
    };
    console.log("đã load");
    switch (selectedStatistic) {
        case "total-participants":
            chartData.datasets = [
                {
                    label: "Tổng số lần tham gia",
                    data: [data[0].tongSoLanThamGia, data[1].tongSoLanThamGia],
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    borderColor: "rgba(255, 99, 132, 1)",
                    borderWidth: 1,
                },
            ];
            break;
        case "completion-rate":
            chartData.datasets = [
                {
                    label: "Tỷ lệ hoàn thành",
                    data: [data[0].tyLeHoanThanh, data[1].tyLeHoanThanh],
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 1,
                },
            ];
            break;
        case "average-score":
            chartData.datasets = [
                {
                    label: "Điểm trung bình",
                    data: [data[0].diemTrungBinh, data[1].diemTrungBinh],
                    backgroundColor: "rgba(255, 206, 86, 0.2)",
                    borderColor: "rgba(255, 206, 86, 1)",
                    borderWidth: 1,
                },
            ];
            break;
        case "score-distribution":
            // chartType = 'radar';
            chartData = {
                labels: [0,1,2,3,4,5,6,7,8,9,10],
            }
            chartData.datasets = [
                {
                    label: "Phân phối điểm số",
                    data: getScoreData(),
                    backgroundColor: "rgba(178, 255, 102, 0.2)",
                    borderColor: "rgba(178, 255, 102, 1)",
                    borderWidth: 1,
                },
            ];
            break;
    }
    const chart = new Chart('chartContainer', {
        type: chartType,
        data: chartData,
        options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
    });
}

// Vẽ biểu đồ
window.onload = function () {
    updateChart(); 
}

function exportToExcel() {
    let table = document.getElementById("thongke-hocsinh");
    TableToExcel.convert(table, { 
      name: `export.xlsx`, 
      sheet: {
        name: 'Sheet 1'
      }
    });
}


