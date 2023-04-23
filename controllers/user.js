const mongoose = require('mongoose');
const model = require('../models/user')
const express = require('express');
const routerr = express.Router();


const allUsers = async (req, res, next) =>{
    const user = await model.find();
    res.status(200).send(user);
}

const getUserById = async (req, res, next) =>{
    let id = req.params.id;
    let result = await model.findById(id);
    if(result === null){
        res.status(451).json({message: "Not found dupa", httpStatus: 451});
    }else{
        res.status(200).send(result);
    }
}

const addUser = async (req, res, next) =>{
    let body = req.body;
    if(body){
        let NewUser = new model(req.body)
        await NewUser.save();
        res.status(201).send(NewUser)
    }else{
        res.status(451).json({message: "Cannot add empty ", httpStatus: 451});
    }
}

const deleteUser = async (req, res, next) =>{
    let id = req.params.id;
    await model.findByIdAndDelete(id);
    res.status(204).send();
}

const editUser = async (req, res, next) =>{
    let id = req.params.id;
    let edit = await model.findByIdAndUpdate(id, req.body);
    res.status(204).send();
}
/*
routerr.get('/', allUsers);
routerr.get('/:id', getUserById);
routerr.post('/', addUser);
routerr.delete('/:id', deleteUser);
routerr.patch('/:id', editUser);

module.exports = routerr;*/

module.exports = {
    allUsers,
    getUserById,
    addUser,
    deleteUser,
    editUser
  };

