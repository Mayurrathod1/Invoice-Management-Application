import { useState } from "react";
import { Search, ArrowUpDown } from "lucide-react";
import { RootState, useAppSelector } from "../Store";
import PaginationFooter from "./PaginationFooter";
import ErrorState from "./ErrorState";
import Loading from "./loading";
import NoItemState from "./NoItemState";
import { Product } from "../Types/redux-types";

const ProductsTable = () => {
  const { items, error, loading } = useAppSelector(
    (state: RootState) => state.products
  );

  const products = items;

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  // Filter products based on search
  const filteredProducts = products.filter((product: Product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const direction = sortConfig.direction === "asc" ? 1 : -1;
    if (a[sortConfig.key] < b[sortConfig.key]) return -1 * direction;
    if (a[sortConfig.key] > b[sortConfig.key]) return 1 * direction;
    return 0;
  });

  const currentProducts = sortedProducts.slice(
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

  return (
    <div className="w-full shadow-sm shadow-gray-300  border border-gray-200 dark:border-gray-700  dark:shadow-gray-300  rounded-lg">
      <div className="px-6 pt-3 pb-1 border-b border-gray-800 dark:border-gray-200">
        <h2 className="text-2xl font-bold mb-4">Products Overview</h2>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4 mt-2 px-1">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search
          size={20}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className=" border-b">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center">
                  Name
                  <ArrowUpDown size={14} className="ml-1" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase cursor-pointer"
                onClick={() => handleSort("quantity")}
              >
                <div className="flex items-center justify-end">
                  Quantity
                  <ArrowUpDown size={14} className="ml-1" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase cursor-pointer"
                onClick={() => handleSort("unitPrice")}
              >
                <div className="flex items-center justify-end">
                  Unit Price
                  <ArrowUpDown size={14} className="ml-1" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase cursor-pointer"
                onClick={() => handleSort("tax")}
              >
                <div className="flex items-center justify-end">
                  Tax
                  <ArrowUpDown size={14} className="ml-1" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase cursor-pointer"
                onClick={() => handleSort("totalPrice")}
              >
                <div className="flex items-center justify-end">
                  Price with Tax
                  <ArrowUpDown size={14} className="ml-1" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className=" w-full divide-y divide-gray-200 ">
            {loading ? (
              <Loading info="Loading Products..." />
            ) : error ? (
              <ErrorState errInfo="Error Loading Products... " />
            ) : items.length === 0 ? (
              <NoItemState itemName="products" />
            ) : (
              currentProducts.map((product) => (
                <tr
                  key={product.id}
                  className="dark:hover:bg-gray-800 hover:bg-gray-100"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium dark:text-gray-200">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-gray-200 text-right">
                    {product.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-gray-200 text-right">
                    ₹{product.unitPrice.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm dark:text-gray-200 text-right">
                    ₹{product.tax.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium dark:text-gray-200 text-right">
                    ₹{(product.unitPrice + product.tax).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <PaginationFooter
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ProductsTable;
