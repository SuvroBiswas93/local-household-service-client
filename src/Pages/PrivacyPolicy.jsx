import { ShieldCheck, Lock, UserCheck, Mail } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-200 max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we
            collect, use, and protect your information.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="w-11/12 mx-auto px-3 py-16 space-y-12">
        {/* Section */}
        <section className="bg-white px-8 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <UserCheck className="text-teal-500" />
            <h2 className="text-2xl font-semibold text-teal-600">Information We Collect</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            We collect personal information such as your name, email address,
            phone number, and service-related details when you register, book a
            service, or contact us. This information helps us provide better and
            more reliable services.
          </p>
        </section>

        {/* Section */}
        <section className="bg-white p-8 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="text-teal-500" />
            <h2 className="text-2xl font-semibold text-teal-600">How We Use Your Information</h2>
          </div>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>To process service bookings and payments</li>
            <li>To communicate updates and service confirmations</li>
            <li>To improve website functionality and user experience</li>
            <li>To provide customer support</li>
          </ul>
        </section>

        {/* Section */}
        <section className="bg-white p-8 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="text-teal-500" />
            <h2 className="text-2xl font-semibold text-teal-600">Data Protection & Security</h2>
          </div>
          <p className="text-gray-600 leading-relaxed">
            We implement industry-standard security measures to protect your
            personal data from unauthorized access, misuse, or disclosure.
            However, no method of transmission over the internet is 100% secure.
          </p>
        </section>

        {/* Section */}
        <section className="bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-teal-600">
            Sharing of Information
          </h2>
          <p className="text-gray-600 leading-relaxed">
            We do not sell or rent your personal information. Your data may only
            be shared with trusted service providers when necessary to fulfill
            a service request or comply with legal obligations.
          </p>
        </section>

        {/* Section */}
        <section className="bg-white p-8 rounded-2xl shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-teal-600">
            Your Rights & Choices
          </h2>
          <p className="text-gray-600 leading-relaxed">
            You have the right to access, update, or delete your personal
            information. You may also opt out of promotional communications at
            any time.
          </p>
        </section>

        {/* Contact */}
        <section className="bg-gradient-to-r from-teal-500 to-blue-700 text-white p-10 rounded-2xl text-center">
          <Mail className="mx-auto mb-4" size={32} />
          <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
          <p className="text-gray-200 mb-4">
            If you have any questions about this Privacy Policy, feel free to
            reach out.
          </p>
          <p className="font-medium">info@homehero.com</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
