import "./featureInfo.css";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";

export default function FeatureInfo() {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("orders/income");
        setIncome(res.data);
        setPerc((res.data[1].total * 100) / res.data[0].total - 100);
      } catch {}
    };
    getIncome();
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featureTitle">Revenue</span>
        <div className="featureMoneyContainer">
          <span className="featureMoney">${income[1]?.total}</span>
          <span className="featureMoneyRate">
            {Math.floor(perc)}%
            {perc < 0 ? (
              <ArrowDownward className="featureIcon negative" />
            ) : (
              <ArrowUpward className="featureIcon" />
            )}
          </span>
        </div>
        <span className="featureSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featureTitle">Sales</span>
        <div className="featureMoneyContainer">
          <span className="featureMoney">$4,415</span>
          <span className="featureMoneyRate">
            -1.4
            <ArrowDownward className="featureIcon negative" />{" "}
          </span>
        </div>
        <span className="featureSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featureTitle">Cost</span>
        <div className="featureMoneyContainer">
          <span className="featureMoney">$2,225</span>
          <span className="featureMoneyRate">
            +2.4
            <ArrowUpward className="featureIcon" />
          </span>
        </div>
        <span className="featureSub">Compared to last month</span>
      </div>
    </div>
  );
}
