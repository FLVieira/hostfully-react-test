import { Badge, Modal } from "antd";
import { useState } from "react";
import { useBookingContext } from "../../context/BookingContext";

import { type BookingModel } from "../../models/booking.model";
import { BookingsDrawer } from "./BookingsDrawer";

export const Header = () => {
  const { bookings, deleteBooking, setCurrentBooking } = useBookingContext();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const handleClose = () => {
    setIsDrawerVisible(false);
  };

  const showDeleteConfirm = (bookingId: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this booking?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      centered: true,
      onOk() {
        if (bookings.length === 1) {
          setIsDrawerVisible(false);
        }

        deleteBooking(bookingId);
      },
    });
  };

  const handleEditBooking = (booking: BookingModel) => {
    setCurrentBooking(booking);
    setIsDrawerVisible(false);
  };

  return (
    <div className="w-full border-b border-gray-200">
      <div className="mx-auto max-w-[1280px] flex justify-between items-center py-4 px-4">
        <h1 className="text-3xl font-bold">Hostfully</h1>
        <Badge count={bookings.length}>
          <button
            onClick={showDrawer}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Show Bookings
          </button>
        </Badge>
      </div>

      <BookingsDrawer
        isDrawerVisible={isDrawerVisible}
        onEditBooking={handleEditBooking}
        showDeleteConfirm={showDeleteConfirm}
        onClose={handleClose}
      />
    </div>
  );
};
