/**
 * @jest-environment jsdom
 * ทดสอบ StepIndicator component
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import StepIndicator from "@/components/StepIndicator";

describe("StepIndicator", () => {
  it("แสดง 5 step", () => {
    render(<StepIndicator current={1} />);
    // step numbers 1-5
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("step ที่ผ่านไปแล้ว — แสดง ✓ แทนเลข", () => {
    render(<StepIndicator current={3} />);
    // step 1 และ 2 ผ่านไปแล้ว ควรเป็น ✓
    const checkmarks = screen.getAllByText("✓");
    expect(checkmarks).toHaveLength(2);
  });

  it("step ปัจจุบัน — แสดงเลข step นั้น (current=1 → แสดง '1')", () => {
    render(<StepIndicator current={1} />);
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("แสดง label 'Check-in'", () => {
    render(<StepIndicator current={1} />);
    expect(screen.getByText("Check-in")).toBeInTheDocument();
  });

  it("แสดง label 'Boarding Pass'", () => {
    render(<StepIndicator current={5} />);
    expect(screen.getByText("Boarding Pass")).toBeInTheDocument();
  });
});

