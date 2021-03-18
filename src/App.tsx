import Modal from "react-modal";
import { useState } from "react";
import { Dashboard } from "./Components/Dashboard";
import { Header } from "./Components/header";
import { GlobalStyle } from "./styles/global";
import { NewTransactionModal } from "./Components/NewTransactionModal";
import { TransactionsProvider } from "./hooks/useTransactions";

Modal.setAppElement('#root');

export function App() {

  const [isTrxModalOpen, setTrxModalOpen] = useState(false);

  function handleOpenTrxModal(){
    setTrxModalOpen(true);
  };

  function handleCloseTrxModal(){
    setTrxModalOpen(false);
  };

  return (
    <TransactionsProvider>
      <Header openModal={handleOpenTrxModal} />
      <Dashboard />
      <NewTransactionModal isOpen={isTrxModalOpen} onRequestClose={handleCloseTrxModal}/>
      <GlobalStyle />
    </TransactionsProvider>
  );
}