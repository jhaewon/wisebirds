import { React, useContext } from "react";
import classes from "./campaignGrid.module.css";
import AuthContext from "../../store/auto-context";

function CampaignGrid({ data, rowsPerPage, currentPage, onSwitch }) {
  const authCtx = useContext(AuthContext);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const currentData = data.slice(startIndex, endIndex);

  function setText(code) {
    switch (code) {
      case "WEBSITE_CONVERSIONS":
        return "웹사이트 전환";
      case "WEBSITE_TRAFFIC":
        return "웹사이트 트래픽";
      case "SALES":
        return "판매";
      case "APP_INSTALLATION":
        return "앱설치";
      case "LEAD":
        return "리드";
      case "BRAND":
        return "브랜드 인지도 및 도달 범위";
      case "VIDEO_VIEWS":
        return "동영상 조회";
    }
  }

  function formatNumber(num) {
    if (num === null || num === "" || num === undefined) {
      num = "0";
    }

    //소수점 제외 1000단 위 콤마로 수정
    var parts = num.toString().split(".");
    return (
      parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
      (parts[1] ? "." + parts[1] : "")
    );
  }

  return (
    <table className={classes.campaign}>
      <thead>
        <tr>
          <th>상태</th>
          <th>캠페인 명</th>
          <th>캠페인 목적</th>
          <th>노출수</th>
          <th>클릭수</th>
          <th>CTR</th>
          <th>동영상 조회수</th>
          <th>VTR</th>
        </tr>
      </thead>
      <tbody>
        {currentData.map((item) => (
          <tr key={item.id}>
            <td>
              <label className={classes.switch}>
                {authCtx.toggle ? (
                  <input
                    type="checkbox"
                    checked={item.enabled}
                    onChange={(e) => onSwitch(item.id, item.enabled)}
                  />
                ) : (
                  <input
                    type="checkbox"
                    checked={item.enabled}
                    onChange={() => onSwitch(item.id)}
                    disabled
                  />
                )}
                <span className={classes.slider}></span>
              </label>
            </td>
            <td className={classes.left}>{item.name}</td>
            <td className={classes.left}>{setText(item.campaign_objective)}</td>
            <td className={classes.right}>{formatNumber(item.clicks)}</td>
            <td className={classes.right}>{formatNumber(item.impressions)}</td>
            <td className={classes.right}>{item.ctr.toFixed(3) + "%"}</td>
            <td className={classes.right}>{item.video_views}</td>
            <td className={classes.right}>{item.vtr.toFixed(3) + "%"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CampaignGrid;
