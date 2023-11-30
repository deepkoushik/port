import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form fields
    if (name === '' || email === '' || message === '') {
      alert('Please enter all credentials');
    } else {
      try {
        const response = await fetch('http://localhost:5238/api/Values', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name,
            email: email,
            content: message,
          }),
        });

        if (response.ok) {
          // Successful response from the API
          alert('Form submitted successfully!');
          setFormSubmitted(true); // Assuming you want to display a success message
        } else {
          // Error handling if the response is not successful
          alert('There was an issue submitting the form. Please try again.');
        }
      } catch (error) {
        // Catch and display any fetch-related errors
        alert('There was an error while processing your request.');
        console.error('Fetch Error:', error);
      }
    }
  };

  return (
    <div>
      <section className="contact section" id="contact">
        <h2 className="section-title" data-aos="fade-down">
          Contact
        </h2>

        <div className="contact_container bd_grid">
          <form id="contactForm" onSubmit={handleSubmit} className="contact_form">
            <input
              type="text"
              placeholder="Name"
              className="control_input"
              value={name}
              onChange={handleNameChange}
              data-aos="fade-right"
              data-aos-delay="250"
            />
            <input
              type="email"
              placeholder="Email"
              className="control_input"
              value={email}
              onChange={handleEmailChange}
              data-aos="fade-right"
              data-aos-delay="300"
            />
            <textarea
              name="message"
              id="message"
              cols="30"
              rows="10"
              className="control_input"
              value={message}
              onChange={handleMessageChange}
              data-aos="fade-right"
              data-aos-delay="400"
            ></textarea>
            <input
              type="submit"
              className="control_button button"
              data-aos="fade-right"
              data-aos-delay="450"
              value="Submit"
            />
          </form>
          {formSubmitted && (
            <p className="success-message">Form submitted successfully!</p>
          )}
        </div>
      </section>

      <footer className="footer">
        <p className="footer_title" data-aos="fade-down">
          Deepkoushik
        </p>
        <p data-aos="fade-down" data-aos-delay="650">
          &#169; 2023 copyright all right reserved
        </p>
      </footer>
    </div>
  );
}

export default App;
