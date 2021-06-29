{
  'use strict';

  const select = {
    templateOf: {
      books: '#template-book',
    },
    book: {
      bookList: '.books-list',
    },
    container: '.container',
  };
  const templates = {
    book: Handlebars.compile(document.querySelector(select.templateOf.books).innerHTML),
  };
  

  const app = {
    
    initApp: function() { 
      const thisApp = this;
      
      thisApp.initData();
      thisApp.getElements();
      thisApp.render();
    },

    initData: function() {
      const thisApp = this;
      
      thisApp.data = dataSource;
      thisApp.data.books = dataSource.books;
    },

    getElements: function() {
      const thisApp = this;
      
      thisApp.dom = {};
      thisApp.dom.wrapper = document.querySelector(select.container);
      //console.log('this.dom.container: ', this.dom.container);
      thisApp.dom.bookList = document.querySelector(select.book.bookList);
    },

    render: function() {
      const thisApp = this;  

      for(let bookData of thisApp.data.books) {
        const html = templates.book(bookData);
        const bookDom = utils.createDOMFromHTML(html); 
        thisApp.dom.bookList.appendChild(bookDom);
      }
    },
    
  };
  
  app.initApp();
}