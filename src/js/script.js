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
    form: {
      filters: '.filters',
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
      thisApp.favoriteBooks = [];
      thisApp.filters = [];
    },

    getElements() {
      const thisApp = this;
      
      thisApp.dom = {};
      thisApp.dom.wrapper = document.querySelector(select.container);
      thisApp.dom.bookList = document.querySelector(select.list.bookList);
      thisApp.dom.books = document.querySelectorAll(select.all.books);
      thisApp.dom.bookImages = document.querySelectorAll(select.all.bookImages);
      thisApp.dom.filterform = document.querySelector(select.form.filters);
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
      
      const favoriteBooks = thisApp.favoriteBooks;

      thisApp.dom.bookList.addEventListener('dblclick', function(event) {
        event.preventDefault();
        
        if(event.target.parentNode.parentNode.classList.contains('book__image')) {
          event.target.parentNode.parentNode.classList.toggle('favorite'); 
          const bookId = event.target.parentNode.parentNode.getAttribute('data-id');
        
          if(event.target.parentNode.parentNode.classList.contains('favorite')) {
            favoriteBooks.push(bookId);
        
          } else {
            const index = favoriteBooks.indexOf(bookId);
            favoriteBooks.splice(index, 1);
          }
          console.log('thisApp.favoriteBooks: ', thisApp.favoriteBooks);
        }
      });
      
      thisApp.dom.filterform.addEventListener('click', function(event) {
        event.preventDefault();
        console.log('event: ', event);
        if(event.srcElement.tagName == 'INPUT' 
        && event.srcElement.type == 'checkbox' 
        && event.srcElement.name == 'filter') {
          
          if(event.srcElement.checked == true
            && !favoriteBooks.includes(event.srcElement.value)) {
            favoriteBooks.push(event.srcElement.value);
            console.log('event.srcElement.checked: ', event.srcElement.checked);
            console.log('zaznaczono filtr: ', event.srcElement.value);

          } else if(event.srcElement.checked == false) {
            const index = favoriteBooks.indexOf(event.srcElement.value);
            favoriteBooks.splice(index, 1);
            console.log('odznaczono filtr: ', event.srcElement.value);
          }
          console.log('thisApp.favoriteBooks: ', thisApp.favoriteBooks);
        
        }
      });
    },
  };

  app.initApp();
}