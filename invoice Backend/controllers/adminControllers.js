const pool = require('../db');

exports.addproduct = async (req,res)=>{
    const {name, price, tax} =req.body
    const blog = await pool.query("insert into products(name, price, tax) values ($1,$2,$3) returning *",[name, price, tax]);
    res.json(blog.rows[0]);
}

exports.delproduct = async (req,res)=>{
    const test = await pool.query("delete from products where id = $1",[req.params.id]);
    res.json("deleted");
}

exports.getproduct = async(req,res)=>{
    const product = await pool.query("select * from products order by id");
    res.json(product.rows);
}

exports.getblog = async(req,res)=>{
    const blog = await pool.query("select * from blogs where id = $1",[req.params.blogid]);
    res.json(blog.rows);
}

exports.updproduct = async (req,res)=>{
    const {name, price, tax} =req.body
    const updprd = await pool.query("update products set name = $1, price = $2, tax = $3 where id = ($4)", [name, price, tax,req.params.id]);
    res.json("Blog Updated");
}