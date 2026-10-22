
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <span className="eyebrow">
              Find a place to call home
            </span>

            <h1>Discover a Better Way to Live.</h1>

            <p>
              Explore exceptional homes, premium residences,
              and investment opportunities curated around you.
            </p>

            <div className="hero-actions">
              <Link className="btn-primary" to="/properties">
                Explore Properties ↗
              </Link>

              <Link className="btn-secondary" to="/about">
                Discover Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section container">
        <div className="section-heading">
          <span className="eyebrow">Why EstateLuxe</span>
          <h2 className="page-title">More Than Just a Property</h2>
          <p>
            Find the right space with a team focused on quality,
            thoughtful service, and your long-term goals.
          </p>
        </div>

        <div className="features-grid">
          <article className="feature-card">
            <div className="feature-icon">⌂</div>
            <h3>Curated Properties</h3>
            <p>Explore homes selected for comfort, design, and location.</p>
          </article>

          <article className="feature-card">
            <div className="feature-icon">◇</div>
            <h3>Personal Guidance</h3>
            <p>Make property decisions with a clear and guided process.</p>
          </article>

          <article className="feature-card">
            <div className="feature-icon">↗</div>
            <h3>Smart Investments</h3>
            <p>Compare opportunities that fit your needs and ambitions.</p>
          </article>
        </div>
      </section>

      <section className="page-section" style={{ background: '#f6f7f8' }}>
        <div className="container text-center">
          <span className="eyebrow">Your next chapter</span>
          <h2 className="page-title">Ready to Find Your Place?</h2>
          <p className="muted">
            Browse available properties or talk to our team.
          </p>
          <Link className="btn-primary" to="/properties">
            Browse Properties ↗
          </Link>
        </div>
      </section>
    </>
  );
}
