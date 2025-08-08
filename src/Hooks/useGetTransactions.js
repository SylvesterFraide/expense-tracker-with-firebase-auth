import React, { useEffect, useState } from "react";
import { db } from "../Config/firebase-config";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const { userID } = useGetUserInfo();
  const transactionCollectionRef = collection(db, "transactions");
  const getTransactions = async () => {
    try {
      const queryTransactions = query(
        transactionCollectionRef,
        where("userID", "==", userID),
        orderBy("createdAt")
      );

      onSnapshot(queryTransactions, (onSnapshot) => {
        onSnapshot.forEach((doc) => {
            const data = doc.data();
        })
      })
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  return { transactions };
};
