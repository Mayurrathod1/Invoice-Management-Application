import { ArrowUpDown, Search } from "lucide-react";
import { useState } from "react";
import { RootState, useAppSelector } from "../Store";
import PaginationFooter from "./PaginationFooter";
import Loading from "./loading";
import ErrorState from "./ErrorState";
import NoItemState from "./NoItemState";
import { Customer } from "../Types/redux-types";

const CustomersTable = () => {
  const { items, error, loading } = useAppSelector(
    (state: RootState) => state.customers
  );

  const customers = items;

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Filter customers based on search
  const filteredCustomers = customers.filter(
    (customer: Customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phoneNumber.includes(searchTerm)
  );

  // Sort customers
  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const direction = sortConfig.direction === "asc" ? 1 : -1;
    if (a[sortConfig.key] < b[sortConfig.key]) return -1 * direction;
    if (a[sortConfig.key] > b[sortConfig.key]) return 1 * direction;
    return 0;
  });

  const currentCustomer = sortedCustomers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Handle sorting
  const handleSort = (key: any) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
  };

  console.log("laoding", loading);
  console.log("error", error);

  return (
    <div className="w-full shadow-sm shadow-gray-300  border border-gray-200 dark:border-gray-700  dark:shadow-gray-300  rounded-lg ">
      <div className="px-6 pt-3 pb-1 border-b border-gray-800 dark:border-gray-200">
        <h2 className="text-2xl font-bold mb-4">Customers Overview</h2>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4 mt-2 px-1">
        <input
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search
          size={20}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      </div>

      {/* Customers Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className=" border-b">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center">
                  Customer Name
                  <ArrowUpDown size={14} className="ml-1" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                onClick={() => handleSort("phone")}
              >
                <div className="flex items-center">
                  Phone Number
                  <ArrowUpDown size={14} className="ml-1" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase cursor-pointer"
                onClick={() => handleSort("totalPurchase")}
              >
                <div className="flex items-center justify-end">
                  Total Purchase Amount
                  <ArrowUpDown size={14} className="ml-1" />
                </div>
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <Loading info="Loading Customers..." />
            ) : error ? (
              <ErrorState errInfo="Error Loading Customers... " />
            ) : items.length === 0 ? (
              <NoItemState itemName="customers" />
            ) : (
              currentCustomer.map((customer) => (
                <tr
                  key={customer?.id}
                  className="dark:hover:bg-gray-800 hover:bg-gray-100"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">
                    {customer.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {customer.phoneNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium  text-right">
                    ₹{customer.totalPurchaseAmount.toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <PaginationFooter
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default CustomersTable;
