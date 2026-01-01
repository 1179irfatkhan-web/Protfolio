import React from 'react';
import { 
  FiCode, 
  FiLayers, 
  FiDatabase, 
  FiTool, 
  FiCheckCircle,
  FiTrendingUp 
} from 'react-icons/fi';
import { skills } from '../data';

const Skills = () => {
  const skillCategories = [
    { 
      id: 'languages', 
      icon: <FiCode />, 
      title: 'Languages', 
      items: skills.languages 
    },
    { 
      id: 'frameworks', 
      icon: <FiLayers />, 
      title: 'Frameworks', 
      items: skills.frameworks 
    },
    { 
      id: 'databases', 
      icon: <FiDatabase />, 
      title: 'Databases', 
      items: skills.databases 
    },
    { 
      id: 'tools', 
      icon: <FiTool />, 
      title: 'Tools & Technologies', 
      items: skills.tools 
    }
  ];

  const proficiency = [
    { skill: 'Node.js', level: 90 },
    { skill: 'Python', level: 85 },
    { skill: 'Django', level: 88 },
    { skill: 'React.js', level: 82 },
    { skill: 'MySQL', level: 90 },
    { skill: 'Git', level: 95 }
  ];

  return (
    <section className="section skills-section" id="skills">
      <div className="container">
        <div className="section-title">
          <h2>Technical Skills</h2>
          <p>Technologies and tools I work with</p>
        </div>

        <div className="skills-container">
          {skillCategories.map((category) => (
            <div key={category.id} className="skill-category fade-in">
              <h4>
                {category.icon}
                {category.title}
              </h4>
              <div className="skill-tags">
                {category.items.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    <FiCheckCircle />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="proficiency-section">
          <h3 className="proficiency-title">
            <FiTrendingUp />
            Proficiency Levels
          </h3>
          
          <div className="proficiency-bars">
            {proficiency.map((item, index) => (
              <div key={index} className="proficiency-item">
                <div className="proficiency-header">
                  <span className="skill-name">{item.skill}</span>
                  <span className="skill-percent">{item.level}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${item.level}%` }}
                  >
                    <div className="progress-glow"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="skills-highlight">
          <div className="highlight-card">
            <div className="highlight-icon">
              <FiCode />
            </div>
            <div className="highlight-content">
              <h4>Full Stack Expertise</h4>
              <p>End-to-end web development from backend APIs to responsive frontend interfaces</p>
            </div>
          </div>
          
          <div className="highlight-card">
            <div className="highlight-icon">
              <FiDatabase />
            </div>
            <div className="highlight-content">
              <h4>Database Management</h4>
              <p>Proficient in relational and NoSQL databases with optimization expertise</p>
            </div>
          </div>
          
          <div className="highlight-card">
            <div className="highlight-icon">
              <FiTool />
            </div>
            <div className="highlight-content">
              <h4>Modern Tooling</h4>
              <p>Experience with Docker, CI/CD, and modern development workflows</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;