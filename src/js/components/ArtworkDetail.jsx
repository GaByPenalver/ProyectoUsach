import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ArtworkDetail = () => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);

  useEffect(() => {
    fetch(`https://api.artic.edu/api/v1/artworks/${id}`)
      .then((response) => response.json())
      .then((data) => setArtwork(data.data))
      .catch((error) => console.error("Error fetching artwork details:", error));
  }, [id]);

  if (!artwork) return <div>Loading...</div>;

  const imageUrl = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`;

  return (
    <div className="artwork-detail">
      <h1>{artwork.title}</h1>
      <img src={imageUrl} alt={artwork.title} />
      <p><strong>Artista:</strong> {artwork.artist_title}</p>
      <p><strong>Año:</strong> {artwork.date_display}</p>
      <p><strong>Medio:</strong> {artwork.medium_display}</p>
      <p><strong>Descripción:</strong> {artwork.description ? artwork.description : "La obra no posee una descripción"}</p>
      <Link to={"/"} className="card-button">
        <button className="back-button">Volver a la galería</button>
      </Link>
    </div>
  );
};

export default ArtworkDetail;
