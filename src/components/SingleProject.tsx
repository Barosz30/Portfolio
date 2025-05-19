import { useTranslation } from "react-i18next";
import "./SingleProject.css";

type LinkType = { type: "url"; value: string } | { type: "qr"; value: string };

type PhotosProps = {
  photos: string[];
  description: string;
  callToAction: string;
  linkToProject: LinkType;
  orientation?: "horizontal" | "vertical";
};

const SingleProject = ({
  photos,
  description,
  callToAction,
  linkToProject,
  orientation = "horizontal",
}: PhotosProps) => {
  const firstRow = photos.slice(0, 2);
  const secondRow = photos.slice(2, 4);
  const { t } = useTranslation();

  return (
    <div className="project-container">
      <div className="photos-container">
        <div
          className={
            orientation === "vertical" ? "photos-row-vertical" : "photos-row"
          }
        >
          {firstRow.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Project photo ${index + 1}`}
              className={`photo ${
                orientation === "vertical"
                  ? "photo-vertical"
                  : "photo-horizontal"
              }`}
            />
          ))}
        </div>
        <div
          className={
            orientation === "vertical" ? "photos-row-vertical" : "photos-row"
          }
        >
          {secondRow.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Project photo ${index + 1}`}
              className={`photo ${
                orientation === "vertical"
                  ? "photo-vertical"
                  : "photo-horizontal"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="text-container">
        <div className="description">{description}</div>
        {linkToProject.type === "url" ? (
          <a
            href={linkToProject.value}
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            {t("check_it_out")}
          </a>
        ) : (
          <img src={linkToProject.value} alt="QR Code" className="qr-code" />
        )}
        <div className="description">{callToAction}</div>
      </div>
    </div>
  );
};

export default SingleProject;
