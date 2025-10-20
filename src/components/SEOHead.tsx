import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const SEOHead = ({
  title = "EcoCompost - Transform Waste into Wonder",
  description = "Join EcoCompost in creating a sustainable future. Sell your organic waste, buy premium vermicompost, and contribute to a cleaner environment. Turn waste into wealth!",
  keywords = "waste management, composting, vermicompost, organic waste, sustainable living, eco-friendly, waste to wealth, Mumbai, India",
  image = "/images/ecocompost-og-image.jpg",
  url = window.location.href,
  type = "website"
}: SEOHeadProps) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="EcoCompost" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="EcoCompost" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#10b981" />
      <meta name="msapplication-TileColor" content="#10b981" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "EcoCompost",
          "description": "Transform organic waste into valuable compost while building sustainable communities",
          "url": "https://ecocompost.in",
          "logo": "https://ecocompost.in/images/logo.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-98765-43210",
            "contactType": "Customer Service",
            "email": "info@ecocompost.in"
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Green Valley",
            "addressLocality": "Mumbai",
            "addressRegion": "Maharashtra",
            "postalCode": "400001",
            "addressCountry": "IN"
          },
          "sameAs": [
            "https://facebook.com/ecocompost",
            "https://twitter.com/ecocompost",
            "https://instagram.com/ecocompost"
          ]
        })}
      </script>

      {/* Service Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Organic Waste Pickup Service",
          "description": "Professional organic waste collection and composting service",
          "provider": {
            "@type": "Organization",
            "name": "EcoCompost"
          },
          "areaServed": {
            "@type": "City",
            "name": "Mumbai"
          },
          "serviceType": "Waste Management",
          "offers": {
            "@type": "Offer",
            "price": "2",
            "priceCurrency": "INR",
            "priceSpecification": {
              "@type": "UnitPriceSpecification",
              "price": "2",
              "priceCurrency": "INR",
              "unitText": "per kg"
            }
          }
        })}
      </script>
    </Helmet>
  );
};
