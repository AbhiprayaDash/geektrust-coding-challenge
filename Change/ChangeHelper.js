class ChangeMethods{
     addDetail(loandetails,equityamount,debtamount,goldamount){
         Object.assign(loandetails,{equityamount,debtamount,goldamount})
         return loandetails
     }
     fetchloanDetails(loandetails)
     {
        return loandetails
     }
     percent(amount,change){
        return Math.floor(amount+amount*(change/100))
     }
     amount(amount,percent){
        return Math.floor(amount*(percent/100))
    }
     rebalancing(loandetails,balance){
        var len=balance.length
        var {totalamount}=balance[len-1];
        var result=this.fetchloanDetails(loandetails)
        var equityamount=this.amount(totalamount,result.equitypercent)
        var debtamount = this.amount(totalamount,result.debtpercent)
        var goldamount = this.amount(totalamount,result.goldpercent)
        return {equityamount,goldamount,debtamount}
     }
    addRate(loandetails,equitychange,debtchange,goldchange){
        var result=this.fetchloanDetails(loandetails)
        var equityamount=this.percent(result.equityamount,equitychange)
        var debtamount=this.percent(result.debtamount,debtchange)
        var goldamount=this.percent(result.goldamount,goldchange)
        this.addDetail(loandetails,equityamount,debtamount,goldamount)
    }
    arraypush(month,loandetails,balance){
        var {equityamount,debtamount,goldamount} = this.fetchloanDetails(loandetails)
        var totalamount=debtamount+goldamount+equityamount
        balance.push({month,equityamount,debtamount,goldamount,totalamount});
    }
}
module.exports = {
    ChangeMethods
}