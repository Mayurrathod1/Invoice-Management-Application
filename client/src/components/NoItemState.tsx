import { Users } from "lucide-react";
import React from "react";

type Props = {
  itemName: string;
};

const NoItemState = ({ itemName }: Props) => {
  return (
    <tr>
      <td colSpan={3} className="px-6 py-16">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
            <Users className="w-6 h-6 text-gray-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700">
            No {itemName} Found
          </h3>
          <p className="text-sm text-gray-500">
            There are no {itemName} in the system yet.
          </p>
        </div>
      </td>
    </tr>
  );
};

export default NoItemState;
