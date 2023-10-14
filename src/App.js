import { useEffect, useState } from "react";
import "./App.css";

function App() {
            const [data, setData] = useState(null);
            const [error, setError] = useState(null);
            useEffect(() => {
              fetch(
                "https://api.currencyfreaks.com/v2.0/rates/latest?apikey=a6293d3e36954aab9fc81d1eda7c34ca&symbols=CAD,IDR,JPY,CHF,EUR,GBP"
              )
                .then((response) => {
                  if (response.ok) {
                    return response.json();
                  } else {
                    throw new Error("Error: " + response.status);
                  }
                })
                .then((data) => {
                  setData(data.rates);
                })
                .catch((error) => {
                  setError(error.message);
                });
            }, []);
            if (error) {
              return <div>Error: {error}</div>;
            }

            if (!data) {
              return <div>Loading...</div>;
            }

  return (
    <div className="App">
      <div class="relative overflow-x-auto">
        <h1 class="mt-16 mb-6 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">
          Mata Uang Dunia
        </h1>
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                Currency
              </th>
              <th scope="col" class="px-6 py-3">
                We Buy
              </th>
              <th scope="col" class="px-6 py-3">
                Exchange Rate
              </th>
              <th scope="col" class="px-6 py-3">
                We Sell
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(data).map((currency) => (
              // <tr key={currency}>
              //   <td>{currency}</td>
              //   <td>{data[currency].rate}</td>
              // </tr>
              <tr
                key={currency}
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td class="px-6 py-4">{currency}</td>
                <td class="px-6 py-4">{ parseFloat(data[currency]) + (5 / 100 * parseFloat(data[currency]))}</td>
                <td class="px-6 py-4">{ parseFloat(data[currency]) }</td>
                <td class="px-6 py-4">{ parseFloat(data[currency]) - (5 / 100 * parseFloat(data[currency]))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
