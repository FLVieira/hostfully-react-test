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
    <div className="w-[50%]">
      <p className="mb-4">
        <span className="mr-1 text-lg font-semibold">
          {formatToCurrency(propertyData.pricePerNight)}
        </span>{" "}
        night
      </p>
      <div className="mt-4">
        <div className="mb-2">Check-in / Check-out</div>
        <DatePicker.RangePicker
          onChange={handleBookingPeriodChange}
          value={bookingPeriod}
          disabledDate={isDateDisabled}
        />
        {isErrorVisible && (
          <p className="text-red-500 text-sm mt-2">The selected dates are already booked.</p>
        )}
      </div>
      <div className="flex items-center justify-start">
        <div className="mt-4">
          <div className="mb-2">Number of guests</div>
          <Slider
            min={1}
            max={20}
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