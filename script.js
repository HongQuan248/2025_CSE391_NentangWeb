document.addEventListener("DOMContentLoaded", function () {
    let stt = 3; // đã có 3 sinh viên sẵn
    let editRow = null;

    const btnThem = document.getElementById("btnThem");
    const form = document.querySelector("form");
    const tbody = document.querySelector("#bangSinhVien tbody");
    const thongBao = document.getElementById("thongBao");

    btnThem.addEventListener("click", function (e) {
        e.preventDefault();

        const maSV = document.getElementById("maSV").value.trim();
        const hoTen = document.getElementById("hoTen").value.trim();
        const email = document.getElementById("email").value.trim();
        const ngaySinh = document.getElementById("ngaySinh").value;
        const gioiTinhEl = document.querySelector('input[name="gioitinh"]:checked');
        const ghiChu = document.getElementById("ghiChu").value.trim();

        if (!maSV || !hoTen || !email || !ngaySinh || !gioiTinhEl) {
            thongBao.innerText = "❌ Vui lòng nhập đầy đủ thông tin!";
            thongBao.style.color = "red";
            return;
        }

        const gioiTinh = gioiTinhEl.value;
        const ngaySinhFormatted = formatDate(ngaySinh);

        if (editRow) {
            editRow.cells[1].innerText = maSV;
            editRow.cells[2].innerText = hoTen;
            editRow.cells[3].innerText = email;
            editRow.cells[4].innerText = gioiTinh;
            editRow.cells[5].innerText = ngaySinhFormatted;

            thongBao.innerText = "✅ Cập nhật sinh viên thành công!";
            thongBao.style.color = "blue";
            editRow = null;
        } else {
            stt++;
            const newRow = tbody.insertRow();

            newRow.insertCell().innerText = stt;
            newRow.insertCell().innerText = maSV;
            newRow.insertCell().innerText = hoTen;
            newRow.insertCell().innerText = email;
            newRow.insertCell().innerText = gioiTinh;
            newRow.insertCell().innerText = ngaySinhFormatted;
            newRow.insertCell().innerHTML = `
                <a href="#" class="btnSua">Sửa</a> 
                <a href="#" class="btnXoa">Xoá</a>
            `;

            thongBao.innerText = "✅ Thêm sinh viên thành công!";
            thongBao.style.color = "green";
        }

        form.reset();
    });

    // Delegation xử lý sự kiện Sửa và Xoá
    tbody.addEventListener("click", function (e) {
        if (e.target.classList.contains("btnXoa")) {
            e.preventDefault();
            if (confirm("Bạn có chắc chắn muốn xoá?")) {
                const row = e.target.closest("tr");
                row.remove();
                thongBao.innerText = "🗑️ Đã xoá sinh viên.";
                thongBao.style.color = "orange";
                capNhatSTT();
            }
        }

        if (e.target.classList.contains("btnSua")) {
            e.preventDefault();
            editRow = e.target.closest("tr");

            document.getElementById("maSV").value = editRow.cells[1].innerText;
            document.getElementById("hoTen").value = editRow.cells[2].innerText;
            document.getElementById("email").value = editRow.cells[3].innerText;
            const gioiTinh = editRow.cells[4].innerText;
            document.querySelector(`input[name="gioitinh"][value="${gioiTinh}"]`).checked = true;

            const ngaySinhParts = editRow.cells[5].innerText.split("-");
            document.getElementById("ngaySinh").value = `${ngaySinhParts[2]}-${ngaySinhParts[1]}-${ngaySinhParts[0]}`;
        }
    });

    function formatDate(dateStr) {
        const parts = dateStr.split("-");
        return `${parts[2]}-${parts[1]}-${parts[0]}`; // YYYY-MM-DD => DD-MM-YYYY
    }

    function capNhatSTT() {
        const rows = tbody.querySelectorAll("tr");
        stt = 3;
        rows.forEach((row, index) => {
            row.cells[0].innerText = index + 1;
        });
        stt = rows.length;
    }
});
