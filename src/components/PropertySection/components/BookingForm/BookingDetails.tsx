import { DatePicker, InputNumber, Slider } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import { Dayjs } from "dayjs";
import { PropertyModel } from "../../../../models/property.model";
import { formatToCurrency } from "../../../../utils/formatToCurrency";

interface Props {
  propertyData: PropertyModel;
  numberOfBookingDays: number;
  numberOfGuests: number;
  handleBookingPeriodChange: RangePickerProps["onChange"];
  isErrorVisible: boolean;
  bookingPeriod: [Dayjs | null, Dayjs | null];
  onNumbersOfGuestsChange: (val: number) => void;
  isDateDisabled: (currentDate: Dayjs) => boolean;
}

export const BookingDetails = (props: Props) => {
  const {
    propertyData,
    handleBookingPeriodChange,
    bookingPeriod,
    isDateDisabled,
    isErrorVisible,
    numberOfGuests,
    onNumbersOfGuestsChange
  } = props;

  return (
    <div className="md-[50%] w-[100%]">
      <p className="mb-4">
        <span className="mr-1 text-lg lg:text-xl font-semibold">
          {formatToCurrency(propertyData.pricePerNight)}
        </span>{" "}
        night
      </p>
      <div className="mt-4">
        <div className="mb-2 text-lg lg:text-lg">Check-in / Check-out</div>
        <DatePicker.RangePicker
          onChange={handleBookingPeriodChange}
          value={bookingPeriod}
          className="w-[100%] md:w-[90%] lg:w-[80%] text-base"
          disabledDate={isDateDisabled}
          inputReadOnly
          size="large"
        />
        {isErrorVisible && (
          <p className="text-red-500 text-sm mt-2">The selected dates are already booked.</p>
        )}
      </div>
      <div className="flex items-center justify-start w-full">
        <div className="mt-4">
          <div className="mb-2 select-none text-lg lg:text-lg">Number of guests</div>
          <Slider
            min={1}
            max={20}
            className="w-[70%] mt-8 md:mt-2"
            onChange={onNumbersOfGuestsChange}
            value={typeof numberOfGuests === "number" ? numberOfGuests : 0}
          />
        </div>
        <InputNumber
          min={1}
          max={20}
          className="h-[30px] w-[55px] ml-4"
          value={numberOfGuests}
          readOnly
        />
      </div>
    </div>
  );
};