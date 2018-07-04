var express = require("express");
var app = express()
var request = require("request");

//设置跨域访问
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By",' 3.2.1')
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});

function processCatalogBody(body, name){

	var secondLayer = [{"name": 'AIX', "children": []},
		{"name": 'ALIAS', "children": []},
		{"name": 'CLUSTER', "children": []},
		{"name": 'DATA', "children": []},
		{"name": 'GDG', "children": []},
		{"name": 'INDEX', "children": []},
		{"name": 'NONVSAM', "children": []},
		{"name": 'PAGESPACE', "children": []},
		{"name": 'PATH', "children": []},
		{"name": 'SPACE', "children": []},
		{"name": 'USERCATALOG', "children": []},
		{"name": 'TAPELIBRARY', "children": []},
		{"name": 'TAPEVOLUME', "children": []}];

	var data = {"name": name, "children": secondLayer};

	var otherLines = [];

	body.split("\n").forEach(line => {
		if(line.startsWith("0")){
			var tempLine = line.slice(1);// 去掉0

			var re = /[-\s]+/;
			var words = tempLine.split(re).filter(d=>d);
			if(words.length != 0){
				data.children.forEach(element => {
					if(element.name == words[0]){
						element.children.push({
							"name": words[1],
							"value": words[1]
						});
					}
				});

			}
		}else{
			otherLines.push(line);
		}
	});

	return {"data": data, "otherLines": otherLines};

}

app.get('/', (req, res) => {
	var options = {
		method: 'GET',
		url: 'https://10.60.45.8:8800/zosmf/',
		rejectUnauthorized: false,
		headers:
				{
					'Cache-Control': 'no-cache',
					Authorization: 'Basic aWJtdXNlcjoyMDE4MDY='
				}
	}

	request(options, function (error, response, body) {
		if (error) throw new Error(error)
		res.send(body)
	})
})

app.get('/getUserCatalog', (req, res) => {
	var options = {
		method: 'PUT',
		url: 'https://10.60.45.8:8800/zosmf/restjobs/jobs',
		rejectUnauthorized: false,
		headers: {
			'Cache-Control': 'no-cache',
			Authorization: 'Basic aWJtdXNlcjoyMDE4MDY=',
			'Content-type':'application/json'
		},
		body:JSON.stringify({"file":"//'ST028.CATALOG(LSTUSER)'"})
	}
	request(options, function (error, response, body) {
		if (error) throw new Error(error);
		res.send(body)
	})
})

app.get('/getMainCatalog', (req, res) => {
	var options = {
		method: 'PUT',
		url: 'https://10.60.45.8:8800/zosmf/restjobs/jobs',
		rejectUnauthorized: false,
		headers: {
			'Cache-Control': 'no-cache',
			Authorization: 'Basic aWJtdXNlcjoyMDE4MDY=',
			'Content-type':'application/json'
		},
		body:JSON.stringify({"file":"//'ST028.CATALOG(LSTMASTR)'"})
	}
	request(options, function (error, response, body) {
		if (error) throw new Error(error);
		console.log(res)
		res.send(body)
	})
})

app.get('/getAlias', (req, res) => {
	var options = {
		method: 'PUT',
		url: 'https://10.60.45.8:8800/zosmf/restjobs/jobs',
		rejectUnauthorized: false,
		headers: {
			'Cache-Control': 'no-cache',
			Authorization: 'Basic aWJtdXNlcjoyMDE4MDY=',
			'Content-type':'application/json'
		},
		body:JSON.stringify({"file":"//'ST028.CATALOG(LSTALIAS)'"})
	}
	request(options, function (error, response, body) {
		if (error) throw new Error(error);
		res.send(body)
	})
})

app.get('/getJobById/:jobname/:jobid', (req, res) => {
	var options = {
		method: 'GET',
		url: "https://10.60.45.8:8800/zosmf/restjobs/jobs/"+req.params.jobname+"/"+req.params.jobid+"/files/102/records",
		rejectUnauthorized: false,
		headers: {
			Authorization: 'Basic aWJtdXNlcjoyMDE4MDY=',
		}
	}
	request(options, function (error, response, body) {
		if (error) throw new Error(error)
		else{
			res.send(body)
		}
	})
})

app.get('/catalog/:catalogName',(req,res) => {
	var options = {
		method: 'PUT',
		url:"https://10.60.45.8:8800/zosmf/restjobs/jobs",
		rejectUnauthorized:false,
		headers:{
			Authorization: 'Basic aWJtdXNlcjoyMDE4MDY=',
			'Content-type':'text/plain'
		},
		body:"//LSTCATA JOB ,'USER',NOTIFY=&SYSUID " +'\n'
		+"//STEP1 EXEC PGM=IDCAMS"+'\n'
		+ "//SYSPRINT DD SYSOUT=*"+'\n'
		+"//SYSIN DD *"+'\n'
		+"   LISTCAT USERCATALOG ENTRIES("+req.params.catalogName+") ALL" +'\n'
		+"/*"
	}
	request(options, function (error, response, body) {
		if (error) throw new Error(error)
		res.send(body)
	})
})

app.get('/alias/:aliasName',(req,res) => {
	var options = {
		method: 'PUT',
		url:"https://10.60.45.8:8800/zosmf/restjobs/jobs",
		rejectUnauthorized:false,
		headers:{
			Authorization: 'Basic aWJtdXNlcjoyMDE4MDY=',
			'Content-type':'text/plain'
		},
		body:"//LSTALIAS JOB ,'USER',NOTIFY=&SYSUID " +'\n'
		+"//STEP1 EXEC PGM=IDCAMS"+'\n'
		+ "//SYSPRINT DD SYSOUT=*"+'\n'
		+"//SYSIN DD *"+'\n'
		+"   LISTCAT ALIAS ENTRIES("+req.params.aliasName+") ALL" +'\n'
		+"/*"
	}
	request(options, function (error, response, body) {
		if (error) throw new Error(error)
		res.send(body)
	})
})



app.listen(3000, () => console.log('Example app listening on port 3000!'))