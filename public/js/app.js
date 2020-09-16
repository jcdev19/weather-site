console.log('client side js loaded')

fetch('http://localhost:3000/weather?address=!').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error)
        }else {
        console.log(data)
        }
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const message = document.querySelector('#message-one')
// const messageOne = document.querySelector('#message-one')

weatherForm.addEventListener('submit', (e, ) => {
    e.preventDefault()
    const location = search.value
    console.log(location)
    message.textContent = 'Loading...'

    fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error)
            message.textContent = data.error
        }else {
        console.log(data)
        console.log(data.forecast)
        console.log(data.location)
        message.textContent = data.location + ' ' + data.forecast
        }
    })
})
})