import Link from 'next/link'

import { ArrowRight, Mail, MapPin, Phone, Send } from 'lucide-react'

export async function FooterNewsLetterUI({ backgroundImage, description, ctaButton, socialLinks, hours }: any) {
  return (
    <>
      <footer className="relative bg-primary text-background/80 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />

        <div className="relative border-b border-background/10">
          <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 max-w-5xl mx-auto">
              <div className="text-center lg:text-left">
                <h3 className="text-xl font-bold text-background mb-2">Stay Updated with Granville Dental Group</h3>
                <p className="text-sm text-background/50">Get dental tips, special offers, and appointment reminders delivered to your inbox.</p>
              </div>

              <div className="md:flex flex-wrap w-full max-w-md gap-0">
                <input
                  type="mail"
                  placeholder="Enter your email"
                  required
                  className="bg-white text-black rounded-none px-2 border border-background/20 
               placeholder:text-gray-400 focus:ring-primary"
                />
                <button className="flex items-center gap-2 bg-secondary hover:bg-secondary/50 p-3 mt-4 md:mt-0">
                  Subscribe <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="relative container mx-auto px-4 py-16 lg:py-20">
          <div className="grid grid-cols-3 md:grid-cols-1 xl:grid-cols-8 gap-12 lg:gap-8">
            <div className="xl:col-span-3 col-span-7">
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-bold">DentalCare</span>
              </Link>
              {description && <p className="text-sm leading-relaxed text-background/60 mb-6">{description}</p>}

              {/* <div className="flex gap-3">
                {[Facebook, Instagram, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-xl bg-background/10 hover:bg-secondary hover:text-primary-foreground flex items-center justify-center transition-all duration-300">
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div> */}
            </div>

            {/* Quick Links */}
            <div className="xl:col-span-1 col-span-7">
              <h4 className="font-semibold text-background mb-5 text-sm uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-3">
                <li className="flex items-center text-sm text-background/50 gap-2">
                  {/* group wraps both link & arrow */}
                  <div className="flex items-center gap-2 group">
                    <ArrowRight
                      className="
            h-3 w-3 opacity-0 -ml-4 -translate-x-2
            transition-all duration-300
            group-hover:opacity-100 group-hover:translate-x-0
          "
                    />

                    <Link href={'#'} className="hover:text-secondary transition-colors">
                      Home
                    </Link>
                  </div>
                </li>
                <li className="flex items-center text-sm text-background/50 gap-2">
                  {/* group wraps both link & arrow */}
                  <div className="flex items-center gap-2 group">
                    <ArrowRight
                      className="
            h-3 w-3 opacity-0 -ml-4 -translate-x-2
            transition-all duration-300
            group-hover:opacity-100 group-hover:translate-x-0
          "
                    />

                    <Link href={'#'} className="hover:text-secondary transition-colors">
                      About Us
                    </Link>
                  </div>
                </li>
                <li className="flex items-center text-sm text-background/50 gap-2">
                  {/* group wraps both link & arrow */}
                  <div className="flex items-center gap-2 group">
                    <ArrowRight
                      className="
            h-3 w-3 opacity-0 -ml-4 -translate-x-2
            transition-all duration-300
            group-hover:opacity-100 group-hover:translate-x-0
          "
                    />

                    <Link href={'#'} className="hover:text-secondary transition-colors">
                      Conatct us
                    </Link>
                  </div>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="xl:col-span-2 md:col-span-3 col-span-7">
              <h4 className="font-semibold text-background mb-5 text-sm uppercase tracking-wider">Contact Us</h4>

              <div className="space-y-4">
                <a href="tel:+1 604-261-8164" rel="noopener noreferrer" className="flex items-center gap-3 text-sm group cursor-pointer">
                  <div className="w-9 h-9 rounded-lg bg-background/5 group-hover:bg-secondary flex items-center justify-center transition-colors shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span className="text-background/60 group-hover:text-background transition-colors">+1 604-261-8164</span>
                </a>
                <a href="mailto:info.granvilledental@gmail.com" rel="noopener noreferrer" className="flex items-center gap-3 text-sm group cursor-pointer">
                  <div className="w-9 h-9 rounded-lg bg-background/5 group-hover:bg-secondary flex items-center justify-center transition-colors shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span className="text-background/60 group-hover:text-background transition-colors">info.granvilledental@gmail.com</span>
                </a>
                <a
                  href="https://www.google.com/maps?cid=11935577831049169311&amp;g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYASAA&amp;hl=en&amp;gl=IN&amp;source=embed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm group cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-lg bg-background/5 group-hover:bg-secondary flex items-center justify-center transition-colors shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span className="text-background/60 group-hover:text-background transition-colors">8357 Granville St, Vancouver, BC V6P 4Z8, Canada</span>
                </a>
              </div>
            </div>

            {/* Hours */}
            {Array.isArray(hours) && (
              <div className="xl:col-span-2  md:col-span-2 col-span-7">
                <h4 className="font-semibold text-background mb-5 text-sm uppercase tracking-wider">Office Hours</h4>
                <div className="space-y-3 text-sm">
                  {hours.map((row, i) => (
                    <div key={i} className="flex justify-between gap-4 xl:gap-1 items-center py-2 border-b border-background/5 last:border-0">
                      <span className="text-background/50">{row.day}</span>
                      <span className="text-background/80 font-medium">{row.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="relative border-t border-background/10">
          <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-background/30">
            <p>© {new Date().getFullYear()} Granville Dental Wellness Group. All rights reserved.</p>
            <div className="flex gap-3 md:gap-6 flex-wrap md:flex-row justify-center mt-2 md:mt-0">
              <a href="/privacypolicy" className="hover:text-background/60 transition-colors">
                Privacy Policy
              </a>
              <a href="/terms-and-conditions" className="hover:text-background/60 transition-colors">
                Terms and Conditions
              </a>
              <a href="/disclaimer" className="hover:text-background/60 transition-colors">
                Disclaimer
              </a>
              <a href="/accessibility" className="hover:text-background/60 transition-colors">
                Accessibility
              </a>
              <a href={`#`} className="hover:text-background/60 transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
