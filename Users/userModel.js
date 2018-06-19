const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
})

UserSchema.pre('save', function(next){

    bcrypt.hash(this.password, 11, (err, hash) => {
        if(err){
            return next(err);
        }
            this.password = hash;
            next();
    });
});

UserSchema.methods.passwordChecker = function(pass, cb) {
    
    bcrypt.compare(pass, this.password)
        .then(loggedIn => {
            cb(loggedIn)
        })
        .catch( err => {
            console.log(err)
        })
};


module.exports = mongoose.model('User', UserSchema);