import React from 'react';
import { FiBriefcase, FiCalendar, FiCheck } from 'react-icons/fi';
import { experience } from '../data';

const Experience = () => {
  const achievements = [
    "Successfully delivered 5+ full-stack projects on time",
    "Improved application performance by 40% through optimization",
    "Mentored 3 junior developers in best practices",
    "Implemented CI/CD pipelines reducing deployment time by 60%"
  ];

  return (
    <section className="section experience-section" id="experience">
      <div className="container">
        <div className="section-title">
          <h2>Professional Experience</h2>
          <p>My journey in software development</p>
        </div>

        <div className="timeline">
          {experience.map((exp, index) => (
            <div key={exp.id} className="timeline-item fade-in">
              <div className="timeline-header">
                <h3>{exp.title}</h3>
                <span className="timeline-date">
                  <FiCalendar />
                  {exp.period}
                </span>
              </div>
              
              <div className="company">
                <FiBriefcase />
                {exp.company}
              </div>

              <div className="responsibilities">
                <h4>Key Responsibilities:</h4>
                <ul>
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx}>
                      <FiCheck />
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="technologies-used">
                <h4>Technologies Used:</h4>
                <div className="tech-tags">
                  {index === 0 ? (
                    <>
                      <span className="tech-tag">Django</span>
                      <span className="tech-tag">Node.js</span>
                      <span className="tech-tag">Express.js</span>
                      <span className="tech-tag">MySQL</span>
                      <span className="tech-tag">JWT</span>
                      <span className="tech-tag">Git</span>
                    </>
                  ) : (
                    <>
                      <span className="tech-tag">Django Templates</span>
                      <span className="tech-tag">React.js</span>
                      <span className="tech-tag">Node.js</span>
                      <span className="tech-tag">MariaDB</span>
                      <span className="tech-tag">REST APIs</span>
                      <span className="tech-tag">GitHub</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="achievements-section">
          <div className="achievements-card">
            <h3>
              <FiCheck />
              Key Achievements
            </h3>
            <ul className="achievements-list">
              {achievements.map((achievement, index) => (
                <li key={index}>
                  <div className="achievement-badge">
                    {index + 1}
                  </div>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="experience-stats">
            <div className="stat-card">
              <div className="stat-number">1+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">5+</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100%</div>
              <div className="stat-label">Client Satisfaction</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">15+</div>
              <div className="stat-label">Technologies</div>
            </div>
          </div>
        </div>

        <div className="career-path">
          <h3>Career Path</h3>
          <div className="path-steps">
            <div className="path-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Education</h4>
                <p>BCA Degree with focus on software development</p>
              </div>
            </div>
            
            <div className="path-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Internship</h4>
                <p>Full Stack Development intern at Arham Corporation</p>
              </div>
            </div>
            
            <div className="path-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Full-time Role</h4>
                <p>Full Stack Developer at Arham Corporation</p>
              </div>
            </div>
            
            <div className="path-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>Future Goals</h4>
                <p>Senior Developer role with team leadership</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
