import React, { useState } from "react";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import photos from "../../Data/Photos";

export default function Gallery1() {
    const [index, setIndex] = useState(-1);
    const [activeTab, setActiveTab] = useState('all');

    // Filtered photos based on active tab
    const filteredPhotos = activeTab === 'all' ? photos : photos.filter(photo => photo.category === activeTab);

    return (
        <div className="container mx-auto body">
            {/* Tab navigation */}
            <div className="flex justify-center my-5 tabpane">
                <button className={`px-4 py-2 mr-4 rounded-lg  focus:outline-none ${activeTab === 'all' ? 'bg-red-500 text-red' : ' text-red-700'}`} onClick={() => setActiveTab('all')}>All</button>
                <button className={`px-4 py-2 mr-4 rounded-lg focus:outline-none ${activeTab === 'services' ? 'bg-red-500 text-red' : 'bg-gray-200 text-red-700'}`} onClick={() => setActiveTab('services')}>Services</button>
                <button className={`px-4 py-2 mr-4 rounded-lg focus:outline-none ${activeTab === 'hospital' ? 'bg-red-500 text-red' : 'bg-gray-200 text-red-700'}`} onClick={() => setActiveTab('hospital')}>Hospital</button>
                <button className={`px-4 py-2 rounded-lg focus:outline-none ${activeTab === 'camp' ? 'bg-red-500 text-red' : 'bg-gray-200 text-red-700'}`} onClick={() => setActiveTab('camp')}>Camps</button>
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
