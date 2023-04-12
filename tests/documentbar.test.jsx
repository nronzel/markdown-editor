import { render, screen, fireEvent } from "@testing-library/react";
import DocumentBar from "../src/components/DocumentBar";
import { BrowserRouter } from "react-router-dom";

describe("DocumentBar", () => {
  const toggleDrawer = vi.fn();
  const saveDocument = vi.fn();
  const clearStatusMessage = vi.fn();
  const setDocumentName = vi.fn();
  const handleNewDocument = vi.fn();
  const defaultProps = {
    toggleDrawer,
    saveDocument,
    statusMessage: "",
    clearStatusMessage,
    documentName: "Test Document",
    setDocumentName,
    handleNewDocument,
    currentUser: null,
  };

  const renderWithRouter = (children) => {
    return render(<BrowserRouter>{children}</BrowserRouter>);
  };

  it("render the DocumentBar component", () => {
    renderWithRouter(<DocumentBar {...defaultProps} />);
    expect(screen.getByText("Test Document")).toBeInTheDocument();
  });

  it("call toggleDrawer when the drawer icon is clicked", () => {
    renderWithRouter(<DocumentBar {...defaultProps} />);
    fireEvent.click(screen.getByTestId("drawer-icon"));
    expect(toggleDrawer).toHaveBeenCalledTimes(1);
  });

  it("call saveDocument when the Save button is clicked and the user is authenticated", () => {
    const props = { ...defaultProps, currentUser: { isAnonymous: false } };
    renderWithRouter(<DocumentBar {...props} />);
    fireEvent.click(screen.getByTestId("save-btn"));
    expect(saveDocument).toHaveBeenCalledTimes(1);
  });

  it("show sign up link when the user is anonymous", () => {
    const props = { ...defaultProps, currentUser: { isAnonymous: true } };
    renderWithRouter(<DocumentBar {...props} />);
    expect(screen.getByText("Sign up to save documents")).toBeInTheDocument();
  });

  it("toggle edit mode when the edit button is clicked", () => {
    renderWithRouter(<DocumentBar {...defaultProps} />);
    fireEvent.click(screen.getByTestId("edit-btn"));
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("accept-btn"));
    expect(screen.getByText("Test Document")).toBeInTheDocument();
  });

  it("call handleNewDocument when the new document button is clicked", () => {
    renderWithRouter(<DocumentBar {...defaultProps} />);
    fireEvent.click(screen.getByTestId("new-doc-btn"));
    expect(handleNewDocument).toHaveBeenCalledTimes(1);
  });
});
