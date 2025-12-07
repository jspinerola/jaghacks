import React from "react";
import {
  Instagram,
  MessageCircle,
  ExternalLink,
  Globe,
  Mail,
} from "lucide-react";
import { Separator } from "../ui/separator";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t ">
      <div className=" py-8 px-4 flex flex-col items-center justify-center">
        {/* Main Footer Content */}
        <div className=" container flex flex-col gap-6 mb-6">
          {/* Links and Contact Section */}
          <div className="flex flex-col md:flex-row gap-6 md:items-start md:justify-between">
            {/* Social Links */}
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold">Connect With Us</h3>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://jagsync.tamusa.edu/organization/acm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Visit ACM JagSync"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>JagSync</span>
                </a>
                <a
                  href="https://www.instagram.com/acm.tamusa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="h-4 w-4" />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://discord.gg/q6SBqbaJP4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Join our Discord"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Discord</span>
                </a>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Globe className="h-4 w-4" />
                  <span>Main Website (Coming Soon)</span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="flex flex-col gap-4">
              <h3 className="text-sm font-semibold">Contact</h3>
              <a
                href="mailto:tamusa.acm@gmail.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email us"
              >
                <Mail className="h-4 w-4" />
                <span>tamusa.acm@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Copyright */}
        <div className="text-sm text-muted-foreground text-center">
          <p>
            © JagHacks & Association of Computing Machinery at Texas A&M
            University-San Antonio {currentYear}. All Rights Reserved.
          </p>
          <p>
            ACM at Texas A&M University-San Antonio (ACM-TAMUSA for short) is a
            student organization of Texas A&M University-San Antonio and does
            not directly represent the university.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
