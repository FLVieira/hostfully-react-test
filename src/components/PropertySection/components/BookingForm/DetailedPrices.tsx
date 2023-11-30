import { PropertyModel } from "../../../../models/property.model";
import { formatToCurrency } from "../../../../utils/formatToCurrency";

interface Props {
  numberOfBookingDays: number;
  propertyData: PropertyModel;
}

export const DetailedPrices = (props: Props) => {
  const { numberOfBookingDays, propertyData } = props;

  return (
    <div className="w-[50%] lg-ml-8 mt-6 md:mt-0 sm-w-full">
      <div className="mb-2 flex justify-between w-full">
        <p className="text-md mr-2 underline max-w-[75%]">
          {formatToCurrency(propertyData.pricePerNight)} x {numberOfBookingDays} nights
        </p>
        <p className="text-md font-bold">
          {numberOfBookingDays
            ? formatToCurrency(propertyData.pricePerNight * numberOfBookingDays)
            : "-"}
        </p>
      </div>

      <div className="mb-2 flex justify-between items-baseline w-full">
        <p className="text-md mr-2 underline max-w-[75%]">Cleaning fee</p>
        <p className="text-md font-bold">{formatToCurrency(propertyData.cleaningFee)}</p>
      </div>

      <div className="mb-2 flex justify-between w-full">
        <p className="text-md mr-2 underline max-w-[75%]">Service fee</p>
        <p className="text-md font-bold">{formatToCurrency(propertyData.serviceFee)}</p>
      </div>

      <div className="mt-4">
        <p className="text-md underline">Total</p>
        <p className="text-xl font-bold mt-2">
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