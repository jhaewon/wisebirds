import React, { Fragment, useState } from "react";
import CampaignGrid from "../../components/ui/campaignGrid";
import Pagination from "../../components/ui/pagination";
import { getCampaigns, patchCampaign } from "../../helpers/api-util";

function Campaign(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(props.list.content);
  const rowsPerPage = 25;
  const pageCount = Math.ceil(data.length / rowsPerPage);

  function handlePageChange(newPage) {
    setCurrentPage(newPage);
  }

  function handleSwitchToggle(itemId) {
    const newData = patchCampaign(itemId);
    setData(newData);
  }

  return (
    <Fragment>
      <h2 className="title">캠페인 관리</h2>
      <div>
        <CampaignGrid
          data={data}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
          onSwitch={handleSwitchToggle}
        />
        <Pagination
          pageCount={pageCount}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </Fragment>
  );
}

export async function getStaticProps() {
  const campaigns = getCampaigns();

  return {
    props: {
      list: campaigns,
    },
  };
}

export default Campaign;
