const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require('../src/math')

test('Should calculate total with tip', () => {
    const total = calculateTip(10,0.3);
    expect(total).toBe(13);
})

test('Should calculate default with tip',()=>{
    const total = calculateTip(10)
    expect(total).toBe(12.5);
})

test('Should calculate C in F',()=>{
    expect(celsiusToFahrenheit(0)).toBe(32);
})

test('Should calculate F in C',()=>{
    expect(fahrenheitToCelsius(32)).toBe(0);
})


// test('Async test demo', (done)=>{
//     setTimeout(()=>{
//         expect(1).toBe(2);
//         done();
//     },2000)
    
// })

test('Testing async await and adding 2 numbers',(done)=>{
    add(2,5).then((sum) => {
        expect(sum).toBe(7);
        done();
    })
})

test('Testing async await ', async ()=>{
    const sum = await add(10,20)
    expect(sum).toBe(30) ;
})
//using assert in place of condidtional logic
// if(total!==13){
    //     throw new Error('Totoal tip should be 13. Got ' + total);
    // }