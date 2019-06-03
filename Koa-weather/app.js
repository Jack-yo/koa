var Koa=require('koa');

var http=require('http');

var router=require('koa-router')();

var app=new Koa();

var views=require('koa-views');

app.use(views('views',{extension:'ejs'}));

router.get('/',async (ctx)=>{

      
       
   var options={
	       host:"www.tianqiapi.com",
		  path:encodeURI("/api/?version=v1&city="+ctx.query.city),
	     method:'get'
}
   var sendmsg='';
   
 function req(){

    return   new Promise (function(resolve,reject){
	
	      var request=http.request(options,function(response){
	
	          response.on("data", function(chunk){
	               sendmsg+=chunk;
	          });
	
	           response.on("end",function   (d){
	
	            var list=JSON.parse(sendmsg);
	
	              console.log(list);
	
	
	               resolve(list);
	
	
});});   
   
                      request.end();
	
})} 

 var lists=await req();
	
	await ctx.render('weather',{
	
	city:lists.city,
	update_time:lists.update_time,
	data:lists.data});              

	
});
	
	app.use(router.routes());
 
 app.use(router.allowedMethods());
   
 
 



app.listen('3000','127.0.0.1');