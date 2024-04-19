import { useParams } from "react-router-dom"
import { ChartWrapper } from "../components/chart-wrapper";

const ChartPage = () => {
    const { userId } = useParams();
  return (
      <div>
          <ChartWrapper userId={userId!} />
      </div>
  )
}

export default ChartPage