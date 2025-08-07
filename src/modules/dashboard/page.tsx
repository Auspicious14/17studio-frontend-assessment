import { Header, Sidebar } from "@/components";
import { Transaction } from "@/models/model";
import React, { useState, useMemo, act } from "react";
import { SummaryCard } from "./components/SummaryCard";
import { TransactionTable } from "./components/TransactionTable";
import { IoEllipsisHorizontal } from "react-icons/io5";
import Image from "next/image";
import { IoMdArrowDropdown } from "react-icons/io";

export const Dashboard = () => {
  const [search, setSearch] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"Overview" | "Transactions">(
    "Overview"
  );
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      date: "2023-10-01",
      remark: "Salary",
      amount: 5000,
      currency: "USD",
      type: "Credit",
    },
    {
      id: "2",
      date: "2023-10-02",
      remark: "Groceries",
      amount: -150,
      currency: "USD",
      type: "Debit",
    },
    {
      id: "3",
      date: "2023-10-03",
      remark: "Sun Membership",
      amount: -25,
      currency: "USD",
      type: "Debit",
    },
    {
      id: "4",
      date: "2023-10-04",
      remark: "Dinner",
      amount: -60,
      currency: "USD",
      type: "Debit",
    },
    {
      id: "5",
      date: "2023-10-05",
      remark: "Movie Tickets",
      amount: -40,
      currency: "USD",
      type: "Debit",
    },
    {
      id: "6",
      date: "2023-10-06",
      remark: "Rent",
      amount: -1200,
      currency: "USD",
      type: "Debit",
    },
    {
      id: "7",
      date: "2023-10-07",
      remark: "Freelance Payment",
      amount: 800,
      currency: "USD",
      type: "Credit",
    },
    {
      id: "8",
      date: "2023-10-08",
      remark: "Car Payment",
      amount: -300,
      currency: "USD",
      type: "Debit",
    },
    {
      id: "9",
      date: "2023-10-09",
      remark: "Insurance",
      amount: -100,
      currency: "USD",
      type: "Debit",
    },
  ]);

  const dashboardSummary = useMemo(() => {
    const totalCredits = transactions
      .filter((t) => t.type === "Credit")
      .reduce((sum, t) => sum + t.amount, 0);
    const totalDebits = transactions
      .filter((t) => t.type === "Debit")
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    const totalBalance = totalCredits - totalDebits;

    return {
      totalBalance,
      totalCredits,
      totalDebits,
      totalTransactions: transactions.length,
    };
  }, [transactions]);

  const filteredTransactions = transactions?.filter((t) =>
    t.remark.toLowerCase().includes(search.toLowerCase().trim())
  );

  return (
    <div className="main">
      <Header onChange={(e) => setSearch(e)} />
      <div className="container">
        <Sidebar />
        <div className="dashboard-container">
          <div className="dashboard-header">
            <div className="dashboard-wallet">
              <div className="dashboard-wallet-tittle-toggle">
                <h1 className="dashboard-title">Wallet Ledger</h1>
                <IoMdArrowDropdown size={20} />
              </div>
              <div className="dashboard-status">
                <span></span>
                <p>Active</p>
              </div>
            </div>

            <div className="dashboard-share">
              <button className="share-button">Share</button>
              <div className="dashboard-more">
                <IoEllipsisHorizontal size={20} />
              </div>
            </div>
          </div>
          <div className="user-avatars">
            <Image
              width={20}
              height={20}
              src="/images/avatar-1.png"
              alt="Avatar"
              className="avatar"
            />
            <Image
              width={20}
              height={20}
              src="/images/avatar-2.png"
              alt="Avatar"
              className="avatar"
            />
            <Image
              width={20}
              height={20}
              src="/images/avatar-3.png"
              alt="Avatar"
              className="avatar"
            />

            <span className="avatar-count">Ava, Liam, Noah +12 others</span>
          </div>
          <div className="dashboard-tabs">
            <button
              className={`tab-button ${
                activeTab === "Overview" ? "active" : ""
              }`}
              onClick={() => setActiveTab("Overview")}
            >
              Overview
            </button>
            <button
              className={`tab-button ${
                activeTab === "Transactions" ? "active" : ""
              }`}
              onClick={() => setActiveTab("Transactions")}
            >
              Transactions
            </button>
          </div>
          <h1 className="summary-top-title">Summary</h1>

          <div className="summary-cards-grid">
            <SummaryCard
              title="Total Balance"
              value={dashboardSummary.totalBalance}
              change={100}
              changeType="positive"
            />
            <SummaryCard
              title="Total Credits"
              value={dashboardSummary.totalCredits}
              change={50}
              changeType="positive"
            />
            <SummaryCard
              title="Total Debits"
              value={dashboardSummary.totalDebits}
              change={-20}
              changeType="negative"
            />
            <SummaryCard
              title="Transactions"
              value={dashboardSummary.totalTransactions}
              change={5}
              changeType="positive"
            />
          </div>
          <div className="transaction-table-container">
            {activeTab === "Overview" && (
              <TransactionTable transactions={filteredTransactions} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
