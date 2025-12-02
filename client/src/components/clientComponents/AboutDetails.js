import React from 'react';
import '@esri/calcite-components/dist/calcite/calcite.css';
import '../../styles/clientStyles/aboutDetails.css';

const sections = [
  {
    id: 'overview',
    layout: 'media-left',
    title: 'About SHIELDIFY',
    content: [
      "SHIELDIFY is Sri Lanka's trusted provider of premium safety equipment and personal protective equipment (PPE). We specialize in delivering high-quality safety solutions including safety helmets, high-visibility jackets, safety eyewear, protective gloves, and a comprehensive range of workplace safety gear.",
      "We serve construction companies, industrial facilities, and enterprises across the country, helping them protect their most valuable asset—their people. Our expertise spans from safety equipment supply and consultation to custom safety programs and comprehensive workplace safety solutions."
    ],
    media: {
      background: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80',
      foregroundImage: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1200&q=80',
      caption: 'Safety First',
      description: 'Empowering Sri Lankan workplaces with world-class safety equipment that protects lives and ensures compliance.'
    }
  },
  {
    id: 'vision-mission',
    layout: 'media-right',
    title: 'Our Vision & Mission',
    content: [
      "Our vision is to create safer workplaces across Sri Lanka where every worker returns home safely at the end of each day. We believe that workplace safety is not just compliance—it's a fundamental right.",
      "Our mission is simple yet powerful: to provide accessible, high-quality safety equipment and expert guidance that empowers organizations to build a culture of safety. Through reliable products, competitive pricing, and exceptional service, we make workplace safety achievable for businesses of all sizes.",
      "By combining international safety standards with local market knowledge, we're transforming how Sri Lankan industries approach worker protection."
    ],
    media: {
      background: 'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?w=1600&q=80',
      foregroundImage: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800&q=80',
      caption: 'Protected Workforce',
      description: 'Building a culture where safety is not an afterthought but a core value embedded in every operation.'
    },
    buttons: [
      { text: "View Products", icon: "layers", variant: "solid" },
      { text: "Contact Us", icon: "arrow-right", variant: "outline" }
    ]
  },
  {
    id: 'why-choose',
    layout: 'media-left',
    title: 'Why Choose SHIELDIFY',
    content: [
      "Quality You Can Trust: Every product in our inventory meets or exceeds international safety standards. We partner with globally recognized manufacturers to ensure that our safety equipment provides genuine protection, not just compliance checkboxes.",
      "Comprehensive Range: From hard hats to steel-toe boots, from welding gloves to full-body harnesses—we stock everything you need to equip your workforce safely. Our extensive inventory means you can source all your PPE from one reliable supplier.",
      "Expert Guidance: Our team doesn't just sell products; we provide solutions. We'll assess your workplace hazards, recommend the right equipment, and help you implement safety protocols that actually work.",
      "Competitive Pricing: Safety shouldn't break the bank. We offer bulk discounts and flexible payment terms to make premium safety equipment accessible to businesses of all sizes."
    ],
    media: {
      background: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=80',
      foregroundImage: 'https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?w=1200&q=80',
      caption: 'Quality Standards',
      description: 'Every item certified, tested, and proven to deliver real protection when it matters most.'
    }
  },
  {
    id: 'products',
    layout: 'media-right',
    title: 'Our Product Range',
    content: [
      "Head Protection: Industrial safety helmets, hard hats with ventilation, bump caps, and specialized headgear for various work environments.",
      "Eye & Face Protection: Safety glasses, goggles, face shields, welding helmets, and protective eyewear for chemical and particle hazards.",
      "Hand Protection: Cut-resistant gloves, chemical-resistant gloves, welding gloves, thermal gloves, and general-purpose work gloves.",
      "Body Protection: High-visibility vests and jackets, coveralls, aprons, and protective clothing for various industrial applications.",
      "Plus: Safety footwear, fall protection equipment, respiratory protection, hearing protection, and more—everything to keep your team safe from head to toe."
    ],
    media: {
      background: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80',
      foregroundImage: 'https://images.unsplash.com/photo-1505798577917-a65157d3320a?w=800&q=80',
      caption: 'Complete Solutions',
      description: 'Comprehensive safety equipment inventory for construction, industrial, and commercial applications.'
    },
    buttons: [
      { text: "Browse Catalog", icon: "layers", variant: "solid" },
      { text: "Request Quote", icon: "file-text", variant: "outline" }
    ]
  },
  {
    id: 'commitment',
    layout: 'media-left',
    title: 'Our Commitment to You',
    content: [
      "Fast Delivery Across Sri Lanka: With strategic inventory placement and reliable logistics partners, we ensure your safety equipment reaches you quickly—because we know you can't afford delays when safety is on the line.",
      "After-Sales Support: Our relationship doesn't end at purchase. We provide product training, maintenance guidance, and replacement support to ensure your safety equipment performs optimally throughout its lifecycle.",
      "Custom Safety Programs: Need help building a comprehensive workplace safety program? Our consultants can assess your needs, recommend equipment packages, and help implement safety protocols tailored to your industry.",
      "Bulk Order Specialists: Equipping large teams? We offer special pricing for bulk orders, flexible payment terms, and dedicated account management for corporate clients."
    ],
    media: {
      background: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=80',
      foregroundImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',
      caption: 'Partnership & Service',
      description: 'Building long-term relationships through reliable service, expert support, and genuine care for your safety needs.'
    }
  },
  {
    id: 'cta',
    layout: 'media-right',
    title: 'Ready to Protect Your Team?',
    content: [
      "Whether you're a small contractor looking for basic PPE or a large industrial facility needing a complete safety overhaul, SHIELDIFY has the products, expertise, and commitment to help you succeed.",
      "Don't compromise on safety. Let's work together to create a safer workplace for your team. Contact us today for a consultation, product demonstration, or custom quote.",
      "Your workers deserve the best protection. We're here to deliver it."
    ],
    media: {
      background: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80',
      foregroundImage: 'https://images.unsplash.com/photo-1590402494587-44b71d7772f6?w=800&q=80',
      caption: 'Get Started Today',
      description: 'Join hundreds of Sri Lankan businesses who trust SHIELDIFY for their workplace safety needs.'
    },
    buttons: [
      { text: "Contact Us Now", icon: "phone", variant: "solid" },
      { text: "View All Products", icon: "arrow-right", variant: "outline" }
    ]
  }
];

export default function AboutDetails() {
  const renderMedia = (section) => {
    const hasImage = section.media.foregroundImage;
    const isMediaLeft = section.layout === 'media-left';

    return (
      <div id='from-about' className="media-container">
        {/* Background Image */}
        <div className="background-image">
          <img 
            src={section.media.background}
            alt="Background"
          />
          <div className="image-overlay"></div>
        </div>

        {/* Foreground Image Overlay */}
        {hasImage && (
          <div className={`foreground-image-container ${isMediaLeft ? 'media-left' : 'media-right'}`}>
            <img 
              src={section.media.foregroundImage}
              alt={section.media.caption}
            />
          </div>
        )}

        {/* Caption Box */}
        <div className={`caption-box ${isMediaLeft ? 'left-aligned' : 'right-aligned'}`}>
          <h3 className="caption-title">
            {section.media.caption}
          </h3>
          <p className="caption-description">
            {section.media.description}
          </p>
        </div>
      </div>
    );
  };

  const renderSection = (section, index) => {
    const isMediaLeft = section.layout === 'media-left';

    const textContent = (
      <div className={`text-content ${index % 2 === 0 ? 'bg-white' : 'bg-gray'}`}>
        <h2 className="section-title">
          {section.title}
        </h2>

        {section.content.map((paragraph, idx) => (
          <p key={idx} className="section-paragraph">
            {paragraph}
          </p>
        ))}

        {section.buttons && (
          <div className="button-container">
            {section.buttons.map((button, idx) => (
              <calcite-button
                key={idx}
                appearance={button.variant === 'solid' ? 'solid' : 'outline'}
                icon-end={button.icon}
                scale="l"
                style={button.variant === 'solid' ? {
                  '--calcite-button-background': '#ff6b00',
                  '--calcite-button-text-color': '#fff'
                } : {
                  '--calcite-button-border-color': '#ff6b00',
                  '--calcite-button-text-color': '#ff6b00'
                }}
              >
                {button.text}
              </calcite-button>
            ))}
          </div>
        )}
      </div>
    );

    const mediaContent = renderMedia(section);

    return (
      <div 
        key={section.id} 
        className={`section-wrapper ${section.layout}`}
      >
        {isMediaLeft ? (
          <>
            {mediaContent}
            {textContent}
          </>
        ) : (
          <>
            {textContent}
            {mediaContent}
          </>
        )}
      </div>
    );
  };

  const renderFirstSection = () => {
    const section = sections[0];
    const hasImage = section.media.foregroundImage;
    
    return (
      <div 
        key={section.id} 
        className="section-wrapper media-left hero-section"
      >
        {/* Media side with logo overlay */}
        <div className="media-container">
          {/* Background Image */}
          <div className="background-image">
            <img 
              src={section.media.background}
              alt="Background"
            />
            <div className="image-overlay"></div>
          </div>

          {/* Logo Overlay */}
          <div className="logo-overlay">
            <img 
              src="/assets/images/picture-logo.png" 
              alt="SHIELDIFY Logo"
            />
          </div>

          {/* Foreground Image */}
          {hasImage && (
            <div className="foreground-image-container media-left">
              <img 
                src={section.media.foregroundImage}
                alt={section.media.caption}
              />
            </div>
          )}

          {/* Caption Box */}
          <div className="caption-box left-aligned">
            <h3 className="caption-title">
              {section.media.caption}
            </h3>
            <p className="caption-description">
              {section.media.description}
            </p>
          </div>
        </div>
        
        {/* Text content side */}
        <div className="text-content bg-white">
          <h2 className="section-title">
            {section.title}
          </h2>

          {section.content.map((paragraph, idx) => (
            <p key={idx} className="section-paragraph">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="about-container">
      {renderFirstSection()}
      {sections.slice(1).map((section, index) => renderSection(section, index + 1))}
    </div>
  );
}