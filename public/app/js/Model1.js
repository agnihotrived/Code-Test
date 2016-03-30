
var app;
(function () {
    app = angular.module("crudModule", [], ['$httpProvider', function ($httpProvider) {
            //Setting headers  
            $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $httpProvider.defaults.headers.common['X-Requested-With'] = "XMLHttpRequest";
            $httpProvider.defaults.headers.post['X-CSRF-TOKEN'] = jQuery('meta[name=_token]').attr('content');
        }]).constant("CSRF_TOKEN", "{{ csrf_token() }}");

})();

app.service('crudService', function ($http, CSRF_TOKEN) {
    /*------------------------------------------Author-----------------------------------------------------*/
    //Create new record
    this.CreateAuthor = function (author) {
        var data = JSON.stringify({author: author});
        var URL = "/codetest/public/authors/" + data;
        var request = $http.post(URL,data,{'Content-Type': 'application/json'});
        return request;
    };
    //Add Books to author
    this.AddBooksToAuthor = function (authorbook) {
        var data = JSON.stringify({authorbook: authorbook});
        var URL = "/codetest/public/authors_book_relation/AddBooksToAuthor/" + data;
        var request = $http.post(URL, data);
        return request;
    };

    // Remove books from author
    this.RemoveBooksFrmAuthor = function (authorbook) {
        var data = JSON.stringify({authorbook: authorbook});
        var URL = "/codetest/public/authors_book_relation/RemoveBooksFrmAuthor/" + data;
        var request = $http.delete(URL, data);
        return request;
    };

    //Get Single Records or author
    this.getAuthor = function (AuthorId) {
        var URL = "./codetest/public/Authors/" + AuthorId;
        return $http.get(URL);
    };

    //Get list of all Authors
    this.getAuthors = function () {
        var URL = "./codetest/public/Authors/";
        return $http.get(URL);
    };

    this.getAssociationData = function () {
        var URL = "./codetest/public/authors_book_relation/data/";
        return $http.get(URL);
    };

    //Update the Record
    this.EditAuthor = function (AuthorId, Author) {
        var author = JSON.stringify({id: AuthorId, author: Author});
        var URL = "/codetest/public/authors/update/" + author;
        var request = $http.post(URL, author);
        return request;
    };

    //Delete the Record   
    this.deleteAuthor = function (AuthorId) {
        var URL = "/codetest/public/authors/" + AuthorId;
        var data = JSON.stringify({"AuthorId": AuthorId});
        var request = $http.delete(URL, data);
        return request;
    };
    /*------------------------------------------Books-----------------------------------------------------*/
    //Create new record
    this.CreateBook = function (Book) {
        var data = JSON.stringify({"book": Book});
        var URL = "/codetest/public/books/" + data;
        var request = $http.post(URL, data);
        return request;
    };

    //Get Single Records
    this.getBook = function (BookId) {
        var URL = "./codetest/public/books/" + BookId;
        return $http.get(URL);
    };

    //Get All Authors
    this.getBooks = function () {
        var URL = "./codetest/public/books/";
        return $http.get(URL);
    };

    //Update the Record
    this.EditBook = function (BookId, Book) {
        var book = JSON.stringify({id: BookId, book: Book});
        var URL = "/codetest/public/books/update/" + book;
        var request = $http.post(URL, book);
        return request;
    };

    //Delete the Record
    this.deleteBook = function (BookId) {
        var data = JSON.stringify({"BookId": BookId});
        var URL = "/codetest/public/books/" + BookId;
        var request = $http.delete(URL, data);
        return request;

    };
});

//The controller is having 'crudService' dependency.
//This controller makes call to methods from the service 
app.controller('BookController', function BookController($scope, crudService) {
    $scope.books_form_hide = true;
    $scope.author_form_hide = true;
    $scope.authorBookAssociatedData = [];
    $scope.authorBookDisassociatedData = [];
    $scope.IsNewRecord = 1; //The flag for the new record
    loadBooks();
    loadAuthor_Book_AssociationData();
    loadAuthors();
    //Function to load all books records
    function loadBooks() {
        var GetBooksReq = crudService.getBooks(); //The Method Call from service
        GetBooksReq.then(function (res) {
            $scope.Books = res.data;
        },
                function (error) {
                    console.log("failure loading Books :" + error.statusText);
                });
    }

    //Function to load all Author Book records
    function loadAuthor_Book_AssociationData() {
        var getAssociationDataReq = crudService.getAssociationData(); //The MEthod Call from service       
        getAssociationDataReq.then(function (res) {
            $scope.AssociationData = res.data;
        },
                function (error) {
                    console.log('failure loading Authors: ' + error.statusText);
                });
    };

    // Load all authors
    function loadAuthors() {
        var getAuthorsReq = crudService.getAuthors(); //The MEthod Call from service      
        getAuthorsReq.then(function (res) {
            $scope.Authors = res.data;
        },
                function (error) {
                    console.log('failure loading Authors: ' + error.statusText);
                });
    };
    
    //Function to set associated and disassociated book for a specific author 
    function ProcessBookAssociatedData(authorid) {
        var tempAuthorBook = jQuery.grep($scope.AssociationData, function (obj, index) {
            return obj.authorid === authorid;
        });
        var associatedBooks = [];
        var disassociatedData = [];
        if (tempAuthorBook.length === 0) {
            associatedBooks = [];
            disassociatedData = $scope.Books;
        } else {
            for (var j = 0; j < $scope.Books.length; j++) {
                for (var i = 0; i < tempAuthorBook.length; i++) {
                    if ($scope.Books[j]['id'] === tempAuthorBook[i]['bookid'])
                    {
                        associatedBooks.push($scope.Books[j]);
                    }
                }
            }
            if (associatedBooks.length > 0)
            {
                jQuery.each($scope.Books, function (i, e) {
                    if (jQuery.inArray(e, associatedBooks) === -1)
                        disassociatedData.push(e);
                });
            }
        }
        if (associatedBooks.length > 0 && disassociatedData.length > 0) {
            $scope.authorBookAssociatedData = associatedBooks;
            $scope.authorBookDisassociatedData = disassociatedData;

        } else if (associatedBooks.length > 0 && disassociatedData.length === 0) {
            $scope.authorBookAssociatedData = associatedBooks;
            $scope.authorBookDisassociatedData = disassociatedData;
        } else if (associatedBooks.length === 0 && disassociatedData.length > 0) {
            $scope.authorBookAssociatedData = associatedBooks;
            $scope.authorBookDisassociatedData = disassociatedData;
        } else {
            $scope.authorBookAssociatedData = associatedBooks;
            $scope.authorBookDisassociatedData = $scope.Books;
        }
    };

    //function to save book record
    $scope.saveBook = function () {
        var Book = new Object();
        Book.title = $scope.title;
        Book.description = $scope.description;
        Book.genre = $scope.genre;
        Book.isbn = $scope.isbn;
        var validationResult = validateBookData(Book);
        if (!CheckForEmptyString(validationResult))
        {
            alert(validationResult);
        } else
        {
            //If the flag is 1 the it is new record       
            if ($scope.IsNewRecord === 1) {
                var newBookReq = crudService.CreateBook(Book);
                newBookReq.then(function (res) {
                    if (res !== null)
                    {
                        if (res.data !== null)
                        {
                            if (res.data.message === 99)
                            {
                                alert("Invalid input!");
                            } else if (res.data.id !== null)
                            {
                                $scope.BookId = res.data.Id;
                                jQuery("#addbooks_form").modal("hide");
                                displayDialog("Books Added Successfuly", "information");
                                loadBooks();
                                loadAuthor_Book_AssociationData();
                            }
                        }
                    }
                }, function (err) {
                    jQuery("#addbooks_form").modal("hide");
                    console.log("Err" + err.statusText);
                });
            } else { //Else Edit the record          
                var editBookReq = crudService.EditBook($scope.BookId, Book);
                editBookReq.then(function (res) {
                    if (res !== null)
                    {
                        if (res.data !== null)
                        {
                            if (res.data.message === 99)
                            {
                                alert("Invalid input!");
                            } else if (res.data.id !== null)
                            {
                                $scope.Message = "Updated Successfuly";
                                jQuery("#addbooks_form").modal("hide");
                                displayDialog("Books Updated Successfuly", "information");
                                loadBooks();
                            }
                        }
                    }
                }, function (err) {
                    console.log("Err" + err.statusText);
                    jQuery("#addbooks_form").modal("hide");
                });
            }

        }
    };

    $scope.editBook = function (event) {
        var bookid = jQuery(event.currentTarget).attr("bookid");

        if (bookid !== null && bookid !== undefined) {
            bookid = parseInt(bookid);
        } else {
            bookid = $scope.BookId;
        }
        var obj = jQuery.grep($scope.Books, function (element, index) {
            return element.id === bookid;
        });

        if (obj.length === 1)
        {
            var element = '<h1>'
                    + 'Edit Author <button type="button" class="close" data-dismiss="modal" aria-label="Close">'
                    + '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>'
                    + '</button>'
                    + '</h1>';

            jQuery("#addbooks_form").find(".modal-header").empty().append(jQuery(element));
            jQuery("#booksubmit").attr("value", " Save");
            obj = obj[0];
            $scope.title = obj.title;
            $scope.description = obj.description;
            $scope.genre = obj.genre;
            $scope.isbn = obj.isbn;
            jQuery(".books_author_container,.author_container").find(".rowselected").removeClass("rowselected");
            $scope.books_form_hide = false;
            $scope.IsNewRecord = 0;
            jQuery("#addbooks_form").modal("show");
        }
    };

    $scope.newBook = function () {
        $scope.IsNewRecord = 1;
        $scope.BookId = "";
        $scope.title = "";
        $scope.description = "";
        $scope.genre = "";
        $scope.isbn = "";
        $scope.AuthorId = "";

        var element = '<h1>'
                + 'Add New Book <button type="button" class="close" data-dismiss="modal" aria-label="Close">'
                + '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>'
                + '</button>'
                + '</h1>';

        jQuery("#addbooks_form").find(".modal-header").empty().append(jQuery(element));

        jQuery("#booksubmit").attr("value", " Add");

        jQuery("#addbooks_form").modal("show");
        $scope.books_form_hide = false;
    };
    
    //Method to Delete
    $scope.deleteBook = function (event) {
        var bookid = jQuery(event.currentTarget).attr("bookid");
        if (bookid !== null && bookid !== undefined)
        {
            bookid = parseInt(bookid);
        }
        var DeleteBookReq = crudService.deleteBook(bookid);
        DeleteBookReq.then(function (req) {
            $scope.Message = "Deleted Successfuly";
            $scope.BookId = "";
            $scope.title = "";
            $scope.description = "";
            $scope.genre = "";
            $scope.isbn = "";
            $scope.AuthorId = "";
            jQuery("#removebooks-modal").modal("hide");
            displayDialog("Books Successfully Deleted", "information");
            loadBooks();
            loadAuthor_Book_AssociationData();
        }, function (err) {
            jQuery("#removebooks-modal").modal("hide");
            console.log("Err" + err.statusText);
        });
        event.stopPropagation();
    };

    $scope.deleteBookModel = function (event, el) {
        var bookid = jQuery(event.currentTarget).attr("bookid");
        jQuery("#removebooks-modal").find("#deletebook").attr("bookid", "" + bookid);
        jQuery("#removebooks-modal").modal("show");
        event.stopPropagation();
    };

    //Clear the Scopr models
    $scope.clearBook = function () {
        $scope.IsNewRecord = 1;
        $scope.BookId = "";
        $scope.title = "";
        $scope.description = "";
        $scope.genre = "";
        $scope.isbn = "";
        $scope.AuthorId = "";
        $scope.books_form_hide = true;
        $scope.IsNewRecord = 0;
    };

    $scope.selectedAuthor = function (event, el) {
        //        if (jQuery(event.currentTarget).closest(".author_container_row").hasClass("open"))
        //        {
        //            event.preventDefault();
        //        } else {
        jQuery(".books_author_container,.author_container").find(".selected").removeClass("open");
        /******Clear The Container*********/
        $scope.authorBookAssociatedData = [];
        $scope.authorBookDisassociatedData = [];
        // jQuery(".DissociateBooks").empty();
        // jQuery(".associatedBooks").empty();  
        $scope.AuthorId = el.author.id;
        jQuery(".author_container").find(".rowselected").removeClass("rowselected");
        jQuery(".books_author_container,.author_container").find(".selected").removeClass("selected");
        jQuery(".author_container_row").removeClass("selected").removeClass("open");
        jQuery(event.currentTarget).closest(".author_container_row").removeClass("selected").addClass("selected").addClass("open");
        jQuery(event.currentTarget).closest(".author_container_row").find(".author_container").removeClass("rowselected").addClass("rowselected");

        ProcessBookAssociatedData($scope.AuthorId);

        jQuery(".associatedBooksContainer").removeClass("ng-hide");
        jQuery(".DissociateBooksContainer").removeClass("ng-hide").addClass("ng-hide");

        //            jQuery(".books_author_container  .associatedBooksContainer").removeClass("ng-hide").addClass("ng-hide");          
///jQuery(event.currentTarget).children(".books_by_author").removeClass("ng-hide");
        //jQuery(".books_container").find(".selected").removeClass("selected");
        // setTimeout(function () {

        if (jQuery(".associatedBooksContainer .associatedBooks .bookdiv").length === 0 && $scope.authorBookAssociatedData.length === 0)
        {
            jQuery(".associatedBooksContainer .removeBooksBtn").removeClass("ng-hide").addClass("ng-hide");
            jQuery(".associatedBooksContainer .noBooksAddedContainer").removeClass("ng-hide");
            jQuery(".associatedBooksContainer");
        } else if (jQuery(".associatedBooksContainer .associatedBooks .bookdiv").length !== 0 && $scope.authorBookAssociatedData.length !== 0) {
            jQuery(".associatedBooksContainer .noBooksAddedContainer").removeClass("ng-hide").addClass("ng-hide");
        }

        if (jQuery(".DissociateBooksContainer  .DissociateBooks .bookdiv").length !== 0 && $scope.authorBookDisassociatedData.length !== 0)
        {
            jQuery(".DissociateBooksContainer .addSelectedBooksBtn").removeClass("ng-hide");
            jQuery(".DissociateBooksContainer .pleaseAddNewbooks").removeClass("ng-hide").addClass("ng-hide");
        } else if (jQuery(".DissociateBooksContainer .DissociateBooks .bookdiv").length === 0 && $scope.authorBookDisassociatedData.length === 0) {
            jQuery(".DissociateBooksContainer .addSelectedBooksBtn").removeClass("ng-hide").addClass("ng-hide");
            jQuery(".DissociateBooksContainer .pleaseAddNewbooks").removeClass("ng-hide");

        }

//            debugger;
//                if (jQuery("#associatedBooks-modal").find(".associatedBooks  .bookdiv").length === 0 && $scope.authorBookAssociatedData.length==0)
//                {
//                    debugger;
//                    jQuery("#associatedBooks-modal").find(".associatedBooks .removeBooksBtn").removeClass("ng-hide").addClass("ng-hide");
//                  
//                }

        jQuery("#associatedBooks-modal").find(".modal-body").attr("authorid", "" + $scope.AuthorId);
        jQuery("#associatedBooks-modal").modal("show");
        // }, 50);
        //}
    };

    $scope.selectedBook = function (event, el) {
        $scope.BookId = el.book.id;
        jQuery(".books_container").find(".rowselected").removeClass("rowselected");
        jQuery(event.currentTarget).addClass("rowselected");
        jQuery(".author_container").find(".selected").removeClass("selected");
    };

    /*------------------------------------Associate Book With Author operations START -----------------------------------------------*/
    $scope.AddBooks = function (event, el) {
        /*-----------hide show btn----------------------------------*/
        jQuery(".associatedBooksContainer .addBooksBtn").removeClass("ng-hide").addClass("ng-hide");
        jQuery(".associatedBooksContainer .removeBooksBtn").removeClass("ng-hide").addClass("ng-hide");
        jQuery(".associatedBooksContainer .addSelectedBooksBtn").removeClass("ng-hide").addClass("ng-hide");
        jQuery(".associatedBooksContainer.removeSelectedBooksBtn ").removeClass("ng-hide").addClass("ng-hide");
        jQuery(".associatedBooksContainer .cancelBookAssociation ").removeClass("ng-hide").addClass("ng-hide");

        jQuery(".DissociateBooksContainer .addBooksBtn").removeClass("ng-hide").addClass("ng-hide");
        jQuery(".DissociateBooksContainer .removeBooksBtn").removeClass("ng-hide").addClass("ng-hide");
        jQuery(".DissociateBooksContainer .addSelectedBooksBtn").removeClass("ng-hide");
        //jQuery(event.currentTarget).closest(".selected").find(".DissociateBooksContainer .removeSelectedBooksBtn ").removeClass("ng-hide");
        jQuery(".DissociateBooksContainer .cancelBookAssociation ").removeClass("ng-hide");

        /*----------- show checkbox ----------------------------------*/
        jQuery(".DissociateBooksContainer .DissociateBooks").find(".book-chk").removeClass("ng-hide");
        jQuery(".associatedBooksContainer  .associatedBooks").find(".book-chk").removeClass("ng-hide");
        /*----------- uncheck checkbox ----------------------------------*/
        jQuery(".DissociateBooksContainer .DissociateBooks").find(".book-chk").attr('checked', false);
        jQuery(".associatedBooksContainer  .associatedBooks").find(".book-chk").attr('checked', false);
        /*----------- hide associated book div and Show DissociateBooks container ----------------------------------*/

        var element = '<h1>'
                + 'Disassociated Books'
                + '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'
                + '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>'
                + '</button>'
                + '</h1>';
        jQuery("#associatedBooks-modal").find(".modal-header").empty().append(jQuery(element));
        jQuery(".associatedBooksContainer").removeClass("ng-hide").addClass("ng-hide");
        jQuery(".DissociateBooksContainer").removeClass("ng-hide");
        event.stopPropagation();
    };
    
    $scope.RemoveBooks = function (event, el) {
        jQuery(".DissociateBooksContainer .addBooksBtn").removeClass("ng-hide").addClass("ng-hide");
        jQuery(".DissociateBooksContainer .removeBooksBtn").removeClass("ng-hide").addClass("ng-hide");
        jQuery(".DissociateBooksContainer .addSelectedBooksBtn").removeClass("ng-hide").addClass("ng-hide");

        jQuery(".DissociateBooksContainer .removeSelectedBooksBtn").removeClass("ng-hide").addClass("ng-hide");
        jQuery(".DissociateBooksContainer .cancelBookAssociation ").removeClass("ng-hide").addClass("ng-hide");

        jQuery(".associatedBooksContainer .addBooksBtn").removeClass("ng-hide").addClass("ng-hide");
        jQuery(".associatedBooksContainer .removeBooksBtn").removeClass("ng-hide").addClass("ng-hide");
        jQuery(".associatedBooksContainer .removeSelectedBooksBtn").removeClass("ng-hide");
        jQuery(".associatedBooksContainer .addSelectedBooksBtn ").removeClass("ng-hide").addClass("ng-hide");
        jQuery(".associatedBooksContainer .cancelBookAssociation ").removeClass("ng-hide");

        /*----------- show checkbox ----------------------------------*/
        jQuery(".DissociateBooksContainer .DissociateBooks").find(".book-chk").removeClass("ng-hide");
        jQuery(".associatedBooksContainer  .associatedBooks").find(".book-chk").removeClass("ng-hide");
        /*----------- uncheck checkbox ----------------------------------*/
        jQuery(".DissociateBooksContainer .DissociateBooks").find(".book-chk").attr('checked', false);
        jQuery(".associatedBooksContainer  .associatedBooks").find(".book-chk").attr('checked', false);
        /*----------- Show DissociateBooks container ----------------------------------*/
        /*----------- hide DissociateBooks  book div and Show  associated container ----------------------------------*/

        var element = '<h1>'
                + 'Associated Books'
                + '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'
                + '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>'
                + '</button>'
                + '</h1>';
        jQuery("#associatedBooks-modal").find(".modal-header").empty().append(jQuery(element));
        jQuery(".DissociateBooksContainer").removeClass("ng-hide").addClass("ng-hide");
        jQuery(".associatedBooksContainer").removeClass("ng-hide");
        event.stopPropagation();
    };
    
    $scope.CancelBookAssociation = function (event, el) {
        jQuery(".associatedBooksContainer .addBooksBtn").removeClass("ng-hide");
        jQuery(".associatedBooksContainer .removeBooksBtn").removeClass("ng-hide");

        jQuery(".associatedBooksContainer .addSelectedBooksBtn").removeClass("ng-hide").addClass("ng-hide");
        jQuery(".associatedBooksContainer .removeSelectedBooksBtn").removeClass("ng-hide").addClass("ng-hide");
        jQuery(".associatedBooksContainer .cancelBookAssociation").removeClass("ng-hide").addClass("ng-hide");
        jQuery(".DissociateBooksContainer .cancelBookAssociation").removeClass("ng-hide").addClass("ng-hide");

        /*----------- hide DissociateBooks  book div and Show  associated container ----------------------------------*/

        var element = '<h1>'
                + 'Associated Books'
                + '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'
                + '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>'
                + '</button>'
                + '</h1>';
        jQuery("#associatedBooks-modal").find(".modal-header").empty().append(jQuery(element));
        jQuery(".DissociateBooksContainer").removeClass("ng-hide").addClass("ng-hide");
        jQuery(".associatedBooksContainer").removeClass("ng-hide");

        /*----------- hide checkbox ----------------------------------*/
        jQuery(".DissociateBooksContainer .DissociateBooks").find(".book-chk").removeClass("ng-hide").addClass("ng-hide");
        jQuery(".associatedBooksContainer  .associatedBooks").find(".book-chk").removeClass("ng-hide").addClass("ng-hide");
        /*----------- uncheck checkbox ----------------------------------*/
        jQuery(".DissociateBooksContainer .DissociateBooks").find(".book-chk").attr('checked', false);
        jQuery(".associatedBooksContainer  .associatedBooks").find(".book-chk").attr('checked', false);
        /*-----------Show DissociateBooks container ----------------------------------------------------------*/
        //event.stopPropagation();
    };
    
    $scope.AddSelectedBooks = function (event, el) {
        var selectedbookIds = [];
        var authorid = null;
        authorid = jQuery(event.currentTarget).closest(".modal-body").attr("authorid");
        var inputelements = jQuery(event.currentTarget).closest(".modal-body").find(".DissociateBooks").find(".book-chk");
        jQuery.each(inputelements, function (index, value)
        {
            if (jQuery(value).prop("checked") === true)
            {
                var bookid = jQuery(value).attr("bookid");
                if (bookid !== null || typeof bookid !== 'undefined') {
                    bookid = parseInt(bookid);
                    selectedbookIds.push(bookid);
                }
            }
        });
        if (authorid !== null && selectedbookIds.length > 0) {
            authorid = parseInt(authorid);
            var authorbook = {};
            authorbook.authorid = authorid;
            authorbook.books = selectedbookIds;
            var AddBooksToAuthorReq = crudService.AddBooksToAuthor(authorbook);
            AddBooksToAuthorReq.then(function (res) {
                loadBooks();
                loadAuthor_Book_AssociationData();
                loadAuthors();
                displayDialog("Books Successfully Associated", "information");
                jQuery(".associatedBooksContainer .addBooksBtn").removeClass("ng-hide");
                jQuery(".associatedBooksContainer .removeBooksBtn").removeClass("ng-hide");

                jQuery(".associatedBooksContainer .addSelectedBooksBtn").removeClass("ng-hide").addClass("ng-hide");
                jQuery(".associatedBooksContainer .removeSelectedBooksBtn").removeClass("ng-hide").addClass("ng-hide");
                jQuery(".associatedBooksContainer .cancelBookAssociation").removeClass("ng-hide").addClass("ng-hide");
                jQuery(".DissociateBooksContainer .cancelBookAssociation").removeClass("ng-hide").addClass("ng-hide");

                /*----------- hide DissociateBooks  book div and Show  associated container ----------------------------------*/

                var element = '<h1>'
                        + 'Associated Books'
                        + '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'
                        + '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>'
                        + '</button>'
                        + '</h1>';
                jQuery("#associatedBooks-modal").find(".modal-header").empty().append(jQuery(element));
                jQuery(".DissociateBooksContainer").removeClass("ng-hide").addClass("ng-hide");
                jQuery(".associatedBooksContainer").removeClass("ng-hide");

                /*----------- hide checkbox ----------------------------------*/
                jQuery(".DissociateBooksContainer .DissociateBooks").find(".book-chk").removeClass("ng-hide").addClass("ng-hide");
                jQuery(".associatedBooksContainer  .associatedBooks").find(".book-chk").removeClass("ng-hide").addClass("ng-hide");
                /*----------- uncheck checkbox ----------------------------------*/
                jQuery(".DissociateBooksContainer .DissociateBooks").find(".book-chk").attr('checked', false);
                jQuery(".associatedBooksContainer  .associatedBooks").find(".book-chk").attr('checked', false);
                /*-----------Show DissociateBooks container ----------------------------------------------------------*/

                //jQuery(".DissociateBooksContainer .cancelBookAssociation").trigger("click");
                jQuery(".associatedBooksContainer").removeClass("ng-hide");
                jQuery(".DissociateBooksContainer").removeClass("ng-hide").addClass("ng-hide");
                jQuery("#associatedBooks-modal").modal("hide");
            },
                    function (error) {
                        console.log('Failure loading AddBooks To Author Failed:   ' + error.statusText);
                    });
        }
        event.stopPropagation();
    };
    
    $scope.RemoveSelectedBooks = function (event, el) {
        var selectedbookIds = [];
        var authorid = null;
        authorid = jQuery(event.currentTarget).closest(".modal-body").attr("authorid");
        var inputelements = jQuery(event.currentTarget).closest(".modal-body").find(".associatedBooks").find(".book-chk");
        jQuery.each(inputelements, function (index, value)
        {
            if (jQuery(value).prop("checked") === true)
            {
                var bookid = jQuery(value).attr("bookid");
                if (bookid !== null || typeof bookid !== 'undefined') {
                    bookid = parseInt(bookid);
                    selectedbookIds.push(bookid);
                }
            }
        });
        if (authorid !== null && selectedbookIds.length > 0) {
            authorid = parseInt(authorid);
            var authorbook = {};
            authorbook.authorid = authorid;
            authorbook.books = selectedbookIds;

            var RemoveBooksFrmAuthorReq = crudService.RemoveBooksFrmAuthor(authorbook);

            RemoveBooksFrmAuthorReq.then(function (res) {
                loadBooks();
                loadAuthor_Book_AssociationData();
                loadAuthors();
                displayDialog("Books Successfully Disassociated", "information");

                jQuery(".associatedBooksContainer .addBooksBtn").removeClass("ng-hide");
                jQuery(".associatedBooksContainer .removeBooksBtn").removeClass("ng-hide");

                jQuery(".associatedBooksContainer .addSelectedBooksBtn").removeClass("ng-hide").addClass("ng-hide");
                jQuery(".associatedBooksContainer .removeSelectedBooksBtn").removeClass("ng-hide").addClass("ng-hide");
                jQuery(".associatedBooksContainer .cancelBookAssociation").removeClass("ng-hide").addClass("ng-hide");
                jQuery(".DissociateBooksContainer .cancelBookAssociation").removeClass("ng-hide").addClass("ng-hide");

                /*----------- hide DissociateBooks  book div and Show  associated container ----------------------------------*/

                var element = '<h1>'
                        + 'Associated Books'
                        + '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'
                        + '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>'
                        + '</button>'
                        + '</h1>';
                jQuery("#associatedBooks-modal").find(".modal-header").empty().append(jQuery(element));
                jQuery(".DissociateBooksContainer").removeClass("ng-hide").addClass("ng-hide");
                jQuery(".associatedBooksContainer").removeClass("ng-hide");

                /*----------- hide checkbox ----------------------------------*/
                jQuery(".DissociateBooksContainer .DissociateBooks").find(".book-chk").removeClass("ng-hide").addClass("ng-hide");
                jQuery(".associatedBooksContainer  .associatedBooks").find(".book-chk").removeClass("ng-hide").addClass("ng-hide");
                /*----------- uncheck checkbox ----------------------------------*/
                jQuery(".DissociateBooksContainer .DissociateBooks").find(".book-chk").attr('checked', false);
                jQuery(".associatedBooksContainer  .associatedBooks").find(".book-chk").attr('checked', false);
                /*-----------Show DissociateBooks container ----------------------------------------------------------*/
                
                jQuery(".associatedBooksContainer").removeClass("ng-hide");
                jQuery(".DissociateBooksContainer").removeClass("ng-hide").addClass("ng-hide");


                jQuery("#associatedBooks-modal").modal("hide");


                jQuery(".noBooksAddedContainer,.pleaseAddNewbooks").removeClass("ng-hide").addClass("ng-hide");
            },
                    function (error) {

                        console.log('Remove Books From Author Failed:   ' + error.statusText);
                    });
        }
        event.stopPropagation();
    };
    /*------------------------------------Associate Book With Author operations END-----------------------------------------------*/
    $scope.hidebookform = function () {
        $scope.books_form_hide = !$scope.books_form_hide;
    };
    $scope.hideauthorform = function () {
        $scope.author_form_hide = !$scope.author_form_hide;
    };
    /*********************************Author Section************************************/
    //The Save scope method use to define the Author object.
    //In this method if IsNewRecord is not zero then Update Employee else 
    //Create the Employee information to the server
    $scope.authorsave = function () {
        var author = {};
        author.firstname = $scope.firstname;
        author.lastname = $scope.lastname;
        author.aboutme = $scope.aboutme;
        if (author.aboutme === undefined)
        {
            author.aboutme = "";
        }
        var validationResult = validateAuthorData(author);
        if (!CheckForEmptyString(validationResult))
        {
            alert(validationResult);
        } else
        {
            //If the flag is 1 the it is new record
            if ($scope.IsNewRecord === 1) {
                var newauthorPostReq = crudService.CreateAuthor(author);
                newauthorPostReq.then(function (res) {
                    if (res !== null)
                    {
                        if (res.data !== null)
                        {
                            if (res.data.message === 99)
                            {
                                alert("Invalid input!");
                            } else
                            {
                                if (res.data.id !== null)
                                {
                                    jQuery("#addauthor_form").modal("hide");
                                    displayDialog("Author Added Successfuly", "information");
                                    $scope.AuthorId = res.data.id;
                                    loadAuthors();
                                    $scope.clearAuthor();
                                    $scope.author_form_hide = true;
                                }
                            }
                        }
                    }
                }, function (err) {
                    console.log("Err" + err.statusText);
                    jQuery("#addauthor_form").modal("hide");
                });


            }

            if ($scope.IsNewRecord === 0)
            {
                var authorid = jQuery(event.currentTarget).closest(".modal-body").attr("authorid");
                if (authorid !== null)
                    authorid = parseInt(authorid);


                var author = {};
                author.firstname = $scope.firstname;
                author.lastname = $scope.lastname;
                author.aboutme = $scope.aboutme;
                var validationResult = validateAuthorData(author);
                if (!CheckForEmptyString(validationResult))
                {
                    alert(validationResult);
                } else
                {
                    var authorPostReq = crudService.EditAuthor(authorid, author);
                    authorPostReq.then(function (res) {
                        if (res !== null)
                        {
                            if (res.data !== null)
                            {
                                if (res.data.message === 99)
                                {
                                    alert("Invalid input!");
                                } else
                                {
                                    if (res.data.id !== null)
                                    {
                                        //author.id
                                        jQuery("#addauthor_form").modal("hide");
                                        displayDialog("Author Updated Successfuly", "information");
                                        $scope.Message = "Updated Successfuly";
                                        loadAuthors();
                                    }
                                }
                            }
                        }
                    }, function (err) {
                        console.log("Err" + err.statusText);
                    });
                }
            }
        }
    };

    $scope.editAuthor = function (event, el) {
        $scope.IsNewRecord = 0;
        var authorid = jQuery(event.currentTarget).attr("authorid");
        if (authorid !== null)
            authorid = parseInt(authorid);
        jQuery("#addauthor_form").find(".modal-body").attr("authorid", "" + authorid);
        var obj = jQuery.grep($scope.Authors, function (element, index) {
            return element.id === authorid;
        });
        var element = '<h1>'
                + 'Edit Author <button type="button" class="close" data-dismiss="modal" aria-label="Close">'
                + '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>'
                + '</button>'
                + '</h1>';

        jQuery("#addauthor_form").find(".modal-header").empty().append(jQuery(element));
        jQuery("#addauthor_form").find("#authorsubmit").attr("value", "Save");
        jQuery("#addauthor_form").modal("show");
        if (obj.length === 1) {
            obj = obj[0];
            $scope.firstname = (obj.firstname !== null && typeof obj.firstname !== 'undefined') ? obj.firstname : "";
            $scope.lastname = (obj.lastname !== null && typeof obj.lastname !== 'undefined') ? obj.lastname : "";
            $scope.aboutme = (obj.aboutme !== null && typeof obj.aboutme !== 'undefined') ? obj.aboutme : "";
        }
        event.stopPropagation();
    };
    $scope.newAuthor = function () {
        $scope.IsNewRecord = 1;

        $scope.firstname = "";
        $scope.lastname = "";
        $scope.aboutme = "";

        var element = '<h1>'
                + 'Add Author <button type="button" class="close" data-dismiss="modal" aria-label="Close">'
                + '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>'
                + '</button>'
                + '</h1>';

        jQuery("#addauthor_form").find(".modal-header").empty().append(jQuery(element));
        jQuery("#addauthor_form").find("#authorsubmit").attr("value", "Add");

        jQuery("#addauthor_form").modal("show");
        $scope.author_form_hide = false;
    };
    //Method to Delete
    $scope.deleteAuthorModel = function (event, el) {
        var authorid = jQuery(event.currentTarget).attr("authorid");
        jQuery("#authordelete-modal").find(".modal-body").attr("authorid", "" + authorid);
        jQuery("#authordelete-modal").modal("show");
        event.stopPropagation();
    };
    $scope.deleteAuthor = function () {
        var authorid = jQuery(event.currentTarget).closest(".modal-content").find(".modal-body").attr("authorid");
        if (authorid !== null)
            authorid = parseInt(authorid);
        var authorDeleteReq = crudService.deleteAuthor(authorid);
        authorDeleteReq.then(function (res) {
            $scope.Message = "Deleted Successfuly";
            $scope.AuthorId = "";
            $scope.firstname = "";
            $scope.lastname = "";
            $scope.aboutme = "";
            jQuery("#authordelete-modal").modal("hide");
            displayDialog("Author Deleted Successfuly", "information");
            loadAuthors();
        },
                function (err) {
                    jQuery("#authordelete-modal").modal("hide");
                    console.log("Err" + err);
                });
    };

    //Clear the Author models
    $scope.clearAuthor = function () {
        $scope.IsNewRecord = 1;
        $scope.AuthorId = "";
        $scope.firstname = "";
        $scope.lastname = "";
        $scope.author_form_hide = true;
    };

    $scope.getAuthorObject = function (authorId, property) {
        var obj = jQuery.grep(Authors, function (element, index) {
            return element.id === authorId;
        });

        if (obj.length === 1)
            return obj[0][property];
    };
    /**************************Author Section*******************************************/
});

app.filter('ucf', function ()
{
    return function (word)
    {
        return word.substring(0, 1).toUpperCase() + word.slice(1);
    };
});

app.filter('dateonly', function ()
{
    return function (datetime)
    {
        return datetime.substring(0, 10);
    };
});

// Validate form data for author
function validateAuthorData(author)
{
    var returnValue = "";
    if (CheckForEmptyString(author.firstname))
    {
        returnValue = "First name is required!\n";
    }
    if (CheckForEmptyString(author.lastname))
    {
        returnValue += "Last name is required!\n";
    }
    if (CheckForEmptyString(author.aboutme))
    {
        returnValue += "About me is required!\n";
    }
    if (!checkFoAlphaNumeric(author.firstname) || !checkFoAlphaNumeric(author.lastname) || !checkFoAlphaNumeric(author.aboutme))
    {
        returnValue += "Invalid input, Only alphabets, numbers and space .,-:@! are  allowed!\n";
    }

    return returnValue;
}
// Validate form data for Book
function validateBookData(book)
{
    var returnValue = "";
    if (CheckForEmptyString(book.title))
    {
        returnValue = "Title is required!\n";
    }
    if (CheckForEmptyString(book.description))
    {
        returnValue += "Description is required!\n";
    }
    if (CheckForEmptyString(book.genre))
    {
        returnValue += "Genre is required!\n";
    }
    if (CheckForEmptyString(book.isbn))
    {
        returnValue += "ISBN is required!\n";
    }
    if (!checkFoAlphaNumeric(book.title) || !checkFoAlphaNumeric(book.description) || !checkFoAlphaNumeric(book.genre) || !checkFoAlphaNumeric(book.isbn))
    {
        returnValue += "Invalid input, Only alphabets, numbers and space .,-:@! are  allowed!\n";
        //returnValue += "Invalid input, Only Alpha Numeric is allowed!\n";
    }

    return returnValue;
}

// Utility method, verify for empty and null string
function CheckForEmptyString(str) {
    if (str && str !== '')
        return false;
    else
        return true;
}

// Utility method, verify for alpha numeric method.
function checkFoAlphaNumeric(value)
{
    //var letters = /^[a-zA-Z0-9\-\s.,]+$/;
    var letters = /^[a-zA-Z0-9\s.,-:@!]+$/;
    //var letters = /^[A-Za-z\s`~!@$%^*()+={}|;:'",.<>\/?\\-]+$/;
    var result = letters.test(value);
    return result;
}

var DialogObjTimeOutId = null;

//function to show hide messages dialog to user 
function showDialogMessage(messageObject) {
    try {
        // alert(messageObject.message);
        var delay = 1000; //1 seconds
        var val = jQuery("#dialogBox1").is(":visible");
        if (val === true) {
            window.clearTimeout(DialogObjTimeOutId);
        }
        setTimeout(function () {
            try {
                //your code to be executed after 1 seconds
                if (messageObject.message.trim().length !== 0) {
                    jQuery("#dialogBox1").show();
                    if (messageObject.type === "information") {
                        jQuery("#notificationClass").removeClass("modal-error-content modal-warning-content modal-info-content");
                        jQuery("#notificationClass").addClass("modal-info-content");
                        jQuery("#dialogBox1").find(".bodyMessageConfirmation").text(messageObject.message);
                        clearTimeout(DialogObjTimeOutId);
                        DialogObjTimeOutId = setTimeout(function () {
                            try {
                                jQuery("#dialogBox1").hide(1000);
                            } catch (err) {
                                console.log("Easing error" + err.message);
                            }

                        }, messageObject.timeOut);
                    }
                    if (messageObject.type === "warning") {
                        jQuery("#notificationClass").removeClass("modal-error-content modal-warning-content modal-info-content");
                        jQuery("#notificationClass").addClass("modal-warning-content");
                        jQuery("#dialogBox1").find(".bodyMessageConfirmation").text(messageObject.message);
                        clearTimeout(DialogObjTimeOutId);
                        DialogObjTimeOutId = setTimeout(function () {

                            try {
                                jQuery("#dialogBox1").hide(1000);
                            } catch (err) {
                                console.log("Easing error" + err.message);
                            }
                        }, messageObject.timeOut);
                    }
                    if (messageObject.type === "error") {
                        jQuery("#notificationClass").removeClass("modal-error-content modal-warning-content modal-info-content");
                        jQuery("#notificationClass").addClass("modal-error-content");
                        jQuery("#dialogBox1").find(".buttonContainer").children().hide();
                        jQuery("#dialogBox1").find(".bodyMessageConfirmation").css("width", "100%");
                        jQuery("#dialogBox1").find(".bodyMessageConfirmation").text(messageObject.message);
                        clearTimeout(DialogObjTimeOutId);
                        DialogObjTimeOutId = setTimeout(function () {

                            try {
                                jQuery("#dialogBox1").hide(1000);
                            } catch (err) {
                                console.log("Easing error" + err.message);
                            }
                        }, messageObject.timeOut);
                    }
                }
            } catch (err) {
                console.log("Easing Error:" + err.message);
            }
        }, delay);
    } catch (msg) {

    }
}

// Function to display Dialog message.
function displayDialog(msg, type, callbackOk, callbackCancle) {
    try {

        messageObj = new Object();
        messageObj.message = msg;
        messageObj.type = type;
        messageObj.timeOut = 2000;

        if (type === "confirmation") {
            if (callbackOk !== null && typeof callbackOk !== "undefined")
                messageObj.callbackOk = callbackOk;
            if (callbackCancle !== null && typeof callbackCancle !== "undefined")
                messageObj.callbackCancle = callbackCancle;
            confirmationDialog(messageObj);
        } else
            showDialogMessage(messageObj);
    } catch (err) {
        console.log("" + err.message);
    }
}