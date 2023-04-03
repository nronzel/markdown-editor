import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import HomepageHero from "../src/components/HomepageHero";
import { AuthProvider } from "../src/config/AuthProvider";

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

  test("matches the snapshot", async () => {
    const { container } = customRender(<HomepageHero />);

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
});
