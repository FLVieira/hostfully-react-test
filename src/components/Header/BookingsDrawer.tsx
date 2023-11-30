import { Button, Drawer, List, Tooltip } from "antd";
import dayjs from "dayjs";
import { IoCloseOutline } from "react-icons/io5";

import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useBookingContext } from "../../context/BookingContext";
import { BookingModel } from "../../models/booking.model";

interface Props {
  onClose: () => void;
  onEditBooking: (booking: BookingModel) => void;
  showDeleteConfirm: (bookingId: string) => void;
  isDrawerVisible: boolean;
}

export const BookingsDrawer = ({ onClose, isDrawerVisible, onEditBooking, showDeleteConfirm }: Props) => {
  const { bookings } = useBookingContext();

  return (
    <Drawer
      title="Your Bookings"
      placement="right"
      closable={false}
      onClose={onClose}
      extra={
        <Button type="text" onClick={onClose}>
          <IoCloseOutline size={24} />
        </Button>
      }
      open={isDrawerVisible}
      width={350}>
      <List
        itemLayout="horizontal"
        dataSource={bookings}
        locale={{ emptyText: "You haven't created any bookings" }}
        renderItem={booking => (
          <List.Item>
            <List.Item.Meta
              title={`Booking: ${booking.id} (${booking.status})`}
              description={
                <>
                  <div>
                    Dates: {dayjs(booking.startDate).format("MM/DD/YYYY")} -{" "}
                    {dayjs(booking.endDate).format("MM/DD/YYYY")}
                  </div>
                  <div>Location: {booking.roomType}</div>
                </>
              }
            />
            <Tooltip title="Edit">
              <Button
                key="edit"
                type="link"
                icon={<FaEdit />}
                onClick={() => {
                  onEditBooking(booking);
                }}
              />
            </Tooltip>
            <Tooltip title="Delete">
              <Button
                key="delete"
                type="link"
                danger
                icon={<FaTrashAlt />}
                onClick={() => {
                  showDeleteConfirm(booking.id);
                }}
              />
            </Tooltip>
          </List.Item>
        )}
      />
    </Drawer>
  );
};