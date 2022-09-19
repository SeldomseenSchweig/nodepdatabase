const express = require("express");
const router = express.Router();
const db = require("../db")




router.get("/", async (req,res,next)=>{
    try {
        const results = await db.query('SELECT * FROM users');
    
        return res.json({users:results.rows})
        
    } catch (error) {
        return next(error);
    }



});

router.get('/search', async (req, res, next)=>{

    try {
        const {type} = req.query;

        const results = await db.query(`SELECT * FROM users WHERE type = $1`, [type])
        return res.json(results.rows)

    } catch (error) {
        return next(error)
    }
})
router.post('/', async (req,res,next)=>{
try {
    const {name, type} = req.body;
    const results = await db.query(`INSERT INTO users (name,type) VALUES ($1,$2) RETURNING  id, name, type`, [name,type])
    return res.status(201).json(results.rows)

} catch (error) {
    return next(error)
    
}

})

router.patch('/:id', async (req,res,next)=>{
    
    try {
        const {id} =  req.params;
        console.log(id)
        const {name, type} = req.body;
        const results = await db.query(`UPDATE users SET name=$1, type=$2 
        WHERE id = $3 
        RETURNING  id, name, type`,
        [name,type,id]);
        return res.json(results.rows[0]);
    
    } catch (error) {
        return next(error)
        
    }
    
    })

    router.get('/:id', async (req,res,next)=>{
    
        try {
            const {id} =  req.params;
            const results = await db.query(`SELECT * FROM users WHERE id = $1 
            RETURNING  id, name, type`,
            [id]);
            return res.json(results.rows[0]);
        
        } catch (error) {
            return next(error)
            
        }
        
        })


    router.delete('/:id', async (req,res,next)=>{
    
        try {
            const {id} =  req.params;
            console.log(id)
            const results = await db.query('DELETE FROM users WHERE id=$1',
            [id]);
            return res.send({msg:"deleted"});
        
        } catch (error) {
            return next(error)
            
        }
        
        })


module.exports = router;

