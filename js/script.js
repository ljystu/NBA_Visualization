// let season_2020;
// let evolveData;
Promise.all([d3.json('./data/playoffs_2020.json'), 
             d3.json('./data/playoffs_2019.json'),
             d3.json('./data/playoffs_2018.json'), 
             d3.json('./data/playoffs_2017.json'),
             d3.json('./data/playoffs_2016.json'),
             d3.json('./data/regularseason_2020.json'),
             d3.json('./data/regularseason_2019.json'),
             d3.json('./data/regularseason_2018.json'), 
             d3.json('./data/regularseason_2017.json'),
             d3.json('./data/regularseason_2016.json')]).then(function (loaded) {
    playoffs_2020 = loaded[0];
    playoffs_2019 = loaded[1];
    playoffs_2018 = loaded[2];
    playoffs_2017 = loaded[3];
    playoffs_2016 = loaded[4];
    regularseason_2020 = loaded[5];
    regularseason_2019 = loaded[6];
    regularseason_2018 = loaded[7];
    regularseason_2017 = loaded[8];
    regularseason_2016 = loaded[9];
    // console.log(season_2020)

    function updateInfocard(data) {
        infocard.updateSelected(data);
    }

    function updateSelectedRow(data, scrollTo=false) {
        table.updateSelected(data, scrollTo);
    }

    function updateAllData(dataset) {
        table.updateData(dataset);  // Updating scatterplot with (potentially) filtered dataset in table update

        const selected = dataset[3];
        infocard.updateSelected(selected);
        table.updateSelected(selected);
        scatterplot.updateSelected(selected);

    }

    function updateScatterplot(data) {
        scatterplot.updateData(data);
    }

    function updateSelectedCircle(data) {
        scatterplot.updateSelected(data);
    }
    const defaultSelected = regularseason_2020[3];
    
    let table = new Table(regularseason_2020, updateInfocard, updateScatterplot, updateSelectedCircle );
    let scatterplot = new Scatterplot(regularseason_2020, updateInfocard, updateSelectedRow);
    let infocard = new Infocard(defaultSelected, updateSelectedCircle, updateSelectedRow);
    
    table.updateSelected(defaultSelected);
    scatterplot.updateSelected(defaultSelected);
    setupBanner(regularseason_2020, updateAllData);
});

function setupBanner(data, updateAllData) {
    d3.select("#dataset-selector")
    .on("change", function() {
        let dataset = data;
        let setKey = d3.select("#dataset-selector").node().value;
        if (setKey == "1") {
            dataset = regularseason_2020;
        }else if (setKey == "2") {
            dataset = playoffs_2020;
        }else if (setKey == "3") {
            dataset = regularseason_2019;
        }else if (setKey == "4") {
            dataset = playoffs_2019;
        }else if (setKey == "5") {
            dataset = regularseason_2018;
        }else if (setKey == "6") {
            dataset = playoffs_2018;
        }else if (setKey == "7") {
            dataset = regularseason_2017;
        }else if (setKey == "8") {
            dataset = playoffs_2017;
        }else if (setKey == "9") {
            dataset = regularseason_2016;
        }else if (setKey == "10") {
            dataset = playoffs_2016;
        }
        
        updateAllData(dataset);
    });
}


