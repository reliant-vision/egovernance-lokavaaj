import React, {useState, useEffect, useMemo}from "react";
import DashboardBox from "./DashboardBox";
import { Area, AreaChart, CartesianGrid, Label, Pie, PieChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import BoxHeader from "./BoxHeader";

interface TalukaWiseCount {
    taluka: string;
    count: number;
  }

  interface DistrictWiseCount {
    taluka: string;
    count: number;
  }

const DashboardRow1: React.FC = () => {
    const [talukawiseCounts, setTalukaWiseCounts] = useState<TalukaWiseCount[]>([]);
    const [districtwiseCounts, setDistrictWiseCounts] = useState<DistrictWiseCount[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

  useEffect(() => {
    const fetchCounts = async () => {

    
        try {
        const response = await fetch('/applications/countbydistrictandtaluka');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setDistrictWiseCounts(data[0]);
        setTalukaWiseCounts(data[1]);
        setLoading(false);
        } catch (error) {
        console.error('Error:', error);
        setError('Failed to fetch data');
        setLoading(false);
        }
    };

        fetchCounts();
    }, []);

    

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    const colors = ['#8884d8', '#82ca9d', '#ff7f0e', '#ffbb78', '#a05d56', '#d0743c', '#ff8c00'];
    return (
        <>
        <DashboardBox  gridArea="a" >
        <BoxHeader title={"Number of Applications Taluka Wise"} sidetext={``} />
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={talukawiseCounts}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid stroke="#ccc" strokeWidth={0.1} />
            <XAxis dataKey="taluka"  angle={0} interval={0} >
                <Label value="Name of Taluka" offset={0} position="insideBottom" />
            </XAxis>
            <YAxis>
                <Label value="Grievances Count" offset={90} position="insideBottom" angle={-90} />
            </YAxis>
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
        


        <DashboardBox  gridArea="c" >
        <BoxHeader title={"Number of Applications Taluka Wise & District Wise"} sidetext={``} />
        <ResponsiveContainer width="100%" height={300}>
        <PieChart width={300} height={250}>
            <Pie data={districtwiseCounts} dataKey="count" nameKey="district" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
            <Pie data={talukawiseCounts} dataKey="count" nameKey="taluka" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
            {colors.map((color, district) => (
            <Pie key={district} data={districtwiseCounts} dataKey="count" nameKey="district" cx="50%" cy="50%" outerRadius={50} fill={color} />
            ))}
            <Tooltip />
        </PieChart>
        </ResponsiveContainer>
        </DashboardBox>
        </>
    );
}

export default DashboardRow1;