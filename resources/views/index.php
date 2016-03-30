<html xmlns="http://www.w3.org/1999/xhtml">
<script id="tinyhippos-injected">if (window.top.ripple) { window.top.ripple("bootstrap").inject(window, document); }</script>
<head>
    <title>HouseLens: Code Test</title>
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,100,300,500,700,900" rel="stylesheet" type="text/css">
    <link rel="stylesheet" type="text/css" href="/codetest/public/app/css/custom.css">
    <link rel="stylesheet" type="text/css" href="/codetest/public/app/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="/codetest/public/app/css/dataTables.bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="/codetest/public/app/css/responsive.bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="/codetest/public/app/css/animate.css">
    <meta name="_token" content="{{{ Session::token() }}}" />
    <script type="text/javascript" src="/codetest/public/app/js/jquery-2.1.4.min.js"></script>
    <script type="text/javascript" src="/codetest/public/app/js/bootstrap_3.3.4.min.js"></script>
    <script type="text/javascript">
        $.noConflict();
        // Code that uses other library's $ can follow here.
    </script>
    <script type="text/javascript" src="/codetest/public/app/js/angular1.5.min.js"></script>
    <script type="text/javascript" src="/codetest/public/app/js/angular-animate.js"></script>
    <script type="text/javascript" src="/codetest/public/app/js/angular-route.min.js"></script>
    <script type="text/javascript" src="/codetest/public/app/js/Model1.js"></script>
 </head>
<body class="wide comments example dt-example-bootstrap" ng-app="crudModule">
    <a name="top" id="top"></a>
    <div class="fw-container" ng-controller="BookController">
        <h1 class="text-center">The Code Test Project</h1>
        <div class="fw-body">
            <div class="content">
                <div class="panel with-nav-tabs panel-default">
                    <div class="panel-heading">
                       <ul class="nav nav-tabs">  <!--  Author tab-->
                            <li class="active"> 
                                <a href="#tab1default" data-toggle="tab">
                                    <h2>Authors</h2>
                                </a>
                            </li>
                            <li>
                                <a href="#tab2default" data-toggle="tab">
                                    <h2>Books</h2>
                                </a>
                            </li>
                        </ul>
                    </div>
                    
                    <div class="panel-body">
                        <div class="tab-content">
                            <div class="tab-pane fade in active" id="tab1default">
                                <input type="button" class="btn btn-info pull-right authorbtn" ng-click="newAuthor()" value="Add Author" />
                                <table id="example" class="table table-striped table-bordered dt-responsive nowrap" cellspacing="0" width="100%">
                                    <thead>
                                        <tr>
                                            <th class="text-center">Thumbnail</th>
                                            <th class="text-center">Author name</th>
                                            <th class="text-center">First name</th>
                                            <th class="text-center">Last name</th>
                                            <th class="text-center">Date Added</th>
                                            <th class="text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="author_container_row" authorid="{{author.id}}" ng-repeat="author in Authors" ng-click="selectedAuthor($event,this)">
                                            <td class="text-center">
                                                <img src="/codetest/public/app/img/default_user_thumbnail.png" style="width:32px; height:32px" />
                                            </td>
                                            <td class="text-center">{{author.firstname+" "+author.lastname| ucf}}</td>
                                            <td class="text-center">{{author.firstname| ucf}}</td>
                                            <td class="text-center">{{author.lastname| ucf }}</td>
                                            <td class="text-center">{{author.created_at| dateonly}}</td>
                                            <td class="text-center">
                                                <a class="btn btn-info btn-xs" authorid="{{author.id}}" ng-click="editAuthor($event,this)">
                                                    <span class=" glyphicon glyphicon-edit"></span> Edit</a>
                                                <a class="btn btn-danger btn-xs" authorid="{{author.id}}" ng-click="deleteAuthorModel($event,this)">
                                                    <span class="glyphicon glyphicon-remove"></span> Del</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="tab-pane fade" id="tab2default">
                                <input type="button" value="Add new Book" class="btn btn-info pull-right authorbtn addbooksbtn" ng-click="newBook()" />
                                <div class="clearfix"></div>
                                <div class="row books_container">
                                    <div class="col-xs-5 col-sm-2 col-md-2 col-lg-2 text-center cardview bookdiv" ng-click="selectedBook($event,this)" ng-repeat="book in Books" id="{{book.id}}">
                                         <img src="/codetest/public/app/img/book.png" />
                                        <h3>{{book.title| ucf}}</h3>
                                        <h5>{{book.isbn| ucf}}</h5>
                                        <h6>Published on: {{book.created_at |dateonly }}</h6>
                                        <a class="btn btn-info btn-xs" data-toggle="modal" bookid="{{book.id}}" ng-click="editBook($event)">
                                            <span class="glyphicon glyphicon-edit"></span> Edit</a>
                                        <a class="btn btn-danger btn-xs" data-toggle="modal" bookid="{{book.id}}" ng-click="deleteBookModel($event)">
                                            <span class="glyphicon glyphicon-remove"></span> Del</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--Remove Author Model-->
        <div class="modal fade" id="authordelete-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header" align="center">
                        <h1>
                            Delete Author
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                            </button>
                        </h1>
                    </div>
                    <!-- Begin # DIV Form -->
                    <div class="modal-body">
                        Are you sure you want to delete this author?
                    </div>
                    <div class="modal-footer">
                        <div>
                            <button type="submit" class="btn btn-danger btn-lg btn-block" ng-click="deleteAuthor($event,this)">Delete</button>
                        </div>
                    </div>
                    <!-- End # DIV Form -->
                </div>
            </div>
        </div>
        <!-- Remove Books model-->
        <div class="modal fade" id="removebooks-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header" align="center">
                        <h1>
                            Remove books
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                            </button>
                        </h1>
                    </div>
                    <!-- Begin # DIV Form -->
                    <div class="modal-body" style="height:auto; overflow-y:auto">
                        Are you sure that you want to permanently delete this book ?
                    </div>
                    <div class="modal-footer">
                        <div>
                            <button type="submit" class="btn btn-danger btn-lg btn-block" id="deletebook" ng-click="deleteBook($event,this)">Delete</button>
                        </div>
                    </div>
                    <!-- End # DIV Form -->
                </div>
            </div>
        </div>
        <!--Associated Books-->
        <div class="modal fade" id="associatedBooks-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header" align="center">
                        <h1>
                            Associated Books
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                            </button>
                        </h1>
                    </div>
                    <!-- Begin # DIV Form -->
                    <div class="modal-body" style="height:80vh; overflow-y:auto">
                        <div class="row associatedBooksContainer books_by_author" id="associatedBooks">
                            <div class="col-xs-12">
                                <div class="row centered-form">
                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <div class="panel panel-default">
                                            <div class="panel-heading" style="background:#fff !important; border-bottom:0 !important">
                                                <div class="col-xs-12">
                                                    <input type="button" value="Add Books" class="btn btn-info addbooks pull-right addBooksBtn" divid="openaddBooksDivOpen" authorid="{{author.id}}" ng-click="AddBooks($event,this)" style="margin-top:0px">
                                                    <input type="button" value="Remove Books" class="btn btn-danger btn-block addbooks pull-right margright20 removeBooksBtn" authorid="{{author.id}}" ng-click="RemoveBooks($event,this)" style="margin-top:0px">
                                                    <input type="button" value="Remove Selected" class="btn btn-info addbooks pull-right removeSelectedBooksBtn ng-hide" authorid="{{author.id}}" ng-click="RemoveSelectedBooks($event,this)" style="margin-top:0px">
                                                    <input type="button" value="Back" class="btn btn-danger btn-block addbooks margright20 cancelBookAssociation ng-hide" authorid="{{author.id}}" ng-click="CancelBookAssociation($event,this)" style="margin-top:0px">
                                                </div>
                                                <div class="clearfix"></div>
                                            </div>
                                            <div class="panel-body">
                                                <div class="row associatedBooks">
                                                    <div class="col-xs-5 col-sm-2 col-md-2 col-lg-2 text-center cardview bookdiv" id="{{book.id}}" ng-repeat="book in authorBookAssociatedData">
                                                        <input class="book-chk bookcheckbox ng-hide" authorid="{{author.id}}" bookid="{{book.id}}" type="checkbox" />
                                                        <img src="/codetest/public/app/img/book.png" />
                                                        <h3>{{book.title| ucf}}</h3>
                                                        <h5>{{book.isbn| ucf}}</h5>
                                                        <h6>Published on: {{book.created_at |dateonly }}</h6>
                                                    </div>
                                                </div>
                                                <div class="row  noBooksAddedContainer" ng-if="authorBookAssociatedData.length==0">
                                                    <div class="col-xs-12 ">
                                                        <h6>
                                                            No books associated with this author.
                                                        </h6>
                                                    </div>
                                                </div>
                                                <div class="row ng-hide noBooksAddedContainer" ng-if="authorBookAssociatedData.length!=0">
                                                    <div class="col-xs-12 ">
                                                        <h6>
                                                            No books associated with this author.
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row DissociateBooksContainer books_by_author">
                            <div class="col-xs-12">
                                <div class="row centered-form">
                                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <div class="panel panel-default">
                                            <div class="panel-heading" style="background:#fff !important; border-bottom:0 !important">
                                                <div class="col-xs-12">
                                                    <input type="button" value="Add Books" class="btn btn-success btn-block addbooks pull-right margright20  addBooksBtn" authorid="{{author.id}}" ng-click="AddBooks($event,this)">
                                                    <input type="button" value="Remove Books" class="btn btn-danger btn-block addbooks pull-right margright20 removeBooksBtn" authorid="{{author.id}}" ng-click="RemoveBooks($event,this)">
                                                    <input type="button" value="Add Selected Books" class="btn btn-info addbooks pull-right addSelectedBooksBtn ng-hide" authorid="{{author.id}}" ng-click="AddSelectedBooks($event,this)">
                                                    <input type="button" value="Remove Books" class="btn btn-danger btn-block addbooks pull-right margright20 cancelBookAssociation ng-hide" authorid="{{author.id}}" ng-click="CancelBookAssociation($event,this)">
                                                </div>
                                                <div class="clearfix"></div>
                                            </div>
                                            <div class="panel-body">
                                                <div class="row DissociateBooks">
                                                    <div class="col-xs-5 col-sm-2 col-md-2 col-lg-2 text-center cardview bookdiv" id="{{book.id}}" ng-repeat="book in authorBookDisassociatedData">
                                                        <input type="checkbox" class="book-chk bookcheckbox ng-hide" authorid="{{author.id}}" bookid="{{book.id}}" />
                                                        <img src="/codetest/public/app/img/book.png" />
                                                        <h3>{{book.title| ucf}}</h3>
                                                        <h5>{{book.isbn| ucf}}</h5>
                                                        <h6>Published on: {{book.created_at |dateonly }}</h6>
                                                    </div>
                                                </div>
                                                <div class="row  pleaseAddNewbooks" ng-if="authorBookDisassociatedData.length==0">
                                                    <div class="col-xs-12 ">
                                                        <h6>
                                                            All Books are already associated with this author or there are no books available. Please add more books using books section to associate book with author.
                                                        </h6>
                                                    </div>
                                                </div>
                                                <div class="row ng-hide pleaseAddNewbooks" ng-if="authorBookDisassociatedData.length!=0">
                                                    <div class="col-xs-12 ">
                                                        <h6>
                                                            All Books are already associated with this author or there are no books available. Please add more books using books section to associate book with author.
                                                        </h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--delete Book Form-->
        <div class="modal fade" id="deletebook-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header" align="center">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                        </button>
                    </div>
                    <!-- Begin # DIV Form -->
                    <div class="modal-body">
                        <h1>Are you sure you want to delete this book?</h1>
                    </div>
                    <div class="modal-footer">
                        <div>
                            <button type="button" class="btn btn-danger btn-lg btn-block" id="deletebook" ng-click="deleteBook($event)">Delete</button>
                            <button type="button" class="btn btn-danger btn-lg btn-block" data-dismiss="modal" aria-label="Close">Cancel</button>
                        </div>
                    </div>
                    <!-- End # DIV Form -->
                </div>
            </div>
        </div>
        <!--Add Author Form-->
        <div class="modal fade" id="addauthor_form" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header" align="center">
                        <h1>
                            Add New Author <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                            </button>
                        </h1>
                    </div>
                    <!-- Begin # DIV Form -->
                    <!-- Begin # Login Form -->
                    <div class="modal-body">
                        <div class="add-author-div" id="newAuthorDiv">
                            <div class="row">
                                <div class="col-xs-12">
                                    <form role="form" name="authorForm" novalidate>
                                        <div class="row">
                                            <div class="col-xs-6 col-sm-6 col-md-6">
                                                <div class="form-group">
                                                    <input type="text" name="first_name" id="first_name" class="form-control input-sm" placeholder="First Name" ng-model="firstname" required>
                                                    <span style="color:red" ng-show="authorForm.first_name.$touched && authorForm.first_name.$invalid">*First name is required.</span>
                                                </div>
                                            </div>
                                            <div class="col-xs-6 col-sm-6 col-md-6">
                                                <div class="form-group">
                                                    <input type="text" name="last_name" id="last_name" class="form-control input-sm" placeholder="Last Name" ng-model="lastname" required>
                                                    <span style="color:red" ng-show="authorForm.last_name.$touched && authorForm.last_name.$invalid">*Last name is required.</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xs-12 col-sm-12 col-md-12">
                                                <div class="form-group">
                                                    <textarea class="form-control" name="email" id="email" placeholder="About the Author" ng-model="aboutme" required></textarea>
                                                    <span style="color:red" ng-show="authorForm.email.$touched && authorForm.email.$invalid">*About me is required.</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <!--<div class="col-xs-4 col-sm-2 col-md-2 col-lg-2">
                                                <input type="button" value="Add Books" class="btn btn-success btn-block addbooks">
                                            </div>-->
                                            <div class="col-xs-4 col-sm-2 col-md-2 col-lg-2 pull-right">
                                                <input type="button" value="Cancel" class="btn btn-danger btn-block" data-dismiss="modal" aria-label="Close">
                                            </div>
                                            <div class="col-xs-4 col-sm-2 col-md-2 col-lg-2 pull-right">
                                                <input type="submit" id="authorsubmit" value="Add" class="btn btn-info btn-block" ng-click="authorsave()">
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End # DIV Form -->
                </div>
            </div>
        </div>
        <!--Add Book Form-->
        <div class="modal fade" id="addbooks_form" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header" align="center">
                        <h1>
                            Add New Book <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                            </button>
                        </h1>
                    </div>
                    <!-- Begin # DIV Form -->
                    <!-- Begin # Login Form -->
                    <div class="modal-body">
                        <div class="add-author-div" id="addBooksDivOpen" style="animation-delay:0.3s">
                            <div class="row">
                                <div class="col-xs-12">
                                    <form role="form" name="bookForm">
                                        <div class="row">
                                            <div class="col-xs-6 col-sm-6 col-md-6">
                                                <div class="form-group">
                                                    <input type="text" name="Title" id="title" class="form-control input-sm" placeholder="Title" ng-model="title" required>
                                                    <span style="color:red" ng-show="bookForm.Title.$touched && bookForm.Title.$invalid">*Title is required.</span>
                                                </div>
                                            </div>
                                            <div class="col-xs-6 col-sm-6 col-md-6">
                                                <div class="form-group">
                                                    <input type="text" name="Description" id="description" class="form-control input-sm" placeholder="Description" ng-model="description" required>
                                                    <span style="color:red" ng-show="bookForm.Description.$touched && bookForm.Description.$invalid">*Description is required.</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xs-6 col-sm-6 col-md-6">
                                                <div class="form-group">
                                                    <input type="text" name="Genre" id="genre" class="form-control input-sm" placeholder="Genre" ng-model="genre" required>
                                                    <span style="color:red" ng-show="bookForm.Genre.$touched && bookForm.Genre.$invalid">*Genre is required.</span>
                                                </div>
                                            </div>
                                            <div class="col-xs-6 col-sm-6 col-md-6">
                                                <div class="form-group">
                                                    <input type="text" name="ISBN" id="isbn" class="form-control input-sm" placeholder="ISBN No" ng-model="isbn" required>
                                                    <span style="color:red" ng-show="bookForm.ISBN.$touched && bookForm.ISBN.$invalid">*ISBN is required.</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xs-4 col-sm-2 col-md-2 col-lg-2 pull-right">
                                                <input type="button" value="Cancel" class="btn btn-danger btn-block" data-dismiss="modal" aria-label="Close">
                                            </div>
                                            <div class="col-xs-4 col-sm-2 col-md-2 col-lg-2 pull-right">
                                                <input type="submit" id="booksubmit" value="Add Book" class="btn btn-info btn-block" ng-click="saveBook()">
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End # DIV Form -->
                </div>
            </div>
        </div>
    </div>
    <div id="dialogBox1">
        <div class="modal-alert">
            <div id="notificationClass" class="modal-error-content">
                <div class="modal-body bodyMessageConfirmation" id="dialogBox_body"></div>
            </div>
        </div>
    </div>
    <script type="text/javascript">
        jQuery(window).load(function () {
            jQuery("#associatedBooks-modal").on("hidden.bs.modal", function () {
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
            });
            jQuery("#addauthor_form").on("hidden.bs.modal", function () {
                angular.element('.fw-container').scope().clearAuthor();
                angular.element('.fw-container').scope().$apply();
            });
            jQuery("#authordelete-modal").on("hidden.bs.modal", function () {
                jQuery("#authordelete-modal").find(".modal-body").attr("authorid", "");
            });
            jQuery("#deletebook-modal").on("hidden.bs.modal", function () {
                jQuery("#deletebook-modal").find("#bookdelete").attr("bookid", "");
            });
            jQuery("#addbooks_form").on("hidden.bs.modal", function () {
                angular.element('.fw-container').scope().clearBook();
                angular.element('.fw-container').scope().$apply();
            });
        });
    </script>
</body>
</html>
