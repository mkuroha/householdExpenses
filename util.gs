function getYearAndLastMonth(){
  var today = new Date();
  today.setMonth(today.getMonth() - 1);
  var todayLastYear = today.getFullYear().toString();
  var todayLastMonth = today.getMonth() + 1;
  if (todayLastMonth.toString().length == 1){
    todayLastMonth = "0" + todayLastMonth;
  }
  return todayLastYear + todayLastMonth;
}

function getYearAndMonthOfToday(){
  var today = new Date();
  // today.setMonth(today.getMonth() - 1);
  var todayYear = today.getFullYear().toString();
  var todayMonth = today.getMonth() + 1;
  if (todayMonth.toString().length == 1){
    todayMonth = "0" + todayMonth;
  }
  return todayYear + todayMonth;
}

function calcSum(dat){
  var expenseSum = 0;
  if (dat[0] != ""){
    for (i=0;i<dat.length;i++){
      expenseSum += dat[i][2];
    }
  }
  return expenseSum;
}