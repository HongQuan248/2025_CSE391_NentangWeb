const showAddTransForm = document.getElementById('showAddTransForm');
const addTransModal = document.getElementById('addTransModal');
const closeAddTransModal = document.getElementById('closeAddTransModal');
const cancelAddTransModal = document.getElementById('cancelAddTransModal');
const addTransForm = document.getElementById('addTransForm');

showAddTransForm.addEventListener('click', () => {
    addTransModal.style.display = 'flex';
});
closeAddTransModal.addEventListener('click', () => {
    addTransModal.style.display = 'none';
});
cancelAddTransModal.addEventListener('click', () => {
    addTransModal.style.display = 'none';
});

// Validate form
addTransForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Xóa thông báo lỗi cũ
    let oldError = addTransForm.querySelector('.form-error');
    if (oldError) oldError.remove();

    const customer = addTransForm.customer.value.trim();
    const employee = addTransForm.employee.value.trim();
    const amount = addTransForm.amount.value.trim();

    let error = "";
    if (!customer || !employee || !amount) {
        error = "Vui lòng nhập đầy đủ thông tin.";
    } else if (customer.length > 30) {
        error = "Tên khách hàng không được vượt quá 30 ký tự.";
    } else if (employee.length > 30) {
        error = "Tên nhân viên không được vượt quá 30 ký tự.";
    } else if (isNaN(amount) || Number(amount) <= 0) {
        error = "Số tiền phải là số lớn hơn 0.";
    }

    if (error) {
        const errDiv = document.createElement('div');
        errDiv.className = 'form-error';
        errDiv.style.color = 'red';
        errDiv.style.margin = '0 24px 10px 24px';
        errDiv.textContent = error;
        addTransForm.insertBefore(errDiv, addTransForm.firstChild);
        return;
    }

    // Nếu hợp lệ, xử lý thêm dữ liệu (ví dụ: alert thành công)
    alert('Thêm giao dịch thành công!');
    addTransModal.style.display = 'none';
    addTransForm.reset();
});