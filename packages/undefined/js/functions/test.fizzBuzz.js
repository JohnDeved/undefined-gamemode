class FizzBuzz {
  constructor () {
    this.con = {}
    this.con.Fizz = num => num % 3 === 0
    this.con.Buzz = num => num % 5 === 0
    this.con.Lozz = num => num % 8 === 0
  }

  run (num = 100) {
    for (let i = 1; i <= num; i++) {
      let log = ''
      for (var key in this.con) {
        if (this.con[key](i)) {
          log += key
        }
      }
      if (log === '') log += i
      console.log(log)
    }
  }
}

new FizzBuzz().run()
