import {
  Box,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axios from "axios";

import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Stamp from "../../assets/images/stamp.webp";
import Bingo from "../../components/Bingo/Bingo";
import { BlackButton } from "../../components/common/Button";
import { selectBingo, setBingo } from "../../store/bingo";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectTodayBingo } from "../../store/todayBingo";
import { setLoggedUser } from "../../store/user";
import axiosWithToken from "../../utils/axios";
import ProfileFollow from "./ProfileFollow";
import ProfileInfo from "./ProfileInfo";
import ProfileRecord from "./ProfileRecord";
import ProfileSettingDialog from "./ProfileSettingDialog";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const bingo = useAppSelector(selectBingo);
  const code = useAppSelector(selectTodayBingo);

  const getUserInfo = useCallback(() => {
    axiosWithToken.get("user/info").then((res) => {
      dispatch(setLoggedUser(res.data));
    });
  }, [dispatch]);

  const getBingo = useCallback(() => {
    axios
      .get(`bingo/${code}`)
      .then((res) => {
        dispatch(setBingo(res.data));
      })
      .catch(() => {});
  }, [code, dispatch]);

  useEffect(() => {
    if (code && code !== "none") {
      getBingo();
    }
    getUserInfo();
  }, [getBingo, getUserInfo, code]);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <ProfileSettingDialog open={open} setOpen={setOpen} />
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          maxWidth: "900px",
          margin: "0 auto",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "inset -2px -4px 4px rgba(0,0,0,0.25)",
          padding: "60px 0",
        }}
      >
        <Box
          sx={(theme) => ({
            width: "772px",
            [theme.breakpoints.down(800)]: {
              width: "548px",
            },
            [theme.breakpoints.down("sm")]: {
              width: "324px",
            },
          })}
        >
          <ProfileInfo setOpen={setOpen} />
          <ProfileFollow />

          <Divider
            sx={{
              margin: "3% auto 0",
              width: "95%",
            }}
          />

          <Box
            sx={{
              height: "100%",
              width: "100%",
              margin: "5% 0 5%",
            }}
          >
            {bingo.code && code && code !== "none" ? (
              <Stack direction="column" alignItems="center">
                <Box
                  sx={{ width: "100%", maxWidth: "550px", textAlign: "center" }}
                >
                  <Typography fontSize={22} fontFamily="BMEULJIRO">
                    {bingo.title}
                  </Typography>
                  <Bingo
                    createdBy={bingo.userName}
                    size={3}
                    goals={bingo.goals}
                    mode={"Active"}
                    startDate={bingo.startDate}
                    godlife={bingo.godlife}
                    id={bingo.id}
                  />
                </Box>
              </Stack>
            ) : (
              <Stack
                sx={{
                  height: "100%",
                  textAlign: "center",
                  width: "100%",
                  marginTop: "25%",
                }}
              >
                <Box position="relative">
                  <Typography
                    sx={{
                      fontSize: fullScreen ? 16 : 18,
                      margin: "7% 0",
                    }}
                  >
                    ????????? ????????? ????????????.
                  </Typography>
                  <img
                    src={Stamp}
                    alt="stamp"
                    style={{
                      position: "absolute",
                      top: "-90px",
                      left: "45%",
                      opacity: "70%",
                    }}
                  />
                  <BlackButton
                    style={{
                      width: "35%",
                      margin: "5% 0 15%",
                    }}
                    onClick={() => navigate("/create")}
                  >
                    ?????? ?????? ??????
                  </BlackButton>
                </Box>
              </Stack>
            )}
          </Box>
          <Stack direction="column" alignItems="center" justifyContent="center">
            <ProfileRecord />
          </Stack>
        </Box>
      </Stack>
    </>
  );
};

export default Profile;
