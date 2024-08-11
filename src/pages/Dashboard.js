import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Card from '../components/Cards'
import AddIncomeModal from '../components/Modals/addIncomeModal'
import AddExpenseModal from '../components/Modals/addExpenseModal';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { auth, db } from "../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import TransactionTable from '../components/TransactionTable';
import Charts from '../components/Charts';
import NoTransaction from '../components/NoTransaction';

function Dashboard() {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  
  function formatDate(date) {
    if (date.includes('-')) {
      const parts = date.split('-');
      if (parts[0].length === 4) {
        return date;
      } else {
        const [day, month, year] = date.split('-');
        return `${year}-${month}-${day}`;
      }
    }else{
      return null;
    }
  }

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      amount: parseInt(values.amount),
      tag: values.tag,
      name: values.name
    };
    addTransaction(newTransaction);
  }
 
  async function addTransaction(transaction, many){
    transaction.date = formatDate(transaction.date);
    if(Object.values(transaction).every(value => !(value === null || value === undefined || value === ''))){
      try {
        const docRef = await addDoc(collection(db, `users/${user.uid}/transactions`), transaction);
        let newArray = transactions;
        newArray.push(transaction)
        setTransactions(newArray);
        calculateBalance();
        if(!many) toast.success("Transaction Added");
      } catch (error) {
        if(!many) toast.error("Couldn't add transaction");
      }
    }else{
      toast.error("Couldn'd add transaction: Incorrect input");
    }
  }


  async function fetchTransaction(){
    setLoading(true);
    if(user){
      let transactionArray = [];
      const querySnapshot = await getDocs(collection(db, `users/${user.uid}/transactions`));
      querySnapshot.forEach((doc) => {
        transactionArray.push(doc.data());
      });
      setTransactions(transactionArray);
      console.log(transactionArray);
    }
  }

  useEffect(() => {
    fetchTransaction();
  }, [user]);

  useEffect(() => {
    calculateBalance();
  },[transactions]);

  function calculateBalance(){
    let income = 0;
    let expense = 0;
    let balance = 0;
    transactions.forEach((transaction) => {
      if(transaction.type === 'Income'){
        income += transaction.amount;
      }
      if(transaction.type === 'Expense'){
        expense += transaction.amount;
      }
      balance = income - expense;
      setTotalIncome(income);
      setTotalExpense(expense);
      setTotalBalance(balance);
    })
  }

  return (
    <div>
      <Header/>
      <Card setIsIncomeModalVisible={setIsIncomeModalVisible} setIsExpenseModalVisible={setIsExpenseModalVisible} income={totalIncome} expense={totalExpense} balance={totalBalance}/>
      {isIncomeModalVisible && <AddIncomeModal isIncomeModalVisible={isIncomeModalVisible} setIsIncomeModalVisible={setIsIncomeModalVisible} onFinish={onFinish}/>}
      {isExpenseModalVisible && <AddExpenseModal isExpenseModalVisible={isExpenseModalVisible} setIsExpenseModalVisible={setIsExpenseModalVisible} onFinish={onFinish}/>}
      {transactions.length!=0 ? <Charts transactions={transactions}/> : <NoTransaction/>}
      <TransactionTable transactions={transactions} addTransaction={addTransaction} fetchTransaction={fetchTransaction}/>
    </div>
  )
}

export default Dashboard;
