
type CurrencyFormatter = {
    currency : string, 
    value : number
  }
  



export const currencyFormatter =({ currency, value} : CurrencyFormatter ) => {
    const formatter = new Intl.NumberFormat('en-US', {
      
      minimumFractionDigits: 0,
      currency
    })

    return formatter.format(value)
  }