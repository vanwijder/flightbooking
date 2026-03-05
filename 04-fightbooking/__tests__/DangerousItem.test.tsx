/**
 * @jest-environment jsdom
 * ทดสอบ DangerousItem component
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import DangerousItem from "@/components/DangerousItem";

describe("DangerousItem", () => {
  it("แสดง label ถูกต้อง", () => {
    render(<DangerousItem icon="🔋" label="แบตเตอรี่ลิเธียม" />);
    expect(screen.getByText("แบตเตอรี่ลิเธียม")).toBeInTheDocument();
  });

  it("แสดง icon ถูกต้อง", () => {
    render(<DangerousItem icon="🔥" label="วัตถุไวไฟ" />);
    expect(screen.getByText("🔥")).toBeInTheDocument();
  });

  it("icon span มี aria-hidden=true", () => {
    const { container } = render(<DangerousItem icon="🔋" label="Test" />);
    const iconSpan = container.querySelector('[aria-hidden="true"]');
    expect(iconSpan).toBeInTheDocument();
  });

  it("render ครบโดยไม่ throw error", () => {
    expect(() => {
      render(<DangerousItem icon="💣" label="วัตถุระเบิด" />);
    }).not.toThrow();
  });
});

