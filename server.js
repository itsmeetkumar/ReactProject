const { time } = require('console');
const express = require('express');
const app = express();

//------------------------FOR MAKING A MOKE DATA FOR API-------------------------
var routes = [1,2,3] //  routes 
var stops = [1,2,3,4,5,6,7,8,9,10] //stops
//loop to increment the time and push results in array
var route =null;
var stop = null;
var routestart =0; //route start time flag
var time_counter =0;// Time array counter [index]
var stop_counter =0;// stop time start track

var x = 15; //minutes interval
var times = []; // time array
var tt = 0; //start time

for(stop in stops){
   
for (route in routes)
{
    for (var i=0;tt<24*60; i++) {
        var hh = Math.floor(tt/60); // getting hours of day in 0-24 format
        var mm = (tt%60); // getting minutes of the hour in 0-55 format
        times[time_counter] = stops[stop]+' '+routes[route]+' '+("0" + (hh)).slice(-2) + ':' + ("0" + mm).slice(-2); // pushing data in array in [STOP ROUTE TIME]
        tt = tt + x;
        time_counter++;
      }
    
    routestart = routestart+2;
    tt= routestart;

}
stop_counter= stop_counter+2;
routestart = stop_counter;
tt= stop_counter;
}

//-----------------------API CODE START HERE---------------------------------

app.get('/',(req,res)=>{
    res.send('Hello World');
})

app.get('/api/:id', (req,res)=>{
  
    let date = new Date();

    let hour = date.getHours();
    let min = date.getMinutes();
    
    const output =[];
    var n=0;

    var route1 =[0,2,2,2];


    var flag =1;
    while (n < times.length && flag>0)
    {
        var temp = times[n].split(" ");
        if(temp[0] == req.params.id)
        {
            for(var ro =1; ro<4; ro++)
            {
                if(temp[1] == ro && route1[ro] >0){
                    var temp2 = temp[2].split(":");
                        if(temp2[1] > min && temp2[0] == hour){
                            output.push({ StopID : req.params.id,
                                Route :+temp[1],
                                hours: temp2[0], 
                                Min: temp2[1]});
                            route1[ro]--;
                        }
                        if(temp2[0] > hour){
                            output.push({ StopID : req.params.id,
                                Route :+temp[1],
                                hours: temp2[0], 
                                Min: temp2[1]});
                                route1[ro]--;
                        }
                    
                }

            }

            if(route1[1] < 1 && route1[2] <1 && route1[3] < 1){
                flag =0;
            }
            
        }
        n++;

    }
 

    //res.send(output);
    res.json(output);
});

app.listen(3005, ()=> console.log('Listening on 3005'))


