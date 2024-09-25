import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Cards from '../components/Cards/cards';
import { useNavigate } from 'react-router-dom';
import AddExpenseModal from "../components/Modals/AddExpense";
import AddIncomeModal from "../components/Modals/AddIncome";
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc, collection, getDocs, query, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { toast } from 'react-toastify';
import TransactionsTable from '../components/TransactionsTable/table';
import { HomeIcon } from '@heroicons/react/16/solid';
import { Modal } from 'antd';  
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Chart from '../components/Charts/charts';
import NoTransaction from '../components/NoTransaction/noTransaction';
import LoginFirst from './LoginFirst';
import { parse } from 'papaparse';

function Dashboard() {

  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

  const showExpenseModal = () => setIsExpenseModalVisible(true);
  const showIncomeModal = () => setIsIncomeModalVisible(true);
  const handleExpenseCancel = () => setIsExpenseModalVisible(false);
  const handleIncomeCancel = () => setIsIncomeModalVisible(false);

  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  const onFinish = (values, type) => {
    const newTransaction = {
      type,
      date: values.date.format("DD-MM-YYYY"),
      amount: parseFloat(values.amount),
      tag: values.tag,
    };
    addTransaction(newTransaction);
  };

  async function addTransaction(transaction) {
    if (!user) return toast.error("User not authenticated");
    try {
      const docRef = await addDoc(collection(db, `users/${user.uid}/transactions`), transaction);
      console.log("Document written with ID:", docRef.id);
      toast.success("Transaction Added!");
      fetchTransactions();  // Fetch transactions after adding new transaction
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("Couldn't add Transaction");
    }
  }

  // Fetch user data including username from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userData = await getDoc(userRef);

        if (userData.exists()) {
          setUsername(userData.data().name); // Set the username from Firestore
        } else {
          toast.error("User data not found!");
        }
      }
    };

    fetchUserData();
  }, [user]);

  useEffect(() => {
    fetchTransactions();
  }, [user]);  // Fetch transactions when the user is set

  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionArray = [];
      querySnapshot.forEach((doc) => {
        transactionArray.push(doc.data());
      });
      setTransactions(transactionArray);
      console.log("transactionArray", transactionArray);
      // toast.success("Transaction Fetched!");
    }
    setLoading(false);
  }

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  const calculateBalance = () => {
    let incomeTotal = 0;
    let expensesTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expensesTotal += transaction.amount;
      }
    });

    setIncome(incomeTotal);
    setExpense(expensesTotal);
    setTotalBalance(incomeTotal - expensesTotal);
  };

  // Function to download CSV before resetting
  const downloadCSV = (transactions) => {
    if (!transactions.length) return;

    const headers = ["type", "date", "amount", "tag"];
    const rows = transactions.map(transaction => [
      transaction.type,
      transaction.date,
      transaction.amount,
      transaction.tag
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "transactions.csv");

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Function to delete all transactions
  const resetBalance = async () => {
    if (!user) return toast.error("User not authenticated");

    try {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);

      const deletePromises = querySnapshot.docs.map(docSnap => deleteDoc(doc(db, `users/${user.uid}/transactions`, docSnap.id)));

      await Promise.all(deletePromises);
      toast.success("All transactions have been deleted!");

      // Reset the balance after deleting all transactions
      setIncome(0);
      setExpense(0);
      setTotalBalance(0);

      // Fetch transactions to refresh the state
      fetchTransactions();
    } catch (e) {
      console.error("Error deleting transactions: ", e);
      toast.error("Couldn't reset balance");
    }
  };

  // Custom Modal Confirm
  const showConfirm = () => {
    Modal.confirm({
      title: 'Please confirm',
      icon: <ExclamationCircleOutlined />,
      content: 'Please download the CSV file for future reference. Click "Delete" to delete all transactions or "Cancel" to abort.',
      okText: 'Delete',
      cancelText: 'Cancel',
      onOk() {
        // Download CSV before deleting
        downloadCSV(transactions);
        resetBalance(); // Proceed with balance reset
      },
      onCancel() {
        console.log('Cancelled');
      },
    });
  };

  function landingPage() {
    navigate("/");
  }

  let sortedTransactions = transactions.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  })

 


  return (
    <>
      {user ? (
        <div>
          <Header />
          {loading ? (
            <div className='items-center flex justify-center w-full h-[100vh]'>
              <p>Loading....</p>
            </div>
          ) : (
            <>
              <div className='w-[95%] flex justify-center items-center flex-col mt-5'>
                <div className='w-[95%] gap-2 flex justify-center items-center flex-col mt-5'>
                  <p className='lg:text-4xl text-center text-2xl text-gray-500'> Welcome To Your Dashboard,</p>
                  <p className='lg:text-4xl text-center font-semibold text-2xl text-blue-500'>{username}</p>
                </div>
                <div className='w-[95%] flex justify-end'>

                  <button
                    onClick={landingPage}
                    className='border-2 border-blue-500 rounded-lg text-gray-500 p-1 mt-3 ml-6 rounded-sm hover:text-white hover:bg-blue-500 transition-all duration-200'
                  >
                    <HomeIcon className="w-5 h-5 transition-all duration-100" />
                  </button>
                </div>
              </div>


              <Cards
                income={income}
                expense={expense}
                totalBalance={totalBalance}
                showExpenseModal={showExpenseModal}
                showIncomeModal={showIncomeModal}
                resetBalance={showConfirm} // Use showConfirm to trigger modal
              />
              <AddExpenseModal
                isExpenseModalVisible={isExpenseModalVisible}
                handleExpenseCancel={handleExpenseCancel}
                onFinish={onFinish}
              />
              <AddIncomeModal
                isIncomeModalVisible={isIncomeModalVisible}
                handleIncomeCancel={handleIncomeCancel}
                onFinish={onFinish}
              />
              {transactions.length !== 0 ? (
                <div className='hidden lg:block md:block'>
                  <Chart sortedTransactions={sortedTransactions} />
                </div>
              ) : (
                <div className='lg:block md:block'>
                  <NoTransaction />
                </div>
              )}
              <TransactionsTable transactions={transactions} addTransaction={addTransaction} fetchTransactions={fetchTransactions}/>
            </>
          )}
        </div>
      ) : (
        <LoginFirst />
      )}
    </>
  );
}

export default Dashboard;
