
export interface Login {
    username: string;
    password: string;
}

export interface Party {
    id?: string,
    name?: string,
    company_name: string,
    mobile_no: string,
    telephone_no?: string,
    whatsapp_no?: string,
    email?: string,
    remark: string,
    login_access: Boolean,
    date_of_birth?: string,
    anniversary_date?: string,
    gstin?: string,
    pan_no?: string,
    apply_tds: Boolean,
    credit_limit?: Number,
    address?: Address,
    bank?: Bank,
    image: any
}

export interface Address {
    address_line_1?: string,
    address_line_2?: string,
    country?: string,
    state?: string,
    city?: string,
    pincode?: string 
}

export interface Bank {
    bank_ifsc_code?: string,
    bank_name?: string,
    branch_name?: string,
    account_no?: string,
    account_holder_name?: string,
}