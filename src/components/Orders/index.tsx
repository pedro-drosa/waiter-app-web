import { OrdersBoard } from '../OrdersBoard';
import { Container } from './styles';

import { orders } from '../../mocks/Orders.mock';

export function Orders() {
  return (
    <Container>
      <OrdersBoard icon="🕒" title="Fila de espera" orders={orders} />
      <OrdersBoard icon="👨‍🍳" title="Em produção" orders={[]} />
      <OrdersBoard icon="✅" title="Pronto" orders={[]} />
    </Container>
  );
}
