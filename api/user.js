const uniqid = require('uniqid')

const users = [
    {name: 'Víctor Flores', email: 'tmail@me.com', address: 'Joira 2225', phone: 11224532, id: '1'},
    {name: 'Rita Muñoz', email: 'tmail@me.com', address: 'Beiro 145', phone: 279854624, id: '2'},
    {name: 'Carmen Lorenzo ', email: 'tmail@me.com', address: 'Lusi 666', phone: 18187561, id: '3'},
    {name: 'Carmen Coto', email: 'tmail@me.com', address: 'Sarasa 542', phone: 32696541, id: '4'},
    {name: 'Danilo Quintero', email: 'tmail@me.com', address: 'Soraso 8954', phone: 12345678, id: '5'},
    {name: 'Leonor Galdames', email: 'tmail@me.com', address: 'Lala 475', phone: 12452485, id: '6'},
]

const getUser = (req, res, next) =>{
    res.json({users})
    next()
}

const postUser = (req, res, next) =>{
    let data = req.body
    data.id = `${uniqid()}`
    users.push(data)
    res.status(201).json(`recibido con el id ${data.id}`)
    next()
}

const getUserById = (req, res, next) =>{
    let user = users.find((e) => e.id === req.params.id)
    if(user ){
        res.send(user)
    }else{
        res.status(404).json('no encontramos al usuario')
    }
    next()
}

const patchUser = (req, res, next) =>{
    let newUser = req.body
    let oldUser = users.find(e => e.id === req.body.id)
    let oldIndex = users.findIndex(e => e.id === req.body.id)
    let editUser = {...oldUser, ...newUser}
    users.splice(oldIndex, 1)
    users.push(editUser)
    res.json(`Se edito el empleado con id ${req.body.id}`)
    next()
}

const deleteUser = (req, res, next) =>{
    let user = users.find(e=>e.id === req.params.id)
    let index = users.findIndex(e=>e.id === req.params.id)
    users.splice(index, 1)
    res.json(`Se elimino el empleado ${user.name} con id ${req.params.id}`)
    next()
}

module.exports = { getUser, postUser, getUserById , patchUser, deleteUser }