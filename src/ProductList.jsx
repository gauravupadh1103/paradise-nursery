
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice.jsx';

const categories = [
  {
    name: 'Air Purifying Plants',
    plants: [
      { id: 1, name: 'Snake Plant', price: 18, image: 'photo-1501004318641-b39e6451bec6' },
      { id: 2, name: 'Peace Lily', price: 22, image: 'photo-1497250681960-ef046c08a56e' },
      { id: 3, name: 'Spider Plant', price: 15, image: 'photo-1459156212016-c812468e2115' },
      { id: 4, name: 'Areca Palm', price: 28, image: 'photo-1485955900006-10f4d324d411' },
      { id: 5, name: 'Boston Fern', price: 20, image: 'photo-1509423350716-97f9360b4e09' },
      { id: 6, name: 'Rubber Plant', price: 25, image: 'photo-1509423350716-97f9360b4e09' }
    ]
  },
  {
    name: 'Low Maintenance Plants',
    plants: [
      { id: 7, name: 'ZZ Plant', price: 24, image: 'photo-1485955900006-10f4d324d411' },
      { id: 8, name: 'Jade Plant', price: 16, image: 'photo-1501004318641-b39e6451bec6' },
      { id: 9, name: 'Aloe Vera', price: 12, image: 'photo-1509423350716-97f9360b4e09' },
      { id: 10, name: 'Pothos', price: 14, image: 'photo-1497250681960-ef046c08a56e' },
      { id: 11, name: 'Philodendron', price: 21, image: 'photo-1459156212016-c812468e2115' },
      { id: 12, name: 'Cast Iron Plant', price: 26, image: 'photo-1485955900006-10f4d324d411' }
    ]
  },
  {
    name: 'Decorative Plants',
    plants: [
      { id: 13, name: 'Monstera', price: 32, image: 'photo-1497250681960-ef046c08a56e' },
      { id: 14, name: 'Fiddle Leaf Fig', price: 38, image: 'photo-1501004318641-b39e6451bec6' },
      { id: 15, name: 'Calathea', price: 27, image: 'photo-1459156212016-c812468e2115' },
      { id: 16, name: 'Bird of Paradise', price: 45, image: 'photo-1485955900006-10f4d324d411' },
      { id: 17, name: 'Chinese Money Plant', price: 19, image: 'photo-1509423350716-97f9360b4e09' },
      { id: 18, name: 'Anthurium', price: 29, image: 'photo-1497250681960-ef046c08a56e' }
    ]
  }
];

function Navbar({ count }) {
  return (
    <nav className="navbar">
      <strong>Paradise Nursery</strong>
      <div>
        <Link to="/">Home</Link>
        <Link to="/plants">Plants</Link>
        <Link to="/cart">Cart ({count})</Link>
      </div>
    </nav>
  );
}

export default function ProductList() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Navbar count={count} />
      <main className="page-container">
        <h1>Our Houseplants</h1>
        <p>Find the perfect plants to make your home greener.</p>

        {categories.map((category) => (
          <section key={category.name}>
            <h2>{category.name}</h2>
            <div className="plant-grid">
              {category.plants.map((plant) => {
                const added = items.some((item) => item.id === plant.id);

                return (
                  <article className="plant-card" key={plant.id}>
                    <img
                      src={`https://images.unsplash.com/${plant.image}?auto=format&fit=crop&w=600&q=80`}
                      alt={plant.name}
                    />
                    <h3>{plant.name}</h3>
                    <p>${plant.price.toFixed(2)}</p>
                    <button
                      className="primary-button"
                      disabled={added}
                      onClick={() => dispatch(addItem(plant))}
                    >
                      {added ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </>
  );
}
