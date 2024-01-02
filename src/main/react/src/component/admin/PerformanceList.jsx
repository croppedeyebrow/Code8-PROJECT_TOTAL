import styled from "styled-components";
import { PieChart } from "react-minimal-pie-chart";
import React, { PureComponent, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import PerformanceAxios from "../../axios/PerformanceAxios";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const Th = styled.th`
  width: 10%;
  height: 30px;
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
  font-size: 2rem;
`;

const Td = styled.td`
  height: 30px;
  border: 1px solid #ddd;
  text-align: left;
  padding: 10px;
  max-width: 50px;
  overflow: hidden;
`;

const PerformanceList = ({ selectedButton, performanceList, pageList }) => {
  const [purchaseCount, setPurchaseCount] = useState([]);

  // id 에 해당하는 공연자 수
  useEffect(() => {
    const getTicket = async () => {
      const purchaseCount = [];

      for (const performance of performanceList) {
        const res = await PerformanceAxios.getTicketList(performance.id);
        purchaseCount.push({ id: performance.id, data: res.data });
        console.log("공연 데이터", res.data);
      }

      setPurchaseCount(purchaseCount);
    };
    getTicket();
  }, []);

  const data = performanceList.slice(0, 10).map((data, index) => ({
    performanceName: data.performanceName,
    value: data.price * purchaseCount[index].data.length,
  }));

  return (
    <>
      {selectedButton === "Performance" && (
        <Table>
          <thead>
            <tr>
              <Th>NO.</Th>
              <Th>TITLE</Th>
              <Th>PRICE</Th>
              <Th>SEATCOUNT</Th>
              <Th>PURCHASE</Th>
              <Th>VENUE</Th>
              {/* <Th>HEARTCOUNT</Th> */}
            </tr>
          </thead>
          <tbody>
            {pageList.map((data, index) => (
              <tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{data.performanceName}</Td>
                <Td>{data.price}</Td>
                <Td>{data.seatCount}</Td>
                <Td>{data.seatCount}</Td>
                <Td>{data.venue}</Td>
                {/* <Td>{data.musicDTO.heartCount}</Td> */}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {["PerformanceGraph1", "PerformanceGraph2"].includes(selectedButton) && (
        <Container>
          <p style={{ fontSize: "5rem", fontWeight: "900" }}>공연별 총 매출</p>

          <ResponsiveContainer width="80%" height="60%">
            <BarChart width={600} height={300} data={data}>
              <XAxis dataKey="performanceName" />
              <YAxis />
              <Bar dataKey="value" fill="orange" />
            </BarChart>
          </ResponsiveContainer>
        </Container>
      )}
    </>
  );
};

export default PerformanceList;
