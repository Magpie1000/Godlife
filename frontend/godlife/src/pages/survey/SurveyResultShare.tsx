import { IconButton, Stack, SvgIcon, Typography } from "@mui/material";

import { useEffect } from "react";
import ReactGA from "react-ga4";

import { ReactComponent as Link } from "../../assets/icon/link.svg";
import { ReactComponent as FacebookLogo } from "../../assets/logo/Brand/facebook.svg";
import { ReactComponent as KakaotalkLogo } from "../../assets/logo/Brand/kakaotalk.svg";
import { ReactComponent as TwitterLogo } from "../../assets/logo/Brand/twitter.svg";
import { useAppDispatch } from "../../store/hooks";
import { setSnackbar } from "../../store/snackbar";

interface SurveyResultShareProps {
  subtitle: string;
  title: string;
  imgUrl: string;
}

const SurveyShareTwitter = ({
  subtitle,
  title,
  imgUrl,
}: SurveyResultShareProps) => {
  let text = `✨ 갓생러 테스트✨%0A
  🏃‍♀️나는 어떤 타입의 갓생러일까?%0A%0A
  `;
  text += subtitle + "%0A";
  text += title + "%0A";
  return (
    <IconButton
      onClick={() => {
        ReactGA.gtag("event", "share", {
          method: "twitter",
          content_type: "twitter",
          item_id: "twitter",
        });
        window.open(
          `https://www.twitter.com/intent/tweet?text=${text}&url=${window.location.href}`
        );
      }}
      sx={{ padding: 0, height: "40px" }}
    >
      <SvgIcon
        component={TwitterLogo}
        inheritViewBox
        sx={{ width: "40px", height: "40px" }}
      />
    </IconButton>
  );
};

const SurveyShareKakao = ({
  subtitle,
  title,
  imgUrl,
}: SurveyResultShareProps) => {
  useEffect(() => {
    if (!window.Kakao.isInitialized())
      window.Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
  }, []);

  const shareKakao = () => {
    ReactGA.gtag("event", "share", {
      method: "kakao",
      content_type: "kakao",
      item_id: "kakao",
    });

    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "나는 어떤 타입의 갓생러일까?",
        description: `${subtitle + " " + title}`,
        imageUrl: `${window.location.origin + imgUrl}`,
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
    });
  };

  return (
    <IconButton onClick={shareKakao} sx={{ padding: 0, height: "40px" }}>
      <SvgIcon
        component={KakaotalkLogo}
        inheritViewBox
        sx={{ width: "40px", height: "40px" }}
      />
    </IconButton>
  );
};

const SurveyResultShare = ({
  subtitle,
  title,
  imgUrl,
}: SurveyResultShareProps) => {
  const dispatch = useAppDispatch();
  return (
    <Stack direction="column" alignItems="center" sx={{ margin: "8% 0" }}>
      <Typography fontSize={20} fontFamily={"BMEULJIRO"} mb={1}>
        친구들에게 결과 공유하기
      </Typography>
      <Stack direction="row" spacing={2}>
        <IconButton
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            dispatch(
              setSnackbar({
                open: true,
                message: "조사 결과가 클립보드에 복사되었습니다.",
                severity: "success",
              })
            );
            ReactGA.gtag("event", "share", {
              method: "link",
              content_type: "link",
              item_id: "link",
            });
          }}
          sx={{ padding: 0, height: "40px" }}
        >
          <SvgIcon
            component={Link}
            inheritViewBox
            sx={{ width: "40px", height: "40px" }}
          />
        </IconButton>

        <SurveyShareKakao subtitle={subtitle} title={title} imgUrl={imgUrl} />
        <SurveyShareTwitter subtitle={subtitle} title={title} imgUrl={imgUrl} />

        <IconButton
          onClick={() => {
            ReactGA.gtag("event", "share", {
              method: "facebook",
              content_type: "facebook",
              item_id: "facebook",
            });
            window.open(
              `http://www.facebook.com/sharer/sharer.php?u=${window.location.href}`
            );
          }}
          sx={{ padding: 0, height: "40px" }}
        >
          <SvgIcon
            component={FacebookLogo}
            inheritViewBox
            sx={{ width: "40px", height: "40px" }}
          />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default SurveyResultShare;
