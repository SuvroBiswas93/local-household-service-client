import React from "react";

const WhyChooseUs = () => {
  return (
    <section className="px-6 py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Why Choose HomeHero?
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Finding reliable household services should be simple. HomeHero connects
          you with trusted local experts—quickly and safely.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1827/1827504.png"
              alt=""
              className="w-14 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Verified Professionals</h3>
            <p className="text-gray-600">
              Every service provider is background-checked and reviewed by real
              users.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/814/814513.png"
              alt=""
              className="w-14 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Easy Online Booking</h3>
            <p className="text-gray-600">
              Book services anytime with our smooth and user-friendly interface.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <img
              src="https://cdn-icons-png.flaticon.com/512/929/929610.png"
              alt=""
              className="w-14 mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Transparent Pricing</h3>
            <p className="text-gray-600">
              No hidden fees—just honest pricing and quality service you can
              trust.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
