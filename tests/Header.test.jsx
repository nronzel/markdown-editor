import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Header from "../src/components/Header";
import { AuthProvider } from "../src/config/AuthProvider";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

function customRender(ui, { currentUser, ...options }) {
  const Wrapper = ({ children }) => (
    <AuthProvider initialUser={currentUser}>
      <ChakraProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </ChakraProvider>
    </AuthProvider>
  );

  return render(ui, { wrapper: Wrapper, ...options });
}

describe("Header", () => {
  test("renders the header with the logo and theme switcher", async () => {
    customRender(<Header />, { currentUser: null });

    expect(screen.getByText(/markdown editor/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/theme/i)).toBeInTheDocument();
  });

  test("shows 'Anonymous' on anon sign-in", async () => {
    const currentUser = { isAnonymous: true };
    customRender(<Header />, { currentUser });

    await waitFor(() => {
      expect(screen.getByText(/anonymous/i)).toBeInTheDocument();
    });
  });

  test("no logout button when not signed in", () => {
    customRender(<Header />, { currentUser: null });

    const logoutButton = screen.queryByTestId("logout-button");

    expect(logoutButton).not.toBeInTheDocument();
  });

  test("shows the email when user is logged in", async () => {
    const currentUser = { isAnonymous: false, email: "test@example.com" };
    customRender(<Header />, { currentUser });

    await waitFor(() => {
      expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
    });
  });

  test("handles logout", async () => {
    const currentUser = { isAnonymous: false, email: "test@example.com" };
    customRender(<Header />, { currentUser });

    const logoutButton = screen.getByTestId("logout-button");
    fireEvent.click(logoutButton);
    await waitFor(() => {
      expect(
        screen.queryByText(/logged out successfully/i)
      ).toBeInTheDocument();
    });
  });

  test("matches snapshot", async () => {
    const currentUser = { isAnonymous: false, email: "test@example.com" };
    const { container } = customRender(<Header />, { currentUser });

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
});
