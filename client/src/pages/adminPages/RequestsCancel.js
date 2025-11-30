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
import '@esri/calcite-components/components/calcite-text-area';
import '@esri/calcite-components/components/calcite-select';
import '@esri/calcite-components/components/calcite-option';
import '@esri/calcite-components/components/calcite-notice';
import '@esri/calcite-components/components/calcite-list';
import '@esri/calcite-components/components/calcite-list-item';
import '@esri/calcite-components/components/calcite-loader';

export default function AdminRequestsCancel() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('pending');
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [actionType, setActionType] = useState(''); // 'approve' or 'reject'
  const [adminNotes, setAdminNotes] = useState('');
  
  // TEMPORARY: Mock cancellation request data
  const [requests, setRequests] = useState([
    {
      _id: 'CAN001',
      requestNumber: 'CAN-2024-001',
      orderNumber: 'ORD-2024-016',
      customerName: 'Jennifer Lopez',
      customerEmail: 'jennifer.l@example.com',
      customerPhone: '+94771234567',
      orderAmount: 95000,
      items: [
        { productName: 'Safety Helmets', quantity: 20, price: 2500 },
        { productName: 'Safety Goggles', quantity: 50, price: 900 }
      ],
      orderStatus: 'pending',
      paymentStatus: 'paid',
      reason: 'Ordered by mistake',
      description: 'I accidentally placed a duplicate order. Please cancel this one.',
      status: 'pending',
      requestDate: '2024-11-29T11:00:00',
      processedDate: null,
      adminNotes: null
    },
    {
      _id: 'CAN002',
      requestNumber: 'CAN-2024-002',
      orderNumber: 'ORD-2024-017',
      customerName: 'Thomas Anderson',
      customerEmail: 'thomas.a@example.com',
      customerPhone: '+94772345678',
      orderAmount: 156000,
      items: [
        { productName: 'Gum Boots', quantity: 40, price: 3900 }
      ],
      orderStatus: 'processing',
      paymentStatus: 'paid',
      reason: 'Project delayed',
      description: 'Our construction project has been postponed indefinitely. No longer need these items.',
      status: 'pending',
      requestDate: '2024-11-28T15:30:00',
      processedDate: null,
      adminNotes: null
    },
    {
      _id: 'CAN003',
      requestNumber: 'CAN-2024-003',
      orderNumber: 'ORD-2024-018',
      customerName: 'Maria Garcia',
      customerEmail: 'maria.g@example.com',
      customerPhone: '+94773456789',
      orderAmount: 72000,
      items: [
        { productName: 'Safety Jackets', quantity: 40, price: 1800 }
      ],
      orderStatus: 'pending',
      paymentStatus: 'pending',
      reason: 'Found better price elsewhere',
      description: 'Found the same items at a lower price from another supplier.',
      status: 'approved',
      requestDate: '2024-11-25T10:00:00',
      processedDate: '2024-11-26T14:00:00',
      adminNotes: 'Cancellation approved. Order cancelled before processing.'
    },
    {
      _id: 'CAN004',
      requestNumber: 'CAN-2024-004',
      orderNumber: 'ORD-2024-019',
      customerName: 'Robert Johnson',
      customerEmail: 'robert.j@example.com',
      customerPhone: '+94774567890',
      orderAmount: 280000,
      items: [
        { productName: 'Safety Equipment Bundle', quantity: 5, price: 56000 }
      ],
      orderStatus: 'shipped',
      paymentStatus: 'paid',
      reason: 'No longer needed',
      description: 'Need to cancel as we have decided not to proceed with the project.',
      status: 'rejected',
      requestDate: '2024-11-22T09:00:00',
      processedDate: '2024-11-23T11:00:00',
      adminNotes: 'Order already shipped. Cannot cancel at this stage. Customer can request return after delivery.'
    }
  ]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const statusOptions = [
    { value: 'all', label: 'All Requests' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' }
  ];

  const cancellationReasons = [
    'Ordered by mistake',
    'Project delayed',
    'Found better price elsewhere',
    'Changed requirements',
    'No longer needed',
    'Other'
  ];

  useEffect(() => {
    // fetchCancelRequests();
  }, []);

  const fetchCancelRequests = async () => {
    try {
      setLoading(true);
      const response = await API.get('/cancel-requests');
      setRequests(response.data.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching cancel requests:', err);
      setError('Failed to load cancellation requests. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredRequests = useMemo(() => {
    return requests.filter(request => {
      const matchesStatus = selectedStatus === 'all' || request.status === selectedStatus;
      const matchesSearch = 
        request.requestNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [selectedStatus, searchQuery, requests]);

  const getStatusChipKind = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'approved': return 'success';
      case 'rejected': return 'danger';
      default: return 'neutral';
    }
  };

  const getOrderStatusChipKind = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'processing': return 'brand';
      case 'shipped': return 'info';
      default: return 'neutral';
    }
  };

  const canCancelOrder = (orderStatus) => {
    return orderStatus === 'pending' || orderStatus === 'processing';
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setDetailModalOpen(true);
  };

  const handleAction = (request, type) => {
    setSelectedRequest(request);
    setActionType(type);
    setAdminNotes('');
    setActionModalOpen(true);
  };

  const confirmAction = async () => {
    try {
      const newStatus = actionType === 'approve' ? 'approved' : 'rejected';
      // await API.put(`/cancel-requests/${selectedRequest._id}`, { 
      //   status: newStatus, 
      //   adminNotes 
      // });
      
      setRequests(requests.map(r => 
        r._id === selectedRequest._id 
          ? { ...r, status: newStatus, adminNotes, processedDate: new Date().toISOString() } 
          : r
      ));
      setActionModalOpen(false);
      setSelectedRequest(null);
      setAdminNotes('');
    } catch (err) {
      console.error('Error processing cancel request:', err);
      alert('Failed to process request. Please try again.');
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

  const requestStats = useMemo(() => {
    return {
      total: requests.length,
      pending: requests.filter(r => r.status === 'pending').length,
      approved: requests.filter(r => r.status === 'approved').length,
      rejected: requests.filter(r => r.status === 'rejected').length
    };
  }, [requests]);

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
                Cancellation Requests
              </h1>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--calcite-ui-text-3)' }}>
                Review and process order cancellation requests
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
                  {requestStats.total}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)', marginTop: '4px' }}>
                  Total Requests
                </div>
              </div>
            </calcite-card>
            <calcite-card>
              <div style={{ padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: '700', color: '#ffa500' }}>
                  {requestStats.pending}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)', marginTop: '4px' }}>
                  Pending
                </div>
              </div>
            </calcite-card>
            <calcite-card>
              <div style={{ padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: '700', color: '#28a745' }}>
                  {requestStats.approved}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)', marginTop: '4px' }}>
                  Approved
                </div>
              </div>
            </calcite-card>
            <calcite-card>
              <div style={{ padding: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: '700', color: '#dc3545' }}>
                  {requestStats.rejected}
                </div>
                <div style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)', marginTop: '4px' }}>
                  Rejected
                </div>
              </div>
            </calcite-card>
          </div>

          {requestStats.pending > 0 && (
            <calcite-notice open icon="exclamation-mark-circle" kind="warning" style={{ marginBottom: '20px' }}>
              <div slot="title">Action Required</div>
              <div slot="message">
                You have {requestStats.pending} cancellation request{requestStats.pending > 1 ? 's' : ''} pending review.
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
              placeholder="Search by request number, order number, customer..."
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
            <calcite-chip>{filteredRequests.length} requests</calcite-chip>
          </div>

          {loading && (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <calcite-loader scale="l"></calcite-loader>
              <p style={{ marginTop: '16px', color: 'var(--calcite-ui-text-3)' }}>
                Loading cancellation requests...
              </p>
            </div>
          )}

          {!loading && (
            <calcite-list>
              {filteredRequests.map(request => (
                <calcite-list-item
                  key={request._id}
                  label={`${request.requestNumber} - ${request.customerName}`}
                  description={`Order: ${request.orderNumber} • ${request.reason} • ${formatDate(request.requestDate)}`}
                >
                  <div slot="content-start" style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    minWidth: '120px'
                  }}>
                    <calcite-chip scale="s" kind={getStatusChipKind(request.status)}>
                      {request.status.toUpperCase()}
                    </calcite-chip>
                    <calcite-chip scale="s" kind={getOrderStatusChipKind(request.orderStatus)}>
                      Order: {request.orderStatus.toUpperCase()}
                    </calcite-chip>
                  </div>

                  <div slot="content-end" style={{ 
                    display: 'flex', 
                    gap: '12px',
                    alignItems: 'center'
                  }}>
                    <div style={{ textAlign: 'right', minWidth: '120px' }}>
                      <div style={{ fontSize: '12px', color: 'var(--calcite-ui-text-3)' }}>
                        Order Amount
                      </div>
                      <div style={{ fontWeight: '700', fontSize: '18px', color: 'var(--calcite-ui-brand)' }}>
                        LKR {request.orderAmount.toLocaleString()}
                      </div>
                    </div>
                    <calcite-button 
                      appearance="outline" 
                      icon-start="information"
                      scale="s"
                      onClick={() => handleViewDetails(request)}
                    >
                      Details
                    </calcite-button>
                    {request.status === 'pending' && (
                      <>
                        <calcite-button 
                          icon-start="check"
                          kind="success"
                          scale="s"
                          onClick={() => handleAction(request, 'approve')}
                        >
                          Approve
                        </calcite-button>
                        <calcite-button 
                          appearance="outline"
                          kind="danger"
                          icon-start="x"
                          scale="s"
                          onClick={() => handleAction(request, 'reject')}
                        >
                          Reject
                        </calcite-button>
                      </>
                    )}
                  </div>
                </calcite-list-item>
              ))}
            </calcite-list>
          )}

          {!loading && filteredRequests.length === 0 && (
            <calcite-notice open icon="exclamation-mark-triangle" kind="warning">
              <div slot="title">No cancellation requests found</div>
              <div slot="message">Try adjusting your filters or search terms</div>
            </calcite-notice>
          )}
        </div>
      </div>

      {/* Details Modal */}
      <calcite-modal 
        open={detailModalOpen}
        onCalciteModalClose={() => setDetailModalOpen(false)}
        width-scale="l"
      >
        <div slot="header">Cancellation Request Details</div>
        <div slot="content" style={{ padding: '20px' }}>
          {selectedRequest && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {!canCancelOrder(selectedRequest.orderStatus) && selectedRequest.status === 'pending' && (
                <calcite-notice open icon="exclamation-mark-triangle" kind="warning">
                  <div slot="title">Order Already Shipped</div>
                  <div slot="message">
                    This order has already been shipped. Cancellation may not be possible. Consider rejecting this request.
                  </div>
                </calcite-notice>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>
                    Request Information
                  </h3>
                  <div style={{ fontSize: '14px' }}>
                    <p><strong>Request Number:</strong> {selectedRequest.requestNumber}</p>
                    <p><strong>Order Number:</strong> {selectedRequest.orderNumber}</p>
                    <p><strong>Request Date:</strong> {formatDate(selectedRequest.requestDate)}</p>
                    <p><strong>Request Status:</strong> <calcite-chip scale="s" kind={getStatusChipKind(selectedRequest.status)}>
                      {selectedRequest.status.toUpperCase()}
                    </calcite-chip></p>
                    <p><strong>Order Status:</strong> <calcite-chip scale="s" kind={getOrderStatusChipKind(selectedRequest.orderStatus)}>
                      {selectedRequest.orderStatus.toUpperCase()}
                    </calcite-chip></p>
                    <p><strong>Payment Status:</strong> {selectedRequest.paymentStatus}</p>
                    {selectedRequest.processedDate && (
                      <p><strong>Processed Date:</strong> {formatDate(selectedRequest.processedDate)}</p>
                    )}
                  </div>
                </div>

                <div>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>
                    Customer Information
                  </h3>
                  <div style={{ fontSize: '14px' }}>
                    <p><strong>Name:</strong> {selectedRequest.customerName}</p>
                    <p><strong>Email:</strong> {selectedRequest.customerEmail}</p>
                    <p><strong>Phone:</strong> {selectedRequest.customerPhone}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>
                  Cancellation Details
                </h3>
                <div style={{ fontSize: '14px' }}>
                  <p><strong>Reason:</strong> {selectedRequest.reason}</p>
                  <p><strong>Description:</strong></p>
                  <div style={{ 
                    padding: '12px', 
                    background: 'var(--calcite-ui-foreground-2)', 
                    borderRadius: '4px',
                    marginTop: '8px'
                  }}>
                    {selectedRequest.description}
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
                    {selectedRequest.items.map((item, index) => (
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
                        LKR {selectedRequest.orderAmount.toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {selectedRequest.adminNotes && (
                <div>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>
                    Admin Notes
                  </h3>
                  <div style={{ 
                    padding: '12px', 
                    background: 'var(--calcite-ui-foreground-2)', 
                    borderRadius: '4px'
                  }}>
                    {selectedRequest.adminNotes}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div slot="footer">
          {selectedRequest?.status === 'pending' && (
            <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
              <calcite-button 
                onClick={() => {
                  setDetailModalOpen(false);
                  handleAction(selectedRequest, 'approve');
                }}
                kind="success"
                style={{ flex: 1 }}
              >
                Approve Cancellation
              </calcite-button>
              <calcite-button 
                appearance="outline"
                kind="danger"
                onClick={() => {
                  setDetailModalOpen(false);
                  handleAction(selectedRequest, 'reject');
                }}
                style={{ flex: 1 }}
              >
                Reject Request
              </calcite-button>
            </div>
          )}
        </div>
        <calcite-button slot="primary" onClick={() => setDetailModalOpen(false)}>
          Close
        </calcite-button>
      </calcite-modal>

      {/* Action Modal */}
      <calcite-modal 
        open={actionModalOpen}
        onCalciteModalClose={() => setActionModalOpen(false)}
        width-scale="m"
      >
        <div slot="header">
          {actionType === 'approve' ? 'Approve Cancellation Request' : 'Reject Cancellation Request'}
        </div>
        <div slot="content" style={{ padding: '20px' }}>
          {selectedRequest && (
            <div>
              <calcite-notice 
                open 
                icon={actionType === 'approve' ? 'check-circle' : 'exclamation-mark-triangle'}
                kind={actionType === 'approve' ? 'success' : 'danger'}
                style={{ marginBottom: '16px' }}
              >
                <div slot="title">
                  {actionType === 'approve' ? 'Confirm Approval' : 'Confirm Rejection'}
                </div>
                <div slot="message">
                  {actionType === 'approve' 
                    ? `You are about to approve cancellation for order ${selectedRequest.orderNumber} (LKR ${selectedRequest.orderAmount.toLocaleString()}).`
                    : `You are about to reject the cancellation request for order ${selectedRequest.orderNumber}.`
                  }
                </div>
              </calcite-notice>

              {actionType === 'approve' && !canCancelOrder(selectedRequest.orderStatus) && (
                <calcite-notice open icon="exclamation-mark-triangle" kind="warning" style={{ marginBottom: '16px' }}>
                  <div slot="title">Warning</div>
                  <div slot="message">
                    This order is in "{selectedRequest.orderStatus}" status. Cancellation at this stage may incur additional costs.
                  </div>
                </calcite-notice>
              )}

              <calcite-label>
                Admin Notes {actionType === 'reject' ? '*' : '(Optional)'}
                <calcite-text-area
                  value={adminNotes}
                  onCalciteTextAreaInput={(e) => setAdminNotes(e.target.value)}
                  placeholder={actionType === 'approve' 
                    ? 'Add any notes about the cancellation...'
                    : 'Provide a reason for rejection...'
                  }
                  rows="4"
                />
              </calcite-label>
            </div>
          )}
        </div>
        <calcite-button 
          slot="primary" 
          kind={actionType === 'approve' ? 'success' : 'danger'}
          onClick={confirmAction}
          disabled={actionType === 'reject' && !adminNotes.trim()}
        >
          {actionType === 'approve' ? 'Approve Cancellation' : 'Reject Request'}
        </calcite-button>
        <calcite-button slot="secondary" appearance="outline" onClick={() => setActionModalOpen(false)}>
          Cancel
        </calcite-button>
      </calcite-modal>
    </calcite-shell>
  );
}