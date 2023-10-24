
import { render } from "@testing-library/react";
import App from "./App";
import { test, expect } from "@jest/globals";

test("renders", () => {
    render(<App />);
    expect(true).toBe(true);
});