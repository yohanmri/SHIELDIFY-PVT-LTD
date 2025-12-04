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
                    <calcite-chip
                        scale="s"
                        kind="brand"
                        style={{
                            position: 'absolute',
                            top: '4px',
                            right: '4px',
                            minWidth: '20px',
                            height: '20px',
                            padding: '0 6px',
                            fontSize: '11px',
                            fontWeight: '700'
                        }}
                    >
                        {count}
                    </calcite-chip>
                )}
            </calcite-button>
        </div>
    );
}
