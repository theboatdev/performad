export default function Footer() {
  return (
    <footer className=" pt-16 pb-12 bg-[#010D1A] md:pt-20">
      <div className="mx-8 max-w-7xl md:mx-10 lg:mx-20 xl:mx-auto">
        <div className="flex flex-col md:flex-row justify-between text-gray-400">
          {/* Left Column */}
          <div className="w-full md:w-1/3 mb-10 md:mb-0">
            <img
              src="/logo-white.png"
              alt="Perfomad Logo"
              className="w-40 mb-4"
            />
            <p className="text-gray-300 pr-20">
              We provide only limited services we specialized in, each service
              is specifically made for elevated customer base to make your life
              easier.
            </p>
            <p className="mt-4">📩 info@perfomad.com</p>
            <p>📞 +94 779504509 | +971 588907951</p>
          </div>

          {/* Right Column */}
          <div className="w-full md:w-2/3">
            {/* Top Section */}
            <div className="grid grid-cols-2 font-bold md:grid-cols-4 gap-6 text-white mb-6">
              <a href="#services">
                {" "}
                <span>Our Services</span>
              </a>
              <a href="#portfolio">
                {" "}
                <span>Case Studies</span>
              </a>
              <a href="#testemonials">
                {" "}
                <span>Testemonials</span>
              </a>
              <a href="/career">
                {" "}
                <span>Careers</span>
              </a>
              <a href="#faq">
                {" "}
                <span>FAQs</span>
              </a>
            </div>

            {/* Locations */}
            <div className="grid grid-cols-2 font-semibold md:grid-cols-4 gap-6 text-gray-300">
              <div className="flex items-center">
                <img
                  src="/countries/srilanka.svg" // Add the path to your Sri Lanka logo
                  alt="Sri Lanka"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div className="flex flex-col">
                  <span className="mt-5">Sri Lanka</span>
                  <span>Head Office</span>
                </div>
              </div>
              <div className="flex items-center">
                <img
                  src="/countries/uae.svg" // Add the path to your UAE logo
                  alt="United Arab Emirates"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div className="flex flex-col">
                  <span className="mt-5">United Arab Emirates</span>
                  <span>Regional Office</span>
                </div>
              </div>
              <div className="flex items-center">
                <img
                  src="/countries/us.svg" // Add the path to your USA logo
                  alt="United States Head Office"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div className="flex flex-col">
                  <span className="mt-5">United States</span>
                  <span>Regional Office</span>
                </div>
              </div>
              <div className="flex items-center">
                <img
                  src="/countries/australia.svg" // Add the path to your Australia logo
                  alt="Melbourne Head Office"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div className="flex flex-col">
                  <span className="mt-5">Australia</span>
                  <span>Regional Office</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-10">
          <p className="text-gray-300 text-center md:text-left">
            Powered by <a href="https://theDocklar.com">theDocklar</a>. &copy;
            Perfomad {new Date().getFullYear()}. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span className="font-bold text-white mb-6">Follow Us On</span>
            <a href="https://www.linkedin.com/company/perfomad/">
              <img src="/linkedin.png" alt="LinkedIn" className="w-6" />
            </a>
            <a href="#">
              <img src="/facebook.png" alt="Facebook" className="w-6" />
            </a>
            <a href="#">
              <img src="/instagram.png" alt="Instagram" className="w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
