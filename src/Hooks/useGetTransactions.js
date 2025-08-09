import React, { useEffect, useState } from "react";
import { db } from "../Config/firebase-config";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const { userID } = useGetUserInfo();
  const transactionCollectionRef = collection(db, "transactions");
  const getTransactions = async () => {
     let unsubscribe;
    try {
      const queryTransactions = query(
        transactionCollectionRef,
        where("userID", "==", userID),
        orderBy("createdAt")
      );

     unsubscribe = onSnapshot(queryTransactions, (snapshot) => {

        let docs = [];

        snapshot.forEach((doc) => {
            const data = doc.data();
            const id = doc.id;

            docs.push({...data, id})
        });

        setTransactions(docs);
      });
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
    return () => unsubscribe();
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return { transactions };
};
