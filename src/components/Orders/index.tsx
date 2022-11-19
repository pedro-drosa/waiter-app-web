import { useEffect, useState } from 'react';
import socketIo from 'socket.io-client';
import { OrdersBoard } from '../OrdersBoard';
import { Container } from './styles';
import { Order } from '../../types/Order';
import { api } from '../../libs/axios';

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const io = socketIo('http://localhost:5000', {
      transports: ['websocket'],
    });
    io.on('order@new', (order) => {
      setOrders((prevState) => [...prevState, order]);
    });
  }, []);

  useEffect(() => {
    api.get('/orders').then((response) => setOrders(response.data));
  }, []);

  const waiting = orders.filter((order) => order.status === 'WAITING');
  const production = orders.filter((order) => order.status === 'IN_PRODUCTION');
  const done = orders.filter((order) => order.status === 'DONE');

  function handleCancelOrder(orderId: string) {
    setOrders((prevState) => {
      return prevState.filter((orders) => orders._id !== orderId);
    });
  }

  function handleOrderStatusChange(orderId: string, status: Order['status']) {
    setOrders((prevState) => {
      return prevState.map((order) => {
        return order._id === orderId ? { ...order, status } : order;
      });
    });
  }

  return (
    <Container>
      <OrdersBoard
        icon="🕒"
        title="Fila de espera"
        orders={waiting}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
      <OrdersBoard
        icon="👨‍🍳"
        title="Em produção"
        orders={production}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
      <OrdersBoard
        icon="✅"
        title="Pronto"
        orders={done}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleOrderStatusChange}
      />
    </Container>
  );
}
