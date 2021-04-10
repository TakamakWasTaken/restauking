const supportedInstruments = [
    {
      supportedMethods: ['basic-card'],
      data: {
        supportedNetworks: [
          'visa',
          'mastercard',
          'amex',
          'discover',
          'diners',
          'jcb',
          'unionpay',
        ],
      },
    },
  ];

export async function payReservation(nbPeople,pricePerPeople) {
    var details = {};
    details.total = {
        label: 'Total due',
      amount: { currency: 'EUR', value: nbPeople*pricePerPeople },
    }
    details.displayItems=[];
    for (let index = 0; index < nbPeople; index++) {
        details.displayItems.push({
            
                label: 'People',
                amount: { currency: 'EUR', value: pricePerPeople },      
        })  
    }
    const request = new PaymentRequest(supportedInstruments, details);
    try {
      const result = await request.show();
     result.complete('success');
      console.log('payReservation()',nbPeople,pricePerPeople,true);
      return true;
    } catch (error) {
        console.log('payReservation()',nbPeople,pricePerPeople,false,error);
        return false;
    }
  }