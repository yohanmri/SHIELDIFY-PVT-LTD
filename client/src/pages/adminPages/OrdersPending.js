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
import '@esri/calcite-components/components/calcite-select';
import '@esri/calcite-components/components/calcite-option';
import '@esri/calcite-components/components/calcite-notice';
import '@esri/calcite-components/components/calcite-list';
import '@esri/calcite-components/components/calcite-list-item';
import '@esri/calcite-components/components/calcite-loader';

export default function AdminOrdersPending() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [processModalOpen, setProcessModalOpen] = useState(false);

  // TEMPORARY: Mock data - only pending orders
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPendingOrders();
  }, []);

  const fetchPendingOrders = async () => {
    try {
      setLoading(true);
      const response = await API.get('/orders/pending');
      const ordersData = response.data?.data || [];
      setOrders(Array.isArray(ordersData) ? ordersData : []);
      setError(null);
    } catch (err) {
      console.error('Error fetching pending orders:', err);
      setError('Failed to load pending orders. Please try again.');
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

  const handleProcessOrder = (order) => {
    setSelectedOrder(order);
    setProcessModalOpen(true);
  };

  const confirmProcess = async (action) => {
    try {
      // action can be 'approved' or 'declined'
      await API.put(`/orders/${selectedOrder._id}/status`, { status: action });
      // Remove from pending list after processing
      setOrders(orders.filter(o => o._id !== selectedOrder._id));
      setProcessModalOpen(false);
      setSelectedOrder(null);
      // Optionally refresh the list
      fetchPendingOrders();
    } catch (err) {
      console.error('Error processing order:', err);
      alert('Failed to process order. Please try again.');
    }
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

  const getWaitingTime = (orderDate) => {
    const now = new Date();
    const ordered = new Date(orderDate);
    const hours = Math.floor((now - ordered) / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  const totalPendingValue = useMemo(() => {
    return orders.reduce((sum, order) => sum + order.totalAmount, 0);
  }, [orders]);

  const paidOrders = useMemo(() => {
    return orders.filter(o => o.paymentStatus === 'paid').length;
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
                Pending Orders
              </h1>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--calcite-ui-text-3)' }}>
                Orders awaiting processing and fulfillment
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <calcite-card>
              <div style={{ padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: '700', color: '#ffa500' }}>
                  {orders.length}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)', marginTop: '4px' }}>
                  Pending Orders
                </div>
              </div>
            </calcite-card>
            <calcite-card>
              <div style={{ padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--calcite-ui-brand)' }}>
                  LKR {(totalPendingValue / 1000).toFixed(0)}K
                </div>
                <div style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)', marginTop: '4px' }}>
                  Total Value
                </div>
              </div>
            </calcite-card>
            <calcite-card>
              <div style={{ padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: '700', color: '#28a745' }}>
                  {paidOrders}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)', marginTop: '4px' }}>
                  Payment Received
                </div>
              </div>
            </calcite-card>
          </div>

          {orders.length > 0 && (
            <calcite-notice open icon="exclamation-mark-circle" kind="warning" style={{ marginBottom: '20px' }}>
              <div slot="title">Action Required</div>
              <div slot="message">
                You have {orders.length} pending order{orders.length > 1 ? 's' : ''} waiting to be processed.
              </div>
            </calcite-notice>
          )}

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
            <calcite-chip icon="clock" kind="warning">
              {filteredOrders.length} pending orders
            </calcite-chip>
          </div>

          {loading && (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <calcite-loader scale="l"></calcite-loader>
              <p style={{ marginTop: '16px', color: 'var(--calcite-ui-text-3)' }}>
                Loading pending orders...
              </p>
            </div>
          )}

          {!loading && (
            <calcite-list>
              {filteredOrders.map(order => (
                <calcite-list-item
                  key={order._id}
                  label={`${order.orderNumber} - ${order.customerName}`}
                  description={`${order.items.length} items • Ordered ${getWaitingTime(order.createdAt)}`}
                >
                  <div slot="content-start" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    minWidth: '120px'
                  }}>
                    <calcite-chip scale="s" kind="warning" icon="clock">
                      PENDING
                    </calcite-chip>
                    <calcite-chip scale="s" kind={order.paymentStatus === 'paid' ? 'success' : 'neutral'}>
                      {order.paymentStatus === 'paid' ? 'PAID' : 'PAYMENT PENDING'}
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
                      <div style={{ fontWeight: '700', fontSize: '18px', color: 'var(--calcite-ui-brand)' }}>
                        LKR {order.totalAmount.toLocaleString()}
                      </div>
                    </div>
                    <button
                      onClick={() => handleViewDetails(order)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '4px',
                        border: '1px solid #0079c1',
                        background: 'white',
                        color: '#0079c1',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '600',
                        marginRight: '8px'
                      }}
                    >
                      Details
                    </button>
                    <button
                      onClick={() => handleProcessOrder(order)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '4px',
                        border: 'none',
                        background: '#0079c1',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '600'
                      }}
                    >
                      Process
                    </button>
                  </div>
                </calcite-list-item>
              ))}
            </calcite-list>
          )}

          {!loading && filteredOrders.length === 0 && (
            <calcite-notice open icon="check-circle" kind="success">
              <div slot="title">All caught up!</div>
              <div slot="message">No pending orders at the moment.</div>
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
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>
                    Order Information
                  </h3>
                  <div style={{ fontSize: '14px' }}>
                    <p><strong>Order Number:</strong> {selectedOrder.orderNumber}</p>
                    <p><strong>Order Date:</strong> {formatDate(selectedOrder.createdAt)}</p>
                    <p><strong>Waiting Time:</strong> {getWaitingTime(selectedOrder.createdAt)}</p>
                    <p><strong>Status:</strong> <calcite-chip scale="s" kind="warning">PENDING</calcite-chip></p>
                    <p><strong>Payment Status:</strong> <calcite-chip scale="s" kind={selectedOrder.paymentStatus === 'paid' ? 'success' : 'neutral'}>{selectedOrder.paymentStatus}</calcite-chip></p>
                  </div>
                </div>

                <div>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>
                    Customer Information
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <p><strong>Customer Name:</strong> {selectedOrder.customerName}</p>
                    <p><strong>Email:</strong> {selectedOrder.customerEmail}</p>
                    <p><strong>Phone:</strong> {selectedOrder.customerPhone}</p>
                    <p><strong>Order Date:</strong> {formatDate(selectedOrder.createdAt)}</p>
                    <p><strong>Order Reference:</strong> {selectedOrder.orderReference || selectedOrder.orderNumber}</p>
                    <p><strong>Total Amount:</strong> LKR {(selectedOrder.totalAmount || 0).toLocaleString()}</p>
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
                      <td style={{ textAlign: 'right', padding: '12px', fontWeight: '700', fontSize: '18px' }}>
                        LKR {selectedOrder.totalAmount.toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}
        </div>
        <calcite-button
          slot="primary"
          onClick={() => {
            setDetailModalOpen(false);
            if (selectedOrder?.paymentStatus === 'paid') {
              handleProcessOrder(selectedOrder);
            }
          }}
          disabled={selectedOrder?.paymentStatus !== 'paid'}
        >
          Process Order
        </calcite-button>
        <calcite-button slot="secondary" appearance="outline" onClick={() => setDetailModalOpen(false)}>
          Close
        </calcite-button>
      </calcite-modal>

      {/* Process Order Confirmation Modal */}
      <calcite-modal
        open={processModalOpen}
        onCalciteModalClose={() => setProcessModalOpen(false)}
        width-scale="s"
      >
        <div slot="header">Process Order</div>
        <div slot="content" style={{ padding: '20px' }}>
          {selectedOrder && (
            <div>
              <calcite-notice open icon="information" kind="brand">
                <div slot="title">Confirm Action</div>
                <div slot="message">
                  Please approve or decline order <strong>{selectedOrder.orderReference || selectedOrder.orderNumber}</strong>.
                  This action cannot be undone.
                </div>
              </calcite-notice>
            </div>
          )}\n        </div>
        <div slot="footer" style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', padding: '16px' }}>
          <button
            onClick={() => setProcessModalOpen(false)}
            style={{
              padding: '10px 20px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              background: 'white',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              color: '#333'
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => confirmProcess('rejected')}
            style={{
              padding: '10px 20px',
              borderRadius: '4px',
              border: 'none',
              background: '#dc2626',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              color: 'white'
            }}
          >
            Reject
          </button>
          <button
            onClick={() => confirmProcess('approved')}
            style={{
              padding: '10px 20px',
              borderRadius: '4px',
              border: 'none',
              background: '#16a34a',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              color: 'white'
            }}
          >
            Approve
          </button>
        </div>
      </calcite-modal>
    </calcite-shell>
  );
}