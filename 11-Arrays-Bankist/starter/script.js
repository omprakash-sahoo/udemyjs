'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');



const displayMovements = function (movements) {
  containerMovements.innerHTML = '';

  //const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};



const creatUserName = function(accs){
  accs.forEach(function(acc){
    acc.username = acc.owner.toLowerCase().split(' ').map(function(name){
      return name[0];
    }).join('');
  });
};
creatUserName(accounts);

const calcDisplayBalance = function(mov){
  const balance = mov.reduce(function(acc,curr){
    return acc+curr;
  });
  labelBalance.textContent = `${balance} €`
}


const calcDisplaySummary = function(acc){
  //////////Usinng chainng method in normal function///////////
    const incomes = acc.movements.filter(mov=>mov>0).reduce((acc,mov)=>acc + mov , 0);
    labelSumIn.textContent = `${incomes}€`;

    //////////Usinng chainng method in Arrow function///////////

    const out = acc.movements.filter(function(mov){
      return mov<0;
    }).reduce(function(acc,mov){
      return acc + mov;
    },0);
    labelSumOut.textContent = `${Math.abs(out)}€`; 

    const interest = acc.movements.filter(mov => mov > 0)
    .map(deposit => (Math.round(deposit * 1.1) / 100))
    .filter((int, i, arr) => {
      //  console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
}



////// EVENT LISTNER ////
let currentAcc;
btnLogin.addEventListener('click',function(e){
  e.preventDefault();
    currentAcc = accounts.find(function(acc){
      return acc.username === inputLoginUsername.value;
    });
    console.log(currentAcc);
    // if(currentAcc && currentAcc.pin === Number(inputLoginPin.value)){
      if(currentAcc?.pin === Number(inputLoginPin.value)){
        //Clear Input Field
        inputLoginUsername.value = inputLoginPin.value = '';
        inputLoginPin.blur();
     //Display UI & Welcome message
        labelWelcome.textContent = `welcom back, ${currentAcc.owner.split(" ")[0]}`;
        containerApp.style.opacity = 100;
        //Display Movements
        displayMovements(currentAcc.movements);
     //Dsplay balance
     calcDisplayBalance(currentAcc.movements);
     //Display Summary
     calcDisplaySummary(currentAcc);
    }
});


//console.log(creatUserName('Steven Thomas Williams'));
  // const user = 'Steven Thomas Williams';

//////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);


// console.log(movements);


/////////////////////////////////////////////////
