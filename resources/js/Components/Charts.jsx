import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

export default function Charts({data , XdataKey , YdataKey , barColor}) {
    console.log(data)
    if(data.length === 0) return <div>no data yet</div>
    return <ResponsiveContainer width='100%' height='100%' >
        <BarChart data={data} width={500} height={500} margin={{
            right: 10,
            left: 10
        }}>
            <CartesianGrid />
            <XAxis dataKey={XdataKey} />
            <YAxis unit='$' />
            <Tooltip />
            <Legend />
            <Bar dataKey={YdataKey} fill={barColor} />
        </BarChart>
    </ResponsiveContainer>
}
