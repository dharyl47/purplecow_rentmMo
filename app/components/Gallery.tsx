import { useState } from "react";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(
    "/assets/images/testImages/testCover.jpg"
  );

  const handleThumbnailClick = (imageUrl: any) => {
    setSelectedImage(imageUrl);
  };

  const galleryData = [
    {
      id: 1,
      imageUrl: "/assets/images/testImages/testCover.jpg",
      thumbnailUrl: "/assets/images/testImages/testCover.jpg",
      title: "Image 1",
    },
    {
      id: 2,
      imageUrl: "/assets/images/testImages/testCover.jpg",
      thumbnailUrl: "/assets/images/testImages/testCover.jpg",
      title: "Image 2",
    },
    {
      id: 3,
      imageUrl: "/assets/images/testImages/testCover.jpg",
      thumbnailUrl: "/assets/images/testImages/testCover.jpg",
      title: "Image 2",
    },
    {
      id: 4,
      imageUrl: "/assets/images/testImages/testCover.jpg",
      thumbnailUrl: "/assets/images/testImages/testCover.jpg",
      title: "Image 2",
    },
    {
      id: 5,
      imageUrl: "/assets/images/testImages/testCover.jpg",
      thumbnailUrl: "/assets/images/testImages/testCover.jpg",
      title: "Image 2",
    },
    // Add more items as needed
  ];

  return (
    <div className="p-5">
      <p className="text-xs text-gray-500 ml-2 mb-4">
        <strong>Gallery</strong>
      </p>
      {/* Main Big Image */}
      <img src={selectedImage} alt="Main Image" className="w-full h-auto" />

      {/* Small Thumbnails */}
      <div className="flex mt-5 pr-4">
        {galleryData.map((item) => (
          <img
            key={item.id}
            src={item.thumbnailUrl}
            alt={item.title}
            className="w-1/5 cursor-pointer mr-1"
            onClick={() => handleThumbnailClick(item.imageUrl)}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
