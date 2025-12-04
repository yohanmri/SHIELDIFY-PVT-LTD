import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('shieldify_cart');
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (error) {
                console.error('Error loading cart from localStorage:', error);
                localStorage.removeItem('shieldify_cart');
            }
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('shieldify_cart', JSON.stringify(cart));
    }, [cart]);

    // Add item to cart
    const addToCart = (item, quantity = 1) => {
        setCart(prevCart => {
            const existingItemIndex = prevCart.findIndex(
                cartItem => cartItem.itemId === item._id && cartItem.itemType === item.itemType
            );

            if (existingItemIndex > -1) {
                // Item already in cart, update quantity
                const updatedCart = [...prevCart];
                updatedCart[existingItemIndex].quantity += quantity;
                return updatedCart;
            } else {
                // Determine the price based on item type
                let itemPrice = 0;
                if (item.itemType === 'product') {
                    itemPrice = item.price || 0;
                } else if (item.itemType === 'bundle') {
                    itemPrice = item.discountPrice || item.price || 0;
                }

                // New item, add to cart
                return [
                    ...prevCart,
                    {
                        itemId: item._id,
                        itemType: item.itemType, // 'product' or 'bundle'
                        itemName: item.name,
                        price: Number(itemPrice) || 0, // Ensure it's a number
                        quantity: quantity,
                        image: item.image
                    }
                ];
            }
        });
    };

    // Remove item from cart
    const removeFromCart = (itemId, itemType) => {
        setCart(prevCart =>
            prevCart.filter(item => !(item.itemId === itemId && item.itemType === itemType))
        );
    };

    // Update item quantity
    const updateQuantity = (itemId, itemType, quantity) => {
        if (quantity < 1) {
            removeFromCart(itemId, itemType);
            return;
        }

        setCart(prevCart =>
            prevCart.map(item =>
                item.itemId === itemId && item.itemType === itemType
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    // Clear entire cart
    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('shieldify_cart');
    };

    // Get total number of items in cart
    const getCartCount = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    // Get total price
    const getCartTotal = () => {
        return cart.reduce((total, item) => {
            const price = Number(item.price) || 0;
            const quantity = Number(item.quantity) || 0;
            return total + (price * quantity);
        }, 0);
    };

    // Check if item is in cart
    const isInCart = (itemId, itemType) => {
        return cart.some(item => item.itemId === itemId && item.itemType === itemType);
    };

    const value = {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartCount,
        getCartTotal,
        isInCart
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
