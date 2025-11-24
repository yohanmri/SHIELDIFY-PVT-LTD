import React from 'react';
import '@esri/calcite-components/components/calcite-card';
import '@esri/calcite-components/components/calcite-icon';
import '@esri/calcite-components/components/calcite-chip';
import '../../styles/clientStyles/solutions.css';

export default function Solutions() {
  const solutions = [
    {
      icon: 'urban-model',
      title: 'Urban Planning',
      description: 'Smart city planning and infrastructure development with advanced spatial analysis',
      industries: ['City Planning', 'Infrastructure', 'Zoning'],
      color: '#007ac2'
    },
    {
      icon: 'organization',
      title: 'Agriculture & Forestry',
      description: 'Precision agriculture, crop monitoring, and sustainable forest management solutions',
      industries: ['Crop Monitoring', 'Yield Analysis', 'Forest Management'],
      color: '#35ac46'
    },
    {
      icon: 'globe',
      title: 'Environmental Management',
      description: 'Environmental monitoring, conservation planning, and natural resource management',
      industries: ['Conservation', 'Climate Analysis', 'Wildlife Tracking'],
      color: '#149ece'
    },
    {
      icon: 'road-sign',
      title: 'Transportation & Logistics',
      description: 'Route optimization, fleet management, and transportation network analysis',
      industries: ['Route Planning', 'Fleet Tracking', 'Traffic Analysis'],
      color: '#d83020'
    },
    {
      icon: 'electrical-grid',
      title: 'Utilities & Infrastructure',
      description: 'Asset management, network analysis, and utility infrastructure planning',
      industries: ['Asset Management', 'Network Design', 'Maintenance'],
      color: '#f89927'
    },
    {
      icon: 'home',
      title: 'Real Estate',
      description: 'Property analysis, market research, and site selection for real estate development',
      industries: ['Site Selection', 'Market Analysis', 'Valuation'],
      color: '#a82b8b'
    }
  ];

  return (
    <section className="solutions-section" id="solutions">
      <div className="container">
        <div className="section-header">
          <calcite-icon icon="apps" scale="l"></calcite-icon>
          <h2 className="section-title">Industry Solutions</h2>
          <p className="section-subtitle">
            Specialized GIS solutions designed for specific industries and use cases
          </p>
        </div>

        <div className="solutions-grid">
          {solutions.map((solution, index) => (
            <calcite-card key={index} class="solution-card">
              <div 
                className="solution-icon" 
                style={{ backgroundColor: `${solution.color}15` }}
              >
                <calcite-icon 
                  icon={solution.icon} 
                  scale="l"
                  style={{ color: solution.color }}
                ></calcite-icon>
              </div>
              
              <h3 slot="heading">{solution.title}</h3>
              <span slot="description">{solution.description}</span>
              
              <div className="solution-industries">
                {solution.industries.map((industry, idx) => (
                  <calcite-chip key={idx} scale="s" appearance="outline">
                    {industry}
                  </calcite-chip>
                ))}
              </div>
              
              <calcite-button 
                slot="footer-end" 
                appearance="transparent" 
                kind="brand"
                icon-end="arrow-right"
              >
                Explore Solution
              </calcite-button>
            </calcite-card>
          ))}
        </div>
      </div>
    </section>
  );
}