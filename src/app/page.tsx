import Benefits from '@/components/Benefits';
import Spinner from '@/components/ui/Spinner';
import Image from 'next/image'
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-gray-100 -mt-4">
      {/* Hero Section */}
      <section className="bg-center bg-no-repeat bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] bg-gray-700 bg-blend-multiply">
        <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">Discover Endless Possibilities in Online Shopping</h1>
          <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">At our e-commerce store, we redefine the art of shopping. With a wide range of products to choose from, a seamless and secure checkout process, and exceptional customer service, your next great shopping experience is just a click away. </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <Link href="/products" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
              Explore
              <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </Link>
            <Link href="#" className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
              Learn more
            </Link>
          </div>
        </div>
      </section>
      {/* Benefits Section */}
      <div className="py-16 px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Benefits title="Product Quality" description="We offer a wide range of high-quality fashion products from top brands." />
          <Benefits title="Shipping Quality" description="We offer a wide range of high-quality fashion products from top brands." />
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


