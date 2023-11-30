import { Header } from "../../components/Header";
import { PropertySection } from "../../components/PropertySection";
import { BookingProvider } from "../../context/BookingContext";

export const BookingsPage = () => {
  return (
    <BookingProvider>
      <Header />
      <PropertySection />
    </BookingProvider>
  );
};
