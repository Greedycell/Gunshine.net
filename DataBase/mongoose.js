const mongoose = require('mongoose');
const config = require('../config.json');

module.exports = class DataBase {
    constructor() { }
    connect(isSuccess) {
        mongoose.connect(`mongodb://${config.Database.Password ? `${config.Database.Password}:` : ''}${config.Database.Host}/${config.Database.Name}`)
        .then(() => {
            require('./models/players');
            this.mongoosePlayers = mongoose.model('players');
            isSuccess(true);
        })
        .catch(function (error) {
            console.log(error);
            isSuccess(false);
        });
    }
    disconnect() {
        mongoose.disconnect()
        .then(result => {
            console.log(`Successfully disconnected from the database`, result);
        })
        .catch(error => {
            console.log(`An error occoured disconnecting from the database`, error);
        });
    }
    getPlayer(device, callback) {
        this.mongoosePlayers.findOne({
            Email: device.userObject.email,
            PasswordHash: device.userObject.passwordHash
        })
        .then(player => {
            if (player) {
                callback(false, player);
            } else {
                // if (device.userObject.token === '') {
                    this.mongoosePlayers.findOne({})
                        .sort({
                            lowID: 'desc'
                        })
                        .then(lastPlayer => {
                            generateToken(28, newToken => {
                                this.mongoosePlayers.create({
                                    highID: 0,
                                    lowID: lastPlayer ? (lastPlayer.lowID + 1) : 1,
                                    token: newToken
                                })
                                    .then(createdPlayer => {
                                        callback(false, createdPlayer);
                                    });
                            });
                        });
                // }
                /* else {
                    let LoginFailed = new global.MessageFactory.serverMessages.LoginFailed(this.device, 3, 'Clean app data and try again');
                    LoginFailed.encode();
                    LoginFailed.send(false);
                }*/

            }
        })
        .catch(error => {
            console.log(`An error occoured fetching a player from the database`, error);
        });
    }
}

function generateToken(n, callback) {
    require('crypto').randomBytes(n, function (err, buffer) {
        callback(buffer.toString('hex'));
    });
}