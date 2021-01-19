import React from 'react';
import styled from 'styled-components';
import css from '@styled-system/css';
import { useCart } from 'contexts/cart/use-cart';
import { Counter } from './counter/counter';

const Button = styled.button(
  css({
    width: 36,
    height: 36,
    borderRadius: 6,
    transition: '0.35s ease-in-out',
    backgroundColor: '#fff',
    border: '1px solid',
    borderColor: '#e6e6e6',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'primary.regular',
      borderColor: 'primary.regular',
      color: '#fff',
    },
  })
);
interface Props {
  data: any;
}

export const AddItemToCart = ({ data }: Props) => {
  const { addItem, removeItem, getItem, isInCart } = useCart();
  const handleAddClick = (e) => {
    e.stopPropagation();
    addItem(data);
    // if (!isInCart(data.id)) {
    //   cartAnimation(e);
    // }
  };
  const handleRemoveClick = (e) => {
    e.stopPropagation();
    removeItem(data);
  };
  return !isInCart(data.id) ? (
    <Button aria-label='add item to cart' onClick={handleAddClick}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='10'
        height='10'
        viewBox='0 0 10 10'
      >
        <path
          data-name='Path 9'
          d='M143.407,137.783h-1.25v4.375h-4.375v1.25h4.375v4.375h1.25v-4.375h4.375v-1.25h-4.375Z'
          transform='translate(-137.782 -137.783)'
          fill='currentColor'
        ></path>
      </svg>
    </Button>
  ) : (
    <Counter
      value={getItem(data.id).quantity}
      onDecrement={handleRemoveClick}
      onIncrement={handleAddClick}
      className='card-counter'
      variant='altHorizontal'
    />
  );
};
