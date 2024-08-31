import React, { useEffect, useState } from 'react'
import { Bar, Line } from '@ant-design/charts';
import { Pie } from '@ant-design/plots';
import './style.css';

function Charts({ transactions }) {
  const expenseData = transactions.filter((item)=>item.type=="Expense").map((item)=>{
    return {date: item.date, amount: item.amount}
  }).reduce((acc, item) => {
    if (acc[item.date]) {
      acc[item.date] += item.amount;
    } else {
      acc[item.date] = item.amount;
    }
    return acc;
  }, {});

  const sortedExpenseData = Object.keys(expenseData)
  .map((date) => ({
    date: date,
    amount: expenseData[date]
  }))
  .sort((a, b) => new Date(a.date) - new Date(b.date));

  const expenseDataByTags = transactions.filter((item)=>item.type=="Expense").map((item)=>{
    return {tag: item.tag, amount: item.amount}
  }).reduce((acc, item) => {
    if (acc[item.tag]) {
      acc[item.tag] += item.amount;
    } else {
      acc[item.tag] = item.amount;
    }
    return acc;
  }, {});

  const sortedExpenseDataByTags = Object.keys(expenseDataByTags)
  .map((tag) => ({
    tag: tag,
    amount: expenseDataByTags[tag]
  }));

  console.log(sortedExpenseDataByTags)
  const lineConfig = {
    data: sortedExpenseData,
    // width: 900,
    autoFit: true,
    xField: 'date',
    yField: 'amount'
  };

  const pieConfig = {
    data: sortedExpenseDataByTags,
    angleField: 'amount',
    colorField: 'tag',
    innerRadius: 0.5,
    // width: 500,
    // height:350,
    autoFit: true,
    legend: {
      color: {
        title: false,
        position: 'right',
        rowPadding: 5,
      },
    },
    interaction: {
      elementHighlight: true
    },
    state: {
      inactive: { opacity: 0.5 },
    }
  };

  let chart;

  return (
    <div className='charts'>
      <div className="main-warpper">
        <h3>My Spendings</h3>
        <div className="chart-wrapper">
          <div className="chart1">
            <Line {...lineConfig} onReady={(chartInstance) => (chart = chartInstance)}/>
          </div>
          <div className="chart2">
            <Pie {...pieConfig}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Charts
