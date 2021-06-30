{
  'use strict';

  const select = {
    templateOf: {
      books: '#template-book',
    },
    list: {
      bookList: '.books-list',
    },
    all: {
      books: '.book',
      bookImages: '.book__image', 
    },
    container: '.container',
  };
  const templates = {
    book: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML),
  };
  

  const app = {
    
    initApp(){ 
      const thisApp = this;
      
      thisApp.initData();
      thisApp.getElements();
      thisApp.render();
      thisApp.initActions();
    },

    initData() {
      const thisApp = this;
      
      thisApp.data = dataSource;
      thisApp.data.books = dataSource.books;
    },

    getElements() {
      const thisApp = this;
      
      thisApp.dom = {};
      thisApp.dom.wrapper = document.querySelector(select.container);
      thisApp.dom.bookList = document.querySelector(select.list.bookList);
      thisApp.dom.books = document.querySelectorAll(select.all.books);
      thisApp.dom.bookImages = document.querySelectorAll(select.all.bookImages);
      console.log('thisApp.dom: ', thisApp.dom);
      // nie znalazło bookImage. why?
    },

    render() {
      const thisApp = this; 

      for(let bookData of thisApp.data.books) {
        const html = templates.book(bookData);
        const bookDOM = utils.createDOMFromHTML(html); 
        thisApp.dom.bookList.appendChild(bookDOM);
      }
      thisApp.getElements(); //wywołałam drugi raz getElements, aby stworzyć thisApp.dom.books i thisApp.dom.bookImages - to chyba nie za dobre rozwiązanie?
    },
  
    initActions() {
      const thisApp = this;
      
      const allBookImages = thisApp.dom.bookImages; 

      for(let bookImage of allBookImages) {
        
        bookImage.addEventListener('dblclick', function(event) {
          event.preventDefault();
          thisApp.addToFavorite(bookImage);
        });  
      }
    },

    addToFavorite(clickedBook) {
      const favoriteBooks = []; 
      clickedBook.classList.add('favorite'); 
      const bookID = clickedBook.getAttribute('data-id');
      favoriteBooks.push(bookID);
    }
  };

  app.initApp();
}