export default function Footer() {
  return (
    <footer className="bg-[#020204] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr_1.4fr]">
         
          <div className="space-y-5">
         <img src="logo-uplearning.svg" alt="Company Logo" />
            <h2 className="text-3xl font-semibold text-white">Reach Out and Join the Community</h2>
            <p className="max-w-xl text-sm leading-7 text-slate-300">
              Connect with our team, share feedback, or join the programme community for updates, events, and insider launch support.
            </p>
            <div className="space-y-3">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Email</p>
                <a href="mailto:hello@uplearning.co" className="mt-1 block text-base font-medium text-white transition hover:text-yellow-400">
                  hello@uplearning.co
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Phone</p>
                <a href="tel:+919876543210" className="mt-1 block text-base font-medium text-white transition hover:text-yellow-400">
                  +91 98765 43210
                </a>
              </div>
            </div>
            <a
              href="https://chat.whatsapp.com/INDHm1J9PNmBhsG8HUB4v2?s=cl&p=a&ilr=1"
              className="inline-flex rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-yellow-400 hover:text-yellow-400"
            >
              Join Our Community
            </a>
          </div>

          <div className="space-y-5">
            <p className="text-sm uppercase tracking-[0.36em] text-[var(--brand-yellow)]">Quick Links</p>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>
                <a href="https://in.linkedin.com/company/uplearning-in" className="transition hover:text-white">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/uplearning_in/" className="transition hover:text-white">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://x.com/uplearningin" className="transition hover:text-white">
                  X
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@Uplearning-in" className="transition hover:text-white">
                  YouTube
                </a>
              </li>
              <li>
                <a href="https://www.irisefoundation.in/" className="transition hover:text-white">
                  iRise Academy 
                </a>
              </li>
            </ul>
          </div>
          


          <div className="w-full space-y-5">
            <p className="text-sm uppercase tracking-[0.36em] text-[var(--brand-yellow)]">Reviews</p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
              <span className="rounded-[24px] border border-white/10 bg-white/5 p-5 sm:w-1/2">
                <div>
                  <p className="text-sm font-semibold text-white">Trustpilot</p>
                  <p className="mt-2 text-3xl font-semibold text-yellow-400">3.7</p>
                  <p className="mt-1 text-sm text-slate-300">Excellent based on student reviews</p>
                </div>
                <a href="https://www.trustpilot.com/review/uplearning.in" className="mt-4 inline-block text-sm font-semibold text-white underline underline-offset-4 transition hover:text-yellow-400">
                  Add your feedback
                </a>
              </span>
              <span className="rounded-[24px] border border-white/10 bg-white/5 p-5 sm:w-1/2">
                <div>
                  <p className="text-sm font-semibold text-white">Google Business</p>
                  <p className="mt-2 text-3xl font-semibold text-cyan-300">5.0</p>
                  <p className="mt-1 text-sm text-slate-300">Trusted by learners and founders</p>
                </div>
                <a href="https://g.page/r/CY9-rXHVB7ixEBM/review" className="mt-4 inline-block text-sm font-semibold text-white underline underline-offset-4 transition hover:text-cyan-300">
                  Add your feedback
                </a>
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-sm text-slate-500 sm:flex sm:items-center sm:justify-between">
          <p>© 2026 UpLearning. Learn What Matters'</p>
          <div className="mt-4 flex flex-wrap gap-4 sm:mt-0">
            <a href="#" className="transition hover:text-white">Privacy Policy</a>
            <a href="#" className="transition hover:text-white">Terms of Use</a>
            <a href="#" className="transition hover:text-white">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
