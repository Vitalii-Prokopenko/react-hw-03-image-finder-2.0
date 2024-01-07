import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import css from 'components/modal/modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = event => {
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlayClick = event => {
    this.props.onClose();    
  };

  render() {
    const { clickedImage } = this.props;    

    return createPortal(
      <div onClick={this.handleOverlayClick} className={css['overlay']}>
        <div className={css['modal']}>
          <img className={css['modal-img']} src={clickedImage.largeImageURL} alt={clickedImage.tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
