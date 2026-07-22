import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="container my-5 text-white">
      {/* Hero Header */}
      <div className="text-center mb-5">
        <h1 className="fw-bold display-4 mb-3" style={{
          background: 'linear-gradient(135deg, #6366f1, #a855f7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          About DevNote
        </h1>
        <p className="lead text-secondary mx-auto" style={{ maxWidth: '650px' }}>
          DevNote is a secure, cloud-based note-taking application designed specifically for developers and creators to organize their thoughts, code snippets, and daily tasks effortlessly.
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="row g-4 mb-5">
        <div className="col-md-4">
          <div className="card glass-card h-100 p-4 text-center">
            <div className="mb-3 fs-1 text-primary">🔒</div>
            <h4 className="text-white">Bank-Grade Security</h4>
            <p className="text-secondary mt-2">
              Your notes are protected with JWT authentication and bcrypt password hashing to ensure your privacy stay intact.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card glass-card h-100 p-4 text-center">
            <div className="mb-3 fs-1 text-primary">☁️</div>
            <h4 className="text-white">Cloud Sync</h4>
            <p className="text-secondary mt-2">
              Access your saved notes anytime, anywhere. Powered by MongoDB for high availability and lightning-fast queries.
            </p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card glass-card h-100 p-4 text-center">
            <div className="mb-3 fs-1 text-primary">🏷️</div>
            <h4 className="text-white">Smart Tagging</h4>
            <p className="text-secondary mt-2">
              Organize your notes with custom tags like Code, Personal, or Project ideas to filter and find them in seconds.
            </p>
          </div>
        </div>
      </div>

      {/* Tech Stack Used Section */}
      <div className="card glass-card p-4 mb-5">
        <h3 className="text-white text-center mb-4">Built with MERN Stack</h3>
        <div className="d-flex flex-wrap justify-content-center gap-3">
          <span className="badge bg-dark border border-secondary text-light px-3 py-2 fs-6">React.js</span>
          <span className="badge bg-dark border border-secondary text-light px-3 py-2 fs-6">Node.js</span>
          <span className="badge bg-dark border border-secondary text-light px-3 py-2 fs-6">Express.js</span>
          <span className="badge bg-dark border border-secondary text-light px-3 py-2 fs-6">MongoDB</span>
          <span className="badge bg-dark border border-secondary text-light px-3 py-2 fs-6">Bootstrap 5</span>
          <span className="badge bg-dark border border-secondary text-light px-3 py-2 fs-6">JWT Authentication</span>
        </div>
      </div>

      {/* Call To Action */}
      <div className="text-center py-4">
        <h4 className="text-white mb-3">Ready to structure your notes?</h4>
        <Link to="/" className="btn btn-gradient px-4 py-2 fs-5">Go to Notes</Link>
      </div>
    </div>
  );
};

export default About;