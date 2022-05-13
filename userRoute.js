var express=require('express')
var router=express();
var usercontroller=require('../controller/userController')

router.get('/',usercontroller.getData)
router.post('/post',usercontroller.postData)
router.post('/resgister',usercontroller.register)
router.post('/login',usercontroller.login)
module.exports=router;