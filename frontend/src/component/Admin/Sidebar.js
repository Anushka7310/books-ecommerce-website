import React from "react";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";

const Sidebar = () => {
  return (
    <div className="sidebar w-1/4  p-4 min-h-screen flex flex-col justify-start">
      <Link to="/admin/dashboard" className=" block mb-6">
        <DashboardIcon className="text-2xl" />
        <span className="ml-2">Dashboard</span>
      </Link>
      <Link className="mb-6">
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Books">
            <Link to="/admin/books" className="">
              <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
            </Link>
            <Link to="/admin/book" className="">
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link to="/admin/orders" className=" block mb-6">
        <ListAltIcon className="text-2xl" />
        <span className="ml-2">Orders</span>
      </Link>
      <Link to="/admin/users" className=" block mb-6">
        <PeopleIcon className="text-2xl" />
        <span className="ml-2">Users</span>
      </Link>
      <Link to="/admin/reviews" className="">
        <RateReviewIcon className="text-2xl" />
        <span className="ml-2">Reviews</span>
      </Link>
    </div>
  );
};

export default Sidebar;
