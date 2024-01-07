import React, { Component } from 'react';
import { TbPhotoSearch } from "react-icons/tb";
import css from 'components/searchbar/searchbar.module.css';

class SearchBar extends Component {
  state = {
    tag: '',
  };

  reset = () => {
    this.setState({
      tag: '',
    });
  };

  handleInputChange = event => {
    this.setState({
      tag: event.currentTarget.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.reset();
  };

  render() {
    const { tag } = this.state;
    return (
      <header className={css['searchbar']}>
        <form className={css['form']} onSubmit={this.handleSubmit}>
          <button type="submit" className={css['button']}>
            <TbPhotoSearch />
          </button>
          <input
            className={css['input']}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={tag}
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}

export default SearchBar;
