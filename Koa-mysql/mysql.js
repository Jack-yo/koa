var Koa=require('koa');

var mysql  = require('mysql'); 

var querystring=require('querystring');

var app=new Koa();

var router=require('koa-router')();
 
var connection = mysql.createConnection({     
  host     : 'localhost',       
  user     : 'root',              
  password : '19841029Qq',       
  port: '3306',                   
  database: 'demo' 
}); 
 
connection.connect();

router.get('/check', async function(ctx){
	
	function check(){
		
     return new Promise(function(resolve,reject){
	
       if(ctx.query.id||ctx.query.name||ctx.query.sex||ctx.query.level||ctx.query.major||ctx.query.dorm){
		   		   
		var  sql = 'SELECT * FROM student_message WHERE ';
		
		if(ctx.query.id)sql=sql+'id_stu='+[ctx.query.id];
		
		if(ctx.query.name) 
			
		    if(ctx.query.id)sql=sql+' and name='+'\''+ctx.query.name+'\''; 
			
			else sql=sql+'name='+'\''+ctx.query.name+'\'';

        if(ctx.query.sex){

		
	        if(ctx.query.name)sql=sql+'and sex= '+'\''+ctx.query.sex+'\'';
	
            else sql=sql+'sex='+'\''+ctx.query.sex+'\'';}

         if(ctx.query.level){
	
	         if(ctx.query.name||ctx.query.sex)sql=sql+'and level='+'\''+ctx.query.level +'\'';
	
             else sql=sql+'level='+'\''+ctx.query.level +'\'';}      

         if(ctx.query.major){
	
	         if(ctx.query.name||ctx.query.sex||ctx.query.level)sql=sql+'and major='+'\''+ctx.query.major+'\'';
	
             else sql=sql+'major='+'\''+ctx.query.major+'\'';}

          if(ctx.query.dorm){
	
	          if(ctx.query.name||ctx.query.sex||ctx.query.level||ctx.query.major)sql=sql+'and dorm='+'\''+ctx.query.dorm+'\'';
	
             else sql=sql+'dorm='+'\''+ctx.query.dorm+'\'';}
			 
			 
//查
connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
 
       console.log('--------------------------SELECT----------------------------');
       console.log(result);
       console.log('------------------------------------------------------------\n\n');  
	   
	   resolve('200',result);
	   
	    
});     
	 }
	   
	   else{
		
		console.log('--------------------------SELECT----------------------------');
       console.log('请输入要查询的信息');
       console.log('------------------------------------------------------------\n\n');

       resolve('200','请输入要查询的信息');	   
	}});}
	
	   ctx.body=await check();
	   
	    
});

router.post('/add',async function(ctx){
	
 function add(){
	 
	 return new Promise(function (resolve,reject){
	
var data='';

ctx.req.on('data',function(chunk){


      data+=chunk; });
	  
ctx.req.on('end',function(){
	
	var post=querystring.parse(data); 
	
	if(post.id){var id=post.id;
	
	var sql='INSERT student_message VALUES ('+[id];
		
	if(post.name) sql=sql+',\''+post.name+'\''; else sql=sql+',NULL';

    if(post.sex)  sql=sql+',\''+post.sex+'\'';else sql=sql+',NULL';

    if(post.level)sql=sql+',\''+post.level+'\''; else sql=sql+',NULL';

    if(post.major)sql=sql+',\''+post.major+'\'';else sql=sql+',NULL';
	
	if(post.dorm) sql=sql+',\''+post.dorm+'\')';else sql=sql+',NULL)';     

//增
	connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
 
       console.log('--------------------------SELECT----------------------------');
       console.log(result);
       console.log('------------------------------------------------------------\n\n');  
	   
	   
});
	
	connection.query('SELECT * FROM student_message',function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
 
       console.log('--------------------------SELECT----------------------------');
       console.log(result);
       console.log('------------------------------------------------------------\n\n');  
	   
	   resolve(result);});}
	
	
	else{
		
		console.log('--------------------------SELECT----------------------------');
       console.log('请输入学生id');
       console.log('------------------------------------------------------------\n\n');

       resolve('200','请输入学生id');	   
	}
	
     });});}
	 
   ctx.body=await add();
});

router.post('/change',async function(ctx){
	
function change(){
	
 return new Promise(function(resolve,reject){
	
	var data='';

ctx.req.on('data',function(chunk){


      data+=chunk; });
	  
ctx.req.on('end',function(){
	
var post=querystring.parse(data);

if(post.id){var id=post.id;

var sql='UPDATE student_message SET '  ;

if(post.name) sql=sql+'name='+'\''+post.name+'\''; 

if(post.sex){

		
	if(post.name)sql=sql+',sex='+'\''+post.sex+'\'';
	
    else sql=sql+'sex='+'\''+post.sex+'\'';}

if(post.level){
	
	if(post.name||post.sex)sql=sql+',level='+'\''+post.level +'\'';
	
    else sql=sql+'level='+'\''+post.level +'\'';}

if(post.major){
	
	if(post.name||post.sex||post.level)sql=sql+',major='+'\''+post.major+'\'';
	
    else sql=sql+'major='+'\''+post.major+'\'';}

if(post.dorm){
	
	if(post.name||post.sex||post.level||post.major)sql=sql+',dorm='+'\''+post.dorm+'\'';
	
    else sql=sql+'dorm='+'\''+post.dorm+'\'';}

     sql=sql+' WHERE id_stu='+[id];
//改


connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
 
       console.log('--------------------------SELECT----------------------------');
       console.log(result);
       console.log('------------------------------------------------------------\n\n');  
	   
	   
	
	
});

connection.query('SELECT * FROM student_message',function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
 
       console.log('--------------------------SELECT----------------------------');
       console.log(result);
       console.log('------------------------------------------------------------\n\n');  
	   
	   resolve(result);});}
	   
	   
 else{
		
		console.log('--------------------------SELECT----------------------------');
       console.log('请输入学生id');
       console.log('------------------------------------------------------------\n\n');
	   
	   resolve('请输入学生id');  
}});});}

       ctx.body=await change();

});

router.get('/delete',async function(ctx){

  function deleter (){	
    
return new Promise (function (resolve,reject){

	if(ctx.query.id||ctx.query.name||ctx.query.sex||ctx.query.level||ctx.query.major||ctx.query.dorm){
		   		   
		var  sql = 'DELETE FROM student_message WHERE ';
		
		if(ctx.query.id)sql=sql+'id_stu='+[ctx.query.id];
		
		if(ctx.query.name) 
			
		    if(ctx.query.id)sql=sql+' and name='+'\''+ctx.query.name+'\''; 
			
			else sql=sql+'name='+'\''+ctx.query.name+'\'';

        if(ctx.query.sex){

		
	        if(ctx.query.name)sql=sql+'and sex= '+'\''+ctx.query.sex+'\'';
	
            else sql=sql+'sex='+'\''+ctx.query.sex+'\'';}

         if(ctx.query.level){
	
	         if(ctx.query.name||ctx.query.sex)sql=sql+'and level='+'\''+ctx.query.level +'\'';
	
             else sql=sql+'level='+'\''+ctx.query.level +'\'';}      

         if(ctx.query.major){
	
	         if(ctx.query.name||ctx.query.sex||ctx.query.level)sql=sql+'and major='+'\''+ctx.query.major+'\'';
	
             else sql=sql+'major='+'\''+ctx.query.major+'\'';}

          if(ctx.query.dorm){
	
	          if(ctx.query.name||ctx.query.sex||ctx.query.level||ctx.query.major)sql=sql+'and dorm='+'\''+ctx.query.dorm+'\'';
	
             else sql=sql+'dorm='+'\''+ctx.query.dorm+'\'';}
			 
			 
//删
connection.query(sql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
 
       console.log('--------------------------SELECT----------------------------');
       console.log(result);
       console.log('------------------------------------------------------------\n\n');  });

connection.query('SELECT * FROM student_message',function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
 
       console.log('--------------------------SELECT----------------------------');
       console.log(result);
       console.log('------------------------------------------------------------\n\n');  
	   
	   resolve(result);});}
	 
	   else{
		
		console.log('--------------------------SELECT----------------------------');
       console.log('请输入你要改变的内容');
       console.log('------------------------------------------------------------\n\n');

       resolve('请输入你要改变的内容');	   
	}

  });}
    
     ctx.body=await deleter();
	   
	 
	   
});





app.use(router.routes());
 
 app.use(router.allowedMethods());
   

app.listen('3000','127.0.0.1');
 

 
