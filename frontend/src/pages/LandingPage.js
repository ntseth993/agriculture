import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLeaf, FaCamera, FaMapMarkerAlt, FaBell, FaLock, FaMobileAlt, FaStar, FaQuoteLeft, FaArrowRight, FaTractor, FaShieldAlt, FaHeadset } from 'react-icons/fa';

export const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FaCamera className="text-5xl text-green-500" />,
      title: 'AI-Powered Detection',
      description: 'Real-time crop disease detection using advanced AI technology and camera',
    },
    {
      icon: <FaMapMarkerAlt className="text-5xl text-blue-500" />,
      title: 'Location Tracking',
      description: 'Track your farms with GPS and get location-specific recommendations',
    },
    {
      icon: <FaBell className="text-5xl text-yellow-500" />,
      title: 'Smart Alerts',
      description: 'Get instant alerts about crop diseases and treatment recommendations',
    },
    {
      icon: <FaTractor className="text-5xl text-orange-500" />,
      title: 'Farm Management',
      description: 'Manage multiple crops and farms from one easy-to-use dashboard',
    },
    {
      icon: <FaShieldAlt className="text-5xl text-purple-500" />,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with encrypted data and secure authentication',
    },
    {
      icon: <FaHeadset className="text-5xl text-red-500" />,
      title: '24/7 Support',
      description: 'Connect with agro vets, pharmacies, and experts for professional advice',
    },
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Farmer, Maharashtra',
      text: 'CropHealth helped me identify a disease early and save my entire wheat crop. Game changer!',
      rating: 5,
      image: '/image/farmer1.jpg',
    },
    {
      name: 'Priya Singh',
      role: 'Agro Vet, Punjab',
      text: 'The platform makes it easy to connect with farmers and provide timely advice. Highly recommended.',
      rating: 5,
      image: '/image/farmer2.jpg',
    },
    {
      name: 'Arjun Patel',
      role: 'Farmer, Gujarat',
      text: 'Increased my yield by 30% using CropHealth insights. Best investment for my farm.',
      rating: 5,
      image: '/image/farmer3.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-lg border-b-4 border-green-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer hover:scale-105 transition">
            <FaLeaf className="text-4xl text-green-500 animate-pulse" />
            <span className="text-3xl font-bold bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">CropHealth</span>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2 text-gray-700 font-semibold hover:text-green-500 hover:bg-green-50 rounded-lg transition duration-300"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/register')}
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition transform"
            >
              Sign Up Free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-white to-blue-50 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Protect Your <span className="bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">Crops with</span> Smart Technology
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed font-medium">
              Detect crop diseases early, get expert recommendations instantly, and connect with local agro vets and pharmacies. All in one powerful platform designed for modern farming.
            </p>
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => navigate('/register')}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-bold text-lg hover:shadow-2xl hover:scale-105 transition transform flex items-center gap-2"
              >
                Get Started Free <FaArrowRight />
              </button>
              <button
                onClick={() => navigate('/login')}
                className="px-8 py-4 border-3 border-green-500 text-green-600 rounded-lg font-bold text-lg hover:bg-green-50 hover:shadow-lg transition"
              >
                Watch Demo
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-6">✓ Free for first 100 users • ✓ No credit card required • ✓ Works on any device</p>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-green-400 via-green-300 to-blue-500 rounded-3xl p-1 shadow-2xl hover:shadow-3xl transition">
              <div className="bg-white rounded-3xl p-8 h-96 flex flex-col items-center justify-center">
                <FaCamera className="text-8xl text-green-500 mb-4 animate-bounce" />
                <p className="text-2xl font-bold text-gray-800 text-center">Snap & Analyze</p>
                <p className="text-lg text-gray-600 text-center mt-2">Get disease detection in seconds</p>
              </div>
            </div>
            <img 
              src="/image/agripreneur.jpg" 
              alt="Farmer" 
              className="absolute -bottom-10 -right-10 w-40 h-40 rounded-2xl shadow-xl border-4 border-white object-cover hidden md:block"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Powerful Features for <span className="bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">Modern Farming</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage crop health efficiently and maximize your yield
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl border-2 border-gray-200 hover:border-green-400 hover:shadow-2xl transition duration-300 hover:bg-gradient-to-br hover:from-green-50 hover:to-blue-50 group"
              >
                <div className="mb-6 group-hover:scale-110 transition transform">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Simple Steps to <span className="text-green-500">Healthier Crops</span>
            </h2>
            <p className="text-xl text-gray-600">Get started in minutes, not days</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: '1', title: 'Register', desc: 'Create account in 2 minutes', icon: '📝' },
              { num: '2', title: 'Add Farm', desc: 'Mark location on map', icon: '📍' },
              { num: '3', title: 'Take Photo', desc: 'Snap your crop picture', icon: '📸' },
              { num: '4', title: 'Get Help', desc: 'Receive expert advice', icon: '💡' },
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition text-center h-full border-t-4 border-green-500">
                  <div className="text-5xl mb-4">{step.icon}</div>
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-full font-bold mb-4 text-xl">
                    {step.num}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-1 bg-gradient-to-r from-green-400 to-blue-500"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-500 via-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { num: '10K+', label: 'Active Farmers', suffix: '👨‍🌾' },
              { num: '95%', label: 'Detection Accuracy', suffix: '✓' },
              { num: '50+', label: 'Crops Supported', suffix: '🌾' },
              { num: '24/7', label: 'Expert Support', suffix: '🎯' },
            ].map((stat, index) => (
              <div key={index} className="hover:scale-110 transition transform">
                <div className="text-6xl font-bold mb-2">{stat.num}</div>
                <p className="text-lg mb-2">{stat.label}</p>
                <p className="text-4xl">{stat.suffix}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Trusted by <span className="text-green-500">Thousands of Farmers</span>
            </h2>
            <p className="text-xl text-gray-600">See what our users are saying</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition border-l-4 border-green-500">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-lg" />
                  ))}
                </div>
                <FaQuoteLeft className="text-4xl text-green-200 mb-4" />
                <p className="text-gray-700 text-lg mb-6 leading-relaxed italic">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-green-500"
                  />
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-green-600 font-medium text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              Simple, Transparent <span className="text-green-500">Pricing</span>
            </h2>
            <p className="text-xl text-gray-600">Start free, upgrade when you're ready</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Starter', price: 'Free', features: ['Up to 5 farms', 'Basic detection', 'Email support', 'Mobile app'] },
              { name: 'Professional', price: '$99', period: '/month', features: ['Unlimited farms', 'AI detection', 'Priority support', 'Advanced analytics', 'Expert consultation'], highlight: true },
              { name: 'Enterprise', price: 'Custom', features: ['All features', 'Dedicated support', 'Custom integrations', 'Training included'] },
            ].map((plan, index) => (
              <div key={index} className={`p-8 rounded-2xl transition transform hover:scale-105 ${
                plan.highlight 
                  ? 'bg-gradient-to-br from-green-500 to-blue-600 text-white shadow-2xl md:scale-105' 
                  : 'bg-white border-2 border-gray-200 shadow-lg'
              }`}>
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-lg opacity-80">{plan.period}</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-2xl">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-lg font-bold text-lg transition ${
                  plan.highlight 
                    ? 'bg-white text-green-600 hover:bg-gray-100' 
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-500 to-blue-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-5xl font-bold mb-6">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-xl mb-10 opacity-90">
            Join thousands of farmers using CropHealth to grow better crops and increase yields
          </p>
          <button
            onClick={() => navigate('/register')}
            className="px-10 py-4 bg-white text-green-600 text-lg rounded-lg font-bold hover:bg-gray-100 hover:scale-110 transition transform shadow-xl"
          >
            Start Your Free Account Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <FaLeaf className="text-3xl text-green-400" />
                <span className="text-2xl font-bold">CropHealth</span>
              </div>
              <p className="text-gray-400 leading-relaxed">Smart farming for the modern world</p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4 text-green-400">Product</h4>
              <ul className="text-gray-400 space-y-2">
                <li><button onClick={() => {}} className="hover:text-green-400 transition">Features</button></li>
                <li><button onClick={() => {}} className="hover:text-green-400 transition">Pricing</button></li>
                <li><button onClick={() => {}} className="hover:text-green-400 transition">Security</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4 text-green-400">Company</h4>
              <ul className="text-gray-400 space-y-2">
                <li><button onClick={() => {}} className="hover:text-green-400 transition">About</button></li>
                <li><button onClick={() => {}} className="hover:text-green-400 transition">Contact</button></li>
                <li><button onClick={() => {}} className="hover:text-green-400 transition">Blog</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4 text-green-400">Legal</h4>
              <ul className="text-gray-400 space-y-2">
                <li><button onClick={() => {}} className="hover:text-green-400 transition">Privacy</button></li>
                <li><button onClick={() => {}} className="hover:text-green-400 transition">Terms</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2026 CropHealth. All rights reserved. | Empowering Farmers with Technology</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
