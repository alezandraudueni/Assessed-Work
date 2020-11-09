import React from "react";
import PropTypes from "prop-types";

const Book = (props) => {
  // let {id, volumeInfo: {title, authors, description}, saleInfo: {listPrice: {amount}}} = props.book;
  const { volumeInfo } = props.book;

  const {
    volumeInfo: {
      title,
      authors,
      description,
      imageLinks: { thumbnail },
    },
  } = props.book;

  const renderAmount = () => {
    if (
      props.book.saleInfo &&
      props.book.saleInfo.listPrice &&
      props.book.saleInfo.listPrice.amount
    ) {
      return "£" + props.book.saleInfo.listPrice.amount;
    }
    return "No price available";
  };

  return (
    <div>
      <h2>{title}</h2>
      <h3>{authors.length === 1 ? authors[0] : authors.join(", ")}</h3>
      <img src={thumbnail} />
      <p>{renderAmount()}</p>
      <p>{description}</p>
      <button onClick={() => props.addBook(title)}>Add +</button>
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.shape({
    volumeinfo: PropTypes.shape({
      title: PropTypes.string.isRequired,
      authors: PropTypes.array.isRequired,
      description: PropTypes.string.isRequired,
      imagelinks: PropTypes.shape({
        thumbnail: PropTypes.string.isRequired,
      }),
    }),
    saleInfo: PropTypes.shape({
      listPrice: PropTypes.shape({
        amount: PropTypes.number.isRequired,
      }).isRequired,
    }),
  }),
};

Book.defaultProps = {};

export default Book;
