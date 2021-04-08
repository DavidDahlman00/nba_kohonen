// ***************INIT********************************************

let stats_lenght = 0
let matrix = []
let colMean = []
let std = []
let matrixScaled = []
let grid = []
let nameList = []
let atributes = document.getElementsByClassName('button')
let test = document.getElementById('test')
let table = document.getElementById('table1')
table.innerHTML = ''
let clearButton = document.getElementById('clear')

let inText = document.getElementById('textfield')


let grafGridDiv = document.getElementById('graf_grid')
let gridSizeButtons = document.getElementsByClassName('grid_button')
gridSizeButtons[1].style.background = 'green'
let gridSizeList = [false, true, false]
let years = document.getElementsByClassName('yearButton')
years[0].style.background = 'blue'
let yearList = [true, false, false]
let year = 2018
let colorList = [ "DarkGoldenRod",
"Blue",
"BlueViolet",
"Brown",
"BurlyWood",
"CadetBlue",
"Chartreuse",
"Chocolate",
"Cornsilk",]

for (let index = 0; index < gridSizeButtons.length; index++) {
    gridSizeButtons[index].addEventListener('click', setGridSize)
    
}

for (let index = 0; index < years.length; index++) {
    years[index].addEventListener('click', setYear)
    
}

function setGridSize() {
    for (let index = 0; index < gridSizeButtons.length; index++) {
        if(this.innerText == gridSizeButtons[index].innerText) {
            if(!gridSizeList[index]) {
                
                for (let i = 0; i < gridSizeButtons.length; i++) {
                    gridSizeList[i] = false
                    gridSizeButtons[i].style.background = 'white'
                }
                gridSizeList[index] = true
                gridSizeButtons[index].style.background = 'green'
                if(index==0){
                    createDisplayGrid(2, 2)  
                }else if(index==1){
                    createDisplayGrid(2, 3) 
                }else{
                    createDisplayGrid(3, 3) 
                }
            }
        }

    }
    console.log(gridSizeList)
}

function setYear() {
    if(this.innerHTML == 2018){
        if(!yearList[0]) {
            for (let index = 0; index < yearList.length; index++) {
                yearList[index] = false
                years[index].style.background = 'cadetblue'
            }
            yearList[0] = true
            years[0].style.background = 'blue'
            year = 2018
        }
    }else if(this.innerHTML == 2019){
        if(!yearList[1]) {
            for (let index = 0; index < yearList.length; index++) {
                yearList[index] = false
                years[index].style.background = 'cadetblue'
            }
            yearList[1] = true
            years[1].style.background = 'blue'
            year = 2019
        }
    }else if(this.innerHTML == 2020){
        if(!yearList[2]) {
            for (let index = 0; index < yearList.length; index++) {
                yearList[index] = false
                years[index].style.background = 'cadetblue'
            }
            yearList[2] = true
            years[2].style.background = 'blue'
            year = 2020
        }
    }
}

// function displayGrid(gridList){
//     grafGridDiv.innerHTML = ''
//     for (let index = 0; dex < gridList.length; index++) {      
//         if(gridList[index]){
//            if(index == 0){
               
//            }      
//         }
//     }
// }

function createDisplayGrid(n, m){
    grafGridDiv.innerHTML = ''
    for (let i = 0; i < n; i++) {
        let row = document.createElement('div')
        row.setAttribute('class', 'grid_row')
        for (let j = 0; j < m; j++) {
            let element = document.createElement('div')
            element.setAttribute('class', 'grid_node')
            element.style.background = colorList[j + m * i]
            
            row.appendChild(element)
        }
        grafGridDiv.appendChild(row)
    }
    
}
createDisplayGrid(2, 3)
const apiUrl = 'https://www.balldontlie.io/api/v1/season_averages?season=2018&player_ids[]=140'

const statsUrlstart = 'https://www.balldontlie.io/api/v1/season_averages?season='
const statsUrlmidel = '&player_ids[]='
const playerUrl = 'https://www.balldontlie.io/api/v1/players/?search='

let add_button = document.querySelector('#add')
let stats_active = [false, false, false, false, false, 
    false, false, false, false, false, 
    false, false, false, false, false, 
    false, false, false, false]

    clearButton.addEventListener('click', cleartable)

function cleartable(){
    table.innerHTML = ''
    matrix = []
    colMean = []
    std = []
    matrixScaled = []
    grid = []
    nameList = []
}

    inText.addEventListener('change', async e => {
        if(table.innerHTML == ''){
            addTableHeader()
        }
        console.log('started')
        var text1 = document.getElementById('textfield').value;
        const url = playerUrl + text1 
        console.log(url)
        const response = await fetch(url)
       // console.log('3. got data: ', data);
       const data = await response.json();
        let testData = data.data

        testData.forEach(element => {
        testPlayerFunc(element)
        });
        console.log('ended')
    })


    for (let index = 0; index < atributes.length; index++) {
        atributes[index].addEventListener('click', atributesListener)
    
}

    function atributesListener(){
        if(table.innerHTML == '') {
            for (let index = 0; index < atributes.length; index++) {
                if(this.innerText == atributes[index].innerText) {
                    if(stats_active[index]) {
                        stats_active[index] = false
                        atributes[index].style.background = 'orange'
                        if(stats_lenght > 0){
                            stats_lenght = stats_lenght - 1
                        }
                    }else {
                        stats_active[index] = true
                        atributes[index].style.background = 'green'
                        stats_lenght = stats_lenght + 1
                    }
                    test.innerText = stats_lenght
                }
            }
        }
    }

    add_button.addEventListener('click', async e => {
        console.log('matrix',matrix)
         console.log('col length',matrix.length)
         console.log('row length',matrix[0].length)
         colMean = calcColMean()
         console.log('col mean', colMean)
         console.log('euclidean distance m1 m2',euclideanDistance(matrix[0], matrix[1]))
         std = stdFunction(colMean)
         console.log('std', std)
         matrixScaled = scaledMatrix(colMean, std)
        console.log('scaled matrix', matrixScaled)
        if(gridSizeList[0]){
            initGrid(2, 2, std)
        }else if(gridSizeList[1]){
            initGrid(2, 3, std)
        }else{
            initGrid(3, 3, std) 
        }
         
         console.log('inital grid', grid)
         console.log('random player index', Math.floor(Math.random() * nameList.length))
        const randomPlayer1 = Math.floor(Math.random() * nameList.length)
        console.log('best matching unit and random', bestMatchingUnit(randomPlayer1, matrixScaled), randomPlayer1)
        
        for (let index = 0; index < 200; index++) {
            updateGrid(matrixScaled, index, 200)    
        }
        
        console.log('updated grid', grid)
        let bmuPlayer = getBMUforPlayerList(matrixScaled)
        console.log('bmu player list', bmuPlayer)
        setColors(bmuPlayer)

        //console.log(grid[0][0])
        //console.log(matrix_scaled[1])
        // console.log('1. button pressed');
    
        // const response =  await fetch(apiUrl);
        // console.log('2. got respnse', response);
    
        // const data = await response.json();
    
        // console.log('3. got data: ', data);
    
        // let testData = data.data

        // testData.forEach(element => {
        // testFunc(element)
        // });
    })

    //*************************************ACTIVITY BUTTONS***************************************** */
    function testFunc(data) {
        for (let index = 0; index < stats_active.length; index++) {
            if(stats_active[index]){
                let testDiv = document.createElement('div')
                const field = atributes[index]
                testDiv.innerHTML = data.field
                table.appendChild(testDiv)
                
            }
            
        }
    }

    function testPlayerFunc(data) {
        let playerRow = document.createElement('tr')
        playerRow.setAttribute("class", "playerRow")
        let playerName = document.createElement('td')
        playerName.setAttribute("class", "name")
       // let playerId = document.createElement('td')
        
        playerName.innerHTML = data.first_name + ' ' + data.last_name
       // playerId.innerHTML = data.id
       playerRow.setAttribute("id", data.first_name + data.last_name)
        playerRow.appendChild(playerName)
        nameList.push(data.first_name + data.last_name)
        //playerRow.appendChild(playerId)
        addStats(data.id, playerRow)
        
        table.appendChild(playerRow)
    }


function addTableHeader() {
    let tableHeader = document.createElement('tr')
    let name = document.createElement('td')
    name.setAttribute("class", "name")
    name.innerHTML = 'name'
    tableHeader.appendChild(name)
    for (let index = 0; index < stats_active.length; index++) {
        if(stats_active[index]){
            let stat = document.createElement('td')
            stat.setAttribute("class", "stat")
            stat.innerHTML = atributes[index].innerHTML
            tableHeader.appendChild(stat)
        }
    }
    table.appendChild(tableHeader)
}


    async function addStats(id, player) {
        let stats_matrix = []
        console.log('started stats')
        const url = statsUrlstart + year + statsUrlmidel + id 
        console.log(url)
        const response = await fetch(url)
        
       const data = await response.json();
        let testData = data.data
        testData.forEach(element => {
            // let test = document.createElement('td')
            // test.innerHTML = element.min
            // player.appendChild(test)
            for (let index = 0; index < stats_active.length; index++) {
                if(stats_active[index]){
                    let stat = document.createElement('td')
                    stat.setAttribute("class", "stat")
                    const field = atributes[index].id
                    console.log(atributes[index].id)
                    //const str = 'element.' + field
                    switch(field){
                        case 'min':
                            stat.innerHTML =  element.min
                            break;
                        case 'fgm':
                            stat.innerHTML =  element.fgm
                            break;
                        case 'fga':
                            stat.innerHTML =  element.fga
                            break; 
                        case 'fg3m':
                            stat.innerHTML =  element.fg3m
                            break;
                        case 'fg3a':
                            stat.innerHTML =  element.fg3a
                            break;
                        case 'oreb':
                            stat.innerHTML =  element.oreb
                            break; 
                        case 'ftm':
                            stat.innerHTML =  element.ftm
                            break;
                        case 'fta':
                            stat.innerHTML =  element.fta
                            break;
                        case 'dreb':
                            stat.innerHTML =  element.dreb
                            break; 
                        case 'reb':
                            stat.innerHTML =  element.reb
                            break;
                        case 'ast':
                            stat.innerHTML =  element.ast
                            break;
                        case 'stl':
                            stat.innerHTML =  element.stl
                            break; 
                        case 'blk':
                            stat.innerHTML =  element.blk
                            break; 
                        case 'turnover':
                            stat.innerHTML =  element.turnover
                            break;
                        case 'pf':
                            stat.innerHTML =  element.pf
                            break;
                        case 'pts':
                            stat.innerHTML =  element.pts
                            break; 
                        case 'fg_pct':
                            stat.innerHTML =  element.fg_pct
                            break;
                        case 'fg3_pct':
                            stat.innerHTML =  element.fg3_pct
                            break;
                        case 'ft_pct':
                            stat.innerHTML =  element.ft_pct
                            break; 
                        default:
                            stat.innerHTML =  'error type'
                    }
                    
                    player.appendChild(stat)
                    stats_matrix.push(Number(stat.innerHTML))
                }
            }
            matrix.push(stats_matrix)
        });
    
    }

  //*************************************KOHONEN FUNCTIONS***************************************** */

    function euclideanDistance(a, b) {
        let sum = 0
        for (let i = 0; i < a.length; i++) {
            sum = Math.pow(a[i] - b[i], 2)
        }
        return Math.sqrt(sum)
    }


    function calcColMean() {
        let vectorMean = []
        for (let i = 0; i < matrix[0].length; i++) {
            let localSum = 0
            for (let j = 0; j< matrix.length; j++) {
              localSum = localSum + Number(matrix[j][i])
            }
            vectorMean.push(localSum / matrix.length)
        }
        return vectorMean
    }

    function stdFunction(col_mean) {
        let stdVector = []
        for (let i = 0; i < matrix[0].length; i++) {
            let localSum = 0
            for (let j = 0; j< matrix.length; j++) {
              localSum = localSum + Math.pow(Number(matrix[j][i]) - col_mean[i], 2)
            }
            stdVector.push(Math.sqrt(localSum / matrix.length))
        }
        return stdVector
    }

    function scaledMatrix(vectorMean, stdVector) {
        let normed = []
        for (let i = 0; i < matrix.length; i++) {
            let row = []
          for (let j = 0; j < matrix[0].length; j++) {
              row.push(Number(matrix[i][j]) - Number(vectorMean[j])) / Number(stdVector[j])
          }
          normed.push(row)
        }
        return normed
    }

    function initGrid(n, m, stdVector){
        let v1 = []
        let v2 = []
        for (let i = 0; i < matrix[0].length; i++) {
            if(i % 2 == 0){
                v1.push(0.5)
                //v1.push(stdVector[i])
                v2.push(0)
            }else{
                v1.push(0)
                //v2.push(stdVector[i])
                v2.push(0.5)
            }
            
        }
        for (let i = 0; i < n; i++) {
            let gridRow = []
            for (let j = 0; j < m; j++) {
                let cel = []
                for (let k = 0; k < matrix[0].length; k++) {
                    cel.push((-1 + 2*i/(n-1))*v1[k] + (-1 + 2*j/(m-1))*v2[k])
                    
                }
                gridRow.push(cel)
            }
            grid.push(gridRow)           
        }
    }

    function bestMatchingUnit(n, scaled) {
        let bmu = [0, 0]
       
        let minDistance = 1000//euclideanDistance(grid[0][0], matrix_scaled[n])
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j< grid[0].length; j++) {
              if(minDistance > euclideanDistance(grid[i][j], scaled[n])){
                  minDistance = euclideanDistance(grid[i][j], scaled[n])
                  bmu = [i, j]
              }
               
            }
            
        }
        return bmu
    }

    function updateGrid(matrix_scaled, iteration, totalIterations) {
        let updateUnit = Math.floor(Math.random() * matrix_scaled.length)
        console.log('player to update from', updateUnit)
        let bmu = bestMatchingUnit(updateUnit, matrix_scaled)
        console.log('test',bmu)
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[0].length; j++) {
                if(i == bmu[0] && j == bmu[1]){
                    for (let k = 0; k < grid[i][j].length; k++) {
                        grid[i][j][k] = grid[i][j][k] + alphaFunction(iteration, totalIterations) * (matrix_scaled[updateUnit][k] - grid[i][j][k])
                    } 
                }else{
                    for (let k = 0; k < grid[i][j].length; k++) {
                        grid[i][j][k] = grid[i][j][k] +
                        neighbourhoodFunction(Math.sqrt(Math.abs(i - bmu[0])+ Math.abs(j - bmu[1])), iteration, totalIterations) * 
                        (matrix_scaled[updateUnit][k] - grid[i][j][k])   
                    }
                } 
            }
        }
    }

    function getBMUforPlayerList(matrix2) {
        let list = []
        for (let i = 0; i < matrix2.length; i++) {
            let localvalue = bestMatchingUnit(i, matrix2)
            list.push(localvalue)
        }
        return list
    }

    function setColors(bmuToColor){
        let playersToColor = document.getElementsByClassName('playerRow')
        for (let elem = 0; elem < playersToColor.length; elem++) {
           console.log('test',elem)
           console.log('color',bmuToColor[elem][1] + grid[0].length * bmuToColor[elem][0])
        playersToColor[elem].style.background = colorList[bmuToColor[elem][1] + grid[0].length * bmuToColor[elem][0]]
        }
    }

    function alphaFunction(iteration, totalIterations) {
        let alphaZero = 0.6
        return alphaZero *  Math.exp(-iteration / totalIterations) 
    }

    function neighbourhoodFunction(distance, iteration, totalIterations) {
        let sigmaZero = 0.6
        let sigma = sigmaZero * Math.exp(-iteration / totalIterations)
        return Math.exp(-(Math.pow(distance, 2)) / Math.pow(sigma, 2))
    }