import aj from '../config/arcjet.js';

const arcjetMiddleware = async (req, res, next) =>{
    try{
        // protect request and tell me your decision (denied or let through)
        // takes away one token from bucket per request
        const decision = await aj.protect(req, {requested: 1});

        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                return res.status(429).json({error: 'Rate limit exceeded'});
            }
            if(decision.reason.isBot()){
                return res.status(403).json({error: 'Bot detected'});
            }
            // if just denied
            return res.status(403).json({error: 'Access denied'});
        }

        // request is accepted 
        next();
    }catch(error){
        console.log(`Arcjet Middleware Error: ${error}`);
        next(error);
    }
}

export default arcjetMiddleware;