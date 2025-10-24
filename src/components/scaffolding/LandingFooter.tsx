'use client'

import Link from 'next/link'
import { Mail } from 'lucide-react'
import { SiFacebook, SiLinkedin, SiYoutube } from 'react-icons/si'

export default function LandingFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl py-14 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 text-sm text-muted-foreground">
          {/* Left: Brand + tagline + socials + contact */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            {/* Brand */}
            <div className="text-center md:text-left space-y-2">
              <p className="font-semibold text-foreground text-lg">GradeGo!</p>
              <p className="max-w-xs text-xs leading-relaxed">
                Empowering teachers with tools to simplify classroom management
                and enhance learning.
              </p>
            </div>

            {/* Social icons */}
            <div className="flex space-x-4">
              <Link
                href="#"
                aria-label="Facebook"
                className="hover:text-primary transition-colors"
              >
                <SiFacebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                aria-label="LinkedIn"
                className="hover:text-primary transition-colors"
              >
                <SiLinkedin className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                aria-label="YouTube"
                className="hover:text-primary transition-colors"
              >
                <SiYoutube className="h-5 w-5" />
              </Link>
              <Link
                href="mailto:support@classflow.com"
                aria-label="Email"
                className="hover:text-primary transition-colors"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>

            {/* Quick Contact Info */}
            <div className="text-xs text-left mt-2">
              <p>Email: support@classflow.com</p>
              <p>Phone: +1 (123) 456-7890</p>
            </div>
          </div>

          {/* Right: Links */}
          <div className="flex flex-col md:flex-row gap-12 md:gap-24">
            {/* Quick Links */}
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-foreground text-sm mb-2">
                Quick Links
              </h3>
              <nav className="flex flex-col gap-y-2">
                <Link
                  href="/about"
                  className="hover:text-foreground transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/pricing"
                  className="hover:text-foreground transition-colors"
                >
                  Pricing
                </Link>
                <Link
                  href="/blog"
                  className="hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
                <Link
                  href="/help"
                  className="hover:text-foreground transition-colors"
                >
                  Help
                </Link>
                <Link
                  href="/contact"
                  className="hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </nav>
            </div>

            {/* Policies */}
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-foreground text-sm mb-2">
                Policies
              </h3>
              <div className="flex flex-col gap-y-2 text-xs">
                <Link
                  href="/privacy"
                  className="hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="hover:text-foreground transition-colors"
                >
                  Terms of Service
                </Link>
              </div>
            </div>

            {/* Sitemap / Mini Navigation */}
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-foreground text-sm mb-2">
                Sitemap
              </h3>
              <nav className="flex flex-col gap-y-2 text-xs">
                <Link
                  href="/features"
                  className="hover:text-foreground transition-colors"
                >
                  Features
                </Link>
                <Link
                  href="/faq"
                  className="hover:text-foreground transition-colors"
                >
                  FAQ
                </Link>
                <Link
                  href="/resources"
                  className="hover:text-foreground transition-colors"
                >
                  Resources
                </Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-10 pt-6 text-center text-xs text-muted-foreground">
          © 2025 GradeGo. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
