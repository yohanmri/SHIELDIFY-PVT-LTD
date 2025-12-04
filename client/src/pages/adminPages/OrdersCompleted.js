import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/adminComponents/AdminNavbar';
import AdminSidebar from '../../components/adminComponents/AdminSidebar';
import API from '../../api/axios';
import '@esri/calcite-components/components/calcite-shell';
import '@esri/calcite-components/components/calcite-button';
import '@esri/calcite-components/components/calcite-card';
import '@esri/calcite-components/components/calcite-chip';
import '@esri/calcite-components/components/calcite-input';
import '@esri/calcite-components/components/calcite-modal';
import '@esri/calcite-components/components/calcite-label';
import '@esri/calcite-components/components/calcite-notice';
import '@esri/calcite-components/components/calcite-list';
import '@esri/calcite-components/components/calcite-list-item';
import '@esri/calcite-components/components/calcite-loader';

export default function AdminOrdersCompleted() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // TEMPORARY: Mock data - only completed/delivered orders
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCompletedOrders();
  }, []);

  const fetchCompletedOrders = async () => {
    try {
      setLoading(true);
      const response = await API.get('/orders/completed');
      const ordersData = response.data?.data || [];
      setOrders(Array.isArray(ordersData) ? ordersData : []);
      setError(null);
    } catch (err) {
      console.error('Error fetching completed orders:', err);
      setError('Failed to load completed orders. Please try again.');
      setOrders([]); // Ensure orders is always an array
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch =
        (order.orderReference?.toLowerCase() || order.orderNumber?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (order.customerName?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (order.customerEmail?.toLowerCase() || '').includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [searchQuery, orders]);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setDetailModalOpen(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, order) => sum + order.totalAmount, 0);
  }, [orders]);

  return (
    <calcite-shell>
      <AdminNavbar />
      <AdminSidebar />

      <div style={{ padding: '24px', height: '100%', overflow: 'auto' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div>
              <h1 style={{ margin: '0 0 8px 0', fontSize: '28px', fontWeight: '600' }}>
                Completed Orders
              </h1>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--calcite-ui-text-3)' }}>
                View all successfully delivered orders
              </p>
            </div>
            <calcite-button
              appearance="outline"
              icon-start="arrow-left"
              onClick={() => navigate('/admin/orders-list')}
            >
              Back to All Orders
            </calcite-button>
          </div>

          {/* Stats Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <calcite-card>
              <div style={{ padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: '700', color: '#28a745' }}>
                  {orders.length}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)', marginTop: '4px' }}>
                  Total Completed
                </div>
              </div>
            </calcite-card>
            <calcite-card>
              <div style={{ padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--calcite-ui-brand)' }}>
                  LKR {(totalRevenue / 1000).toFixed(0)}K
                </div>
                <div style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)', marginTop: '4px' }}>
                  Total Revenue
                </div>
              </div>
            </calcite-card>
          </div>

          {error && (
            <calcite-notice open icon="exclamation-mark-triangle" kind="danger" style={{ marginBottom: '20px' }}>
              <div slot="title">Error</div>
              <div slot="message">{error}</div>
            </calcite-notice>
          )}

          <div style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '24px',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            <calcite-input
              type="text"
              placeholder="Search by order number, customer name, or email..."
              value={searchQuery}
              onCalciteInputInput={(e) => setSearchQuery(e.target.value)}
              icon="search"
              clearable
              style={{ flex: '1', minWidth: '300px' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <calcite-chip icon="check-circle" kind="success">
              {filteredOrders.length} completed orders
            </calcite-chip>
          </div>

          {loading && (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <calcite-loader scale="l"></calcite-loader>
              <p style={{ marginTop: '16px', color: 'var(--calcite-ui-text-3)' }}>
                Loading completed orders...
              </p>
            </div>
          )}

          {!loading && (
            <calcite-list>
              {filteredOrders.map(order => (
                <calcite-list-item
                  key={order._id}
                  label={`${order.orderNumber} - ${order.customerName}`}
                  description={`${order.items.length} items • Delivered: ${formatDate(order.deliveryDate)}`}
                >
                  <div slot="content-start" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    minWidth: '100px'
                  }}>
                    <calcite-chip scale="s" kind="success" icon="check-circle">
                      DELIVERED
                    </calcite-chip>
                  </div>

                  <div slot="content-end" style={{
                    display: 'flex',
                    gap: '12px',
                    alignItems: 'center'
                  }}>
                    <div style={{ textAlign: 'right', minWidth: '120px' }}>
                      <div style={{ fontSize: '12px', color: 'var(--calcite-ui-text-3)' }}>
                        Total Amount
                      </div>
                      <div style={{ fontWeight: '700', fontSize: '18px', color: '#28a745' }}>
                        LKR {order.totalAmount.toLocaleString()}
                      </div>
                    </div>
                    <calcite-button
                      appearance="outline"
                      icon-start="information"
                      scale="s"
                      onClick={() => handleViewDetails(order)}
                    >
                      View Details
                    </calcite-button>
                  </div>
                </calcite-list-item>
              ))}
            </calcite-list>
          )}

          {!loading && filteredOrders.length === 0 && (
            <calcite-notice open icon="exclamation-mark-triangle" kind="warning">
              <div slot="title">No completed orders found</div>
              <div slot="message">Try adjusting your search terms</div>
            </calcite-notice>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      <calcite-modal
        open={detailModalOpen}
        onCalciteModalClose={() => setDetailModalOpen(false)}
        width-scale="l"
      >
        <div slot="header">Order Details</div>
        <div slot="content" style={{ padding: '20px' }}>
          {selectedOrder && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <calcite-notice open icon="check-circle" kind="success">
                <div slot="title">Order Completed Successfully</div>
                <div slot="message">
                  This order was delivered on {formatDate(selectedOrder.deliveryDate)}
                </div>
              </calcite-notice>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>
                    Order Information
                  </h3>
                  <div style={{ fontSize: '14px' }}>
                    <p><strong>Order Number:</strong> {selectedOrder.orderNumber}</p>
                    <p><strong>Order Date:</strong> {formatDate(selectedOrder.orderDate)}</p>
                    <p><strong>Delivery Date:</strong> {formatDate(selectedOrder.deliveryDate)}</p>
                    <p><strong>Payment Status:</strong> <calcite-chip scale="s" kind="success">{selectedOrder.paymentStatus}</calcite-chip></p>
                  </div>
                </div>

                <div>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>
                    Customer Information
                  </h3>
                  <div style={{ fontSize: '14px' }}>
                    <p><strong>Name:</strong> {selectedOrder.customerName}</p>
                    <p><strong>Email:</strong> {selectedOrder.customerEmail}</p>
                    <p><strong>Phone:</strong> {selectedOrder.customerPhone}</p>
                    <p><strong>Address:</strong> {selectedOrder.shippingAddress}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>
                  Order Items
                </h3>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--calcite-ui-border-2)' }}>
                      <th style={{ textAlign: 'left', padding: '8px' }}>Product</th>
                      <th style={{ textAlign: 'center', padding: '8px' }}>Quantity</th>
                      <th style={{ textAlign: 'right', padding: '8px' }}>Price</th>
                      <th style={{ textAlign: 'right', padding: '8px' }}>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item, index) => (
                      <tr key={index} style={{ borderBottom: '1px solid var(--calcite-ui-border-2)' }}>
                        <td style={{ padding: '8px' }}>{item.productName}</td>
                        <td style={{ textAlign: 'center', padding: '8px' }}>{item.quantity}</td>
                        <td style={{ textAlign: 'right', padding: '8px' }}>
                          LKR {item.price.toLocaleString()}
                        </td>
                        <td style={{ textAlign: 'right', padding: '8px' }}>
                          LKR {(item.quantity * item.price).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="3" style={{ textAlign: 'right', padding: '12px', fontWeight: '700' }}>
                        Total Amount:
                      </td>
                      <td style={{ textAlign: 'right', padding: '12px', fontWeight: '700', fontSize: '18px', color: '#28a745' }}>
                        LKR {selectedOrder.totalAmount.toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}
        </div>
        <calcite-button slot="primary" onClick={() => setDetailModalOpen(false)}>
          Close
        </calcite-button>
      </calcite-modal>
    </calcite-shell>
  );
}