module.exports = function(express, app,  session) {
    var router = express.Router();

    router.get('/', function(req, res, next){
        res.render('index',{'Title' : 'Welcome to ChatCAT'});
    })

    router.get('/chatrooms', function(req, res, next){
        res.render('chatrooms',{'Title' : 'Chatrooms'});
    })

    router.get('/setcolor',function(req,res,next){
        req.session.favcolor = 'Red';
        res.send('Setting fav color!')
    })

    router.get('/getcolor', function(req,res,next){
        res.send('Favourite Color' + (req.session.favcolor === undefined ? 'not found' : req.session.favcolor))
    })

    app.use('/', router);
}

 