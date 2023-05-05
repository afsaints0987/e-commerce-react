export interface Items {
  map(arg0: (item: any) => JSX.Element): import("react").ReactNode;
  id: string;
  productName: string,
  description: string;
  unitPrice: number;
  category: string;
  imageUrl: string;
}
