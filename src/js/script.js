{
  'use strict';

  const select = {
    templateOf: {
      books: '#template-book',
    },
    book: {
      bookList: '.books-list',
      bookImage: '.book__image',
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
      thisApp.dom.bookList = document.querySelector(select.book.bookList);
      thisApp.dom.bookImages = document.querySelectorAll(select.book.bookImage);
    },

    render() {
      const thisApp = this;  

      for(let bookData of thisApp.data.books) {
        const html = templates.book(bookData);
        const bookDOM = utils.createDOMFromHTML(html); 
        thisApp.dom.bookList.appendChild(bookDOM);
      }
    },
  
    initActions() {
      const thisApp = this;
      
      thisApp.allBookImages = document.querySelectorAll(select.book.bookImage);
      console.log('thisApp. allBookImages: ', thisApp.allBookImages);

      for(let bookImage in thisApp.allBookImages) {
        bookImage.addEventListener('dblclick', function(event) {
          event.PreventDefault();
          thisApp.addToFavourite(bookImage);
        });
      }
      console.log('thisApp: ', thisApp);
    },

    addToFavourite(bookImage){
      const thisApp = this;
      console.log('bookImage: ', bookImage);
      const favouriteBooks = [];
      for(let book in thisApp.dom.bookList) {
        book.classList.add('favourite');
        const bookID = bookImage.data-id;
        console.log('Dodano do ulubionych!');
      }
      
    },
  };
  
  

  

  app.initApp();
}