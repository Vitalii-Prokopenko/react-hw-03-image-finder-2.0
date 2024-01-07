import React, { Component } from 'react';
import SearchBar from 'components/searchbar/SearchBar';
import ImageGallery from 'components/image-gallery/ImageGallery';
import Button from 'components/button/Button';
import Loader from 'components/loader/Loader';
import Modal from 'components/modal/Modal';
import api from '../services/api';
import { nanoid } from 'nanoid';
import { animateScroll } from 'react-scroll';

const IMAGES_PER_PAGE = 12;

class App extends Component {
  state = {
    tag: '',
    images: [],
    pages: 0,
    currentPage: 1,
    showModal: false,
    loading: false,
    clickedImage: {},
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      this.state.tag !== prevState.tag ||
      this.state.currentPage !== prevState.currentPage
    ) {
      this.setState({
        loading: true,
      });

      if (this.state.tag !== prevState.tag) {
        this.setState({
          currentPage: 1,
          images: [],
        });
      }

      const fetchedImages = await api
        .fetchImages(this.state.tag, this.state.currentPage)
        .then(data => {
          if (this.state.tag !== prevState.tag) {
            const totalPages = Math.ceil(data.totalHits / IMAGES_PER_PAGE);
            this.setState({
              pages: totalPages,
            });
          }
          return data.hits;
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.setState({
            loading: false,
          });
        });

      const fetchedImagesWithId = this.changeImageId(fetchedImages);
      
      this.setState(prevState => ({
        images: [...prevState.images, ...fetchedImagesWithId],
      }));  
      
      
    }

    if (this.state.images !== prevState.images) {
      const scrollOptions = {
        duration: 500,
        smooth: true,
      };
      animateScroll.scrollToBottom(scrollOptions);
    }
  }

  tagSubmitHandler = data => {
    const { tag } = data;
    this.setState({
      tag: tag,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  toggleModal = ({ showModal } = this.state) => {
    this.setState({
      showModal: !showModal,
    });
  };

  handleClickOnImage = event => {
    const targetId = event.target.id;
    const { images } = this.state;
    const clickedImage = images.find(image => image.id === targetId);
    this.setState({
      clickedImage: clickedImage,
    });
    this.toggleModal();
  };  

  changeImageId = fetchedImages => {
    const fetchedImagesWithId = [];
    fetchedImages.forEach(fetchedImage => {
      fetchedImage.id = nanoid();
      fetchedImagesWithId.push(fetchedImage);
    });
    return fetchedImagesWithId;
  };

  render() {
    const { images, pages, currentPage, showModal, loading, clickedImage } =
      this.state;

    return (
      <>
        <SearchBar onSubmit={this.tagSubmitHandler} />
        <ImageGallery images={images} onClickImage={this.handleClickOnImage} />
        {showModal && (
          <Modal onClose={this.toggleModal} clickedImage={clickedImage} />
        )}
        {currentPage < pages && <Button handleLoadMore={this.handleLoadMore} />}
        {loading && <Loader />}
      </>
    );
  }
}

export default App;
