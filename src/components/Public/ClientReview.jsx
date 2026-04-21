import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "swiper/css";
import "swiper/css/pagination";
import useInViewOnce from "../../hooks/useInViewOnce";

const reviews = [
  {
    name: "John Smith",
    location: "London, UK",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    quote:
      "TravelWorld transformed our honeymoon into a fairytale.Every detail was perfectly arranged, from the island transfers to the private dinner setup. We felt truly cherished.",
  },
  {
    name: "Jennie White",
    location: "New York, America",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    quote:
      "An incredible journey through Japan! The local connections TravelWorld made for us gave us authentic experiences no guidebook could offer. Truly exceptional service.",
  },
  {
    name: "Aiko Takahashi",
    location: "Tokyo, Japan",
    image: "https://randomuser.me/api/portraits/men/35.jpg",
    quote:
      "Our European adventure was seamlessly orchestrated across six countries. TravelWorld anticipated every need and created memories we will cherish forever.",
  },
];

const ClientReviews = () => {
  const { ref, visible } = useInViewOnce();
  return (
    <div className="py-16 text-center bg-slate-300 -mb-20">
      <h2 className="mb-2 text-3xl font-bold">Clients Reviews</h2>
      <p className="mb-10 text-gray-600">
        We have many happy customers who booked holidays with us.
      </p>

      <div
        ref={ref}
        className={`md:max-w-5xl md:mx-auto mx-10 grid md:grid-cols-3 gap-8 transition-all duration-1000
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}
      >
        {reviews.map((review, index) => (
          <div
            key={index}
            className="p-6 text-center bg-white/30 rounded-xl shadow-xl transition-all duration-500 transform hover:-translate-y-5 hover:shadow-xl"
          >
            <img
              src={review.image}
              alt={review.name}
              className="object-cover w-20 h-20 mx-auto mb-4 rounded-full"
            />
            <p className="mb-2 text-lg text-yellow-500">
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </p>
            <p className="mb-4 text-sm text-gray-600 text-justify">
              {review.quote}
            </p>
            <h3 className="font-semibold">{review.name}</h3>
            <p className="text-xs  text-gray-400">{review.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientReviews;
