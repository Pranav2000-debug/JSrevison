const company = {
    currentEmp: 0,
    employees: ['Max', 'Alice', 'Anna'],
    // iterator function
    next() {
        if(this.currentEmp >= this.employees.length){
            return {value: this.currentEmp, done:true};
        }
        const returnVal = {value: this.employees[this.currentEmp], done: false};
        this.currentEmp++;
        return returnVal;
    },
};
// console.log(company.next());
// console.log(company.next());
// console.log(company.next()); 
// console.log(company.next()); 
// console.log(company.next()); 

// Can loop over certain properties part of the object using a dynamic while loop
let emp = company.next();
while(!emp.done) {
    console.log(emp.value);
    emp = company.next();
}