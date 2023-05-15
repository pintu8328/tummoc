import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import axios from "axios";
import Pagination from "./Pagination";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");
    if (!token) {
      navigate("/signin");
    }
  }, []);

  const [data, setData] = useState([]);
  const [filterVal, setFilterVal] = useState([]);
  const [common, setcommon] = useState([]);
  const [popup, setPopup] = useState([]);
  const [togle, setTogle] = useState(false);

  const [showPerPage, setShowPerPage] = useState(8);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });
  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };
  useEffect(() => {
    axios
      .get("https://api.spacexdata.com/v3/capsules")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setcommon(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(data);
  const changeContent = (item) => {
    setPopup([item]);
    setTogle(!togle);
  };

  const handleChange = (e) => {
    const filterResult = data.filter(
      (item) =>
        item.status
          .toString()
          .toLowerCase()
          .includes(e.target.value.toLowerCase().toString()) ||
        item.type
          .toString()
          .toLowerCase()
          .includes(e.target.value.toLowerCase().toString())
    );
    // item.original_launch.toLowerCase().includes(e.target.value)
    //        item.original_launch.toString().toLowerCase().includes(e.target.value.toString().toLowerCase())

    setData(filterResult);
    setFilterVal(e.target.value);
  };

  return (
    <div>
      <h1>Search By Status or Type</h1>
      <Input
        type="search"
        placeholder={"search"}
        value={filterVal}
        onChange={(e) => handleChange(e)}
      />

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 4, sm: 1, md: 4 }}
        style={{ gap: "30px" }}
        mt={4}
      >
        {data.slice(pagination.start, pagination.end).map((item, index) => {
          return (
            <Box
              key={index}
              style={{
                boxShadow: "rgba(0, 5, 1, 0.16) 0px 1px 4px",
                color: "white",
                background: "black",
              }}
            >
              <Box>
                {" "}
                <img src={item.image} alt="" width={150}></img>
              </Box>

              <Box> Capsule_serial:{item.capsule_serial}</Box>
              <Box>Capsule_id:{item.capsule_id}</Box>
              <Box>Status:{item.status}</Box>
              <Box>Original_launch:{item.original_launch}</Box>
              <Box>Type:{item.type}</Box>
              <Box>Reuse_Count:{item.reuse_count}</Box>
              <Box component="span" sx={{ p: 0.5, border: "1px dashed red" }}>
                <Button onClick={() => changeContent(item)}>
                  More Details
                </Button>
              </Box>
            </Box>
          );
        })}
      </Grid>
      {togle && (
        <Grid
          className="pop_up_container"
          onClick={changeContent}
          style={{
            color: "blue",
            background: "black",
            width: "90%",
            height: "90%",
          }}
        >
          <Grid className="pop_up_body" onClick={(e) => e.stopPropagation()}>
            <Grid className="pop_up_header">
              <Button onClick={changeContent}>X</Button>
            </Grid>
            <Grid className="pop_up_content">
              {popup.map((item, index) => (
                <Grid key={index}>
                  <Box> Capsule_serial:{item.capsule_serial}</Box>
                  <Box>Capsule_id:{item.capsule_id}</Box>
                  <Box>Status:{item.status}</Box>
                  <Box>Original_launch:{item.original_launch}</Box>
                  <Box>Type:{item.type}</Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      )}
      <Pagination
        showPerPage={showPerPage}
        onPaginationChange={onPaginationChange}
        total={data.length}
      />
    </div>
  );
}

export default Home;
