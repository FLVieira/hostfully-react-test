import { RangePickerProps } from "antd/es/date-picker";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { useBookingContext } from "../../../../context/BookingContext";
import { PropertyModel } from "../../../../models/property.model";

interface Params {
  propertyData: PropertyModel;
}

export const useBookingManagement = ({ propertyData }: Params) => {
  const { currentBooking, bookings, isPeriodAvailableForBooking } =
    useBookingContext();

  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [bookingPeriod, setBookingPeriod] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  const isDateWithinRange = (dateToCheck: Dayjs, startDate: Dayjs, endDate: Dayjs) => {
    return (
      dateToCheck.isAfter(startDate.startOf("day")) && dateToCheck.isBefore(endDate.endOf("day"))
    );
  };

  const isDateDisabled = (currentDate: Dayjs) => {
    if (currentDate.isBefore(dayjs(), "day")) {
      return true;
    }

    return bookings.some((booking) => {
      if (currentBooking && booking.id === currentBooking.id) {
        return false;
      }

      const start = dayjs(booking.startDate);
      const end = dayjs(booking.endDate);
      return booking.propertyId === propertyData.id && isDateWithinRange(currentDate, start, end);
    });
  };

  const handleBookingPeriodChange: RangePickerProps["onChange"] = async (values) => {
    if (values === null || values[0] === null || values[1] === null) {
      setBookingPeriod([null, null]);
      setIsErrorVisible(false);
      return;
    }

    const [startDate, endDate] = values;

    if (!isPeriodAvailableForBooking(propertyData.id, startDate, endDate)) {
      setBookingPeriod([null, null]);
      setIsErrorVisible(true);
      return;
    }

    setBookingPeriod(values);
    setIsErrorVisible(false);
  };

  const numberOfBookingDays = useMemo(() => {
    const [startDate, endDate] = bookingPeriod;
    if (!startDate || !endDate) {
      return 0;
    }
    return endDate.diff(startDate, "day");
  }, [bookingPeriod]);

  const onNumbersOfGuestsChange = (value: number) => {
    if (isNaN(value)) {
      return;
    }
    setNumberOfGuests(value);
  };

  const resetFields = () => {
    setBookingPeriod([null, null]);
    setNumberOfGuests(1);
  };

  useEffect(() => {
    resetFields();
  }, [propertyData]);

  useEffect(() => {
    if (currentBooking && propertyData.id === currentBooking.propertyId) {
      setNumberOfGuests(currentBooking.numberOfGuests);
      setBookingPeriod([dayjs(currentBooking.startDate), dayjs(currentBooking.endDate)]);
    } else {
      resetFields();
    }
  }, [currentBooking, propertyData]);

  return {
    isDateDisabled,
    numberOfBookingDays,
    setIsConfirmationModalVisible,
    handleBookingPeriodChange,
    onNumbersOfGuestsChange,
    bookingPeriod,
    isErrorVisible,
    numberOfGuests,
    isConfirmationModalVisible,
    resetFields,
  };
};