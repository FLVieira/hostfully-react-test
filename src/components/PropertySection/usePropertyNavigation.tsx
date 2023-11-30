import { useEffect, useState } from "react";
import { useBookingContext } from "../../context/BookingContext";
import { fakePropertiesData } from "../../mock/fakeProperties";

export const usePropertyNavigation = () => {
  const { currentBooking, setCurrentBooking } = useBookingContext();

  const [currentPropertyIndex, setCurrentPropertyIndex] = useState(0);

  const handlePreviousClick = () => {
    const newIndex = currentPropertyIndex - 1 < 0 ? fakePropertiesData.length - 1 : currentPropertyIndex - 1;
    setCurrentPropertyIndex(newIndex);
    setCurrentBooking(null);
  };

  const handleNextClick = () => {
    const newIndex = (currentPropertyIndex + 1) % fakePropertiesData.length;
    setCurrentPropertyIndex(newIndex);
    setCurrentBooking(null);
  };

  useEffect(() => {
    if (currentBooking) {
      const currentBookingPropertyIndex = fakePropertiesData.findIndex(property => currentBooking.propertyId === property.id);
      if (currentBookingPropertyIndex !== -1) {
        setCurrentPropertyIndex(currentBookingPropertyIndex);
      }
    } else {
      setCurrentPropertyIndex(0);
    }
  }, [currentBooking]);

  return {
    handlePreviousClick,
    handleNextClick,
    currentPropertyIndex,
  };
};