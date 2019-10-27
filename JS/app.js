const title = "Workout Progress"; // define default page title
document.title = title; // set default page title
let tempChart = "";

function calcutateLift(num) {
  let example = exercises[num].data;
  dataSet = [];
  example.forEach(data => {
    let sum = 0;
    let splitData = data.sets;
    splitData.forEach(data => {
      let dataSeparator = data.split("x");
      sum += dataSeparator[0] * dataSeparator[1];
    });
    dataSet.push(sum);
  });
  return dataSet;
}

function getDateData(num) {
  let example = exercises[num].data;
  dateData = [];
  example.forEach(data => {
    let date = data.date;
    dateData.push(date);
  });
  return dateData;
}

function calcutateSetRM(num) {
  let example = exercises[num].data;
  dataSet = [];
  example.forEach(data => {
    setRM = [];
    let splitData = data.sets;
    splitData.forEach(data => {
      let dataSeparator = data.split("x");
      let RM = dataSeparator[0] * dataSeparator[1];
      setRM.push(RM);
    });
    setRM.sort((b,a) => a>b);
    dataSet.push(setRM[0]);
  });
  return dataSet;
}

function calcutateSoftRM(num) {
    let example = exercises[num].data;
    dataSet = [];
    example.forEach(data => {
      let splitData = data.sets;
      setRM = [];
      splitData.forEach(data => {
        let dataSeparator = data.split("x");
            let RM = dataSeparator[0];
            setRM.push(RM);
      });
      setRM.sort((b,a) => a - b);
      dataSet.push(setRM[0]);
    });
    return dataSet;
}

let navigation = document.getElementById("exercises-navigation");
exercises.forEach((element, index) => {
    let button = document.createElement("div");
    button.classList.add('navigation-button');
    button.id = index;
    button.textContent = element.title;
    button.addEventListener('click', (e) => {
        createChart(e.target.id);
    });
    navigation.appendChild(button);
});

const createChart = (num) => {
    document.getElementById("chart-title").textContent = exercises[num].title;
    if (tempChart.id !== undefined) {
        tempChart.destroy();
    }
    let ctx = document.querySelector("Canvas").getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: getDateData(num),
            datasets: [
                {
                label: 'Day Total Weights',
                backgroundColor: 'transparent',
                borderColor: 'rgba(130, 181, 232, 1)',
                borderWidth: 2,
                data: calcutateLift(num),
            },
            {
                label: 'Set Total Weights',
                backgroundColor: 'transparent',
                borderColor: 'rgba(191, 63, 63, 1)',
                borderWidth: 2,
                data: calcutateSetRM(num),
            },
            {
                label: 'Set RM (min. 4 lifts)',
                backgroundColor: 'transparent',
                borderColor: 'rgba(63, 193, 63, 1)',
                borderWidth: 2,
                data: calcutateSoftRM(num),
            },
        ]}
    });
    tempChart = myChart;
};

createChart(0);