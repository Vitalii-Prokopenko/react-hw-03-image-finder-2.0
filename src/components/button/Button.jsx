import PropTypes from 'prop-types';
import css from 'components/button/button.module.css';

const Button = ({ handleLoadMore }) => {
  return (
    <button
      type="button"
      className={css['load-more-btn']}      
      onClick={() => handleLoadMore()}
    >
      Load more
    </button>
  );
};

Button.propTypes = {
  handleLoadMore: PropTypes.func.isRequired,
};

export default Button;
