import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/adminComponents/AdminNavbar';
import AdminSidebar from '../../components/adminComponents/AdminSidebar';
import { adminAPI as API } from '../../api/axios';
import '@esri/calcite-components/components/calcite-shell';
import '@esri/calcite-components/components/calcite-button';
import '@esri/calcite-components/components/calcite-card';
import '@esri/calcite-components/components/calcite-chip';
import '@esri/calcite-components/components/calcite-input';
import '@esri/calcite-components/components/calcite-select';
import '@esri/calcite-components/components/calcite-option';
import '@esri/calcite-components/components/calcite-modal';
import '@esri/calcite-components/components/calcite-label';
import '@esri/calcite-components/components/calcite-input-text';
import '@esri/calcite-components/components/calcite-text-area';
import '@esri/calcite-components/components/calcite-notice';
import '@esri/calcite-components/components/calcite-action';
import '@esri/calcite-components/components/calcite-list';
import '@esri/calcite-components/components/calcite-list-item';
import '@esri/calcite-components/components/calcite-loader';
import '@esri/calcite-components/components/calcite-icon';


export default function ContactViewPage() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterService, setFilterService] = useState('all');
  const [viewMode, setViewMode] = useState('card');
  const [selectedContact, setSelectedContact] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');

  const services = [
    'GIS Mapping & Cartography',
    'Spatial Analysis',
    'Remote Sensing',
    'GIS Consulting',
    'Custom Development',
    'Data Management',
    'Training',
    'Other'
  ];

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await API.get('/admin/contacts');
      setContacts(response.data.data || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching contacts:', err);
      setError('Failed to load contacts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch =
      contact.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'all' || contact.status === filterStatus;
    const matchesService = filterService === 'all' || contact.service === filterService;

    return matchesSearch && matchesStatus && matchesService;
  });

  const handleViewDetail = (contact) => {
    setSelectedContact(contact);
    setDetailModalOpen(true);
  };

  const handleReply = (contact) => {
    setSelectedContact(contact);
    setReplyMessage('');
    setReplyModalOpen(true);
  };

  const handleSendReply = async () => {
    try {
      await API.post(`/admin/contacts/${selectedContact._id}/reply`, {
        message: replyMessage
      });
      setReplyModalOpen(false);
      setReplyMessage('');
      // Update contact status to replied
      await API.put(`/admin/contacts/${selectedContact._id}`, {
        status: 'replied'
      });
      fetchContacts();
    } catch (err) {
      console.error('Error sending reply:', err);
      alert('Failed to send reply. Please try again.');
    }
  };

  const handleMarkAsRead = async (contactId) => {
    try {
      await API.put(`/admin/contacts/${contactId}`, {
        status: 'read'
      });
      fetchContacts();
    } catch (err) {
      console.error('Error marking as read:', err);
    }
  };

  const handleDelete = (contact) => {
    setSelectedContact(contact);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await API.delete(`/admin/contacts/${selectedContact._id}`);
      setContacts(contacts.filter(c => c._id !== selectedContact._id));
      setDeleteModalOpen(false);
      setSelectedContact(null);
    } catch (err) {
      console.error('Error deleting contact:', err);
      alert('Failed to delete contact. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'blue';
      case 'read': return 'yellow';
      case 'replied': return 'green';
      default: return 'gray';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'new': return 'まるい-exclamation-mark-triangle';
      case 'read': return 'check';
      case 'replied': return 'まるい-check-circle';
      default: return 'information';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStats = () => {
    return {
      total: contacts.length,
      new: contacts.filter(c => c.status === 'new').length,
      read: contacts.filter(c => c.status === 'read').length,
      replied: contacts.filter(c => c.status === 'replied').length
    };
  };

  const stats = getStats();

  return (
    <calcite-shell>
      <AdminNavbar />
      <AdminSidebar />

      <div style={{ padding: '24px', height: '100%', overflow: 'auto' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Header */}
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
                Contact Inquiries
              </h1>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--calcite-ui-text-3)' }}>
                Manage customer inquiries and messages
              </p>
            </div>
            <calcite-button
              icon-start="refresh"
              appearance="outline"
              onClick={fetchContacts}
            >
              Refresh
            </calcite-button>
          </div>

          {error && (
            <calcite-notice open icon="exclamation-mark-triangle" kind="danger" style={{ marginBottom: '20px' }}>
              <div slot="title">Error</div>
              <div slot="message">{error}</div>
            </calcite-notice>
          )}

          {/* Stats Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <div style={{
              padding: '20px',
              background: 'var(--calcite-ui-foreground-1)',
              borderRadius: '8px',
              border: '1px solid var(--calcite-ui-border-2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <calcite-icon icon="email" scale="l" style={{ color: '#2d5f8d' }} />
                <div>
                  <div style={{ fontSize: '24px', fontWeight: '600' }}>{stats.total}</div>
                  <div style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)' }}>Total Inquiries</div>
                </div>
              </div>
            </div>

            <div style={{
              padding: '20px',
              background: 'var(--calcite-ui-foreground-1)',
              borderRadius: '8px',
              border: '1px solid var(--calcite-ui-border-2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <calcite-icon icon="まるい-exclamation-mark-triangle" scale="l" style={{ color: '#0079c1' }} />
                <div>
                  <div style={{ fontSize: '24px', fontWeight: '600' }}>{stats.new}</div>
                  <div style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)' }}>New Messages</div>
                </div>
              </div>
            </div>

            <div style={{
              padding: '20px',
              background: 'var(--calcite-ui-foreground-1)',
              borderRadius: '8px',
              border: '1px solid var(--calcite-ui-border-2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <calcite-icon icon="check" scale="l" style={{ color: '#f89927' }} />
                <div>
                  <div style={{ fontSize: '24px', fontWeight: '600' }}>{stats.read}</div>
                  <div style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)' }}>Read</div>
                </div>
              </div>
            </div>

            <div style={{
              padding: '20px',
              background: 'var(--calcite-ui-foreground-1)',
              borderRadius: '8px',
              border: '1px solid var(--calcite-ui-border-2)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <calcite-icon icon="まるい-check-circle" scale="l" style={{ color: '#35ac46' }} />
                <div>
                  <div style={{ fontSize: '24px', fontWeight: '600' }}>{stats.replied}</div>
                  <div style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)' }}>Replied</div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '24px',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            <calcite-input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onCalciteInputInput={(e) => setSearchQuery(e.target.value)}
              icon="search"
              clearable
              style={{ flex: '1', minWidth: '250px' }}
            />

            <calcite-select
              value={filterStatus}
              onCalciteSelectChange={(e) => setFilterStatus(e.target.selectedOption.value)}
              style={{ width: '150px' }}
            >
              <calcite-option value="all">All Status</calcite-option>
              <calcite-option value="new">New</calcite-option>
              <calcite-option value="read">Read</calcite-option>
              <calcite-option value="replied">Replied</calcite-option>
            </calcite-select>

            <calcite-select
              value={filterService}
              onCalciteSelectChange={(e) => setFilterService(e.target.selectedOption.value)}
              style={{ width: '200px' }}
            >
              <calcite-option value="all">All Services</calcite-option>
              {services.map(service => (
                <calcite-option key={service} value={service}>
                  {service}
                </calcite-option>
              ))}
            </calcite-select>

            <div style={{ display: 'flex', gap: '4px', marginLeft: 'auto' }}>
              <calcite-action
                text="Card View"
                icon="apps"
                active={viewMode === 'card'}
                onClick={() => setViewMode('card')}
              ></calcite-action>
              <calcite-action
                text="List View"
                icon="list"
                active={viewMode === 'list'}
                onClick={() => setViewMode('list')}
              ></calcite-action>
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <calcite-chip>{filteredContacts.length} inquiries</calcite-chip>
          </div>

          {loading && (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <calcite-loader scale="l"></calcite-loader>
              <p style={{ marginTop: '16px', color: 'var(--calcite-ui-text-3)' }}>
                Loading contacts...
              </p>
            </div>
          )}

          {/* Card View */}
          {!loading && viewMode === 'card' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '20px'
            }}>
              {filteredContacts.map(contact => (
                <calcite-card key={contact._id}>
                  <div slot="header-start" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <calcite-chip
                      scale="l"
                      appearance="solid"
                      kind={getStatusColor(contact.status)}
                    >
                      {contact.status || 'new'}
                    </calcite-chip>
                    {contact.service && (
                      <calcite-chip scale="l" appearance="outline" icon="apps">
                        {contact.service}
                      </calcite-chip>
                    )}
                  </div>

                  <span slot="heading">{contact.name}</span>
                  <span slot="description">{contact.email}</span>

                  <div style={{ marginTop: '12px', marginBottom: '12px' }}>
                    {contact.company && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '8px',
                        fontSize: '14px'
                      }}>
                        <calcite-icon icon="organization" scale="s" />
                        <span>{contact.company}</span>
                      </div>
                    )}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '13px',
                      color: 'var(--calcite-ui-text-3)'
                    }}>
                      <calcite-icon icon="clock" scale="s" />
                      <span>{formatDate(contact.createdAt || Date.now())}</span>
                    </div>
                  </div>

                  <div style={{
                    padding: '12px',
                    background: 'var(--calcite-ui-foreground-2)',
                    borderRadius: '4px',
                    fontSize: '14px',
                    maxHeight: '80px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {contact.message?.substring(0, 150)}
                    {contact.message?.length > 150 && '...'}
                  </div>

                  <div slot="footer-end" style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                    <calcite-button
                      appearance="outline"
                      icon-start="まるい-information"
                      scale="s"
                      onClick={() => handleViewDetail(contact)}
                    >
                      View
                    </calcite-button>
                    <calcite-button
                      appearance="outline"
                      icon-start="email"
                      scale="s"
                      onClick={() => handleReply(contact)}
                    >
                      Reply
                    </calcite-button>
                    <calcite-button
                      appearance="outline"
                      kind="danger"
                      icon-start="trash"
                      scale="s"
                      onClick={() => handleDelete(contact)}
                    >
                      Delete
                    </calcite-button>
                  </div>
                </calcite-card>
              ))}
            </div>
          )}

          {/* List View */}
          {!loading && viewMode === 'list' && (
            <calcite-list>
              {filteredContacts.map(contact => (
                <calcite-list-item
                  key={contact._id}
                  label={contact.name}
                  description={`${contact.email} • ${contact.service || 'No service specified'}`}
                  value={contact._id}
                >
                  <calcite-chip
                    slot="content-start"
                    scale="l"
                    kind={getStatusColor(contact.status)}
                  >
                    {contact.status || 'new'}
                  </calcite-chip>

                  <div slot="content-end" style={{
                    display: 'flex',
                    gap: '8px',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      fontSize: '13px',
                      color: 'var(--calcite-ui-text-3)',
                      marginRight: '12px'
                    }}>
                      {formatDate(contact.createdAt || Date.now())}
                    </span>
                    <calcite-button
                      appearance="outline"
                      icon-start="まるい-information"
                      scale="s"
                      onClick={() => handleViewDetail(contact)}
                    >
                      View
                    </calcite-button>
                    <calcite-button
                      appearance="outline"
                      icon-start="email"
                      scale="s"
                      onClick={() => handleReply(contact)}
                    >
                      Reply
                    </calcite-button>
                    <calcite-button
                      appearance="outline"
                      kind="danger"
                      icon-start="trash"
                      scale="s"
                      onClick={() => handleDelete(contact)}
                    >
                      Delete
                    </calcite-button>
                  </div>
                </calcite-list-item>
              ))}
            </calcite-list>
          )}

          {!loading && filteredContacts.length === 0 && (
            <calcite-notice open icon="exclamation-mark-triangle" kind="warning">
              <div slot="title">No contacts found</div>
              <div slot="message">Try adjusting your filters or search terms</div>
            </calcite-notice>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      <calcite-modal
        open={detailModalOpen}
        onCalciteModalClose={() => setDetailModalOpen(false)}
        width-scale="m"
      >
        <div slot="header">Contact Details</div>
        <div slot="content" style={{ padding: '20px' }}>
          {selectedContact && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '16px',
                borderBottom: '1px solid var(--calcite-ui-border-2)'
              }}>
                <div>
                  <h3 style={{ margin: '0 0 8px 0' }}>{selectedContact.name}</h3>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <calcite-chip scale="l" kind={getStatusColor(selectedContact.status)}>
                      {selectedContact.status || 'new'}
                    </calcite-chip>
                  </div>
                </div>
              </div>

              <div>
                <div style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: 'var(--calcite-ui-text-3)',
                  marginBottom: '8px'
                }}>
                  CONTACT INFORMATION
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <calcite-icon icon="email" scale="s" />
                    <a href={`mailto:${selectedContact.email}`} style={{ color: '#2d5f8d' }}>
                      {selectedContact.email}
                    </a>
                  </div>
                  {selectedContact.company && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <calcite-icon icon="organization" scale="s" />
                      <span>{selectedContact.company}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <calcite-icon icon="clock" scale="s" />
                    <span>{formatDate(selectedContact.createdAt || Date.now())}</span>
                  </div>
                </div>
              </div>

              {selectedContact.service && (
                <div>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: 'var(--calcite-ui-text-3)',
                    marginBottom: '8px'
                  }}>
                    SERVICE INTERESTED IN
                  </div>
                  <calcite-chip icon="apps">
                    {selectedContact.service}
                  </calcite-chip>
                </div>
              )}

              <div>
                <div style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: 'var(--calcite-ui-text-3)',
                  marginBottom: '8px'
                }}>
                  MESSAGE
                </div>
                <div style={{
                  padding: '16px',
                  background: 'var(--calcite-ui-foreground-2)',
                  borderRadius: '4px',
                  lineHeight: '1.6'
                }}>
                  {selectedContact.message}
                </div>
              </div>
            </div>
          )}
        </div>
        <calcite-button
          slot="primary"
          kind="brand"
          icon-start="email"
          onClick={() => {
            setDetailModalOpen(false);
            handleReply(selectedContact);
          }}
        >
          Reply to Inquiry
        </calcite-button>
        <calcite-button
          slot="secondary"
          appearance="outline"
          icon-start="check"
          onClick={() => {
            handleMarkAsRead(selectedContact._id);
            setDetailModalOpen(false);
          }}
        >
          Mark as Read
        </calcite-button>
      </calcite-modal>

      {/* Reply Modal */}
      <calcite-modal
        open={replyModalOpen}
        onCalciteModalClose={() => setReplyModalOpen(false)}
        width-scale="m"
      >
        <div slot="header">Reply to {selectedContact?.name}</div>
        <div slot="content" style={{ padding: '20px' }}>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)', marginBottom: '8px' }}>
              To: {selectedContact?.email}
            </div>
            <div style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)' }}>
              Re: {selectedContact?.service || 'General Inquiry'}
            </div>
          </div>

          <calcite-label>
            Your Reply Message *
            <calcite-text-area
              value={replyMessage}
              onInput={(e) => setReplyMessage(e.target.value)}
              rows="8"
              placeholder="Type your reply here..."
            />
          </calcite-label>
        </div>
        <calcite-button
          slot="primary"
          kind="brand"
          icon-start="send"
          onClick={handleSendReply}
        >
          Send Reply
        </calcite-button>
        <calcite-button
          slot="secondary"
          appearance="outline"
          icon-start="x"
          onClick={() => setReplyModalOpen(false)}
        >
          Cancel
        </calcite-button>
      </calcite-modal>

      {/* Delete Confirmation Modal */}
      <calcite-modal
        open={deleteModalOpen}
        onCalciteModalClose={() => setDeleteModalOpen(false)}
        width-scale="s"
      >
        <div slot="header">Delete Contact</div>
        <div slot="content" style={{ padding: '20px' }}>
          <calcite-notice open icon="exclamation-mark-triangle" kind="danger">
            <div slot="title">Are you sure?</div>
            <div slot="message">
              This will permanently delete the inquiry from "{selectedContact?.name}". This action cannot be undone.
            </div>
          </calcite-notice>
        </div>
        <calcite-button
          slot="primary"
          kind="danger"
          icon-start="trash"
          onClick={confirmDelete}
        >
          Delete Contact
        </calcite-button>
        <calcite-button
          slot="secondary"
          appearance="outline"
          icon-start="x"
          onClick={() => setDeleteModalOpen(false)}
        >
          Cancel
        </calcite-button>
      </calcite-modal>
    </calcite-shell>
  );
}