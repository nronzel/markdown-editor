import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import HomepageHero from "../src/components/HomepageHero";
import { AuthProvider } from "../src/config/AuthProvider";
import { vi } from "vitest";

vi.mock("react-router-dom", () => {
  const originalModule = require("react-router-dom");
  return {
    ...originalModule,
    useNavigate: vi.fn(),
  };
});

function customRender(ui, { currentUser, ...options } = {}) {
  const Wrapper = ({ children }) => (
    <AuthProvider initialUser={currentUser}>
      <ChakraProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </ChakraProvider>
    </AuthProvider>
  );

  return render(ui, { wrapper: Wrapper, ...options });
}

describe("HomepageHero", () => {
  test("renders the hero text", async () => {
    customRender(<HomepageHero />);

    await waitFor(() => {
      expect(
        screen.queryByText(/edit and save markdown files/i)
      ).toBeInTheDocument();
    });
  });

  test("renders the login section", async () => {
    customRender(<HomepageHero />);

    await waitFor(() => {
      expect(screen.queryByTestId("login-section")).toBeInTheDocument();
    });
  });

  test("handles anonymous sign-in and navigation", async () => {
    const navigate = vi.fn();
    useNavigate.mockImplementation(() => navigate);
    customRender(<HomepageHero />);

    const anonSignInButton = screen.getByTestId("animated-button");
    fireEvent.click(anonSignInButton);

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("/editor");
    });
  });
});
