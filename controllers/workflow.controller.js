import {createRequire} from 'module';
import dayjs from 'dayjs';
import Subscription from '../models/subscription.model.js';
const require = createRequire(import.meta.url);
const {serve} = require('@upstash/workflow/express');

const REMINDERS = [7, 5, 2, 1];

// function to send reminders
// create main workflow that can pause/resume
export const sendReminders = serve(async (context) =>{
    const{subscriptionId} = context.requestPayload;
    // get subscription data
    const subscription = await fetchSubscription(context, subscriptionId);

    // don't send reminder
    if(!subscription || subscription.status != 'active') return;

    const renewalDate = dayjs(subscription.renewalDate);

    if(renewalDate.isBefore(dayjs())){
        console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow.`);
        return;
    }
    // when in workflow
    for(const daysBefore of REMINDERS){
        // ie. renewal date = feb 22 => reminder date = feb 15, 17, 20, 21
        const reminderDate = renewalDate.subtract(daysBefore, 'day');

        // current date is before reminder date -> wait to fire notification
        if(reminderDate.isAfter(dayjs())){
            await sleepUnitlReminder(context, `Reminder ${daysBefore} days before`, reminderDate);
        }
        await triggerReminder(context, `Reminder ${daysBefore} days before`);
    }
});

const fetchSubscription = async(context, subscriptionId) =>{
    return await context.run('get subscription', async () => {
        // creates user field in database with attributes of name and email, _id is always included
        return Subscription.findById(subscriptionId).populate('user', 'name email');
    })
}

const sleepUnitlReminder = async(context, label, date) => {
    console.log(`Sleeping until ${label} reminder at ${date}`);
    await context.sleepUntil(label, date.toDate());
}

const triggerReminder = async(context, label) => {
    return await context.run(label, ()=>{
        console.log(`Triggering ${label} reminder`);
        // send email, SMS, push notification...
    })
}