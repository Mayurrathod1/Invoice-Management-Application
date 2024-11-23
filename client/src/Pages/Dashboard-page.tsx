import { useCallback, useState } from "react";
import { Invoice } from "../Types/redux-types";
import LeftSideInvoiceBar from "../components/leftside-invoice-list";
import InvoiceProductTable from "../components/Invoice-Product-table";
import ProductsTable from "../components/Product-table";
import CustomersTable from "../components/Customer-table";
import TabsCompoent from "../components/ui/Tabs";

const Dashboard = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>("none");
  const [isTableChanging, setIsTableChanging] = useState(false);

  const handleInvoiceValueChange = useCallback((newInvoice: Invoice) => {
    setSelectedInvoice(newInvoice);
  }, []);

  const handleActiveTabValueChange = useCallback(
    (newActiveTab: string) => {
      if (selectedTab !== "none" && newActiveTab !== "none") {
        setIsTableChanging(true);
        setTimeout(() => {
          setSelectedTab(newActiveTab);
          setIsTableChanging(false);
        }, 500); // Half of our transition duration
      } else {
        setSelectedTab(newActiveTab);
      }
    },
    [selectedTab]
  );

  return (
    <main className="w-full max-w-[1450px] mx-auto my-5 flex flex-col justify-center items-center gap-5">
      <section className="w-full flex flex-row justify-evenly items-center">
        <h1 className="w-full text-5xl font-extrabold">Dashboard</h1>
        <aside className="w-full flex justify-end items-center">
          <TabsCompoent
            handleActiveTabValueChange={handleActiveTabValueChange}
          />
        </aside>
      </section>

      <section className="w-full flex flex-row gap-2 overflow-hidden">
        <aside className="w-1/5  ">
          <LeftSideInvoiceBar
            handleInvoiceValueChange={handleInvoiceValueChange}
          />
        </aside>
        <div
          className={`transition-all duration-1000 ease-in-out ${
            selectedTab === "none" ? "w-4/5" : "w-[55%]"
          }`}
        >
          <InvoiceProductTable invoice={selectedInvoice} />
        </div>
        <div
          className={`transition-all duration-1000 ease-in-out transform ${
            selectedTab !== "none"
              ? "w-[40%] translate-x-0 opacity-100"
              : "w-0 translate-x-full opacity-0"
          }`}
        >
          <div
            className={`transition-opacity duration-1000 ${
              isTableChanging ? "opacity-0" : "opacity-100"
            }`}
          >
            {selectedTab === "products" ? (
              <ProductsTable />
            ) : (
              <CustomersTable />
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
