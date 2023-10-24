import React from "react";
import { render, screen } from "@testing-library/react";
import { test, expect } from "@jest/globals";
import Footer from "../src/components/Footer";
import { BrowserRouter } from "react-router-dom";
import { toBeInTheDocument } from "@testing-library/jest-dom/matchers";

expect.extend({ toBeInTheDocument });

test("renders expected content", () => {
  render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  );
  expect(screen.getByText("Furniro.")).toBeInTheDocument();
  expect(screen.getByText("400 University Drive Suite 200 Coral Gables,")).toBeInTheDocument();
  expect(screen.getByText("FL 33134 USA")).toBeInTheDocument();
  expect(screen.getByText("Links")).toBeInTheDocument();
  expect(screen.getByText("Home")).toBeInTheDocument();
  expect(screen.getByText("Shop")).toBeInTheDocument();
  expect(screen.getByText("Blog")).toBeInTheDocument();
  expect(screen.getByText("Contact")).toBeInTheDocument();
  expect(screen.getByText("Help")).toBeInTheDocument();
 
  expect(screen.getByText("© 2022 Furniiro. All rights reserved.")).toBeInTheDocument();
});