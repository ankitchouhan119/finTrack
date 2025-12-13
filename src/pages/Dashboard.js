import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Cards from '../components/Cards/cards';
import { useNavigate } from 'react-router-dom';
import AddExpenseModal from "../components/Modals/AddExpense";
import AddIncomeModal from "../components/Modals/AddIncome";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { toast } from 'react-toastify';
import TransactionsTable from '../components/TransactionsTable/table';
import { HomeIcon } from '@heroicons/react/16/solid';
import { Modal } from 'antd';  
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Chart from '../components/Charts/charts';
import NoTransaction from '../components/NoTransaction/noTransaction';
import LoginFirst from './LoginFirst';
import { apiFetch } from '../utils/api';
// import { API_URL } from '../utils/config';

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

  // const API_URL = getConfig('REACT_APP_API_URL') || 'http://localhost:5000';
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

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
    if (!auth.currentUser) return toast.error("User not authenticated");
    try {
      await apiFetch("/api/transactions/add", {
        method: "POST",
        body: JSON.stringify({ transaction })
      });
      toast.success("Transaction Added!");
      fetchTransactions();  // refresh
    } catch (e) {
      console.error("Error adding transaction:", e);
      toast.error("Couldn't add Transaction");
    }
  }

  // Fetch user data (via backend)
  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        try {
          const data = await apiFetch("/api/users/profile");
          setUsername(data.name || "");
        } catch (e) {
          console.error(e);
          toast.error("User data not found!");
        }
      }
    };
    fetchUserData();
  }, [user]);

  useEffect(() => {
    fetchTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function fetchTransactions() {
    setLoading(true);
    if (auth.currentUser) {
      try {
        const data = await apiFetch("/api/transactions/all");
        setTransactions(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Fetch transactions error:", e);
        toast.error("Couldn't fetch transactions");
      }
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
        incomeTotal += Number(transaction.amount || 0);
      } else {
        expensesTotal += Number(transaction.amount || 0);
      }
    });

    setIncome(incomeTotal);
    setExpense(expensesTotal);
    setTotalBalance(incomeTotal - expensesTotal);
  };

  // Download CSV from server
  const downloadCSVFromServer = async () => {
    if (!auth.currentUser) return toast.error("User not authenticated");
    try {
      const token = await auth.currentUser.getIdToken();
      const response = await fetch(`${API_URL}/api/transactions/export`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Export failed");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "transactions.csv";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      toast.success("CSV downloaded");
    } catch (e) {
      console.error("Export error:", e);
      toast.error("Export failed");
    }
  };

  // Delete all transactions
  const resetBalance = async () => {
    if (!auth.currentUser) return toast.error("User not authenticated");
    try {
      await apiFetch("/api/transactions/delete-all", { method: "DELETE" });
      toast.success("All transactions have been deleted!");
      setIncome(0); setExpense(0); setTotalBalance(0);
      fetchTransactions();
    } catch (e) {
      console.error("Error deleting transactions:", e);
      toast.error("Couldn't reset balance");
    }
  };

  // Confirm modal triggers download then delete
  const showConfirm = () => {
    Modal.confirm({
      title: 'Please confirm',
      icon: <ExclamationCircleOutlined />,
      content: 'Please download the CSV file for future reference. Click "Delete" to delete all transactions or "Cancel" to abort.',
      okText: 'Delete',
      cancelText: 'Cancel',
      async onOk() {
        await downloadCSVFromServer();
        await resetBalance();
      },
      onCancel() {
        // nothing
      },
    });
  };

  function landingPage() {
    navigate("/");
  }

  let sortedTransactions = [...transactions].sort((a, b) => {
    const da = a.date?.split("-").reverse().join("-") || a.date;
    const db = b.date?.split("-").reverse().join("-") || b.date;
    return new Date(da) - new Date(db);
  });

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
                resetBalance={showConfirm}
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
