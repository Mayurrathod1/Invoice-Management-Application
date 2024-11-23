import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { RootState, useAppDispatch, useAppSelector } from "../Store";
import { fetchInvoices } from "../Store/Thunks/invoiceThunks";
import { Invoice } from "../Types/redux-types";
import FileUploader from "./Upload-file";
import NoItemState from "./NoItemState";
import ErrorState from "./ErrorState";
import Loading from "./loading";

interface InvoiceInterface {
  id: string;
  serialNumber: string;
  date: Date;
  totalAmount: Number;
  ExtractedFrom: string;
  createdAt: Date;
}

interface LeftSideInvoiceBarProps {
  handleInvoiceValueChange: (value: Invoice) => void;
}

const LeftSideInvoiceBar = ({
  handleInvoiceValueChange,
}: LeftSideInvoiceBarProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchInvoices());
  }, [dispatch]);

  const { error, items, loading } = useAppSelector(
    (state: RootState) => state.invoices
  );

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedInvoice, setSelectedInvoice] =
    useState<InvoiceInterface | null>(null);

  // Filter invoices based on search term
  const filteredInvoices = items.filter((invoice: Invoice) =>
    invoice.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen ">
      {/* Sidebar - Invoice List */}
      <div className="w-full  border-r overflow-y-auto">
        <div className="w-full p-2 border-b flex justify-evenly items-center mx-auto">
          <h2 className="text-2xl font-semibold">Invoices</h2>

          <FileUploader />
        </div>

        {/* Search Input */}
        <div className="p-4 border-b">
          <div className="relative">
            <input
              type="text"
              placeholder="Search invoices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        {/* Invoice List */}
        <div>
          {loading ? (
            <Loading info="Loading Invoices " />
          ) : error ? (
            <ErrorState errInfo="Error Loading Invoices... " />
          ) : items.length === 0 ? (
            <NoItemState itemName="invoices" />
          ) : (
            filteredInvoices.map((invoice: Invoice) => (
              <div
                key={invoice.id}
                onClick={() => {
                  setSelectedInvoice(invoice);
                  handleInvoiceValueChange(invoice);
                }}
                className={`p-4 border-b cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-100
                ${
                  selectedInvoice && selectedInvoice?.id === invoice.id
                    ? "dark:bg-blue-600/90 rounded-l-md  bg-blue-100"
                    : ""
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold">{invoice?.serialNumber}</p>
                  </div>
                  <div className="flex items-center"></div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftSideInvoiceBar;
