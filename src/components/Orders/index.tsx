import { useEffect, useState } from 'react';
import { OrdersBoard } from '../OrdersBoard';
import { Container } from './styles';
import { Order } from '../../types/Order';
import { api } from '../../libs/axios';

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    api.get('/orders').then((response) => setOrders(response.data));
  }, []);

  const waiting = orders.filter((order) => order.status === 'WAITING');
  const production = orders.filter((order) => order.status === 'IN_PRODUCTION');
  const done = orders.filter((order) => order.status === 'DONE');

  function handleCancelOrder(orderId: string) {
    setOrders((prevState) =>
      prevState.filter((orders) => orders._id !== orderId)
    );
  }

  return (
    <Container>
      <OrdersBoard
        icon="🕒"
        title="Fila de espera"
        orders={waiting}
        onCancelOrder={handleCancelOrder}
      />
      <OrdersBoard
        icon="👨‍🍳"
        title="Em produção"
        orders={production}
        onCancelOrder={handleCancelOrder}
      />
      <OrdersBoard
        icon="✅"
        title="Pronto"
        orders={done}
        onCancelOrder={handleCancelOrder}
      />
    </Container>
  );
}
