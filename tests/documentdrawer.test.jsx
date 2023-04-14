import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { createRef } from "react";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import DocumentDrawer from "../src/components/DocumentDrawer";
import * as documentActions from "../src/utils/documentActions";

describe("DocumentDrawer", () => {
  const mockToggleDrawer = vi.fn();
  const mockOpenDocument = vi.fn();
  const mockHandleNewDocument = vi.fn();
  const mockSetOpenedDocumentId = vi.fn();
  const mockDeleteUserDocument = vi.fn();

  const defaultProps = {
    toggleDrawer: mockToggleDrawer,
    userDocuments: [],
    encryptionKey: "test-key",
    openDocument: mockOpenDocument,
    handleNewDocument: mockHandleNewDocument,
    openedDocumentId: null,
    setOpenedDocumentId: mockSetOpenedDocumentId,
    deleteUserDocument: mockDeleteUserDocument,
  };

  beforeEach(() => {
    mockToggleDrawer.mockClear();
    mockOpenDocument.mockClear();
    mockHandleNewDocument.mockClear();
    mockSetOpenedDocumentId.mockClear();
    mockDeleteUserDocument.mockClear();
  });

  const renderWithRouter = (children) => {
    return render(<BrowserRouter>{children}</BrowserRouter>);
  };

  test("renders header and close button", () => {
    renderWithRouter(<DocumentDrawer {...defaultProps} />);
    expect(screen.getByText("Saved Documents")).toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
  });

  test("calls toggleDrawer when close button is clicked", () => {
    renderWithRouter(<DocumentDrawer {...defaultProps} />);
    fireEvent.click(screen.getByText("Close"));
    expect(mockToggleDrawer).toHaveBeenCalledTimes(1);
  });

  test("displays decrypted documents and handles document click", async () => {
    const documents = [
      {
        id: "doc1",
        content: "Document 1 content",
        name: "Document 1",
      },
      {
        id: "doc2",
        content: "Document 2 content",
        name: "Document 2",
      },
    ];
    const ref = createRef();
    const mockDecryptDocuments = vi.fn().mockResolvedValue(documents);
    vi.spyOn(documentActions, "decryptDocuments").mockImplementation(
      mockDecryptDocuments
    );

    renderWithRouter(
      <DocumentDrawer {...defaultProps} userDocuments={documents} ref={ref} />
    );

    await waitFor(() => {
      documents.forEach((doc) => {
        expect(screen.getByText(doc.name)).toBeInTheDocument();
      });
    });

    fireEvent.click(screen.getByText("Document 1"));

    expect(mockOpenDocument).toHaveBeenCalledTimes(1);
    expect(mockSetOpenedDocumentId).toHaveBeenCalledWith(documents[0].id);
    expect(mockToggleDrawer).toHaveBeenCalledTimes(1);

    documentActions.decryptDocuments.mockRestore();
  });
});
