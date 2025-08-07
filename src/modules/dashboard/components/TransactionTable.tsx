import React, { useState } from "react";
import { ITransaction } from "@/models/model";
import { MdArrowDropDown } from "react-icons/md";

interface ITransactionTableProps {
  transactions: ITransaction[];
}

export const TransactionTable: React.FC<ITransactionTableProps> = ({
  transactions,
}) => {
  const [sortColumn, setSortColumn] = useState<keyof ITransaction | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (column: keyof ITransaction) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    if (sortColumn === "date" || sortColumn === "amount") {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }
    }
    return 0;
  });

  return (
    <table className="transaction-table">
      <thead>
        <tr>
          <th className="sortable" onClick={() => handleSort("date")}>
            <div className="transaction-table-header">
              Date
              <MdArrowDropDown
                className={`sort-icon ${
                  sortDirection === "desc" ? "rotate-180" : ""
                }`}
              />
            </div>
          </th>
          <th>
            <div className="transaction-table-header">
              Remark
              <MdArrowDropDown
                className={`sort-icon ${
                  sortDirection === "desc" ? "rotate-180" : ""
                }`}
              />
            </div>
          </th>
          <th className="sortable" onClick={() => handleSort("amount")}>
            <div className="transaction-table-header">
              Amount
              <MdArrowDropDown
                className={`sort-icon ${
                  sortDirection === "desc" ? "rotate-180" : ""
                }`}
              />
            </div>
          </th>
          <th>
            <div className="transaction-table-header">
              Currency
              <MdArrowDropDown
                className={`sort-icon ${
                  sortDirection === "desc" ? "rotate-180" : ""
                }`}
              />
            </div>
          </th>
          <th>
            <div className="transaction-table-header">
              Type
              <MdArrowDropDown
                className={`sort-icon ${
                  sortDirection === "desc" ? "rotate-180" : ""
                }`}
              />
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedTransactions.map((transaction, index) => (
          <tr key={index}>
            <td className="transaction-table-data">{transaction.date}</td>
            <td className="transaction-table-data">{transaction.remark}</td>
            <td className="transaction-table-data">{transaction.amount}</td>
            <td className="transaction-table-data">{transaction.currency}</td>
            <td className="transaction-table-data">
              <span
                className={`transaction-type-badge ${
                  transaction.type === "Credit"
                    ? "transaction-type-credit"
                    : "transaction-type-debit"
                }`}
              >
                {transaction.type}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
