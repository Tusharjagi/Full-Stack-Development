const express = require('express')
const bodyParser = require('body-parser')

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req, res, next)=>{
    res.statusCode = 200;
    res.setHeader ('Content-Type','Text/plain');
    next();
})
.get((res, req, next) => {
    res.end('all promotions deails sends to you');
})
.post((res, req, next) => {
    res.end('Will add the promotion '+ req.body.name + 
    ' With promo : ', req.body.promotions)
})
.put((res, req, next) => {
    res.statusCode = 403;
    res.end('Put operation not support in /promo');
})
.delete((res, req, next) => {
    res.end('Deleting all promotions');
});

promoRouter.route('/:promoId')
.all((res, req, next) => {
    res.statusCode = 300;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((res, req, next) => {
    res.end('Will send all the promotions of all promoId : ' + 
    req.params.promoId + ' to you ');
})
.post((res, req, next) => {
    req.statusCode = 403;
    res.end('POST operation not available in /promoId/ ' + 
    req.params.promoId);
})
.put((res,req,next) => {
    req.write('Updating the promotions : ' + req.params.promoId + '\ n');
    req.end('Will Update the promotions : ' + req.body.name + 
            ' with promo : ' + req.body.promotions )
})
.delete((res, req, next) => {
    req.end('Deleting promotion : ' + req.params.promoId );
});

module.exports = promoRouter;