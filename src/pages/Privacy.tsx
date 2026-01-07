import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Privacy Policy"
        description="Privacy Policy for Otter Cleaning. Learn how we collect, use, and protect your personal information when you use our cleaning services."
        keywords="cleaning service privacy policy, house cleaning privacy, data protection cleaning service"
        canonicalUrl="/privacy"
        noindex={false}
      />
      <Header />

      <section className="py-16 bg-cream">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: January 2025</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-navy mb-3">1. Introduction</h2>
              <p>Otter Cleaning ("Company," "we," "us," or "our") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services or visit our website.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-navy mb-3">2. Information We Collect</h2>
              <p><strong className="text-navy">Personal Information:</strong> When you book a service, we collect:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Name and contact information (email, phone number)</li>
                <li>Service address</li>
                <li>Payment information (processed securely through our payment provider)</li>
                <li>Special instructions or preferences you provide</li>
              </ul>
              <p className="mt-4"><strong className="text-navy">Automatically Collected Information:</strong></p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>IP address</li>
                <li>Pages visited and time spent on our site</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-navy mb-3">3. How We Use Your Information</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>To provide and manage our cleaning services</li>
                <li>To communicate with you about bookings, updates, and promotions</li>
                <li>To process payments</li>
                <li>To improve our services and website</li>
                <li>To comply with legal obligations</li>
                <li>To respond to your inquiries and provide customer support</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-navy mb-3">4. Information Sharing</h2>
              <p>We do not sell your personal information. We may share your information with:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong className="text-navy">Service Providers:</strong> Third parties who help us operate our business (payment processors, scheduling software, etc.)</li>
                <li><strong className="text-navy">Cleaning Staff:</strong> Only the information necessary to perform your requested service</li>
                <li><strong className="text-navy">Legal Requirements:</strong> When required by law or to protect our rights</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-navy mb-3">5. Data Security</h2>
              <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-navy mb-3">6. Your Rights</h2>
              <p>Depending on your location, you may have the right to:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent where applicable</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-navy mb-3">7. Cookies</h2>
              <p>Our website may use cookies and similar technologies to enhance your experience. You can control cookies through your browser settings. Disabling cookies may affect some functionality of our website.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-navy mb-3">8. Third-Party Links</h2>
              <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-navy mb-3">9. Children's Privacy</h2>
              <p>Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-navy mb-3">10. Data Retention</h2>
              <p>We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. When no longer needed, we securely delete or anonymize your data.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-navy mb-3">11. Changes to This Policy</h2>
              <p>We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website with an updated "Last updated" date.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-navy mb-3">12. Contact Us</h2>
              <p>For questions or concerns about this Privacy Policy or our data practices, please contact us:</p>
              <p className="mt-2">
                <strong className="text-navy">Otter Cleaning</strong><br />
                Email: hello@ottercleaning.com<br />
                Service Areas: NYC • Long Island • New Jersey
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
