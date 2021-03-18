import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

interface TransactionProviderProps {
  children: ReactNode
}

interface TransactionItemProps {
  id: number,
  title: string,
  type: string
  amount: number,
  category: string,
  createdAt: string;
}

type TransactionInput = Omit<TransactionItemProps, 'id' | 'createdAt'>;

interface TransactionContextData {
  transactions: TransactionItemProps[],
  createTransaction: (transction: TransactionInput) => Promise<void>;
};

export const TransactionsContext = createContext<TransactionContextData>(
  {} as TransactionContextData
);

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<TransactionItemProps[]>([]);

  useEffect(() => {
    api.get('transactions')
      .then(res => setTransactions(res.data.transactions));
  }, []);

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post('transactions', {
      ...transactionInput,
      createdAt: new Date()});
    const { transaction } = response.data;
    setTransactions([...transactions, transaction]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )

}

export function useTransactions(){
  const context = useContext(TransactionsContext);
  return context;
}