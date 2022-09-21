const httpServer = require('http')
const url = require('url')
const fs  = require('fs')

///Read data from file
const tempLoan = require('./data/loan.json')
// Load replace module
const replaceTemplate = require('./modules/replaceTemplateLoan')
// read HTML template
const templateHTMLLoan = fs.readFileSync(
    `${__dirname}/template/templateLoan.html`,
    `utf-8`
)

// Req 2: Create an array of loans and add five instances of the above JavaScript objects based on the above specifications 
// Add calculatedLoanAmount to tempLoan
function loanCalculate(amount, interest, years){
    const num = (amount/(interest/12)) * (1- (1/((1+  (interest/12)) ** (years*12) )))
    const calculatedLoanAmount = Math.round(num *100) /100
    return calculatedLoanAmount
}
tempLoan.forEach(function(item){
    item.calculatedLoanAmount = loanCalculate(item.loanAmount, item.interest, item.loanTermYears)
})



// Req 3: List all the array elements with the grand total loan amount using console.log statements.
console.log(tempLoan)

const dataObj = tempLoan// convert string to json
const server = httpServer.createServer( (req,res) => { //request, response

    const {query, pathname} = url.parse(req.url, true) // object destructors
    if (query.id){// if there is query parameter named id, it will be read as string
        // Courses page
        if (pathname === '/' || pathname.toLocaleLowerCase() === '/loan') {
            res.writeHead(200, {  //Everything run successfully
                'Content-type': 'text/html'
            })

            const loan = dataObj[Number(query.id)] // convert string to numeric value
            const loanHTML = replaceTemplate(templateHTMLLoan, loan) // function that will replace the value in the HTML
            res.end(loanHTML)
        }
        else {
            res.writeHead(404, {  //Server didn't find what you are looking for
                'Content-type': 'text/html'
            })
            res.end(`Resource not found`)
        }
    }    
})

//Start listening to requests 
server.listen(8000, 'localhost', () => {
    console.log('Listening to requests on port 8000')
})