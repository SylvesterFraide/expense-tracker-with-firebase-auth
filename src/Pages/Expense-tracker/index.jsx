import React, { useState } from "react";
import { useAddTransaction } from "../../Hooks/useAddTransaction";
import { useGetTransactions } from "../../Hooks/useGetTransactions";
import { useGetUserInfo } from "../../Hooks/useGetUserInfo";
import { signOut } from "firebase/auth";
import { auth } from "../../Config/firebase-config";
import { useNavigate } from "react-router-dom";

export const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const navigate = useNavigate();
  const { transactions, transactionTotal } = useGetTransactions();
  const { name, profilePhoto } = useGetUserInfo();
  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {" "}
      <div className="expense-tracker">
        <div className="container">
          <h1>
            {" "}
            {name}'s Expense Tracker
          </h1>
          <div className="balance">
            <h3>Your Balance</h3>
            <h2>balance</h2>
          </div>
          <div className="summary">
            <div className="income">
              <h4>Income</h4>
              <p>$0.00</p>
            </div>
            <div className="expenses">
              <h4>Expenses</h4>
              <p>$0.00</p>
            </div>
          </div>
          <form onSubmit={onSubmit} className="add-transaction">
            <input
              type="text"
              placeholder="Transaction Name"
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              required
              onChange={(e) => setTransactionAmount(e.target.value)}
            />
            <input
              type="radio"
              id="expense"
              value="expense"
              checked={transactionType === "expense"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="expense">Expense</label>
            <input
              type="radio"
              id="income"
              value="income"
              checked={transactionType === "income"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="income">Income</label>

            <button type="submit">Add Transaction</button>
          </form>
        </div>
        {profilePhoto && (
          <div className="profile">
            <img src={profilePhoto} alt={`${name}'s profile`} />
            <button onClick={signOutUser}>Sign Out</button>
          </div>
        )}
      </div>
      <div className="transactions">
        <h3>Transactions</h3>
        <ul>
          {transactions.map((transaction) => {
            const { description, transactionAmount, transactionType } =
              transaction;
            return (
              <li>
                <h4>{description}</h4>
                <p>
                  ${transactionAmount} .{" "}
                  <label
                    style={{
                      color: transactionType === "expense" ? "red" : "green",
                    }}
                  >
                    {" "}
                    {transactionType}
                  </label>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
