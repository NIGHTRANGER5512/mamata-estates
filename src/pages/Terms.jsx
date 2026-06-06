import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const sections = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    content: (
      <>
        <p>
          By accessing, browsing, or using the website of Tribhuvan Awas Pvt. Ltd. (hereinafter referred to as "the Company", "we", "us", or "our"), you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions ("Terms"). These Terms constitute a legally binding agreement between you and Tribhuvan Awas Pvt. Ltd.
        </p>
        <p className="mt-3">
          If you do not agree to these Terms in their entirety, you must immediately discontinue use of this website. We reserve the right to modify these Terms at any time without prior notice. Continued use of the website after any such modifications constitutes your acceptance of the revised Terms.
        </p>
        <p className="mt-3">
          These Terms should be read in conjunction with our{' '}
          <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>,
          which is incorporated herein by reference.
        </p>
      </>
    ),
  },
  {
    id: 'about',
    title: '2. About Tribhuvan Awas',
    content: (
      <>
        <p>
          Tribhuvan Awas Pvt. Ltd. is a Private Limited Company incorporated under the Companies Act, 1956, with Corporate Identification Number (CIN) <strong>U70100BR2007PTC013168</strong>, registered with the Registrar of Companies, Patna, Bihar, with its registered office at:
        </p>
        <div className="mt-3 bg-surface rounded-xl border border-gray-200 p-4 text-sm text-secondary">
          <p className="font-semibold">111, 1st Floor, Ashoka Place,</p>
          <p>Exhibition Road, Patna – 800001, Bihar, India</p>
          <p className="mt-1 text-muted">CIN: U70100BR2007PTC013168</p>
        </div>
        <p className="mt-3">
          The Company is engaged in the development and sale of residential real estate in Bihar and Jharkhand and is a registered developer under the Real Estate (Regulation and Development) Act, 2016 (RERA) with the Bihar Real Estate Regulatory Authority. The Company is committed to full compliance with RERA and all applicable statutory regulations governing real estate development in India.
        </p>
      </>
    ),
  },
  {
    id: 'disclaimer',
    title: '3. Website Content Disclaimer',
    content: (
      <>
        <p>
          All information published on this website — including but not limited to project descriptions, unit configurations, floor plans, site plans, amenities, specifications, area statements, location advantages, timelines, and possession schedules — is provided for <strong>general informational and marketing purposes only</strong> and is <strong>indicative in nature</strong>.
        </p>
        <p className="mt-3">
          Such information is subject to change at any time without prior notice and does not constitute, and shall not be construed as, a binding offer, representation, warranty, or commitment of any kind by the Company. No information on this website shall form part of any legally binding agreement between the Company and any prospective buyer, allottee, or third party.
        </p>
        <p className="mt-3">
          Prospective buyers are strongly advised to:
        </p>
        <ul className="mt-3 flex flex-col gap-2 list-none">
          {[
            'Conduct independent due diligence before making any property purchase decision.',
            'Verify all project details, approvals, and RERA registrations on the Bihar RERA official portal at https://rera.bihar.gov.in.',
            'Review the complete set of RERA-prescribed documents, including the registered agreement for sale, before making any booking or payment.',
            'Consult a qualified legal and financial advisor before entering into any property transaction.',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: 'rera',
    title: '4. RERA Compliance',
    isRera: true,
    content: (
      <>
        <p>
          Tribhuvan Awas Pvt. Ltd. is a Bihar RERA registered developer. The following residential projects are registered under the Real Estate (Regulation and Development) Act, 2016, with the Bihar Real Estate Regulatory Authority:
        </p>

        {/* Highlighted RERA box */}
        <div className="mt-5 border border-primary/40 bg-primary/5 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
            </svg>
            <span className="font-semibold text-primary uppercase tracking-wider text-sm">Bihar RERA Registered Projects</span>
          </div>
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-lg border border-primary/20 p-4">
              <p className="font-display font-bold text-secondary text-base">Tribhuvan Shivam Residency</p>
              <p className="text-xs text-muted mt-0.5">Anisabad, Patna, Bihar</p>
              <div className="mt-2 flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono-detail font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                  RERA ID: BRERAP00125-1/347/R-124/2018
                </span>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-primary/20 p-4">
              <p className="font-display font-bold text-secondary text-base">Tribhuvan Hari Enclave</p>
              <p className="text-xs text-muted mt-0.5">Ram Krishna Puram, Danapur, Patna, Bihar</p>
              <div className="mt-2 flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono-detail font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                  RERA ID: BRERAP00125-2/15/R-1539/2023
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-primary/20">
            <p className="text-sm text-secondary/70">
              Buyers and prospective allottees are strongly advised to read all RERA-registered project documents — including the registered agreement for sale, approved plans, and disclosure documents — before making any booking payment or entering into any agreement.
            </p>
            <p className="mt-2 text-sm">
              For verified RERA project information, visit the Bihar RERA official portal:{' '}
              <a
                href="https://rera.bihar.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium hover:underline"
              >
                https://rera.bihar.gov.in
              </a>
            </p>
          </div>
        </div>

        <p className="mt-4">
          Any project listed on this website that does not yet have a RERA registration number is either in the pre-launch or planning stage and has not commenced any allotment or collection of booking amounts. We will update this page promptly upon receipt of RERA registration for any new project.
        </p>
      </>
    ),
  },
  {
    id: 'pricing',
    title: '5. Pricing & Availability',
    content: (
      <>
        <p>
          All pricing information, unit costs, and payment plan details mentioned or implied on this website are <strong>indicative only</strong> and are subject to change without prior notice. Prices quoted are typically exclusive of:
        </p>
        <ul className="mt-3 flex flex-col gap-2 list-none">
          {[
            'Property registration charges and stamp duty as applicable under Bihar State laws.',
            'Goods and Services Tax (GST) at applicable rates as prescribed by the Government of India.',
            'Infrastructure Development Charges (IDC) or External Development Charges (EDC), if applicable.',
            'Preferential Location Charges (PLC), floor rise premiums, or view charges, if applicable.',
            'Maintenance deposit, corpus fund, or society charges.',
            'Any other statutory or regulatory charges levied at the time of registration.',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3">
          Unit availability is subject to change and prior sale. The Company reserves the right to modify pricing, unit configurations, and availability at any time. No booking or reservation is confirmed until a formal agreement for sale is executed and the required booking amount is received by the Company.
        </p>
      </>
    ),
  },
  {
    id: 'images',
    title: '6. Images & Renderings',
    content: (
      <>
        <p>
          All photographs, 3D renderings, computer-generated images (CGI), floor plan illustrations, site plan visualisations, elevation drawings, and lifestyle imagery displayed on this website are <strong>artistic impressions only</strong>. They are created for illustrative and marketing purposes and are intended to convey a general sense of the project's design direction.
        </p>
        <p className="mt-3">
          Actual constructed buildings, units, finishes, fixtures, fittings, flooring materials, façade treatments, landscaping, amenities, and specifications may vary from those depicted in such images and renderings. Furniture, décor, and accessories shown in room images are for representational purposes only and are not included in the sale of any unit.
        </p>
        <p className="mt-3">
          The Company does not represent or warrant that any project will be built exactly as depicted on this website. All final specifications are as described in the registered agreement for sale and the RERA-approved project documents.
        </p>
      </>
    ),
  },
  {
    id: 'no-warranty',
    title: '7. No Warranty',
    content: (
      <>
        <p>
          All information, content, and materials provided on this website are offered on an <strong>"as is" and "as available" basis</strong> without any representations, warranties, or conditions of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, accuracy, completeness, or non-infringement.
        </p>
        <p className="mt-3">
          The Company makes no guarantee that:
        </p>
        <ul className="mt-3 flex flex-col gap-2 list-none">
          {[
            'The information on this website is accurate, complete, current, or error-free at all times.',
            'The website will be available without interruption, error, or virus-free.',
            'Any specific result or outcome will be achieved by using the information provided on this website.',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3">
          Users rely on the information provided on this website entirely at their own risk.
        </p>
      </>
    ),
  },
  {
    id: 'intellectual-property',
    title: '8. Intellectual Property',
    content: (
      <>
        <p>
          All content published on this website — including but not limited to text, written content, project descriptions, marketing copy, photographs, illustrations, 3D renders, floor plans, logos, brand names, trademarks, trade dress, icons, and the overall design and layout of the website — is the exclusive property of Tribhuvan Awas Pvt. Ltd. or is used on the website with the permission of the respective rights holders.
        </p>
        <p className="mt-3">
          All intellectual property rights are reserved. You may not, without the prior written consent of Tribhuvan Awas Pvt. Ltd.:
        </p>
        <ul className="mt-3 flex flex-col gap-2 list-none">
          {[
            'Reproduce, copy, download, print, publish, or distribute any content from this website for any commercial purpose.',
            'Modify, adapt, translate, create derivative works from, or reverse-engineer any content from this website.',
            'Use any content from this website in any other website, publication, or media.',
            'Use any of our trademarks, logos, or brand elements without express written permission.',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3">
          Unauthorised use of any content from this website may give rise to a claim for damages and may constitute a criminal offence under applicable Indian laws.
        </p>
      </>
    ),
  },
  {
    id: 'liability',
    title: '9. Limitation of Liability',
    content: (
      <>
        <p>
          To the maximum extent permitted by applicable law, Tribhuvan Awas Pvt. Ltd., its directors, employees, agents, partners, and representatives shall not be liable for any direct, indirect, incidental, consequential, special, punitive, or exemplary damages, losses, costs, or expenses of any nature arising out of or in connection with:
        </p>
        <ul className="mt-3 flex flex-col gap-2 list-none">
          {[
            'Your access to, use of, or reliance on any information, content, or material provided on this website.',
            'Any inaccuracy, error, omission, or incompleteness in the information provided on this website.',
            'Any interruption, suspension, or termination of the website or its services.',
            'Any decision made or action taken by you in reliance on the content of this website.',
            'Unauthorised access to or alteration of your transmissions or data.',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3">
          This limitation of liability applies regardless of whether such damages arise in contract, tort, negligence, strict liability, or any other legal or equitable theory, and even if the Company has been advised of the possibility of such damages.
        </p>
      </>
    ),
  },
  {
    id: 'governing-law',
    title: '10. Governing Law & Jurisdiction',
    content: (
      <>
        <p>
          These Terms and Conditions, and any dispute or claim arising out of or in connection with them or their subject matter or formation (including non-contractual disputes or claims), shall be governed by and construed in accordance with the laws of the Republic of India.
        </p>
        <p className="mt-3">
          Any dispute, controversy, or claim arising out of or relating to these Terms, including any question regarding the existence, validity, interpretation, breach, or termination of these Terms, shall be subject to the <strong>exclusive jurisdiction of the competent courts located in Patna, Bihar, India</strong>. By using this website, you irrevocably submit to such jurisdiction and waive any objection to proceedings in such courts on the grounds of venue or that proceedings have been brought in an inconvenient forum.
        </p>
      </>
    ),
  },
  {
    id: 'contact',
    title: '11. Contact Us',
    content: (
      <>
        <p>
          For any questions, concerns, or clarifications regarding these Terms and Conditions or our RERA compliance, please contact us:
        </p>
        <div className="mt-4 bg-surface rounded-xl border border-gray-200 p-5 flex flex-col gap-2 text-sm">
          <p className="font-semibold text-secondary font-display text-base">Tribhuvan Awas Pvt. Ltd.</p>
          <p className="text-muted">111, 1st Floor, Ashoka Place, Exhibition Road, Patna – 800001, Bihar, India</p>
          <p className="text-muted">
            Phone:{' '}
            <a href="tel:+919801056929" className="text-primary hover:underline">+91-9801056929</a>
          </p>
          <p className="text-muted">
            Email:{' '}
            <a href="mailto:anilranjan5512@gmail.com" className="text-primary hover:underline">anilranjan5512@gmail.com</a>
          </p>
          <p className="text-muted">CIN: U70100BR2007PTC013168</p>
          <p className="text-muted">
            Bihar RERA Portal:{' '}
            <a
              href="https://rera.bihar.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              https://rera.bihar.gov.in
            </a>
          </p>
        </div>
      </>
    ),
  },
]

export default function Terms() {
  return (
    <main className="pt-20">
      <SEO title="Terms & Conditions" description="Terms and Conditions for using the Tribhuvan Awas website, including RERA disclaimer and liability limitations." noIndex />
      {/* Hero */}
      <section
        className="relative h-56 md:h-72 flex items-end bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80')" }}
      >
        <div className="absolute inset-0 bg-secondary/70" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-10 w-full">
          <nav className="text-white/50 text-sm mb-2 flex items-center gap-2">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Terms &amp; Conditions</span>
          </nav>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white">Terms &amp; Conditions</h1>
        </div>
      </section>

      {/* Intro banner */}
      <div className="bg-surface border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-5">
          <p className="text-muted text-sm leading-relaxed">
            Please read these Terms and Conditions carefully before using the Tribhuvan Awas Pvt. Ltd. website. By accessing or using our website, you agree to be bound by these Terms. <span className="text-primary font-medium">Last Updated: May 2026.</span>
          </p>
        </div>
      </div>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col gap-12">
            {sections.map((section) => (
              <div key={section.id} id={section.id}>
                <h2 className="font-display font-bold text-xl md:text-2xl text-secondary mb-4 pb-3 border-b border-gray-100">
                  {section.title}
                </h2>
                <div className="text-secondary/70 leading-relaxed text-base">
                  {section.content}
                </div>
              </div>
            ))}
          </div>

          {/* Footer nav */}
          <div className="mt-16 pt-8 border-t border-gray-100 flex items-center justify-between flex-wrap gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
            <Link
              to="/privacy-policy"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium transition-colors"
            >
              Privacy Policy
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
