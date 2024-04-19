import ReactEcharts from "echarts-for-react"


export const Chart = (
  { dates, durations = [0, 0, 0, 0, 0, 0, 0] }: { dates: string[], durations: number[] }
) => {

    const options = {
        grid: { top: 10, right: 20, bottom: 10, left: 20 },
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
        <ReactEcharts
            option={options}
            style={{ width: "600px", height: "300px" }}
        />
    </div>
  )
}
