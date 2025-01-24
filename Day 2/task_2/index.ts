interface SourceData {
    user_id: string,
    full_name: string,
    contact: {
        phone: string,
        email: string,
    },
    address: {
        city: string,
        zip: string,
    },
    is_active: boolean,
};

interface TargetData {
    id: string,
    name: string,
    phone: string,
    email: string,
    location: string,
    status: string,
};

const dataFormatting = (data: SourceData): TargetData => {

    const { user_id, full_name, contact, address, is_active } = data;

    return {
        id: user_id,
        name: full_name,
        phone: contact.phone,
        email: `[${contact.email}](mailto:${contact.email})`,
        location: `${address.city}, ${address.zip}`,
        status: is_active ? "active" : "inactive",
    };
};

const source: SourceData = {
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

const target: TargetData = dataFormatting(source);
console.log(target);