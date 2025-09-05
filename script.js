"use strict";

const MCP1rate = 41.8798;
const MCP2rate = 44.2198;

let timeOutput = document.getElementById("hours");
let payOutput = document.getElementById("pay");
let startTime = document.getElementById("start");
let endTime = document.getElementById("end");
let mealCancel = document.getElementById("cancel-meal");
let secondShift = document.getElementById("second-shift");

timeOutput.textContent = String(timeDifference(startTime.value, endTime.value)) + " hrs"




console.log(typeof startTime.value);
console.log(startTime.value);

function toMinutes(time) {
    let [h, m] = time.split(":").map(Number);
    m = payrollRounding(m);
    return (h * 60) + m
}

function payrollRounding(m) {
    if (m >= 53 && m <= 60) {
        return 60;
    } else if (m >= 0 && m <= 7) {
        return 0;
    } else if (m >= 8 && m <= 22){
        return 15;
    } else if (m >= 23 && m <= 37) {
        return 30;
    } else if (m >= 38 && m <= 52) {
        return 45;
    }
    return m;
}

function mealNotTaken() {
    if (mealCancel.checked) {
        return 0;
    } else {
        return -.5;
    }
}

function timeDifference(start, end) {
    let startMin = toMinutes(start);
    let endMin = toMinutes(end);
    return ((endMin - startMin) / 60) + mealNotTaken()
}

function update() {
    const hrs = timeDifference(startTime.value, endTime.value);
    const grossPay = calculateGross(hrs);
    timeOutput.textContent = String(hrs) + "hrs";
    payOutput.textContent = "$" + String(grossPay.toFixed(2));

}

function calculateGross(hrs) {
    if (hrs <= 8) {
        return MCP1rate * hrs;
    } 

    if (secondShift.checked && hrs > 8) {
        let regularPay = MCP1rate * 8;
        let overtimePay = (1.5 * MCP2rate) * (hrs - 8);
        return regularPay + overtimePay;
    } else if (!secondShift.checked && hrs > 8) {
        let regularPay = MCP1rate * 8;
        let overtimePay = (1.5 * MCP1rate) * (hrs - 8);
        return regularPay + overtimePay;
    }
}

update();

startTime.addEventListener("change", update);
endTime.addEventListener("change", update);
mealCancel.addEventListener("change", update);
secondShift.addEventListener("change", update);

