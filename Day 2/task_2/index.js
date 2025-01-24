;
;
var dataFormatting = function (data) {
    var user_id = data.user_id, full_name = data.full_name, contact = data.contact, address = data.address, is_active = data.is_active;
    return {
        id: user_id,
        name: full_name,
        phone: contact.phone,
        email: "[".concat(contact.email, "](mailto:").concat(contact.email, ")"),
        location: "".concat(address.city, ", ").concat(address.zip),
        status: is_active ? "active" : "inactive",
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
