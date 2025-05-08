// Library Land
const uid = Symbol('uid');
console.log(uid);

const person = {
    [uid]: 'p1',
    name: 'Max',
    age: 30,
    [Symbol.toStringTag] : 'User'
};

person.id = 'p2' // should not be possible for the clients using my library. So we use a unique Symbol ID

// I as the owner/dev of the library can update the uid with -
person[uid] = 'p3'
console.log(person.toString());
