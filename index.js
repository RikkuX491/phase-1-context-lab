/* Your Code Here */

function createEmployeeRecord(employeeDataArray){
    const [firstName, familyName, title, payPerHour] = employeeDataArray

    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrayOfEmployeeDataArrays){
    return arrayOfEmployeeDataArrays.map(employeeDataArray => {
        return createEmployeeRecord(employeeDataArray)
    })
}

function createTimeInEvent(dateStamp){
    const [date, hour] = dateStamp.split(' ')

    const timeInEvent = {
        type: "TimeIn",
        hour: parseInt(hour),
        date
    }

    this.timeInEvents.push(timeInEvent)
    return this
}

function createTimeOutEvent(dateStamp){
    const [date, hour] = dateStamp.split(' ')

    const timeOutEvent = {
        type: "TimeOut",
        hour: parseInt(hour),
        date
    }

    this.timeOutEvents.push(timeOutEvent)
    return this
}

function hoursWorkedOnDate(date){
    const timeInEventOnDate = this.timeInEvents.find(timeInEvent => {
        return timeInEvent.date === date
    })
    const timeOutEventOnDate = this.timeOutEvents.find(timeOutEvent => {
        return timeOutEvent.date === date
    })

    return Math.floor((timeOutEventOnDate.hour - timeInEventOnDate.hour) / 100)
}

function wagesEarnedOnDate(date){
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(employee => {
        return employee.firstName === firstName
    })
}

function calculatePayroll(employeeRecordsArray){
    return employeeRecordsArray.reduce((accumulator, employee) => {
        return accumulator + allWagesFor.call(employee)
    }, 0)
}