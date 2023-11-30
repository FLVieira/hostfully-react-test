import { PropertyModel } from "../../../models/property.model";

interface Props {
  propertyData: PropertyModel;
}

export const PropertyDetails = ({ propertyData }: Props) => {
  return (
    <>
      <p className="text-xl">{propertyData.type} at {propertyData.location}</p>
      <ul className="flex flex-row flex-wrap content-end justify-start items-center list-none p-0">
        <li className="text-md text-gray-600 px-1.5 mr-2 rounded font-light mt-2">More than {propertyData.maxGuests} guests</li>
        <li className="text-md text-gray-600 px-1.5 mr-2 rounded font-light mt-2">. {propertyData.bedrooms} bedrooms</li>
        <li className="text-md text-gray-600 px-1.5 mr-2 rounded font-light mt-2">. {propertyData.beds} beds</li>
        <li className="text-md text-gray-600 px-1.5 mr-2 rounded font-light mt-2">. {propertyData.bathrooms}</li>
      </ul>
      <p className="mt-4">{propertyData.description}</p>
    </>
  );
};