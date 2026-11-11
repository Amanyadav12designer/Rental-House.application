
import AddPropertyForm from "../AddPropertyForm";
import { Link } from "react-router-dom";
import PropertyList from "../PropertyList";

function ListingPage({
  properties,
  onAdd,
  onFavorite,
  onDelete,
  isLandlord,
  onToggle,
  message,
  visibleCount,
  filter,
  filteredProperties,
  search,
  minRent,
  maxRent,
  searchLocation,
  setSearch,
  setMinRent,
  setMaxRent,
  setSearchLocation,
  successFeedback,
  deletedMessage,
 
  loading
}) {
  return (
    <div className="listing-page-container">

      <h1 style={{ textAlign: "center" }}>
        Property Listings
      </h1>

      <div className="link-card">
        <Link
          style={{ textDecoration: "none", padding: "10px" }}
          to="/home"
        >
          Back to home
        </Link>
      </div>

      <div style={{ margin: "13px" }}></div>

      {successFeedback && (
        <div className="success-message">
          {successFeedback}
        </div>
      )}

      {deletedMessage && (
        <div className="deleted-message">
          {deletedMessage}
        </div>
      )}

      {loading && <div className="loading-spinner"></div>}

       <AddPropertyForm onAdd={onAdd} />

      {!loading && properties.length === 0 && (
        <p>No properties available yet.</p>
      )}

      <PropertyList
        properties={properties}
        onFavorite={onFavorite}
        onDelete={onDelete}
        isLandlord={isLandlord}
        onToggle={onToggle}
        message={message}
        filteredProperties={filteredProperties}
        filter={filter}
        visibleCount={visibleCount}
        search={search}
        minRent={minRent}
        maxRent={maxRent}
        searchLocation={searchLocation}
        setSearchLocation={setSearchLocation}
        setMinRent={setMinRent}
        setMaxRent={setMaxRent}
        setSearch={setSearch}
      />

    </div>
  );
}

export default ListingPage;
