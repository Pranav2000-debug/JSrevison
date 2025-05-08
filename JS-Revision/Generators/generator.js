const company = {
  //   currentEmp: 0,
  employees: ["Max", "Alice", "Anna"],
  // our own next method, not needed when we use a generator function since that has and builds its own next() method that we can use. It yields us the value and goes next()
  //   next() {
  //     if (this.currentEmp >= this.employees.length) {
  //       return { value: this.currentEmp, done: true };
  //     }
  //     const returnVal = { value: this.employees[this.currentEmp], done: false };
  //     this.currentEmp++;
  //     return returnVal;
  //   },
  // [Symbol.iterator] // .next() needed when using a func property name instead of symbol.iterator
  [Symbol.iterator]: function* employeeGenerator() {
    // let emp = company.next();
    // while (!emp.done) {
    //   yield emp.value;
    //   emp = company.next();
    // }
    let currentEmployee = 0;
    while (currentEmployee < this.employees.length) {
      yield this.employees[currentEmployee];
      currentEmployee++;
    }
  },
};

// const it = company.getEmployee;
// console.log(it.next());

for (const employee of company) {
  console.log(employee);
}
