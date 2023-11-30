import { Tooltip } from "antd";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { PropertyModel } from "../../../models/property.model";

interface Props {
  propertyData: PropertyModel;
  handlePreviousClick: () => void;
  handleNextClick: () => void;
  isPropertyNavigationDisabled: boolean;
}

export const HeaderComponent = ({
  propertyData,
  handlePreviousClick,
  handleNextClick,
  isPropertyNavigationDisabled,
}: Props) => {
  return (
    <div className="flex justify-between items-center w-full mb-4 px-4">
      <h3 className="text-xl md:text-3xl">{propertyData.name}</h3>
      <div className="flex items-center">
        <Tooltip title="Go back">
          <button
            onClick={handlePreviousClick}
            disabled={isPropertyNavigationDisabled}
            className={`p-2 ${isPropertyNavigationDisabled ? "cursor-not-allowed" : "pointer"}`}>
            <FaChevronLeft className="h-6 w-6" />
          </button>
        </Tooltip>
        <Tooltip title="See next property">
          <button
            onClick={handleNextClick}
            disabled={isPropertyNavigationDisabled}
            className={`p-2 ${isPropertyNavigationDisabled ? "cursor-not-allowed" : "pointer"}`}>
            <FaChevronRight className="h-6 w-6" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};
