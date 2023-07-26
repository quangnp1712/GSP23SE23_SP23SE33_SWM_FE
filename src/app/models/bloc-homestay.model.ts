export interface BlocHomestay {
  id:number;
  name: string;
  address: string;
  businessLicense: string;
  status: string;
  totalAverageRating: number;
  homestayServices: [
    { id: number; name: string; price: number; status: string }
  ];
  homestays: [
    {
      id: number;
      name: string;
      price: number;
      totalAverageRating: number;
      availableRooms: number;
      roomCapacity: number;
      blocResponse: any;
      homestayImages: [{ id: number; imageUrl: string }];
      homestayFacilities: [{ id: number; name: string; quantity: number }];
      ratings: [];
    }
  ];
  homestayRules: [{ id: number; description: string }];
  ratings: [];
  isPendingBooking:boolean;
}
