import Modal from "../Modal";
import { motion, useAnimate, stagger } from "framer-motion";
import { useSelector } from "react-redux";

const CartModal = ({ onClose }) => {
  const cartItems = useSelector((state) => state.cart.items);

  console.log(cartItems);

  return (
    <Modal onClose={onClose}>
      <div>
        <h3>Shopping Cart</h3>
        <p>icon</p>
      </div>

      <div>
        {cartItems.map((item) => {
          <div>
            <img src={item.image} alt="" />
            <div>
              <h4>{item.name}</h4>
              <p>
                {item.number} x ${item.price}{" "}
              </p>
            </div>
            <span>x icon</span>
          </div>;
        })}

        <p>Total: {}</p>
      </div>

      <div>actions</div>
    </Modal>
  );
};

export default CartModal;
