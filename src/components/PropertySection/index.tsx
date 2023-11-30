import { useBookingContext } from "../../context/BookingContext";
import { fakePropertiesData } from "../../mock/fakeProperties";
import { BookingForm } from "./components/BookingForm";
import { HeaderComponent } from "./components/Header";
import { PropertyDetails } from "./components/PropertyDetails";
import { usePropertyNavigation } from "./usePropertyNavigation";

export const PropertySection = () => {
  const { currentBooking } = useBookingContext();
  const { handleNextClick, handlePreviousClick, currentPropertyIndex } = usePropertyNavigation();

  const propertyData = fakePropertiesData[currentPropertyIndex];

  return (
    <div className="mx-auto max-w-[1280px] px-2 lg:px-6 xl:px-0 flex flex-col items-center py-6">
      <HeaderComponent propertyData={propertyData} handleNextClick={handleNextClick} handlePreviousClick={handlePreviousClick} isPropertyNavigationDisabled={!!currentBooking} />
      <div className="flex flex-wrap justify-between w-full">
        <img
          src={propertyData.image}
          alt="Property Image"
          className="w-full lg:w-[50%] max-h-[500px] object-cover rounded"
        />
        <div className="w-full lg:max-w-[50%] lg:pl-6 pt-4 lg:pt-2 px-2 lg:px-0">
          <PropertyDetails propertyData={propertyData} />
          <BookingForm propertyData={propertyData} />
        </div>
      </div>
    </div>
  );
};
