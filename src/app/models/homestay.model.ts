export interface Homestay {
  id:number;
  address: string;
  availableRooms: number;
  businessLicense: string;
  homestayFacilities: [
    {
      id: number;
      name: string;
      quantity: number;
    }
  ];
  homestayImages: [
    {
      id: number;
      imageUrl: string;
    }
  ];
  homestayRules: [
    {
      description: string;
      id: number;
    }
  ];
  homestayServices: [
    {
      id: number;
      name: string;
      price: number;
      status: boolean;
    }
  ];
  name: string;
  numberOfRating: number;
  price: number;
  ratings: [];
  status: string;
  totalAverageRating: number;
  isPendingBooking: boolean;
}
