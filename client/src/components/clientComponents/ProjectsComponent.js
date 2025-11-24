import React, { useState } from 'react';
import '@esri/calcite-components/dist/calcite/calcite.css';
import '../../styles/clientStyles/projectsComponent.css';

export default function ProjectsComponent() {
  const [activeTab, setActiveTab] = useState(0);

  const projects = [
    {
      title: "MRV System for Environmental Ministry",
      client: "Ministry of Environment, Sri Lanka",
      description: "Comprehensive Monitoring, Reporting, and Verification (MRV) system for tracking environmental initiatives and measuring climate impact across Sri Lanka.",
      challenge: "The Ministry needed a robust system to monitor environmental programs, collect accurate field data, and report progress on climate commitments to international bodies.",
      solution: "Implemented an integrated GIS solution using ArcGIS Online, Survey123 for field data collection, and ArcGIS Dashboards for real-time monitoring and reporting.",
      impact: [
        "Enabled tracking of 500+ environmental projects nationwide",
        "Reduced reporting time by 60% with automated dashboards",
        "Improved data accuracy with GPS-enabled field surveys",
        "Provided transparent reporting to stakeholders and international partners"
      ],
      image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=1200&q=80",
      dashboardImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      technologies: ["ArcGIS Online", "Survey123", "Dashboards", "Field Maps"],
      year: "2023",
      category: "Government"
    },
    {
      title: "Smart City Infrastructure Management",
      client: "Colombo Municipal Council",
      description: "Integrated GIS platform for managing urban infrastructure, utilities, and city planning with real-time monitoring capabilities.",
      challenge: "Managing diverse city infrastructure data across multiple departments with outdated systems and limited coordination.",
      solution: "Deployed ArcGIS Enterprise with custom web applications for asset management, public service delivery, and urban planning workflows.",
      impact: [
        "Unified infrastructure data from 8 departments",
        "Reduced service response time by 40%",
        "Enabled data-driven urban planning decisions",
        "Improved citizen service delivery through online portals"
      ],
      image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&q=80",
      dashboardImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
      technologies: ["ArcGIS Enterprise", "Experience Builder", "Mobile Apps", "Web Maps"],
      year: "2023",
      category: "Municipal"
    },
    {
      title: "Utility Network Management System",
      client: "Ceylon Electricity Board",
      description: "Advanced GIS system for electricity distribution network management, outage tracking, and asset maintenance planning.",
      challenge: "Managing a complex electricity distribution network with limited visibility into asset conditions and outage patterns.",
      solution: "Implemented ArcGIS Utility Network with mobile field applications for inspection, maintenance tracking, and real-time outage management.",
      impact: [
        "Mapped 15,000+ km of distribution network",
        "Reduced outage response time by 50%",
        "Optimized maintenance scheduling with predictive analytics",
        "Improved network reliability and customer satisfaction"
      ],
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=80",
      dashboardImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      technologies: ["ArcGIS Enterprise", "Utility Network", "Field Maps", "Python"],
      year: "2022",
      category: "Utilities"
    },
    {
      title: "Agricultural Land Management Portal",
      client: "Department of Agriculture",
      description: "Web-based GIS portal for agricultural land monitoring, crop management, and farmer support services across districts.",
      challenge: "Limited visibility into agricultural land use patterns and difficulty in delivering targeted support to farming communities.",
      solution: "Created a comprehensive web portal using ArcGIS Online with dashboards for crop monitoring, land suitability analysis, and farmer registration.",
      impact: [
        "Registered 50,000+ farmers on digital platform",
        "Monitored 200,000 hectares of agricultural land",
        "Enabled precision agriculture advisory services",
        "Improved subsidy distribution efficiency by 35%"
      ],
      image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1200&q=80",
      dashboardImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      technologies: ["ArcGIS Online", "StoryMaps", "Survey123", "Remote Sensing"],
      year: "2022",
      category: "Agriculture"
    }
  ];

  const capabilities = [
    {
      icon: 'share',
      title: 'Share your successes',
      description: 'Communicate program impact with stakeholders through interactive maps and compelling visualizations'
    },
    {
      icon: 'data-check',
      title: 'Collect accurate data',
      description: 'Gather reliable field data with GPS-enabled surveys that work online and offline'
    },
    {
      icon: 'graph-time-series',
      title: 'Develop program models',
      description: 'Build spatial models to analyze trends, predict outcomes, and optimize program delivery'
    },
    {
      icon: 'dashboard',
      title: 'Create dynamic reporting',
      description: 'Generate real-time dashboards and automated reports for continuous monitoring'
    }
  ];

  return (
    <div className="projects-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          {/* Left Content */}
          <div>
            <h1 className="hero-title">
              Measure Your Impact
            </h1>
          </div>

          {/* Right Images */}
          <div className="hero-images">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
              alt="GIS Dashboard"
              className="hero-image-primary"
            />
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80"
              alt="Team collaboration"
              className="hero-image-secondary"
            />
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="info-section">
        <div className="info-content">
          <h2 className="info-title">
            Assess program success with meaningful metrics
          </h2>
          <p className="info-description">
            Organizations use GIS to develop indexes and models that set short- and long-term 
            benchmarks and establish milestones. Maps and analysis allow teams to model alternative 
            approaches and adjust programs as they monitor outcomes and impacts. Leverage GIS 
            tools to better communicate with your network, use authoritative data, collect and analyze data, 
            and validate your program strategy.
          </p>
        </div>
      </div>

      {/* Capabilities Section */}
      <div className="capabilities-section">
        <div className="capabilities-content">
          <h2 className="capabilities-title">
            Understand outcomes and plan for the future with GIS
          </h2>

          <div className="capabilities-grid">
            {capabilities.map((cap, idx) => (
              <div key={idx} className="capability-card">
                <div className="capability-icon-wrapper">
                  <calcite-icon 
                    icon={cap.icon} 
                    scale="l"
                    className="capability-icon"
                  />
                </div>
                <h3 className="capability-title">
                  {cap.title}
                </h3>
                <p className="capability-description">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Project Section */}
      <div className="featured-section">
        <div className="featured-content">
          <div className="featured-grid">
            {/* Dashboard Image */}
            <div className="featured-image-wrapper">
              <div className="decorative-circle-large" />
              <div className="decorative-circle-small" />
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
                alt="Dashboard"
                className="featured-image"
              />
            </div>

            {/* Text Content */}
            <div className="featured-text">
              <h2>
                Communicate your impact with stakeholders
              </h2>
              <p>
                Use maps and dashboards to share the measured success of your program 
                evaluation with current and prospective changemakers.
              </p>
            </div>
          </div>

          {/* Projects Grid */}
          <h2 className="projects-title">
            Our Success Stories
          </h2>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                {/* Project Image */}
                <div className="project-image-wrapper">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-image"
                  />
                  <div className="project-year-badge">
                    {project.year}
                  </div>
                </div>

                {/* Project Content */}
                <div className="project-content">
                  <div className="project-category">
                    {project.category}
                  </div>

                  <h3 className="project-title">
                    {project.title}
                  </h3>

                  <p className="project-client">
                    {project.client}
                  </p>

                  <p className="project-description">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="project-technologies">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <calcite-button
                    width="full"
                    appearance="outline"
                    icon-end="arrow-right"
                    style={{
                      '--calcite-button-text-color': '#004c74',
                      '--calcite-button-border-color': '#004c74'
                    }}
                  >
                    View Case Study
                  </calcite-button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">
            Ready to Transform Your Programs with GIS?
          </h2>
          <p className="cta-description">
            Let's discuss how we can help you measure impact, improve outcomes, and communicate your success
          </p>
          <div className="cta-buttons">
            <calcite-button
              appearance="solid"
              kind="inverse"
              scale="l"
            >
              Contact Us
            </calcite-button>
            <calcite-button
              appearance="outline"
              kind="inverse"
              scale="l"
              icon-start="book"
            >
              View All Projects
            </calcite-button>
          </div>
        </div>
      </div>
    </div>
  );
}