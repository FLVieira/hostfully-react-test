import { Modal, notification } from "antd";
import { Dayjs } from "dayjs";
import { useBookingContext } from "../../../context/BookingContext";
import { BookingModel } from "../../../models/booking.model";
import { PropertyModel } from "../../../models/property.model";
import { formatToCurrency } from "../../../utils/formatToCurrency";

interface Props {
  isVisible: boolean;
  numberOfGuests: number;
  numberOfBookingDays: number;
  bookingPeriod: [Dayjs | null, Dayjs | null];
  propertyData: PropertyModel;
  onClose: () => void;
  resetFormFields: () => void;
}

export const ConfirmationModal = ({
  isVisible,
  numberOfBookingDays,
  bookingPeriod,
  propertyData,
  onClose,
  numberOfGuests,
  resetFormFields,
}: Props) => {
  const { addBooking, currentBooking, updateBooking, setCurrentBooking } = useBookingContext();

  const startDate = bookingPeriod[0]?.format("DD/MM/YYYY") || "";
  const endDate = bookingPeriod[1]?.format("DD/MM/YYYY") || "";
  const totalCost =
    propertyData.pricePerNight * numberOfBookingDays +
    propertyData.cleaningFee +
    propertyData.serviceFee;

  const handleConfirmBooking = () => {
    const newBooking: BookingModel = !currentBooking
      ? {
        id: Date.now().toString(),
        numberOfGuests: numberOfGuests,
        totalPrice: totalCost,
        propertyId: propertyData.id,
        roomType: propertyData.type,
        propertyLocation: propertyData.location,
        hostEmail: propertyData.hostEmail,
        status: "Pending",
        createdAt: new Date().toISOString(),
        startDate: bookingPeriod[0]?.toISOString() ?? "",
        endDate: bookingPeriod[1]?.toISOString() ?? "",
      }
      : {
        ...currentBooking,
        numberOfGuests: numberOfGuests,
        totalPrice: totalCost,
        startDate: bookingPeriod[0]?.toISOString() ?? "",
        endDate: bookingPeriod[1]?.toISOString() ?? "",
      };

    notification.success({
      message: `Your booking has been ${currentBooking ? "edited" : "confirmed"} successfully ;)`,
      duration: 3,
      placement: "top",
    });

    if (currentBooking) {
      updateBooking(currentBooking.id, newBooking);
      setCurrentBooking(null);
    } else {
      addBooking(newBooking);
    }

    resetFormFields();
    onClose();
  };

  return (
    <Modal
      open={isVisible}
      centered
      title="Confirm booking"
      onCancel={onClose}
      footer={
        <div className="flex justify-end space-x-4 border-t border-gray-200 pt-4 mt-12">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-6 rounded">
            Cancel
          </button>
          <button
            onClick={handleConfirmBooking}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded">
            Confirm
          </button>
        </div>
      }>
      <div className="space-y-4 mt-4 border-t border-gray-200 pt-4">
        <p>
          <strong>Property:</strong> {propertyData.name}
        </p>
        <p>
          <strong>Period:</strong> {startDate} - {endDate}
        </p>
        <p>
          <strong>Total Nights:</strong> {numberOfBookingDays}
        </p>
        <p>
          <strong>Price per Night:</strong> {formatToCurrency(propertyData.pricePerNight)}
        </p>
        <p>
          <strong>Cleaning Fee:</strong> {formatToCurrency(propertyData.cleaningFee)}
        </p>
        <p>
          <strong>Service Fee:</strong> {formatToCurrency(propertyData.serviceFee)}
        </p>
        <p>
          <strong>Total Cost:</strong> {formatToCurrency(totalCost)}
        </p>
      </div>
    </Modal>
  );
};
