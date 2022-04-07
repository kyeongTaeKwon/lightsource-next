import type { NextPage } from "next";
import Head from "next/head";
import { RefObject, useRef } from "react";
import styled from "styled-components";

import StageLightingWaveAnimation from "./StageLightingWaveAnimation";
import useClientHeight from "../../hooks/useClientWidthHeight";

const CanvasPage: NextPage = () => {
  const mainRef: RefObject<HTMLElement> = useRef<HTMLElement>(null);

  const clientRect = useClientHeight(mainRef);
  const { width: clientWidth, height: clientHeight } = clientRect;

  return (
    <>
      <Head>
        <title>canvas</title>
      </Head>
      <Main ref={mainRef}>
        <StageLightingWaveAnimation
          canvasWidth={clientWidth}
          canvasHeight={clientHeight}
        />
      </Main>
    </>
  );
};

const Main = styled.main`
  width: 100vw;
  height: 100vh;
`;

export default CanvasPage;
