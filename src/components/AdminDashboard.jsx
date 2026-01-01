import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import {
  FiMail,
  FiCalendar,
  FiTrash2,
  FiEye,
  FiEyeOff,
  FiSearch,
  FiDownload,
  FiMessageSquare,
  FiCheckCircle,
  FiAlertCircle,
  FiLogOut,
  FiRefreshCw,
  FiDatabase
} from 'react-icons/fi';

const AdminDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [dbConnected, setDbConnected] = useState(false);

  // Simple password protection - CHANGE THIS!
  const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD;


  useEffect(() => {
    const authStatus = localStorage.getItem('portfolio_admin_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    console.log('Attempting to connect to Firebase...');

    try {
      const q = query(collection(db, 'messages'), orderBy('timestamp', 'desc'));

      const unsubscribe = onSnapshot(q,
        (snapshot) => {
          console.log('Firebase connected successfully!');
          setDbConnected(true);
          setError('');

          const messagesData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            timestamp: doc.data().timestamp // Keep as is for display
          }));
          setMessages(messagesData);
          setLoading(false);
        },
        (error) => {
          console.error('Firebase error:', error);
          setDbConnected(false);

          if (error.code === 'failed-precondition') {
            setError('Firestore not enabled. Please enable it in Firebase Console.');
          } else if (error.code === 'permission-denied') {
            setError('Permission denied. Check Firebase security rules.');
          } else if (error.code === 'unavailable') {
            setError('Network error. Please check your internet connection.');
          } else {
            setError(`Failed to load messages: ${error.message}`);
          }

          setLoading(false);

          // Try to load from localStorage as fallback
          loadFromLocalStorage();
        }
      );

      return () => unsubscribe();
    } catch (error) {
      console.error('Unexpected error:', error);
      setError('Unexpected error occurred. Please refresh the page.');
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Load messages from localStorage as fallback
  const loadFromLocalStorage = () => {
    try {
      const savedMessages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
      if (savedMessages.length > 0) {
        setMessages(savedMessages);
        console.log('Loaded messages from localStorage:', savedMessages.length);
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('portfolio_admin_auth', 'true');
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('portfolio_admin_auth');
    setPassword('');
    setMessages([]);
    setError('');
  };

  const retryConnection = () => {
    setLoading(true);
    setError('');
    // Force re-render by toggling auth state briefly
    setIsAuthenticated(false);
    setTimeout(() => setIsAuthenticated(true), 100);
  };

  const markAsRead = async (id) => {
    try {
      await updateDoc(doc(db, 'messages', id), {
        read: true,
        readAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error marking as read:', error);
      setError('Failed to update message. Please try again.');
    }
  };

  const deleteMessage = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteDoc(doc(db, 'messages', id));
      } catch (error) {
        console.error('Error deleting message:', error);
        setError('Failed to delete message.');
      }
    }
  };

  const exportToCSV = () => {
    const filtered = filterMessages();
    const csvContent = [
      ['Name', 'Email', 'Subject', 'Message', 'Date', 'Status'],
      ...filtered.map(msg => [
        msg.name,
        msg.email,
        msg.subject,
        `"${msg.message.replace(/"/g, '""')}"`,
        msg.timestamp ? new Date(msg.timestamp.toDate ? msg.timestamp.toDate() : new Date(msg.timestamp)).toLocaleString() : 'No date',
        msg.read ? 'Read' : 'Unread'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `messages_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const filterMessages = () => {
    let filtered = messages;

    if (searchTerm) {
      filtered = filtered.filter(msg =>
        msg.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.message?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filter === 'read') {
      filtered = filtered.filter(msg => msg.read);
    } else if (filter === 'unread') {
      filtered = filtered.filter(msg => !msg.read);
    }

    return filtered;
  };

  const getStats = () => {
    const total = messages.length;
    const read = messages.filter(msg => msg.read).length;
    const unread = total - read;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCount = messages.filter(msg => {
      if (!msg.timestamp) return false;
      const msgDate = msg.timestamp.toDate ? msg.timestamp.toDate() : new Date(msg.timestamp);
      return msgDate >= today;
    }).length;

    return { total, read, unread, todayCount };
  };

  const stats = getStats();
  const filteredMessages = filterMessages();

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <div className="login-container">
          <div className="login-card">
            <h2>
              <FiMessageSquare />
              Admin Dashboard
            </h2>
            <p className="login-subtitle">Enter password to access messages</p>

            <form onSubmit={handleLogin} className="login-form">
              {error && (
                <div className="login-error">
                  <FiAlertCircle />
                  <span>{error}</span>
                </div>
              )}

              <div className="form-group">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                  autoFocus
                />
              </div>

              <button type="submit" className="btn btn-login">
                <FiMessageSquare />
                Login to Dashboard
              </button>
            </form>

            <div className="login-info">
              <FiDatabase />
              <p>Messages are stored in Firebase Firestore</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div className="header-left">
          <h1>
            <FiMessageSquare />
            Message Dashboard
          </h1>
          <p className="dashboard-subtitle">
            {dbConnected ? (
              <span className="db-status connected">
                <FiCheckCircle /> Connected to Firebase
              </span>
            ) : (
              <span className="db-status disconnected">
                <FiAlertCircle /> Using local storage
              </span>
            )}
          </p>
        </div>

        <div className="header-right">
          {!dbConnected && (
            <button className="btn btn-retry" onClick={retryConnection}>
              <FiRefreshCw />
              Retry Connection
            </button>
          )}
          <button className="btn btn-export" onClick={exportToCSV}>
            <FiDownload />
            Export CSV
          </button>
          <button className="btn btn-logout" onClick={handleLogout}>
            <FiLogOut />
            Logout
          </button>
        </div>
      </div>

      {error && (
        <div className="dashboard-error">
          <div className="error-content">
            <FiAlertCircle />
            <span>{error}</span>
          </div>
          <button onClick={() => setError('')} className="error-close">
            &times;
          </button>
        </div>
      )}

      {!dbConnected && (
        <div className="db-warning">
          <FiAlertCircle />
          <div>
            <strong>Firebase connection failed.</strong>
            <p>Showing locally stored messages. Messages may not sync with Firebase.</p>
            <button onClick={retryConnection} className="btn-link">
              Click here to retry connection
            </button>
          </div>
        </div>
      )}

      <div className="dashboard-stats">
        <div className="stat-card stat-total">
          <div className="stat-icon">
            <FiMail />
          </div>
          <div className="stat-content">
            <h3>{stats.total}</h3>
            <p>Total Messages</p>
          </div>
        </div>

        <div className="stat-card stat-unread">
          <div className="stat-icon">
            <FiEyeOff />
          </div>
          <div className="stat-content">
            <h3>{stats.unread}</h3>
            <p>Unread Messages</p>
          </div>
        </div>

        <div className="stat-card stat-read">
          <div className="stat-icon">
            <FiEye />
          </div>
          <div className="stat-content">
            <h3>{stats.read}</h3>
            <p>Read Messages</p>
          </div>
        </div>

        <div className="stat-card stat-today">
          <div className="stat-icon">
            <FiCalendar />
          </div>
          <div className="stat-content">
            <h3>{stats.todayCount}</h3>
            <p>Today</p>
          </div>
        </div>
      </div>

      <div className="dashboard-controls">
        <div className="search-control">
          <div className="search-box">
            <FiSearch />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="filter-control">
          <div className="filter-buttons">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({stats.total})
            </button>
            <button
              className={`filter-btn ${filter === 'unread' ? 'active' : ''}`}
              onClick={() => setFilter('unread')}
            >
              Unread ({stats.unread})
            </button>
            <button
              className={`filter-btn ${filter === 'read' ? 'active' : ''}`}
              onClick={() => setFilter('read')}
            >
              Read ({stats.read})
            </button>
          </div>
        </div>
      </div>

      <div className="messages-container">
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Connecting to Firebase...</p>
            <small>This may take a moment</small>
          </div>
        ) : filteredMessages.length === 0 ? (
          <div className="empty-state">
            <FiMessageSquare />
            <h3>No messages found</h3>
            <p>{searchTerm || filter !== 'all' ? 'Try changing your search or filter' : 'No messages received yet'}</p>
          </div>
        ) : (
          <div className="messages-list">
            {filteredMessages.map((msg) => (
              <div
                key={msg.id}
                className={`message-card ${msg.read ? 'read' : 'unread'}`}
                onClick={() => setSelectedMessage(msg)}
              >
                <div className="message-header">
                  <div className="sender-info">
                    <div className="sender-avatar">
                      {msg.name?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                    <div className="sender-details">
                      <h4 className="sender-name">{msg.name || 'Unknown'}</h4>
                      <p className="sender-email">{msg.email || 'No email'}</p>
                    </div>
                  </div>

                  <div className="message-meta">
                    <span className="timestamp">
                      <FiCalendar />
                      {msg.timestamp ? (
                        msg.timestamp.toDate ?
                          msg.timestamp.toDate().toLocaleString() :
                          new Date(msg.timestamp).toLocaleString()
                      ) : 'No date'}
                    </span>
                    {!msg.read && <span className="unread-badge">NEW</span>}
                    {msg.savedLocally && <span className="local-badge">LOCAL</span>}
                  </div>
                </div>

                <div className="message-content">
                  <h5 className="message-subject">
                    {msg.subject || 'No Subject'}
                  </h5>
                  <p className="message-preview">
                    {msg.message?.length > 150 ? `${msg.message.substring(0, 150)}...` : msg.message || 'No message'}
                  </p>
                </div>

                <div className="message-actions">
                  {!msg.read && !msg.savedLocally && (
                    <button
                      className="btn-action btn-mark-read"
                      onClick={(e) => {
                        e.stopPropagation();
                        markAsRead(msg.id);
                      }}
                    >
                      <FiCheckCircle />
                      Mark as Read
                    </button>
                  )}
                  <button
                    className="btn-action btn-delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteMessage(msg.id);
                    }}
                  >
                    <FiTrash2 />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="modal-overlay" onClick={() => setSelectedMessage(null)}>
          <div className="message-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Message Details</h2>
              <button
                className="close-modal"
                onClick={() => setSelectedMessage(null)}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <div className="message-detail">
                <div className="detail-section">
                  <div className="detail-label">From</div>
                  <div className="sender-info-modal">
                    <div className="detail-avatar">
                      {selectedMessage.name?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                    <div>
                      <h3>{selectedMessage.name || 'Unknown'}</h3>
                      <p className="detail-email">{selectedMessage.email || 'No email'}</p>
                    </div>
                  </div>
                </div>

                <div className="detail-section">
                  <div className="detail-label">Subject</div>
                  <div className="detail-value">
                    {selectedMessage.subject || 'No Subject'}
                  </div>
                </div>

                <div className="detail-section">
                  <div className="detail-label">Date</div>
                  <div className="detail-value">
                    <FiCalendar />
                    {selectedMessage.timestamp ? (
                      selectedMessage.timestamp.toDate ?
                        selectedMessage.timestamp.toDate().toLocaleString() :
                        new Date(selectedMessage.timestamp).toLocaleString()
                    ) : 'No date'}
                  </div>
                </div>

                <div className="detail-section">
                  <div className="detail-label">Message</div>
                  <div className="message-full">
                    {selectedMessage.message || 'No message content'}
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                {!selectedMessage.read && !selectedMessage.savedLocally && (
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      markAsRead(selectedMessage.id);
                      setSelectedMessage({ ...selectedMessage, read: true });
                    }}
                  >
                    <FiCheckCircle />
                    Mark as Read
                  </button>
                )}
                <button
                  className="btn btn-delete"
                  onClick={() => {
                    deleteMessage(selectedMessage.id);
                    setSelectedMessage(null);
                  }}
                >
                  <FiTrash2 />
                  Delete Message
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedMessage(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;