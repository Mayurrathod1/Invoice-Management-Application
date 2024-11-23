export interface Invoice {
  id: string;
  serialNumber: string;
  totalAmount: number;
  date: Date;
  createdAt: Date;
  ExtractedFrom: string;
}

export interface Product {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  tax: number;
  priceWithTax: number;
  invoice_id: string;
}

export interface Customer {
  id: string;
  name: string;
  phoneNumber: string;
  totalPurchaseAmount: number;
  invoice_id: string;
}
