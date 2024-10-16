import React, { useEffect, useState } from 'react';
import NewsFeed from '../components/NewsFeed';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const newsItems = [
  {
    title: "Is Watermelon Good for You?",
    description: "Explore the health benefits of watermelon.",
    image: "https://via.placeholder.com/400x200",
    link: "/news/watermelon",
    category: "Shape",
  },
  {
    title: "9 Biggest Signs of Autism",
    description: "Learn the key signs of autism in adults.",
    image: "https://via.placeholder.com/400x200",
    link: "/news/autism-signs",
    category: "HuffPost",
  },
];

const services = [
  {
    title: "Real-Time Alerts & Notifications",
    description: "Stay informed with real-time alerts for ongoing or imminent disasters in your area.",
    image: "https://via.placeholder.com/400x200",
    link: "/services/alerts",
  },
  {
    title: "Disaster Preparedness",
    description: "Request rescue assistance, track live rescue operations, and manage resources efficiently.",
    image: "https://via.placeholder.com/400x200",
    link: "/services/rescue",
  },
  {
    title: "GeoLocation",
    description: "Join our community of volunteers and contribute to disaster relief efforts.",
    image: "https://via.placeholder.com/400x200",
    link: "/services/GeoLocation",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState("");
  const fullText = "Stay safe with real-time alerts, access resources, request rescue help, and connect with your community—all in one place. GeoRescue empowers you to prepare, respond, and recover effectively from disasters.";

  // Typing effect for description
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText((prev) => prev + fullText[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleCardClick = (link) => {
    navigate(link);
  };

  return (
      <div className="home-container">
        {/* Navigation Bar */}
        <nav className="navbar">
          <div className="logo">GeoRescue</div>
          <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
          <div className="username">Username</div>
        </nav>

        {/* Description */}
        <div className="description">
          <h1>GeoRescue: Your Disaster Management Hub</h1>
          <p>{typedText}</p>
        </div>

        <div className="content-wrapper">
          {/* News Section */}
          <div className="left-column">
            <h2 className="section-title">Latest News</h2>
            <div className="news-box">
              <NewsFeed newsItems={newsItems} />
            </div>
          </div>

          {/* Services Section */}
          <div className="right-column">
            <h2 className="section-title">Our Services</h2>
            <div className="services-box">
              <div className="services-grid">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className="service-card"
                        onClick={() => handleCardClick(service.link)}
                    >
                      <img
                          src={service.image}
                          alt={service.title}
                          className="service-image"
                      />
                      <h3 className="service-title">{service.title}</h3>
                      <p className="service-description">{service.description}</p>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer>
          <p>&copy; 2024 GeoRescue. All rights reserved.</p>
        </footer>
      </div>
  );
};

export default Home;
