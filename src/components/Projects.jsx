import React from 'react';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { projects } from '../data';

const Projects = () => {
  const projectLinks = {
    1: { 
      github: "https://github.com/1179irfatkhan-web/coach-appointment-system",
      live: "#" 
    },
    2: { 
      github: "https://github.com/1179irfatkhan-web/datasync",
      live: "#" 
    },
    3: { 
      github: "https://github.com/1179irfatkhan-web/pos-system",
      live: "#" 
    },
    4: { 
      github: "https://github.com/1179irfatkhan-web/ahmedabad-post-api",
      live: "#" 
    },
    5: { 
      github: "https://github.com/1179irfatkhan-web/market-yantra",
      live: "#" 
    }
  };

  return (
    <section className="section projects-section" id="projects">
      <div className="container">
        <div className="section-title">
          <h2>Projects</h2>
          <p>My professional and academic projects</p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card fade-in">
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-overlay">
                  <div className="project-links">
                    <a 
                      href={projectLinks[project.id]?.github || "#"} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <FiGithub />
                    </a>
                    <a 
                      href={projectLinks[project.id]?.live || "#"} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      <FiExternalLink />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                
                <div className="project-tags">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="project-stats">
                  <div className="stat">
                    <span className="stat-label">Status</span>
                    <span className="stat-value">Completed</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">Year</span>
                    <span className="stat-value">2024</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cta-section">
          <p className="cta-text">
            Interested in collaborating or seeing more projects?
          </p>
          <div className="cta-buttons">
            <a 
              href="https://github.com/1179irfatkhan-web" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn"
            >
              <FiGithub />
              View GitHub
            </a>
            <a 
              href="#contact" 
              className="btn"
            >
              Discuss Project
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;