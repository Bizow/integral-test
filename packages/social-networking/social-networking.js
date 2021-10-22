//export const Messages = new Mongo.Collection('messages');
let messages = [];

Meteor.methods({
    resetDatabase(){
        messages = [];
    },
    addMessage(message, userId, dateOverride){
        const date = dateOverride ? dateOverride : new Date().toISOString();
        //const userId = Meteor.userId();
        //throw new Meteor.Error(401,'Unauthorized'); //simulate not logged in
        //const msgId = Messages.insert(msg);
        const msgId = messages.length;
        const msg = {
            userId,
            date,
            id: msgId,
            text: message
        };
        messages.push(msg);
        return msgId;
    },
    getMessagesForUserIds(ids) {
        // Messages.find({userId: {$in: ids}}, {sort: {date: -1}});
        const userMessages = messages.filter(({ userId }) => ids.includes(userId));
        return userMessages.sort((a, b) => (a.date > b.date) ? -1 : ((a.date < b.date) ? 1 : 0));
    }
});

export const name = 'social-networking';
