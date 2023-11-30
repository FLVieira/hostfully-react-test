import dayjs, { Dayjs } from "dayjs";
import { createContext, useContext, useEffect, useState } from "react";
import { BookingModel } from "../models/booking.model";

type Props = {
  children: JSX.Element | JSX.Element[];
};

export type BookingContextProps = {
  bookings: BookingModel[];
  currentBooking: BookingModel | null;
  addBooking: (booking: BookingModel) => void;
  getBooking: (bookingId: string) => BookingModel | undefined;
  updateBooking: (bookingId: string, updatedBooking: BookingModel) => void;
  deleteBooking: (bookingId: string) => void;
  isPeriodAvailableForBooking: (propertyId: string, startDate: Dayjs, endDate: Dayjs) => boolean;
  setCurrentBooking: (booking: BookingModel | null) => void;
};

const BookingContext = createContext<BookingContextProps>({} as BookingContextProps);

export const BookingProvider = ({ children }: Props) => {
  const [bookings, setBookings] = useState<BookingModel[]>();
  const [currentBooking, setCurrentBooking] = useState<BookingModel | null>(null);

  useEffect(() => {
    const storedBookings = localStorage.getItem("bookings");
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    } else {
      setBookings([]);
    }
  }, []);

  useEffect(() => {
    if (bookings) {
      localStorage.setItem("bookings", JSON.stringify(bookings));
    }
  }, [bookings]);

  const addBooking = (booking: BookingModel) => {
    setBookings(prev => [...prev ?? [], booking]);
  };

  const getBooking = (bookingId: string) => {
    return bookings?.find(booking => booking.id === bookingId);
  };

  const updateBooking = (bookingId: string, updatedBooking: BookingModel) => {
    setBookings(prev => prev ? prev.map(booking => booking.id === bookingId ? updatedBooking : booking) : []);
  };

  const deleteBooking = (bookingId: string) => {
    setBookings(prev => prev ? prev.filter(booking => booking.id !== bookingId) : []);
  };

  const isPeriodAvailableForBooking = (propertyId: string, startDate: Dayjs, endDate: Dayjs) => {
    if (!bookings || bookings.length === 0) {
      return true;
    }

    return !bookings.some(booking => {
      if (currentBooking && currentBooking.id === booking.id && booking.propertyId === propertyId) {
        return false;
      }

      const bookingStart = dayjs(booking.startDate);
      const bookingEnd = dayjs(booking.endDate);
      return (propertyId === booking.propertyId) &&
        startDate.isBefore(bookingEnd, "day") &&
        endDate.isAfter(bookingStart, "day");
    });
  };

  return (
    <BookingContext.Provider value={{ bookings: bookings ?? [], currentBooking, addBooking, getBooking, updateBooking, deleteBooking, isPeriodAvailableForBooking, setCurrentBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingContext = () => {
  return useContext(BookingContext);
};