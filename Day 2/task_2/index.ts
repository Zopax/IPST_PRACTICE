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
    return {
        id: data.user_id,
        name: data.full_name,
        phone: data.contact.phone,
        email: `[${data.contact.email}](mailto:${data.contact.email})`,
        location: `${data.address.city}, ${data.address.zip}`,
        status: data.is_active ? "active" : "inactive",
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