export default function ContactFooter() {
  return (
    <>
      <footer className="bg-[#111315] text-[#b0b0b0] py-12 px-4 border-t border-[#333333]">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Quick links</h3>
              <ul className="flex flex-col gap-3">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Return & Refund Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping Policy</a></li>
              </ul>
            </div>
            <div>
              <p className="text-sm leading-relaxed max-w-sm">
                *These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-[#333333] flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-[#b0b0b0] text-xs">© 2026 IRON FUEL LAB</p>
            <div className="flex gap-3 items-center">
              <img src="/visa.svg" alt="Visa" className="h-[14px]" />
              <img src="/mastercard.svg" alt="Mastercard" className="h-5" />
              <img src="/paypal.svg" alt="PayPal" className="h-4" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
