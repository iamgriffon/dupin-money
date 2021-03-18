import { Container } from "./styles";
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';
import { useTransactions } from "../../hooks/useTransactions";

export function Summary() {

  const { transactions } = useTransactions();

  const summary = transactions.reduce((accumulator, item) => {
    if (item.type === 'deposit') {
      accumulator.deposits += item.amount;
      accumulator.total += item.amount;
    } else {
      accumulator.withdraws += item.amount;
      accumulator.total -= item.amount;
    }
    return accumulator;
  }, { deposits: 0, withdraws: 0, total: 0 });

  function formatToCurrency(item: number){
    const number = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(item);
    return number;
  }

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>{formatToCurrency(summary.deposits)}</strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="" />
        </header>
        <strong>{formatToCurrency(summary.withdraws)}</strong>
      </div>
      <div className="hightlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="" />
        </header>
        <strong>{formatToCurrency(summary.total)}</strong>
      </div>
    </Container>
  )
}