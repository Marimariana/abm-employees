const printUsers = (users) =>{
    const container = document.getElementById('container')
    users.forEach(e=>{
        let profile = document.createElement('div')
        profile.classList.add('profile')
        let profilEdit = document.createElement('div')
        profilEdit.classList.add('profile-edit')
        let a = document.createElement('a')
        let h4 = document.createElement('h4')
        let p = document.createElement('p')

        profilEdit.appendChild(profile)

        h4.appendChild((e.users.name))
        p.appendChild((e.users.email))
        p.appendChild((e.users.address))
        p.appendChild((e.users.phone))

        const edit = document.createElement('a')
        edit.appendChild(createBtn(e.id, 'edit', `<i class="fas fa-tools" title="Delete">&#xE872;</i>`))
       a.appendChild(h4)
       a.appendChild(p)
       profilEdit.appendChild(edit)
       profile.appendChild(profilEdit)
       profile.appendChild(a)
       container.appendChild(profile)
    })
}

const initialize = () =>{
    cleanDiv()
    fetch('/api/user')
        .then(res => res.json())
        .then(res => printUsers(res.users))
}

const cleanDiv = () =>{
    const div = document.getElementById('container')
    div.innerHTML = ''
}

const addUser = () =>{
    let name = document.getElementById('name').value
    let email = document.getElementById('email').value
    let address = document.getElementById('address').value
    let phone = document.getElementById('phone').value
    switch(validateForm(name, email, address, phone)){
        case true:
            let user = {
                name: name,
                email: email,
                address: address,
                phone: phone
            }
            fetch('/api/user', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(user)
            })
                .then(res=>res.json())
                .then(res=>{
                    console.log(res)
                    initialize()
                }) 
            break
        case 'invalidName':
            inputErrorMessage('nameError', 'name')
            break
        case 'invalidEmail':
            inputErrorMessage('emailError', 'e-mail')
            break
        case 'invalidAddress':
            inputErrorMessage('addressError', 'address')
            break
        case 'invalidPhone':
            inputErrorMessage('phoneError', 'phone')
            break
    }
}

const validateForm = (name, email, address, phone) =>{
    if(validateName(name)){
        if(validateEmail(email)){
            if(validateAddress(address)){
                if(validatePhone(phone)){
                    return true
                }else{
                    return 'invalidPhone'
                }
            }else{
                return 'invalidAddress'
            }
        }else{
            return 'invalidEmail'
        }
    }else{
        return 'invalidName'
    }
}

const validateName = (name) =>{
    if(name.length > 3 && name.length < 25 && name !== ''){
        return true
    }else{
        return false
    }
}

const validateEmail = (email) =>{
    const re = /\S+@\S+\.\S+/
    return re.test(email)
}

const validateAddress = (address) =>{
    if(address !== ''){
        return true
    }else{
        return false
    }
}

const validatePhone = (phone) =>{
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    return re.test(phone)
}

const inputErrorMessage = (containerId, inputElement) =>{
    const container = document.getElementById(containerId)
    container.innerText = `Invalid ${inputElement}`
}

const searchUser = () =>{
    let input = document.getElementById('search').value
    fetch(`/api/user/${input}`)
        .then(res => res.json())
        .then(res=>console.log(res))
}

const filterById = () =>{
    innerHTMLCleaner('idNotFound')
    const filter = document.getElementById('filter').value
    fetch(`/api/user/${filter}`)
        .then(res => res.json())
        .then(res => {
            if(typeof res === 'object'){
                inputCleaner('filter')
                cleanDiv()
                oneObjectTable(res)
            }else{
                filterError(res)
            }
        })

}

const inputCleaner = (inputId) =>{
    const input = document.getElementById(inputId)
    input.value = ''
}

const innerHTMLCleaner = (elementId) =>{
    const element = document.getElementById(elementId)
    element.innerHTML = ''
}

const filterError = (text) =>{
    const container = document.getElementById('idNotFound')
    container.innerText = text
}

/*const deleteUser = (id) =>{
    fetch(`/api/user/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
    })
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
            initialize()
        })
}
*/