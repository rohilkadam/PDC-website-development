import React, { useState, useEffect } from "react";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import axios from 'axios';

export default function Gallery1() {
  const [index, setIndex] = useState(-1);
  const [activeTab, setActiveTab] = useState('all');
  const [activeYear, setActiveYear] = useState(null);
  const [galleryData, setGalleryData] = useState([]);

  async function fetchServices() {
    try {
      const res = await axios.get(`https://pdc-backend-mg9n.onrender.com/api/gallery/fetchallimages`);
      setGalleryData(res.data); // Set galleryData to the data contained in the response
    } catch (error) {
      console.error("Error fetching gallery data:", error);
    }
  }

  useEffect(() => {
    fetchServices(); // Fetch gallery data when component mounts
  }, []);

  const filterPhotosByCategoryAndYear = (photos, category, year) => {
    if (category === 'all') return photos; // Return all photos if category is 'all'
    if (category === 'camps' && year) {
      // Filter photos by category and year for 'camps'
      return photos.filter(photo => photo.category.toLowerCase() === category && photo.year === year);
    }
    // Filter photos by category only
    return photos.filter(photo => photo.category.toLowerCase() === category);
  };

  const photos = galleryData.map(item => ({
    src: item.image,
    width: 820, // Width value can be adjusted based on requirements
    height: 613, // Height value can be adjusted based on requirements
    category: item.category,
    year: item.year // Add year to photo object
  }));

  const filteredPhotos = filterPhotosByCategoryAndYear(photos, activeTab, activeYear);

  const getCampsYears = () => {
    const campPhotos = photos.filter(photo => photo.category.toLowerCase() === 'camps');
    console.log(campPhotos);
    const years = [...new Set(campPhotos.map(photo => photo.year))];
    
    return years.sort((a, b) => b - a); // Sorting years in descending order
  };

  return (
    <div className="container mx-auto body">
      {/* Tab navigation */}
      <div className="flex justify-center my-5 tabpane">
        <button className={`px-4 py-2 mr-4 rounded-lg focus:outline-none ${activeTab === 'all' ? 'bg-red-500 text-red' : ' text-red-700'}`} onClick={() => { setActiveTab('all'); setActiveYear(null); }}>All</button>
        <button className={`px-4 py-2 mr-4 rounded-lg focus:outline-none ${activeTab === 'services' ? 'bg-red-500 text-red' : 'bg-gray-200 text-red-700'}`} onClick={() => { setActiveTab('services'); setActiveYear(null); }}>Services</button>
        <button className={`px-4 py-2 mr-4 rounded-lg focus:outline-none ${activeTab === 'hospital' ? 'bg-red-500 text-red' : 'bg-gray-200 text-red-700'}`} onClick={() => { setActiveTab('hospital'); setActiveYear(null); }}>Hospital</button>
       
          <button className={`px-4 py-2 rounded-lg focus:outline-none ${activeTab === 'camps' ? 'bg-red-500 text-red' : 'bg-gray-200 text-red-700'}`} onClick={() => { setActiveTab('camps'); setActiveYear(null); }}>Camps</button>
          {activeTab === 'camps' && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg">
              <div className="py-1">
                {getCampsYears().map(year => (
                  <button
                    key={year}
                    className={`block w-full text-left px-4 py-2 text-sm leading-5 hover:bg-gray-100 focus:outline-none ${activeYear === year ? 'text-red-500' : 'text-gray-900'}`}
                    onClick={() => setActiveYear(year)}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      

      {/* Photo gallery */}
      <PhotoAlbum photos={filteredPhotos} layout="masonry" onClick={({ index }) => setIndex(index)} />

      {/* Lightbox */}
      <Lightbox
        slides={filteredPhotos}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
      />
    </div>
  );
}
