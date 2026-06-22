# Millimetre Estimating Website Specification

## 1. Project Overview

This document defines the specification for the first release of the Millimetre Estimating website.

The website will be:

- a static HTML5 website
- hosted on GitHub Pages
- designed for a professional quantity surveying and estimating consultancy
- structured to support future expansion without introducing a CMS

Primary business goals:

- present Millimetre Estimating as a credible and professional consultancy
- generate qualified enquiries from prospective clients
- explain the full range of commercial services clearly
- provide simple online budget calculators for early-stage guidance
- maintain a consistent visual and written standard across all pages

The custom domain will be configured later by the user.

## 2. Delivery Principles

The site must follow these principles throughout:

- professional, traditional consultancy tone
- consistent typography, spacing, headings, and component styles
- clean and readable layout with strong contrast
- no overly bright colours or hard-to-read text
- responsive across desktop, tablet, and mobile
- lightweight and fast to load
- easy to maintain using plain HTML, CSS, and JavaScript
- suitable for GitHub Pages without server-side processing

## 3. Target Audience

The website should speak clearly to:

- developers
- main contractors
- specialist contractors
- homeowners
- self-build clients
- commercial clients seeking estimating, tendering, and quantity surveying support

## 4. Core Services To Present

The site must present Millimetre Estimating as offering a full commercial solution, including:

- open tender opportunities support
- tendering and estimating
- cost returns
- technical returns
- bid writing support
- quantity surveying services
- cost planning and commercial advice

Supporting service wording can also reference:

- pre-construction commercial support
- take-offs and measurement
- budget advice
- bills of quantities
- contractor-side bid support

## 5. Website Scope For Version 1

Version 1 will include the following pages:

- `Home`
- `Services`
- `Contact Us`
- `Calculators`
- `Privacy Policy`
- `Cookie Policy`
- `Terms & Conditions`

Optional future pages:

- `About Us`
- `Case Studies`
- `FAQs`
- `Tender Opportunities`
- `Resources`

## 6. Technical Constraints

The website must be built as a static HTML5 website using:

- semantic HTML5
- one shared CSS architecture
- small, focused JavaScript files only where needed
- no backend
- no database
- no build process required for launch

Recommended structure:

```text
/
  index.html
  services/
    index.html
  contact/
    index.html
  calculators/
    index.html
  privacy/
    index.html
  cookies/
    index.html
  terms/
    index.html
  assets/
    css/
      main.css
      components.css
    js/
      site.js
      calculators.js
    img/
      ...
    docs/
      ...
  404.html
  robots.txt
  sitemap.xml
```

Notes:

- keep file names lowercase
- use folder-based routes for clean GitHub Pages URLs
- avoid unnecessary third-party dependencies
- if possible, use one main stylesheet at launch to keep maintenance simple

## 7. Brand And Visual Direction

The visual direction should be:

- traditional consultancy
- understated and premium
- trustworthy and formal
- modern enough to feel current, but not sales-heavy

The design should avoid:

- bright saturated colours
- excessive animations
- cluttered section layouts
- inconsistent text sizes
- weak contrast
- decorative fonts

Suggested style direction:

- neutral backgrounds
- dark charcoal or near-black text
- subtle grey borders and dividers
- restrained accent colour used sparingly for buttons and links
- spacious layout and measured typography

## 8. Design System Specification

### 8.1 Typography

Requirements:

- use one heading font family and one body font family, or one family with multiple weights
- prioritise legibility and professional appearance
- maintain a consistent scale across all pages

Suggested scale:

- H1: 44-56px desktop, 34-40px mobile
- H2: 32-40px desktop, 28-32px mobile
- H3: 24-28px desktop, 22-24px mobile
- body large: 20px
- body standard: 18px
- small/meta text: 14-16px

Body text rules:

- line height around 1.6
- paragraph width controlled for readability
- no long blocks of dense text
- strong contrast ratio

### 8.2 Spacing

Use a simple spacing scale throughout:

- 8px
- 16px
- 24px
- 32px
- 48px
- 64px
- 96px

Spacing rules:

- all sections use a consistent vertical rhythm
- cards, forms, and callouts use the same internal padding logic
- headings maintain consistent spacing above and below

### 8.3 Layout

Requirements:

- content container width around 1100-1200px max
- generous left and right padding
- responsive stacking at tablet and mobile sizes
- reusable section patterns

Core layout patterns:

- hero section
- two-column content block
- service card grid
- process steps row
- testimonial or trust block
- CTA band
- form layout

### 8.4 Colour

The site should use a restrained palette.

Suggested approach:

- background: white or off-white
- text: charcoal or very dark grey
- muted section background: pale grey
- accent: muted navy, slate, or dark green

Rules:

- accent colour only for buttons, links, focus states, and small highlights
- never use low-contrast text
- never use more than one accent family in version 1

### 8.5 Buttons And Links

Button types:

- primary button
- secondary button
- text link

Rules:

- identical button styling across all pages
- hover and focus states required
- clear labels such as `Request A Quote`, `Contact Us`, `Discuss Your Project`

### 8.6 Forms

Form fields must use consistent:

- label style
- input height
- border radius
- focus state
- spacing between fields
- validation message styling

## 9. Content Tone And Copy Rules

All copy should be:

- professional
- concise
- direct
- confident
- plain English
- free from exaggerated marketing language

Content should emphasise:

- accuracy
- clarity
- commercial understanding
- dependable support
- suitability for multiple client types

Tone should avoid:

- buzzwords
- overly casual phrases
- overpromising
- excessive exclamation marks

Preferred writing style:

- short paragraphs
- clear headings
- benefit-led summaries
- practical language

## 10. Global Site Elements

### 10.1 Header

The header should include:

- logo or text wordmark
- primary navigation
- prominent contact CTA

Navigation items:

- Home
- Services
- Calculators
- Contact Us

Behaviour:

- mobile menu for smaller screens
- active page indicator
- consistent across all pages

### 10.2 Footer

The footer should include:

- business name
- short one-line positioning statement
- contact email
- contact telephone number
- page links
- legal links
- optional company registration details

Optional additions:

- office address
- copyright notice

## 11. Page Specification

### 11.1 Home Page

Purpose:

- establish trust immediately
- explain what the business does
- show who the business serves
- direct users toward an enquiry

Recommended section order:

1. Hero
2. Services overview
3. Who we work with
4. Why choose us
5. Process
6. Trust and credibility
7. CTA

Detailed section requirements:

#### Hero

Must include:

- strong H1
- short supporting paragraph
- primary CTA to contact page
- secondary CTA to services page or calculators page

Example content direction:

- H1 focused on commercial clarity, estimating accuracy, and professional support
- supporting text stating that Millimetre Estimating supports developers, contractors, specialist contractors, and homeowners

#### Services Overview

Present 4-6 service blocks:

- open tender opportunities support
- tendering and estimating
- technical and cost returns
- bid writing support
- quantity surveying services
- commercial support and cost planning

Each block should include:

- service title
- short explanation
- optional link to services page anchor

#### Who We Work With

This section should clearly list:

- developers
- contractors
- specialist contractors
- homeowners

Each audience can have a short benefit statement.

#### Why Choose Us

Suggested trust points:

- professional commercial understanding
- accurate and transparent outputs
- practical support for bids and live opportunities
- consistent and reliable communication

#### Process

Simple 3-step or 4-step process:

1. Tell us about your project or tender
2. We review scope and issue a quotation
3. We prepare the required estimating or commercial service
4. We support your next stage

#### Trust And Credibility

Possible content:

- professional statement of experience
- sectors served
- quote/testimonial placeholders
- note on careful, detailed, and commercially aware outputs

#### Final CTA

Must include:

- enquiry invitation
- contact button
- email and telephone alternative

### 11.2 Services Page

Purpose:

- explain the service offer in more detail
- help visitors identify the right support
- build confidence before contact

Recommended sections:

1. Intro banner
2. Service categories
3. Who we support
4. Deliverables or outcomes
5. FAQs
6. CTA

Detailed service categories:

- Tender Opportunities Support
- Tendering and Estimating
- Cost and Technical Returns
- Bid Writing
- Quantity Surveying
- Commercial Advice and Support

For each service include:

- service summary
- who it is for
- typical outputs
- typical stage of project or procurement

### 11.3 Contact Us Page

Purpose:

- convert interest into enquiries
- make contact methods clear
- help users submit useful information

Required sections:

1. Intro text
2. Direct contact details
3. Contact form
4. What to send us
5. CTA reassurance

Required form fields:

- name
- company name or client type
- email
- phone
- service required
- project type
- message

Optional form fields:

- project location
- estimated project value
- target return date

Important GitHub Pages note:

- forms cannot be processed natively
- use a third-party static form provider such as Formspree or Getform
- if the form provider is not chosen at launch, include a mailto fallback and clear direct contact details

### 11.4 Calculators Page

Purpose:

- provide useful early-stage budget guidance
- attract and assist prospective clients
- support lead generation without replacing professional advice

Version 1 recommended calculators:

- Kitchen Renovation Calculator
- Bathroom Renovation Calculator
- Extension Cost Calculator
- General Refurbishment Calculator

Functional requirements:

- all calculators run entirely in browser-side JavaScript
- no backend required
- clear user inputs
- simple result summary
- disclaimer that output is indicative only
- CTA after result encouraging formal enquiry

Suggested inputs:

- project type
- size or floor area
- quality/specification level
- location factor
- VAT toggle if needed
- contingency allowance

Suggested outputs:

- estimated low range
- estimated mid range
- estimated high range
- note explaining assumptions

Legal/copy requirement:

- every calculator result must state that the figures are guidance only and do not constitute a formal estimate, quotation, or professional appointment

### 11.5 Privacy Policy Page

Purpose:

- explain what personal data is collected and why

Must cover:

- contact form submissions
- analytics if added
- cookies if used
- data retention
- user rights
- contact email for privacy matters

### 11.6 Cookie Policy Page

Purpose:

- explain cookie usage clearly

Must cover:

- whether essential cookies are used
- whether analytics cookies are used
- how users can control cookies

Note:

- if no analytics or non-essential cookies are used initially, the policy should say so clearly

### 11.7 Terms & Conditions Page

Purpose:

- set out general website use terms and disclaimers

May later be supplemented by:

- service terms and conditions
- quotation terms
- appointment terms

Version 1 should include:

- site content disclaimer
- no reliance on calculator results as formal professional advice
- intellectual property statement
- acceptable use statement
- limitation wording suitable for a website terms page

## 12. Calculator Specification Detail

Each calculator should share one consistent pattern:

1. Intro paragraph
2. Input form
3. Calculate button
4. Results panel
5. Disclaimer
6. Enquiry CTA

UI rules:

- same form components as the contact page
- same result card layout across all calculators
- no hidden complexity in version 1
- ability to reset inputs

Logic rules:

- use transparent assumptions
- define all ranges in a central JavaScript object for easier maintenance
- avoid implying final cost certainty

Suggested implementation pattern:

- one `calculators.js` file
- one calculator data configuration object
- one reusable function to render results

## 13. Accessibility Requirements

The site must:

- use semantic heading order
- include descriptive link labels
- meet contrast expectations
- be keyboard navigable
- provide visible focus states
- use form labels for all inputs
- include alt text for meaningful images
- avoid relying on colour alone to communicate meaning

Minimum target:

- practical WCAG 2.1 AA-minded implementation

## 14. Responsive Behaviour

The site must work well on:

- desktop
- tablet
- mobile

Responsive requirements:

- header converts to mobile navigation
- multi-column layouts stack cleanly
- forms remain easy to complete on mobile
- buttons remain large enough to tap
- calculators remain readable on small screens

## 15. SEO Basics

Each page should include:

- unique title tag
- unique meta description
- semantic page heading
- clean URLs
- internal links between related pages

Recommended extras:

- `sitemap.xml`
- `robots.txt`
- Open Graph tags
- local business schema only if accurate business details are available

## 16. Performance Requirements

The site should:

- load quickly on standard mobile connections
- avoid heavy frameworks
- optimise images before upload
- use system fonts or limited web font loading
- minimise JavaScript

## 17. Content Assets Required

Needed from the client or to be drafted:

- logo or approved text-based branding
- final business telephone number
- final business email address
- office address, if to be published
- company registration details, if to be published
- final wording for legal pages, or approval for first-pass drafts
- any testimonials approved for public use
- any imagery or preference for minimal/non-photographic design

## 18. Recommended Build Sequence

Phase 1:

- create folder structure
- create shared header, footer, and navigation
- set typography, spacing, colour, and button system

Phase 2:

- build `Home`
- build `Services`
- build `Contact Us`

Phase 3:

- build `Calculators`
- implement calculator logic
- add disclaimers and CTA blocks

Phase 4:

- build legal pages
- add SEO metadata
- add `404.html`, `robots.txt`, and `sitemap.xml`

Phase 5:

- test responsiveness
- test accessibility basics
- test GitHub Pages deployment

## 19. Acceptance Criteria For Version 1

Version 1 will be considered complete when:

- all core pages are built as static HTML pages
- all pages share one coherent design system
- the site is responsive and readable on mobile and desktop
- the site clearly explains services and target audiences
- the contact page supports enquiry submission or a clear fallback
- calculators function in browser without a backend
- legal pages are present
- the site is ready to publish to GitHub Pages

## 20. Open Decisions

The following items still need to be confirmed before or during build:

- final logo and brand assets
- final accent colour choice
- preferred form provider
- final contact details
- whether office address should be shown
- whether testimonials are available
- whether calculators should include VAT
- whether service terms should be included in version 1 or later

## 21. Recommended Next Deliverables

The next documents or outputs should be:

- page-by-page wireframe outline
- content outline with draft headings and paragraphs
- static project folder and starter files
- first visual homepage build
