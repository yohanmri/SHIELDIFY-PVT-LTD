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
  const [orders, setOrders] = useState([
    {
      _id: 'ORD001',
      orderNumber: 'ORD-2024-001',
      customerName: 'John Smith',
      customerEmail: 'john@example.com',
      customerPhone: '+94771234567',
      items: [
        { productName: 'Safety Helmet', quantity: 10, price: 2500 },
        { productName: 'Safety Jacket', quantity: 5, price: 3500 }
      ],
      totalAmount: 42500,
      status: 'pending',
      paymentStatus: 'paid',
      shippingAddress: '123 Main St, Colombo 03',
      orderDate: '2024-11-28T10:30:00',
      deliveryDate: null
    },
    {
      _id: 'ORD002',
      orderNumber: 'ORD-2024-002',
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah@example.com',
      customerPhone: '+94777654321',
      items: [
        { productName: 'Safety Goggles', quantity: 50, price: 600 }
      ],
      totalAmount: 30000,
      status: 'processing',
      paymentStatus: 'paid',
      shippingAddress: '456 Park Ave, Kandy',
      orderDate: '2024-11-27T14:20:00',
      deliveryDate: null
    },
    {
      _id: 'ORD003',
      orderNumber: 'ORD-2024-003',
      customerName: 'Michael Brown',
      customerEmail: 'michael@example.com',
      customerPhone: '+94773456789',
      items: [
        { productName: 'Gum Boots', quantity: 20, price: 3500 },
        { productName: 'Safety Gloves', quantity: 30, price: 800 }
      ],
      totalAmount: 94000,
      status: 'shipped',
      paymentStatus: 'paid',
      shippingAddress: '789 Lake Road, Galle',
      orderDate: '2024-11-25T09:15:00',
      deliveryDate: '2024-11-30T00:00:00'
    },
    {
      _id: 'ORD004',
      orderNumber: 'ORD-2024-004',
      customerName: 'Emily Davis',
      customerEmail: 'emily@example.com',
      customerPhone: '+94779876543',
      items: [
        { productName: 'Safety Helmet Bundle', quantity: 2, price: 200000 }
      ],
      totalAmount: 400000,
      status: 'delivered',
      paymentStatus: 'paid',
      shippingAddress: '321 Beach Rd, Negombo',
      orderDate: '2024-11-20T11:45:00',
      deliveryDate: '2024-11-24T00:00:00'
    },
    {
      _id: 'ORD005',
      orderNumber: 'ORD-2024-005',
      customerName: 'David Wilson',
      customerEmail: 'david@example.com',
      customerPhone: '+94771112233',
      items: [
        { productName: 'First Aid Box', quantity: 15, price: 4500 }
      ],
      totalAmount: 67500,
      status: 'cancelled',
      paymentStatus: 'refunded',
      shippingAddress: '555 Hill St, Nuwara Eliya',
      orderDate: '2024-11-22T16:30:00',
      deliveryDate: null
    }
  ]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const statusOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  useEffect(() => {
    // fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await API.get('/orders');
      setOrders(response.data.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to load orders. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
      const matchesSearch = 
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
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
      // await API.put(`/orders/${selectedOrder._id}/status`, { status: newStatus });
      setOrders(orders.map(o => 
        o._id === selectedOrder._id ? { ...o, status: newStatus } : o
      ));
      setStatusModalOpen(false);
      setSelectedOrder(null);
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
      processing: orders.filter(o => o.status === 'processing').length,
      shipped: orders.filter(o => o.status === 'shipped').length,
      delivered: orders.filter(o => o.status === 'delivered').length,
      cancelled: orders.filter(o => o.status === 'cancelled').length
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
                  {orderStats.processing}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)', marginTop: '4px' }}>
                  Processing
                </div>
              </div>
            </calcite-card>
            <calcite-card>
              <div style={{ padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: '700', color: '#00a884' }}>
                  {orderStats.shipped}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)', marginTop: '4px' }}>
                  Shipped
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
                  label={`${order.orderNumber} - ${order.customerName}`}
                  description={`${order.items.length} items • ${formatDate(order.orderDate)}`}
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
                    <p><strong>Order Number:</strong> {selectedOrder.orderNumber}</p>
                    <p><strong>Order Date:</strong> {formatDate(selectedOrder.orderDate)}</p>
                    <p><strong>Status:</strong> <calcite-chip scale="s" kind={getStatusChipKind(selectedOrder.status)}>
                      {selectedOrder.status.toUpperCase()}
                    </calcite-chip></p>
                    <p><strong>Payment Status:</strong> {selectedOrder.paymentStatus}</p>
                    {selectedOrder.deliveryDate && (
                      <p><strong>Delivery Date:</strong> {formatDate(selectedOrder.deliveryDate)}</p>
                    )}
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
              <p style={{ marginBottom: '16px' }}>
                Update status for order: <strong>{selectedOrder.orderNumber}</strong>
              </p>
              <calcite-label>
                New Status
                <calcite-select
                  value={newStatus}
                  onCalciteSelectChange={(e) => setNewStatus(e.target.value)}
                >
                  <calcite-option value="pending">Pending</calcite-option>
                  <calcite-option value="processing">Processing</calcite-option>
                  <calcite-option value="shipped">Shipped</calcite-option>
                  <calcite-option value="delivered">Delivered</calcite-option>
                  <calcite-option value="cancelled">Cancelled</calcite-option>
                </calcite-select>
              </calcite-label>
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