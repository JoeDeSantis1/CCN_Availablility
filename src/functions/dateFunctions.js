const checkDayWithMonth = () => {
    let monthName = document.getElementById("month");
    let selectedMonth = monthName.options[monthName.selectedIndex].value;
    let dayNum = document.getElementById("dayNum").value;
    console.log(selectedMonth);
    switch (selectedMonth) {
        case 'April':
            if (dayNum > 30) {
                alert(selectedMonth + " only has 30 days! Please enter a valid day.");
            }
            break;
        case "June":
            if (dayNum > 30) {
                alert(selectedMonth + " only has 30 days! Please enter a valid day.");
            }
            break;
        case "September":
            if (dayNum > 30) {
                alert(selectedMonth + " only has 30 days! Please enter a valid day.");
            }
            break;
        case "November":
            if (dayNum > 30) {
                alert(selectedMonth + " only has 30 days! Please enter a valid day.");
            }
            break;
        case "February":
            if (dayNum > 28) {
                alert(selectedMonth + " only has 28 days! Please enter a valid day.");
            }
            break;
        default:
            if (dayNum > 31) {
                alert(selectedMonth + " only has 31 days! Please enter a valid day.");
            }
            break;
    }
};

const checkCCNDayWithMonth = () => {
    let monthName = document.getElementById("CCNmonth");
    let selectedMonth = monthName.options[monthName.selectedIndex].value;
    let dayNum = document.getElementById("CCNdayNum").value;
    console.log(selectedMonth);
    switch (selectedMonth) {
        case 'April':
            if (dayNum > 30) {
                alert(selectedMonth + " only has 30 days! Please enter a valid day.");
            }
            break;
        case "June":
            if (dayNum > 30) {
                alert(selectedMonth + " only has 30 days! Please enter a valid day.");
            }
            break;
        case "September":
            if (dayNum > 30) {
                alert(selectedMonth + " only has 30 days! Please enter a valid day.");
            }
            break;
        case "November":
            if (dayNum > 30) {
                alert(selectedMonth + " only has 30 days! Please enter a valid day.");
            }
            break;
        case "February":
            if (dayNum > 28) {
                alert(selectedMonth + " only has 28 days! Please enter a valid day.");
            }
            break;
        default:
            if (dayNum > 31) {
                alert(selectedMonth + " only has 31 days! Please enter a valid day.");
            }
            break;
    }
};

const checkYear = () => {
    let selectedYear = document.getElementById("year").value;
    console.log(selectedYear);
    if (selectedYear < 1920 || selectedYear > 2020) {
        alert("That year is out of range, Please select a valid year.")
    }
};

const checkCCNYear = () => {
    let selectedYear = document.getElementById("CCNyear").value;
    console.log(selectedYear);
    if (selectedYear < 1920 || selectedYear > 2020) {
        alert("That year is out of range, Please select a valid year.")
    }
};

module.exports = { checkCCNDayWithMonth, checkYear, checkCCNYear, checkDayWithMonth };