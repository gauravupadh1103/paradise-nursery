
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice.jsx';

export default function CartItem() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const count = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <>
      <nav className="navbar">
        <strong>Paradise Nursery</strong>
        <div>
          <Link to="/">Home</Link>
          <Link to="/plants">Plants</Link>
          <Link to="/cart">Cart ({count})</Link>
        </div>
      </nav>

      <main className="page-container">
        <h1>Your Shopping Cart</h1>

        {items.length === 0 ? (
          <section>
            <p>Your cart is empty. Start shopping for beautiful plants!</p>
            <Link className="primary-button" to="/plants">
              Continue Shopping
            </Link>
          </section>
        ) : (
          <>
            {items.map((item) => (
              <article className="cart-row" key={item.id}>
                <img
                  src={`https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=300&q=80`}
                  alt={item.name}
                />

                <div>
                  <h3>{item.name}</h3>
                  <p>Unit price: ${item.price.toFixed(2)}</p>
                  <p>
                    Item total: ${(item.price * item.quantity).toFixed(2)}
                  </p>

                  <button
                    className="secondary-button"
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: item.quantity - 1
                        })
                      )
                    }
                  >
                    −
                  </button>

                  <strong>{item.quantity}</strong>

                  <button
                    className="secondary-button"
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: item.quantity + 1
                        })
                      )
                    }
                  >
                    +
                  </button>

                  <button
                    className="danger-button"
                    onClick={() => dispatch(removeItem(item.id))}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}

            <h2>Grand Total: ${total.toFixed(2)}</h2>

            <button
              className="primary-button"
              onClick={() => window.alert('Checkout Coming Soon!')}
            >
              Checkout
            </button>

            <Link className="secondary-button" to="/plants">
              Continue Shopping
            </Link>
          </>
        )}
      </main>
    </>
  );
}
