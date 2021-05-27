const {ChangeHelper} =require('../Change/ChangeHelper') 
class AllocateMethods
{
    Amount(amount,totalamount)
    {
      return Math.round((amount/totalamount)*100)
    }
    Percent(equity,debt,gold){
      var totalamount=equity+debt+gold
      var equitypercent=this.Amount(equity,totalamount)
      var debtpercent=this.Amount(debt,totalamount)
      var goldpercent=this.Amount(gold,totalamount)
      return {equitypercent,debtpercent,goldpercent}
    }
}
module.exports = {AllocateMethods}