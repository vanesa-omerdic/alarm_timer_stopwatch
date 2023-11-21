const menuIconContainer = document.getElementById('menu-icon-container')
const menuStopwatchIcon = document.getElementById('menu-stopwatch-icon')
const menuTimerIcon = document.getElementById('menu-timer-icon')

//alarm
const alarmContainer = document.getElementById('alarm-container')
const currentDate = document.getElementById('current-date')
const currentTime = document.getElementById('current-time')
const setTime = document.getElementById('set-time')
const setDate = document.getElementById('set-date')
const setAlarmButton = document.getElementById('set-alarm-button')

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
let alarmTime
const ringTone = new Audio('./audio/alarm-clock-short.mp3')
const today = new Date().toISOString().split('T')[0]
setDate.min = today

//stopwatch
const stopwatchContainer = document.getElementById('stopwatch-container')
const stopwatch = document.getElementById('stopwatch')
const startStopButton = document.getElementById('start-stop-button')
const resetButton = document.getElementById('reset-button')

let hours = 0
let minuts = 0
let seconds = 0
let isRunning = false
let intervalId;

menuStopwatchIcon.addEventListener('click', displayPage)
setAlarmButton.addEventListener('click', setAlarm)
startStopButton.addEventListener('click', startStopwatch)
resetButton.addEventListener('click', resetStopwatch)

// timer
const timerContainer = document.getElementById('timer-container')
const timerInputContainer = document.getElementById('timer-input-container')
const resetTimerButton = document.getElementById('timer-reset-button')
const startStopTimerButton = document.getElementById('timer-start-stop-button')
const timer = document.getElementById('timer')
const timerInputs = document.querySelectorAll('input')
const inputNumbers = document.querySelectorAll('input[type="number"]')
const timerIconTenMinuts = document.getElementById('timer-icon')
console.log(timerIconTenMinuts)


let timerHours = document.getElementById('timer-hours').value
let timerMinuts = document.getElementById('timer-minuts').value
let timerSeconds = document.getElementById('timer-seconds').value
let timerIsRunning = false
let timerInetervalId
let totalTimerTime

menuTimerIcon.addEventListener('click', displayPage)
startStopTimerButton.addEventListener('click', startStopTimer)
resetTimerButton.addEventListener('click', resetTimer)

timerInputs.forEach(element => {
    element.addEventListener('input', (event) => {
        const addZero = (num) => num < 10 ? '0' + num : num
        //console.log(event.target)
        const split = timer.textContent.split(':')
        if (event.target.id === 'timer-hours' && event.target.value !== '') {
            timer.textContent = `${addZero(event.target.value)}:${split[1]}:${split[2]}`
            timerHours = event.target.value
        }
        else if (event.target.id === 'timer-minuts' && event.target.value !== '') {
            timer.textContent = `${split[0]}:${addZero(event.target.value)}:${split[2]}`
            timerMinuts = event.target.value
        }
        else if((event.target.id === 'timer-seconds' && event.target.value !== '')) {
            timer.textContent = `${split[0]}:${split[1]}:${addZero(event.target.value)}`
            timerSeconds = event.target.value
        }
        else {
            timer.textContent = '00:00:00'
        }
    })

})

// Alarm
setInterval(() => {
    let date = new Date()
    let hours = date.getHours()
    let minuts = date.getMinutes()
    let seconds = date.getSeconds()

    let day = date.getDay()
    let numDay = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()


    const addZero = (num) => (num < 10 ? '0' + num : num);

    currentTime.textContent = `${addZero(hours)}:${addZero(minuts)}`
    currentDate.textContent = `${weekdays[day]}, ${addZero(numDay)}.${addZero(month)}.${year}`

    if (alarmTime === `${hours}:${addZero(minuts)} ${addZero(numDay)}.${addZero(month)}.${year}`) {
        ringTone.play()
        //ringTone.loop = true;
    }
}, 1000)


function setAlarm() {
    const time = setTime.value
    const setHour = parseInt(time.split(':')[0], 10)
    const setMinuts = parseInt(time.split(':')[1], 10);

    const date = setDate.value
    const day = date.split('-')[2]
    const month = date.split('-')[1]
    const year = date.split('-')[0]

    if (time === '' || date === '') {
        setAlarmButton.textContent = 'Invalid input'

        setTime.value = time === '' ? '' : time
        setDate.value = date == '' ? ''
            : new Date(date) < new Date(today) ? '' : date

        setTimeout(() => {
            setAlarmButton.textContent = 'Set alarm'
        }, 2000)
        return
    }

    alarmTime = `${setHour}:${setMinuts} ${day}.${month}.${year}`
    console.log(`${setHour}:${setMinuts} ${day}.${month}.${year}`)

    setTime.value = ''
    setDate.value = ''
}


//stopwatch
function startStopwatch() {
    startStopButton.textContent = 'Stop'

    if (!isRunning) {
        intervalId = setInterval(updateStopwatch, 1000)
        resetButton.style.color = '#FCD7B5'
        resetButton.style.cursor = 'pointer'
    }
    else {
        clearInterval(intervalId)
        startStopButton.textContent = 'Start'
    }

    isRunning = !isRunning
}


function updateStopwatch() {
    console.log('funkcija update')
    seconds++
    if (seconds % 60 == 0) {
        seconds = 0
        minuts++

        if (minuts % 60 == 0) {
            minuts = 0
            hours++
        }
    }

    seconds = seconds < 10 && seconds[0] != 0 ? `0${seconds}` : seconds
    minuts = minuts < 10 && minuts[0] != 0 ? `0${minuts}` : minuts
    hours = hours < 10 && hours[0] != 0 ? `0${hours}` : hours

    stopwatch.textContent = `${hours}:${minuts}:${seconds}`
}


function resetStopwatch() {
    console.log('funkcija reset')
    clearInterval(intervalId)
    seconds = 0
    minuts = 0
    hours = 0
    isRunning = false
    stopwatch.textContent = `0${hours}:0${minuts}:0${seconds}`
    startStopButton.textContent = 'Start'
    resetButton.style.color = ''
        resetButton.style.cursor = ''
}


function displayPage(event) {
    const target = event.target
    if (menuStopwatchIcon.textContent === 'timer' && target.id === 'menu-stopwatch-icon') {
        alarmContainer.classList.add('hidden')
        timerContainer.classList.add('hidden')
        stopwatchContainer.classList.remove('hidden')
        menuStopwatchIcon.textContent = 'alarm'
        menuTimerIcon.textContent = 'timer_10_alt_1'
    }
    else if(menuTimerIcon.textContent === 'timer_10_alt_1' && target.id === 'menu-timer-icon') {
        alarmContainer.classList.add('hidden')
        stopwatchContainer.classList.add('hidden')
        timerContainer.classList.remove('hidden')
        menuTimerIcon.textContent = 'alarm'
        menuStopwatchIcon.textContent = 'timer'
    }
    else {
        alarmContainer.classList.remove('hidden')
        stopwatchContainer.classList.add('hidden')
        timerContainer.classList.add('hidden')
        menuStopwatchIcon.textContent = 'timer'
        menuTimerIcon.textContent = 'timer_10_alt_1'
    }
}

// timer
function startStopTimer() {
    timerInputContainer.style.display = 'none'
    timerHours = timerHours === '' ? 0 : timerHours
    timerMinuts = timerMinuts === '' ? 0 : timerMinuts
    timerSeconds = timerSeconds === '' ? 0 : timerSeconds
    totalTimerTime = (timerHours * 3600) + (timerMinuts * 60) + timerSeconds //- 1
    startStopTimerButton.textContent = 'Stop';
    
    const addZero = (num) => num < 10 ? '0' + num : num
    timer.textContent = `${addZero(timerHours)}:${addZero(timerMinuts)}:${addZero(timerSeconds)}`;

    const emptyFields = Array.from(inputNumbers).every((elem) => elem.value == '')
    console.log(!emptyFields)
    if(emptyFields) {
        resetTimer()
        return
    }
    else if (!timerIsRunning) {
        timerInetervalId = setInterval(updateTimer, 1000)
        resetTimerButton.style.color = '#FCD7B5'
        resetTimerButton.style.cursor = 'pointer'
    }
    else {
        clearInterval(timerInetervalId)
        startStopTimerButton.textContent = 'Start'
    }

    timerIsRunning = !timerIsRunning
}


function updateTimer() {
    const updateHours = Math.floor(totalTimerTime / 3600)
    const updateMinuts = Math.floor(totalTimerTime / 60)
    const updateSeconds = totalTimerTime % 60

    timerHours = updateHours
    timerMinuts = updateMinuts
    timerSeconds = updateSeconds

    if (updateHours === 0 && updateMinuts === 0 && updateSeconds === 0) {
        ringTone.play()
        //ringTone.loop()
        resetTimer()
        return
    }

    const addZero = (num) => num < 10 ? '0' + num : num
    timer.textContent = `${addZero(updateHours)}:${addZero(updateMinuts)}:${addZero(updateSeconds)}`;

    totalTimerTime--
}


function resetTimer() {
    timerIsRunning = false
    clearInterval(timerInetervalId)
    inputNumbers.forEach((elem) => elem.value = '')
    console.log(inputNumbers)
    timerSeconds = 0
    timerMinuts = 0
    timerHours = 0

    timer.textContent = '00:00:00'
    startStopTimerButton.textContent = 'Start'

    timerInputContainer.style.display = 'flex'
    resetTimerButton.style.color = ''
    resetTimerButton.style.cursor = ''

}


menuStopwatchIcon.addEventListener('mouseover', (event) => {
    if (event.target.id == 'menu-stopwatch-icon') {
        menuStopwatchIcon.style.scale = 1.2
        menuStopwatchIcon.style.color = '#FCD7B5'
    }
    if (event.target.id == 'timer_10_alt_1') {
        menuIcon.style.scale = 1.2
        menuIcon.style.color = '#FCD7B5'
    }
    
});

menuIconContainer.addEventListener('mouseover', (event) => {
    if (event.target.id == 'menu-stopwatch-icon') {
        menuStopwatchIcon.style.scale = 1.2
        menuStopwatchIcon.style.color = '#FCD7B5'
        menuTimerIcon.style.scale = ''
        menuTimerIcon.style.color = ''
    }
    if (event.target.id == 'menu-timer-icon') {
        menuTimerIcon.style.scale = 1.2
        menuTimerIcon.style.color = '#FCD7B5'
        menuStopwatchIcon.style.scale = ''
        menuStopwatchIcon.style.color = ''
    }
})

menuIconContainer.addEventListener('mouseleave', (event) => {
    if (event.target.id !== 'menu-stopwatch-icon') {
        menuStopwatchIcon.style.scale = ''
        menuStopwatchIcon.style.color = ''
    }
    if (event.target.id !== 'menu-timer-icon') {
        menuTimerIcon.style.scale = ''
        menuTimerIcon.style.color = ''
    }
});

