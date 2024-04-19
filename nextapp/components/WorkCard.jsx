import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const WorkCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % work.workPhotoPaths.length
    );
  };

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + work.workPhotoPaths.length) %
        work.workPhotoPaths.length
    );
  };

  const router = useRouter();

  return (
    <div className="work-card" onClick={() => {router.push(`/work-details?id=${work._id}`)}}>
      <div className="slider-container">
        <div className="slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {Work.workPhotoPaths?.map((photo, index) => (
            <div className="slide" key={index}>
              <img src={photo} alt="work" />
              <div className="prev-button" onClick={(e) => goToPrevSlide(e)}>
                <ArrowBackIosNew sx={{ fontSize: "15px" }} />
              </div>
              <div className="next-button" onClick={(e) => goToNextSlide(e)}>
                <ArrowForwardIos sx={{ fontSize: "15px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="info">
        <div>
          <h3>{work.title}</h3>
          <div className="creator">
            <img src={work.creator.profileImagePath} alt="creator" />
            <span>{work.creator.usrename}</span> in <span>{work.category}</span>
          </div>
        </div>
        <div className="price">${work.price}</div>
      </div>
    </div>
  );
};

export default WorkCard;
