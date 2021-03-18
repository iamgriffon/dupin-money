import { FormEvent, useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import Modal from 'react-modal';
import closeImg from '../../assets/close.svg';
import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import { Container, TransactionTypeButton, TransactionTypeContainer } from './styles';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose} : NewTransactionModalProps) {

  const { createTransaction } = useTransactions();
  const [type, setType] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState(0);
  
  async function handleCreateNewTrx(event: FormEvent){
    event.preventDefault();
    await createTransaction({
      title,
      amount,
      category,
      type
    });
    onRequestClose();
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} overlayClassName='react-modal-overlay' className='react-modal-content'>
      <button onClick={onRequestClose} className='react-modal-close'>
        <img src={closeImg} alt="Fechar Modal"/>
      </button>
      <Container onSubmit={handleCreateNewTrx}>
        <h2>Nova Transação</h2>
        <input placeholder='Título' onChange={event => setTitle(event.target.value)}/>
        <input placeholder='Valor' type='number' onChange={event => setAmount(Number(event.target.value))} step=".01"/>
        <TransactionTypeContainer>

          <TransactionTypeButton onClick={(e) => {e.preventDefault(); setType('deposit')}} isActive={type === 'deposit'} activeColor="green">
            <img src={income} alt="Entrada"/>
            <span>Entrada</span>
          </TransactionTypeButton>
          <TransactionTypeButton onClick={(e) => {e.preventDefault(); setType('withdraw')}} isActive={type === 'withdraw'} activeColor="red">
            <img src={outcome} alt="Saída"/>
            <span>Saída</span>
          </TransactionTypeButton>

        </TransactionTypeContainer>
        <input placeholder='Categoria' onChange={event => setCategory(event.target.value)}/>
        <button type="submit">Cadastrar</button>
      </Container>
      
    </Modal>
  )
}