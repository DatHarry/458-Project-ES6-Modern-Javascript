// Student CChang

const data = require('./data/data.json')

// console.log(data)

data.forEach(function(item){
    console.log('*'.repeat(20))
    console.log(item)
    item.Love = 'Harry'
    item.IFT458 = 'Summer'
    item.payment = (val)=>{
        return item.credits * val
    }
})

// data.forEach(function(item){
//     console.log('*'.repeat(20))
//     console.log(item)
// })

data.forEach(function(item){
    const {id, image} = item
    console.log(`id = ${id}`)
    console.log(`image = ${image}`)

})
