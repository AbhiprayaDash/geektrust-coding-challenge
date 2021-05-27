const RebalancedAmount = (month,balance)=>{
    var {equityamount,debtamount,goldamount}=balance[month];
    console.log(equityamount,debtamount,goldamount)
}
module.exports = {RebalancedAmount}