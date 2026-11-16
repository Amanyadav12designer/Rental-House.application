import "./AboutUs.css";
import { Link } from "react-router-dom";
import { MdHome, MdSearch, MdChat, MdVerifiedUser, MdPeople } from "react-icons/md";

export default function AboutUs() {
  return (
    <div className="about-page">
      {/* ---------- Intro: photo + short story ---------- */}
      <section className="about-intro">
        <img
          className="about-photo"
          src="https://i.postimg.cc/C1z7bhRH/Screenshot-2026-11-14-144923.png"          /* put your photo in public/images */
          alt="Founder of Hidden Homesti"
        />

        <div className="about-intro-text">
          <p className="about-eyebrow">About us</p>
          <h1>Finding a rental home should be simple.</h1>
          <p>
            [Write 3-4 lines about yourself: who you are, why you built this
            site, and what problem you wanted to solve for tenants and landlords.]
          </p>
        </div>
      </section>

      {/* ---------- What we do ---------- */}
      <section className="about-section">
        <h2>What we do</h2>
        <div className="about-cards">
          <div className="about-card">
            <MdVerifiedUser className="about-card-icon" />
            <h3>Real listings</h3>
            <p>[One line: listings are posted directly by landlords.]</p>
          </div>
          <div className="about-card">
            <MdPeople className="about-card-icon" />
            <h3>Direct contact</h3>
            <p>[One line: tenants talk to landlords without middlemen.]</p>
          </div>
          <div className="about-card">
            <MdSearch className="about-card-icon" />
            <h3>Easy search</h3>
            <p>[One line: filter by city, rent and property type.]</p>
          </div>
        </div>
      </section>

      {/* ---------- How it works ---------- */}
      <section className="about-section">
        <h2>How it works</h2>
        <div className="about-steps">
          <div className="about-step">
            <span className="about-step-number">1</span>
            <MdHome className="about-step-icon" />
            <h3>Landlord lists</h3>
            <p>[The landlord adds a property with photos, rent and contact number.]</p>
          </div>
          <div className="about-step">
            <span className="about-step-number">2</span>
            <MdSearch className="about-step-icon" />
            <h3>Tenant searches</h3>
            <p>[The tenant browses, filters and saves favourites.]</p>
          </div>
          <div className="about-step">
            <span className="about-step-number">3</span>
            <MdChat className="about-step-icon" />
            <h3>They connect</h3>
            <p>[They contact each other directly and finalise the details.]</p>
          </div>
        </div>
      </section>

      {/* ---------- Call to action ---------- */}
      <section className="about-cta">
        <h2>Ready to get started?</h2>
        <div className="about-cta-buttons">
          <Link to="/listing" className="about-btn about-btn-primary">List a property</Link>
          <Link to="/home" className="about-btn about-btn-light">Browse homes</Link>
        </div>
      </section>
    </div>
  );
}