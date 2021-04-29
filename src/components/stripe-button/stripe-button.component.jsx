import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) =>{
    const priceForStripe = price*100;
    const publishableKey = 'pk_test_51IlQFvFEsHFR3kpM3dCCjJVaR7nqvAANEJ62Aa7GuE2coCfvPfWLkGdRHfFx5Q5eUETHyiNw4n00ijbfOtOkBTeW002FBlVeoD';

    const onToken = token =>{
        console.log(token);
        alert('Payment Succesful!');
    };


    return(
        <StripeCheckout
        label='Pay Now'
        name='CRWN Clothing Ltd.'
        billingAddress
        shippingAddress
        image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ35uqu_9GmKCW-NNk5HlxK6cIEw8-lqnRjaQ&usqp=CAU'
        description={`Your total is $${price}`}
        amount={priceForStripe}
        panelLabel='Pay Now'
        token={onToken}
        stripeKey={publishableKey}
        
        />

    )
};


export default StripeCheckoutButton;