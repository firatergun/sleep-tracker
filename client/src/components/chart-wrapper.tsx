
import ReactEcharts from "echarts-for-react"
import { useFetchUserChartData } from "../api";
import { Suspense } from "react";


export const ChartWrapper = ({ userId }: {userId: string}) => {
    const { data: userChartData } = useFetchUserChartData(userId!);
    const { dates, durations } = userChartData;
    const options = {
        grid: { top: 20, right: 40, bottom: 20, left: 40 },
        xAxis: {
          type: "category",
          data: dates
        },
        yAxis: {},
        series: [
          {
            data: durations,
            type: "bar",
            smooth: true
          }
        ],
        tooltip: {
          trigger: "axis"
        }
      }
    
  return (
      <div>
          <Suspense fallback={<div>Loading...</div>}> 
                <div>
                    <h1>{userChartData.name} </h1>
                    <ReactEcharts
                      option={options}
                      className='w-full'
                        />
                </div>
         </Suspense>
      </div>
  )
}
