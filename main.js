class BankAccount {
  constructor(_accountNumber, _owner) {
    this.accountNumber = _accountNumber;
    this.owner = _owner;
  }

  transactions = [];

  balance() {
    //gets the balance

    if (this.transactions.length == 0) {
      console.log("No History");
    } else if (this.transactions.length == 1) {
      console.log(this.transactions[0].amount);
    } else {
      let sum = 0;
      for (let index = 0; index < this.transactions.length; index++) {
        sum += this.transactions[index].amount;
      }
      console.log(sum);
    }
  }

  deposit(amt) {
    if (amt < 0) {
      console.log(`Can not deposit negative amount`);
      return;
    }
    let currTransaction = new Transaction(amt, this.owner);
    this.transactions.push(currTransaction);
  }

  charge(payee, amt) {
    let currentBalance = this.balance();
    if (amt <= currentBalance) {
      let currTransaction = new Transaction(amt * -1, payee);
      this.transactions.push(currTransaction);
    } else {
      console.log(`Alert: Charge will make balance dip below 0`);
    }
  }
}

class Transaction {
  constructor(_amount, _payee) {
    this.amount = _amount;
    this.payee = _payee;

    const d = new Date();
    this.date = d.getDay();
  }

  date;
}

class SavingsAccount extends BankAccount {
  constructor(_accountNumber, _owner, _interestRate) {
    super(_accountNumber, _owner);
    this.interestRate = _interestRate;
  }

  accrueInterest() {
    let currentBalance = this.balance();
    let interestAmt = currentBalance * this.interestRate;
    let interestTransaction = new Transaction(interestAmt , "James Johnson");
    this.transactions.push(interestTransaction);

  }
}

let myFirstBankAccount = new BankAccount("account123", "James Johnson");
//let myFirstTransaction = new Transaction (12.50, "Joe John")

let mySavingsAccount = new SavingsAccount("account123", "James Johnson", .10);

//myFirstBankAccount.deposit(10.5);
//myFirstBankAccount.deposit(100.5);
// at this point you have 111 in the account

//myFirstBankAccount.deposit(-100.50);
//can not deposit negative amount

//myFirstBankAccount.charge("James Johnson", 120);
//balance is 111, charge of 120 would make balance dip below 0
//myFirstBankAccount.balance(); // 111-50 = 61

mySavingsAccount.deposit(100);
mySavingsAccount.accrueInterest();
console.log(mySavingsAccount.balance())

