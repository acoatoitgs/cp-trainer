import React, { useEffect, useState } from 'react';
import { PieChart } from "@mui/x-charts";

const ProblemSolved: React.FC = () => {
    const [r_solved, setRSolved] = useState<number | null>(null);
    const [r_partial, setRPartial] = useState<number | null>(null);
    const [r_fail, setRFail] = useState<number | null>(null);


    const [r_solved_perc, setRSolvedPerc] = useState<number | null>(null);
    const [r_partial_perc, setRPartialPerc] = useState<number | null>(null);
    const [r_fail_perc, setRFailPerc] = useState<number | null>(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("DBG: Fetching data");
                const response = await fetch('http://localhost:5000/api/training/tasksolvedpercentage', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log("DBG: Fetched data");
                console.log(data);
                setRSolved(data.full_count);
                setRPartial(data.partial_count);
                setRFail(data.fail_count);

                setRSolvedPerc(data.full_percentage.toFixed(2));
                setRPartialPerc(data.partial_percentage.toFixed(2));
                setRFailPerc(data.fail_percentage.toFixed(2));

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    if (r_solved === null || r_partial === null || r_fail === null) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <PieChart
                colors={['green', 'yellow', 'red']}
                series={[
                    {
                        data: [
                            { id: 0, value: r_solved, label: r_solved_perc + '% - Solved' },
                            { id: 1, value: r_partial, label: r_partial_perc + '% - Partially solved' },
                            { id: 2, value: r_fail, label: r_fail_perc + '% - Failed/Unattempted' },
                        ],
                        innerRadius: 54,
                        outerRadius: 100,
                        paddingAngle: 2,
                        cornerRadius: 5,
                        startAngle: -90,
                        endAngle: 270,
                        cx: 150,
                        cy: 150,
                    },
                ]}
                width={500}
                height={300}
                slotProps={{
                    legend: {
                        labelStyle: {
                            fontSize: 14,
                            fill: 'white',
                        },
                    },
                }}
            />
        </div>
    );
}

export default ProblemSolved;
