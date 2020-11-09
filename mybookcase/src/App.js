import React, { useState } from 'react';
import Book from './components/Book';
import BookList from './components/Booklist';
import { BrowserRouter, Route} from 'react-router-dom';
import WelcomeMessage from './components/WelcomeMessage';
import Message from './components/Message';
import data from './models/books.json';
import Header from './components/Header';
import About from './pages/About';
import Search from './components/Search';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = (props) => {
 const [books, setBooks] = useState(data);
 const [ keyword, setKeyword ] = useState('');
 const [ selectedBook, setSelectedBook ] = useState('');

 async function findBooks(value) {
  const results = await
 fetch(`https://www.googleapis.com/books/v1/volumes?q=${value}&filter=paid-ebooks&print-ty
 pe=books&projection=lite`).then(res => res.json());
  if (!results.error) {
  setBooks(results.items);
  }
 }

 function addBook(title) {
  console.log(`${title} was clicked`);
  setSelectedBook(title);
  const newBooks = books.filter(book => {
    if (title !== book.volumeInfo.title){
      return true;
    }
    return false;
  });
  setBooks(newBooks)
  }


if (books.length === 0) {
  return 'No books found';
}

return (
<BrowserRouter>
<Route exact path="/" render={() => (
<>
<Header />
<Search findBooks = { findBooks } keyword ={keyword} setKeyword={setKeyword}/>
HOME
<BookList books={books} addBook={addBook} />
</>
 )} />

 <Route exact path="/bookcase" render={() => (
<>
<Header />
BOOKCASE
<BookList books={books} addBook={addBook} />

</>
 )} />

<Route exact path="/about" render={() => (
<>
<Header />
ABOUT
<About/>

</>
 )} />

</BrowserRouter>
 
)}




export default App;