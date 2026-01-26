export interface SaveCardRequest {
    payment_method_id: string;
    brand: string;
    last_four: string;
    expiry_month: number;
    expiry_year: number;
    is_default: boolean;
}