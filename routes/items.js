const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

//CREATE
router.post('/',async(req,res)=>{
    try{
        const newItem= new Item(req.body);
        const saved = await newItem.save();
        res.status(201).json(saved);
    } catch(err){
        res.status(400).json({message: err.message});
    }
});


//READ ALL
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ ONE
router.get('/:id',async(req,res)=>{
    try{
        const item = await Item.findById(req.params.id);
        if(!item) return res.status(404).json({message: 'Item not Found'});
        res.json(item);
    }
    catch (err){
        res.status(500).json({message: err.message});
    }
});


//UPDATE

router.put('/:id',async(req,res)=>{
    try{
        const updated = await Item.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.json(updated);
    }
    catch(err){
        res.status(400).json({message: err.message});

    }
});

//DELETE

router.delete('/:id',async(req,res)=>{
    try{
        const deleted=await Item.findByIdAndDelete(req.params.id);
        res.json({message: 'Item deleted'});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});

module.exports =router;
