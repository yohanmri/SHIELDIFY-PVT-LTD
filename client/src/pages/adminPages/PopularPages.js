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
import '@esri/calcite-components/components/calcite-icon';

// Custom Bar Chart Component
const HorizontalBarChart = ({ data, height = 400 }) => {
  if (!data || data.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#6b6b6b' }}>
        No page data available for this time period
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => d.views));

  return (
    <div style={{ padding: '16px 0' }}>
      {data.map((item, index) => {
        const percentage = (item.views / maxValue) * 100;
        const barColor = index === 0 ? '#0079c1' : index === 1 ? '#00a884' : index === 2 ? '#ffa500' : '#6b6b6b';

        return (
          <div key={item.path} style={{ marginBottom: '20px' }}>
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
                    {item.title}
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
                  {item.uniqueVisitors} unique
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
              <span>👁️ Unique: {item.uniqueVisitors.toLocaleString()}</span>
              <span>↩️ Bounce: {item.bounceRate}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default function PopularPages() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7days');

  const [pageStats, setPageStats] = useState({
    totalPageViews: 0,
    uniquePageViews: 0,
    avgTimeOnPage: '0s',
    totalPages: 0
  });

  const [popularPages, setPopularPages] = useState([]);

  useEffect(() => {
    fetchPageData();
  }, [timeRange]);

  const fetchPageData = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/analytics/popular-pages?range=${timeRange}`);

      if (response.data.success) {
        const pages = response.data.data.pages;

        // Calculate stats
        const totalViews = pages.reduce((sum, page) => sum + page.views, 0);
        const totalUnique = pages.reduce((sum, page) => sum + page.uniqueVisitors, 0);

        setPageStats({
          totalPageViews: totalViews,
          uniquePageViews: totalUnique,
          avgTimeOnPage: pages.length > 0 ? `${Math.round(pages.reduce((sum, p) => sum + p.avgDuration, 0) / pages.length)}s` : '0s',
          totalPages: pages.length
        });

        setPopularPages(pages);
      }
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
                  {loading ? '...' : formatNumber(pageStats.totalPageViews)}
                </div>
              </div>
            </calcite-card>

            <calcite-card>
              <div style={{ padding: '20px' }}>
                <div style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)', marginBottom: '8px' }}>
                  Unique Page Views
                </div>
                <div style={{ fontSize: '32px', fontWeight: '700', color: '#00a884' }}>
                  {loading ? '...' : formatNumber(pageStats.uniquePageViews)}
                </div>
              </div>
            </calcite-card>

            <calcite-card>
              <div style={{ padding: '20px' }}>
                <div style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)', marginBottom: '8px' }}>
                  Avg. Time on Page
                </div>
                <div style={{ fontSize: '32px', fontWeight: '700', color: '#9333ea' }}>
                  {loading ? '...' : pageStats.avgTimeOnPage}
                </div>
              </div>
            </calcite-card>

            <calcite-card>
              <div style={{ padding: '20px' }}>
                <div style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)', marginBottom: '8px' }}>
                  Total Pages
                </div>
                <div style={{ fontSize: '32px', fontWeight: '700', color: '#ffa500' }}>
                  {loading ? '...' : pageStats.totalPages}
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

          {/* Performance Insights */}
          {!loading && popularPages.length > 0 && (
            <calcite-card>
              <div style={{ padding: '24px' }}>
                <h2 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600' }}>
                  Performance Insights
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                  {popularPages[0] && (
                    <calcite-notice open icon="lightbulb" kind="success">
                      <div slot="title">Most Popular</div>
                      <div slot="message">
                        {popularPages[0].page} is your most visited page with {formatNumber(popularPages[0].views)} views
                      </div>
                    </calcite-notice>
                  )}
                </div>
              </div>
            </calcite-card>
          )}
        </div>
      </div>
    </calcite-shell>
  );
}