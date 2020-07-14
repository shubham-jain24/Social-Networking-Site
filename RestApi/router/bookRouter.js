const express = require('express');

function routes(Book, Check) {
    const router = express.Router();
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

    router.route('/app/authenticate')
    .post((req, res) => {
        const authcheck = new Check(req.body);
        console.log(authcheck);
        Book.find({'_id': authcheck.postid, 'email': authcheck.email, 'password': authcheck.password }, (err,books) => 
        {
            if(err)
            {
                return res.send(err);
            }
            if(Object.keys(books).length)
            {
                console.log(books);
                return res.send('success');
            }            
            return res.send('failed');
        });
    });


    

    router.route('/books/domain/:dname')
        .get((req, res) => {
            
            Book.find({"posts.domain" : req.params.dname }, (err, books) => {

                if (err) {
                    return res.send(err);
                }

                return res.json(books);
            });
        });

    
    

    
    
    
    router.use('/books/:bookId', (req, res, next) =>
    {
        Book.findById(req.params.bookId, (err, book) => 
        {
            if (err) {
                return res.send(err);
            }
            if(book)
            {
                req.book = book;
                console.log(req.book);
                return next();
            }
            return res.sendStatus(404);
        });
    });

    router.route('/books/:bookId')
        .get((req, res) => res.json(req.book))
        .put((req,res) => {

                const {book} = req;

                book.title = req.body.title;
                book.author = req.body.author;
                book.genre = req.body.genre;
                book.read = req.body.read;
                req.book.save((err)=>{
                    if(err)
                    {
                        return res.send(err);
                    }
                    return res.json(book);
                });
            })
        .patch((req, res) => {
            const{ book } = req;
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

            req.book.save((err)=>{
                if(err)
                {
                    return res.send(err);
                }
                return res.json(book);
            });
        });

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

    router.route('/post/:id/:votecount')
       .put((req,res) => {
           console.log("123");
           Book.updateOne({ '_id': req.params.id}, { 'posts.postupvote' : Number(req.params.votecount)+1 }, (err, result) =>
           {
               
               if(err)
               {
                   console.log(err);
                   return res.send(err);
               }
               return res.json(result);
           })
   
       });
   
       


        
       return router;
}
module.exports = routes;
