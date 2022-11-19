import { Actions, ModalBody, OrderDetails, Overlay } from './styles';
import { Order } from '../../types/Order';
import CloseIcon from '../../assets/images/close-icon.svg';
import { formatCurrency } from '../../utils/formatCurrency';
import { useEffect } from 'react';

interface OrderModalProps {
  visible: boolean;
  order: Order | null;
  onClose: () => void;
  onCancelOrder: () => Promise<void>;
  isLoading: boolean;
  onChangeOrderStatus: () => void;
}

const orderTypes = {
  WAITING: {
    title: 'Fila de espera',
    icon: '🕒',
  },
  IN_PRODUCTION: {
    title: 'Em produção',
    icon: '👨‍🍳',
  },
  DONE: {
    title: 'Pronto!',
    icon: '✅',
  },
};

const statusTypes = {
  WAITING: {
    title: 'Iniciar Produção',
    icon: '👨‍🍳',
  },
  IN_PRODUCTION: {
    title: 'Concluir Pedido',
    icon: '✅',
  },
};

export function OrderModal({
  visible,
  order,
  onClose,
  onCancelOrder,
  isLoading,
  onChangeOrderStatus,
}: OrderModalProps) {
  {
    useEffect(() => {
      function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape') onClose();
      }
      document.addEventListener('keydown', handleKeydown);
      return () => {
        document.removeEventListener('keydown', handleKeydown);
      };
    }, [onClose]);

    if (!visible || !order) return null;

    const total = order.products.reduce((sum, item) => {
      sum += item.product.price * item.quantity;
      return sum;
    }, 0);

    return (
      <Overlay>
        <ModalBody>
          <header>
            <strong>Mesa {order.table}</strong>
            <button type="button" onClick={onClose}>
              <img src={CloseIcon} alt="fechar modal" />
            </button>
          </header>
          <div className="status-container">
            <small>Status do pedido</small>
            <div>
              <span>{orderTypes[order.status].icon}</span>
              <strong>{orderTypes[order.status].title}</strong>
            </div>
          </div>
          <OrderDetails>
            <strong>Itens</strong>
            <div className="order-items">
              {order.products.map(({ _id, product, quantity }) => (
                <div className="item" key={_id}>
                  <img
                    src={`http://localhost:5000/uploads/${product.imagePath}`}
                    alt={product.name}
                  />
                  <span className="quantity">{quantity}x</span>
                  <div className="product-details">
                    <strong>{product.name}</strong>
                    <span>{formatCurrency(product.price)}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="total">
              <span>Total</span>
              <strong>{formatCurrency(total)}</strong>
            </div>
          </OrderDetails>
          <Actions>
            {order.status !== 'DONE' && (
              <button
                type="button"
                className="primary"
                disabled={isLoading}
                onClick={onChangeOrderStatus}
              >
                <span>{statusTypes[order.status].icon}</span>
                <strong>{statusTypes[order.status].title}</strong>
              </button>
            )}
            <button
              type="button"
              className="secondary"
              onClick={onCancelOrder}
              disabled={isLoading}
            >
              Cancelar Pedido
            </button>
          </Actions>
        </ModalBody>
      </Overlay>
    );
  }
}
