/**
 * ทดสอบ PassengerCard component
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PassengerCard from "@/components/PassengerCard";
import { Passenger } from "@/types/booking";

const mockPax: Passenger = {
  id: "PAX1",
  firstName: "Somchai",
  lastName: "Jaidee",
  passport: "AA123456",
  seat: "12A",
  selected: false,
};

describe("PassengerCard", () => {
  it("แสดงชื่อผู้โดยสารถูกต้อง", () => {
    render(<PassengerCard pax={mockPax} isSelected={false} onClick={() => {}} />);
    expect(screen.getByText("Somchai Jaidee")).toBeInTheDocument();
  });

  it("แสดง Passport และ Seat ถูกต้อง", () => {
    render(<PassengerCard pax={mockPax} isSelected={false} onClick={() => {}} />);
    expect(screen.getByText(/AA123456/)).toBeInTheDocument();
    expect(screen.getByText(/12A/)).toBeInTheDocument();
  });

  it("เมื่อ isSelected=true — แสดง badge 'Selected'", () => {
    render(<PassengerCard pax={mockPax} isSelected={true} onClick={() => {}} />);
    expect(screen.getByText("Selected")).toBeInTheDocument();
  });

  it("เมื่อ isSelected=false — ไม่มี badge 'Selected'", () => {
    render(<PassengerCard pax={mockPax} isSelected={false} onClick={() => {}} />);
    expect(screen.queryByText("Selected")).not.toBeInTheDocument();
  });

  it("เมื่อคลิก — เรียก onClick callback", () => {
    const handleClick = jest.fn();
    render(<PassengerCard pax={mockPax} isSelected={false} onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("แสดง avatar initials ถูกต้อง (S + J)", () => {
    render(<PassengerCard pax={mockPax} isSelected={false} onClick={() => {}} />);
    expect(screen.getByText("SJ")).toBeInTheDocument();
  });
});
