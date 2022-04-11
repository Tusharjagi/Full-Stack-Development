const express = require('express')
const bodyParser = require('body-parser')

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((res, req, next)=>{
    res.statusCode = 200;
    res.setHeader ('Content-Type','Text/plain');
    next();
})
.get((res, req, next) => {
    res.end('all leader detail sends to you');
})
.post((res, req, next) => {
    res.end('Will add the leaders '+ req.body.name + 
    ' With detail : ', req.body.leaderShip)
})
.put((res, req, next) => {
    res.statusCode = 403;
    res.end('Put operation not support in /leader');
})
.delete((res, req, next) => {
    res.end('Deleting all leaders');
});

leaderRouter.route('/:leaderId')
.all((res, req, next) => {
    res.statusCode = 300;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((res, req, next) => {
    res.end('Will send all the leader of all leadearId : ' + 
    req.params.leaderId + ' to you ');
})
.post((res, req, next) => {
    req.statusCode = 403;
    res.end('POST operation not available in /leaderId/ ' + 
    req.params.leaderId);
})
.put((res,req,next) => {
    req.write('Updating the leaders : ' + req.params.leaderId + '\ n');
    req.end('Will Update the leaders : ' + req.body.name + 
            ' with leadership : ' + req.body.leaderShip )
})
.delete((res, req, next) => {
    req.end('Deleting leader : ' + req.params.leaderId );
});

module.exports = leaderRouter;