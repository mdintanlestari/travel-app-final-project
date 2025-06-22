import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "swiper/css";
import "swiper/css/pagination";

const reviews = [
  {
    name: "John Smith",
    location: "London, UK",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    quote:
      "Lorem ipsum dolor sit amet, contur adip elit, sed do mod incid ut labore et dolore magna aliqua. Ut minim",
  },
  {
    name: "Jennie White",
    location: "New York, America",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    quote:
      "Lorem ipsum dolor sit amet, contur adip elit, sed do mod incid ut labore et dolore magna aliqua. Ut minim",
  },
  {
    name: "Aiko Takahashi",
    location: "Tokyo, Japan",
    image: "https://randomuser.me/api/portraits/men/35.jpg",
    quote:
      "Lorem ipsum dolor sit amet, contur adip elit, sed do mod incid ut labore et dolore magna aliqua. Ut minim",
  },
];

const ClientReviews = () => {
  return (
    <div className="py-16 text-center">
      <h2 className="mb-2 text-3xl font-bold">Clients Reviews</h2>
      <p className="mb-10 text-gray-600">
        We have many happy customers who booked holidays with us.
      </p>

      <div className="max-w-5xl mx-auto">
        <Swiper
          modules={[Pagination]}
          spaceBetween={30}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="p-6 text-center bg-white rounded shadow">
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
                </p>
                <p className="mb-4 text-sm text-gray-600">{review.quote}</p>
                <h3 className="font-semibold">{review.name}</h3>
                <p className="text-xs text-gray-400">{review.location}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ClientReviews;
