/**
 * ทดสอบ InfoCell component
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import InfoCell from "@/components/InfoCell";

describe("InfoCell", () => {
  it("แสดง label ถูกต้อง", () => {
    render(<InfoCell label="From" value="BKK" />);
    expect(screen.getByText("From")).toBeInTheDocument();
  });

  it("แสดง value ถูกต้อง", () => {
    render(<InfoCell label="From" value="BKK" />);
    expect(screen.getByText("BKK")).toBeInTheDocument();
  });

  it("แสดง sub text ถ้ามี", () => {
    render(<InfoCell label="From" value="BKK" sub="Bangkok" />);
    expect(screen.getByText("Bangkok")).toBeInTheDocument();
  });

  it("highlight=true — value มี class text-blue-600", () => {
    const { container } = render(<InfoCell label="Seat" value="12A" highlight />);
    const valueEl = container.querySelector(".text-blue-600");
    expect(valueEl).toBeInTheDocument();
    expect(valueEl?.textContent).toBe("12A");
  });

  it("highlight=false (default) — value มี class text-gray-800", () => {
    const { container } = render(<InfoCell label="Gate" value="C14" />);
    const valueEl = container.querySelector(".text-gray-800");
    expect(valueEl).toBeInTheDocument();
    expect(valueEl?.textContent).toBe("C14");
  });
});
