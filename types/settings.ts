export interface PlatformSettings {
  ID: number;
  maintenanceMode: boolean;
  siteName: string;
  commissionRate: number;
  currency: string;
  manualProductApproval: boolean;
}

export interface SellerShopSettings {
  ID: number;
  sellerId: number;
  shopName: string;
  description: string;
  logoUrl: string;
  pickupAddress: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
}
