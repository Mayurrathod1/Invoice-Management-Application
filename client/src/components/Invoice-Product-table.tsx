import { useCallback, useEffect, useRef, useState } from "react";
import { Trash2, File } from "lucide-react";
import { RootState, store, useAppDispatch, useAppSelector } from "../Store";
import { fetchProducts, UpdateProduct } from "../Store/Thunks/productThunk";
import { Customer, Invoice, Product } from "../Types/redux-types";
import { fetchCustomers, UpdateCustomer } from "../Store/Thunks/customerThunks";
import PaginationFooter from "./PaginationFooter";
import { selectInvoiceTotal } from "../Store/Selector/invoiceSelector";
import { UpdateInvoice } from "../Store/Thunks/invoiceThunks";
import Loading from "./loading";
import ErrorState from "./ErrorState";
import NoItemState from "./NoItemState";

interface InvoiceProductTableProps {
  invoice: Invoice | null;
}

const InvoiceProductTable = ({ invoice }: InvoiceProductTableProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCustomers());
  }, [dispatch]);

  const { items, error, loading } = useAppSelector(
    (state: RootState) => state.products
  );
  const { items: invoices } = useAppSelector(
    (state: RootState) => state.invoices
  );

  const filteredInvoice = invoices.find(
    (inv: Invoice) => inv.id === invoice?.id
  );

  const filteredItems = items.filter(
    (item: Product) => item.invoice_id === invoice?.id
  );

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentProducts = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const { items: customers } = useAppSelector(
    (state: RootState) => state.customers
  );

  const customer = customers.find(
    (c: Customer) => c?.invoice_id === invoice?.id
  );

  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  // Handle customer name edit
  const handleCustomerNameEdit = (
    invoiceId: string,
    field: keyof Customer,
    value: string
  ) => {
    const updatedCusomer = {
      [field]: value,
    };

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Debounce the dispatch action
    debounceTimeoutRef.current = setTimeout(() => {
      dispatch(
        UpdateCustomer({ customerId: customer?.id!, body: updatedCusomer })
      );
    }, 500);
  };

  const lastTotalRef = useRef<number>(0);

  const handleProductEdit = useCallback(
    (productId: string, field: keyof Product, value: string | number) => {
      const updatedProduct = {
        [field]: value,
      };

      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }

      debounceTimeoutRef.current = setTimeout(async () => {
        // First, update the product
        await dispatch(
          UpdateProduct({
            productId,
            body: updatedProduct,
          })
        );

        // After product is updated, get the new total
        const newTotal = selectInvoiceTotal(invoice?.id!)(store.getState());

        // Only update invoice if the total has actually changed
        if (newTotal !== lastTotalRef.current) {
          lastTotalRef.current = newTotal;

          // Update invoice with new total
          await dispatch(
            UpdateInvoice({
              invoiceId: invoice?.id,
              requestBody: {
                totalAmount: newTotal,
              },
            })
          );
        }
      }, 500);
    },
    [dispatch, invoice?.id]
  );

  return (
    <>
      {invoice && invoice.id ? (
        <div className="w-full  shadow-sm shadow-gray-300  border border-gray-200 dark:border-gray-700  dark:shadow-gray-300 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800 dark:border-gray-200">
            <h2 className="text-2xl font-semibold ">Invoices</h2>
          </div>

          <div className="border-b last:border-b-0">
            <div className="px-6 py-4 flex justify-between items-center">
              <div className="flex items-center">
                <span className="mr-4 font-bold">Customer:</span>
                <input
                  type="text"
                  value={customer?.name}
                  onChange={(e) =>
                    handleCustomerNameEdit(invoice?.id!, "name", e.target.value)
                  }
                  className="border-b  border-dashed border-gray-800  dark:border-gray-300 focus:border-blue-500 outline-none bg-background/40"
                />
              </div>
              <span className="text-gray-500">
                {invoice?.date
                  ? new Date(invoice.date).toLocaleDateString()
                  : "No Date Available"}
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className=" border-b">
                  <tr className="[&>*]:px-4 [&>*]:py-3 [&>*]:text-left [&>*]:text-xs [&>*]:font-medium [&>*]:text-gray-500 [&>*]:uppercase [&>*]:tracking-wider ">
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Tax</th>
                    <th className="text-right">Actions</th>{" "}
                  </tr>
                </thead>
                <tbody className=" divide-y divide-gray-200">
                  {loading ? (
                    <Loading info="Loading Products " />
                  ) : error ? (
                    <ErrorState errInfo="Error Loading Products... " />
                  ) : items.length === 0 ? (
                    <NoItemState itemName="products" />
                  ) : (
                    currentProducts.map((product: Product) => (
                      <tr
                        key={product.id}
                        className=" hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                      >
                        <td className="px-4 py-4">
                          <input
                            type="text"
                            value={product.name}
                            onChange={(e) =>
                              handleProductEdit(
                                product.id,
                                "name",
                                e.target.value
                              )
                            }
                            className="border-b border-dashed border-gray-300 focus:border-blue-500 outline-none w-full bg-background/95"
                          />
                        </td>
                        <td className="px-4 py-4">
                          <input
                            type="number"
                            value={product.quantity}
                            onChange={(e) =>
                              handleProductEdit(
                                product.id,
                                "quantity",
                                parseInt(e.target.value)
                              )
                            }
                            className="border-b border-dashed border-gray-300 focus:border-blue-500 outline-none w-20 bg-background/95"
                            min="1"
                          />
                        </td>
                        <td className="px-4 py-4">
                          <input
                            type="number"
                            value={product.unitPrice}
                            onChange={(e) =>
                              handleProductEdit(
                                product.id,
                                "unitPrice",
                                parseFloat(e.target.value)
                              )
                            }
                            className="border-b border-dashed border-gray-300 focus:border-blue-500 outline-none w-24 bg-background/95"
                            min="0"
                          />
                        </td>
                        <td className="px-4 py-4">
                          <input
                            type="number"
                            value={product.tax}
                            onChange={(e) =>
                              handleProductEdit(
                                product.id,
                                "tax",
                                parseFloat(e.target.value)
                              )
                            }
                            className="border-b border-dashed border-gray-300 focus:border-blue-500 outline-none w-24 bg-background/95"
                            min="0"
                          />
                        </td>
                        <td className="px-4 py-4 text-right">
                          <button
                            className="text-red-500 hover:text-red-700 mr-2"
                            title="Delete Product"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}

                  {/* {currentProducts.map((product) => (
                    <tr
                      key={product.id}
                      className=" hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                    >
                      <td className="px-4 py-4">
                        <input
                          type="text"
                          value={product.name}
                          onChange={(e) =>
                            handleProductEdit(
                              product.id,
                              "name",
                              e.target.value
                            )
                          }
                          className="border-b border-dashed border-gray-300 focus:border-blue-500 outline-none w-full bg-background/95"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <input
                          type="number"
                          value={product.quantity}
                          onChange={(e) =>
                            handleProductEdit(
                              product.id,
                              "quantity",
                              parseInt(e.target.value)
                            )
                          }
                          className="border-b border-dashed border-gray-300 focus:border-blue-500 outline-none w-20 bg-background/95"
                          min="1"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <input
                          type="number"
                          value={product.unitPrice}
                          onChange={(e) =>
                            handleProductEdit(
                              product.id,
                              "unitPrice",
                              parseFloat(e.target.value)
                            )
                          }
                          className="border-b border-dashed border-gray-300 focus:border-blue-500 outline-none w-24 bg-background/95"
                          min="0"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <input
                          type="number"
                          value={product.tax}
                          onChange={(e) =>
                            handleProductEdit(
                              product.id,
                              "tax",
                              parseFloat(e.target.value)
                            )
                          }
                          className="border-b border-dashed border-gray-300 focus:border-blue-500 outline-none w-24 bg-background/95"
                          min="0"
                        />
                      </td>
                      <td className="px-4 py-4 text-right">
                        <button
                          className="text-red-500 hover:text-red-700 mr-2"
                          title="Delete Product"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))} */}
                </tbody>
              </table>
            </div>
            <div className="border dark:border-gray-200 border-gray-900" />
            <div className=" w-full flex justify-end items-center px-6 py-4">
              <div className="w-full flex flex-col justify-start items-start">
                <p className="text-sm">
                  Formula used for re-calculate the total :
                </p>
                <div className=" text-sm  flex items-center justify-center bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-lg p-1 mt-2 shadow-inner">
                  <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">
                    price
                  </span>
                  <span className="mx-1 text-gray-500 dark:text-gray-400">
                    ×
                  </span>
                  <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">
                    quantity
                  </span>
                  <span className="mx-1 text-gray-500 dark:text-gray-400">
                    +
                  </span>
                  <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">
                    tax
                  </span>
                </div>
              </div>
              <div className="text-right font-bold">
                Total: ₹{filteredInvoice?.totalAmount.toFixed(2)}
              </div>
            </div>
            <PaginationFooter
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-500">
          <File size={48} className="mr-4" />
          <p className="text-xl">Select an invoice to view details</p>
        </div>
      )}
    </>
  );
};

export default InvoiceProductTable;
