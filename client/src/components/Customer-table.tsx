import { ArrowUpDown, Search, Users, XCircle } from "lucide-react";
import { useState } from "react";
import { RootState, useAppSelector } from "../Store";
import PaginationFooter from "./PaginationFooter";
import Loading from "./loading";
import ErrorState from "./ErrorState";
import NoItemState from "./NoItemState";

const CustomersTable = () => {
  const { items, error, loading } = useAppSelector(
    (state: RootState) => state.customers
  );

  const customers = items;

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Filter customers based on search
  const filteredCustomers = customers.filter(
    (customer) =>
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

  // if (loading) {
  //   return (
  //     <div className="w-full h-[400px] shadow-sm shadow-gray-300 border border-gray-200 dark:border-gray-700 dark:shadow-gray-300 rounded-lg flex items-center justify-center">
  //       <div className="flex flex-col items-center gap-2">
  //         <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  //         <p className="text-sm text-gray-500">Loading customers...</p>
  //       </div>
  //     </div>
  //   );
  // }
  console.log("laoding", loading);
  console.log("error", error);

  // if (error) {
  //   return (
  //     <div className="w-full h-[400px] shadow-sm shadow-gray-300 border border-gray-200 dark:border-gray-700 dark:shadow-gray-300 rounded-lg flex items-center justify-center">
  //       <div className="flex flex-col items-center gap-2 px-4 text-center">
  //         <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
  //           <XCircle className="w-6 h-6 text-red-500" />
  //         </div>
  //         <h3 className="text-lg font-semibold text-red-500">
  //           Error Loading Customers
  //         </h3>
  //         <p className="text-sm text-gray-500">{error}</p>
  //       </div>
  //     </div>
  //   );
  // }

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
            ) : items.length == 0 ? (
              <NoItemState itemName="customers" />
            ) : (
              currentCustomer.map((customer) => (
                <tr
                  key={customer.id}
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

// const CustomersTable = () => {
//   const { items, error, loading } = useAppSelector((state: RootState) => state.customers);
//   const customers = items;

//   const itemsPerPage = 5;
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

//   // Filter customers based on search
//   const filteredCustomers = customers.filter(
//     (customer) =>
//       customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       customer.phoneNumber.includes(searchTerm)
//   );

//   // Sort customers
//   const sortedCustomers = [...filteredCustomers].sort((a, b) => {
//     if (!sortConfig.key) return 0;
//     const direction = sortConfig.direction === "asc" ? 1 : -1;
//     if (a[sortConfig.key] < b[sortConfig.key]) return -1 * direction;
//     if (a[sortConfig.key] > b[sortConfig.key]) return 1 * direction;
//     return 0;
//   });

//   const totalPages = Math.ceil(sortedCustomers.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentProducts = sortedCustomers.slice(
//     startIndex,
//     startIndex + itemsPerPage
//   );

//   const handleSort = (key: any) => {
//     setSortConfig({
//       key,
//       direction:
//         sortConfig.key === key && sortConfig.direction === "asc"
//           ? "desc"
//           : "asc",
//     });
//   };

//   if (loading) {
//     return (
//       <div className="w-full h-[400px] shadow-sm shadow-gray-300 border border-gray-200 dark:border-gray-700 dark:shadow-gray-300 rounded-lg flex items-center justify-center">
//         <div className="flex flex-col items-center gap-2">
//           <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//           <p className="text-sm text-gray-500">Loading customers...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="w-full h-[400px] shadow-sm shadow-gray-300 border border-gray-200 dark:border-gray-700 dark:shadow-gray-300 rounded-lg flex items-center justify-center">
//         <div className="flex flex-col items-center gap-2 px-4 text-center">
//           <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
//             <XCircle className="w-6 h-6 text-red-500" />
//           </div>
//           <h3 className="text-lg font-semibold text-red-500">Error Loading Customers</h3>
//           <p className="text-sm text-gray-500">{error}</p>
//         </div>
//       </div>
//     );
//   }

//   if (items.length === 0) {
//     return (
//       <div className="w-full h-[400px] shadow-sm shadow-gray-300 border border-gray-200 dark:border-gray-700 dark:shadow-gray-300 rounded-lg flex items-center justify-center">
//         <div className="flex flex-col items-center gap-2 px-4 text-center">
//           <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
//             <Users className="w-6 h-6 text-gray-500" />
//           </div>
//           <h3 className="text-lg font-semibold text-gray-700">No Customers Found</h3>
//           <p className="text-sm text-gray-500">There are no customers in the system yet.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full shadow-sm shadow-gray-300 border border-gray-200 dark:border-gray-700 dark:shadow-gray-300 rounded-lg">
//       <div className="px-6 pt-3 pb-1 border-b border-gray-800 dark:border-gray-200">
//         <h2 className="text-2xl font-bold mb-4">Customers Overview</h2>
//       </div>

//       {/* Search Bar */}
//       <div className="relative mb-4 mt-2 px-1">
//         <input
//           type="text"
//           placeholder="Search customers..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <Search
//           size={20}
//           className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
//         />
//       </div>

//       {filteredCustomers.length === 0 ? (
//         <div className="py-8 text-center">
//           <div className="flex flex-col items-center gap-2 px-4">
//             <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
//               <Search className="w-6 h-6 text-gray-500" />
//             </div>
//             <h3 className="text-lg font-semibold text-gray-700">No Results Found</h3>
//             <p className="text-sm text-gray-500">
//               No customers match your search criteria "{searchTerm}"
//             </p>
//           </div>
//         </div>
//       ) : (
//         <>
//           {/* Customers Table */}
//           <div className="overflow-x-auto">
//             <table className="w-full">
//             <thead className=" border-b">
//             <tr>
//               <th
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
//                 onClick={() => handleSort("name")}
//               >
//                 <div className="flex items-center">
//                   Customer Name
//                   <ArrowUpDown size={14} className="ml-1" />
//                 </div>
//               </th>
//               <th
//                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
//                 onClick={() => handleSort("phone")}
//               >
//                 <div className="flex items-center">
//                   Phone Number
//                   <ArrowUpDown size={14} className="ml-1" />
//                 </div>
//               </th>
//               <th
//                 className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase cursor-pointer"
//                 onClick={() => handleSort("totalPurchase")}
//               >
//                 <div className="flex items-center justify-end">
//                   Total Purchase Amount
//                   <ArrowUpDown size={14} className="ml-1" />
//                 </div>
//               </th>
//             </tr>
//           </thead>
//             </table>
//           </div>
//           <PaginationFooter
//             currentPage={currentPage}
//             totalPages={totalPages}
//             onPageChange={setCurrentPage}
//           />
//         </>
//       )}
//     </div>
//   );
// };

export default CustomersTable;
