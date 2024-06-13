import React from "react"
import styles from "./cart-item-actions.module.scss";
import NumberToggle from "@/app/shared/components/form/form-inputs/number-toggle/NumberToggle";
import CloseButton from "@/app/shared/components/buttons/close/CloseButton";
import Button from "@/app/shared/components/buttons/primary/PrimaryButton";
import { useContext, useState } from 'react';
import { Cart } from "@/app/shared/context/CartState";
import Modal from "@/app/shared/components/modal/modal";



const CartItemActions = ({cartItem}) => {

    const { handleAddSingleItemToCart, handleRemoveSingleItemFromCart, deleteFromCart } = useContext(Cart);
  
    const [modalVisible, setModalVisible] = useState(false)

    const handleDecrement = () => {
        if (cartItem.quantity === 1) {
          setModalVisible(true);
          return cartItem.quantity;
        }
    
        handleRemoveSingleItemFromCart(cartItem.id);
    
        return cartItem.quantity;
      }
    
      const handleDeleteFromCart = () => {
    
        deleteFromCart(cartItem.id);
        setModalVisible(false);
    
        return cartItem.quantity;
      }
    
      const handleIncrement = () => {
        handleAddSingleItemToCart(cartItem);
    
        return cartItem.quantity;
      }
    
      const handleModalClosed = () => {
        setModalVisible(false);
      }


  return (
    <>
        <div className={styles.actions}>
            <NumberToggle
                    defaultQuantity={cartItem.quantity}
                    externalIncrementHandler={handleIncrement}
                    externalDecrementHandler={handleDecrement}
            ></NumberToggle>
            <CloseButton onClickFunction={() => setModalVisible(true)}></CloseButton>
        </div>
        
        <Modal modalVisible={modalVisible} modalStyles={styles.modal} handleModalClosed={() => handleModalClosed()}>
            <h4>Remove item from cart?</h4>
            <p>This will remove the last item from your cart, do you wish to continue?</p>
            <div className={styles.modal__buttons}>
              <Button buttonText="Remove Item" onClickFunction={() => handleDeleteFromCart()}></Button>
              <Button buttonText="Cancel" isSecondary={true} onClickFunction={() => setModalVisible(false)}></Button>
            </div>
        </Modal>
    </>
  )
};

export default CartItemActions;
