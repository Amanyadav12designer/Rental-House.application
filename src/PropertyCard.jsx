
import "./PropertyCard.css";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

export default function PropertyCard({
  property = {},
  onDelete,
  onFavorite,
  message = {},
}) {
  if (!property._id) return null;

  const isVideo = property.image?.includes("video");

  return (
    <div className="listing-card">

      {isVideo ? (
        <video
          src={property.image}
          controls
          playsInline
          style={{
            width: "100%",
            height: "300px",
            
          }}
        />
      ) : (
        <img
          src={property.image}
          alt={property.title || "Property"}
          style={{
            width: "100px",
            height: "200px",
            objectFit: "cover",
          }}
        />
      )}

      <h2>{property.title}</h2>
      <p1>{property.propertyType}</p1>

      <p style={{ fontFamily: "playfair", fontSize: "18px" }}>
        Location: {property.location}
      </p>

      <p style={{ fontFamily: "playfair", fontSize: "18px" }}>
        Rent: ₹{property.rent}
      </p>

      <button
        type="button"
        onClick={() => onFavorite?.(property._id)}
        aria-label="Toggle favorite"
      >
        {property.favorite ? (
          <MdFavorite />
        ) : (
          <MdFavoriteBorder />
        )}
      </button>

      <div className="listing-card-actions">
        <button
          type="button"
          className="listing-delete-btn"
          onClick={() => onDelete?.(property._id)}
        >
          Delete
        </button>
      </div>

      {message?.id === property._id && (
        <p>{message.text}</p>
      )}

    </div>
  );
}

