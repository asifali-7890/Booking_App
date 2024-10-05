import { useFetch } from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties =  () => {
  const { data, loading, error } = useFetch('hotels?featured=true');

  return loading ? 'Loading please wait...' : (
    <div className=" fp">
      {data?.data.map((hotel, id) => (
        <div className=" fpItem" key={id}>
          <img
            src={hotel.photos[0]}
            alt=""
            className="fpImg"
          />
          <span className="fpName block font-semibold m-2 w-full">{hotel.name}</span>
          <span className="fpCity block text-gray-500">{hotel.city}</span>
          <span className="fpPrice block font-bold m-1">Starting from $120</span>
          <div className="fpRating flex items-center m-2">
            <button className="bg-yellow-500 text-white rounded-full px-2">{hotel.rating}</button>
            <span className="m-2 text-green-500">Excellent</span>
          </div>
        </div>
      ))}
    </div>

  );
};

export default FeaturedProperties;
