const lineReader = require('line-reader');

class UserInput{
      constructor(filename)
      {
         this.inputfile=filename;
      }
      async readFile(input){
         return lineReader.eachLine(this.inputfile, (line) => {
            var x=line.split(" ")
            input.push(x);
         })
      }
      async textinput(funds)
      { 
         var input=[]
         try{
            const fileinput= await this.readFile(input);
            setTimeout( () =>{
               this.Input(input,funds)
            }, 500)
         }
         catch(message){
            console.log(message)
         }
      }
     Input(input,funds)
     {
       for(var i=0;i<input.length;i++)
       {
         switch(input[i][0])
         {
           case "ALLOCATE":
              funds.Allocate(parseFloat(input[i][1]),parseFloat(input[i][2]),parseFloat(input[i][3]))
              break
           case "SIP":
              funds.SIP(parseFloat(input[i][1]),parseFloat(input[i][2]),parseFloat(input[i][3]))
              break
           case "CHANGE":
              funds.Change(parseFloat(input[i][1]),parseFloat(input[i][2]),parseFloat(input[i][3]),input[i][4])
              break
           case "BALANCE":
              funds.BALANCE(input[i][1])
              break
           case "REBALANCE":
              funds.REBALANCE()
              break
         }
       }
     } 
  }
module.exports={
   UserInput
}