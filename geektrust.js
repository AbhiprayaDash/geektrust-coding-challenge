const {ChangeMethods} = require('./Change/ChangeHelper')
const {UserInput} = require('./Input/input') 
const {AllocateMethods} = require('./Allocate/allocateHelper')
const {RebalancedAmount} = require('./Rebalance/Rebalance_helper')
var HalfYear=6
var Fullyear=12
var RebalanceMonth1='JUNE'
var RebalanceMonth2='DECEMBER'
var StartMonth='JANUARY'
class Funds{
    constructor(balance,debtdetails){
          this.balance=balance,
          this.loandetails=debtdetails
    }
    Allocate(equity,debt,gold)
    {
        //array which contains debt details
        const Allocate = new AllocateMethods()
        const percent = Allocate.Percent(equity,debt,gold)
        const details={
            equityamount:equity,
            debtamount:debt,
            goldamount:gold,
            sipequity:0,
            sipdebt:0,
            sipgold:0,
            equitypercent:percent.equitypercent,
            debtpercent:percent.debtpercent,
            goldpercent:percent.goldpercent
        }
        Object.assign(this.loandetails,details)
    }
    //change function is % change in equityamount,debtamount and goldamount
    Change(equitychange,debtchange,goldchange,month)
    {
        var changefunc= new ChangeMethods()
        if(month!==StartMonth)
        {
            //addSIP for add SIP to amount
            var {equityamount,debtamount,goldamount,sipdebt,sipequity,sipgold} = this.loandetails
            //adding SIP
            equityamount+=sipequity
            debtamount+=sipdebt
            goldamount+=sipgold;
            changefunc.addDetail(this.loandetails,equityamount,debtamount,goldamount)
            //addRateofChange to the amounts 
            changefunc.addRate(this.loandetails,equitychange,debtchange,goldchange)
            changefunc.arraypush(month,this.loandetails,this.balance)
            if(month===RebalanceMonth1||month===RebalanceMonth2)
            {
                var {equityamount,debtamount,goldamount}=changefunc.rebalancing(this.loandetails,this.balance)
                var len=this.balance.length
                this.balance[len-1]={equityamount,debtamount,goldamount}
                changefunc.addDetail(this.loandetails,equityamount,debtamount,goldamount)
            }
        }
        //no SIP is added in january
        else if(month===StartMonth){
            changefunc.addRate(this.loandetails,equitychange,debtchange,goldchange,month)
            changefunc.arraypush(month,this.loandetails,this.balance)
        }
        else{
            console.log('No investment is done');
        }
    }
    //function for SIP command
    SIP(sipequity,sipdebt,sipgold)
    {
        Object.assign(this.loandetails,{sipequity,sipdebt,sipgold})
    }
    //Function for BALANCE command
    BALANCE(month)
    {

        var balancedetails=this.balance.find((monthname)=>{
              return monthname.month===month;
        })
        console.log(balancedetails.equityamount,balancedetails.debtamount,balancedetails.goldamount);
    }

    //Function for REBALANCE command
    REBALANCE()
    {
        if(this.balance.length>=HalfYear&&this.balance.length<Fullyear)
        {
            RebalancedAmount(HalfYear-1,this.balance)
        }  
        else if(this.balance.length>=Fullyear)
        {
            RebalancedAmount(Fullyear-1,this.balance)   
        }
        else{
            console.log('CANNOT_REBALANCE')
        }
    }
}
    
const main = (inputfile) => {
    let funds=new Funds([],{});
    let userinput=new UserInput(inputfile);
    userinput.textinput(funds)
}


main(process.argv[2])