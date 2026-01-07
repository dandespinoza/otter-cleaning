import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Terms & Conditions"
        description="Terms and Conditions for Otter Cleaning services. Read about our booking policy, cancellation policy, satisfaction guarantee, liability, and more."
        keywords="cleaning service terms, house cleaning terms and conditions, cleaning service policy, cancellation policy"
        canonicalUrl="/terms"
        noindex={false}
      />
      <Header />

      <section className="py-16 bg-cream">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">Terms & Conditions</h1>
          <p className="text-muted-foreground">Last updated: January 2025</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-navy mb-3">1. Agreement to Terms</h2>
              <p>By booking a cleaning service with Otter Cleaning ("Company," "we," "us," or "our"), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-navy mb-3">2. Services</h2>
              <p>Otter Cleaning provides residential and commercial cleaning services in the NYC, Long Island, and New Jersey areas. Our services include Standard, Standard Plus, Deep Clean, and Move In/Out cleaning tiers, as well as various add-on services as described on our website.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-navy mb-3">3. Booking & Scheduling</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>All bookings are subject to availability.</li>
                <li>A valid email address and phone number are required for all bookings.</li>
                <li>You must provide accurate information about your property, including size, access instructions, and any special requirements.</li>
                <li>We reserve the right to refuse service at our discretion.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-navy mb-3">4. Cancellation Policy</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Cancellations made 24+ hours before the scheduled service: No charge.</li>
                <li>Cancellations made less than 24 hours before service: A cancellation fee may apply (up to 50% of the quoted price).</li>
                <li>No-shows without prior notice: Full service charge may apply.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-navy mb-3">5. Pricing & Payment</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Prices are quoted based on the service tier, property size, and selected add-ons.</li>
                <li>Payment is due at the time of booking or upon completion of service, as specified.</li>
                <li>We accept major credit cards and other payment methods as indicated during checkout.</li>
                <li>Recurring service discounts: 10% weekly, 7% bi-weekly, 5% monthly.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-navy mb-3">6. Access to Property</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>You are responsible for providing safe and clear access to your property.</li>
                <li>If we cannot access your property at the scheduled time, a cancellation fee may apply.</li>
                <li>Keys, codes, or access devices provided to us will be handled securely and returned after service.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-navy mb-3">7. Satisfaction Guarantee</h2>
              <p>If you are not satisfied with any aspect of our service, please notify us within 24 hours of service completion. We will return to address the issue at no additional charge. This guarantee does not apply to issues caused by factors beyond our control.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-navy mb-3">8. Liability & Insurance</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Otter Cleaning is fully insured and bonded.</li>
                <li>We are not liable for damage to items of extraordinary value unless specifically noted before service.</li>
                <li>Claims for damage must be reported within 24 hours of service completion.</li>
                <li>We are not responsible for items left in pockets, on floors, or in unsecured locations.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-navy mb-3">9. Safety & Limitations</h2>
              <p>We do not provide services for:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Biohazard or mold remediation</li>
                <li>High-rise exterior window cleaning</li>
                <li>Major appliance disconnection or repair</li>
                <li>Areas requiring specialized equipment not in our standard inventory</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-navy mb-3">10. Privacy</h2>
              <p>We respect your privacy. We do not open closed drawers, closets, or personal items unless included in your booked service scope (Deep Clean or Move In/Out). See our Privacy Policy for details on how we handle your personal information.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-navy mb-3">11. Changes to Terms</h2>
              <p>We reserve the right to modify these terms at any time. Changes will be posted on our website and will be effective immediately upon posting.</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-navy mb-3">12. Contact</h2>
              <p>For questions about these Terms & Conditions, please contact us at:</p>
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
