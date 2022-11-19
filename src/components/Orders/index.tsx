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

  return (
    <Container>
      <OrdersBoard icon="🕒" title="Fila de espera" orders={waiting} />
      <OrdersBoard icon="👨‍🍳" title="Em produção" orders={production} />
      <OrdersBoard icon="✅" title="Pronto" orders={done} />
    </Container>
  );
}
