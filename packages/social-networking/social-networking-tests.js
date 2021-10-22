import chai from 'meteor/practicalmeteor:chai';

const aliceId = 1;
const bobId = 2;
const charlieId = 3;

describe('Add Messages', function () {
  before(function () {
    Meteor.call('resetDatabase');
  });


  it('add message from Alice', function () {
    const addMessage = new Promise((resolve, reject) => {
      const msgText = "I love the weather today.";
      const date = "2021-10-22T00:30:00";
      // userId would not be passed if using a db with login
      Meteor.call('addMessage', msgText, aliceId, date, (err, id) => {
          if(err){
            reject(err);
          } else {
            resolve(id);
          }
      });
    });

    return addMessage.then(function(id){
      chai.assert.equal(id, 0);
    });
  });

  it('add message 1 from Bob', function () {
    const addMessage = new Promise((resolve, reject) => {
      const msgText = "Darn! We lost!";
      const date = "2021-10-22T00:33:00";
      Meteor.call('addMessage', msgText, bobId, date, (err, id) => {
          if(err){
            reject(err);
          } else {
            resolve(id);
          }
      });
    });

    return addMessage.then(function(id){
      chai.assert.equal(id, 1);
    });
  });

  it('add message 2 from Bob', function () {
    const addMessage = new Promise((resolve, reject) => {
      const msgText = "Good game though.";
      const date = "2021-10-22T00:34:00";
      Meteor.call('addMessage', msgText, bobId, date, (err, id) => {
          if(err){
            reject(err);
          } else {
            resolve(id);
          }
      });
    });

    return addMessage.then(function(id){
      chai.assert.equal(id, 2);
    });
  });

  it('add message from Charlie', function () {
    const addMessage = new Promise((resolve, reject) => {
      const msgText = "I'm in New York today! Anyone wants to have a coffee?";
      const date = "2021-10-22T00:35:15";
      Meteor.call('addMessage', msgText, charlieId, date, (err, id) => {
          if(err){
            reject(err);
          } else {
            resolve(id);
          }
      });
    });

    return addMessage.then(function(id){
      chai.assert.equal(id, 3);
    });
  });

});


describe('Get Messages', function () {

  it('get messages from Alice', function () {
    const getMessages = new Promise((resolve, reject) => {
      Meteor.call('getMessagesForUserIds', [aliceId], (err, messages) => {
          if(err){
            reject(err);
          } else {
            resolve(messages);
          }
      });
    });

    return getMessages.then(function(messages){
      chai.assert.equal(messages.length, 1);
      chai.assert.equal(messages[0].userId, aliceId);
      chai.assert.equal(messages[0].text, "I love the weather today.");
    });
  });

  it('get messages from all', function () {
    const ids = [aliceId, bobId, charlieId];
    const getMessages = new Promise((resolve, reject) => {
      Meteor.call('getMessagesForUserIds', ids, (err, messages) => {
          if(err){
            reject(err);
          } else {
            resolve(messages);
          }
      });
    });

    return getMessages.then(function(messages){
      chai.assert.equal(messages.length, 4);
      chai.assert.equal(messages[0].userId, charlieId);
      chai.assert.equal(messages[0].text, "I'm in New York today! Anyone wants to have a coffee?");
      chai.assert.equal(messages[1].text, "Good game though.");
      chai.assert.equal(messages[2].text, "Darn! We lost!");
      chai.assert.equal(messages[3].text, "I love the weather today.");
    });
  });
});
