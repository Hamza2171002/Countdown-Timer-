#! /usr/bin/env node

import inquirer from 'inquirer'
import {differenceInSeconds, interval} from "date-fns"

const result = await inquirer.prompt({
    name: "userInput",
    type: "number",
    message: "Please Enter the amount os seconds",
    validate: (input)=>{
        if(isNaN(input)){
            return "Please Enter Number"
        }else if(input>60){
            return "Seconds Must be in 60"
        }else{
            return true;
        }
    }
})

let input = result.userInput

function startTime(val: number){
    const intTime = new Date().setSeconds(new Date().getSeconds()+ val)
    const intervalTime = new Date(intTime)
    setInterval((()=>{
        const currentTime = new Date()
        const timeDifference = differenceInSeconds(intervalTime, currentTime)

        if(timeDifference <= 0){
            console.log("Time has Expired");
            process.exit()
            
        }
        const minute = Math.floor((timeDifference % (3600*24)) / 3600)
        const second = Math.floor(timeDifference % 60)
        console.log(`${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`);
        
    }), 1000)
}

startTime(input)