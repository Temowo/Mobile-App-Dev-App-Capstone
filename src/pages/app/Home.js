import React, { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import { ShoppingCartIcon } from "@heroicons/react/outline";
import { TbCurrencyNaira } from "react-icons/tb";
import Spinner from "../../components/ui/Spinner";
import order from "../../features/order";
import { NotifyError } from "../../components/toast/toast";

const Home = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});

  const getStats = () => {
    order("getOrderStats")()
      .then((res) => {
        if (res) {
          setStats(res.data.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        NotifyError(error.response.data.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    getStats();
  }, []);

  // const total = () => {
  //   const totalCost = orders
  //     .filter((i) => i.delivered)
  //     .map((i) => Number(i.total_cost))
  //     .reduce((previousValue, currentValue) => previousValue + currentValue, 0)
  //     .toString()
  //     .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  //   return totalCost;
  // };

  return (
    <>
      <div className="main-section home-section">
        <div className="row-1">
          <Card classes="card available">
            <div className="icon bg-yellow-200">
              <ShoppingCartIcon />
            </div>
            <div className="text-content">
              <h3>Pending Orders</h3>
              <h2>{loading ? <Spinner /> : stats.pending}</h2>
            </div>
          </Card>
          <Card classes="card available">
            <div className="icon bg-foodswipe-turquoise">
              <ShoppingCartIcon />
            </div>
            <div className="text-content">
              <h3>Orders In-Progress</h3>
              <h2>{loading ? <Spinner /> : stats.progress}</h2>
            </div>
          </Card>
          <Card classes="card available">
            <div className="icon bg-green-500">
              <ShoppingCartIcon />
            </div>
            <div className="text-content">
              <h3>Completed Orders</h3>
              <h2>{loading ? <Spinner /> : stats.completed}</h2>
            </div>
          </Card>
          <Card classes="card available">
            <div className="icon bg-green-400">
              <TbCurrencyNaira />
            </div>
            <div className="text-content">
              <h3>Restaurant Balance</h3>
              <h2>{loading ? <Spinner /> : `₦${stats.balance}`}</h2>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Home;
