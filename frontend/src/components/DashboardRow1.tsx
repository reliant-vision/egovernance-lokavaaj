import React, {useState, useEffect, useMemo}from "react";
import DashboardBox from "./DashboardBox";
import { Area, AreaChart, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface TalukaWiseCount {
    taluka: string;
    count: number;
  }

const DashboardRow1: React.FC = () => {
    const [talukawiseCounts, setTalukaWiseCounts] = useState<TalukaWiseCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTalukaCounts = async () => {
      try {
        const response = await fetch('/applications/TalukaWiseCount');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setTalukaWiseCounts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to fetch data');
        setLoading(false);
        }
    };

        fetchTalukaCounts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <>
        <DashboardBox  gridArea="a" >
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={talukawiseCounts}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid stroke="#ccc" strokeWidth={0.1} />
            <XAxis dataKey="taluka"  angle={-45} interval={0}/>
            <YAxis/>
            <Tooltip />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#8884d8"
              fill="#8884d8"
            />
            <ReferenceLine y={0} stroke="#000" />
          </AreaChart>
        </ResponsiveContainer>
        </DashboardBox>
        <DashboardBox  gridArea="b" ></DashboardBox>
        <DashboardBox  gridArea="c" ></DashboardBox>
        </>
    );
}

export default DashboardRow1;