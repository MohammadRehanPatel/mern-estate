import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";

const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <div>
      {/* Top */}

      <section className="relative bg-[url(https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)]  bg-cover bg-center bg-no-repeat p-1">
        <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

        <div className="relative  max-w-screen-xl px-4 py-12 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="flex flex-col gap-6 p-24 px-3 max-w-6xl mx-auto">
            <h1 className="text-blue-900 font-semibold text-3xl lg:text-6xl">
              Find your next <span className="text-blue-700">Perfect</span>{" "}
              <br />
              place with ease
            </h1>

            <div className="text-blue-800 font-normal text-xs sm:text-sm ">
              <p>
                Search for your next home with confidence knowing that every
                property was vetted by a ForSale.com agent.
              </p>
              <p>
                Its Home estate is the best place to find your next perfect
                place to live
                <br />
                because we have the largest selection of properties for you to
                choose from.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4 text-center border-blue-500 ">
              <Link
                to={`/search`}
                className="block w-full rounded bg-white px-12 py-3 text-sm font-medium hover:shadow-md border border-gray-400  text-blue-900 shadow hover:text-blue-700 focus:outline-none focus:ring active:text-blue-500 sm:w-auto"
              >
                Let's Get Started...
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* listin result for offer  */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent offers
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?offer=true"}
              >
                Show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for rent
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=rent"}
              >
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent places for sale
              </h2>
              <Link
                className="text-sm text-blue-800 hover:underline"
                to={"/search?type=sale"}
              >
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
