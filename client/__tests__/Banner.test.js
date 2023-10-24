import React from "react";
import { render, screen } from "@testing-library/react";
import { test, expect } from "@jest/globals";
import { toBeInTheDocument } from "@testing-library/jest-dom/matchers";

import Banner from "../src/components/Banner";

expect.extend({ toBeInTheDocument });


test("renders banner with title only", () => {
    const title = "Shop Banner";
    render(<Banner title={title} />);
    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
});