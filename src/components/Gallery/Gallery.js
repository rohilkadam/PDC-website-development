import React, { useState , useEffect} from "react";
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

    const [galleryData, setgalleryData] = useState([]);

    async function fetchservices() {
      try {
        const res = await axios.get(`https://pdc-backend-mg9n.onrender.com/api/gallery/fetchallimages`);
        setgalleryData(res.data); // Set galleryData to the data contained in the response
      } catch (error) {
        console.error("Error fetching gallery data:", error);
      }
    }
    
    useEffect(() => {
      fetchservices(); // No need to use async/await here
    }, []);
    
    console.log(galleryData);
    const photos = galleryData.map(item => ({
        src: item.image,
        width: 820, // Width value can be adjusted based on requirements
        height: 613, // Height value can be adjusted based on requirements
        category: item.category
      }));
    console.log(photos);

    const filteredPhotos = activeTab === 'all' ? photos : photos.filter(photo => photo.category.toLowerCase() === activeTab);


    console.log(filteredPhotos);
    return (
        <div className="container mx-auto body">
            {/* Tab navigation */}
            <div className="flex justify-center my-5 tabpane">
                <button className={`px-4 py-2 mr-4 rounded-lg  focus:outline-none ${activeTab === 'all' ? 'bg-red-500 text-red' : ' text-red-700'}`} onClick={() => setActiveTab('all')}>All</button>
                <button className={`px-4 py-2 mr-4 rounded-lg focus:outline-none ${activeTab === 'services' ? 'bg-red-500 text-red' : 'bg-gray-200 text-red-700'}`} onClick={() => setActiveTab('services')}>Services</button>
                <button className={`px-4 py-2 mr-4 rounded-lg focus:outline-none ${activeTab === 'hospital' ? 'bg-red-500 text-red' : 'bg-gray-200 text-red-700'}`} onClick={() => setActiveTab('hospital')}>Hospital</button>
                <button className={`px-4 py-2 rounded-lg focus:outline-none ${activeTab === 'camps' ? 'bg-red-500 text-red' : 'bg-gray-200 text-red-700'}`} onClick={() => setActiveTab('camps')}>Camps</button>
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