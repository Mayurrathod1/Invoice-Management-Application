import { useState } from "react";

interface TabsProps {
  tabs?: any;
  defaultValue?: string;
  handleActiveTabValueChange: (tab: string) => void;
}

const tabsValue = [
  {
    value: "products",
    label: "Products",
    content: (
      <div className="text-sm text-gray-600 dark:text-gray-300">
        Account settings and preferences
      </div>
    ),
  },
  {
    value: "customers",
    label: "Customers",
    content: (
      <div className="text-sm text-gray-600 dark:text-gray-300">
        Manage your notification preferences
      </div>
    ),
  },
  {
    value: "none",
    label: "None",
    content: (
      <div className="text-sm text-gray-600 dark:text-gray-300">
        Manage your notification preferences
      </div>
    ),
  },
];

const TabsCompoent = ({
    tabs = tabsValue,
    defaultValue = "none",
    handleActiveTabValueChange,
  }: TabsProps) => {
    const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.value);
  
    return (
      <div className="w-[400px]">
        <div className="relative  bg-gray-100 dark:bg-slate-700 rounded-md">
          <div className="relative flex h-10 justify-evenly items-center">
            {tabs.map((tab: any) => (
              <button
                key={tab.value}
                onClick={() => {
                  setActiveTab(tab?.value);
                  handleActiveTabValueChange(tab?.value);
                }}
                className={`w-full inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 h-9 text-sm font-medium ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative transition-all duration-300 ease-in-out
                    ${
                      activeTab === tab.value
                        ? "dark:text-blue-400 bg-background m-1 my-1 text-gray-900 before:absolute before:inset-0 before:bg-white before:opacity-10 before:transition-opacity before:duration-300"
                        : "text-gray-600 dark:text-gray-400 hover:bg-white/5"
                    }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

export default TabsCompoent;
