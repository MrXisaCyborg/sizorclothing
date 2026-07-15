export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SIZOR",
    "alternateName": ["Sizor", "Sizer", "Sizzor"],
    "url": "https://sizor.com",
    "logo": "https://sizor.com/logo-wordmark.png",
    "foundingLocation": {
      "@type": "Place",
      "name": "Mumbai, India"
    },
    "sameAs": [
      "https://instagram.com/sizor",
      "https://twitter.com/sizor"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "SIZOR Techwear India",
    "image": "https://sizor.com/logo-wordmark.png",
    "description": "Premium techwear and streetwear outerwear label based in Mumbai. Utility clothing shipped worldwide and across India including Chennai.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra",
      "addressCountry": "IN"
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "India"
      },
      {
        "@type": "City",
        "name": "Mumbai"
      },
      {
        "@type": "City",
        "name": "Chennai"
      }
    ],
    "priceRange": "$$"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProductSchema({ 
  name, 
  image, 
  description, 
  price, 
  currency = "INR",
  inStock = true
}: { 
  name: string; 
  image?: string; 
  description: string; 
  price: number;
  currency?: string;
  inStock?: boolean;
}) {
  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": name,
    "image": image ? [image] : [],
    "description": description,
    "brand": {
      "@type": "Brand",
      "name": "SIZOR"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://sizor.com",
      "priceCurrency": currency,
      "price": price,
      "availability": inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0",
          "currency": "INR"
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "IN"
        }
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string, item: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.item
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
