# Content Management API

Base URL: `http://localhost:3000/api`

All endpoints return JSON. Errors include an `error` string and may include a `details` object when validation fails.

## About Us Collection

### GET `/aboutUsContentRoute`
- Returns all About Us documents where `isDeleted` is false.

### GET `/aboutUsContentRoute?id=<ABOUT_US_ID>`
- Returns a single About Us document.

### POST `/aboutUsContentRoute`
- Creates a new About Us document.
- Body example:
```
{
  "title": "Our Story",
  "description": "Building performance marketing engines.",
  "team": [],
  "coreValues": [],
  "images": [],
  "testimonials": []
}
```

### PUT `/aboutUsContentRoute?id=<ABOUT_US_ID>`
- Replaces the target document with the provided payload (same shape as POST).

### DELETE `/aboutUsContentRoute?id=<ABOUT_US_ID>`
- Soft deletes the document by setting `isDeleted` and `deletedAt`.

## About Us Nested Resources

Resource names: `team`, `testimonials`, `coreValues`

Base pattern: `/aboutUsContentRoute/<resource>?aboutUsId=<ABOUT_US_ID>`

### GET collection
- Returns the full array for the resource.

### GET item
- Append `&itemId=<ITEM_ID>` to fetch a single element.

### POST collection
- Body must satisfy the zod schema for the resource.
- Examples:
```
POST team
{
  "name": "Riley Chen",
  "role": "Performance Lead",
  "image": "https://cdn.example.com/team/riley.jpg",
  "bio": "Drives cross-channel growth."
}

POST testimonials
{
  "name": "Jordan Lee",
  "quote": "The team doubled our ROAS.",
  "image": "https://cdn.example.com/testimonials/jordan.jpg",
  "role": "CMO, BrightWave"
}

POST coreValues
{
  "title": "Integrity",
  "description": "We do the right thing."
}
```

### PUT item
- Requires `itemId` query param.
- Body may include any subset of fields to update.

### DELETE item
- Requires `itemId` query param.
- Removes the matching element from the array.

## Contact Us Collection

### GET `/contactUsContentRoute`
- Returns all Contact Us documents where `isDeleted` is false.

### GET `/contactUsContentRoute?id=<CONTACT_US_ID>`
- Returns a single Contact Us document.

### POST `/contactUsContentRoute`
- Creates a new Contact Us document.
- Body example:
```
{
  "heroTitle": "Let’s Talk",
  "heroSubtitle": "We respond within a day",
  "contactEmail": "hello@example.com",
  "contactPhone": "+1-800-555-0100",
  "contactAddress": "742 Evergreen Terrace",
  "offices": [],
  "faqs": []
}
```

### PUT `/contactUsContentRoute?id=<CONTACT_US_ID>`
- Replaces the document with the provided payload (same shape as POST).

### DELETE `/contactUsContentRoute?id=<CONTACT_US_ID>`
- Soft deletes the document by setting `isDeleted` and `deletedAt`.

## Contact Us Nested Resources

Resource names: `offices`, `faqs`

Base pattern: `/contactUsContentRoute/<resource>?contactUsId=<CONTACT_US_ID>`

### GET collection
- Returns the full array for the resource.

### GET item
- Append `&itemId=<ITEM_ID>` to fetch a single element.

### POST collection
- Body must satisfy the zod schema for the resource.
- Examples:
```
POST offices
{
  "name": "New York",
  "address": "123 Madison Ave, NY 10010",
  "phone": "+1-212-555-0199",
  "email": "nyc@example.com",
  "mapUrl": "https://maps.example.com/nyc"
}

POST faqs
{
  "question": "How soon do you reply?",
  "answer": "We get back within 24 hours."
}
```

### PUT item
- Requires `itemId` query param.
- Body may include any subset of fields to update.

### DELETE item
- Requires `itemId` query param.
- Removes the matching element from the array.

## Career Collection

### GET `/careerContentRoute`
- Returns all Career documents where `isDeleted` is false.

### GET `/careerContentRoute?id=<CAREER_ID>`
- Returns a single Career document.

### POST `/careerContentRoute`
- Creates a new Career document.
- Body example:
```
{
  "heroTag": "Career",
  "heroTitle": "Be Part Of Our Mission",
  "heroDescription": "Join a performance-driven team.",
  "jobOpenings": [],
  "categories": []
}
```

### PUT `/careerContentRoute?id=<CAREER_ID>`
- Replaces the target document with the provided payload (same shape as POST).

### DELETE `/careerContentRoute?id=<CAREER_ID>`
- Soft deletes the document by setting `isDeleted` and `deletedAt`.

## Career Nested Resources

Resource name: `jobOpenings`

Base pattern: `/careerContentRoute/jobOpenings?careerId=<CAREER_ID>`

### GET collection
- Returns all job openings for the document.

### GET item
- Append `&itemId=<JOB_OPENING_ID>` to fetch a single opening.

### POST collection
- Body must satisfy `JobOpeningSchema`.
- Example:
```
{
  "title": "Product Designer",
  "category": "Design",
  "description": "Craft intuitive product experiences.",
  "location": "Hybrid - NYC",
  "salary": "$90k-$110k",
  "tags": ["Hybrid", "Full Time"],
  "isActive": true
}
```

### PUT item
- Requires `itemId` query param.
- Body may include any subset of fields to update.

### DELETE item
- Requires `itemId` query param.
- Removes the matching opening from the array.

## Services Collection

### GET `/servicesContentRoute`
- Returns all Services documents where `isDeleted` is false.

### GET `/servicesContentRoute?id=<SERVICES_ID>`
- Returns a single Services document.

### POST `/servicesContentRoute`
- Creates a new Services document.
- Body example:
```
{
  "hero": {
    "badge": "Top SEO Company in Sri Lanka",
    "title": "Get unlimited traffic",
    "highlight": "SEO",
    "description": "Optimize your website for search.",
    "buttonText": "Get SEO From Us",
    "image": "/images/hero.png"
  },
  "servicesSection": {
    "heading": "What We Do",
    "description": "Tailored conversion programs."
  },
  "serviceCards": [],
  "seoSection": {
    "headingPrefix": "Working with an",
    "headingHighlight": "SEO company in Sri Lanka?",
    "supportingText": "Partner with specialists."
  },
  "seoFeatures": [],
  "businessSection": {
    "heading": "Don’t leave to chance.",
    "highlight": "SEO company in Sri Lanka"
  },
  "businessPillars": [],
  "dontSection": {
    "heading": "What We DON'T DO",
    "image": "/images/placeholder.png"
  },
  "dontDoItems": [],
  "ctaSection": {
    "title": "Looks like we’re a great match—let’s start!",
    "description": "Start with our FREE audit.",
    "image": "/images/cta.png",
    "buttonText": "Get Started"
  }
}
```

### PUT `/servicesContentRoute?id=<SERVICES_ID>`
- Replaces the target document with the provided payload (same shape as POST).

### DELETE `/servicesContentRoute?id=<SERVICES_ID>`
- Soft deletes the document by setting `isDeleted` and `deletedAt`.

## Services Nested Resources

Resource names: `serviceCards`, `seoFeatures`, `businessPillars`, `dontDoItems`

Base pattern: `/servicesContentRoute/<resource>?servicesId=<SERVICES_ID>`

### GET collection
- Returns the full array for the resource.

### GET item
- Append `&itemId=<ITEM_ID>` to fetch a single element.

### POST collection
- Body must satisfy the associated zod schema.
- Examples:
```
POST serviceCards
{
  "title": "Conversion Funnel Optimization",
  "cardImage": "/images/services/funnel.png",
  "description": "Increase conversion rates across journeys.",
  "cardSize": "l"
}

POST seoFeatures
{
  "icon": "/icons/serp.png",
  "title": "SERP Ranking & Reports",
  "description": "Transparent reporting on performance."
}

POST businessPillars
{
  "title": "Align SEO goals with KPIs",
  "text": "Strategy tied to growth metrics."
}

POST dontDoItems
{
  "text": "We avoid black-hat tactics."
}
```

### PUT item
- Requires `itemId` query param.
- Body may include any subset of fields to update.

### DELETE item
- Requires `itemId` query param.
- Removes the matching element from the array.

## Google Ads Collection

### GET `/googleAdsContentRoute`
- Returns all Google Ads documents where `isDeleted` is false.

### GET `/googleAdsContentRoute?id=<GOOGLE_ADS_ID>`
- Returns a single Google Ads document.

### POST `/googleAdsContentRoute`
- Creates a new Google Ads document.
- Body example:
```
{
  "hero": {
    "tag": "Google Ads Marketing",
    "title": "Boost Your Business Growth With",
    "highlight": "Google Ads",
    "description": "Data-backed acquisition campaigns.",
    "buttonText": "Let’s Talk",
    "image": "/images/google-ads/hero.png"
  },
  "workflowHeading": "Our 3-step workflow",
  "workflowSteps": [],
  "comparisonHeadingTop": "With Us You Will Never Hit Your",
  "comparisonHeadingBottom": "Advertising Plateau.",
  "withoutTitle": "Without us",
  "withTitle": "With us",
  "withoutPoints": [],
  "withPoints": [],
  "partnerHeading": "Digital partner with",
  "partnerLogos": [],
  "marqueeHeading": "Digital partner with",
  "testimonialsHeading": "What working with us means.",
  "testimonials": []
}
```

### PUT `/googleAdsContentRoute?id=<GOOGLE_ADS_ID>`
- Replaces the target document with the provided payload (same shape as POST).

### DELETE `/googleAdsContentRoute?id=<GOOGLE_ADS_ID>`
- Soft deletes the document by setting `isDeleted` and `deletedAt`.

## Google Ads Nested Resources

Resource names: `workflowSteps`, `withoutPoints`, `withPoints`, `partnerLogos`, `testimonials`

Base pattern: `/googleAdsContentRoute/<resource>?googleAdsId=<GOOGLE_ADS_ID>`

### GET collection
- Returns the full array for the resource.

### GET item
- Append `&itemId=<ITEM_ID>` to fetch a single element.

### POST collection
- Body must satisfy the associated zod schema.
- Examples:
```
POST workflowSteps
{
  "title": "Analysis And Strategy",
  "description": "We audit accounts and plan objectives."
}

POST withoutPoints
{
  "text": "Manual daily work",
  "icon": "/icons/minus.png"
}

POST withPoints
{
  "text": "Focus on automation",
  "icon": "/icons/check.png"
}

POST partnerLogos
{
  "image": "/images/logos/brand.png"
}

POST testimonials
{
  "text": "The team immediately impacted ROAS.",
  "name": "Jordan Lee",
  "role": "CMO, BrightWave",
  "image": "/images/testimonials/jordan.png"
}
```

### PUT item
- Requires `itemId` query param.
- Body may include any subset of fields to update.

### DELETE item
- Requires `itemId` query param.
- Removes the matching element from the array.

## Validation
- All create/update operations use zod schemas defined under `contentManagementSystem/schemas`.
- Validation errors respond with HTTP 400 and `details` describing field issues.

## Soft Delete Behavior
- Collection DELETE endpoints toggle `isDeleted` instead of removing records.
- Nested resource DELETE endpoints remove the embedded document from arrays.
