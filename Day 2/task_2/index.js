;
;
var dataFormatting = function (data) {
    return {
        id: data.user_id,
        name: data.full_name,
        phone: data.contact.phone,
        email: "[".concat(data.contact.email, "](mailto:").concat(data.contact.email, ")"),
        location: "".concat(data.address.city, ", ").concat(data.address.zip),
        status: data.is_active ? "active" : "inactive",
    };
};
var source = {
    user_id: "123",
    full_name: "John Doe",
    contact: {
        phone: "+123456789",
        email: "john.doe@example.com",
    },
    address: {
        city: "Los Angeles",
        zip: "10341",
    },
    is_active: false,
};
var target = dataFormatting(source);
console.log(target);
