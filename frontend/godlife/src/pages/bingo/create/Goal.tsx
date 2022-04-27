import {
  Box,
  Button,
  IconButton,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";

import React, { useState } from "react";

import { ReactComponent as StarIcon } from "../../../assets/icon/star.svg";
import { ReactComponent as Stamp } from "../../../assets/images/stamp70.svg";
import { deleteGoal, selectGoal, setGoal } from "../../../store/goal";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

const GoalButton = styled(Button)(({ theme }) => ({
  position: "relative",
  width: "208px",
  height: "50px",
  outline: "2px solid #5A5A5A",
  outlineOffset: "-2px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "10px",
  color: "#5A5A5A",
  "& p": {
    fontSize: "14px",
  },
  "&:before": {
    content: "''",
    width: "70%",
    height: "4px",
    background: "white",
    top: "0px",
    position: "absolute",
    transition: "all 0.3s",
  },
  "&:hover": {
    color: "black",
    backgroundColor: "#ffffff",
  },
}));

interface GoalProps {
  seq: number;
  content: string;
  category: string;
  favoriteSeq?: string;
  isFavorite: boolean;
  getFavorites: () => void;
  userFavorites: {
    seq: number;
    content: string;
    category: string;
    favoriteSeq: string;
  }[];
}

const Goal = (goal: GoalProps) => {
  const BookmarkButton = styled(IconButton)(({ theme }) => ({
    position: "absolute",
    top: 8,
    left: 8,
    padding: 0,
    zIndex: 2,
    "& svg": {
      fontSize: 15,
      color: goal.isFavorite ? "#FFE812" : "white",
    },
  }));

  const dispatch = useAppDispatch();
  const [click, setClick] = useState(false);

  const manageFavorites = () => {
    let request;
    const clickedGoal = goal.userFavorites.find((el) => el.seq === goal.seq);
    if (clickedGoal) {
      request = axios.delete("goal", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
        data: { seq: clickedGoal.favoriteSeq },
      });
    } else {
      request = axios.put(
        "goal",
        { seq: goal.seq },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
    }
    request
      .then(() => {
        goal.getFavorites();
      })
      .catch((err) => console.log(err));
  };

  const nowSelected = useAppSelector(selectGoal);

  const manageSelectedGoals = () => {
    const found = nowSelected.some((el) => el.seq === goal.seq);
    if (nowSelected.length < 9 && !found) {
      dispatch(
        setGoal([
          { seq: goal.seq, content: goal.content, category: goal.category },
        ])
      );
      setClick(true);
    } else if (nowSelected.length <= 9 && found) {
      dispatch(
        deleteGoal({
          seq: goal.seq,
          content: goal.content,
          category: goal.category,
        })
      );
      setClick(false);
    }
  };

  return (
    <Stack
      direction="row"
      justifyContent="center"
      sx={{ position: "relative" }}
    >
      {click && (
        <Box
          sx={{
            position: "absolute",
            height: "100%",
            zIndex: 2,
            cursor: "pointer",
          }}
          onClick={manageSelectedGoals}
        >
          <Stamp />
        </Box>
      )}
      <BookmarkButton onClick={manageFavorites}>
        <SvgIcon component={StarIcon} />
      </BookmarkButton>
      <GoalButton onClick={manageSelectedGoals}>
        <Typography>{goal.content}</Typography>
      </GoalButton>
    </Stack>
  );
};

export default Goal;
