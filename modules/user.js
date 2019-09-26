'use strict'

const User = require('../api/user')

function getUser (req, res){
    let userId = req.params.userId

    User.findById(userId, (err, user) => {
      if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
      if (!user) return res.status(404).send({message: `Usuarix inexistente`})
   
      res.status(200).send({user: user})
    })
}

function getUsers (req, res){
User.find({}, (err, users) =>{
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!users) return res.status(404).send({message: `Usuarixs inexistente`})
res.status(200).send({users})
})
}

function saveUser (req, res){
    console.log('POST /api/user')
 console.log(req.body)

  let user = new User()
  user.firstName = req.body.firstName
  user.lastName = req.body.lastName
  user.address = req.body.address
  user.phoneNumber = req.body.phoneNumber
  user.email = req.body.email
  user.gender = req.body.gender


  user.save((err, userStored) =>{
    if (err) res.status(500).send({message: `Error al guardar en la base de datos: ${err}`})

    res.status(200).send({user: userStored})
  })
}

function updateUser (req, res){
    let userId = req.params.userId
    let update = req.body
  
    User.findByIdAndUpdate(userId, update, (err, userUpdated) =>{
      if (err) res.status(500).send({message: `Error al actualizar usuarix: ${err}`})
      res.status(200).send({user: userUpdated})
    })
}

function deleteUser (req, res){
    let userId = req.params.userId

    User.findById(userId, (err, user) => {
      if (err) res.status(500).send({message: `Error al eliminar usuarix: ${err}`})
  
      user.remove(err =>{
        if (err) res.status(500).send({message:`Error al eliminar usuarix: ${err}`})
        res.status(200).send({message: `Usuarix eliminadx`})
      })
    })
}

module.exports = {
    getUser,
    getUsers,
    saveUser,
    updateUser,
    deleteUser
}