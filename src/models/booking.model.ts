export type BookingModel = {
	id: string;
	hostEmail: string;
	propertyLocation: string;
	propertyId: string;
	numberOfGuests: number;
	roomType: string;
	status: "Pending" | "Confirmed" | "Cancelled";
	startDate: string;
	endDate: string;
	createdAt: string;
	totalPrice: number;
};

