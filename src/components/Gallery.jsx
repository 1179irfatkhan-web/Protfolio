import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import { galleryItems } from '../data';

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = [
    { id: 'all', label: 'All Photos', count: galleryItems.length },
    { id: 'project', label: 'Projects', count: galleryItems.filter(item => item.category === 'project').length },
    { id: 'judo', label: 'Judo Achievements', count: galleryItems.filter(item => item.category === 'judo').length },
    { id: 'selfdefense', label: 'Self-Defense', count: galleryItems.filter(item => item.category === 'selfdefense').length },
    { id: 'personal', label: 'Personal', count: galleryItems.filter(item => item.category === 'personal').length }
  ];

  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  const openModal = (index) => {
    setSelectedImage(filteredItems[index]);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const navigate = (direction) => {
    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = filteredItems.length - 1;
    if (newIndex >= filteredItems.length) newIndex = 0;
    setCurrentIndex(newIndex);
    setSelectedImage(filteredItems[newIndex]);
  };

  return (
    <>
      <section className="section" id="gallery">
        <div className="container">
          <div className="section-title">
            <h2>Achievements Gallery</h2>
            <p>Showcasing my projects, achievements, and journey</p>
          </div>

          <div className="gallery-categories">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-btn ${activeFilter === category.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(category.id)}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>

          <div className="gallery-grid">
            {filteredItems.map((item, index) => (
              <div 
                key={item.id}
                className="gallery-item fade-in"
                onClick={() => openModal(index)}
              >
                <div className="gallery-count">{item.count}</div>
                <img src={item.image} alt={item.title} />
                <div className="gallery-overlay">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <div className={`modal-overlay ${selectedImage ? 'active' : ''}`} onClick={closeModal}>
        {selectedImage && (
          <>
            <button className="close-modal" onClick={closeModal}>
              <FiX />
            </button>
            
            <div className="modal-nav">
              <button className="modal-nav-btn prev-btn" onClick={(e) => { e.stopPropagation(); navigate(-1); }}>
                <FiChevronLeft />
              </button>
              <button className="modal-nav-btn next-btn" onClick={(e) => { e.stopPropagation(); navigate(1); }}>
                <FiChevronRight />
              </button>
            </div>

            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <img 
                src={selectedImage.image} 
                alt={selectedImage.title}
                className="modal-img"
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Gallery;