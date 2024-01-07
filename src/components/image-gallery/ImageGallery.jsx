import React, { Component } from 'react';
import { animateScroll } from 'react-scroll';
import ImageGalleryItem from 'components/image-gallery-item/ImageGalleryItem';
import css from 'components/image-gallery/image-gallery.module.css';

class ImageGallery extends Component {
  state = {};
  componentDidUpdate(prevProps, prevState) {
    if (this.props.images !== prevProps.images) {
      const scrollOptions = {
        duration: 500,
        smooth: true,
      };
      animateScroll.scrollToBottom(scrollOptions);
    }
  }

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
