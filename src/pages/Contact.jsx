
import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="page-section">
      <p className="eyebrow">LET'S TALK</p>
      <h1 className="page-title">Let's find your next home.</h1>
      <p>Tell us about the property you are looking for.</p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input placeholder="Your full name" required />
        <input type="email" placeholder="Email address" required />
        <input type="tel" placeholder="Phone number" required />
        <select defaultValue="" required>
          <option value="" disabled>Choose property type</option>
          <option>Villa</option>
          <option>Apartment</option>
          <option>Commercial</option>
          <option>Land</option>
        </select>
        <textarea placeholder="Preferred location, budget and requirements" required />
        <button className="primary-button" type="submit">Submit Enquiry ↗</button>
      </form>

      {submitted && (
        <p role="status">
          Demo submission complete. Connect a backend or form service to receive enquiries.
        </p>
      )}
    </main>
  );
}
