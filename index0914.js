const express = require('express')
const app = express()

const PORT = 9000

const courses = require('./data/data.json')

app.get('/', function(req,res){
    res.status(200).send('Welcome to IFT 458 Student Course')
})

app.get('/api/vi', function(req,res){
    res.status(200).send('Welcome to IFT 458 Student Course')
})


app.get('/api/vi/courses', function(req,res){
    res.status(200).json({
        status: 'success',
        results: courses.length,
        data: {
            courses: courses
        }
    })// send all the data
})
// get specific course

app.get('/api/vi/courses/:id', function(req,res){
    const {id} = req.params
    res.status(200).json(courses[id])
})



app.get('/api/vi/courses', function(req,res){
    const {body:newData} = req
    console.log(newData)
    const newID = courses[courses.length-1].id+1
    const newCourse = {id:newID, ...newData}
    const newList = [...courses, newCourses]
    res.status(200).json({
        status: 'success',
        results: courses.length,
        data: {
            courses: newList
        }
    })// send all the data
})


//Start listening to requests 
app.listen(PORT, 'localhost', () => {
    console.log(`Listening to requests on port ${PORT}`)
})