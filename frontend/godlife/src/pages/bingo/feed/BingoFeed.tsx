import SearchIcon from "@mui/icons-material/Search";
import { Box, Stack, Typography } from "@mui/material";
import axios from "axios";

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import Stamp from "../../../assets/images/stamp.webp";
import { BingoType } from "../../../types/bingo";
import axiosWithToken from "../../../utils/axios";
import BingoFeedDateSearch from "./BingoFeedDateSearch";
import BingoFeedItem from "./BingoFeedItem";
import BingoFeedUserSearch from "./BingoFeedUserSearch";

const BingoFeed = () => {
  const isAuth = localStorage.getItem("token");
  const location = useLocation();
  const [bingoList, setBingoList] = useState<BingoType[]>([]);
  const [bingoCount, setBingoCount] = useState(-1);

  const getBingoFeed = () => {
    if (location.pathname === "/feed" && isAuth) {
      axiosWithToken
        .get(`feed`)
        .then((res) => {
          setBingoList(res.data);
          setBingoCount(res.data.length);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get(`feed/main`)
        .then((res) => {
          setBingoList(res.data);
          setBingoCount(res.data.length);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (bingoCount === -1) {
      getBingoFeed();
    }
  });

  return (
    <Stack justifyContent="center" alignItems="center">
      {isAuth && (
        <Stack
          direction="row"
          justifyContent="end"
          margin="0 0 0 auto"
          padding={1}
        >
          <BingoFeedDateSearch setBingoList={setBingoList} />
          <BingoFeedUserSearch setBingoList={setBingoList} />
          <Stack
            justifyContent="center"
            sx={{ height: "50px", borderBottom: "#464646 1px solid" }}
          >
            <SearchIcon />
          </Stack>
        </Stack>
      )}

      {-1 < bingoCount && bingoList.length === 0 ? (
        <>
          <Box textAlign={"center"} margin={"20%"}>
            <img src={Stamp} alt="stamp" />
            <Typography paddingY={5}>
              {bingoCount === 0
                ? "다른 갓생러들을 팔로우하고 갓생 피드를 채워보세요."
                : "찾으시는 갓생이 존재하지 않습니다."}
            </Typography>
          </Box>
        </>
      ) : (
        <>
          {bingoList.map((bingo) => (
            <BingoFeedItem
              bingo={bingo}
              getBingoFeed={getBingoFeed}
              key={bingo.id}
            />
          ))}
        </>
      )}
    </Stack>
  );
};

export default BingoFeed;
