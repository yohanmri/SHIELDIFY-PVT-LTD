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
import '@esri/calcite-components/components/calcite-notice';
import '@esri/calcite-components/components/calcite-loader';

// Custom Chart Components
const LineChart = ({ data, height = 350 }) => {
  const maxValue = Math.max(...data.map(d => Math.max(d.visitors, d.unique, d.pageViews)));
  const width = 100;
  const padding = 10;

  const getY = (value) => {
    return height - (value / maxValue) * (height - 40) - 20;
  };

  const getX = (index) => {
    return (index / (data.length - 1)) * (width - padding * 2) + padding;
  };

  const createPath = (dataKey) => {
    return data.map((d, i) => {
      const x = getX(i);
      const y = getY(d[dataKey]);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  return (
    <div style={{ position: 'relative', height: `${height}px`, width: '100%' }}>
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map(i => (
          <line
            key={i}
            x1={padding}
            y1={20 + (i * (height - 40) / 4)}
            x2={width - padding}
            y2={20 + (i * (height - 40) / 4)}
            stroke="#e0e0e0"
            strokeWidth="0.2"
            strokeDasharray="2,2"
          />
        ))}

        {/* Lines */}
        <path d={createPath('visitors')} fill="none" stroke="#0079c1" strokeWidth="0.5" />
        <path d={createPath('unique')} fill="none" stroke="#00a884" strokeWidth="0.5" />
        <path d={createPath('pageViews')} fill="none" stroke="#ffa500" strokeWidth="0.5" />

        {/* Points */}
        {data.map((d, i) => (
          <g key={i}>
            <circle cx={getX(i)} cy={getY(d.visitors)} r="0.8" fill="#0079c1" />
            <circle cx={getX(i)} cy={getY(d.unique)} r="0.8" fill="#00a884" />
            <circle cx={getX(i)} cy={getY(d.pageViews)} r="0.8" fill="#ffa500" />
          </g>
        ))}
      </svg>

      {/* Labels */}
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', fontSize: '12px', color: '#666' }}>
        {data.map((d, i) => (
          <span key={i}>{d.date}</span>
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '16px', fontSize: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '12px', height: '12px', background: '#0079c1', borderRadius: '2px' }}></div>
          <span>Total Visitors</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '12px', height: '12px', background: '#00a884', borderRadius: '2px' }}></div>
          <span>Unique Visitors</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '12px', height: '12px', background: '#ffa500', borderRadius: '2px' }}></div>
          <span>Page Views</span>
        </div>
      </div>
    </div>
  );
};

const AreaChart = ({ data, height = 350 }) => {
  const maxValue = Math.max(...data.map(d => d.visitors + d.unique));
  const width = 100;
  const padding = 10;

  const getY = (value) => {
    return height - (value / maxValue) * (height - 40) - 20;
  };

  const getX = (index) => {
    return (index / (data.length - 1)) * (width - padding * 2) + padding;
  };

  const createAreaPath = (dataKey) => {
    const topPath = data.map((d, i) => {
      const x = getX(i);
      const y = getY(d[dataKey]);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');

    const bottomPath = data.map((d, i) => {
      const x = getX(data.length - 1 - i);
      return `L ${x} ${height - 20}`;
    }).join(' ');

    return `${topPath} ${bottomPath} Z`;
  };

  return (
    <div style={{ position: 'relative', height: `${height}px`, width: '100%' }}>
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map(i => (
          <line
            key={i}
            x1={padding}
            y1={20 + (i * (height - 40) / 4)}
            x2={width - padding}
            y2={20 + (i * (height - 40) / 4)}
            stroke="#e0e0e0"
            strokeWidth="0.2"
            strokeDasharray="2,2"
          />
        ))}

        {/* Areas */}
        <path d={createAreaPath('visitors')} fill="#0079c1" fillOpacity="0.3" stroke="#0079c1" strokeWidth="0.5" />
        <path d={createAreaPath('unique')} fill="#00a884" fillOpacity="0.3" stroke="#00a884" strokeWidth="0.5" />
      </svg>

      {/* Labels */}
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', fontSize: '12px', color: '#666' }}>
        {data.map((d, i) => (
          <span key={i}>{d.date}</span>
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '16px', fontSize: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '12px', height: '12px', background: '#0079c1', borderRadius: '2px', opacity: 0.6 }}></div>
          <span>Total Visitors</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '12px', height: '12px', background: '#00a884', borderRadius: '2px', opacity: 0.6 }}></div>
          <span>Unique Visitors</span>
        </div>
      </div>
    </div>
  );
};

const BarChart = ({ data, height = 350, dataKey = 'visitors' }) => {
  const maxValue = Math.max(...data.map(d => d[dataKey]));

  return (
    <div style={{ position: 'relative', height: `${height}px`, width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', height: 'calc(100% - 40px)', padding: '20px 10px' }}>
        {data.map((d, i) => {
          const barHeight = (d[dataKey] / maxValue) * 100;
          return (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', maxWidth: '80px' }}>
              <div style={{ fontSize: '11px', color: '#666', fontWeight: '600' }}>
                {d[dataKey].toLocaleString()}
              </div>
              <div
                style={{
                  width: '100%',
                  height: `${barHeight}%`,
                  background: '#0079c1',
                  borderRadius: '4px 4px 0 0',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.target.style.background = '#005a8c'}
                onMouseLeave={(e) => e.target.style.background = '#0079c1'}
              />
            </div>
          );
        })}
      </div>

      {/* Labels */}
      <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '12px', color: '#666', padding: '0 10px' }}>
        {data.map((d, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center', maxWidth: '80px' }}>
            {d.date || d.hour}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function TotalVisitors() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState('7days');
  const [viewType, setViewType] = useState('line');

  const [visitorStats, setVisitorStats] = useState({
    totalVisitors: 0,
    uniqueVisitors: 0,
    pageViews: 0,
    avgSessionDuration: '0m 0s',
    bounceRate: '0%',
    returningVisitors: 0,
    newVisitors: 0
  });

  const [visitorTrend, setVisitorTrend] = useState([]);
  const [hourlyData, setHourlyData] = useState([]);
  const [visitorTypes, setVisitorTypes] = useState([]);

  useEffect(() => {
    fetchVisitorData();
  }, [timeRange]);

  const fetchVisitorData = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/analytics/visitor-stats?range=${timeRange}`);

      if (response.data.success) {
        const data = response.data.data;
        setVisitorStats(data);
        setVisitorTrend(data.trend);
        setHourlyData(data.hourlyData);
        setVisitorTypes(data.visitorTypes);
      }
    } catch (err) {
      console.error('Error fetching visitor data:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  const calculateGrowth = () => {
    if (visitorTrend.length < 2) return 0;
    const current = visitorTrend[visitorTrend.length - 1].visitors;
    const previous = visitorTrend[visitorTrend.length - 2].visitors;
    return (((current - previous) / previous) * 100).toFixed(1);
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
                Total Visitors
              </h1>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--calcite-ui-text-3)' }}>
                Comprehensive visitor statistics and trends
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
                <calcite-option value="1year">Last Year</calcite-option>
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '24px'
          }}>
            <calcite-card>
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)' }}>Total Visitors</span>
                  <calcite-chip scale="s" kind="success">+{calculateGrowth()}%</calcite-chip>
                </div>
                <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--calcite-ui-brand)' }}>
                  {formatNumber(visitorStats.totalVisitors)}
                </div>
              </div>
            </calcite-card>

            <calcite-card>
              <div style={{ padding: '20px' }}>
                <div style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)', marginBottom: '8px' }}>
                  Unique Visitors
                </div>
                <div style={{ fontSize: '32px', fontWeight: '700', color: '#00a884' }}>
                  {formatNumber(visitorStats.uniqueVisitors)}
                </div>
              </div>
            </calcite-card>

            <calcite-card>
              <div style={{ padding: '20px' }}>
                <div style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)', marginBottom: '8px' }}>
                  Page Views
                </div>
                <div style={{ fontSize: '32px', fontWeight: '700', color: '#ffa500' }}>
                  {formatNumber(visitorStats.pageViews)}
                </div>
              </div>
            </calcite-card>

            <calcite-card>
              <div style={{ padding: '20px' }}>
                <div style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)', marginBottom: '8px' }}>
                  Avg. Session Duration
                </div>
                <div style={{ fontSize: '32px', fontWeight: '700', color: '#9333ea' }}>
                  {visitorStats.avgSessionDuration}
                </div>
              </div>
            </calcite-card>
          </div>

          {/* Visitor Trend Chart */}
          <calcite-card style={{ marginBottom: '24px' }}>
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>Visitor Trends</h2>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <calcite-button
                    appearance={viewType === 'line' ? 'solid' : 'outline'}
                    scale="s"
                    onClick={() => setViewType('line')}
                  >
                    Line
                  </calcite-button>
                  <calcite-button
                    appearance={viewType === 'area' ? 'solid' : 'outline'}
                    scale="s"
                    onClick={() => setViewType('area')}
                  >
                    Area
                  </calcite-button>
                  <calcite-button
                    appearance={viewType === 'bar' ? 'solid' : 'outline'}
                    scale="s"
                    onClick={() => setViewType('bar')}
                  >
                    Bar
                  </calcite-button>
                </div>
              </div>

              {loading ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <calcite-loader scale="l"></calcite-loader>
                </div>
              ) : (
                <>
                  {viewType === 'line' && <LineChart data={visitorTrend} />}
                  {viewType === 'area' && <AreaChart data={visitorTrend} />}
                  {viewType === 'bar' && <BarChart data={visitorTrend} dataKey="visitors" />}
                </>
              )}
            </div>
          </calcite-card>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
            {/* Hourly Distribution */}
            <calcite-card>
              <div style={{ padding: '24px' }}>
                <h2 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600' }}>Hourly Distribution</h2>
                <BarChart data={hourlyData} dataKey="visitors" height={300} />
              </div>
            </calcite-card>

            {/* Visitor Types */}
            <calcite-card>
              <div style={{ padding: '24px' }}>
                <h2 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600' }}>Visitor Types</h2>
                {visitorTypes && visitorTypes.length > 0 ? (
                  <>
                    {visitorTypes.map((type, index) => (
                      <div key={index} style={{ marginBottom: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{ fontWeight: '600' }}>{type.type}</span>
                          <span style={{ color: 'var(--calcite-ui-text-3)' }}>
                            {formatNumber(type.count)} ({type.percentage}%)
                          </span>
                        </div>
                        <div style={{
                          width: '100%',
                          height: '12px',
                          background: 'var(--calcite-ui-foreground-2)',
                          borderRadius: '6px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            width: `${type.percentage}%`,
                            height: '100%',
                            background: index === 0 ? '#0079c1' : '#00a884',
                            transition: 'width 0.3s ease'
                          }}></div>
                        </div>
                      </div>
                    ))}
                    {visitorTypes.length > 1 && (
                      <div style={{
                        marginTop: '24px',
                        padding: '16px',
                        background: 'var(--calcite-ui-foreground-2)',
                        borderRadius: '4px'
                      }}>
                        <div style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)', marginBottom: '4px' }}>
                          Returning Rate
                        </div>
                        <div style={{ fontSize: '24px', fontWeight: '700', color: '#00a884' }}>
                          {visitorTypes[1].percentage}%
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div style={{ textAlign: 'center', padding: '20px', color: 'var(--calcite-ui-text-3)' }}>
                    No visitor type data available
                  </div>
                )}
              </div>
            </calcite-card>
          </div>

          {/* Additional Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            <calcite-card>
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)', marginBottom: '8px' }}>
                  Bounce Rate
                </div>
                <div style={{ fontSize: '36px', fontWeight: '700', color: '#dc3545' }}>
                  {visitorStats.bounceRate}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--calcite-ui-text-3)', marginTop: '8px' }}>
                  Lower is better
                </div>
              </div>
            </calcite-card>

            <calcite-card>
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)', marginBottom: '8px' }}>
                  Pages per Session
                </div>
                <div style={{ fontSize: '36px', fontWeight: '700', color: '#0079c1' }}>
                  {(visitorStats.pageViews / visitorStats.totalVisitors).toFixed(2)}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--calcite-ui-text-3)', marginTop: '8px' }}>
                  Avg. pages viewed
                </div>
              </div>
            </calcite-card>

            <calcite-card>
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: '14px', color: 'var(--calcite-ui-text-3)', marginBottom: '8px' }}>
                  New Visitors
                </div>
                <div style={{ fontSize: '36px', fontWeight: '700', color: '#ffa500' }}>
                  {formatNumber(visitorStats.newVisitors)}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--calcite-ui-text-3)', marginTop: '8px' }}>
                  First-time visitors
                </div>
              </div>
            </calcite-card>
          </div>
        </div>
      </div>
    </calcite-shell>
  );
}