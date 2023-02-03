
const mysql=require('mysql')

// view Users 

// connect pool

const pool= mysql.createPool({
    connectionLimit:100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database:process.env.DB_NAME

});

exports.view=(req,res)=>{

    //connect DB
    pool.getConnection( (err,connection)=>{
        if(err)throw err // not connected
        console.log("Conected as ID " + connection.threadId )

        //User The Connection

        connection.query(' SELECT * FROM user ', (err ,rows)=>{
            //when done width the connection , release it 
            connection.release()
            
            if(!err){
                res.render('home' ,{ row: rows} )
            }else{
                console.log(err)
            }

            console.log("the data from user table \n" ,rows)

        } );

    })

}

// find User by Search
exports.find=(req,res)=>{

      //connect DB
    pool.getConnection( (err,connection)=>{
        if(err)throw err // not connected
        console.log("Conected as ID " + connection.threadId )

        let searchBtn= req.body.search

        //User The Connection
        connection.query(' SELECT * FROM user WHERE prenom LIKE ? OR name LIKE ? ', ['%' + searchBtn + "%" , '%' + searchBtn + "%"  ] , (err ,rows)=>{
            //when done width the connection , release it 
            connection.release()
            
            if(!err){
                res.render('home' ,{ row: rows} )
            }else{
                console.log(err)
            }

            console.log("the data from user table \n" ,rows)

        } );

    })


}

exports.form=(req,res)=>{

    res.render('adduser'  )

}

    // Add New User

exports.create=(req,res)=>{

    const { first_name, last_name, phone, email, comment }= req.body

       //connect DB
       pool.getConnection( (err,connection)=>{
        if(err)throw err // not connected
        console.log("Conected as ID " + connection.threadId )

        //User The Connection
        connection.query('INSERT INTO user SET prenom=?,name=?,email=?,phone=?,comments=? ', [first_name,last_name,email,phone,comment] , (err ,rows)=>{
            //when done width the connection , release it 
            connection.release()
            
            if(!err){
                res.render('adduser', { success: 'User added successfully.' } )
            }else{
                console.log(err)
            }

            console.log("the data from user table \n" ,rows)

        } );

    })


}

exports.edit=(req,res)=>{

    

     //connect DB
     pool.getConnection( (err,connection)=>{
        if(err)throw err // not connected
        console.log("Conected as ID " + connection.threadId )

        //User The Connection

        connection.query(' SELECT * FROM user WHERE id=? ' ,[req.params.id], (err ,rows)=>{
            //when done width the connection , release it 
            connection.release()
            
            if(!err){
                res.render('edituser' ,{ row: rows} )
            }else{
                console.log(err)
            }

            console.log("the data from user table \n" ,rows)

        } );

    })


}
// update user
exports.update=(req,res)=>{

    //connect DB
    const { first_name, last_name, phone, email, comment }= req.body

    pool.getConnection( (err,connection)=>{
       if(err)throw err // not connected
       console.log("Conected as ID " + connection.threadId )

       //User The Connection

       connection.query(' UPDATE user SET prenom=? , name=? , email=?, phone=? , comments=? WHERE id=?' ,[first_name,last_name,email,phone,comment,req.params.id ], (err ,rows)=>{
           //when done width the connection , release it 
           connection.release()
           
           if(!err){
               
            

                     //connect DB
                    pool.getConnection( (err,connection)=>{
                        if(err)throw err // not connected
                        console.log("Conected as ID " + connection.threadId )

                        //User The Connection

                        connection.query(' SELECT * FROM user ', (err ,rows)=>{
                            //when done width the connection , release it 
                            connection.release()
                            
                            if(!err){
                                res.render('home' ,{ row: rows} )
                                // res.render('home')
                            }else{
                                console.log(err)
                            }

                            console.log("the data from user table \n" ,rows)

                        } );

                    })


           }else{
               console.log(err)
           }

           console.log("the data from user table \n")

       } );

   })


}

    // delete User
exports.delete=(req,res)=>{

    

    //connect DB
    pool.getConnection( (err,connection)=>{
       if(err)throw err // not connected
       console.log("Conected as ID " + connection.threadId )

       //User The Connection

       connection.query(' DELETE FROM user WHERE id=? ' ,[req.params.id], (err ,rows)=>{
           //when done width the connection , release it 
           connection.release()
           
           if(!err){
               res.redirect("/")
           }else{
               console.log(err)
           }

           console.log("the data from user table \n" ,rows)

       } );

   })
}

// viwe one user 

exports.viewOne=(req,res)=>{

      //connect DB
      pool.getConnection( (err,connection)=>{
        if(err)throw err // not connected
        console.log("Conected as ID " + connection.threadId )

        //User The Connection

        connection.query(' SELECT * FROM user WHERE id=? ', [req.params.id], (err ,rows)=>{
            //when done width the connection , release it 
            connection.release()
            
            if(!err){
                res.render('viewUser' ,{ row: rows} )
            }else{
                console.log(err)
            }

            console.log("the data from user table \n" ,rows)

        } );

    })


}