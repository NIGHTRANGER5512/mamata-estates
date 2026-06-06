import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const sections = [
  {
    id: 'introduction',
    title: '1. Introduction',
    content: (
      <>
        <p>
          Tribhuvan Awas Pvt. Ltd. (CIN: U70100BR2007PTC013168), a Private Limited Company incorporated under the Companies Act, 1956, and registered with the Registrar of Companies, Patna, Bihar, with its registered office at 111, 1st Floor, Ashoka Place, Exhibition Road, Patna – 800001 ("the Company", "we", "us", or "our"), is committed to protecting the privacy of all individuals who interact with our website and services.
        </p>
        <p className="mt-3">
          This Privacy Policy describes how we collect, use, store, and protect personal information you provide when you visit our website or submit an enquiry about our real estate projects. By using our website, you consent to the practices described in this policy. If you do not agree with any part of this policy, please discontinue use of our website.
        </p>
        <p className="mt-3">
          This policy is published in compliance with applicable Indian laws, including the Information Technology Act, 2000, the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, and applicable provisions of the Real Estate (Regulation and Development) Act, 2016 (RERA).
        </p>
      </>
    ),
  },
  {
    id: 'information-we-collect',
    title: '2. Information We Collect',
    content: (
      <>
        <p>
          We collect only the personal information necessary to respond to your property enquiries and to maintain our statutory records. The categories of information we may collect include:
        </p>
        <ul className="mt-3 flex flex-col gap-2 list-none">
          {[
            { label: 'Name', desc: 'Your full name as submitted via our contact or enquiry forms.' },
            { label: 'Phone Number', desc: 'Your mobile or landline number so our sales team can contact you regarding your enquiry.' },
            { label: 'Email Address', desc: 'Your email address as provided through our online enquiry forms, used for correspondence and sending project brochures.' },
            { label: 'Project Interest', desc: 'The specific project or unit type you have expressed interest in, as indicated in your enquiry.' },
            { label: 'Browser Cookies', desc: 'We use essential session cookies to ensure the website functions correctly. These cookies do not track you across third-party websites and do not collect personally identifiable information.' },
          ].map((item) => (
            <li key={item.label} className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              <span><strong className="text-secondary">{item.label}:</strong> {item.desc}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3">
          We do not collect sensitive personal data such as financial information, Aadhaar numbers, PAN numbers, or any government identification details through our website. Any such information that may become necessary during the booking and registration process is collected through separate, secure, and legally compliant channels.
        </p>
      </>
    ),
  },
  {
    id: 'how-we-use',
    title: '3. How We Use Your Information',
    content: (
      <>
        <p>
          The personal information you provide is used solely for the following purposes:
        </p>
        <ul className="mt-3 flex flex-col gap-2 list-none">
          {[
            'To respond promptly to your property enquiries and provide you with relevant information about our projects, pricing, and availability.',
            'To schedule site visits, telephone consultations, or meetings between you and our sales representatives.',
            'To send you project brochures, floor plans, and other marketing materials relevant to your stated property interest.',
            'To maintain buyer and prospective buyer records as required under the Real Estate (Regulation and Development) Act, 2016, and Bihar RERA regulations.',
            'To improve our website, user experience, and service quality based on aggregated, anonymised interaction data.',
            'To comply with any lawful order of a court, tribunal, or regulatory authority.',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3">
          We will not use your information for purposes other than those described above without first obtaining your explicit consent.
        </p>
      </>
    ),
  },
  {
    id: 'data-storage',
    title: '4. Data Storage & Security',
    content: (
      <>
        <p>
          We take the security of your personal data seriously. The information you provide through our website is stored on secure servers maintained by our hosting service provider. We implement reasonable technical and organisational security measures to protect your data from unauthorised access, alteration, disclosure, or destruction.
        </p>
        <p className="mt-3">
          Your personal data will <strong>not be sold, rented, or traded</strong> to any third party for marketing or commercial purposes. We do not share your personal information with third parties except in the following limited circumstances:
        </p>
        <ul className="mt-3 flex flex-col gap-2 list-none">
          {[
            'With our authorised employees and representatives who need the information to follow up on your enquiry.',
            'With professional consultants (legal, structural, or financial) engaged by us, strictly on a need-to-know basis and subject to confidentiality obligations.',
            'With government authorities, regulators, or courts where disclosure is required by law, including Bihar RERA authorities.',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3">
          Personal data will be retained for as long as necessary to fulfil the purposes for which it was collected, and for the minimum retention periods required under RERA regulations and applicable Indian law. When data is no longer required, it will be securely deleted or anonymised.
        </p>
      </>
    ),
  },
  {
    id: 'cookies',
    title: '5. Cookies',
    content: (
      <>
        <p>
          Our website uses only <strong>essential functional cookies</strong> that are strictly necessary for the website to operate correctly. These cookies enable core functionality such as navigation, form submission, and page session management. We do not use tracking cookies, advertising cookies, analytics cookies, or any third-party marketing cookies.
        </p>
        <p className="mt-3">
          You may control and manage cookies through your web browser settings. Most browsers allow you to view, disable, or delete cookies at any time. Please note that disabling essential cookies may affect the functionality of certain features on our website, such as enquiry form submission.
        </p>
        <p className="mt-3">
          Instructions for managing cookies are typically found in your browser's "Help", "Settings", or "Privacy" menu. Popular browsers such as Chrome, Firefox, Edge, and Safari all provide cookie management controls.
        </p>
      </>
    ),
  },
  {
    id: 'third-party-links',
    title: '6. Third-Party Links',
    content: (
      <>
        <p>
          Our website may contain links to third-party websites and services, including but not limited to:
        </p>
        <ul className="mt-3 flex flex-col gap-2 list-none">
          {[
            'The Bihar RERA official portal (https://rera.bihar.gov.in) for verification of our project registrations.',
            'External map services (such as Google Maps) embedded on our contact and project location pages.',
            'WhatsApp for direct communication via the WhatsApp Business platform.',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3">
          Once you leave our website and navigate to a third-party website, this Privacy Policy no longer applies. We strongly encourage you to review the privacy policies of any third-party websites you visit. Tribhuvan Awas Pvt. Ltd. accepts no responsibility or liability for the privacy practices, content, or data collection activities of any third-party website or service.
        </p>
      </>
    ),
  },
  {
    id: 'childrens-privacy',
    title: "7. Children's Privacy",
    content: (
      <>
        <p>
          Our website and services are intended exclusively for adults who are at least 18 years of age. The real estate services offered by Tribhuvan Awas Pvt. Ltd. are not directed at, and are not intended for use by, children under the age of 18.
        </p>
        <p className="mt-3">
          We do not knowingly collect, process, or store any personal information from individuals under the age of 18. If we become aware that we have inadvertently received personal data from a person under 18, we will take immediate steps to delete such information from our records. If you believe we have inadvertently collected information from a minor, please contact us immediately at anilranjan5512@gmail.com.
        </p>
      </>
    ),
  },
  {
    id: 'your-rights',
    title: '8. Your Rights',
    content: (
      <>
        <p>
          As an individual whose personal data we hold, you have the following rights under applicable Indian law:
        </p>
        <ul className="mt-3 flex flex-col gap-2 list-none">
          {[
            { label: 'Right to Access', desc: 'You may request a copy of the personal information we hold about you.' },
            { label: 'Right to Correction', desc: 'You may request that we correct any inaccurate or incomplete personal information we hold about you.' },
            { label: 'Right to Deletion', desc: 'You may request that we delete your personal data, subject to any statutory retention obligations we are required to comply with under RERA or other applicable law.' },
            { label: 'Right to Withdraw Consent', desc: 'You may withdraw your consent to receiving marketing communications at any time by contacting us directly.' },
          ].map((item) => (
            <li key={item.label} className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              <span><strong className="text-secondary">{item.label}:</strong> {item.desc}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3">
          To exercise any of these rights, please contact us in writing at{' '}
          <a href="mailto:anilranjan5512@gmail.com" className="text-primary hover:underline">
            anilranjan5512@gmail.com
          </a>{' '}
          or at our registered office address. We will respond to your request within a reasonable time and in accordance with applicable law.
        </p>
      </>
    ),
  },
  {
    id: 'governing-law',
    title: '9. Governing Law',
    content: (
      <>
        <p>
          This Privacy Policy and all matters relating to the collection, use, storage, and processing of personal data by Tribhuvan Awas Pvt. Ltd. are governed by and construed in accordance with the laws of the Republic of India, including the Information Technology Act, 2000, and its associated rules and regulations.
        </p>
        <p className="mt-3">
          Any dispute arising out of or in connection with this Privacy Policy, including any question regarding its existence, validity, or interpretation, shall be subject to the exclusive jurisdiction of the competent courts located in Patna, Bihar, India.
        </p>
      </>
    ),
  },
  {
    id: 'updates',
    title: '10. Updates to This Policy',
    content: (
      <>
        <p>
          Tribhuvan Awas Pvt. Ltd. reserves the right to update, amend, or modify this Privacy Policy at any time to reflect changes in our practices, legal requirements, or regulatory obligations. Any changes will be effective upon posting the revised policy on our website. The "Last Updated" date at the top of this page will be revised accordingly.
        </p>
        <p className="mt-3">
          We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information. Continued use of our website following the posting of changes constitutes your acceptance of those changes.
        </p>
        <p className="mt-3 text-sm text-muted">
          <strong>Last Updated:</strong> May 2026
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
          If you have any questions, concerns, or requests regarding this Privacy Policy or the way we handle your personal data, please contact us using the details below:
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
        </div>
      </>
    ),
  },
]

export default function PrivacyPolicy() {
  return (
    <main className="pt-20">
      <SEO title="Privacy Policy" description="Privacy Policy for Tribhuvan Awas Pvt. Ltd. — how we collect, use, and protect your personal information." noIndex />
      {/* Hero */}
      <section
        className="relative h-56 md:h-72 flex items-end bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80')" }}
      >
        <div className="absolute inset-0 bg-secondary/70" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-10 w-full">
          <nav className="text-white/50 text-sm mb-2 flex items-center gap-2">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Privacy Policy</span>
          </nav>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-white">Privacy Policy</h1>
        </div>
      </section>

      {/* Intro banner */}
      <div className="bg-surface border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-5">
          <p className="text-muted text-sm leading-relaxed">
            This Privacy Policy explains how <strong className="text-secondary">Tribhuvan Awas Pvt. Ltd.</strong> collects, uses, and protects your personal information. Please read this document carefully. <span className="text-primary font-medium">Last Updated: May 2026.</span>
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

          {/* Back to home */}
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
              to="/terms"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium transition-colors"
            >
              Terms &amp; Conditions
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
