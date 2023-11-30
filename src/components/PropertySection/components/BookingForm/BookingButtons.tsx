import { Tooltip } from "antd";
import { MdOutlineEditOff } from "react-icons/md";
import { useBookingContext } from "../../../../context/BookingContext";

interface Props {
  numberOfBookingDays: number;
  setIsConfirmationModalVisible: (val: boolean) => void;
}

export const BookingButtons = (props: Props) => {
  const { setCurrentBooking, currentBooking } = useBookingContext();
  const { numberOfBookingDays, setIsConfirmationModalVisible } = props;

  return (
    <div className="flex mt-5 w-full">
      <button
        className={`bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 rounded ${numberOfBookingDays === 0 ? "cursor-not-allowed" : "pointer"}`}
        disabled={numberOfBookingDays === 0}
        onClick={() => setIsConfirmationModalVisible(true)}
      >
        {currentBooking ? "Edit" : "Continue"}
      </button>
      {currentBooking ? (
        <Tooltip title="Cancel edition">
          <button
            className={"bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 rounded px-4 ml-2 "}
            onClick={() => setCurrentBooking(null)}
          >
            <MdOutlineEditOff size={24} />
          </button>
        </Tooltip>
      ) : (
        <></>
      )}
    </div>
  );
};