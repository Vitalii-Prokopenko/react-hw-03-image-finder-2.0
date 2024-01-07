import React, { Component } from 'react';
import ImageGalleryItem from 'components/image-gallery-item/ImageGalleryItem';
import css from 'components/image-gallery/image-gallery.module.css';

class ImageGallery extends Component {
  state = {};
  
  render() {
    const { images, onClickImage } = this.props;   

    return (
      <ul className={css['gallery']} onClick={onClickImage}>
        {images.map(image => {
          return <ImageGalleryItem key={image.id} image={image} />;
        })}
      </ul>
    );
  }
}

export default ImageGallery;
