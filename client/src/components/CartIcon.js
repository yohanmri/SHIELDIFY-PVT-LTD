import React from 'react';
import { useCart } from '../context/CartContext';
import '@esri/calcite-components/components/calcite-button';
import '@esri/calcite-components/components/calcite-icon';
import '@esri/calcite-components/components/calcite-chip';

export default function CartIcon({ onOpenCart }) {
    const { getCartCount } = useCart();
    const count = getCartCount();

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <calcite-button
                appearance="transparent"
                icon-start="shopping-cart"
                onClick={onOpenCart}
                scale="l"
                style={{ position: 'relative' }}
            >
                {count > 0 && (
                    <span
                        style={{
                            position: 'absolute',
                            top: '4px',
                            right: '4px',
                            background: '#dc3545',
                            color: 'white',
                            borderRadius: '50%',
                            minWidth: '20px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '11px',
                            fontWeight: '700',
                            padding: '0 4px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                        }}
                    >
                        {count}
                    </span>
                )}
            </calcite-button>
        </div>
    );
}
