import { PropertyModel } from "../../../../models/property.model";
import { ConfirmationModal } from "../ConfirmationModal";
import { BookingButtons } from "./BookingButtons";
import { BookingDetails } from "./BookingDetails";
import { DetailedPrices } from "./DetailedPrices";
import { useBookingManagement } from "./useBookingManagement";

interface Props {
  propertyData: PropertyModel;
}

export const BookingForm = ({ propertyData }: Props) => {
  const {
    isDateDisabled,
    numberOfBookingDays,
    handleBookingPeriodChange,
    setIsConfirmationModalVisible,
    onNumbersOfGuestsChange,
    bookingPeriod,
    isErrorVisible,
    isConfirmationModalVisible,
    numberOfGuests,
    resetFields
  } = useBookingManagement({ propertyData });

  return (
    <div className="mt-4 rounded border-gray-200 w-full border px-6 py-4">
      <div className="flex w-full md:flex-row flex-col">
        <BookingDetails
          numberOfGuests={numberOfGuests}
          bookingPeriod={bookingPeriod}
          propertyData={propertyData}
          numberOfBookingDays={numberOfBookingDays}
          isDateDisabled={isDateDisabled}
          handleBookingPeriodChange={handleBookingPeriodChange}
          onNumbersOfGuestsChange={onNumbersOfGuestsChange}
          isErrorVisible={isErrorVisible}
        />
        <DetailedPrices propertyData={propertyData} numberOfBookingDays={numberOfBookingDays} />
      </div>
      <BookingButtons numberOfBookingDays={numberOfBookingDays} setIsConfirmationModalVisible={setIsConfirmationModalVisible} />
      <ConfirmationModal
        resetFormFields={resetFields}
        isVisible={isConfirmationModalVisible}
        numberOfGuests={numberOfGuests}
        numberOfBookingDays={numberOfBookingDays}
        bookingPeriod={bookingPeriod}
        propertyData={propertyData}
        onClose={() => setIsConfirmationModalVisible(false)}
      />
    </div>
  );
};
