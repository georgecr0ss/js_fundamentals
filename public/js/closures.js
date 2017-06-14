// (function() {
    const documentUrl = `${location.port}//${location.host}:${location.port}`;

    const ajax = request => new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const { url, verb:VERB, body = null } = request;

        xhr.open(VERB, url, true);

        xhr.setRequestHeader("Contet-Type", "application/json");

        xhr.onreadystatechange = () => {
            if (xhr.readyState !== XMLHttpRequest.DONE) {
                return;
            }

            switch (0 | (xhr.status / 100)) {
                case 2:
                    if (xhr.responseText === "OK") {
                        resolve();
                    }

                    const book = JSON.parse(xhr.response).book;
                    resolve(book);

                    break;
                case 4:
                case 5:
                    reject(xhr.responseText);
                    break;
            }
        }

        xhr.send(body);
    });

    const Book = (()=>{
        let categoriesId = 1;
        let books = [];
        const handleError = err => {
            throw Error(err);
        };
        const categories = [{ id: 0, category: 'n/a'}];
        const errors = {
            bookAuthor: "Name should be non empty string",
            bookName: "Book name must be between 2 or 100 letters",
            isbn: "ISBN must be unique number",
            isbnLength: "ISBN must contain either 10 or 13 digits"
        };

        const getBooks = () => books.map(({id, isbn, categoryId, name, author}) =>({
            id, isbn, categoryId, name, author
        }));

        const getCategories = () => [...categories];

        const isUnique = type => {
            const currentType = books.map(({isbn}) => isbn);
            const hasElement = currentType.indexOf(type);

            if (hasElement === -1) {
                return true;
            }

            handleError([errors.isbn]);
        };

        const isbnLenghtValidation = value => {
            if (value.match(/\d+/) && (value.length === 10 || value.length === 13)) {
                return true;
            }

            handleError([errors.isbnLength]);
        }

        const checkISBN = value => {
            const isbn = isbnLenghtValidation(value);
            const unique = isUnique(value);

            return value;
        };

        const validateName = name => {
            if (100 > name.length && name.length > 1) {
                return name;
            }

            handleError([errors.bookName]);
        }

        const isEmpty = (author) => {
            if (author === "") {
                handleError([errors.bookAuthor]);
            }

            return author;
        };

        const getCategoryId = value => {
            const length = categories.length;

            for (let i = 0; i < length; i++) {
                const { category, id } = categories[i];

                if (category === value) {
                    return id;
                    break;
                }

            }

            return -1;
        }

        const categoryValidation = category => {
            if (category === "") {
                return 0;
            }

            let categoryId = getCategoryId(category);

            if (categoryId === -1) {
                categoryId = categoriesId++;
                categories.push({id: categoryId, category: category})
            }

            return categoryId;
        }

        const addBook = ({ author, name, isbn, category }) => {
                const bookName = validateName(name.trim());
                const bookIsbn = checkISBN(isbn.trim());
                const bookAuthor = isEmpty(author.trim());
                const bookCategoryId = categoryValidation(category.trim().toLowerCase());
                const id = Date.now().toString();

                books.push({
                    id,
                    name: bookName,
                    isbn: bookIsbn,
                    author: bookAuthor,
                    categoryId: bookCategoryId
                })
        };

        // const sort = array => {
        //      var count = array.length - 1,
        //         swap,
        //         j,
        //         i;
        //         // debugger;
        //     for (j = 0; j < count; j++) {

        //         for (i = 0; i < count; i++) {

        //             if (array[i] > array[i + 1]) {
        //                 swap = array[i + 1];
        //                 array[i + 1] = array[i];
        //                 array[i] = swap;
        //             }

        //         }
        //     }

        //     console.warn(array);
        // }
        const orderIn = {
            asc: (a, b) => {
                if (a < b) {
                    return 1;
                }
            },
            desc: (a, b) => {
                if (a > b) {
                    return 1;
                }
            }
        }
        const sortBy = filter =>{
            const filterBy = Object.keys(filter)[0];
            const orderType = filter[filterBy];

            return books.sort((a, b) => {
                const value1 = a[filterBy];
                const value2 = b[filterBy];

                return orderIn[orderType](value1, value2);
            });
        }

        return {
            addBook,
            getBooks,
            getCategories,
            sortBy
        }
    })();

    const bookInput = {
        author: "Charles Dickens",
        name: "Oliver Twist",
        category: "",
        isbn: "1268848965"
    };
    const booksToAdd = [
        {
            author: "Mark Twain",
            name: "20000 leuges under water",
            category: "adventure",
            isbn: "1265648965"
        },
        {
            author: "John Ronald Reuel Tolkien",
            name: "Lord of the rings the fellowship",
            category: "SCI",
            isbn: "1267953965101"
        },
        {
            author: "Mark Twain",
            name: "20000 leuges under water",
            category: "Novel",
            isbn: "1265898965"
        },
        {
            author: "Mark Twain",
            name: "20000 leuges under water",
            category: "",
            isbn: "1265688965"
        },
        {
            author: "Horashio",
            name: "SCI Miami",
            category: "SCI",
            isbn: "1267953965111"
        },
        {
            author: "Mark Twain",
            name: "Twilight",
            category: "Novel",
            isbn: "1265898995"
        },
    ];
    const { addBook, getCategories, getBooks, sortBy } = Book;
    addBook(bookInput);

try {
    booksToAdd.forEach(book => {
        addBook(book);
    });
} catch (error) {
    console.error(error.message);
}
    // sort([6,5,8,12,78,66])
    // console.warn(getBooks());
    // console.warn(getCategories());
    // console.warn(sortBy({'categoryId': 'desc'}));
    // console.warn('-----boook-store-------');