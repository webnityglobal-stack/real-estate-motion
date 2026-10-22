
import { Link } from "react-router-dom";

export default function About() {
  return (
    <main className="page-section">
      <p className="eyebrow">ABOUT ESTATE LUXE</p>
      <h1 className="page-title">More than real estate.<br />A place to belong.</h1>
      <p>
        We help people explore homes and property opportunities
        with a simple, transparent and personal experience.
      </p>

      <div className="about-cards">
        <article><h3>Our Mission</h3><p>Make property discovery simple and accessible.</p></article>
        <article><h3>Our Approach</h3><p>Focus on your needs, location and budget.</p></article>
        <article><h3>Our Vision</h3><p>Help everyone find a place to call home.</p></article>
      </div>

      <Link to="/properties" className="primary-button">Explore Properties ↗</Link>
    </main>
  );
}
