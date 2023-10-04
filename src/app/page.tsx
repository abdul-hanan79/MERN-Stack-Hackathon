import Benefits from '@/components/Benefits';
import Spinner from '@/components/ui/Spinner';
import Image from 'next/image'

export default function Home() {
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-500 py-32 px-8 text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Fashion E-commerce</h1>
        <p className="text-xl mb-8">Shop the latest trends in fashion</p>
        <a
          href="#"
          className="bg-white text-indigo-500 hover:text-indigo-600 font-semibold py-2 px-4 rounded"
        >
          Shop Now
        </a>
      </div>

      {/* Benefits Section */}
      <div className="py-16 px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Benefits title="Product Quality" description="We offer a wide range of high-quality fashion products from top brands." />
          <Benefits title="Shipping Quality" description="We offer a wide range of high-quality fashion products from top brands." />
        </div>

        {/* Featured Products Section */}
        <div className="py-16 px-8">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Featured Product 1 */}
            <div className="bg-white p-6 shadow-md rounded-lg">
              <img
                src="https://via.placeholder.com/200"
                alt="Product 1"
                className="w-full h-40 mb-4 object-cover"
              />
              <div className="text-xl font-semibold mb-2">Product 1</div>
              <div className="text-gray-600">$49.99</div>
            </div>

            {/* Featured Product 2 */}
            <div className="bg-white p-6 shadow-md rounded-lg">
              <img
                src="https://via.placeholder.com/200"
                alt="Product 2"
                className="w-full h-40 mb-4 object-cover"
              />
              <div className="text-xl font-semibold mb-2">Product 2</div>
              <div className="text-gray-600">$39.99</div>
            </div>

            {/* Featured Product 3 */}
            <div className="bg-white p-6 shadow-md rounded-lg">
              <img
                src="https://via.placeholder.com/200"
                alt="Product 3"
                className="w-full h-40 mb-4 object-cover"
              />
              <div className="text-xl font-semibold mb-2">Product 3</div>
              <div className="text-gray-600">$59.99</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


