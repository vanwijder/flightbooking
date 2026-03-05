/**
 * ทดสอบ FormField component
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FormField from "@/components/FormField";

describe("FormField", () => {
  it("แสดง label ถูกต้อง", () => {
    render(<FormField label="นามสกุล" value="" onChange={() => {}} />);
    expect(screen.getByText("นามสกุล")).toBeInTheDocument();
  });

  it("แสดง placeholder ถูกต้อง", () => {
    render(
      <FormField label="Test" value="" onChange={() => {}} placeholder="กรอกที่นี่" />
    );
    expect(screen.getByPlaceholderText("กรอกที่นี่")).toBeInTheDocument();
  });

  it("เมื่อพิมพ์ — เรียก onChange พร้อมค่าที่พิมพ์", () => {
    const handleChange = jest.fn();
    render(<FormField label="Test" value="" onChange={handleChange} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "Jaidee" } });
    expect(handleChange).toHaveBeenCalledWith("Jaidee");
  });

  it("uppercase=true — onChange ถูกเรียกด้วย uppercase value", () => {
    const handleChange = jest.fn();
    render(<FormField label="Test" value="" onChange={handleChange} uppercase />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "abc123" } });
    expect(handleChange).toHaveBeenCalledWith("ABC123");
  });

  it("แสดง value ที่ส่งมา", () => {
    render(<FormField label="Test" value="Jaidee" onChange={() => {}} />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.value).toBe("Jaidee");
  });

  it("maxLength ถูกตั้งค่าใน input", () => {
    render(<FormField label="Test" value="" onChange={() => {}} maxLength={6} />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    expect(input.maxLength).toBe(6);
  });
});
