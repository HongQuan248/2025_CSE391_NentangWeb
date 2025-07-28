document.addEventListener("DOMContentLoaded", function () {
    let stt = 3; // đã có 3 sinh viên sẵn
    let selectedRow = null;

    const btnThem = document.getElementById("btnThem");
    const form = document.querySelector("form");
    const tbody = document.querySelector("#bangSinhVien tbody");
    const thongBao = document.getElementById("thongBao");

    function showMessage(msg, color = "green") {
        thongBao.innerText = msg;
        thongBao.style.color = color;
        setTimeout(() => thongBao.innerText = "", 3000);
    }

    function validateInput() {
        const hoTen = document.getElementById("hoTen").value.trim();
        const email = document.getElementById("email").value.trim();

        if (hoTen === "") {
            alert("Tên không được để trống!");
            return false;
        }

        const regexEmail = /^\S+@\S+\.\S+$/;
        if (!regexEmail.test(email)) {
            alert("Email không hợp lệ!");
            return false;
        }

        return true;
    }

    function formatDate(dateStr) {
        const parts = dateStr.split("-");
        if (parts.length !== 3) return dateStr;
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }

    function capNhatSTT() {
        const rows = tbody.querySelectorAll("tr");
        rows.forEach((row, index) => {
            row.cells[0].innerText = index + 1;
        });
        stt = rows.length;
    }

    function suaDong(btn) {
        selectedRow = btn.parentElement.parentElement;

        document.getElementById("maSV").value = selectedRow.cells[1].innerText;
        document.getElementById("hoTen").value = selectedRow.cells[2].innerText;
        document.getElementById("email").value = selectedRow.cells[3].innerText;

        const gioiTinh = selectedRow.cells[4].innerText;
        const ngaySinh = selectedRow.cells[5].innerText;
        const parts = ngaySinh.split("-");
        document.getElementById("ngaySinh").value = `${parts[2]}-${parts[1]}-${parts[0]}`;

        document.querySelector(`input[name="gioitinh"][value="${gioiTinh}"]`).checked = true;

        btnThem.innerText = "Cập nhật";
    }

    function capNhatSinhVien() {
    if (!validateInput()) return; // ✅ Kiểm tra trước khi làm gì

    const maSV = document.getElementById("maSV").value.trim();
    const hoTen = document.getElementById("hoTen").value.trim();
    const email = document.getElementById("email").value.trim();
    const ngaySinh = document.getElementById("ngaySinh").value;
    const gioiTinh = document.querySelector('input[name="gioitinh"]:checked').value;
    const ngaySinhFormatted = formatDate(ngaySinh);

    if (selectedRow) {
        // ✅ Cập nhật dòng đang sửa
        selectedRow.cells[1].innerText = maSV;
        selectedRow.cells[2].innerText = hoTen;
        selectedRow.cells[3].innerText = email;
        selectedRow.cells[4].innerText = gioiTinh;
        selectedRow.cells[5].innerText = ngaySinhFormatted;

        showMessage("✅ Cập nhật thành công!", "blue");

        selectedRow = null;
        btnThem.innerText = "Thêm";
        form.reset();
    } else {
        // ✅ Thêm mới nếu hợp lệ
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

        showMessage("✅ Thêm sinh viên thành công!");
        form.reset();
    }
}


    btnThem.addEventListener("click", function (e) {
        e.preventDefault();
        capNhatSinhVien();
    });

    tbody.addEventListener("click", function (e) {
        const target = e.target;

        if (target.classList.contains("btnXoa")) {
            e.preventDefault();
            if (confirm("Bạn có chắc chắn muốn xoá?")) {
                target.closest("tr").remove();
                capNhatSTT();
                showMessage("🗑️ Xoá thành công!", "orange");

                if (selectedRow === target.closest("tr")) {
                    selectedRow = null;
                    btnThem.innerText = "Thêm";
                    form.reset();
                }
            }
        }

        if (target.classList.contains("btnSua")) {
            e.preventDefault();
            suaDong(target);
        }
    });
});
