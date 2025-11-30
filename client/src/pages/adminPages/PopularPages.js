import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../../components/adminComponents/AdminNavbar';
import AdminSidebar from '../../components/adminComponents/AdminSidebar';
import API from '../../api/axios';
import '@esri/calcite-components/components/calcite-shell';
import '@esri/calcite-components/components/calcite-button';
import '@esri/calcite-components/components/calcite-card';
import '@esri/calcite-components/components/calcite-chip';
import '@esri/calcite-components/components/calcite-select';
import '@esri/calcite-components/components/calcite-option';
import '@esri/calcite-components/components/calcite-loader';
import '@esri/calcite-components/components/calcite-notice';

// Custom Bar Chart Component
const HorizontalBarChart = ({ data, height = 400 }) => {
  const maxValue = Math.max(...data.map(d => d.views));
  
  return (
    <div style={{ padding: '16px 0' }}>
      {data.map((item, index) => {
        const percentage = (item.views / maxValue) * 100;
        const barColor = index === 0 ? '#0079c1' : index === 1 ? '#00a884' : index === 2 ? '#ffa500' : '#6b6b6b';
        
        return (
          <div key={item.page} style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                <span style={{ 
                  fontSize: '18px', 
                  fontWeight: '700', 
                  color: '#999',
                  minWidth: '24px'
                }}>
                  {index + 1}
                </span>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '600', color: '#2b2b2b' }}>
                    {item.page}
                  </div>
                  <div style={{ fontSize: '13px', color: '#6b6b6b' }}>
                    {item.path}
                  </div>
                </div>
              </div>
              
              <div style={{ textAlign: 'right', minWidth: '140px' }}>
                <div style={{ fontSize: '20px', fontWeight: '700', color: barColor }}>
                  {item.views.toLocaleString()}
                </div>
                <div style={{ fontSize: '12px', color: '#999' }}>
                  {item.avgTime} avg time
                </div>
              </div>
            </div>
            
            <div style={{ 
              width: '100%', 
              height: '10px', 
              background: '#f0f0f0', 
              borderRadius: '5px',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <div 
                style={{ 
                  width: `${percentage}%`, 
                  height: '100%', 
                  background: barColor,
                  transition: 'width 0.6s ease',
                  borderRadius: '5px'
                }}
              />
            </div>
            
            <div style={{ 
              display: 'flex', 
              gap: '16px', 
              marginTop: '8px',
              fontSize: '12px',
              color: '#6b6b6b'
            }}>
              <span>👁️ Unique: {item.uniqueViews.toLocaleString()}</span>
              <span>↩️ Bounce: {item.bounceRate}%</span>
              <span>🚪 Exit: {item.exitRate}%</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default function PopularPages() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState('7days');
  
  // TEMPORARY: Mock data based on your actual pages
  const [pageStats, setPageStats] = useState({
    totalPageViews: 89234,
    uniquePageViews: 62450,
    avgTimeOnPage: '2m 18s',
    totalPages: 5
  });

  const [popularPages, setPopularPages] = useState([
    { 
      page: 'Home Page', 
      path: '/', 
      views: 32450, 
      uniqueViews: 28340,
      avgTime: '2m 45s',
      bounceRate: 38.2,
      exitRate: 25.4
    },
    { 
      page: 'Products Page', 
      path: '/products', 
      views: 28920, 
      uniqueViews: 24567,
      avgTime: '3m 12s',
      bounceRate: 32.1,
      exitRate: 28.9
    },
    { 
      page: 'About Page', 
      path: '/about', 
      views: 15670, 
      uniqueViews: 13245,
      avgTime: '2m 56s',
      bounceRate: 42.5,
      exitRate: 35.2
    },
    { 
      page: 'Services Page', 
      path: '/services', 
      views: 8934, 
      uniqueViews: 7823,
      avgTime: '2m 21s',
      bounceRate: 45.8,
      exitRate: 38.6
    },
    { 
      page: 'Contact Page', 
      path: '/contact', 
      views: 3260, 
      uniqueViews: 2876,
      avgTime: '1m 34s',
      bounceRate: 28.4,
      exitRate: 65.3
    }
  ]);

  const [pageFlow, setPageFlow] = useState([
    { from: 'Home Page', to: 'Products Page', count: 12340 },
    { from: 'Products Page', to: 'Contact Page', count: 5670 },
    { from: 'Home Page', to: 'About Page', count: 4890 },
    { from: 'About Page', to: 'Services Page', count: 3450 },
    { from: 'Services Page', to: 'Contact Page', count: 2120 }
  ]);

  const [entryPages, setEntryPages] = useState([
    { page: 'Home Page', entries: 48234, percentage: 77.2 },
    { page: 'Products Page', entries: 8920, percentage: 14.3 },
    { page: 'About Page', entries: 3450, percentage: 5.5 },
    { page: 'Services Page', entries: 1230, percentage: 2.0 },
    { page: 'Contact Page', entries: 620, percentage: 1.0 }
  ]);

  useEffect(() => {
    // fetchPageData();
  }, [timeRange]);

  const fetchPageData = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/analytics/pages?range=${timeRange}`);
      // setPageStats(response.data.stats);
      // setPopularPages(response.data.pages);
    } catch (err) {
      console.error('Error fetching page data:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  return (
    <calcite-shell>
      <AdminNavbar />
      <AdminSidebar />
      
      <div style={{ padding: '24px', height: '100%', overflow: 'auto', background: 'var(--calcite-ui-background)' }}>
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
                Popular Pages
              </h1>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--calcite-ui-text-3)' }}>
                Page performance and visitor behavior analysis
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <calcite-select
                value={timeRange}
                onCalciteSelectChange={(e) => setTimeRange(e.target.value)}
                style={{ width: '150px' }}
              >
                <calcite-option value="24hours">Last 24 Hours</calcite-option>
                <calcite-option value="7days">Last 7 Days</calcite-option>
                <calcite-option value="30days">Last 30 Days</calcite-option>
                <calcite-option value="90days">Last 90 Days</calcite-option>
              </calcite-select>
              <calcite-button
                appearance="outline"
                icon-start="arrow-left"
                onClick={() => navigate('/admin/dashboard')}
              >
                Back
              </calcite-button>
            </div>
          </div>

          {/* Key Metrics Cards */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <calcite-card>
              <div style={{ padding: '20px' }}>
                <div style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)', marginBottom: '8px' }}>
                  Total Page Views
                </div>
                <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--calcite-ui-brand)' }}>
                  {formatNumber(pageStats.totalPageViews)}
                </div>
              </div>
            </calcite-card>

            <calcite-card>
              <div style={{ padding: '20px' }}>
                <div style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)', marginBottom: '8px' }}>
                  Unique Page Views
                </div>
                <div style={{ fontSize: '32px', fontWeight: '700', color: '#00a884' }}>
                  {formatNumber(pageStats.uniquePageViews)}
                </div>
              </div>
            </calcite-card>

            <calcite-card>
              <div style={{ padding: '20px' }}>
                <div style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)', marginBottom: '8px' }}>
                  Avg. Time on Page
                </div>
                <div style={{ fontSize: '32px', fontWeight: '700', color: '#9333ea' }}>
                  {pageStats.avgTimeOnPage}
                </div>
              </div>
            </calcite-card>

            <calcite-card>
              <div style={{ padding: '20px' }}>
                <div style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)', marginBottom: '8px' }}>
                  Total Pages
                </div>
                <div style={{ fontSize: '32px', fontWeight: '700', color: '#ffa500' }}>
                  {pageStats.totalPages}
                </div>
              </div>
            </calcite-card>
          </div>

          {/* Most Visited Pages */}
          <calcite-card style={{ marginBottom: '24px' }}>
            <div style={{ padding: '24px' }}>
              <h2 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600' }}>
                Most Visited Pages
              </h2>
              
              {loading ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <calcite-loader scale="l"></calcite-loader>
                </div>
              ) : (
                <HorizontalBarChart data={popularPages} />
              )}
            </div>
          </calcite-card>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
            {/* Entry Pages */}
            <calcite-card>
              <div style={{ padding: '24px' }}>
                <h2 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600' }}>
                  Top Entry Pages
                </h2>
                <p style={{ fontSize: '13px', color: 'var(--calcite-ui-text-3)', marginBottom: '20px' }}>
                  Pages where visitors first land on your site
                </p>
                {entryPages.map((page, index) => (
                  <div key={index} style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontWeight: '600', fontSize: '14px' }}>{page.page}</span>
                      <span style={{ color: 'var(--calcite-ui-text-3)', fontSize: '14px' }}>
                        {formatNumber(page.entries)} ({page.percentage}%)
                      </span>
                    </div>
                    <div style={{ 
                      width: '100%', 
                      height: '8px', 
                      background: 'var(--calcite-ui-foreground-2)', 
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{ 
                        width: `${page.percentage}%`, 
                        height: '100%', 
                        background: index === 0 ? '#0079c1' : '#6b6b6b',
                        transition: 'width 0.3s ease'
                      }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </calcite-card>

            {/* Page Flow */}
            <calcite-card>
              <div style={{ padding: '24px' }}>
                <h2 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600' }}>
                  Top Page Transitions
                </h2>
                <p style={{ fontSize: '13px', color: 'var(--calcite-ui-text-3)', marginBottom: '20px' }}>
                  Most common navigation paths
                </p>
                {pageFlow.map((flow, index) => (
                  <div key={index} style={{ 
                    padding: '16px',
                    background: 'var(--calcite-ui-foreground-2)',
                    borderRadius: '4px',
                    marginBottom: '12px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '13px', color: 'var(--calcite-ui-text-3)' }}>
                          {flow.from}
                        </div>
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '8px',
                          margin: '4px 0'
                        }}>
                          <div style={{ 
                            width: '20px', 
                            height: '2px', 
                            background: '#0079c1' 
                          }}></div>
                          <calcite-icon icon="arrow-right" scale="s"></calcite-icon>
                          <div style={{ 
                            width: '20px', 
                            height: '2px', 
                            background: '#0079c1' 
                          }}></div>
                        </div>
                        <div style={{ fontSize: '13px', fontWeight: '600' }}>
                          {flow.to}
                        </div>
                      </div>
                      <div style={{ 
                        fontSize: '20px', 
                        fontWeight: '700', 
                        color: '#0079c1',
                        minWidth: '80px',
                        textAlign: 'right'
                      }}>
                        {formatNumber(flow.count)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </calcite-card>
          </div>

          {/* Performance Insights */}
          <calcite-card>
            <div style={{ padding: '24px' }}>
              <h2 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600' }}>
                Performance Insights
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                <calcite-notice open icon="lightbulb" kind="success">
                  <div slot="title">Strong Performance</div>
                  <div slot="message">
                    Products Page has the lowest bounce rate (32.1%) and highest engagement time
                  </div>
                </calcite-notice>
                
                <calcite-notice open icon="exclamation-mark-triangle" kind="warning">
                  <div slot="title">Attention Needed</div>
                  <div slot="message">
                    Services Page has a 45.8% bounce rate. Consider improving content or CTAs
                  </div>
                </calcite-notice>
                
                <calcite-notice open icon="information" kind="brand">
                  <div slot="title">Optimization Opportunity</div>
                  <div slot="message">
                    Contact Page is a high-exit page (65.3%). This is expected for conversion pages
                  </div>
                </calcite-notice>
              </div>
            </div>
          </calcite-card>
        </div>
      </div>
    </calcite-shell>
  );
}