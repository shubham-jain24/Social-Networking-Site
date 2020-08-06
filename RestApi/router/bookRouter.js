const express = require('express');


function routes(Book, Register, Session) {
    const router = express.Router();
    //To get the all post data
    router.route('/books')
        .post((req, res) => {
            const book = new Book(req.body);

            book.save();
            return res.status(201).json(book);
        })
        .get((req, res) => {
            const { query } = req;
            Book.find(query, (err, books) => {

                if (err) {
                    return res.send(err);
                }
                return res.json(books);
            });
        });
    

    //Adding Temporary Session Details 
    router.route('/session/details')
    .post((req,res) => {
        const session = new Session(req.body);

        session.save();
        return res.status(201).json(session);
    });

    router.route('/user/domain')
    .get((req,res) => {
        const ppp = JSON.stringify(Register.aggregate([
            {
                $lookup:
                {
                    from: "Book",
                    localField: "reg_email",
                    foreignField: "email",
                    as: "user_email"
                }
            }
        ]));
        console.log("****");
        console.log(ppp);
    
        // .find((err, books) =>
        // {
        //     if(err)
        //     {
        //         console.log(err);
        //     }
        //     return res.json(books);
        // });
    });




    //On Login - Getting Session Details to start the session
    router.route('/start/session/:email')
    .get((req,res) => {
        Session.find({'email': req.params.email}, (session, err) => {
            if(err)
            {
                return res.send(err);
            }
            return res.json(session);
        });
    });


    

    //On Logout - Deleting Session
    router.route('/delete/session/:id')
    .delete((req,res) => {
        Session.findById(req.params.id ,  (err, session) =>
           {
               if(err)
               {
                   console.log(err);
                   return res.send(err);
               }
               session.remove((err) => {
                   if(err)
                   {
                       return res.send(err);
                   }
                   return res.sendStatus(204);
               });
            });
    });




    //Clcik on Login Authenticating user from main user personal info database - registerModel
    router.route('/app/authenticate/:email/:password')
    .get((req, res) => {
        Register.find({'reg_email': req.params.email, 'reg_password': req.params.password }, (err,book) => 
        {
            if(err)
            {
                return res.send(err);
            }
            return res.json(book);
        });
    });


    // Signup Page - register user
    router.route('/register')
    .post((req,res) => {
        const register = new Register(req.body);
        register.save();
        return res.status(201).json(register);

    })
    .get((req, res) => {
        const { query } = req;
        Register.find(query, (err, details) => {

            if (err) {
                return res.send(err);
            }
            return res.json(details);
        });
    });




    
    //Loading Domain page based on domain selected by user
    router.route('/books/domain/:dname')
        .get((req, res) => {
            
            Book.find({"posts.domain" : req.params.dname }, (err, books) => {

                if (err) {
                    return res.send(err);
                }

                return res.json(books);
            });
        });



    //Loading Dashboard Data   - shift from Email to Id
    router.route('/dashboard/:email')
    .get((req,res) => 
    {
        Book.find({"email": req.params.email}, (err,books)=> {
            if(err)
            {
                return res.send(err);
            }

            return res.json(books);
        });
    });
    


    //Edit the post - Fetich data to load edit form then calling patch request to update changes item
    router.route('/edit/:id')
    .get((req,res) => 
    {
        Book.find({"_id": req.params.id}, (err,book)=> {
            if(err)
            {
                return res.send(err);
            }

            return res.json(book);
        });
    })
    .patch((req,res)=> {
        Book.findById(req.params.id, (err,book)=>
        {
            if(req.body._id)
            {
                delete req.body._id;
            }
            

            Object.entries(req.body).forEach((item) =>
            {
                const key = item[0];
                const value = item[1];
                book[key] = value;
            });
            console.log(book);

            book.save();
            return res.json(book);
        });
    });

    
    
    
    // router.use('/books/:bookId', (req, res, next) =>
    // {
    //     Book.findById(req.params.bookId, (err, book) => 
    //     {
    //         if (err) {
    //             return res.send(err);
    //         }
    //         if(book)
    //         {
    //             req.book = book;
    //             console.log(req.book);
    //             return next();
    //         }
    //         return res.sendStatus(404);
    //     });
    // });

    // router.route('/books/:bookId')
    //     .get((req, res) => res.json(req.book))
    //     .put((req,res) => {

    //             const {book} = req;

    //             book.title = req.body.title;
    //             book.author = req.body.author;
    //             book.genre = req.body.genre;
    //             book.read = req.body.read;
    //             req.book.save((err)=>{
    //                 if(err)
    //                 {
    //                     return res.send(err);
    //                 }
    //                 return res.json(book);
    //             });
    //         })
    //     .patch((req, res) => {
    //         const{ book } = req;
    //         if(req.body._id)
    //         {
    //             delete req.body._id;
    //         }

    //         Object.entries(req.body).forEach((item) =>
    //         {
    //             const key = item[0];
    //             const value = item[1];
    //             book[key] = value;
    //         });

    //         req.book.save((err)=>{
    //             if(err)
    //             {
    //                 return res.send(err);
    //             }
    //             return res.json(book);
    //         });
    //     });


    //Deleting a post based on post id
    router.route('/delete/:postid')
       .delete((req,res) => {
           Book.findById(req.params.postid ,  (err, book) =>
           {
               console.log(book);
               if(err)
               {
                   console.log(err);
                   return res.send(err);
               }
               book.remove((err) => {
                   if(err)
                   {
                       console.log("error2");
                       return res.send(err);
                   }
                   return res.sendStatus(204);
               });


           });
       });
   
    //Updating Vote count for post
    router.route('/like/:postid/:id')
        .post((req,res) => {
            Book.updateOne({'_id': req.params.postid},{$addToSet : { liked: [req.params.id]}}, (err, book) => {
                return res.json(book);
        });
    });

    //Adding the post liked by user to database
    router.route('/like/user/:id/:postid')
        .post((req,res) => {
            Register.updateOne({'_id': req.params.id},{$addToSet : { postlike: [req.params.postid]}}, (err, book) => {
                return res.json(book);
        });
    });


        
       return router;
}

module.exports = routes;
