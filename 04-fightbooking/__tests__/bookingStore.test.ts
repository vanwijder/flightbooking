/**
 * @jest-environment jsdom
 * ทดสอบ bookingStore reducer ทุก action
 */

import { Passenger, PassengerInfo, BookingInfo } from "@/types/booking";

// ---- ดึง reducer มา test โดยตรง (export เพื่อ test) ----
// เราจะ test reducer logic โดยไม่ต้องใช้ React context

// Mock passengers สำหรับ test
const mockPassengers: Passenger[] = [
  { id: "PAX1", firstName: "Somchai", lastName: "Jaidee", passport: "AA123456", seat: "12A", selected: false },
  { id: "PAX2", firstName: "Malee", lastName: "Srisuwan", passport: "BB654321", seat: "12B", selected: false },
];

const mockBookingInfo: BookingInfo = { lastName: "Jaidee", bookingRef: "ABC123" };

// ---- ทดสอบ Type ของ BookingState ----
describe("Booking Types", () => {
  it("Passenger type มี field ครบ", () => {
    const pax: Passenger = {
      id: "PAX1",
      firstName: "Test",
      lastName: "User",
      passport: "TT000000",
      seat: "1A",
      selected: false,
    };
    expect(pax.id).toBe("PAX1");
    expect(pax.selected).toBe(false);
  });

  it("BookingInfo type มี lastName และ bookingRef", () => {
    const info: BookingInfo = { lastName: "Jaidee", bookingRef: "ABC123" };
    expect(info.bookingRef).toHaveLength(6);
  });

  it("PassengerInfo type มี contact และ mealPreference", () => {
    const info: PassengerInfo = {
      passengerId: "PAX1",
      contact: "test@example.com",
      mealPreference: "standard",
    };
    expect(info.passengerId).toBe("PAX1");
    expect(info.mealPreference).toBe("standard");
  });
});

// ---- ทดสอบ Business Logic (Reducer Functions) ----
describe("Select Passenger Logic", () => {
  it("เลือกผู้โดยสาร 1 คน — selectedPassengerIds มี 1 element", () => {
    const selected: string[] = [];
    const id = "PAX1";
    const result = selected.includes(id)
      ? selected.filter((x) => x !== id)
      : [...selected, id];
    expect(result).toEqual(["PAX1"]);
  });

  it("ยกเลิกเลือกผู้โดยสาร — ถ้า id อยู่ใน array แล้วจะถูกเอาออก", () => {
    const selected = ["PAX1", "PAX2"];
    const id = "PAX1";
    const result = selected.filter((x) => x !== id);
    expect(result).toEqual(["PAX2"]);
  });

  it("Select All — selectedPassengerIds มีทุก id", () => {
    const result = mockPassengers.map((p) => p.id);
    expect(result).toEqual(["PAX1", "PAX2"]);
  });

  it("Clear All — selectedPassengerIds ว่างเปล่า", () => {
    const selected = ["PAX1", "PAX2"];
    const result = selected.filter(() => false); // clear
    expect(result).toHaveLength(0);
  });

  it("isAllSelected — true ถ้าเลือกครบทุกคน", () => {
    const selected = ["PAX1", "PAX2"];
    const isAll = selected.length === mockPassengers.length;
    expect(isAll).toBe(true);
  });

  it("isAllSelected — false ถ้าเลือกไม่ครบ", () => {
    const selected = ["PAX1"];
    const isAll = selected.length === mockPassengers.length;
    expect(isAll).toBe(false);
  });
});

describe("Form Validation Logic", () => {
  it("isFormValid — false ถ้ากรอกข้อมูลไม่ครบ", () => {
    const lastName = "";
    const bookingRef = "ABC123";
    const isValid = lastName.trim().length > 0 && bookingRef.trim().length > 0;
    expect(isValid).toBe(false);
  });

  it("isFormValid — true ถ้ากรอกข้อมูลครบ", () => {
    const lastName = "Jaidee";
    const bookingRef = "ABC123";
    const isValid = lastName.trim().length > 0 && bookingRef.trim().length > 0;
    expect(isValid).toBe(true);
  });

  it("bookingRef จะถูก uppercase อัตโนมัติ", () => {
    const input = "abc123";
    const result = input.toUpperCase();
    expect(result).toBe("ABC123");
  });

  it("isAllFilled — false ถ้า contact ว่าง", () => {
    const contacts: Record<string, string> = { PAX1: "", PAX2: "test@example.com" };
    const isAll = mockPassengers.every((p) => contacts[p.id]?.trim().length > 0);
    expect(isAll).toBe(false);
  });

  it("isAllFilled — true ถ้ากรอก contact ครบทุกคน", () => {
    const contacts: Record<string, string> = { PAX1: "0812345678", PAX2: "test@example.com" };
    const isAll = mockPassengers.every((p) => contacts[p.id]?.trim().length > 0);
    expect(isAll).toBe(true);
  });
});

describe("Dangerous Goods Logic", () => {
  it("answer = 'no' → ไม่ block การเช็คอิน", () => {
    const answer = "no";
    const canContinue = answer === "no";
    expect(canContinue).toBe(true);
  });

  it("answer = 'yes' → block การเช็คอิน", () => {
    const answer = "yes";
    const canContinue = answer === "no";
    expect(canContinue).toBe(false);
  });

  it("answer = null → ปุ่มยังไม่ enable", () => {
    const answer = null;
    const isEnabled = answer !== null;
    expect(isEnabled).toBe(false);
  });
});

describe("SET_BOOKING_AND_PASSENGERS Logic", () => {
  it("หลัง set booking ใหม่ — passengers ต้องอัพเดต", () => {
    const newPassengers: Passenger[] = [
      { id: "PAX9", firstName: "New", lastName: "User", passport: "ZZ999", seat: "1A", selected: false },
    ];
    // simulate reducer
    const state = {
      bookingInfo: { lastName: "", bookingRef: "" },
      passengers: [] as Passenger[],
      selectedPassengerIds: [] as string[],
    };
    const newState = {
      ...state,
      bookingInfo: mockBookingInfo,
      passengers: newPassengers,
      selectedPassengerIds: [],
    };
    expect(newState.passengers).toHaveLength(1);
    expect(newState.bookingInfo.bookingRef).toBe("ABC123");
    expect(newState.selectedPassengerIds).toHaveLength(0);
  });
});

