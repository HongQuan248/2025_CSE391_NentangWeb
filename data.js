const employeeData = [
    {
        id: 1,
        name: "Khánh",
        surname: "Nguyễn Nhật",
        address: "12 Trần Phú, Ba Đình, Hà Nội",
        status: "✓"
    },
    {
        id: 2,
        name: "An",
        surname: "Đặng Thị",
        address: "86 Võ Văn Kiệt, Quận 1, TP.HCM",
        status: "✗"
    },
    {
        id: 3,
        name: "Minh",
        surname: "Phan Quốc",
        address: "11 Lê Lợi, Hải Châu, Đà Nẵng",
        status: "✓"
    },
    {
        id: 4,
        name: "Lan",
        surname: "Lý Kim",
        address: "7 Nguyễn Thái Học, Hội An, Quảng Nam",
        status: "✓"
    },
    {
        id: 5,
        name: "Phong",
        surname: "Trịnh Văn",
        address: "91 Phạm Hùng, Nam Từ Liêm, Hà Nội",
        status: "✗"
    }
];

if (typeof module !== 'undefined' && module.exports) {
    module.exports = employeeData;
}
