const {ChangeMethods}=require('../Change/ChangeHelper');
const {AllocateMethods}=require('../Allocate/AllocateHelper')
const Allocate = new AllocateMethods();
const change = new ChangeMethods();
test('display percentage of each loan',()=>{
    const per1=Allocate.Percent(6000,3000,1000)
    expect(per1).toEqual({equitypercent:60,debtpercent:30,goldpercent:10})
    const per2=Allocate.Percent(15000,3000,12000);
    expect(per2).toEqual({equitypercent:50,debtpercent:10,goldpercent:40})
    const per3=Allocate.Percent(8000,6000,3500);
    expect(per3).toEqual({equitypercent:46,debtpercent:34,goldpercent:20})
})
test('calculate PercentAmount',()=>{
    expect(Allocate.Amount(6000,10000)).toBe(60)
    expect(Allocate.Amount(15000,30000)).toBe(50)
    expect(Allocate.Amount(8000,17500)).toBe(46)
})
test('Add detail',()=>{
    var debtdetails={
        equityamount:0,
        debtamount:0,
        goldamount:0
    }
    expect(change.addDetail(debtdetails,6000,3000,1000)).toEqual({equityamount:6000,debtamount:3000,goldamount:1000})
    expect(change.addDetail(debtdetails,8000,3000,4000)).toEqual({equityamount:8000,debtamount:3000,goldamount:4000})
})
test('Calculate percent',()=>{
    expect(change.percent(5000,10)).toBe(5500)
    expect(change.percent(50000,10)).toBe(55000)
    expect(change.percent(30000,10)).toBe(33000)
})
test('Calculate amount',()=>{
    expect(change.amount(10000,10)).toBe(1000)
    expect(change.amount(20000,10)).toBe(2000)
    expect(change.amount(15000,10)).toBe(1500)
})
test('ArrayPush',()=>{
    debtdetails={
        equityamount:6000,
        debtamount:3000,
        goldamount:1000,
    }
    balance=[]
    change.arraypush('June',debtdetails,balance)
    var {month,equityamount,debtamount,goldamount,totalamount}=balance[0]
    expect({month,equityamount,debtamount,goldamount,totalamount}).toEqual({month:"June",equityamount:6000,debtamount:3000,goldamount:1000,totalamount:10000})
    debtdetails.equityamount=5000
    balance=[]
    change.arraypush('May',debtdetails,balance)
    var {month,equityamount,debtamount,goldamount,totalamount}=balance[0]
    expect({month,equityamount,debtamount,goldamount,totalamount}).toEqual({month:"May",equityamount:5000,debtamount:3000,goldamount:1000,totalamount:9000})
})
