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
import '@esri/calcite-components/components/calcite-select';
import '@esri/calcite-components/components/calcite-option';
import '@esri/calcite-components/components/calcite-modal';
import '@esri/calcite-components/components/calcite-label';
import '@esri/calcite-components/components/calcite-notice';
import '@esri/calcite-components/components/calcite-list';
import '@esri/calcite-components/components/calcite-list-item';
import '@esri/calcite-components/components/calcite-loader';

export default function AdminOrdersList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  // TEMPORARY: Mock data
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const statusOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'delivered', label: 'Delivered' }
  ];

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await API.get('/orders');
      // getAllOrders returns { success, data: { orders, totalPages, currentPage, totalOrders } }
      const ordersData = response.data?.data?.orders || response.data?.data || [];
      setOrders(Array.isArray(ordersData) ? ordersData : []);
      setError(null);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders. Please try again.');
      setOrders([]); // Ensure orders is always an array
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
      const matchesSearch =
        (order.orderReference?.toLowerCase() || order.orderNumber?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (order.customerName?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (order.customerEmail?.toLowerCase() || '').includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [selectedStatus, searchQuery, orders]);

  const getStatusChipKind = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'processing': return 'brand';
      case 'shipped': return 'info';
      case 'delivered': return 'success';
      case 'cancelled': return 'danger';
      default: return 'neutral';
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setDetailModalOpen(true);
  };

  const handleStatusChange = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setStatusModalOpen(true);
  };

  const confirmStatusChange = async () => {
    try {
      await API.put(`/orders/${selectedOrder._id}/status`, { status: newStatus });
      setOrders(orders.map(o =>
        o._id === selectedOrder._id ? { ...o, status: newStatus } : o
      ));
      setStatusModalOpen(false);
      setSelectedOrder(null);
      // Show success notification
      alert(`Order status updated to ${newStatus} successfully!`);
      // Refresh orders from backend
      fetchOrders();
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update order status. Please try again.');
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

  const orderStats = useMemo(() => {
    return {
      total: orders.length,
      pending: orders.filter(o => o.status === 'pending').length,
      approved: orders.filter(o => o.status === 'approved').length,
      rejected: orders.filter(o => o.status === 'rejected').length,
      delivered: orders.filter(o => o.status === 'delivered').length
    };
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
                All Orders
              </h1>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--calcite-ui-text-3)' }}>
                Manage customer orders and track deliveries
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <calcite-card>
              <div style={{ padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: '700', color: 'var(--calcite-ui-brand)' }}>
                  {orderStats.total}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)', marginTop: '4px' }}>
                  Total Orders
                </div>
              </div>
            </calcite-card>
            <calcite-card>
              <div style={{ padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: '700', color: '#ffa500' }}>
                  {orderStats.pending}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)', marginTop: '4px' }}>
                  Pending
                </div>
              </div>
            </calcite-card>
            <calcite-card>
              <div style={{ padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: '700', color: '#0079c1' }}>
                  {orderStats.approved}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)', marginTop: '4px' }}>
                  Approved
                </div>
              </div>
            </calcite-card>
            <calcite-card>
              <div style={{ padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: '700', color: '#dc2626' }}>
                  {orderStats.rejected}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)', marginTop: '4px' }}>
                  Rejected
                </div>
              </div>
            </calcite-card>
            <calcite-card>
              <div style={{ padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: '700', color: '#28a745' }}>
                  {orderStats.delivered}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)', marginTop: '4px' }}>
                  Delivered
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

            <calcite-select
              value={selectedStatus}
              onCalciteSelectChange={(e) => setSelectedStatus(e.target.value)}
              style={{ width: '200px' }}
            >
              {statusOptions.map(option => (
                <calcite-option key={option.value} value={option.value}>
                  {option.label}
                </calcite-option>
              ))}
            </calcite-select>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <calcite-chip>{filteredOrders.length} orders</calcite-chip>
          </div>

          {loading && (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <calcite-loader scale="l"></calcite-loader>
              <p style={{ marginTop: '16px', color: 'var(--calcite-ui-text-3)' }}>
                Loading orders...
              </p>
            </div>
          )}

          {!loading && (
            <calcite-list>
              {filteredOrders.map(order => (
                <calcite-list-item
                  key={order._id}
                  label={`${order.orderReference || 'Order'} - ${order.customerName}`}
                  description={`${order.items.length} items • ${formatDate(order.createdAt)}`}
                >
                  <div slot="content-start" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    minWidth: '100px'
                  }}>
                    <calcite-chip scale="s" kind={getStatusChipKind(order.status)}>
                      {order.status.toUpperCase()}
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
                    <calcite-button
                      appearance="outline"
                      icon-start="information"
                      scale="s"
                      onClick={() => handleViewDetails(order)}
                    >
                      Details
                    </calcite-button>
                    <calcite-button
                      appearance="outline"
                      icon-start="refresh"
                      scale="s"
                      onClick={() => handleStatusChange(order)}
                    >
                      Status
                    </calcite-button>
                  </div>
                </calcite-list-item>
              ))}
            </calcite-list>
          )}

          {!loading && filteredOrders.length === 0 && (
            <calcite-notice open icon="exclamation-mark-triangle" kind="warning">
              <div slot="title">No orders found</div>
              <div slot="message">Try adjusting your filters or search terms</div>
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
                    <p><strong>Order Reference:</strong> {selectedOrder.orderReference || 'N/A'}</p>
                    <p><strong>Order Date:</strong> {formatDate(selectedOrder.createdAt)}</p>
                    <p><strong>Status:</strong> <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      background: selectedOrder.status === 'pending' ? '#fef3c7' :
                        selectedOrder.status === 'approved' ? '#d1fae5' :
                          selectedOrder.status === 'rejected' ? '#fee2e2' : '#dcfce7',
                      color: selectedOrder.status === 'pending' ? '#92400e' :
                        selectedOrder.status === 'approved' ? '#065f46' :
                          selectedOrder.status === 'rejected' ? '#991b1b' : '#166534',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {selectedOrder.status.toUpperCase()}
                    </span></p>
                    <p><strong>Total Amount:</strong> LKR {(selectedOrder.totalAmount || 0).toLocaleString()}</p>
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
                    {selectedOrder.notes && (
                      <p><strong>Notes:</strong> {selectedOrder.notes}</p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>
                  Order Items
                </h3>
                <div style={{ border: '1px solid var(--calcite-ui-border-3)', borderRadius: '4px', overflow: 'hidden' }}>
                  {selectedOrder.items && selectedOrder.items.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        padding: '12px',
                        borderBottom: index < selectedOrder.items.length - 1 ? '1px solid var(--calcite-ui-border-3)' : 'none',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: '600', fontSize: '14px' }}>{item.itemName || 'Item'}</div>
                        <div style={{ fontSize: '12px', color: 'var(--calcite-ui-text-3)' }}>
                          {item.itemType} • Quantity: {item.quantity}
                        </div>
                      </div>
                      <div style={{ fontWeight: '700', color: 'var(--calcite-ui-brand)' }}>
                        LKR {((item.price || 0) * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <calcite-button slot="primary" onClick={() => setDetailModalOpen(false)}>
          Close
        </calcite-button>
      </calcite-modal>

      {/* Status Change Modal */}
      <calcite-modal
        open={statusModalOpen}
        onCalciteModalClose={() => setStatusModalOpen(false)}
        width-scale="s"
      >
        <div slot="header">Update Order Status</div>
        <div slot="content" style={{ padding: '20px' }}>
          {selectedOrder && (
            <div>
              <p style={{ marginBottom: '16px', fontSize: '14px' }}>
                Update status for order: <strong>{selectedOrder.orderReference || selectedOrder.orderNumber}</strong>
              </p>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>
                  New Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '14px',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    outline: 'none'
                  }}
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>
            </div>
          )}
        </div>
        <calcite-button slot="primary" onClick={confirmStatusChange}>
          Update Status
        </calcite-button>
        <calcite-button slot="secondary" appearance="outline" onClick={() => setStatusModalOpen(false)}>
          Cancel
        </calcite-button>
      </calcite-modal>
    </calcite-shell>
  );
}