import { PropertyModel } from "../../../../models/property.model";
import { formatToCurrency } from "../../../../utils/formatToCurrency";

interface Props {
  numberOfBookingDays: number;
  propertyData: PropertyModel;
}

export const DetailedPrices = (props: Props) => {
  const { numberOfBookingDays, propertyData } = props;

  return (
    <div className="w-[50%] ml-8">
      <div className="mb-2 flex justify-between w-full">
        <p className="text-sm underline max-w-[75%]">
          {formatToCurrency(propertyData.pricePerNight)} x {numberOfBookingDays} nights
        </p>
        <p className="text-sm font-bold mt-2">
          {numberOfBookingDays
            ? formatToCurrency(propertyData.pricePerNight * numberOfBookingDays)
            : "-"}
        </p>
      </div>

      <div className="mb-2 flex justify-between w-full">
        <p className="text-sm underline max-w-[75%]">Cleaning fee</p>
        <p className="text-sm font-bold mt-2">{formatToCurrency(propertyData.cleaningFee)}</p>
      </div>

      <div className="mb-2 flex justify-between w-full">
        <p className="text-sm underline max-w-[75%]">Service fee</p>
        <p className="text-sm font-bold mt-2">{formatToCurrency(propertyData.serviceFee)}</p>
      </div>

      <div className="mt-4">
        <p className="text-sm underline">Total</p>
        <p className="text-md font-bold mt-2">
          {numberOfBookingDays
            ? formatToCurrency(
              propertyData.pricePerNight * numberOfBookingDays +
              propertyData.cleaningFee +
              propertyData.serviceFee
            )
            : "-"}
        </p>
      </div>
    </div>
  );
};