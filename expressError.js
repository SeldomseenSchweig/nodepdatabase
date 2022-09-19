

class ExpressError extends Error {

    constructor(msg, status){
        super();
        this.status = status;
        this.msg = msg;
        console.error(this.stack)
    }



}

module.exports = ExpressError;