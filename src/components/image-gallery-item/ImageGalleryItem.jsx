import PropTypes from 'prop-types';
import css from 'components/image-gallery-item/image-gallery-item.module.css';

const ImageGalleryItem = ({ image }) => {
  return (
    <li className={css['gallery-item']}>
      <img
        className={css['gallery-image']}
        src={image.webformatURL}
        alt={image.tags}
        id={image.id}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
};

export default ImageGalleryItem;
