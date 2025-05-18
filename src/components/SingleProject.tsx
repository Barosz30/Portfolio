import { useTranslation } from "react-i18next";
import "./SingleProject.css";

type PhotosProps = {
  photos: string[];
  description: string;
  callToAction: string;
  linkToProject: string;
};

const SingleProject = ({
  photos,
  description,
  callToAction,
  linkToProject,
}: PhotosProps) => {
  const firstRow = photos.slice(0, 2);
  const secondRow = photos.slice(2, 4);
  const { t } = useTranslation();

  return (
    <div className="project-container">
      <div className="photos-container">
        <div className="photos-row">
          {firstRow.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Project photo ${index + 1}`}
              className="photo"
            />
          ))}
        </div>
        <div className="photos-row">
          {secondRow.map((src, index) => (
            <img
              key={index + 2}
              src={src}
              alt={`Project photo ${index + 3}`}
              className="photo"
            />
          ))}
        </div>
      </div>
      <div className="text-container">
        <div className="description">{description}</div>
        <a
          href={linkToProject}
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          {t("check_it_out")}
        </a>
        <div className="description">{callToAction}</div>
      </div>
    </div>
  );
};

export default SingleProject;
