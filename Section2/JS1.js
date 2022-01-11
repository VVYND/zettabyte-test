/**
 * Direction:
 * Swap these numbers without using temporary variable
 *
 * Expected Result:
 * {
 *  a: 4,
 *  b: 2
 * }
 */
 let numbers = {
    a: 2,
    b: 4
   }
  
  function result(numbers) {
      let a = numbers.a
      let b = numbers.b
    return (
        [a,b] = [b,a]
    )
  }
   
  console.log(result(numbers));
