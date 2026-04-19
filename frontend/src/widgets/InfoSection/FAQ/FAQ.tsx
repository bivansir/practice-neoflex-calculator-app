import { Accordion, type AccordionItem } from "@/shared/Accordion/Accordion"
import './faq.css'

const IssuingAndRecievingItems: AccordionItem[] = [
    {
        id: 1,
        title: 'How to get a card?',
        description: 
        `We will deliver your card by courier free of charge.
        Delivery in Moscow and St. Petersburg - 1-2 working days.
        For other regions of the Russian Federation - 2-5 working days.`
    },
    {
        id: 2,
        title: 'What documents are needed and how old should one be to get a card?',
        description: 
        `Need a passport. You must be between 20 and 70 years old.`
    },
    {
        id: 3,
        title: 'In what currency can I issue a card?',
        description: 
        `In rubles, dollars or euro.`
    },
    {
        id: 4,
        title: 'How much income do I need to get a credit card?',
        description: 
        `To obtain a credit card, you will need an income of at least 25,000 rubles per month after taxes.`
    },
    {
        id: 5,
        title: 'How do I find out about the bank\'s decision on my application?',
        description: 
        `After registration, you will receive an e-mail with a decision on your application.`
    }
];

    const UsingACreditCardItems: AccordionItem[] = [
    {
        id: 1,
        title: 'What is an interest free credit card?',
        description: 
        `A credit card with a grace period is a bank card with an established credit limit,
        designed for payment, reservation of goods and services, as well as for receiving cash,
        which allows you to use credit funds free of charge for a certain period.`
    },
    {
        id: 2,
        title: 'How to activate a credit card',
        description: 
        `You can activate your credit card and generate a PIN code immediately
         after receiving the card at a bank branch using a PIN pad.`
    },
    {
        id: 3,
        title: 'What is a settlement date?',
        description: 
        `The settlement date is the date from which you can pay off the debt for the reporting period.
        The settlement date falls on the first calendar day following the last day of the reporting period.
        The first settlement date is reported by the bank when transferring the issued credit card to the client,
        and then in the monthly account statement.`
    },
    {
        id: 4,
        title: 'What do I need to know about interest rates?',
        description: 
        `For each reporting period from the 7th day of the previous month to the 6th day of the current month inclusive,
        a statement is generated for the credit card.
        The statement contains information on the amount and timing of the minimum payment,
        as well as the total amount of debt as of the date of issue.`
    },
];

export const FAQ = () => {
    return (
        <div className='FAQ'>
            <h2 className='FAQ__title text text--comfortable'>Issuing and receiving card</h2>
            <Accordion items={IssuingAndRecievingItems} />
            <h2 className='FAQ__title text text--comfortable'>Using a credit card</h2>
            <Accordion items={UsingACreditCardItems} />
        </div>

    )
}