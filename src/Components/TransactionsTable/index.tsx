import { useTransactions } from "../../hooks/useTransactions";
import { Container, Table } from "./styles";

export function TransactionsTable() {

  const {transactions} = useTransactions();

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((item, index) => (
            <tr key={index}>
              <td>{item.title}</td>
              <td className={item.type}>
                {item.type === 'withdraw' && '- '}
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                }).format(item.amount)}
              </td>
              <td>{item.category}</td>
              <td>{
                new Intl.DateTimeFormat('pt-BR').format(new Date(item.createdAt))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}