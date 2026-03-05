import { NextRequest, NextResponse } from "next/server";
import { Passenger } from "@/types/booking";

// Mock Database
const MOCK_BOOKINGS: Record<string, { lastName: string; passengers: Passenger[] }> = {
  ABC123: {
    lastName: "Jaidee",
    passengers: [
      { id: "PAX1", firstName: "Somchai", lastName: "Jaidee", passport: "AA123456", seat: "12A", selected: false },
      { id: "PAX2", firstName: "Malee", lastName: "Jaidee", passport: "BB654321", seat: "12B", selected: false },
    ],
  },
  XYZ789: {
    lastName: "Srisuwan",
    passengers: [
      { id: "PAX3", firstName: "Korn", lastName: "Srisuwan", passport: "CC111222", seat: "14C", selected: false },
      { id: "PAX4", firstName: "Nong", lastName: "Srisuwan", passport: "DD333444", seat: "14D", selected: false },
      { id: "PAX5", firstName: "Ploy", lastName: "Srisuwan", passport: "EE555666", seat: "14E", selected: false },
    ],
  },
};

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { lastName, bookingRef } = body;

  if (!lastName || !bookingRef) {
    return NextResponse.json({ error: "กรุณากรอกข้อมูลให้ครบ" }, { status: 400 });
  }

  // Simulate network delay
  await new Promise((r) => setTimeout(r, 800));

  const booking = MOCK_BOOKINGS[bookingRef.toUpperCase()];

  if (!booking) {
    return NextResponse.json({ error: "ไม่พบหมายเลขการจอง" }, { status: 404 });
  }

  if (booking.lastName.toLowerCase() !== lastName.toLowerCase()) {
    return NextResponse.json({ error: "นามสกุลไม่ตรงกับการจอง" }, { status: 401 });
  }

  return NextResponse.json({
    bookingRef: bookingRef.toUpperCase(),
    lastName: booking.lastName,
    passengers: booking.passengers,
    flight: {
      from: "BKK",
      fromName: "Bangkok Suvarnabhumi",
      to: "NRT",
      toName: "Tokyo Narita",
      flightNo: "FB 7707",
      date: "4 Mar 2026",
      boardingTime: "14:00",
      gate: "C14",
    },
  });
}

